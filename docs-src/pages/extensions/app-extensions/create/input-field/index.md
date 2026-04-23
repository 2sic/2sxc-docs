---
uid: Extensions.AppExtensions.Create.InputField.Index
---

# Input field extension

Custom input fields are **App Extensions** which live inside your App and extend the edit UI.
They are plain JavaScript WebComponents which the 2sxc edit dialog can load and talk to.

This page shows how to create a custom input field in JavaScript using a **basic number slider** as example.

## What are input field extensions?

Input Field Extensions let you **add your own custom input controls**
They are small Components that run inside your App and replace or enhance normal fields like text-boxes or dropdowns.

Use them when you want a field, for example sliders, color pickers, tag selectors, or anything the built-in fields cannot do.

## 1. Folder and Naming

Create the extension in `/extensions/` using this pattern:

```text
field-[data-type]-[name]
```

Examples:

- `extensions/field-number-slider-basic`
- `extensions/field-string-app-color-picker`
- `extensions/field-boolean-icons`

Rules:

- Must start with `field-`
- Second part must be the data type (`string`, `number`, `boolean`, ...)
- Use only lowercase and dashes

## 2. Configure the Extension Entry

Open **App Settings -> App Extensions** and edit your extension.
In **Input Fields Configuration**, define which JavaScript files to load.

```javascript
(() => {

  const tagName = "field-example-basic";

  // Minimal HTML for the component
  const html = `<input type="text" />`;

  class BasicField extends HTMLElement {
    connectedCallback() {
      
      // Connector given by 2sxc
      const connector = this.connector;
      this.field = connector.field;

      // Get field settings
      const settings = connector.field?.settings || {};
      
      // Render input
      this.innerHTML = html;

      this.input = this.querySelector("input");

      // Forward user input back to the 2sxc field API
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

<div gallery="gallery-input-field-1">
  <img src="./assets/input-fields-files.png">
</div>

The [connector](https://docs.2sxc.org/js-code/custom-fields/connector.html?q=connector) is provided by 2sxc.

You can find further examples of input field extensions in these repositories:

- [Number Slider](https://github.com/2sxc-apps/app-extension-number-slider-basic)
- [Color Picker](https://github.com/2sxc-apps/app-extension-string-color-picker-spectrum)

## 3. Add Extension Settings (Optional)

If your field needs settings (for example `Min`, `Max`, `Step`), create a separate settings ContentType.

> [!IMPORTANT]
> The settings ContentType name must be `@{extension-name}`.
>
> Example:
>
> - Extension folder: `field-number-slider-basic`
> - Extension name: `number-slider-basic`
> - Settings ContentType: `@number-slider-basic`

Add fields such as `Step` to this settings type.
2sxc will then show these settings in the field configuration UI.

<div gallery="gallery-content-type-field">
  <img src="./assets/input-create-new-content-type.png">
  <img src="./assets/input-content-type-field.png">
</div>

## 4. Include Settings in Extension Export

[!include[](~/shared/extensions/app-extensions/_include-settings-in-export.md)]

---

## History

Created in v21.02
