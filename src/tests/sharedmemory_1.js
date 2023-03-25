/**
 * @classdesc Represents a SharedMemory1TestComponent component.
 * @extends FabrCoreComponent
 */
fbr.SharedMemory1TestComponent = class extends fbr.FabrCoreComponent {
  constructor() {
    super();
    this.componentName = "SharedMemory1Test";
    this.componentType = "test";
    this.sharedMemoryHelper = new fbr.FabrHelperSharedMemory();
    this.sharedMemoryHelper.init(this);
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
    // this set a value in the shared memory
    this.sharedMemoryHelper.set("testKey", "testValue");

    // this set a protected value in the shared memory
    this.sharedMemoryHelper.set("testKey2", "testValue2", true, true);
  }
};
