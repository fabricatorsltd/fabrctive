class FabrHelperAnimate extends FabrHelper {
  constructor() {
    super();
    this.helperName = "Animate";
  }

  animate(element, animation, duration = 400) {
    switch (animation) {
      case "fadeIn":
        this.fadeIn(element, duration);
        break;
      case "fadeOut":
        this.fadeOut(element, duration);
        break;
      case "slideUp":
        this.slideUp(element, duration);
        break;
      case "slideDown":
        this.slideDown(element, duration);
        break;
      case "slideLeft":
        this.slideLeft(element, duration);
        break;
      case "slideRight":
        this.slideRight(element, duration);
        break;
      default:
        break;
    }
  }

  // Fade animations
  fade(element, duration, from, to, display, remove = false) {
    // @@@IF NOT BUILD@@@
    this.debugger.log(
      `Fading {@@} from ${from} to ${to} over ${duration}ms`,
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
    this.fade(element, duration, 0, 1, "block");
  }

  fadeOut(element, remove = false, duration = 400) {
    this.fade(element, duration, 1, 0, "block", remove);
  }

  // Slide animations

  slide(element, duration, from, to, display, remove = false) {
    // @@@IF NOT BUILD@@@
    this.debugger.log(
      `Sliding {@@} from ${from} to ${to} over ${duration}ms`,
      this.component.reprX
    );
    // @@@ENDIF@@@

    // to/from can be 0 or -100, where -100 is offscreen
    element.style.transform = `translateX(${from}%)`;
    element.style.display = display;

    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const translate = from + (to - from) * (progress / duration);
      element.style.transform = `translateX(${translate}%)`;

      if (progress < duration) {
        window.requestAnimationFrame(step);
      } else {
        element.style.transform = `translateX(${to}%)`;
        if (to === 0) {
          element.style.display = "block";
          if (remove) {
            element.remove();
          }
        }
      }
    };

    window.requestAnimationFrame(step);
  }

  slideUp(element, duration = 400) {
    this.slide(element, duration, 0, -100, "block");
  }

  slideDown(element, duration = 400) {
    this.slide(element, duration, -100, 0, "block");
  }

  slideLeft(element, duration = 400) {
    this.slide(element, duration, 0, -100, "block");
  }

  slideRight(element, duration = 400) {
    this.slide(element, duration, -100, 0, "block");
  }
}
