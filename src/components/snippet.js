/**
 * @classdesc Represents a FabrSnippet component.
 * @extends FabrCoreComponent
 */
fbr.FabrSnippet = class extends fbr.FabrCoreComponent {
  constructor() {
    super();
    this.componentName = "Snippet";
    this.componentStyleClass = "fabr-has-snippet";
    this.selector = "[fabr-snippet]";
    this.eventMap = {};

    this.iconHelper = new fbr.FabrHelperIcon();
    this.iconHelper.init(this);
    this.iconHelper.setIconsLibraryMaterial();

    this.toastHelper = new fbr.FabrHelperToast();
    this.toastHelper.init(this);
  }

  /**
   * Initialize the component by rendering the snippet.
   * @override
   */
  init() {
    super.init();
    this.#render();
  }

  /**
   * Render the snippet.
   * @private
   */
  #render() {
    this.elements.forEach((element) => {
      this.#renderSnippet(element);
    });
  }

  /**
   * Render the snippet from the given element.
   * @param {HTMLElement} element - The element to render the snippet from.
   * @private
   */
  #renderSnippet(element) {
    const originElement = document.querySelector(
      element.getAttribute("fabr-snippet-from")
    );
    const snippet = document.createElement("div");
    const pre = document.createElement("pre");
    const code = document.createElement("code");
    const icon = this.iconHelper.new("content_copy");

    snippet.classList.add("fabr-snippet");
    code.classList.add("fabr-snippet-code");
    pre.classList.add("fabr-snippet-pre");
    icon.classList.add("fabr-snippet-icon");
    code.innerText = this.#cleanUpHtml(originElement.innerHTML);

    this.addInternalEventListener(icon, "click", "onIconClick", element);

    pre.appendChild(code);
    snippet.appendChild(pre);
    snippet.appendChild(icon);
    element.appendChild(snippet);
  }

  /**
   * Clean up the given HTML string to be used in a code snippet.
   * @param {string} unsafe - The unsafe HTML string.
   * @returns {string} The safe HTML string.
   * @private
   */
  #cleanUpHtml(unsafe) {
    let res = unsafe
      .replace(/&/g, "&")
      .replace(/</g, "<")
      .replace(/>/g, ">")
      .replace(/"/g, '"')
      .replace(/'/g, "'");

    return res;
  }

  /**
   * Handle the click event on the icon.
   * @param {Event} event - The event object.
   * @param {HTMLElement} element - The element to render the snippet from.
   */
  onIconClick(event, element) {
    const codeElement = element.querySelector(".fabr-snippet-code");
    const codeSnippet = codeElement.innerText;

    navigator.clipboard
      .writeText(codeSnippet)
      .then(() => {
        this.toastHelper.showToast("Code snippet copied to clipboard!", "info");
      })
      .catch((error) => {
        this.toastHelper.showToast(
          "Code snippet copied to clipboard!",
          "error"
        );
      });
  }
};
