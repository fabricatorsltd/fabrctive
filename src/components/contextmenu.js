/**
 * @classdesc Represents a FabrContextMenu component.
 * @extends FabrCoreComponent
 */
fbr.FabrContextMenu = class extends fbr.FabrCoreComponent {
  constructor() {
    super();
    this.componentName = "FabrContextMenu";
    this.componentStyleClass = "fabr-contextmenu";
    this.selector = "[fabr-contextmenu]";
    this.eventMap = {};

    this.animateHelper = new fbr.FabrHelperAnimate();
    this.animateHelper.init(this);

    this.iconHelper = new fbr.FabrHelperIcon();
    this.iconHelper.init(this);
    this.iconHelper.setIconsLibraryMaterial();
  }

  /**
   * Create a new context menu.
   * @param {string} menuName - The name of the menu.
   * @param {Array} menuItems - The menu items.
   */
  newMenu(menuName, menuItems) {
    const menuTrigger = document.querySelector(
      `[fabr-contextmenu-name="${menuName}"]`
    );

    if (!menuTrigger) {
      // @@@IF NOT BUILD@@@
      this.debugger.log(`Menu trigger ${menuName} does not exist.`);
      // @@@ENDIF@@@
    }

    const menu = document.createElement("div");
    const menuList = document.createElement("div");
    menu.style.display = "none";
    menu.classList.add("fabr-contextmenu-body");
    menu.setAttribute("fabr-contextmenu-name", menuName);
    menuList.classList.add("fabr-contextmenu-list");

    menuItems.forEach((menuItem) => {
      const item = document.createElement("div");
      item.classList.add("fabr-contextmenu-item");
      item.style.position = "relative";

      if (menuItem.icon) {
        const icon = this.iconHelper.new(menuItem.icon);
        icon.classList.add("fabr-contextmenu-item-icon");
        item.appendChild(icon);
      }

      const text = document.createElement("span");
      text.classList.add("fabr-contextmenu-item-text");
      text.innerHTML = menuItem.text;
      item.appendChild(text);

      if (!menuItem.subitems) {
        this.addInternalEventListener(
          item,
          "click",
          "runFunction",
          menuItem.action,
          menu
        );
      } else {
        const subMenu = document.createElement("div");
        subMenu.style.display = "none";
        subMenu.classList.add("fabr-contextmenu-submenu");
        const subMenuList = document.createElement("div");
        subMenuList.classList.add(
          "fabr-contextmenu-list",
          "fabr-contextmenu-submenu-list"
        );

        menuItem.subitems.forEach((subMenuItem) => {
          const subItem = document.createElement("div");
          subItem.classList.add("fabr-contextmenu-item");

          if (subMenuItem.icon) {
            const icon = this.iconHelper.new(subMenuItem.icon);
            icon.classList.add("fabr-contextmenu-item-icon");
            subItem.appendChild(icon);
          }

          const text = document.createElement("span");
          text.classList.add("fabr-contextmenu-item-text");
          text.innerHTML = subMenuItem.text;
          subItem.appendChild(text);

          this.addInternalEventListener(
            subItem,
            "click",
            "runFunction",
            subMenuItem.action,
            menu
          );

          subMenuList.appendChild(subItem);
        });

        this.addInternalEventListener(
          item,
          "mouseover",
          "showSubMenu",
          subMenu
        );

        this.addInternalEventListener(
          item,
          "mouseleave",
          "hideSubMenu",
          subMenu
        );

        subMenu.appendChild(subMenuList);
        item.appendChild(subMenu);
      }
      menuList.appendChild(item);
    });

    menu.appendChild(menuList);

    document.body.appendChild(menu);
    this.addInternalEventListener(menuTrigger, "contextmenu", "showMenu", menu);
    this.addInternalEventListener(document, "click", "hideMenu", menu);
  }

  /**
   * Show a context menu.
   * @param {object} event - The event object.
   * @param {HTMLElement} menu - The menu to show.
   */
  showMenu(event, menu) {
    event.preventDefault();

    this.animateHelper.fadeIn(menu);
    menu.style.top = `${event.clientY}px`;
    menu.style.left = `${event.clientX}px`;
    menu.style.position = "fixed";
  }

  /**
   * Hide a context menu.
   * @param {object} event - The event object.
   * @param {HTMLElement} menu - The menu to hide.
   */
  hideMenu(event, menu) {
    if (event.target == menu || menu.style.display == "none") {
      return;
    }

    this.animateHelper.fadeOut(menu);
  }

  /**
   * Run the declared function.
   * @param {object} event - The event object.
   * @param {function} func - The function to run.
   * @param {HTMLElement} menu - The menu to hide.
   */
  runFunction(event, func, menu) {
    this.hideMenu(event, menu);
    func();
  }

  /**
   * Show a sub menu.
   * @param {object} event - The event object.
   * @param {HTMLElement} subMenu - The sub menu to show.
   */
  showSubMenu(_, subMenu) {
    subMenu.style.display = "block";
    subMenu.style.top = "0";
    subMenu.style.left = "100%";
    subMenu.style.position = "absolute";
  }

  /**
   * Hide a sub menu.
   * @param {object} event - The event object.
   * @param {HTMLElement} subMenu - The sub menu to hide.
   */
  hideSubMenu(_, subMenu) {
    subMenu.style.display = "none";
  }
};
