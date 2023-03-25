/**
 * @classdesc Represents a FabrExpander component.
 * @extends FabrExpander
 */
fbr.FabrExpander = class extends fbr.FabrCoreComponent {
  constructor() {
    super();
    this.componentName = "FabrExpander";
    this.componentStyleClass = "fabr-expander";
    this.selector = "[fabr-expander]";
    this.eventMap = {};

    this.animateHelper = new fbr.FabrHelperAnimate();
    this.animateHelper.init(this);

    this.iconHelper = new fbr.FabrHelperIcon();
    this.iconHelper.init(this);
    this.iconHelper.setIconsLibraryMaterial();
  }

  /**
   * Render the expander.
   * @param {Object} expander - The expander to render.
   */
  render(expander) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("fabr-expander-wrapper");

    const header = document.createElement("div");
    header.classList.add("fabr-expander-header");
    wrapper.appendChild(header);

    const title = document.createElement("div");
    title.classList.add("fabr-expander-title");
    title.textContent = expander.getAttribute("fabr-expander-title");
    header.appendChild(title);

    const icon = this.iconHelper.new("keyboard_arrow_down");
    icon.classList.add("fabr-expander-icon");
    header.appendChild(icon);

    const content = document.createElement("div");
    content.classList.add("fabr-expander-content");
    wrapper.appendChild(content);

    expander.parentNode.insertBefore(wrapper, expander);
    content.appendChild(expander);
    expander.activeElement = wrapper;

    this.addInternalEventListener(header, "click", "onHeaderClick", expander);
  }

  /**
   * Handle the click event on the header.
   * @param {Object} event - The event object.
   * @param {Object} expander - The expander.
   */
  onHeaderClick(event, expander) {
    const wrapper = expander.activeElement;
    const content = wrapper.querySelector(".fabr-expander-content");
    const icon = wrapper.querySelector(".fabr-expander-icon");

    if (content.classList.contains("fabr-expander-content-open")) {
      this.animateHelper.fadeOut(content, false, 300);
      content.classList.remove("fabr-expander-content-open");
      icon.textContent = "keyboard_arrow_down";
      return;
    }

    this.animateHelper.fadeIn(content, 300);
    content.classList.add("fabr-expander-content-open");
    icon.textContent = "keyboard_arrow_up";
  }
};
