class ReactiveDebugger {
  constructor() {
    this.component = null;
    this.logPrefix = "🪲";
    this.benchmarks = {};
  }

  register(component) {
    this.component = component;
    this.logPrefix = `${this.logPrefix} <🧩:${component.componentName}:${component.componentUID}>`;
    this.log("Registered.");
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

  log(message) {
    console.log(
      `%c${this.logPrefix} %c${message}`,
      "color: #6c63ff; font-weight: bold",
      "color: #000000; font-weight: normal"
    );
  }

  error(message) {
    console.error(
      `%c${this.logPrefix} %c${message}`,
      "color: #ef1616; font-weight: bold",
      "color: #000000; font-weight: normal"
    );
  }

  warn(message) {
    console.warn(
      `%c${this.logPrefix} %c${message}`,
      "color: #fd9f41; font-weight: bold",
      "color: #000000; font-weight: normal"
    );
  }

  success(message) {
    console.log(
      `%c${this.logPrefix} %c${message}`,
      "color: #00b894; font-weight: bold",
      "color: #000000; font-weight: normal"
    );
  }
}
