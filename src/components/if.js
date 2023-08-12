/**
 * @classdesc Represents a FabrIf component.
 * @extends FabrCoreComponent
 */
fbr.FabrIf = class extends fbr.FabrCoreComponent {
  constructor() {
    super();
    this.componentName = "FabrIf";
    this.componentStyleClass = "fabr-if";
    this.selector = "[fabr-if]";
    this.eventMap = {};
    this.observedVariables = new Map();
    this.sharedMemoryHelper = new fbr.FabrHelperSharedMemory();
    this.sharedMemoryHelper.init(this);
  }

  /**
   * Initialize the condition component.
   */
  init() {
    super.init();
    this.processElements();
  }

  /**
   * Process the condition elements.
   */
  processElements() {
    for (const element of this.elements) {
      const variableName = element.getAttribute("fabr-if");
      const target = element;

      if (!variableName) {
        continue;
      }

      this.observeVariable(variableName);

      this.observedVariables.set(variableName, {
        target,
        parent: target.parentNode,
      });

      this.updateTargetVisibility(variableName);
    }
  }

  /**
   * Start observing a variable in sharedMemory for changes.
   * @param {string} variableName - The name of the variable.
   */
  observeVariable(variableName) {
    console.log(this.sharedMemoryHelper.getKeys());
    this.sharedMemoryHelper.connect(variableName, this, (_, newValue) => {
      this.updateTargetVisibility(variableName, newValue);
    });

    this.observedVariables.set(variableName, []);
  }

  /**
   * Update the visibility of the targets associated with the variable.
   * @param {string} variableName - The name of the variable.
   * @param {boolean} [newValue] - The new value of the variable (optional).
   */
  updateTargetVisibility(variableName, newValue) {
    const targetData = this.observedVariables.get(variableName);

    if (newValue === undefined) {
      newValue = this.sharedMemoryHelper.get(variableName);
    }

    const { target, parent } = targetData;

    if (newValue === true) {
      if (!parent.contains(target)) {
        parent.appendChild(target);
      }
    } else {
      if (parent.contains(target)) {
        parent.removeChild(target);
      }
    }
  }
};
