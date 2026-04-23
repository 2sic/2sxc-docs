---
uid: Extensions.AppExtensions.Create.Lifecycle.Index
---

TODO: @2rb - make sure it makes sense

# Define, Export, Import: Complete Lifecycle of an App Extension

This page shows the complete lifecycle of an App Extension, from defining to exporting and importing.
It will be referenced by all other App Extension tutorials.
It will walk you through the steps of

1. creating an extension definition
2. exporting the extension
3. importing it into another App

> [!TIP]
> In the [Hello World App Extension](../hello-world/index.md) tutorial, you can find a complete step-by-step example
> of the entire lifecycle, from creating to exporting and importing an extension.

## Prerequisites

This assumes you have already

1. created the app extension folder (like `extensions/hello-world/`)
2. and put something inside it

## Step 3: Configure and Build the Extension

### [1. Configure the Extension Definition](#tab/configure-extension-definition)

1. Open **App Settings -> App Extensions**, then edit your extension.
2. Configure it as needed

### [2. Export the Extension Package](#tab/build-extension-package)

In **App Settings -> App Extensions**, click the download icon on your extension.
This creates the extension package.

<div gallery="export">
  <img src="./assets/extension-export.png">
</div>

---

## Step 4: Import into Another App

### [1. Install the Package](#tab/import-the-extension)

1. Go to **App Settings -> App Extensions** in the target App
2. Click **+**
3. Choose **Select Files**
4. Pick the exported package
5. Click **Install**

<div gallery="import">
  <img src="./assets/extension-import.png">
  <img src="./assets/extension-install-confirm.png">
</div>

### [2. Test the Extension](#tab/test-the-extension)

Testing an extension depends on the type of extension.
Please read about it in the specific examples.

---

## Optional: Publish to Marketplace

For production-ready extensions, you can publish packages in the [2sxc Marketplace](https://2sxc.org/en/apps/type/app-extension).

> [!TIP]
> If you want to publish, reach out and we can help with the packaging checklist.

## Recap

You created, tested, configured, exported, and re-imported a working extension.
That is the core workflow for all App Extensions.
