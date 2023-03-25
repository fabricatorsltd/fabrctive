/**
 * @classdesc Provides common functionality that can be shared by all components in the Fabr library.
 * @class
 */
fbr.FabrHelper = class {
  constructor() {
    // @@@IF NOT BUILD@@@
    this.debugger = new fbr.FabrDebugger();
    // @@@ENDIF@@@

    this.helperUID = Math.random().toString(36).substr(2, 9);
    this.helperName = "Generic";
    this.component = null;
  }

  /**
   * Initializes the helper for the specified component.
   * @param {FabrCoreComponent} component - The component that the helper is being initialized for.
   */
  init(component) {
    this.component = component;

    // @@@IF NOT BUILD@@@
    this.debugger.registerHelper(this);
    // @@@ENDIF@@@
  }
};
