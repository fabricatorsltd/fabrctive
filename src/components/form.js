/**
 * @classdesc Represents a FabrForm component.
 * @extends FabrCoreComponent
 */
fbr.FabrForm = class extends fbr.FabrCoreComponent {
  constructor() {
    super();
    this.componentName = "FabrForm";
    this.componentStyleClass = "fabr-form";
    this.selector = "[fabr-form]";
    this.eventMap = {
      submit: "onSubmit",
    };
    this.toastHelper = new fbr.FabrHelperToast();
    this.toastHelper.init(this);
  }

  /**
   * Handle the form submission event.
   * @param {Event} event - The event object.
   */
  onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formAction = event.target.action;

    if (event.target.hasAttribute("fabr-form-response")) {
      const responseUrl = event.target.getAttribute("fabr-form-response");
      this.#getResponse(responseUrl)
        .then((data) => {
          if (data.status === 200) {
            if (data.redirect) {
              window.location.href = data.redirect;
            } else {
              this.toastHelper.showToast(data.message, "success", 3000, true);
            }
          } else {
            this.toastHelper.showToast(data.message, "error", 0, true);
          }
        })
        .catch((error) => console.error("Error:", error));
      return;
    }

    this.#submitForm(formAction, formData)
      .then((data) => {
        if (data.status === 200) {
          if (data.redirect) {
            window.location.href = data.redirect;
          } else {
            this.toastHelper.showToast(data.message, "success", 3000, true);
          }
        } else {
          this.toastHelper.showToast(data.message, "error", 0, true);
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  /**
   * Get the response from the server.
   * @param {string} responseUrl - The URL to fetch the response from.
   * @returns {Promise} - The response from the server.
   * @private
   */
  #getResponse(responseUrl) {
    return fetch(responseUrl)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  /**
   * Submit the form to the server.
   * @param {string} formAction - The URL to submit the form to.
   * @param {FormData} formData - The form data to submit.
   * @returns {Promise} - The response from the server.
   * @private
   */
  #submitForm(formAction, formData) {
    return fetch(formAction, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
};
