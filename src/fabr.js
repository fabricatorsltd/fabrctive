/**
 * @classdesc The main entry point for the Fabr library.
 * @class
 */
fbr.Fabr = class extends fbr.FabrCore {
  constructor() {
    super();

    this.version = "0.1.0";
    console.log(`%cFabr [${this.version}] initializing...`, "color: #00f");

    this.components = {
      form: new fbr.FabrForm(),
      link: new fbr.FabrLink(),
      list: new fbr.FabrList(),
      carousel: new fbr.FabrCarousel(),
      counter: new fbr.FabrCounter(),
      expander: new fbr.FabrExpander(),
      image: new fbr.FabrImage(),
      loader: new fbr.FabrLoader(),
      tooltip: new fbr.FabrTooltip(),
      notebook: new fbr.FabrNotebook(),
      table: new fbr.FabrTable(),
      animator: new fbr.FabrAnimator(),
      snippet: new fbr.FabrSnippet(),
      selector: new fbr.FabrSelector(),
      summary: new fbr.FabrSummary(),
    };

    console.log("%cFabr initialized", "color: #00f");
  }

  init() {
    this.initComponents();

    // @@@IF NOT BUILD@@@
    this.initTests();
    // @@@ENDIF@@@

    this.loadScripts();
  }

  /**
   * Reload the Fabr library.
   */
  reload() {
    console.log(
      "%c\n\n\n\n\n\n------\nReloading Fabr at " +
        new Date().toLocaleTimeString() +
        "\n------\n\n\n\n\n\n",
      "color: #00f"
    );

    for (const cName in this.components) {
      this.components[cName].update();
    }

    this.loadScripts();
  }

  /**
   * Initializes all of the components in the Fabr library.
   */
  initComponents() {
    for (const cName in this.components) {
      this.components[cName].init();
    }
  }

  /**
   * Gets a component by name.
   * @param {string} cName - The name of the component to get.
   * @returns {FabrComponent} The component.
   */
  getComponent(cName) {
    return this.components[cName];
  }

  /**
   * Get all of the components.
   * @returns {Object} The components.
   */
  getComponents() {
    return this.components;
  }

  // @@@IF NOT BUILD@@@
  /**
   * Initializes all of the tests in the Fabr library.
   */
  initTests() {
    new fbr.LocalStorageTestComponent().init();
    new fbr.SharedMemory1TestComponent().init();
    new fbr.SharedMemory2TestComponent().init();
  }
  // @@@ENDIF@@@

  /**
   * Loads all the page scripts inside the fbr scope.
   */
  loadScripts() {
    const scripts = document.querySelectorAll("script[type='text/fabr']");
    for (const script of scripts) {
      const scriptText = script.innerHTML;
      const scriptFunc = new Function("fbr", scriptText);
      scriptFunc(fbr);
    }

    const remoteScripts = document.querySelectorAll(
      "script[type='text/fabr-remote']"
    );
    for (const script of remoteScripts) {
      const scriptUrl = script.getAttribute("src");
      this.fetchJsScript(scriptUrl)
        .then((data) => {
          const scriptText = data;
          const scriptFunc = new Function("fbr", scriptText);
          scriptFunc(fbr);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  /**
   * Get component by ComID.
   * @param {string} comId - The ComID of the component.
   * @returns {object} The element and component.
   */
  getComponentByComId(comId) {
    if (comId in fbr.comIDs) {
      return fbr.comIDs[comId];
    }
  }
};

fbr.comIDs = {};
fbr.fabr = new fbr.Fabr();
fbr.fabr.init();
