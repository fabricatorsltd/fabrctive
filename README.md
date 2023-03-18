# reactive.js
reactive.js is a small library that allows you to create reactive web applications in a declarative way.

## Building
To build the library, you need to have Python 3 installed and the [jsmin](https://pypi.org/project/jsmin/)
package. Then, run the following command:

```bash
python3 build.py
```

This will create a file called `reactive.min.js` in the current directory.

## Usage
To use the library, you need to include the `reactive.min.js` file as the last script in your HTML file.
Then, you can use the `reactive` function to initialize the library.

```html
<script src="reactive.min.js"></script>

<script>
    const reactive = new Reactive()
    reactive.init();
</script>
```

### Development
To use the library in development mode, you need to include all the files manually.

```html
    <script src="debugger.js"></script>
    <script src="core.js"></script>
    <script src="component.js"></script>
    <script src="components/form.js"></script>
    <script src="components/link.js"></script>
    <script src="components/counter.js"></script>
    <script src="reactive.js"></script>

    <script>
        reactive = new Reactive();
        reactive.init();
    </script>
```

## Documentation

### Standard components
reactive.js comes with a few standard components that you can use to create reactive web applications.

#### Forms
> **Note:** We need a better way to handle the response, instead of using a `showToast` function.

To make a form reactive, you need to add the `reactive-form` attribute to the form element.

```html
<form method="post" action="/api/login" reactive-form>
    <input type="text" name="username" />
    <input type="password" name="password" />
    <input type="submit" value="Login" />
</form>
```

When the form is submitted, the library will send an AJAX request to the specified URL. It expects
the response to be a JSON object with the following structure:

```json
{
    "status": 200,
    "redirect": "/dashboard",
    "message": "Login successful",
    "data": []
}
```

Then, the library will call a `showToast` function that you need to implement. In our prototype,
it takes the following arguments: `message`, `type`, `duration`, `closable`.

#### Links
To make a link reactive, you need to add the `reactive-link` attribute to the link element.

```html
<a href="/api/logout" reactive-link>Logout</a>
```

When the link is clicked, the library will load the specified URL in the current page. It is also
possible to specify a `link-react-dom` attribute to load the URL in a different element.

```html
<a href="/api/logout" reactive-link link-react-dom="#main">Logout</a>
<div id="main"></div>
```

In reactive.js, every element can be a reactive link, not just the `<a>` element. Just use the
`link-react-target` attribute to specify the URL instead of the `href` attribute.

```html
<div link-react-target="/api/logout" reactive-link>Logout</div>
```

#### Counters
To make a counter reactive, you need to add the `counter-react` attribute to the element that
should display the counter value.

```html
<button counter-react="my-counter">Count!</button>
```

When the element is clicked, the library will start counting the number of clicks. It is also
possible to specify an initial value for the counter using the `counter-react-initial-value`
attribute.

```html
<button counter-react="my-counter" counter-react-initial-value="10">Count!</button>
```

### Creating a reactive component
To create a reactive component, you need to create a new file in the `components` directory. The file
should have the `.js` extension and contain a class that extends the `ReactiveCoreComponent` class.

This is an example of a component that displays a counter:

```javascript
class ReactiveCounter extends ReactiveCoreComponent {
  constructor() {
    super();
    this.componentName = "ReactiveCounter";
    this.selector = "[counter-react]";
    this.eventMap = {
      click: "onClick",
    };
    this.counters = {};
  }

  onClick(event) {
    event.preventDefault();
    const target = event.target.closest("[counter-react]");
    if (target) {
      const counterId = target.getAttribute("counter-react");
      const counter = this.counters[counterId];
      if (counter) {
        counter.value++;
        target.innerText = counter.value;
      } else {
        const initialValue = parseInt(target.getAttribute("counter-react-initial-value")) || 0;
        this.counters[counterId] = { value: initialValue + 1 };
        target.innerText = this.counters[counterId].value;
      }
    }
  }
}
```

then add it to the `reactive.js` file to make it available:

```javascript
...
  init() {
    this.initForms();
    this.initLinks();
    this.initCounters(); // your component
  }

  initCounters() { // your component initialization
    new ReactiveCounter().init();
  }
...
```
