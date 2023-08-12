/**
 * @classdesc Represents a SharedMemory3TestComponent component.
 * @extends FabrCoreComponent
 */
fbr.SharedMemory3TestComponent = class extends fbr.FabrCoreComponent {
  constructor() {
    super();
    this.componentName = "SharedMemory3Test";
    this.componentType = "test";
    this.sharedMemoryHelper = new fbr.FabrHelperSharedMemory();
    this.sharedMemoryHelper.init(this);

    this.timer = null;
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
    this.sharedMemoryHelper.set("isElementVisible", false);

    this.timer = setInterval(() => {
      // @@@IF NOT BUILD@@@
      this.debugger.log("Toggling isElementVisible");
      // @@@ENDIF@@@

      const currentValue = this.sharedMemoryHelper.get("isElementVisible");
      this.sharedMemoryHelper.update("isElementVisible", !currentValue);
    }, 5000);
  }
};
