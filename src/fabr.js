/**
 * @classdesc The main entry point for the Fabr library.
 * @class
 */
class Fabr extends FabrCore {
  constructor() {
    super();
    console.log("%cFabr initializing...", "color: #00f");
    this.init();
    console.log("%cFabr initialized", "color: #00f");
  }

  init() {
    this.initComponents();

    // @@@IF NOT BUILD@@@
    this.initTests();
    // @@@ENDIF@@@
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

  /**
   * Initializes all of the components in the Fabr library.
   */
  initComponents() {
    new FabrForm().init();
    new FabrLink().init();
    new FabrCounter().init();
    new FabrTooltip().init();
    new FabrNotebook().init();
    new FabrTable().init();
    new FabrAnimator().init();
    new FabrSnippet().init();
  }
}
