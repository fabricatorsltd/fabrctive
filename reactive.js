class Reactive extends ReactiveCore {
  constructor() {
    super();
    this.init();
    console.log("Reactive initialized");
  }

  init() {
    this.initForms();
    this.initLinks();
    this.initCounters();
  }

  initForms() {
    const forms = new ReactiveForm();
    forms.init();
  }

  initLinks() {
    const links = new ReactiveLink();
    links.init();
  }

  initCounters() {
    const counters = new ReactiveCounter();
    counters.init();
  }
}
