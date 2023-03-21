/**
 * @classdesc A class representing a Fabr debugger for logging and benchmarking.
 * @class
 */
class FabrDebugger {
  constructor() {
    this.component = null;
    this.helper = null;
    this.logPrefix = "🪲";
    this.benchmarks = {};
  }

  /**
   * Register a component
   * @param {Object} component - The component to register
   */
  registerComponent(component) {
    this.component = component;
    const icon = component.componentType === "test" ? "🧪" : "🧩";
    this.logPrefix = `${this.logPrefix} <${icon}:${component.componentName}:${component.componentUID}>`;
    this.log("Registered.");
  }

  /**
   * Register a helper
   * @param {Object} helper - The helper to register
   */
  registerHelper(helper) {
    this.helper = helper;
    this.logPrefix = `${this.logPrefix} <🧰:${helper.helperName}:${helper.helperUID}>`;
    this.log(`Registered by {@@}`, helper.component.reprX);
  }

  /**
   * Start benchmarking a component
   * @param {Object} component - The component to benchmark
   */
  start_bench(component) {
    this.benchmarks[component.componentName] = performance.now();
  }

  /**
   * Stop benchmarking a component and log the duration
   * @param {Object} component - The component to stop benchmarking
   */
  stop_bench(component) {
    const end = performance.now();
    const start = this.benchmarks[component.componentName];
    const duration = end - start;
    this.log(`Bench took ${duration}ms`);
  }

  /**
   * Get all benchmarks
   * @returns {Object.<string, number>} The benchmarks
   */
  getAllBenchmarks() {
    return this.benchmarks;
  }

  /**
   * Group console logs under a label
   * @param {string} label - The label to group under
   * @param {Function} callback - The callback function to execute
   */
  group(label, callback) {
    /*
        Example usage:
        this.debugger.group("API Request", () => {
            this.debugger.log("Sending request...");
            this.debugger.start_bench(this);
            // Make API request
            this.debugger.stop_bench(this);
            this.debugger.log("Received response.");
        });
    */
    console.group(
      `${this.logPrefix} %c${label}`,
      "color: #6c63ff; font-weight: bold"
    );
    callback();
    console.groupEnd();
  }

  /**
   * Log a message
   * @param {string} message - The message to log
   * @param {?Array.<string>} reprX - The representation to log with the message
   * @param {string} logColor - The color of the log
   * @private
   */
  #logger(message, reprX = undefined, logColor = "#6c63ff") {
    if (reprX) {
      message = message.replace("{@@}", `%c${reprX[0]}%c`);
      console.log(
        `%c${this.logPrefix} %c${message}`,
        `color: ${logColor}; font-weight: bold`,
        "color: #000000; font-weight: normal",
        reprX[1],
        "color: #000000; font-weight: normal"
      );
    } else {
      console.log(
        `%c${this.logPrefix} %c${message}`,
        `color: ${logColor}; font-weight: bold`,
        "color: #000000; font-weight: normal"
      );
    }
  }

  /**
   * Log a message
   * @param {string} message - The message to log
   * @param {?Array.<string>} reprX - The representation to log with the message
   */
  log(message, reprX = undefined) {
    this.#logger(message, reprX, "#6c63ff");
  }

  /**
   * Log an error message
   * @param {string} message - The message to log
   * @param {?Array.<string>} reprX - The representation to log with the message
   */
  error(message, reprX = undefined) {
    this.#logger(message, reprX, "#ef1616");
  }

  /**
   * Log a warning message
   * @param {string} message - The message to log
   * @param {?Array.<string>} reprX - The representation to log with the message
   */
  warn(message, reprX = undefined) {
    this.#logger(message, reprX, "#fd9f41");
  }

  /**
   * Log a success message
   * @param {string} message - The message to log
   * @param {?Array.<string>} reprX - The representation to log with the message
   */
  success(message, reprX = undefined) {
    this.#logger(message, reprX, "#00b894");
  }
}
