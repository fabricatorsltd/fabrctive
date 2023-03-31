/**
 * @classdesc Represents a component in the Fabr library.
 * @class
 * @extends FabrCore
 */
fbr.FabrCoreComponent = class extends fbr.FabrCore {
  constructor() {
    super();

    // @@@IF NOT BUILD@@@
    this.debugger = new fbr.FabrDebugger();
    // @@@ENDIF@@@

    this.componentUID = Math.random().toString(36).substr(2, 9);
    this.componentName = "Generic";
    this.componentType = "generic";
    this.componentStyleClass = "fabr-component";
    this.selector = "";
    this.eventMap = {};
    this.elements = [];
    this.renderedElements = [];
    this.signals = {};
    this.observers = new Map();
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
   * Get updates if the page has changed.
   */
  update() {
    // this does not reinitialize the component, it just look for new elements
    // and adds them to the this.elements array and adds the event listeners
    // to them
    this.#initElements();
    this.#initEventListeners();
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

    const elements = document.querySelectorAll(this.selector);
    for (let element of elements) {
      if (this.renderedElements.includes(element)) {
        continue;
      }

      if (element.getAttribute("fabr-com-id")) {
        fbr.comIDs[element.getAttribute("fabr-com-id")] = {
          component: this,
          element: element,
        };
      }

      this.elements.push(element);
      element.classList.add(this.componentStyleClass);
      this.renderedElements.push(element);
    }
  }

  /**
   * Initializes the event listeners for the component.
   * @private
   */
  #initEventListeners() {
    if (Object.keys(this.eventMap).length === 0) {
      // @@@IF NOT BUILD@@@
      this.debugger.log(`No event listeners defined.`);
      // @@@ENDIF@@@
      return;
    }

    for (let [event, fn] of Object.entries(this.eventMap)) {
      // @@@IF NOT BUILD@@@
      this.debugger.log(`Adding event listener for ${event} on ${fn}`);
      // @@@ENDIF@@@

      for (let element of this.elements) {
        element.addEventListener(event, (e) => {
          // @@@IF NOT BUILD@@@
          this.debugger.log(`Event ${e.type} triggered on ${fn}`);
          // @@@ENDIF@@@

          this[fn](e);
        });
      }
    }
  }

  /**
   * Adds an internal event listener to the specified element.
   * @param {HTMLElement} element - The element to add the event listener to.
   * @param {string} event - The name of the event to listen for.
   * @param {string} fn - The name of the function to call when the event is triggered.
   * @param {any} args - Any additional arguments to pass to the function when it is called.
   * @returns {EventListener} The event listener that was added.
   */
  addInternalEventListener(element, event, fn, ...args) {
    // @@@IF NOT BUILD@@@
    this.debugger.log(`Adding internal event listener for ${event} on ${fn}`);
    // @@@ENDIF@@@

    const listener = element.addEventListener(event, (e) => {
      // @@@IF NOT BUILD@@@
      this.debugger.log(`Event ${e.type} triggered on ${fn}`);
      // @@@ENDIF@@@

      this[fn](e, ...args);
    });

    return listener;
  }

  /**
   * Removes an internal event listener from the specified element.
   * @param {HTMLElement} element - The element to remove the event listener from.
   * @param {string} event - The name of the event to remove the listener for.
   * @param {string} fn - The name of the function called when the event was triggered.
   */
  removeInternalEventListener(element, event, fn) {
    // @@@IF NOT BUILD@@@
    this.debugger.log(
      `Removing internal event listener for ${event} from ${element}`
    );
    // @@@ENDIF@@@
    element.removeEventListener(event, this[fn]);
  }

  /**
   * Renders the component elements.
   * @private
   */
  #renderElements() {
    if (this.elements.length === 0) {
      return;
    }

    for (let element of this.elements) {
      if (this.render) {
        // @@@IF NOT BUILD@@@
        this.debugger.log(`Rendering ${element}`);
        // @@@ENDIF@@@

        this.render(element);
      }
    }
  }

  /**
   * Emits a signal.
   * @param {string} signal - The name of the signal to emit.
   * @param {HTMLElement} element - The element that is emitting the signal.
   * @param {any} args - Any additional arguments to pass to the signal observers.
   */
  emit(signal, element, ...args) {
    if (this.observers.has(signal)) {
      const observers = this.observers.get(signal);
      observers.forEach((observer) => {
        observer(element, ...args);
      });
    }
  }

  /**
   * Connects a signal observer.
   * @param {string} signal - The name of the signal to observe.
   * @param {HTMLElement} element - The element that is emitting the signal.
   * @param {function} fn - The function to call when the signal is emitted.
   * @returns {function} The observer function.
   */
  connect(signal, element, fn) {
    if (!this.observers.has(signal)) {
      this.observers.set(signal, new Set());
    }

    const observers = this.observers.get(signal);
    const observer = (emittingElement, counterValue) => {
      if (emittingElement === element) {
        fn(emittingElement, counterValue);
      }
    };
    observers.add(observer);

    return observer;
  }

  /**
   * Disconnects a signal observer.
   * @param {string} signal - The name of the signal to disconnect from.
   * @param {function} observer - The observer function to disconnect.
   */
  disconnect(signal, observer) {
    if (this.observers.has(signal)) {
      const observers = this.observers.get(signal);
      observers.delete(observer);
    }
  }

  /**
   * Check if an element is in viewport.
   * @param {HTMLElement} el The element.
   * @returns {boolean} True if the element is in viewport, false otherwise.
   */
  isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const elHeight = el.offsetHeight;
    const elWidth = el.offsetWidth;

    return (
      rect.top >= -elHeight &&
      rect.left >= -elWidth &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) +
          elHeight &&
      rect.right <=
        (window.innerWidth || document.documentElement.clientWidth) + elWidth
    );
  }

  /**
   * Get element settings defined in the fabr-settings attribute.
   * @param {HTMLElement} element The element.
   * @returns {Array} An array of settings.
   */
  getElementSettings(element) {
    const settings = element.getAttribute("fabr-settings");
    return settings ? settings.split("|") : [];
  }
};
