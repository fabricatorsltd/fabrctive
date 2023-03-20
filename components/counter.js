class ReactiveCounter extends ReactiveCoreComponent {
  constructor() {
    super();
    this.componentName = "ReactiveCounter";
    this.selector = "[counter-react]";
    this.eventMap = {
      click: "onClick",
    };
    this.counters = {};
  }

  onClick(event) {
    event.preventDefault();
    const target = event.target.closest("[counter-react]");

    if (target) {
      const counterId = target.getAttribute("counter-react");
      const counter = this.counters[counterId];

      if (counter) {
        counter.value++;
        target.innerText = counter.value;
      } else {
        const initialValue =
          parseInt(target.getAttribute("counter-react-initial-value")) || 0;
        this.counters[counterId] = { value: initialValue + 1 };
        target.innerText = this.counters[counterId].value;
      }
    }
  }
}
