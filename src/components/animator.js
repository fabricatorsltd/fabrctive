/**
 * @classdesc Represents a FabrAnimator component.
 * @extends FabrCoreComponent
 */
class FabrAnimator extends FabrCoreComponent {
  constructor() {
    super();
    this.componentName = "FabrAnimator";
    this.componentStyleClass = "fabr-animator";
    this.selector = "[fabr-animator]";
    this.eventMap = {
      click: "onAnim",
      mouseover: "onAnim",
      mouseout: "onAnim",
    };
    this.animations = {};
    this.animateHelper = new FabrHelperAnimate();
    this.animateHelper.init(this);
  }

  /**
   * Handle the animation event.
   * @param {Event} event - The event object.
   */
  onAnim(event) {
    let element = event.target;
    const animationType = element.getAttribute("fabr-animator-type");
    const animationEvent = element.getAttribute("fabr-animator-event");
    const animationTarget = element.getAttribute("fabr-animator-target");

    if (animationTarget) {
      const target = document.querySelector(animationTarget);
      if (target) {
        element = target;
      }
    }

    if (animationEvent !== event.type) {
      return;
    }

    if (!animationType) {
      return;
    }

    this.animateHelper.animate(element, animationType);
  }
}
