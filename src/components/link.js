class FabrLink extends FabrCoreComponent {
  constructor() {
    super();
    this.componentName = "FabrLink";
    this.selector = "[fabr-link]";
    this.eventMap = {
      click: "onClick",
      // mouseover: 'onMouseOver'
    };
  }

  onClick(event) {
    event.preventDefault();
    let source = "";
    let target = event.target.closest("[fabr-link]");
    if (target) {
      source = target.hasAttribute("href")
        ? target.getAttribute("href")
        : target.getAttribute("fabr-link-target");
    }
    const containerId = target ? target.getAttribute("fabr-link-dom") : null;
    const container = containerId
      ? document.getElementById(containerId)
      : document.body;

    this.fetchContent(source)
      .then((html) => {
        container.innerHTML = html;

        // Execute scripts in the global scope
        const scripts = container.querySelectorAll("script");
        scripts.forEach((script) => {
          if (script.innerText) {
            eval(script.innerText);
          } else {
            fetch(script.src).then((response) => {
              response.text().then((r) => {
                eval(r);
              });
            });
          }
        });

        // Set title
        const title = container.querySelector("title");
        if (title) {
          document.title = title.innerText;
        }
      })
      .then(() => {
        if (!containerId) {
          window.history.pushState(null, "", source);
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  onMouseOver(event) {
    console.log("Mouse Over on:", event.target);
  }
}