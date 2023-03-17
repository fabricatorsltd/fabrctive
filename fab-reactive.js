class ReactiveCore {
  fetchContent(sourceUrl) {
    return fetch(sourceUrl)
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const sourceElement = doc.querySelector('html');
        return sourceElement.innerHTML;
      })
      .catch(error => {
        console.error('Error:', error);
      }
    );
  }

  fetchJSON(sourceUrl) {
    return fetch(sourceUrl)
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error('Error:', error);
      }
    );
  }
}

class Reactive extends ReactiveCore {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.initForms();
    this.initLinks();
  }

  initForms() {
    const forms = new ReactiveForm();
    forms.init();
  }

  initLinks() {
    const links = new ReactiveLink();
    links.init();
  }
}

class ReactiveCoreComponent extends ReactiveCore {
  constructor() {
    super();
    this.componentUID = Math.random().toString(36).substr(2, 9);
    this.componentName = 'Generic';
    this.selector = '';
    this.eventMap = {};
  }

  init() {
    console.log(`Init ${this.componentName}`)
    console.log(`\t<CID:${this.componentUID}>`);
    console.log(`\t<Selector:${this.selector}>`);
    this.initElements();
    this.initEventListeners();
  }

  initElements() {
    this.elements = document.querySelectorAll(this.selector);
  }

  initEventListeners() {
    for (let [event, fn] of Object.entries(this.eventMap)) {
      console.log(`\t<Event:${event}>`);
      console.log(`\t<Fn:${fn}>`);
      this.elements.forEach(element => {
        element.addEventListener(event, e => {
          this[fn](e);
        });
      });
    }
  }
}

class ReactiveForm extends ReactiveCoreComponent {
  constructor() {
    super();
    this.componentName = 'ReactiveForm';
    this.selector = '[form-react]';
    this.eventMap = {
      submit: 'onSubmit'
    };
  }

  onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formAction = event.target.action;

    this.submitForm(formAction, formData)
      .then(data => {
        if (data.status === 200) {
          if (data.redirect) {
            window.location.href = data.redirect;
          } else {
            showToast(data.message, 'success', 3000, true);
          }
        } else {
          showToast(data.message, 'error', 0, true);
        }
      })
      .catch(error => console.error('Error:', error));
  }

  submitForm(formAction, formData) {
    return fetch(formAction, {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}

class ReactiveLink extends ReactiveCoreComponent {
  constructor() {
    super();
    this.componentName = 'ReactiveLink';
    this.selector = '[link-react]';
    this.eventMap = {
      click: 'onClick',
      mouseover: 'onMouseOver'
    };
  }

  onClick(event) {
    event.preventDefault();
    const source = event.target.getAttribute('href');
    const containerId = event.target.getAttribute('link-react-dom');
    const container = containerId ? document.getElementById(containerId) : document.body;

    this.fetchContent(source)
      .then(html => {
        container.innerHTML = html;

        const scripts = container.querySelectorAll('script');
        scripts.forEach(script => {
          if (script.innerText) {
            eval(script.innerText);
          } else {
            fetch(script.src).then(response => {
              response.text().then(r => {
                eval(r);
              });
            });
          }
        });
      })
      .then(() => {
        if (!containerId) {
          window.history.pushState(null, '', source);
        }
      })
      .catch(error => console.error('Error:', error));
  }

  onMouseOver(event) {
    console.log('Mouse Over on:', event.target);
  }
}
