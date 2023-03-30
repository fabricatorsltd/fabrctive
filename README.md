<br/>

<div align="center">
  <img src="docs/fabr-logo-color.svg" height="54">
  <p align="center">fabrctive is a small library that allows you to create reactive web applications in a declarative way.</p>
</div>

<br/>

## Building
To build the library, you need to have Python 3 installed and the [jsmin](https://pypi.org/project/jsmin/)
package. Then, run the following command:

```bash
python3 build.py
```

This will create a file called `fabr.min.js` in the current directory.

## Usage
To use the library, you need to include the `fabr.min.js` file as the last script in your HTML file.
Then, you can use the `Fabr` class to initialize the library.

```html
<script fabr-lib src="fabr.min.js"></script>
```

Note the `fabr-lib` attribute. This is used to prevent the library from being reinitialized when
something is loaded dynamically.

### Development
To use the library in development mode, you need to include all the files manually.

```html
    <script fabr-lib src="src/core.js"></script>
    <script fabr-lib src="src/debugger.js"></script>

    <script fabr-lib src="src/helper.js"></script>
    <script fabr-lib src="src/helpers/animate.js"></script>
    <script fabr-lib src="src/helpers/icon.js"></script>
    <script fabr-lib src="src/helpers/localstorage.js"></script>
    <script fabr-lib src="src/helpers/sharedmemory.js"></script>
    <script fabr-lib src="src/helpers/toast.js"></script>

    <script fabr-lib src="src/component.js"></script>
    <script fabr-lib src="src/components/animator.js"></script>
    <script fabr-lib src="src/components/counter.js"></script>
    <script fabr-lib src="src/components/expander.js"></script>
    <script fabr-lib src="src/components/form.js"></script>
    <script fabr-lib src="src/components/link.js"></script>
    <script fabr-lib src="src/components/list.js"></script>
    <script fabr-lib src="src/components/notebook.js"></script>
    <script fabr-lib src="src/components/selector.js"></script>
    <script fabr-lib src="src/components/snippet.js"></script>
    <script fabr-lib src="src/components/table.js"></script>
    <script fabr-lib src="src/components/tooltip.js"></script>

    <script fabr-lib src="src/tests/localstorage.js"></script>
    <script fabr-lib src="src/tests/sharedmemory_1.js"></script>
    <script fabr-lib src="src/tests/sharedmemory_2.js"></script>
```

### Testing
You can test if the library is working by checking the `fbr` scope in the browser console. It should
appear as an object containing the Fabr classes and other stuff.

```javascript
fbr
// {FabrCore: ƒ, FabrDebugger: ƒ, FabrHelper: ƒ, FabrHelperAnimate: ƒ, FabrHelperIcon: ƒ, …}
```

## Examples
Check [examples/all-components](examples/all-componentsl) for a list of examples that demonstrate the usage of the library.

## Documentation

### Standard components
fabr.js comes with a few standard components that you can use to create reactive web applications.
Those are only a few of the actually available components. You can see the full list of components
in the [components](src/components) directory.

#### Forms
To make a form reactive, you need to add the `fabr-form` attribute to the form element.

```html
<form method="post" action="/api/login" fabr-form>
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
To make a link reactive, you need to add the `fabr-link` attribute to the link element.

```html
<a href="/api/logout" fabr-link>Logout</a>
```

When the link is clicked, the library will load the specified URL in the current page. It is also
possible to specify a `fabr-link-dom` attribute to load the URL in a different element.

```html
<a href="/api/logout" fabr-link fabr-link-dom="#main">Logout</a>
<div id="main"></div>
```

In fabr.js, every element can be a reactive link, not just the `<a>` element. Just use the
`fabr-link-target` attribute to specify the URL instead of the `href` attribute.

```html
<div fabr-link-target="/api/logout" fabr-link>Logout</div>
```

#### Counters
To make a counter reactive, you need to add the `fabr-counter` attribute to the element that
should display the counter value.

```html
<button fabr-counter="my-counter">Count!</button>
```

When the element is clicked, the library will start counting the number of clicks. It is also
possible to specify an initial value for the counter using the `fabr-counter-initial-value`
attribute.

```html
<button fabr-counter="my-counter" fabr-counter-initial-value="10">Count!</button>
```

### Creating a reactive component
To create a reactive component, you need to create a new file in the `components` directory. The file
should have the `.js` extension and contain a class that extends the `FabrCoreComponent` class.

This is an example of a component that displays a counter:

```javascript
fbr.FabrCounter = class extends fbr.FabrCoreComponent{
  constructor() {
    super();
    this.componentName = "FabrCounter";
    this.selector = "[fabr-counter]";
    this.componentStyleClass = "fabr-counter";
    this.eventMap = {
      click: "onClick",
    };
    this.counters = {};
  }

  onClick(event) {
    event.preventDefault();
    const target = event.target.closest("[fabr-counter]");
    if (target) {
      const counterId = target.getAttribute("fabr-counter");
      const counter = this.counters[counterId];
      if (counter) {
        counter.value++;
        target.innerText = counter.value;
      } else {
        const initialValue = parseInt(target.getAttribute("fabr-counter-initial-value")) || 0;
        this.counters[counterId] = { value: initialValue + 1 };
        target.innerText = this.counters[counterId].value;
      }
    }
  }
}
```

then add it to the `fabr.js` file to make it available:

```javascript
...
  this.components = {
    form: new FabrForm(),
    link: new FabrLink(),
    counter: new FabrCounter(), // your component initialization
    tooltip: new FabrTooltip(),
    notebook: new FabrNotebook(),
    table: new FabrTable(),
    animator: new FabrAnimator(),
    snippet: new FabrSnippet(),
  };
...
```

## Executing Scripts in Fabr's Custom Scope
Fabr provides a custom scope (fbr) to prevent global scope residue and improve document updates. This scope remains the same throughout the entire page and is dropped only after a full refresh. All classes and functions of the library are  part of this scope.

To execute scripts inside the fbr scope, you can use the text/fabr script type. This allows Fabr to keep track of the scripts during the page-cycle, preventing them from running multiple times or before the rendering cycle.

### Usage
After initializing Fabr, you can add a script inside the fbr scope in the following way:

```html
<script type="text/fabr">
  fbr.MyFunction = function() {
    console.log("Hello World!");
  }

  fbr.MyFunction();
</script>
```

By default, Fabr will automatically look for scripts with the `text/fabr` type and execute them inside the fbr scope. This ensures that your scripts are properly tracked and managed by Fabr during the page lifecycle.

Note that when executing scripts inside the fbr scope, it's important to avoid creating variables or functions in the global scope, as this can cause unwanted side effects. Instead, use the fbr scope to define any variables or functions needed for your script. You can also make your own custom scope inside the fbr one, to avoid messing with the fbr scope itself. In the near future, every Fabr class and function, will be prefixed with the `_` character, to avoid any possible conflicts with user-defined functions.

## Components' Signals
Fabr provides a way to communicate between components using signals. This allows you to create a more reactive and dynamic web application.

### Signals' Table
The following table shows all the signals that are currently available in Fabr:

| Component | Signal | Description |
| --- | --- | --- |
| FabrCounter | `fabr-counter:incremented` | Emitted when the counter is incremented. |

### Usage
First you need to tag the elements you want to communicate, using the `[fabr-com-id]` attribute. This attribute should contain a unique identifier for the element. Then you can ask the `Fabr` class to give you access to the element instance from its component.

The following is an example of a `FabrCounter` which shows an alert when the counter increments:

```html
<button fabr-counter="my-counter" fabr-com-id="my-counter">Count!</button>
```

and the following is the [fabr-scoped script](#executing-scripts-in-fabrs-custom-scope) that handles the signal:

```javascript
const obj = fbr.fabr.getComponentByComId("c1")
fbr.myFunc = function (event) {
    alert("Counter value: " + event.detail)
}
obj.component.connect("fabr-counter:incremented", obj.element, fbr.myFunc)
```

as you can see, the `connect` function takes three arguments: the signal name, the element that
emits the signal, and the function that handles the signal. The function receives the event object
as an argument and the signal data is stored in the `event.detail` property.

## Tauri Integration
Fabr can be used with [Tauri](https://tauri.app/), a framework that allows you to build desktop 
applications using web technologies.

In the [`examples/tauri-example`](examples/tauri-example) directory, you can find an example of a Tauri application 
that uses Fabr. I've only experimented with it on Linux and a Tauri Vanilla template, so it might
not work on other platforms or with other templates.

To run the example, you need to install Tauri and then run the following commands:

```bash
cd tauri-example
npm run tauri dev
```

The example is a simple application with some Fabr components. Note that [fabr-scoped scripts](#executing-scripts-in-fabrs-custom-scope)
doesn't work in Tauri (yet).