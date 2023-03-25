/**
 * @classdesc Represents a LocalStorageTestComponent component.
 * @extends FabrCoreComponent
 */
fbr.LocalStorageTestComponent = class extends fbr.FabrCoreComponent {
  constructor() {
    super();
    this.componentName = "FabrLocalStorageTest";
    this.componentType = "test";
    this.localStorageHelper = new fbr.FabrHelperLocalStorage();
    this.localStorageHelper.init(this);
  }

  /**
   * Initialize the test component.
   * @override
   */
  init() {
    super.init();
    this.#run_test();
  }

  /**
   * Run the test.
   * @private
   */
  #run_test() {
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
};
