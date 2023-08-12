/**
 * @classdesc Represents a FabrHelperSharedMemory helper.
 * @extends FabrHelper
 */

fbr.FabrHelperSharedMemory = class extends fbr.FabrHelper {
  constructor() {
    super();
    this.helperName = "SharedMemory";
  }

  init(component) {
    super.init(component);
    this.sharedMemory = this.#getSharedMemory();
    this.restrictedKeys = this.#getRestrictedKeys();
    this.observers = this.#getObservers();
  }

  /**
   * Get the shared memory stored in the window object.
   * @returns {Object} The shared memory.
   * @private
   */
  #getSharedMemory() {
    if (fbr._fabrSharedMemory) {
      return fbr._fabrSharedMemory;
    }

    fbr._fabrSharedMemory = {};
    return fbr._fabrSharedMemory;
  }

  /**
   * Get the restricted keys stored in the window object.
   * @returns {Array} The restricted keys.
   * @private
   */
  #getRestrictedKeys() {
    if (fbr._fabrSharedMemoryRestrictedKeys) {
      return fbr._fabrSharedMemoryRestrictedKeys;
    }
    fbr._fabrSharedMemoryRestrictedKeys = [];
    return fbr._fabrSharedMemoryRestrictedKeys;
  }

  /**
   * Get the observers stored in the window object.
   * @returns {Map} The observers.
   * @private
   */
  #getObservers() {
    if (fbr._fabrSharedMemoryObservers) {
      return fbr._fabrSharedMemoryObservers;
    }
    fbr._fabrSharedMemoryObservers = new Map();
    return fbr._fabrSharedMemoryObservers;
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
   * Get all of the keys in the shared memory.
   * @returns {Array} The keys in the shared memory.
   */
  getKeys() {
    // @@@IF NOT BUILD@@@
    this.debugger.log(`Getting keys`);
    // @@@ENDIF@@@

    return Object.keys(this.sharedMemory);
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
  /**
   * Connect a component as an observer for a variable in sharedMemory.
   * @param {string} variableName - The name of the variable.
   * @param {Object} observerComponent - The component that will observe the variable.
   * @param {Function} callback - The function to call when the variable changes.
   */
  connect(variableName, observerComponent, callback) {
    // @@@IF NOT BUILD@@@
    this.debugger.log(
      `Connecting ${observerComponent.componentName} to ${variableName}`
    );
    // @@@ENDIF@@@

    if (!this.observers.has(variableName)) {
      this.observers.set(variableName, []);
    }

    this.observers.get(variableName).push({
      component: observerComponent,
      callback: callback,
    });

    // @@@IF NOT BUILD@@@
    this.debugger.log(
      `Connected ${observerComponent.componentName} to ${variableName}`
    );
    // @@@ENDIF@@@
  }

  /**
   * Update the value of a variable in sharedMemory and notify observers.
   * @param {string} variableName - The name of the variable.
   * @param {any} value - The new value of the variable.
   */
  update(variableName, value) {
    // @@@IF NOT BUILD@@@
    this.debugger.log(`Updating ${variableName} to ${value}`);
    // @@@ENDIF@@@

    if (this.sharedMemory[variableName] !== value) {
      this.sharedMemory[variableName] = value;
      this.notifyObservers(variableName, value);
    }
  }

  /**
   * Notify all observers that the variable has changed.
   * @param {string} variableName - The name of the variable.
   * @param {any} value - The new value of the variable.
   */
  notifyObservers(variableName, value) {
    // @@@IF NOT BUILD@@@
    this.debugger.log(`Notifying observers of ${variableName}`);
    // @@@ENDIF@@@

    const observers = this.observers.get(variableName);
    if (observers) {
      for (const observer of observers) {
        observer.callback.call(observer.component, value);
      }
    }
  }
};
