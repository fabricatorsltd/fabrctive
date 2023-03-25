/**
 * @classdesc Represents a FabrHelperAnimate helper.
 * @extends FabrHelper
 */
fbr.FabrHelperAnimate = class extends fbr.FabrHelper {
  constructor() {
    super();
    this.helperName = "Animate";
  }

  /**
   * Animate an element by given details.
   * @param {HTMLElement} element - The element to animate.
   * @param {string} animation - The animation to use.
   * @param {number} duration - The duration of the animation.
   */
  animate(element, animation, duration = 200) {
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

  /**
   * Fade an element by given details.
   * @param {HTMLElement} element - The element to fade.
   * @param {number} duration - The duration of the fade.
   * @param {number} from - The opacity to start from.
   * @param {number} to - The opacity to end at.
   * @param {string} display - The display value to set.
   * @param {boolean} remove - Whether to remove the element after fading out.
   */
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

  /**
   * Fade an element in.
   * @param {HTMLElement} element - The element to fade in.
   * @param {number} duration - The duration of the fade.
   */
  fadeIn(element, duration = 200) {
    this.fade(element, duration, 0, 1, "block");
  }

  /**
   * Fade an element out.
   * @param {HTMLElement} element - The element to fade out.
   * @param {number} duration - The duration of the fade.
   */
  fadeOut(element, remove = false, duration = 200) {
    this.fade(element, duration, 1, 0, "block", remove);
  }

  /**
   * Slide an element by given details.
   * @param {HTMLElement} element - The element to slide.
   * @param {number} duration - The duration of the slide.
   * @param {number} from - The position to start from (0/-100)
   * @param {number} to - The position to end at (0/-100)
   * @param {string} display - The display value to set.
   * @param {boolean} remove - Whether to remove the element after sliding out.
   */
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

  /**
   * Slide an element up.
   * @param {HTMLElement} element - The element to slide.
   * @param {number} duration - The duration of the slide.
   */
  slideUp(element, duration = 200) {
    this.slide(element, duration, 0, -100, "block");
  }

  /**
   * Slide an element down.
   * @param {HTMLElement} element - The element to slide.
   * @param {number} duration - The duration of the slide.
   */
  slideDown(element, duration = 200) {
    this.slide(element, duration, -100, 0, "block");
  }

  /**
   * Slide an element left.
   * @param {HTMLElement} element - The element to slide.
   * @param {number} duration - The duration of the slide.
   */
  slideLeft(element, duration = 200) {
    this.slide(element, duration, 0, -100, "block");
  }

  /**
   * Slide an element right.
   * @param {HTMLElement} element - The element to slide.
   * @param {number} duration - The duration of the slide.
   */
  slideRight(element, duration = 200) {
    this.slide(element, duration, -100, 0, "block");
  }
};
