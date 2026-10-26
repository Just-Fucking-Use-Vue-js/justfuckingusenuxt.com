#version 300 es
// A particle mountain range behind the hero.
//
// Adapted from the Nuxt dev-server loading screen by Hugo Richard
// (https://github.com/nuxt/nuxt/pull/36178, MIT). The terrain, lighting and
// motion are the same; the grid size, the horizon and the clearing around the
// hero copy are uniforms here so the scene can fit a web page on any screen.
//
// One draw call and no vertex buffers: every particle is a quad whose position
// is derived from gl_VertexID, sampled from a ridged heightfield in
// perspective, so the field reads as a range of peaks seen at a grazing angle.
precision highp float;

/** particle columns and rows */
uniform uvec2 uGrid;
/** centre of the hero copy, 0..1 in canvas space */
uniform vec2 uSlotCentre;
/** size of the hero copy, 0..1 of the canvas */
uniform vec2 uSlotScale;
uniform vec2 uResolution;
/** pointer position in canvas space, smoothed */
uniform vec2 uPointer;
/** shockwave phases 0..1; negative entries are inactive */
uniform float uWave[8];
/** the softer wave fired when the pointer enters the logo; negative while inactive */
uniform float uHoverWave;
/** x: seconds, y: pointer presence 0..1 */
uniform vec2 uMisc;
/** x: horizon in clip space, y: 1 in light mode */
uniform vec2 uView;

out vec2 vLocal;
/** dark: emitted colour, w unused. light: ink colour, w its coverage. */
out vec4 vTint;

const vec3 MINT = vec3(0.0, 0.8627451, 0.5098039);
const vec3 MINT_PALE = vec3(0.6235294, 1.0, 0.8156863);

// Light mode draws the same range as ink on paper, in a deep Nuxt green so the
// crests keep the brand colour instead of turning grey.
const vec3 INK = vec3(0.0, 0.4980392, 0.2705882);
const vec3 LUMA = vec3(0.2126, 0.7152, 0.0722);

// camera
const float Z_NEAR = 1.3;
const float Z_FAR = 26.0;
const float CAM_Y = 2.4;
const float FOCAL = 1.3;

// the two summits that shape the skyline, in screen-x units
const float PEAK1_X = -0.40;
const float PEAK1_H = 3.2;
const float PEAK2_X = 0.40;
const float PEAK2_H = 2.2;

const vec2 QUAD[6] = vec2[6](
  vec2(-1.0, -1.0), vec2(1.0, -1.0), vec2(-1.0, 1.0),
  vec2(-1.0, 1.0), vec2(1.0, -1.0), vec2(1.0, 1.0)
);

float hash21 (vec2 p) {
  vec2 q = fract(p * vec2(0.1031, 0.1030));
  q += dot(q, q.yx + 33.33);
  return fract((q.x + q.y) * q.x);
}

float noise2 (vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float shockwave (float phase, float dist) {
  if (phase < 0.0) { return 0.0; }
  float radius = phase * 1.7;
  float width = 0.09 + phase * 0.20;
  return exp(-((dist - radius) * (dist - radius)) / (width * width))
    * (1.0 - smoothstep(0.55, 1.0, phase))
    * smoothstep(0.0, 0.04, phase);
}

// `shape` flattens the relief on narrow screens. A summit covers the same
// fraction of screen height whatever the aspect, but far fewer pixels of width
// in portrait, so without this the peaks turn into needles.
float terrain (float x, float z, float u, float shape) {
  // ridged noise stretched along the view axis gives crest lines that flow
  // into the distance rather than a lumpy field
  vec2 q = vec2(x * 0.30, z * 0.085);
  float r = 0.0;
  float amp = 0.55;
  mat2 rot = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    r += amp * (1.0 - abs(2.0 * noise2(q) - 1.0));
    q = rot * q;
    amp *= 0.55;
  }
  float h = pow(max(r, 0.0), 1.5) * 2.6;
  h *= 0.70 + 0.60 * noise2(vec2(x * 0.05, z * 0.05) + 7.0);
  // two designed summits, far enough back to break the horizon
  float rise = smoothstep(3.0, 9.0, z);
  h += rise * PEAK1_H * max(0.0, 1.0 - abs(u - PEAK1_X) * 3.2);
  h += rise * PEAK2_H * max(0.0, 1.0 - abs(u - PEAK2_X) * 3.6);
  return max(h, 0.0) * shape;
}

