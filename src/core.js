class FabrCore {
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
