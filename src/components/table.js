class FabrTable extends FabrCoreComponent {
  constructor() {
    super();
    this.componentName = "Table";
    this.selector = "[fabr-table]";
    this.eventMap = {};
    this.tables = [];

    this.iconHelper = new FabrHelperIcon();
    this.iconHelper.init(this);
    this.iconHelper.setIconsLibraryMaterial();
  }

  init() {
    super.init();
    this.render();
  }

  render() {
    this.elements.forEach((table) => {
      this.tables.push({
        element: table,
        options: table.getAttribute("fabr-table-options").split("|"),
        activeElement: null,
      });
    });

    this.tables.forEach((table) => {
      this.renderTable(table);
    });
  }

  renderTable(table) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("fabr-table-wrapper");
    table.element.parentNode.insertBefore(wrapper, table.element);
    wrapper.appendChild(table.element);
    table.activeElement = wrapper;

    if (table.options.includes("search")) {
      this.renderSearch(table);
    }

    if (table.options.includes("sort")) {
      this.renderSort(table);
    }
  }

  renderSearch(table) {
    const search = document.createElement("input");
    search.setAttribute("type", "text");
    search.setAttribute("placeholder", "Search...");
    search.setAttribute("fabr-table-search", "");
    table.activeElement.insertBefore(search, table.element);
    this.addInternalEventListener(search, "keyup", "onKeyup", table);
  }

  renderSort(table) {
    const ths = table.element.querySelectorAll("th");
    ths.forEach((th) => {
      const icon = this.iconHelper.new("unfold_more");
      th.sortIcon = icon;
      th.appendChild(icon);
      this.addInternalEventListener(th, "click", "onClick", table);
      th.setAttribute("fabr-table-sort", "");
    });
  }

  sortTable(th, table) {
    const isAsc = th.getAttribute("fabr-table-sort") === "asc";

    const ths = table.element.querySelectorAll("[fabr-table-sort]");
    ths.forEach((th) => {
      th.sortIcon.changeIcon("unfold_more");
      th.setAttribute("fabr-table-sort", "");
    });

    const tbody = table.element.querySelector("tbody");
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

  onClick(event, table) {
    const target = event.target.closest("[fabr-table-sort]");
    if (target) {
      this.sortTable(target, table);
    }
  }

  onKeyup(event, table) {
    const target = event.target.closest("[fabr-table-search]");
    if (target) {
      this.searchTable(target, table);
    }
  }

  searchTable(input, table) {
    const value = input.value.toLowerCase();
    const rows = table.element.querySelectorAll("tbody tr");

    rows.forEach((row) => {
      const text = row.textContent.toLowerCase();
      if (text.includes(value)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }
}
