/**
 * @classdesc Represents a FabrHelperLocalStorage helper.
 * @extends FabrHelper
 */
fbr.FabrHelperLocalStorage = class extends fbr.FabrHelper {
  constructor() {
    super();
    this.helperName = "LocalStorage";
  }

  /**
   * Set an item in the Local Storage.
   * @param {string} key - The key to set.
   * @param {string} value - The value to set.
   */
  setItem(key, value) {
    // @@@IF NOT BUILD@@@
    this.debugger.log(`Setting item the Local Storage: ${key} = ${value}`);
    // @@@ENDIF@@@

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Failed to save data to Local Storage: ", e);
    }
  }

  /**
   * Get an item from the Local Storage.
   * @param {string} key - The key to get.
   * @returns {any} The value of the item.
   */
  getItem(key) {
    // @@@IF NOT BUILD@@@
    this.debugger.log(`Getting item from the Local Storage: ${key}`);
    // @@@ENDIF@@@

    try {
      const item = localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      }
      return null;
    } catch (e) {
      console.error("Failed to retrieve data from Local Storage: ", e);
      return null;
    }
  }

  /**
   * Remove an item from the Local Storage.
   * @param {string} key - The key to remove.
   */
  removeItem(key) {
    // @@@IF NOT BUILD@@@
    this.debugger.log(`Removing item from the Local Storage: ${key}`);
    // @@@ENDIF@@@

    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error("Failed to remove data from Local Storage: ", e);
    }
  }

  /**
   * Initialize a storage object for the component.
   */
  initComponentStorage() {
    // @@@IF NOT BUILD@@@
    this.debugger.log(
      `Initializing Local Storage for {@@}`,
      this.component.reprX
    );
    // @@@ENDIF@@@

    this.setItem(this.component.componentUID, {});
  }

  /**
   * Get the storage object for the component.
   * @returns {object} The storage object.
   */
  getComponentStorage() {
    // @@@IF NOT BUILD@@@
    this.debugger.log(`Getting Local Storage for {@@}`, this.component.reprX);
    // @@@ENDIF@@@

    const storage = this.getItem(this.component.componentUID);
    if (storage === null) {
      this.initComponentStorage();
      return {};
    }
    return storage;
  }

  /**
   * Set an item in the component's Local Storage.
   * @param {string} key - The key to set.
   * @param {string} value - The value to set.
   */
  setCItem(key, value) {
    // @@@IF NOT BUILD@@@
    this.debugger.log(
      `Setting Local Storage item for {@@}: ${key} = ${value}`,
      this.component.reprX
    );
    // @@@ENDIF@@@

    const storage = this.getComponentStorage();
    storage[key] = value;
    this.setItem(this.component.componentUID, storage);
  }

  /**
   * Get an item from the component's Local Storage.
   * @param {string} key - The key to get.
   * @returns {any} The value of the item.
   */
  getCItem(key) {
    // @@@IF NOT BUILD@@@
    this.debugger.log(
      `Getting Local Storage item for {@@}: ${key}`,
      this.component.reprX
    );
    // @@@ENDIF@@@

    const storage = this.getComponentStorage();
    return storage[key];
  }

  /**
   * Remove an item from the component's Local Storage.
   * @param {string} key - The key to remove.
   */
  removeCItem(key) {
    // @@@IF NOT BUILD@@@
    this.debugger.log(
      `Removing Local Storage item for {@@}: ${key}`,
      this.component.reprX
    );
    // @@@ENDIF@@@

    const storage = this.getComponentStorage();
    delete storage[key];
    this.setItem(this.component.componentUID, storage);
  }

  /**
   * Clear the component's Local Storage.
   * @param {string} key - The key to remove.
   */
  clearComponentStorage() {
    // @@@IF NOT BUILD@@@
    this.debugger.log(`Clearing Local Storage for {@@}`, this.component.reprX);
    // @@@ENDIF@@@

    this.removeItem(this.component.componentUID);
  }
};
