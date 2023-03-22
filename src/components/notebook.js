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
    this.eventMap = {
      click: "onClick",
    };
    this.tabs = {};
    this.animateHelper = new FabrHelperAnimate();
    this.animateHelper.init(this);
  }

  /**
   * Initialize the component by rendering the tabs.
   * @override
   */
  init() {
    super.init();
    this.#render();
  }

  /**
   * Render the tabs.
   * @private
   */
  #render() {
    const tabs = document.querySelector(this.selector);
    const tabItems = tabs.querySelectorAll("[fabr-notebook-item]");

    tabItems.forEach((tabItem) => {
      const tabId = tabItem.getAttribute("fabr-notebook-item");
      const tabContent = document.querySelector(
        `[fabr-notebook-content="${tabId}"]`
      );

      tabItem.classList.add("fabr-notebook-item");
      tabContent.classList.add("fabr-notebook-content");
      tabContent.style.display = "none";

      if (tabContent) {
        this.tabs[tabId] = {
          tabItem,
          tabContent,
        };
      }
    });

    this.#activateTab(Object.keys(this.tabs)[0]);
  }

  /**
   * Handle the click event.
   * @param {Event} event - The event object.
   */
  onClick(event) {
    event.preventDefault();
    const target = event.target.closest("[fabr-notebook-item]");

    if (target) {
      const tabId = target.getAttribute("fabr-notebook-item");
      this.#activateTab(tabId);
    }
  }

  /**
   * Activate a tab by id.
   * @param {string} tabId - The tab id.
   * @private
   */
  #activateTab(tabId) {
    const tab = this.tabs[tabId];

    if (!tab.tabItem.classList.contains("active")) {
      Object.keys(this.tabs).forEach((key) => {
        const tab = this.tabs[key];
        tab.tabItem.classList.remove("active");
        tab.tabContent.style.display = "none";
      });

      tab.tabItem.classList.add("active");
      this.animateHelper.fadeIn(tab.tabContent);
    }
  }
}
