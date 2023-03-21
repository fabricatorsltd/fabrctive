class FabrHelperLocalStorage extends FabrHelper {
  constructor() {
    super();
    this.helperName = "LocalStorage";
  }

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

  initComponentStorage() {
    // @@@IF NOT BUILD@@@
    this.debugger.log(
      `Initializing Local Storage for {@@}`,
      this.component.reprX
    );
    // @@@ENDIF@@@

    this.setItem(this.component.componentUID, {});
  }

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

  clearComponentStorage() {
    // @@@IF NOT BUILD@@@
    this.debugger.log(`Clearing Local Storage for {@@}`, this.component.reprX);
    // @@@ENDIF@@@

    this.removeItem(this.component.componentUID);
  }
}
