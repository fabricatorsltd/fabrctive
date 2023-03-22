/**
 * @classdesc Represents a FabrHelperSharedMemory helper.
 * @extends FabrHelper
 */
class FabrHelperSharedMemory extends FabrHelper {
  constructor() {
    super();
    this.helperName = "SharedMemory";
  }

  init(component) {
    super.init(component);
    this.sharedMemory = this.#getSharedMemory();
    this.restrictedKeys = this.#getRestrictedKeys();
  }

  /**
   * Get the shared memory stored in the window object.
   * @returns {Object} The shared memory.
   * @private
   */
  #getSharedMemory() {
    if (window.fabrSharedMemory) {
      return window.fabrSharedMemory;
    }

    window.fabrSharedMemory = {};
    return window.fabrSharedMemory;
  }

  /**
   * Get the restricted keys stored in the window object.
   * @returns {Array} The restricted keys.
   * @private
   */
  #getRestrictedKeys() {
    if (window.fabrSharedMemoryRestrictedKeys) {
      return window.fabrSharedMemoryRestrictedKeys;
    }
    window.fabrSharedMemoryRestrictedKeys = [];
    return window.fabrSharedMemoryRestrictedKeys;
  }

  /**
   * Set a value in the shared memory.
   * @param {string} key - The key to set.
   * @param {any} value - The value to set.
   * @param {boolean} replace - If true, the key will be replaced if it already exists.
   * @param {boolean} restricted - If true, the key will be restricted and cannot be removed or replaced.
   * @returns {boolean} True if the key was set, false otherwise.
   */
  set(key, value, replace = false, restricted = false) {
    // @@@IF NOT BUILD@@@
    this.debugger.log(`Setting ${key} to ${value}`);
    // @@@ENDIF@@@

    if (this.sharedMemory[key] && !replace) {
      // @@@IF NOT BUILD@@@
      this.debugger.error(`Key ${key} already exists`);
      // @@@ENDIF@@@

      return false;
    }

    if (this.restrictedKeys.includes(key)) {
      // @@@IF NOT BUILD@@@
      this.debugger.error(`Key ${key} is restricted`);
      // @@@ENDIF@@@

      return false;
    }

    if (restricted) {
      // @@@IF NOT BUILD@@@
      this.debugger.log(`Key ${key} is now restricted`);
      // @@@ENDIF@@@

      this.restrictedKeys.push(key);
    }

    this.sharedMemory[key] = value;
    return true;
  }

  /**
   * Get a value from the shared memory.
   * @param {string} key - The key to get.
   * @returns {any} The value of the key.
   * @returns {boolean} False if the key doesn't exist.
   */
  get(key) {
    // @@@IF NOT BUILD@@@
    this.debugger.log(`Getting ${key}`);
    // @@@ENDIF@@@

    if (this.sharedMemory[key]) {
      return this.sharedMemory[key];
    }
    return false;
  }

  /**
   * Remove a key from the shared memory.
   * @param {string} key - The key to remove.
   * @returns {boolean} True if the key was removed, false otherwise (key doesn't exist or is restricted).
   */
  remove(key) {
    // @@@IF NOT BUILD@@@
    this.debugger.log(`Removing ${key}`);
    // @@@ENDIF@@@

    if (this.restrictedKeys.includes(key)) {
      // @@@IF NOT BUILD@@@
      this.debugger.error(`Key ${key} is restricted`);
      // @@@ENDIF@@@

      return false;
    }

    if (this.sharedMemory[key]) {
      delete this.sharedMemory[key];
      return true;
    }
    return false;
  }
}
