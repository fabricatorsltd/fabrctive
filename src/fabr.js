/**
 * @classdesc The main entry point for the Fabr library.
 * @class
 */
class Fabr extends FabrCore {
  constructor() {
    super();
    console.log("%cFabr initializing...", "color: #00f");

    this.components = {
      form: new FabrForm(),
      link: new FabrLink(),
      counter: new FabrCounter(),
      tooltip: new FabrTooltip(),
      notebook: new FabrNotebook(),
      table: new FabrTable(),
      animator: new FabrAnimator(),
      snippet: new FabrSnippet(),
    };
    this.init();

    console.log("%cFabr initialized", "color: #00f");
  }

  init() {
    this.initComponents();

    // @@@IF NOT BUILD@@@
    this.initTests();
    // @@@ENDIF@@@
  }

  /**
   * Initializes all of the components in the Fabr library.
   */
  initComponents() {
    for (const cName in this.components) {
      this.components[cName].init();
    }
  }

  /**
   * Gets a component by name.
   * @param {string} cName - The name of the component to get.
   * @returns {FabrComponent} The component.
   */
  getComponent(cName) {
    return this.components[cName];
  }

  /**
   * Get all of the components.
   * @returns {Object} The components.
   */
  getComponents() {
    return this.components;
  }

  // @@@IF NOT BUILD@@@
  /**
   * Initializes all of the tests in the Fabr library.
   */
  initTests() {
    new LocalStorageTestComponent().init();
    new SharedMemory1TestComponent().init();
    new SharedMemory2TestComponent().init();
  }
  // @@@ENDIF@@@
}

fabr = new Fabr();
