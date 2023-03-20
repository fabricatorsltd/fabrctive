class ReactiveNotebook extends ReactiveCoreComponent {
  constructor() {
    super();
    this.componentName = "ReactiveNotebook";
    this.selector = "[notebook-react]";
    this.eventMap = {
      click: "onClick",
    };
    this.tabs = {};
    this.animateHelper = new ReactiveHelperAnimate();
    this.animateHelper.init(this);
  }

  init() {
    super.init();
    this.render();
  }

  render() {
    const tabs = document.querySelector(this.selector);
    const tabItems = tabs.querySelectorAll("[notebook-react-item]");

    tabItems.forEach((tabItem) => {
      const tabId = tabItem.getAttribute("notebook-react-item");
      const tabContent = document.querySelector(
        `[notebook-react-content="${tabId}"]`
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
    const target = event.target.closest("[notebook-react-item]");

    if (target) {
      const tabId = target.getAttribute("notebook-react-item");
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
