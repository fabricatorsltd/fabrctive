/**
 * @classdesc Represents a FabrSummary component.
 * @extends FabrCoreComponent
 */
fbr.FabrSummary = class extends fbr.FabrCoreComponent {
  constructor() {
    super();
    this.componentName = "Summary";
    this.componentStyleClass = "fabr-summary";
    this.selector = "[fabr-summary]";
    this.eventMap = {};

    this.iconHelper = new fbr.FabrHelperIcon();
    this.iconHelper.init(this);
    this.iconHelper.setIconsLibraryMaterial();

    this.animateHelper = new fbr.FabrHelperAnimate();
    this.animateHelper.init(this);
  }

  /**
   * Render the summary.
   * @param {Object} summary - The summary to render.
   */
  render(summary) {
    const headings = document.querySelectorAll("[fabr-summary-title]");
    const wrapper = document.createElement("div");
    const list = document.createElement("ul");

    wrapper.classList.add("fabr-summary-wrapper");
    list.classList.add("fabr-summary-list");
    summary.parentNode.insertBefore(wrapper, summary);
    wrapper.appendChild(summary);
    wrapper.appendChild(list);

    headings.forEach((heading) => {
      let headingId = heading.id;

      if (!headingId) {
        headingId = heading.innerText.replace(/ /g, "-").toLowerCase();
        heading.id = headingId;
      }

      const item = document.createElement("li");
      const link = document.createElement("a");
      const text = document.createTextNode(heading.innerText);
      const level = heading.tagName.replace("H", "");

      item.classList.add("fabr-summary-item");
      item.classList.add("fabr-summary-item-level-" + level);
      link.classList.add("fabr-summary-link");
      link.href = "#" + headingId;
      link.appendChild(text);
      item.appendChild(link);
      list.appendChild(item);

      this.addInternalEventListener(
        link,
        "click",
        "scrollToHeading",
        heading,
        item,
        list
      );
    });

    this.#renderNestedHeadings(list);
  }

  /**
   * Render the nested headings for the given summary.
   * @param {Object} list - The list to render the nested headings for.
   * @private
   */
  #renderNestedHeadings(list) {
    const items = list.querySelectorAll(".fabr-summary-item");
    const levels = [];

    items.forEach((item) => {
      const level = item.classList[1].replace("fabr-summary-item-level-", "");
      const parentLevel = parseInt(level) - 1;

      if (levels[parentLevel]) {
        const parent = levels[parentLevel];
        const wrapper = document.createElement("ul");
        const arrow = this.iconHelper.new("arrow_drop_down");

        parent.classList.add("fabr-summary-item-has-nested");
        wrapper.classList.add("fabr-summary-item-wrapper");
        arrow.classList.add("fabr-summary-arrow");

        parent.appendChild(arrow);
        parent.appendChild(wrapper);
        wrapper.appendChild(item);

        wrapper.style.display = "none";
        this.addInternalEventListener(
          arrow,
          "click",
          "toggleNestedHeadings",
          parent
        );
      } else {
        list.appendChild(item);
      }

      levels[level] = item;
    });
  }

  /**
   * Toggle the nested headings.
   * @param {Object} event - The event object.
   * @param {HTMLElement} parent - The parent element.
   */
  toggleNestedHeadings(event, parent) {
    const arrow = event.target;
    const wrapper = parent.querySelector(".fabr-summary-item-wrapper");

    if (wrapper.style.display === "none") {
      this.animateHelper.fadeIn(wrapper);
      arrow.changeIcon("arrow_drop_up");
      parent.classList.add("fabr-summary-item-nested-open");
    } else {
      this.animateHelper.fadeOut(wrapper);
      arrow.changeIcon("arrow_drop_down");
      parent.classList.remove("fabr-summary-item-nested-open");
    }
  }

  /**
   * Scroll to the heading.
   * @param {Object} event - The event object.
   * @param {HTMLElement} heading - The heading element.
   * @param {HTMLElement} wrapper - The wrapper element.
   * @param {HTMLElement} list - The list element.
   */
  scrollToHeading(event, heading, wrapper, list) {
    event.preventDefault();

    wrapper.classList.add("fabr-summary-item-wrapper-active");
    heading.scrollIntoView({ behavior: "smooth" });

    const activeWrappers = list.querySelectorAll(
      ".fabr-summary-item-wrapper-active"
    );
    activeWrappers.forEach((activeWrapper) => {
      if (activeWrapper !== wrapper) {
        activeWrapper.classList.remove("fabr-summary-item-wrapper-active");
      }
    });
  }
};
