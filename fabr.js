class Fabr extends FabrCore {
  constructor() {
    super();
    console.log("Fabr initializing");
    this.init();
    console.log("Fabr initialized");
  }

  init() {
    this.initForms();
    this.initLinks();
    this.initCounters();
    this.initTooltips();
    this.initNotebooks();
    this.initTables();
  }

  initForms() {
    const forms = new FabrForm();
    forms.init();
  }

  initLinks() {
    const links = new FabrLink();
    links.init();
  }

  initCounters() {
    const counters = new FabrCounter();
    counters.init();
  }

  initTooltips() {
    const tooltips = new FabrTooltip();
    tooltips.init();
  }

  initNotebooks() {
    const notebooks = new FabrNotebook();
    notebooks.init();
  }

  initTables() {
    const tables = new FabrTable();
    tables.init();
  }
}
