class ReactiveHelperAnimate extends ReactiveHelper {
  constructor() {
    super();
    this.helperName = "Animate";
  }

  animate(element, duration, from, to, display, remove = false) {
    // @@@IF NOT BUILD@@@
    this.debugger.log(
      `Animating {@@} from ${from} to ${to} over ${duration}ms`,
      this.component.reprX
    );
    // @@@ENDIF@@@

    element.style.opacity = from;
    element.style.display = display;

    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const opacity = from + (to - from) * (progress / duration);
      element.style.opacity = opacity;

      if (progress < duration) {
        window.requestAnimationFrame(step);
      } else {
        element.style.opacity = to;
        if (to === 0) {
          element.style.display = "none";
          if (remove) {
            element.remove();
          }
        }
      }
    };

    window.requestAnimationFrame(step);
  }

  fadeIn(element, duration = 400) {
    this.animate(element, duration, 0, 1, "block");
  }

  fadeOut(element, remove = false, duration = 400) {
    this.animate(element, duration, 1, 0, "block", remove);
  }
}
