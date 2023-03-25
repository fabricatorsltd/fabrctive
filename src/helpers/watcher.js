/**
 * @classdesc Represents a FabrHelperWatcher helper.
 * @extends FabrHelper
 */
fbr.FabrHelperWatcher = class extends fbr.FabrHelper {
  constructor() {
    super();
    this.helperName = "Watcher";
    this.watchers = {};
  }

  /**
   * Starts watching a variable for changes.
   * @param {any} variable - The variable to watch.
   * @param {function} func - The function to call when the variable changes.
   */
  watch(variable, func) {
    // @@@IF NOT BUILD@@@
    this.debugger.log(`Watching ${variable}`);
    // @@@ENDIF@@@

    this.watchers[variable] = setInterval(() => {
      if (this.watchers[variable] !== variable) {
        this.watchers[variable] = variable;
        func(variable);
      }
    }, 100);
  }

  /**
   * Stops watching a variable for changes.
   * @param {any} variable - The variable to stop watching.
   * @returns {boolean} True if the variable was being watched, false otherwise.
   */
  unwatch(variable) {
    // @@@IF NOT BUILD@@@
    this.debugger.log(`Unwatching ${variable}`);
    // @@@ENDIF@@@

    if (this.watchers[variable]) {
      clearInterval(this.watchers[variable]);
      delete this.watchers[variable];
      return true;
    }
    return false;
  }

  /**
   * Stops watching all variables for changes.
   * @returns {boolean} True if any variables were being watched, false otherwise.
   */
  unwatchAll() {
    // @@@IF NOT BUILD@@@
    this.debugger.log(`Unwatching all`);
    // @@@ENDIF@@@

    let result = false;
    for (let variable of Object.keys(this.watchers)) {
      result = this.unwatch(variable) || result;
    }
    return result;
  }
};
