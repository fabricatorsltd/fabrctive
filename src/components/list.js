/**
 * @classdesc Represents a FabrList component.
 * @extends FabrList
 */
fbr.FabrList = class extends fbr.FabrCoreComponent {
  constructor() {
    super();
    this.componentName = "FabrList";
    this.componentStyleClass = "fabr-list";
    this.selector = "[fabr-list]";
    this.eventMap = {};
  }

  /**
   * Create a new list.
   * @param {string} listName - The name of the list.
   * @param {Array} listItems - The list items.
   */
  newList(listName, listItems) {
    const list = document.querySelector(`[fabr-list-name="${listName}"]`);

    if (!list) {
      // @@@IF NOT BUILD@@@
      this.debugger.log(`List ${listName} does not exist.`);
      // @@@ENDIF@@@
    }

    listItems.forEach((listItem) => {
      const item = document.createElement("li");
      item.classList.add("fabr-list-item");
      item.innerHTML = listItem;
      list.appendChild(item);
    });
  }

  /**
   * Create a new list from template.
   * @param {string} listName - The name of the list.
   * @param {Array} listItems - The list items.
   * @param {string} template - The template to use.
   */
  newListFromTemplate(listName, listItems, template) {
    const list = document.querySelector(`[fabr-list-name="${listName}"]`);

    if (!list) {
      // @@@IF NOT BUILD@@@
      this.debugger.log(`List ${listName} does not exist.`);
      // @@@ENDIF@@@
    }

    listItems.forEach((listItem) => {
      let item = template;
      for (const key in listItem) {
        item = item.replace(`{{${key}}}`, listItem[key]);
        if (item.includes("{{value}}")) {
          item = item.replace("{{value}}", listItem[key]);
        }
      }
      const li = document.createElement("li");
      li.classList.add("fabr-list-item");
      li.innerHTML = item;
      list.appendChild(li);
    });
  }
};
