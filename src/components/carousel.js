/**
 * @classdesc Represents a FabrCarousel component.
 * @extends FabrCoreComponent
 */
fbr.FabrCarousel = class extends fbr.FabrCoreComponent {
  constructor() {
    super();
    this.componentName = "Carousel";
    this.componentStyleClass = "fabr-carousel";
    this.selector = "[fabr-carousel]";
    this.eventMap = {};

    this.iconHelper = new fbr.FabrHelperIcon();
    this.iconHelper.init(this);
    this.iconHelper.setIconsLibraryMaterial();

    this.animateHelper = new fbr.FabrHelperAnimate();
    this.animateHelper.init(this);
  }

  /**
   * Render the carousel.
   * @param {Object} carousel - The carousel to render.
   */
  render(carousel) {
    const delay = carousel.getAttribute("fabr-carousel-delay");
    const wrapper = document.createElement("div");
    const slides = carousel.querySelectorAll("[fabr-carousel-slide]");

    carousel.style.height = `${carousel.offsetHeight}px`;
    carousel.delay = delay ? parseInt(delay) : 5000;

    wrapper.classList.add("fabr-carousel-wrapper");
    carousel.parentNode.insertBefore(wrapper, carousel);
    wrapper.appendChild(carousel);

    slides.forEach((slide) => {
      slide.classList.add("fabr-carousel-slide");
    });

    this.#renderControls(carousel);
    this.#renderIndicators(carousel);

    carousel.activeSlide = 0;
    this.#rotateSlides(carousel);
  }

  /**
   * Render the controls for the given carousel.
   * @param {Object} carousel - The carousel to render the controls for.
   * @private
   */
  #renderControls(carousel) {
    const controls = document.createElement("div");
    const prev = document.createElement("div");
    const next = document.createElement("div");

    controls.classList.add("fabr-carousel-controls");
    prev.classList.add("fabr-carousel-control-prev");
    next.classList.add("fabr-carousel-control-next");

    const prevIcon = this.iconHelper.new("chevron_left");
    const nextIcon = this.iconHelper.new("chevron_right");

    prev.appendChild(prevIcon);
    next.appendChild(nextIcon);

    controls.appendChild(prev);
    controls.appendChild(next);

    carousel.appendChild(controls);

    this.addInternalEventListener(prev, "click", "setSlideEvent", carousel, -2);
    this.addInternalEventListener(next, "click", "setSlideEvent", carousel, -1);
  }

  /**
   * Render the indicators for the given carousel.
   * @param {Object} carousel - The carousel to render the indicators for.
   * @private
   */
  #renderIndicators(carousel) {
    const indicators = document.createElement("div");
    const slides = carousel.querySelectorAll("[fabr-carousel-slide]");

    indicators.classList.add("fabr-carousel-indicators");

    slides.forEach((_, index) => {
      const indicator = document.createElement("div");
      indicator.classList.add("fabr-carousel-indicator");
      indicator.setAttribute("fabr-carousel-indicator", "");
      indicator.setAttribute("fabr-carousel-indicator-index", index);
      indicators.appendChild(indicator);

      this.addInternalEventListener(
        indicator,
        "click",
        "setSlideEvent",
        carousel,
        index
      );
    });

    carousel.appendChild(indicators);
  }

  /**
   * Rotate the slides of the given carousel.
   * @param {Object} carousel - The carousel to rotate the slides for.
   * @private
   */
  #rotateSlides(carousel) {
    const slides = carousel.querySelectorAll("[fabr-carousel-slide]");
    const indicators = carousel.querySelectorAll("[fabr-carousel-indicator]");

    slides.forEach((slide) => {
      slide.classList.remove("fabr-carousel-slide-active");
    });

    indicators.forEach((indicator) => {
      indicator.classList.remove("fabr-carousel-indicator-active");
    });

    slides[carousel.activeSlide].classList.add("fabr-carousel-slide-active");
    indicators[carousel.activeSlide].classList.add(
      "fabr-carousel-indicator-active"
    );

    carousel.activeSlideTimeout = setTimeout(() => {
      this.setSlide(carousel, -1);
    }, carousel.delay);
  }
  /**
   * Event Function: Set the slide of the given carousel to the given index.
   * @param {Event} event - The event object.
   * @param {Object} carousel - The carousel to set the slide for.
   * @param {Number} index - The index of the slide to set.
   */
  setSlideEvent(_, carousel, index) {
    this.setSlide(carousel, index);
  }

  /**
   * Set the slide of the given carousel to the given index.
   * @param {Object} carousel - The carousel to set the slide for.
   * @param {Number} index - The index of the slide to set.
   */
  setSlide(carousel, index) {
    const slides = carousel.querySelectorAll("[fabr-carousel-slide]");

    if (index === -1) {
      index = carousel.activeSlide + 1;
    } else if (index === -2) {
      index = carousel.activeSlide - 1;
    }

    if (index >= slides.length) {
      index = 0;
    } else if (index < 0) {
      index = slides.length - 1;
    }

    clearTimeout(carousel.activeSlideTimeout);
    carousel.activeSlide = index;
    this.#rotateSlides(carousel);
  }
};
