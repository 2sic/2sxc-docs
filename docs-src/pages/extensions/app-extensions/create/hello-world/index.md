---
uid: Extensions.AppExtensions.Create.HelloWorld.Index
---

# Create Your First Hello World App Extension WIP

<!-- [!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>
  .context-box-summary .data-all,
  .context-box-summary .query-app,
  .context-box-summary .process-razor,
  .context-box-summary .process-web-api-app,
  .context-box-summary .edit-ui-custom
  { visibility: visible; }
</style> -->

In this section, we'll create a simple "Hello World" App Extension to demonstrate the basics of extension development.

## Step 1: Create the Extension Folder

In your App, create a new folder `/extensions/hello-world` and inside that,
create a `Greeting.cshtml` file with this contents:

```html
<div class="alert alert-info">
  Hello, World
</div>
```

TODO: @2rb DO THIS, and create screenshots of the folder structure and file contents to add here.
TODO: for all screenshots, make sure you use the gallery mode, so that the images are not too big.

## Step 2: Test Your Extension

TODO: @2RB create a test-view, use @Html.Partial to render the Greeting.cshtml, and add instructions and screenshots here.
incl. creating the view in the App, and selecting the view so it's visible on the page.

## Step 3: Create the Extension Manifest

TODO: @2rb create instructions, add 2-3 screenshots

## Step 4: Export Your Extension

TODO: @2RB

## Step 5: Import Your Extension into Another App

TODO: @2RB, create instructions, add 2-3 screenshots, incl. adding the message to an existing view in the new App to show that it works.
I suggest you create a standalone portal, add the Content app, import it there etc.

## Step 6: Distribute the App

This is optional - and in the case of the **Hello World** not useful - but you can distribute your extension to other users via the Marketplace.
To do that, you need to create a package and submit it to the Marketplace.
Just reach out to us and we'll help you get started.

## Recap

TODO: @2rb summarize points of things they learned

