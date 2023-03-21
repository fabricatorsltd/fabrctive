class LocalStorageTestComponent extends FabrCoreComponent {
  constructor() {
    super();
    this.componentName = "FabrLocalStorageTest";
    this.componentType = "test";
    this.localStorageHelper = new FabrHelperLocalStorage();
    this.localStorageHelper.init(this);
  }

  init() {
    super.init();
    this.run_test();
  }

  run_test() {
    this.localStorageHelper.initComponentStorage();

    this.localStorageHelper.setCItem("testKey", "testValue");
    const value = this.localStorageHelper.getCItem("testKey");
    this.debugger.log(`testKey = ${value}`); // should output `testKey = testValue

    this.localStorageHelper.removeCItem("testKey");
    const removedValue = this.localStorageHelper.getCItem("testKey");
    this.debugger.log(`testKey = ${removedValue}`); // should output `testKey = undefined

    this.localStorageHelper.clearComponentStorage();
    const clearedValue = this.localStorageHelper.getCItem("testKey");
    this.debugger.log(`testKey = ${clearedValue}`); // should output `testKey = undefined
  }
}
