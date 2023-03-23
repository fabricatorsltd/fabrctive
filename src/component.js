/**
 * @classdesc Represents a component in the Fabr library.
 * @class
 * @extends FabrCore
 */
class FabrCoreComponent extends FabrCore {
  constructor() {
    super();

    // @@@IF NOT BUILD@@@
    this.debugger = new FabrDebugger();
    // @@@ENDIF@@@

    this.componentUID = Math.random().toString(36).substr(2, 9);
    this.componentName = "Generic";
    this.componentType = "generic";
    this.componentStyleClass = "fabr-component";
    this.selector = "";
    this.eventMap = {};
    this.elements = [];
  }

  /**
   * Initializes the component.
   */
  init() {
    // @@@IF NOT BUILD@@@
    this.debugger.registerComponent(this);
    this.debugger.start_bench(this);
    // @@@ENDIF@@@

    this.#initElements();
    this.#initEventListeners();
    this.#renderElements();

    // @@@IF NOT BUILD@@@
    this.debugger.stop_bench(this);
    // @@@ENDIF@@@
  }

  /**
   * Gets a string representation of the component.
   * @returns {string} A string representation of the component.
   */
  get repr() {
    return `<${this.componentName}:${this.componentUID}>`;
  }

  /**
   * Gets an array representing the style of the component for debugging purposes.
   * @returns {Array} An array representing the style of the component.
   */
  get reprX() {
    const color = this.componentType === "test" ? "#ff6c6c" : "#6c63ff";
    return [
      `<${this.componentName}:${this.componentUID}>`,
      `background: ${color}; color: white; border-radius: 3px; padding: 0 3px; font-weight: bold`,
    ];
  }

  /**
   * Initializes the elements for the component.
   * @private
   */
  #initElements() {
    if (!this.selector) {
      // @@@IF NOT BUILD@@@
      this.debugger.log(`No selectors defined.`);
      // @@@ENDIF@@@
      return;
    }

    this.elements = document.querySelectorAll(this.selector);
    this.elements.forEach((element) => {
      element.classList.add(this.componentStyleClass);
    });
  }

  /**
   * Initializes the event listeners for the component.
   * @private
   */
  #initEventListeners() {
    if (Object.keys(this.eventMap).length === 0) {
      this.debugger.log(`No event listeners defined.`);
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

  /**
   * Adds an internal event listener to the specified element.
   * @param {HTMLElement} element - The element to add the event listener to.
   * @param {string} event - The name of the event to listen for.
   * @param {string} fn - The name of the function to call when the event is triggered.
   * @param {any} [reference] - A reference to pass to the function when it is called. (optional)
   * @param {any} args - Any additional arguments to pass to the function when it is called.
   */
  addInternalEventListener(element, event, fn, reference = null, ...args) {
    // @@@IF NOT BUILD@@@
    this.debugger.log(`Adding internal event listener for ${event} on ${fn}`);
    // @@@ENDIF@@@

    element.addEventListener(event, (e) => {
      // @@@IF NOT BUILD@@@
      this.debugger.log(
        `Event ${e.type} triggered on ${fn} for\n\t\t${e.target.outerHTML}`
      );
      // @@@ENDIF@@@

      if (reference) {
        this[fn](e, reference, ...args);
      } else {
        this[fn](e, ...args);
      }
    });
  }

  /**
   * Renders the component elements.
   * @private
   */
  #renderElements() {
    if (this.elements.length === 0) {
      return;
    }

    this.elements.forEach((element) => {
      if (this.render) {
        // @@@IF NOT BUILD@@@
        this.debugger.log(`Rendering ${element}`);
        // @@@ENDIF@@@
        this.render(element);
      }
    });
  }
}
