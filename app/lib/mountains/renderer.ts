import fragmentSource from './mountains.frag.glsl?raw'
import vertexSource from './mountains.vert.glsl?raw'

/**
 * A GPU that is blocklisted, virtualised or missing still yields a WebGL2
 * context, backed by a software rasteriser. Rasterising this many particles on
 * the CPU costs whole cores, so those renderers keep the static glow instead.
 */
const SOFTWARE_RENDERERS = /swiftshader|llvmpipe|softpipe|software|basic render/i

/** cap the backing store so huge displays don't pay for pixels nobody sees */
const MAX_RENDER_WIDTH = 2688
const MAX_PIXEL_RATIO = 1.75

// 30fps: the scene is ambient dust behind the copy, and halving the frame rate
// halves what it takes from anything else competing for the GPU
const FRAME_INTERVAL_MS = 33
const POINTER_FOLLOW_SECONDS = 0.22
const POINTER_HOLD_SECONDS = 0.35
/** shockwaves per second after the logo is clicked */
const WAVE_RATE = 0.55
/** enough slots for rapid clicks while earlier waves are still travelling */
const MAX_WAVES = 8

export interface MountainsOptions {
  canvas: HTMLCanvasElement
  /** the hero copy; the particles thin out around it */
  slot: HTMLElement
  /** clicking it sends a shockwave through the range */
  trigger?: HTMLElement | null
  light: boolean
}

export interface MountainsRenderer {
  setLight: (light: boolean) => void
  /** fires once the first frame has actually been painted */
  onFirstFrame?: () => void
  dispose: () => void
}

type Point = readonly [number, number]

function follow(current: Point, target: Point, dt: number, seconds: number): Point {
  const alpha = 1 - Math.exp(-Math.min(Math.max(dt, 0), 0.05) / Math.max(seconds, 0.001))
  return [
    current[0] + (target[0] - current[0]) * alpha,
    current[1] + (target[1] - current[1]) * alpha,
  ]
}

/** a lighter field on small screens, where the GPU is usually a phone's */
function gridFor(width: number): Point {
  if (width >= 1024) return [704, 260]
  if (width >= 640) return [480, 200]
  return [320, 160]
}

/**
 * The skyline rises from just under the copy, so the peaks fill the space below
 * it rather than sitting behind it. `bottom` is the copy's lower edge, 0..1
 * from the top of the canvas.
 */
function horizonFor(bottom: number) {
  return Math.min(0.3, Math.max(-0.7, 1 - 2 * bottom - 0.04))
}

/**
 * Starts the scene, or throws when WebGL2 is missing or would run in software.
 */
