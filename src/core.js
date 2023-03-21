/**
 * @classdesc Represents the core functionality of the Fabr library.
 * @class
 */
class FabrCore {
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
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}
