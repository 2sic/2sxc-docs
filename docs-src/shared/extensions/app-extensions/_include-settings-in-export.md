### [1. Scope](#tab/scope)

Move the settings ContentType into a dedicated scope so it stays out of normal app content lists.

Recommended scope pattern:

```text
Extensions.{ExtensionName}
```

<img src="~/pages/extensions/app-extensions/create/input-field/assets/input-scope-name.png" class="full-width"/>

### [2. Data Bundles](#tab/data-bundles)

A Data Bundle packages the settings ContentType together with your extension.

<img src="~/pages/extensions/app-extensions/create/input-field/assets/input-data-bundle.png" class="full-width"/>

Create a bundle and give it a name matching the extension.

### [3. Add Content Type to Bundle](#tab/add-content-type)

Open your extension data section, edit metadata on the settings ContentType,
assign it to the Data Bundle, then save.

<div gallery="gallery-data-bundle">
  <img src="~/pages/extensions/app-extensions/create/input-field/assets/input-content-type-metadata.png">
  <img src="~/pages/extensions/app-extensions/create/input-field/assets/input-decorator.png">
</div>

### [4. Include Bundle in Extension](#tab/include-bundle)

In the extension configuration, enable **Includes Data Bundles** and select your bundle.
Now the settings ContentType is part of export/import.

<img src="~/pages/extensions/app-extensions/create/input-field/assets/input-data-bundle-extension.png" class="full-width"/>
