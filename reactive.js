class Reactive extends ReactiveCore {
  constructor() {
    super();
    console.log("Reactive initializing");
    this.init();
    console.log("Reactive initialized");
  }

  init() {
    this.initForms();
    this.initLinks();
    this.initCounters();
    this.initTooltips();
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

  initTooltips() {
    const tooltips = new ReactiveTooltip();
    tooltips.init();
  }
}
