class ReactiveCoreComponent extends ReactiveCore {
  constructor() {
    super();

    // @@@IF NOT BUILD@@@
    this.debugger = new ReactiveDebugger();
    // @@@ENDIF@@@

    this.componentUID = Math.random().toString(36).substr(2, 9);
    this.componentName = "Generic";
    this.selector = "";
    this.eventMap = {};
  }

  init() {
    // @@@IF NOT BUILD@@@
    this.debugger.register(this);
    this.debugger.start_bench(this);
    // @@@ENDIF@@@

    this.initElements();
    this.initEventListeners();

    // @@@IF NOT BUILD@@@
    this.debugger.stop_bench(this);
    // @@@ENDIF@@@
  }

  initElements() {
    this.elements = document.querySelectorAll(this.selector);
  }

  initEventListeners() {
    for (let [event, fn] of Object.entries(this.eventMap)) {
      // @@@IF NOT BUILD@@@
      this.debugger.log(`Adding event listener for ${event} on ${fn}`);
      // @@@ENDIF@@@
      this.elements.forEach((element) => {
        element.addEventListener(event, (e) => {
          // @@@IF NOT BUILD@@@
          this.debugger.log(
            `Event ${e.type} triggered on ${fn} for\n\t\t${e.target.outerHTML}`
          );
          // @@@ENDIF@@@
          this[fn](e);
        });
      });
    }
  }
}
