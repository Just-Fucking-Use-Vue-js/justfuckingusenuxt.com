export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'neutral',
    },
    button: {
      slots: {
        // a slight press, so a click feels physical; colors still transition
        base: 'transition-[color,background-color,border-color,box-shadow,scale] duration-150 [transition-timing-function:ease,ease,ease,ease,var(--ease-out)] active:scale-[0.97] motion-reduce:active:scale-100',
      },
    },
    pageSection: {
      slots: {
        container: 'py-10 sm:py-20 lg:py-20',
      },
    },
  },
})
