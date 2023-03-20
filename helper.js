class ReactiveHelper {
  constructor() {
    // @@@IF NOT BUILD@@@
    this.debugger = new ReactiveDebugger();
    // @@@ENDIF@@@

    this.helperUID = Math.random().toString(36).substr(2, 9);
    this.helperName = "Generic";
    this.component = null;
  }

  init(component) {
    this.component = component;

    // @@@IF NOT BUILD@@@
    this.debugger.registerHelper(this);
    // @@@ENDIF@@@
  }
}
