class FabrNotebook extends FabrCoreComponent {
  constructor() {
    super();
    this.componentName = "FabrNotebook";
    this.selector = "[fabr-notebook]";
    this.eventMap = {
      click: "onClick",
    };
    this.tabs = {};
    this.animateHelper = new FabrHelperAnimate();
    this.animateHelper.init(this);
  }

  init() {
    super.init();
    this.render();
  }

  render() {
    const tabs = document.querySelector(this.selector);
    const tabItems = tabs.querySelectorAll("[fabr-notebook-item]");

    tabItems.forEach((tabItem) => {
      const tabId = tabItem.getAttribute("fabr-notebook-item");
      const tabContent = document.querySelector(
        `[fabr-notebook-content="${tabId}"]`
      );
      tabContent.style.display = "none";

      if (tabContent) {
        this.tabs[tabId] = {
          tabItem,
          tabContent,
        };
      }
    });

    this.activateTab(Object.keys(this.tabs)[0]);
  }

  onClick(event) {
    event.preventDefault();
    const target = event.target.closest("[fabr-notebook-item]");

    if (target) {
      const tabId = target.getAttribute("fabr-notebook-item");
      this.activateTab(tabId);
    }
  }

  activateTab(tabId) {
    Object.keys(this.tabs).forEach((key) => {
      const tab = this.tabs[key];

      if (key === tabId) {
        tab.tabItem.classList.add("active");
        this.animateHelper.fadeIn(tab.tabContent);
      } else {
        tab.tabItem.classList.remove("active");
        tab.tabContent.style.display = "none";
      }
    });
  }
}
