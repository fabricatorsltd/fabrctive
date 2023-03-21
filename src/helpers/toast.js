class FabrHelperToast extends FabrHelper {
  constructor() {
    super();
    this.helperName = "Toast";
  }

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
