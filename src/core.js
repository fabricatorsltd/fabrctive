fbr = {};

/**
 * @classdesc Represents the core functionality of the Fabr library.
 * @class
 */
fbr.FabrCore = class {
  /**
   * Fetches the content from the specified URL.
   * @param {string} sourceUrl - The URL to fetch the content from.
   * @returns {Promise} A Promise that resolves with the fetched content as a string.
   */
  fetchContent(sourceUrl) {
    return fetch(sourceUrl)
      .then((response) => response.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const sourceElement = doc.querySelector("html");
        return sourceElement.innerHTML;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  /**
   * Fetches JSON data from the specified URL.
   * @param {string} sourceUrl - The URL to fetch the JSON data from.
   * @returns {Promise} A Promise that resolves with the fetched JSON data.
   */
  fetchJSON(sourceUrl) {
    return fetch(sourceUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Expected JSON response");
        }
        return response.json();
      })
      .then((data) => {
        if (
          !Array.isArray(data) ||
          !data.every((item) => typeof item === "object")
        ) {
          throw new TypeError("Invalid JSON data");
        }
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  /**
   * Fetches a JavaScript script from the specified URL.
   * Just a wrapper around the fetch() function for convenience.
   * @param {string} sourceUrl - The URL to fetch the script from.
   */
  fetchJsScript(sourceUrl) {
    return fetch(sourceUrl)
      .then((response) => response.text())
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  /**
   * Renders the specified HTML content in the given container element.
   * @param {string} html - The HTML content to render.
   * @param {HTMLElement} container - The container element to render the content in.
   */
  renderContent(html, container) {
    // avoid re-rendering the same content
    if (container.innerHTML === html) {
      return;
    }

    // remove all scripts with [fabr-lib] attribute
    const scripts = container.querySelectorAll("script[fabr-lib]");
    for (const script of scripts) {
      script.remove();
    }

    // set title
    if (container.tagName === "HTML") {
      const title = container.querySelector("title");
      if (title) {
        document.title = title.innerHTML;
      }
    }

    // set content
    container.innerHTML = html;

    // reload fabr
    fbr.fabr.reload();
  }

  /**
   * Renders the url's content in the given container element.
   * @param {string} url - The URL to fetch the content from.
   * @param {HTMLElement} container - The container element to render the content in.
   */
  renderUrl(url, container) {
    this.fetchContent(url)
      .then((html) => {
        return this.renderContent(html, container);
      })
      .catch((error) => console.error("Error:", error));
  }
};
