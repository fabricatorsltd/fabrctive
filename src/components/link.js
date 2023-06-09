/**
 * @classdesc Represents a FabrLink component.
 * @extends FabrCoreComponent
 */
fbr.FabrLink = class extends fbr.FabrCoreComponent {
  constructor() {
    super();
    this.componentName = "FabrLink";
    this.componentStyleClass = "fabr-link";
    this.selector = "[fabr-link]";
    this.eventMap = {
      click: "onClick",
      // mouseover: 'onMouseOver'
    };
  }

  /**
   * Handle the click event.
   * @param {Event} event - The event object.
   */
  onClick(event) {
    event.preventDefault();
    let source = "";
    let target = event.target.closest("[fabr-link]");
    if (target) {
      source = target.hasAttribute("href")
        ? target.getAttribute("href")
        : target.getAttribute("fabr-link-target");
    }
    const containerId = target ? target.getAttribute("fabr-link-dom") : null;
    const container = containerId
      ? document.getElementById(containerId)
      : document.body;

    this.fetchContent(source)
      .then((html) => {
        return this.renderContent(html, container);
      })
      .then(() => {
        if (!containerId) {
          window.history.pushState(null, "", source);
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  /**
   * Handle the mouseover event.
   * @param {Event} event - The event object.
   * @todo Implement this method.
   */
  onMouseOver(event) {
    console.log("Mouse Over on:", event.target);
  }
};
