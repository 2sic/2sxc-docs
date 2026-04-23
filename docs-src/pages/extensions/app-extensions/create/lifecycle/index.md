---
uid: Extensions.AppExtensions.Create.Lifecycle.Index
---

# Define, Export, Import: Complete Lifecycle of an App Extension

This page shows the complete lifecycle of an App Extension, from defining it to exporting and importing it.

It serves as the foundation for all other App Extension tutorials.

An App Extension is basically a folder + definition that can be packaged and reused in other apps.

You will go through these steps:

1. Creating an extension definition (already done)
2. Configuring the extension
3. Exporting the extension
4. Importing it into another app
5. Testing it

> [!TIP]
> In the [Hello World App Extension](../hello-world/index.md) tutorial, you can find a complete step-by-step example
> of the entire lifecycle, from creating to exporting and importing an extension.

---

## Prerequisites

This guide assumes you have already:

1. Created the app extension folder (for example `extensions/hello-world/`)
2. Added at least one file inside it (a basic extension definition is enough)

At this point, your extension exists locally but is not yet packaged or reusable.

---

## Step 1: Configure the Extension

### [1. Configure the Extension Definition](#tab/configure-extension-definition)

1. Open **App Settings → App Extensions**
2. Find your extension and click **Edit**
3. Configure it as needed

---

## Step 2: Export the Extension

### [1. Export the Extension Package](#tab/build-extension-package)

1. Go to **App Settings → App Extensions**
2. Find your extension
3. Click the **Download** icon

This creates the extension package (ZIP file).

<div gallery="export">
  <img src="./assets/extension-export.png">
</div>

---

## Step 3: Import into Another App

### [1. Install the Package](#tab/import-the-extension)

1. Go to **App Settings → App Extensions** in the target app
2. Click **+**
3. Choose **Select Files**
4. Pick the exported package
5. Click **Install**

<div gallery="import">
  <img src="./assets/extension-import.png">
  <img src="./assets/extension-install-confirm.png">
</div>

---

## Step 4: Test the Extension

### [1. Test the Extension](#tab/test-the-extension)

Testing depends on the type of extension.

Check the specific examples for details.

---

## Optional: Publish to Marketplace

For production-ready extensions, you can publish packages in the [2sxc Marketplace](https://2sxc.org/en/apps/type/app-extension).

> [!TIP]
> If you want to publish, reach out and we can help with the packaging checklist.
