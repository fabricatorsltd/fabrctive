class ReactiveLink extends ReactiveCoreComponent {
  constructor() {
    super();
    this.componentName = "ReactiveLink";
    this.selector = "[link-react]";
    this.eventMap = {
      click: "onClick",
      // mouseover: 'onMouseOver'
    };
  }

  onClick(event) {
    event.preventDefault();
    let source = "";
    let target = event.target.closest("[link-react]");
    if (target) {
      source = target.hasAttribute("href")
        ? target.getAttribute("href")
        : target.getAttribute("link-react-target");
    }
    const containerId = target ? target.getAttribute("link-react-dom") : null;
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
