class FabrSnippet extends FabrCoreComponent {
  constructor() {
    super();
    this.componentName = "Snippet";
    this.componentStyleClass = "fabr-has-snippet";
    this.selector = "[fabr-snippet]";
    this.eventMap = {};

    this.iconHelper = new FabrHelperIcon();
    this.iconHelper.init(this);
    this.iconHelper.setIconsLibraryMaterial();

    this.toastHelper = new FabrHelperToast();
    this.toastHelper.init(this);
  }

  init() {
    super.init();
    this.render();
  }

  render() {
    this.elements.forEach((element) => {
      this.renderSnippet(element);
    });
  }

  renderSnippet(element) {
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
    code.innerText = this.cleanUpHtml(originElement.innerHTML);

    this.addInternalEventListener(icon, "click", "onIconClick", element);

    pre.appendChild(code);
    snippet.appendChild(pre);
    snippet.appendChild(icon);
    element.appendChild(snippet);
  }

  cleanUpHtml(unsafe) {
    let res = unsafe
      .replace(/&/g, "&")
      .replace(/</g, "<")
      .replace(/>/g, ">")
      .replace(/"/g, '"')
      .replace(/'/g, "'");

    return res;
  }

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
}
