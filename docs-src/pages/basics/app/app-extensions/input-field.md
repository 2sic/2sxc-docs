---
uid: Basics.App.Extensions.InputField
---
# Input field extension

Custom input fields are **App Extensions** which live inside your App and extend the edit UI. They are plain JavaScript WebComponents which the 2sxc edit dialog can load and talk to.

This page shows how to create a custom input field in JavaScript using a **basic number slider** as example.

---

# What are input field extensions?

Input Field Extensions let you **add your own custom input controls**
They are small Components that run inside your App and replace or enhance normal fields like textboxes or dropdowns.

Use them when you want a field, for example sliders, color pickers, tag selectors, or anything the built-in fields cannot do.

# Folder structure for app extensions

Custom input fields are App Extensions and must be placed in a specific folder:

1. In your App, create a folder called `Extensions` (if it does not exist yet)
2. Inside `Extensions`, create a folder for your field extension.
    
    The folder name must follow this **pattern**:

     ```text
     field-[data-type]-[name]
     ```
    **Examples:**
    - `field-string-app-color-picker`
    - `field-number-slider-basic`

    **Rules:**

    - It must start with `field-`
    - The second part is the data type (`string`, `number`...). 
    - The last part is a free name that describes your field.

# Configure your app extension
Before creating a custom input field, you must know where App Extensions live and how to **configure** them inside your App.

This can be found in the App settings on the left sidebar.

![App Extensions Overview](../assets/input-app-extension-configuration.png)

To change the settings of your input field extension, click the pen icon next to the extension entry.

![App extension edit](../assets/input-app-edit.png)

After opening the editor, you’ll see various fields that **describe** and **configure** your extension.

The most important setting is the `Input Fields Configuration`.
This is where you specify which files should be loaded to activate your custom input field extension.

![App extension input fields](../assets/input-fields-files.png)


Now that the App Extension is set up, we can start writing the actual code for the input field.

# Example base input field

```javascript
(() => {

  const tagName = "field-example-basic";

  // Minimal HTML for the component
  const html = `<input type="text" />`;

  class BasicField extends HTMLElement {
    connectedCallback() {
      
      // Connecter given by 2sxc
      const connector = this.connector;

      // Getting Settings
      const settings = connector.field?.settings || {};
      
      // Implement the HTML code
      this.innerHTML = html;
      // Listen for user input
      this.onInput = () => {
        this.field?.setValue(this.input.value || null);
      };
      this.input.addEventListener("input", this.onInput);
    }

    disconnectedCallback() {
      // Clean up when component is removed
      this.input.removeEventListener("input", this.onInput);
    }
  }

  customElements.define(tagName, BasicField);
})();
```

The [connector](https://docs.2sxc.org/js-code/custom-fields/connector.html?q=connector) used in this example is the one provided by 2sxc.

You can find further examples of input field extensions in these repositories:

- [Number Slider](https://github.com/2sxc-apps/app-extension-number-slider-basic)
- [Color Picker](https://github.com/2sxc-apps/app-extension-string-color-picker-spectrum)
