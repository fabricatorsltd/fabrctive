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
  initTests() {
    new LocalStorageTestComponent().init();
  }
  // @@@ENDIF@@@

  initComponents() {
    new FabrForm().init();
    new FabrLink().init();
    new FabrCounter().init();
    new FabrTooltip().init();
    new FabrNotebook().init();
    new FabrTable().init();
  }
}
