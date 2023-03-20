class FabrDebugger {
  constructor() {
    this.component = null;
    this.helper = null;
    this.logPrefix = "🪲";
    this.benchmarks = {};
  }

  registerComponent(component) {
    this.component = component;
    this.logPrefix = `${this.logPrefix} <🧩:${component.componentName}:${component.componentUID}>`;
    this.log("Registered.");
  }

  registerHelper(helper) {
    this.helper = helper;
    this.logPrefix = `${this.logPrefix} <🧰:${helper.helperName}:${helper.helperUID}>`;
    this.log(`Registered by {@@}`, helper.component.reprX);
  }

  start_bench(component) {
    this.benchmarks[component.componentName] = performance.now();
  }

  stop_bench(component) {
    const end = performance.now();
    const start = this.benchmarks[component.componentName];
    const duration = end - start;
    this.log(`Bench took ${duration}ms`);
  }

  getAllBenchmarks() {
    return this.benchmarks;
  }

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

  logger(message, reprX = undefined, logColor = "#6c63ff") {
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

  log(message, reprX = undefined) {
    this.logger(message, reprX, "#6c63ff");
  }

  error(message, reprX = undefined) {
    this.logger(message, reprX, "#ef1616");
  }

  warn(message, reprX = undefined) {
    this.logger(message, reprX, "#fd9f41");
  }

  success(message, reprX = undefined) {
    this.logger(message, reprX, "#00b894");
  }
}
