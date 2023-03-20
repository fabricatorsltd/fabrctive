class ReactiveTooltip extends ReactiveCoreComponent {
  constructor() {
    super();
    this.componentName = "ReactiveTooltip";
    this.selector = "[tooltip-react]";
    this.eventMap = {
      mouseenter: "showTooltip",
      mouseleave: "removeTooltips",
    };
    this.animateHelper = new ReactiveHelperAnimate();
    this.animateHelper.init(this);
  }

  showTooltip(event) {
    const target = event.target.closest("[tooltip-react]");
    if (target) {
      const tooltipId = target.getAttribute("tooltip-react");
      const tooltip = document.createElement("div");
      tooltip.setAttribute("id", tooltipId);
      tooltip.setAttribute("class", "tooltip");
      tooltip.innerText = target.getAttribute("tooltip-react-text");
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
