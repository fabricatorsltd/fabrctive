/**
 * @classdesc Represents a FabrHelperToast helper.
 * @extends FabrHelper
 */
class FabrHelperToast extends FabrHelper {
  constructor() {
    super();
    this.helperName = "Toast";
  }

  /**
   * Show a toast message.
   * @param {string} message - The message to show.
   * @param {string} type - The type of the toast.
   * @param {number} duration - The duration of the toast.
   * @param {boolean} deletable - Whether the toast is deletable.
   * @returns {HTMLElement} The toast element.
   */
  showToast(message, type = "info", duration = 3000, deletable = false) {
    const toast = document.createElement("div");
    toast.className = `fabr-toast fabr-toast-${type}`;
    toast.innerHTML = message;

    document.body.appendChild(toast);

    if (deletable) {
      toast.addEventListener("click", () => {
        toast.remove();
      });
    }

    if (duration === 0) {
      return toast;
    }

    setTimeout(() => {
      toast.remove();
    }, duration);
  }
}
