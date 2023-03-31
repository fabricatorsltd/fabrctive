/**
 * @classdesc Represents a FabrPreLoad component.
 * @extends FabrCoreComponent
 */
fbr.FabrPreLoad = class extends fbr.FabrCoreComponent {
  constructor() {
    super();
    this.componentName = "FabrPreLoad";
    this.componentStyleClass = "fabr-preload";
    this.selector = "[fabr-preload]";
    this.eventMap = {};
  }

  /**
   * Render the preloader.
   * @param {Event} preload - The preload object.
   */
  render(preload) {
    let source = "";

    if (preload.hasAttribute("fabr-preload-target")) {
      source = preload.getAttribute("fabr-preload-target");
    }

    if (!source) {
      // @@@IF NOT BUILD@@@
      this.debugger.log(`Preload target not provided.`);
      // @@@ENDIF@@@
    }

    this.fetchContent(source).then((html) => {
      return this.renderContent(html, preload);
    });
  }
};
