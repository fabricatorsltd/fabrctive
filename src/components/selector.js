/**
 * @classdesc Represents a FabrSelector component.
 * @extends FabrCoreComponent
 */
fbr.FabrSelector = class extends fbr.FabrCoreComponent {
  constructor() {
    super();
    this.componentName = "FabrSelector";
    this.componentStyleClass = "fabr-selector";
    this.selector = "[fabr-selector]";
    this.eventMap = {};

    this.animateHelper = new fbr.FabrHelperAnimate();
    this.animateHelper.init(this);

    this.iconHelper = new fbr.FabrHelperIcon();
    this.iconHelper.init(this);
    this.iconHelper.setIconsLibraryMaterial();
  }

  /**
   * Render the selector.
   */
  render(selector) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("fabr-selector-wrapper");

    const searchWrapper = document.createElement("div");
    searchWrapper.classList.add("fabr-selector-search-wrapper");
    wrapper.appendChild(searchWrapper);

    const options = selector.querySelectorAll("option");
    const dropdown = document.createElement("div");
    dropdown.classList.add("fabr-selector-dropdown");

    selector.parentNode.insertBefore(wrapper, selector);
    wrapper.appendChild(selector);

    const input = document.createElement("input");
    input.classList.add("fabr-selector-input");
    input.type = "text";
    input.placeholder = "Search...";
    searchWrapper.appendChild(input);

    const icon = this.iconHelper.new("arrow_drop_down");
    icon.classList.add("fabr-selector-icon");
    searchWrapper.appendChild(icon);

    const list = document.createElement("ul");
    list.classList.add("fabr-selector-list");
    dropdown.appendChild(list);

    options.forEach((option) => {
      const listItem = document.createElement("li");
      listItem.classList.add("fabr-selector-item");
      listItem.dataset.value = option.value;
      listItem.textContent = option.textContent;
      list.appendChild(listItem);
    });

    this.addInternalEventListener(
      list,
      "keydown",
      "onKeyNavigationEvent",
      null,
      selector,
      input
    );

    this.addInternalEventListener(
      input,
      "keydown",
      "onKeyNavigationEvent",
      null,
      selector,
      input
    );

    this.addInternalEventListener(
      input,
      "input",
      "filterOptionsEvent",
      null,
      list
    );

    this.addInternalEventListener(
      searchWrapper,
      "click",
      "showDropdownEvent",
      null,
      list
    );

    this.addInternalEventListener(
      list,
      "click",
      "selectOptionEvent",
      null,
      selector,
      input,
      list
    );

    this.addInternalEventListener(
      document,
      "click",
      "hideDropdownEvent",
      null,
      wrapper,
      list
    );

    wrapper.appendChild(dropdown);
    selector.style.display = "none";
  }

  /**
   * Filter the options.
   * @param {Event} event The event.
   * @param {HTMLElement} list The list.
   */
  filterOptionsEvent(event, list) {
    const filterText = event.target.value.toLowerCase();
    const items = list.querySelectorAll(".fabr-selector-item");

    items.forEach((item) => {
      const text = item.textContent.toLowerCase();
      if (text.indexOf(filterText) !== -1) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  /**
   * Select an option.
   * @param {Event} event The event.
   * @param {HTMLSelectElement} selector The select element.
   * @param {HTMLElement} input The input element.
   * @param {HTMLElement} list The list.
   */
  selectOptionEvent(event, selector, input, list) {
    const selectedItem = event.target.closest(".fabr-selector-item");
    if (!selectedItem) {
      return;
    }

    const value = selectedItem.dataset.value;
    const text = selectedItem.textContent;

    selector.value = value;
    selector.dispatchEvent(new Event("change"));
    input.value = text;

    this.animateHelper.fadeOut(list);
  }

  /**
   * Show the dropdown.
   * @param {Event} event The event.
   * @param {HTMLElement} list The list.
   */
  showDropdownEvent(event, list) {
    event.stopPropagation();

    if (list.style.display === "block") {
      return;
    }

    this.animateHelper.fadeIn(list);
  }

  /**
   * Hide the dropdown.
   * @param {Event} event The event.
   * @param {HTMLElement} wrapper The wrapper.
   * @param {HTMLElement} list The list.
   */
  hideDropdownEvent(event, wrapper, list) {
    event.stopPropagation();

    if (!wrapper.contains(event.target) && list.style.display === "block") {
      list.classList.remove("active");
      this.animateHelper.fadeOut(list);
    }
  }

  /**
   * Handle the key navigation.
   * @param {Event} event The event.
   * @param {HTMLSelectElement} selector The select element.
   * @param {HTMLElement} input The input element.
   */
  onKeyNavigationEvent(event, selector, input) {
    const list = selector.parentNode.querySelector(".fabr-selector-list");
    const items = list.querySelectorAll(".fabr-selector-item");
    const activeItem = list.querySelector(".active");
    let index = -1;

    if (activeItem) {
      index = Array.from(items).indexOf(activeItem);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      index++;
      if (index >= items.length) {
        index = 0;
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      index--;
      if (index < 0) {
        index = items.length - 1;
      }
    }

    if (index !== -1) {
      items.forEach((item) => {
        item.classList.remove("active");
      });
      items[index].classList.add("active");
      input.value = items[index].textContent;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      if (activeItem) {
        activeItem.click();
      }
    }
  }
};