void main () {
  uint id = uint(gl_VertexID) / 6u;
  int corner = gl_VertexID % 6;
  float t = uMisc.x;
  vec2 resolution = max(uResolution, vec2(1.0));
  float aspect = max(resolution.x / resolution.y, 0.5);
  float horizon = uView.x;
  float light = uView.y;
  vec2 offset = QUAD[corner];

  vec2 centre = vec2(
    uSlotCentre.x * 2.0 - 1.0,
    1.0 - 2.0 * uSlotCentre.y
  );
  // half extents of the copy in clip space
  vec2 slotHalf = max(uSlotScale, vec2(0.01));

  uint col = id % uGrid.x;
  uint row = id / uGrid.x;
  vec2 seed = vec2(float(col), float(row));
  float jitterX = hash21(seed) - 0.5;
  float jitterY = hash21(seed + 17.0) - 0.5;
  float rnd = hash21(seed + 41.0);

  // screen-x is fixed per column; depth is biased so the near field is denser
  float u = ((float(col) + jitterX) / float(uGrid.x)) * 2.3 - 1.15;
  float v = clamp((float(row) + jitterY) / float(uGrid.y), 0.0, 1.0);
  float z = mix(Z_NEAR, Z_FAR, pow(v, 1.5));
  // widen the field of view and flatten the range as the window narrows, so a
  // phone shows a range rather than a row of spikes
  float shape = clamp(aspect / 1.6, 0.5, 1.0);
  float tanX = max(aspect, 0.95) / FOCAL;
  float xw = u * z * tanX;

  float h = terrain(xw, z, u, shape);
  h += (noise2(vec2(xw * 1.6, z * 1.6)) - 0.5) * 0.05 * shape;

  // shading from the surface itself: one fixed light, plus a convexity term
  // that picks out the crests
  float e = 0.22;
  float hxp = terrain(xw + e, z, u, shape);
  float hxm = terrain(xw - e, z, u, shape);
  float hzp = terrain(xw, z + e, u, shape);
  vec3 normal = normalize(vec3(-(hxp - hxm) / (2.0 * e), 1.0, -(hzp - h) / e));
  vec3 lightDir = normalize(vec3(-0.12, 0.60, -0.42));
  float diffuse = pow(max(dot(normal, lightDir), 0.0), 1.3);
  float crest = smoothstep(0.0, 1.5, (2.0 * h - hxp - hxm) / (e * e) * 0.2);

  float sy = (h - CAM_Y) / z * FOCAL + horizon;

  // nearer ridges hide what lies behind them, which is what makes the skyline
  float occluded = 0.0;
  for (int k = 1; k <= 4; k++) {
    float zs = Z_NEAR + (z - Z_NEAR) * float(k) / 5.0;
    float hs = terrain(u * zs * tanX, zs, u, shape);
    occluded = max(occluded, step(sy + 0.012, (hs - CAM_Y) / zs * FOCAL + horizon));
  }

  // The copy sits in a clearing so it always reads on plain ground. It has to
  // read as haze, not as a hole cut out of the scene, so it fades over a short
  // distance and its edge is broken up by noise.
  vec2 toCentre = vec2((u - centre.x) * aspect, sy - centre.y);
  float dist = length(toCentre);
  vec2 clear = abs(vec2(u - centre.x, sy - centre.y) / (slotHalf * vec2(1.15, 1.25)));
  float clearEdge = pow(pow(clear.x, 4.0) + pow(clear.y, 4.0), 0.25)
    + (noise2(vec2(xw * 0.55, z * 0.55)) - 0.5) * 0.30;
  float clearing = 0.08 + 0.92 * smoothstep(0.75, 1.35, clearEdge);

  // ambient ripple, always running
  float ripplePhase = fract(t * 0.30);
  float rippleRadius = ripplePhase * 2.4;
  float rippleWidth = 0.16 + ripplePhase * 0.25;
  float ripple = exp(-((dist - rippleRadius) * (dist - rippleRadius)) / (rippleWidth * rippleWidth))
    * (1.0 - smoothstep(0.55, 0.95, ripplePhase))
    * smoothstep(0.0, 0.05, ripplePhase);

  // Every click has an independent phase, so its ring keeps travelling even
  // when another click starts a new one.
  float shock = 0.0;
  for (int i = 0; i < 8; i++) {
    shock += shockwave(uWave[i], dist);
  }
  shock += shockwave(uHoverWave, dist) * 0.25;

  float fog = exp(-(z - Z_NEAR) * 0.075) * (1.0 - smoothstep(0.86, 1.0, v));
  float nearFade = smoothstep(Z_NEAR, 2.6, z);
  float snow = smoothstep(2.6, 3.6, h);
  float shimmer = 0.88 + 0.12 * sin(t * (0.7 + rnd * 1.4) + rnd * 31.0);
  float grain = 0.88 + 0.24 * noise2(vec2(xw * 3.0, z * 3.0));

  // a fifth of the particles pulse on their own cycle, so the field never
  // settles into a repeating pattern
  float pulses = step(0.82, hash21(seed + 63.0));
  float pulse = pow(0.5 + 0.5 * sin(t * (0.5 + rnd * 1.1) + rnd * 61.0), 6.0);

  // two slow noise waves drifting across the field
  float waveA = noise2(vec2(xw * 0.22 - t * 0.20, z * 0.22)) - 0.5;
  float waveB = noise2(vec2(xw * 0.55 + t * 0.09, z * 0.55 - t * 0.14)) - 0.5;
  float wave = 1.0 + waveA * 0.24 + waveB * 0.16;

  float lit = diffuse * 0.18 + crest * (0.34 + diffuse * 0.45) + snow * 0.06;
  float brightness = (0.008 + lit * grain)
    * fog * nearFade * wave * shimmer
    * (1.0 + pulse * (0.18 + pulses * 1.1))
    * (1.0 + ripple * 0.75 + shock * 3.0);
  vec3 tint = mix(MINT * 0.75, MINT_PALE, clamp(crest + snow * 0.5, 0.0, 1.0)) * brightness;

  float glint = step(0.993, rnd) * diffuse * (0.5 + 0.5 * sin(t * 2.0 + rnd * 47.0));
  tint += vec3(0.85, 1.0, 0.93) * glint * fog * 0.55;

  // the pointer stirs nearby dust
  vec2 pointer = vec2((uPointer.x - 0.5) * 2.0, (0.5 - uPointer.y) * 2.0);
  vec2 toPointer = vec2((u - pointer.x) * aspect, sy - pointer.y);
  float excite = (1.0 - smoothstep(0.0, 0.55, length(toPointer))) * uMisc.y;
  vec2 push = normalize(toPointer + vec2(0.0001, 0.0)) * excite * (0.006 + 0.010 * rnd);
  tint *= 1.0 + excite * 1.3;

  // Light mode reuses every lighting term above and only reinterprets it: how
  // much light a particle emits becomes how much ink it lays down.
  if (light > 0.5) {
    float coverage = pow(clamp(dot(tint, LUMA) * 2.2, 0.0, 1.0), 0.8);
    vTint = vec4(INK, coverage * (1.0 - occluded) * clearing);
  } else {
    vTint = vec4(tint * (1.0 - occluded) * clearing, 1.0);
  }

  // particles float around their anchor, more freely up close
  float floatAmp = (0.0015 + (1.0 - v) * 0.006) * (1.0 + excite * 2.5);
  vec2 drift = vec2(
    sin(t * (0.35 + rnd * 0.5) + rnd * 40.0),
    cos(t * (0.28 + rnd * 0.45) + rnd * 23.0) * 1.4
  ) * floatAmp;

  // the shockwave shoves particles outward as it passes
  vec2 shockPush = vec2(toCentre.x / max(dist, 0.02) / aspect, toCentre.y / max(dist, 0.02)) * shock * 0.045;

  // fewer particles on small screens, so each one is drawn a little larger
  float density = sqrt(704.0 / float(uGrid.x));
  float sizePx = clamp(16.0 / z, 0.65, 1.9) * density
    * (0.75 + 0.5 * hash21(seed + 27.0))
    * (1.0 + glint * 0.25 + ripple * 0.20 + shock * 0.75);

  gl_Position = vec4(
    vec2(u, sy) + drift + push + shockPush + offset * sizePx * 2.0 / resolution,
    0.5,
    1.0
  );
  vLocal = offset;
}