export function createMountains(options: MountainsOptions): MountainsRenderer {
  const { canvas, slot, trigger } = options
  let light = options.light ? 1 : 0
  let disposed = false
  let rafId = 0

  let width = 1
  let height = 1
  let grid: Point = gridFor(0)
  let horizon = 0.3
  let slotCentre: Point = [0.5, 0.5]
  let slotScale: Point = [0.1, 0.1]

  let pointer: Point | undefined
  let smoothed: Point = [0.5, 0.5]
  let pointerHold = 0
  const wavePhases = new Float32Array(MAX_WAVES).fill(-1)

  let lastTime = 0
  let lastRender = -Infinity
  let painted = false
  let visible = true
  let onScreen = true
  let pausedAt = 0
  let lastFrame = 0
  let timeOffset = 0
  let resuming = false

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const context = canvas.getContext('webgl2', {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: 'low-power',
  })
  if (!context) throw new Error('No WebGL2 context.')
  const gl = context

  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
  const rendererName = String(
    (debugInfo && gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL))
    || gl.getParameter(gl.RENDERER)
    || '',
  )
  if (SOFTWARE_RENDERERS.test(rendererName)) {
    throw new Error(`Software renderer (${rendererName}).`)
  }

  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type)
    if (!shader) throw new Error('Could not create shader.')
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const log = gl.getShaderInfoLog(shader)
      gl.deleteShader(shader)
      throw new Error(`Shader failed to compile: ${log}`)
    }
    return shader
  }

  const vertex = compile(gl.VERTEX_SHADER, vertexSource)
  const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource)
  const program = gl.createProgram()
  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.linkProgram(program)
  // the shaders live on inside the program once it is linked
  gl.deleteShader(vertex)
  gl.deleteShader(fragment)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program)
    gl.deleteProgram(program)
    throw new Error(`Program failed to link: ${log}`)
  }
  gl.useProgram(program)

  const at = (name: string) => gl.getUniformLocation(program, name)
  const uniforms = {
    uGrid: at('uGrid'),
    uSlotCentre: at('uSlotCentre'),
    uSlotScale: at('uSlotScale'),
    uResolution: at('uResolution'),
    uPointer: at('uPointer'),
    uWave: at('uWave[0]'),
    uMisc: at('uMisc'),
    uView: at('uView'),
    uLight: at('uLight'),
  }

  // every vertex comes from gl_VertexID, so there is nothing to bind beyond an
  // empty vertex array
  gl.bindVertexArray(gl.createVertexArray())
  gl.disable(gl.DEPTH_TEST)
  gl.enable(gl.BLEND)

  /**
   * The canvas is transparent and composited over the page. Dark mode writes
   * colour with zero alpha, which premultiplied compositing turns into pure
   * additive light over the page. Light mode lays ink over it instead.
   */
  const applyBlend = () => {
    if (light > 0) {
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    }
    else {
      gl.blendFuncSeparate(gl.ONE, gl.ONE, gl.ZERO, gl.ONE)
    }
  }
  applyBlend()

  const measure = () => {
    const rect = canvas.getBoundingClientRect()
    if (rect.width <= 0 || rect.height <= 0) return
    const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO, MAX_RENDER_WIDTH / rect.width)
    const nextWidth = Math.max(1, Math.floor(rect.width * ratio))
    const nextHeight = Math.max(1, Math.floor(rect.height * ratio))
    if (nextWidth !== width || nextHeight !== height) {
      width = nextWidth
      height = nextHeight
      canvas.width = width
      canvas.height = height
      gl.viewport(0, 0, width, height)
    }
    grid = gridFor(rect.width)
    const slotRect = slot.getBoundingClientRect()
    horizon = horizonFor((slotRect.bottom - rect.top) / rect.height)
    slotCentre = [
      (slotRect.left + slotRect.width / 2 - rect.left) / rect.width,
      (slotRect.top + slotRect.height / 2 - rect.top) / rect.height,
    ]
    slotScale = [
      Math.max(0.001, slotRect.width / rect.width),
      Math.max(0.001, slotRect.height / rect.height),
    ]
    redraw()
  }

  const handlePointerMove = (event: PointerEvent) => {
    if (event.pointerType === 'touch') return
    const rect = canvas.getBoundingClientRect()
    const x = (event.clientX - rect.left) / Math.max(1, rect.width)
    const y = (event.clientY - rect.top) / Math.max(1, rect.height)
    pointer = x >= 0 && x <= 1 && y >= 0 && y <= 1 ? [x, y] : undefined
  }
  const handlePointerLeave = () => {
    pointer = undefined
  }
  const handleTriggerClick = () => {
    let index = wavePhases.findIndex(phase => phase < 0)
    // if every slot is taken, replace the wave closest to finishing
    if (index < 0) index = wavePhases.indexOf(Math.max(...wavePhases))
    wavePhases[index] = 0
    redraw()
  }
  // A lost context clears the drawing buffer; drop the canvas and keep the glow.
  const handleContextLost = (event: Event) => {
    event.preventDefault()
    dispose()
    canvas.remove()
  }

  const running = () => visible && onScreen

  /** time freezes while paused, so the scene resumes where it stopped */
  const updateRunning = () => {
    if (disposed) return
    if (!running()) {
      if (rafId) {
        cancelAnimationFrame(rafId)
        rafId = 0
        pausedAt = lastFrame
        pointer = undefined
      }
      return
    }
    if (rafId) return
    // the first frame always draws, even if the hero started off screen
    if (!painted) {
      rafId = requestAnimationFrame(frame)
    }
    else if (!reducedMotion) {
      resuming = true
      rafId = requestAnimationFrame(frame)
    }
  }

  /** draw one more frame after a change, even with reduced motion */
  function redraw() {
    if (disposed || !running()) return
    lastRender = -Infinity
    rafId ||= requestAnimationFrame(frame)
  }

  function frame(now: number) {
    if (disposed) return
    rafId = requestAnimationFrame(frame)
    lastFrame = now
    if (resuming) {
      resuming = false
      timeOffset += now - pausedAt
      lastRender = -Infinity
      lastTime = (now - timeOffset) / 1000
    }
    if (now - lastRender < FRAME_INTERVAL_MS) return
    lastRender = now

    const time = (now - timeOffset) / 1000
    const dt = Math.min(Math.max(time - lastTime, 0), 0.05)
    lastTime = time

    smoothed = follow(smoothed, pointer ?? smoothed, dt, POINTER_FOLLOW_SECONDS)
    pointerHold += ((pointer ? 1 : 0) - pointerHold) * (1 - Math.exp(-dt / POINTER_HOLD_SECONDS))

    // each click gets its own wave, so rapid clicks produce overlapping rings
    for (let i = 0; i < wavePhases.length; i++) {
      if (wavePhases[i]! < 0) continue
      wavePhases[i]! += dt * WAVE_RATE
      if (wavePhases[i]! >= 1) wavePhases[i] = -1
    }

    gl.uniform2ui(uniforms.uGrid, grid[0], grid[1])
    gl.uniform2f(uniforms.uSlotCentre, slotCentre[0], slotCentre[1])
    gl.uniform2f(uniforms.uSlotScale, slotScale[0], slotScale[1])
    gl.uniform2f(uniforms.uResolution, width, height)
    gl.uniform2f(uniforms.uPointer, smoothed[0], smoothed[1])
    gl.uniform1fv(uniforms.uWave, wavePhases)
    gl.uniform2f(uniforms.uMisc, time, pointerHold)
    gl.uniform2f(uniforms.uView, horizon, light)
    gl.uniform1f(uniforms.uLight, light)

    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, grid[0] * grid[1] * 6)

    if (!painted) {
      painted = true
      api.onFirstFrame?.()
    }
    const animating = wavePhases.some(phase => phase >= 0)
    if (reducedMotion && !animating) {
      cancelAnimationFrame(rafId)
      rafId = 0
    }
  }

  const handleVisibility = () => {
    visible = !document.hidden
    updateRunning()
  }
  const intersection = typeof IntersectionObserver === 'undefined'
    ? undefined
    : new IntersectionObserver(([entry]) => {
        onScreen = entry?.isIntersecting ?? true
        updateRunning()
      })
  const resize = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(measure)

  function dispose() {
    if (disposed) return
    disposed = true
    if (rafId) cancelAnimationFrame(rafId)
    rafId = 0
    resize?.disconnect()
    intersection?.disconnect()
    window.removeEventListener('pointermove', handlePointerMove)
    document.documentElement.removeEventListener('pointerleave', handlePointerLeave)
    document.removeEventListener('visibilitychange', handleVisibility)
    trigger?.removeEventListener('click', handleTriggerClick)
    canvas.removeEventListener('webglcontextlost', handleContextLost)
    gl.deleteProgram(program)
  }

  const api: MountainsRenderer = {
    setLight(next) {
      light = next ? 1 : 0
      applyBlend()
      redraw()
    },
    dispose,
  }

  measure()
  resize?.observe(canvas)
  resize?.observe(slot)
  intersection?.observe(canvas)
  window.addEventListener('pointermove', handlePointerMove, { passive: true })
  document.documentElement.addEventListener('pointerleave', handlePointerLeave)
  document.addEventListener('visibilitychange', handleVisibility)
  trigger?.addEventListener('click', handleTriggerClick)
  canvas.addEventListener('webglcontextlost', handleContextLost)
  visible = !document.hidden
  rafId ||= requestAnimationFrame(frame)

  return api
}
