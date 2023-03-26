/**
 * @classdesc Represents a FabrTooltip component.
 * @extends FabrCoreComponent
 */
fbr.FabrTooltip = class extends fbr.FabrCoreComponent {
  constructor() {
    super();
    this.componentName = "FabrTooltip";
    this.componentStyleClass = "fabr-has-tooltip";
    this.selector = "[fabr-tooltip]";
    this.eventMap = {
      mouseenter: "onMouseEnter",
      mouseleave: "onMouseLeave",
    };
    this.animateHelper = new fbr.FabrHelperAnimate();
    this.animateHelper.init(this);
  }

  /**
   * Handle the mouseenter event.
   * @param {Event} event - The event object.
   */
  onMouseEnter(event) {
    const target = event.target.closest("[fabr-tooltip]");

    if (target) {
      const tooltipId = target.getAttribute("fabr-tooltip");
      const tooltip = document.createElement("div");
      tooltip.setAttribute("id", tooltipId);
      tooltip.setAttribute("class", "fabr-tooltip");
      tooltip.innerText = target.getAttribute("fabr-tooltip-text");

      const targetRect = target.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      tooltip.style.position = "fixed";
      tooltip.style.top = `${targetRect.top - tooltipRect.height - 30}px`;
      tooltip.style.left = `${targetRect.left - tooltipRect.width / 2}px`;

      document.body.appendChild(tooltip);
      this.animateHelper.fadeIn(tooltip);
    }
  }

  /**
   * Handle the mouseleave event.
   * @param {Event} event - The event object.
   */
  onMouseLeave(event) {
    const tooltips = document.querySelectorAll(".fabr-tooltip");
    tooltips.forEach((tooltip) => {
      this.animateHelper.fadeOut(tooltip, true);
    });
  }
};
