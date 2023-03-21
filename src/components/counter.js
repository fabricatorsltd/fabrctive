/**
 * @classdesc Represents a FabrCounter component that counts and displays a value
 * @extends FabrCoreComponent
 */
class FabrCounter extends FabrCoreComponent {
  constructor() {
    super();
    this.componentName = "FabrCounter";
    this.componentStyleClass = "fabr-counter";
    this.selector = "[fabr-counter]";
    this.eventMap = {
      click: "onClick",
    };
    this.counters = {};
  }

  /**
   * Event handler function for the "click" event
   * @param {Event} event - The event object
   */
  onClick(event) {
    event.preventDefault();
    let target = event.target;
    const virtualTarget = target.getAttribute("fabr-counter-target");

    if (target.getAttribute("fabr-counter-target")) {
      target = virtualTarget;
    }

    if (target) {
      const counterId = target.getAttribute("fabr-counter");
      const counter = this.counters[counterId];

      if (counter) {
        counter.value++;
        target.innerText = counter.value;
      } else {
        const initialValue =
          parseInt(target.getAttribute("fabr-counter-initial-value")) || 0;
        this.counters[counterId] = { value: initialValue + 1 };
        target.innerText = this.counters[counterId].value;
      }
    }
  }
}
