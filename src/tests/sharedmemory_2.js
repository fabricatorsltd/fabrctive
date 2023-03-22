/**
 * @classdesc Represents a SharedMemory2TestComponent component.
 * @extends FabrCoreComponent
 */
class SharedMemory2TestComponent extends FabrCoreComponent {
  constructor() {
    super();
    this.componentName = "SharedMemory2Test";
    this.componentType = "test";
    this.sharedMemoryHelper = new FabrHelperSharedMemory();
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
    // this read a value from the shared memory
    this.debugger.log(`testKey = ${this.sharedMemoryHelper.get("testKey")}`); // should output `testKey = testValue`

    // this tries to remove a protected value from the shared memory
    this.sharedMemoryHelper.remove("testKey2"); // should output `testKey2 is protected and cannot be removed`
  }
}
