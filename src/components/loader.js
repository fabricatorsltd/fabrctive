/**
 * @classdesc Represents a FabrLoader component.
 * @extends FabrCoreComponent
 */
fbr.FabrLoader = class extends fbr.FabrCoreComponent {
  constructor() {
    super();
    this.componentName = "FabrLoader";
    this.componentStyleClass = "fabr-loader";
    this.selector = "[fabr-loader]";
    this.eventMap = {};

    this.animateHelper = new fbr.FabrHelperAnimate();
    this.animateHelper.init(this);
  }

  /**
   * Render the loader.
   * @param {Object} loader - The loader to render.
   */
  render(loader) {
    this.animateHelper.fadeIn(loader, 500);
  }
};
