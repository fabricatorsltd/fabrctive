/**
 * @classdesc Represents a FabrTable component.
 * @extends FabrCoreComponent
 */
fbr.FabrTable = class extends fbr.FabrCoreComponent {
  constructor() {
    super();
    this.componentName = "Table";
    this.componentStyleClass = "fabr-table";
    this.selector = "[fabr-table]";
    this.eventMap = {};

    this.iconHelper = new fbr.FabrHelperIcon();
    this.iconHelper.init(this);
    this.iconHelper.setIconsLibraryMaterial();
  }

  /**
   * Render the table.
   */
  render(table) {
    const wrapper = document.createElement("div");
    const settings = this.getElementSettings(table);

    wrapper.classList.add("fabr-table-wrapper");
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
    table.activeElement = wrapper;

    if (settings.includes("search")) {
      this.#renderSearch(table);
    }

    if (settings.includes("sort")) {
      this.#renderSort(table);
    }
  }

  /**
   * Render the search input for the given table.
   * @param {Object} table - The table to render the search input for.
   * @private
   */
  #renderSearch(table) {
    const search = document.createElement("input");
    search.setAttribute("type", "search");
    search.setAttribute("placeholder", "Search...");
    search.setAttribute("fabr-table-search", "");
    search.classList.add("fabr-table-search");
    table.activeElement.insertBefore(search, table);
    this.addInternalEventListener(search, "keyup", "onKeyup", table);
  }

  /**
   * Render the sort icons for the given table.
   * @param {Object} table - The table to render the sort icons for.
   * @private
   */
  #renderSort(table) {
    const ths = table.querySelectorAll("th");
    ths.forEach((th) => {
      const icon = this.iconHelper.new("unfold_more");
      th.sortIcon = icon;
      th.appendChild(icon);
      this.addInternalEventListener(th, "click", "onClick", table);
      th.setAttribute("fabr-table-sort", "");
    });
  }

  /**
   * Sort the given table by the given column.
   * @param {Object} table - The table to sort.
   * @param {number} index - The index of the column to sort by.
   * @private
   */
  #sortTable(th, table) {
    const isAsc = th.getAttribute("fabr-table-sort") === "asc";

    const ths = table.querySelectorAll("[fabr-table-sort]");
    ths.forEach((th) => {
      th.sortIcon.changeIcon("unfold_more");
      th.setAttribute("fabr-table-sort", "");
    });

    const tbody = table.querySelector("tbody");
    const rows = tbody.querySelectorAll("tr");
    const index = th.cellIndex;
    const sortedRows = Array.from(rows).sort((rowA, rowB) => {
      const cellA = rowA.cells[index].textContent;
      const cellB = rowB.cells[index].textContent;
      return isAsc ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
    });

    th.setAttribute("fabr-table-sort", isAsc ? "desc" : "asc");
    th.sortIcon.changeIcon(isAsc ? "keyboard_arrow_down" : "keyboard_arrow_up");

    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }

    tbody.append(...sortedRows);
  }

  /**
   * Search the given table by the given input.
   * @param {Object} input - The input to search by.
   * @param {Object} table - The table to search.
   * @private
   */
  #searchTable(input, table) {
    const value = input.value.toLowerCase();
    const rows = table.querySelectorAll("tbody tr");

    rows.forEach((row) => {
      const text = row.textContent.toLowerCase();
      if (text.includes(value)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }

  /**
   * Handle the click event on the table to sort.
   * @param {Event} event - The event object.
   * @param {Element} table - The table to sort.
   */
  onClick(event, table) {
    const target = event.target.closest("[fabr-table-sort]");
    if (target) {
      this.#sortTable(target, table);
    }
  }

  /**
   * Handle the keyup event on the table to search.
   * @param {Event} event - The event object.
   * @param {Element} table - The table to search.
   */
  onKeyup(event, table) {
    const target = event.target.closest("[fabr-table-search]");
    if (target) {
      this.#searchTable(target, table);
    }
  }
};
