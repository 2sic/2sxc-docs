---
uid: Basics.App.Extensions.Index
---

# App Extensions - Overview (new v21 ⭐)

<!-- [!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>
  .context-box-summary .data-all,
  .context-box-summary .query-app,
  .context-box-summary .process-razor,
  .context-box-summary .process-web-api-app,
  .context-box-summary .edit-ui-custom
  { visibility: visible; }
</style> -->

App Extensions are a powerful way to extend the functionality of your 2sxc Apps.
They allow you to add custom features, tools, and integrations that can enhance the capabilities of your applications.

> [!TIP]
> Think of App Extensions like nuget or npm packages, but specifically designed for 2sxc Apps.
> They can include code, templates, styles, and other resources that can be easily integrated into your App.

## Key Features of App Extensions

1. Isolated: App extensions are in special places within the App structure, so they don't interfere with the main App code.
2. Manageable: You can easily install, update, and remove App extensions through the 2sxc interface.
3. Shareable: App extensions can be exported and shared with other 2sxc users, making it easy to distribute custom functionality.
4. Versioned: Each App extension can have its own versioning, allowing for better management of updates and compatibility.
5. Configurable: Many App extensions come with settings that allow you to customize their behavior to fit your specific needs.
6. Polymorphic: App extensions can be installed in multiple editions, allowing you to test a new edition while keeping the stable one active.

## Getting Started with App Extensions

To start using App extensions, follow these steps:

1. **Access the App Extensions Interface**: Navigate to the App management section in your 2sxc installation and select the App you want to extend.
2. **Browse Available Extensions**: Look for the App Extensions tab or section to see available extensions.
3. **Install an Extension**: Select an extension you want to install and follow the prompts to add it to your App.

For best experience, we recommend you try the **Color Picker Spectrum** extension, which adds a powerful color selection tool to your Apps.

TODO: instructions for testing the color picker

## Types of App Extensions

App extensions can come in various types - and they can combine all the types, including:

- [Input Types](xref:Basics.App.Extensions.InputField): Custom input fields for data entry.
- [App Code and Web APIs](xref:Basics.App.Extensions.AppCode): Custom C# code and Web APIs to add server-side functionality.
- **Visual Queries**: Predefined queries that can be reused across different parts of your App
- **Templates**: Custom templates for rendering content.
- **Scripts**: JavaScript or server-side scripts that add functionality.
- **Styles**: CSS styles that can be applied to your App's appearance.
- **Tools**: Utilities that enhance the App development experience.
- **DataSources**: Custom data sources for retrieving and manipulating data.

## Developing Your First App Extension

For first steps, let's create a simple Input Type extension.
