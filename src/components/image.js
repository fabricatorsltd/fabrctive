/**
 * @classdesc Represents a FabrImage component.
 * @extends FabrCoreComponent
 */
fbr.FabrImage = class extends fbr.FabrCoreComponent {
  constructor() {
    super();
    this.componentName = "FabrImage";
    this.componentStyleClass = "fabr-image";
    this.selector = "[fabr-image]";
    this.eventMap = {};
    this.animateHelper = new fbr.FabrHelperAnimate();
    this.animateHelper.init(this);
  }

  /**
   * Render the image.
   * @param {HTMLElement} image The image.
   */
  render(image) {
    const settings = this.getElementSettings(image);

    image.width = image.width;
    image.height = image.height;
    image.realSrc = image.src;

    if (settings.length === 0) {
      return;
    }

    if (settings.includes("managed")) {
      this.addInternalEventListener(
        document,
        "scroll",
        "manageImageOnScroll",
        image
      );
      this.addInternalEventListener(window, "resize", "manageImage", image);
      this.addInternalEventListener(
        window,
        "orientationchange",
        "manageImage",
        image
      );
    }
  }

  /**
   * Manage the image on scroll.
   * @param {Event} event The event.
   * @param {HTMLElement} image The image.
   */
  manageImageOnScroll(event, image) {
    clearTimeout(image.scrollTimeout);

    image.scrollTimeout = setTimeout(() => {
      this.manageImage(event, image);
    }, 100);
  }

  /**
   * Manage the image.
   * @param {HTMLElement} image The image.
   */
  manageImage(_, image) {
    let process = false;

    if (!this.isElementInViewport(image.parentNode)) {
      process = true;
    }

    if (process) {
      image.src = "";
      image.style.visibility = "hidden";
    } else {
      image.src = image.realSrc;
      image.style.visibility = "visible";
    }
  }
};
