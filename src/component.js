class FabrCoreComponent extends FabrCore {
  constructor() {
    super();

    // @@@IF NOT BUILD@@@
    this.debugger = new FabrDebugger();
    // @@@ENDIF@@@

    this.componentUID = Math.random().toString(36).substr(2, 9);
    this.componentName = "Generic";
    this.selector = "";
    this.eventMap = {};
  }

  init() {
    // @@@IF NOT BUILD@@@
    this.debugger.registerComponent(this);
    this.debugger.start_bench(this);
    // @@@ENDIF@@@

    this.initElements();
    this.initEventListeners();

    // @@@IF NOT BUILD@@@
    this.debugger.stop_bench(this);
    // @@@ENDIF@@@
  }

  get repr() {
    return `<${this.componentName}:${this.componentUID}>`;
  }

  get reprX() {
    return [
      `<${this.componentName}:${this.componentUID}>`,
      "background: #6c63ff; color: white; border-radius: 3px; padding: 0 3px; font-weight: bold",
    ];
  }

  initElements() {
    this.elements = document.querySelectorAll(this.selector);
  }

  initEventListeners() {
    if (Object.keys(this.eventMap).length === 0) {
      this.debugger.log(
        `No event listeners defined for ${this.repr} on ${this.selector}`
      );
      return;
    }

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

  addInternalEventListener(element, event, fn, reference = null) {
    // @@@IF NOT BUILD@@@
    this.debugger.log(`Adding internal event listener for ${event} on ${fn}`);
    // @@@ENDIF@@@

    element.addEventListener(event, (e) => {
      // @@@IF NOT BUILD@@@
      this.debugger.log(
        `Event ${e.type} triggered on ${fn} for\n\t\t${e.target.outerHTML}`
      );
      // @@@ENDIF@@@

      this[fn](e, reference);
    });
  }
}