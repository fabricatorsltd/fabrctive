class FabrForm extends FabrCoreComponent {
  constructor() {
    super();
    this.componentName = "FabrForm";
    this.selector = "[fabr-form]";
    this.eventMap = {
      submit: "onSubmit",
    };
  }

  onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formAction = event.target.action;

    this.submitForm(formAction, formData)
      .then((data) => {
        if (data.status === 200) {
          if (data.redirect) {
            window.location.href = data.redirect;
          } else {
            showToast(data.message, "success", 3000, true);
          }
        } else {
          showToast(data.message, "error", 0, true);
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  submitForm(formAction, formData) {
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
}
