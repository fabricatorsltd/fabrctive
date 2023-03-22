/**
 * @classdesc Represents a FabrNotebook component.
 * @extends FabrCoreComponent
 */
class FabrNotebook extends FabrCoreComponent {
  constructor() {
    super();
    this.componentName = "FabrNotebook";
    this.componentStyleClass = "fabr-notebook";
    this.selector = "[fabr-notebook]";
    this.eventMap = {};
    this.animateHelper = new FabrHelperAnimate();
    this.animateHelper.init(this);
  }

  /**
   * Render the tabs.
   */
  render(notebook) {
    const tabItems = notebook.querySelectorAll("[fabr-notebook-item]");

    tabItems.forEach((tabItem) => {
      const tabId = tabItem.getAttribute("fabr-notebook-item");
      const tabContent = notebook.querySelector(
        `[fabr-notebook-content="${tabId}"]`
      );

      tabItem.classList.add("fabr-notebook-item");
      tabContent.classList.add("fabr-notebook-content");
      tabContent.style.display = "none";

      this.addInternalEventListener(
        tabItem,
        "click",
        "activateTabEvent",
        null,
        tabItem,
        tabContent,
        notebook
      );
    });

    const firstTabItem = notebook.querySelector("[fabr-notebook-item]");
    const firstTabItemId = firstTabItem.getAttribute("fabr-notebook-item");
    const firstTabContent = notebook.querySelector(
      `[fabr-notebook-content="${firstTabItemId}"]`
    );

    firstTabItem.classList.add("active");
    firstTabContent.style.display = "block";
  }

  /**
   * Activate a tab by event.
   * @param {Event} event The event.
   * @param {HTMLElement} tabItem The tab item.
   * @param {HTMLElement} tabContent The tab content.
   * @param {HTMLElement} notebook The notebook.
   */
  activateTabEvent(event, tabItem, tabContent, notebook) {
    const tabItems = notebook.querySelectorAll("[fabr-notebook-item]");
    const tabContents = notebook.querySelectorAll("[fabr-notebook-content]");

    tabItems.forEach((tabItem) => {
      tabItem.classList.remove("active");
    });

    tabContents.forEach((tabContent) => {
      tabContent.style.display = "none";
    });

    tabItem.classList.add("active");
    this.animateHelper.fadeIn(tabContent, 500);
  }
}
