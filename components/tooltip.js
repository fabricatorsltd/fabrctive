class FabrTooltip extends FabrCoreComponent {
  constructor() {
    super();
    this.componentName = "FabrTooltip";
    this.selector = "[fabr-tooltip]";
    this.eventMap = {
      mouseenter: "showTooltip",
      mouseleave: "removeTooltips",
    };
    this.animateHelper = new FabrHelperAnimate();
    this.animateHelper.init(this);
  }

  showTooltip(event) {
    const target = event.target.closest("[fabr-tooltip]");
    if (target) {
      const tooltipId = target.getAttribute("fabr-tooltip");
      const tooltip = document.createElement("div");
      tooltip.setAttribute("id", tooltipId);
      tooltip.setAttribute("class", "tooltip");
      tooltip.innerText = target.getAttribute("fabr-tooltip-text");
      document.body.appendChild(tooltip);
      this.animateHelper.fadeIn(tooltip);
    }
  }

  removeTooltips(event) {
    const tooltips = document.querySelectorAll(".tooltip");
    tooltips.forEach((tooltip) => {
      this.animateHelper.fadeOut(tooltip, true);
    });
  }
}
