/**
 * @classdesc Represents a FabrNav component.
 * @extends FabrCoreComponent
 */
fbr.FabrNav = class extends fbr.FabrCoreComponent {
  constructor() {
    super();
    this.componentName = "FabrNav";
    this.componentStyleClass = "fabr-nav";
    this.selector = "[fabr-nav]";
    this.eventMap = {
      click: "toggleNavChild",
    };
  }

  /**
   * Render the nav.
   * @param {Object} nav - The nav to render.
   */
  render(nav) {
    const navActiveClass = nav.getAttribute("fabr-nav-active-class");
    const navActiveChildren = nav.querySelector("[fabr-nav-active]");

    if (navActiveClass) {
      nav.activeClass = navActiveClass;
    } else {
      nav.activeClass = "fabr-nav-active";
    }

    if (navActiveChildren) {
      navActiveChildren.classList.add(nav.activeClass);
    }
  }

  /**
   * Toggle the class "fabr-nav-active" on the closest child.
   * @param {Object} event - The event object.
   */
  toggleNavChild(event) {
    const nav = event.target.closest(this.selector);
    const navChild = event.target.closest("li");

    if (navChild) {
      navChild.classList.add(nav.activeClass);
      this.resetNavChildren(nav, navChild);
    }
  }

  /**
   * Reset the other children.
   * @param {Object} nav - The nav object.
   * @param {Object} navChild - The nav child object.
   */
  resetNavChildren(nav, navChild) {
    const navChildren = nav.querySelectorAll("li");

    navChildren.forEach((child) => {
      if (child !== navChild) {
        child.classList.remove(nav.activeClass);
      }
    });
  }
};
