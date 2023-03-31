/**
 * @classdesc Represents a FabrIcon component.
 * @extends FabrCoreComponent
 */
fbr.FabrIcon = class extends fbr.FabrCoreComponent {
  constructor() {
    super();
    this.componentName = "FabrIcon";
    this.componentStyleClass = "fabr-icon";
    this.selector = "[fabr-icon]";
    this.eventMap = {};

    this.iconHelper = new fbr.FabrHelperIcon();
    this.iconHelper.init(this);
    this.iconHelper.setIconsLibraryMaterial();
  }

  /**
   * Render the icon.
   * @param {Object} icon - The icon to render.
   */
  render(icon) {
    const iconName = icon.getAttribute("fabr-icon-name");

    if (!iconName) {
      // @@@IF NOT BUILD@@@
      this.debugger.log(`Icon name not provided.`);
      // @@@ENDIF@@@
    }

    const iconElement = this.iconHelper.new(iconName);
    iconElement.classList.add("fabr-icon-element");
    icon.appendChild(iconElement);
  }
};
