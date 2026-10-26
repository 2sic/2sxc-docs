---
uid: Extensions.AppExtensions.Create.SettingsAndResources.Index
---

# Settings and Resources in App Extensions

App Extensions can provide their own **settings** and multi-language **resources**.
The extension should always ship useful preset values, while every App that installs it
can add its own overrides.

This gives the extension two configuration layers:

1. **Extension presets** are included in the extension package and work immediately after installation.
2. **App overrides** belong to the App that installed the extension and replace only selected values.

The important part is that extension code must read and merge both layers.
Reading only one settings or resources entity would either ignore the presets or the App-specific overrides.

## Where to Find the Settings and Resources

In a properly configured extension,
the settings and resources can be managed directly in the extensions UI.

TODO: @2rb - create 2-3 screenshot here (docs gallery) of radmin or something, showing how to use.

## Settings Compared with Resources

Use settings and resources for different purposes:

- **Settings** control behavior, for example a theme color, page size, feature switch, or date format.
- **Resources** contain labels and messages shown to users. They can be translated like other 2sxc resources.

An extension can provide either one or both.

## Recommended Structure

The extension files and generated C# models should be grouped together:

```text
/extensions/demo-settings-and-resources/App_Data/system/bundles/
  /... (location for schema and preset data)

/AppCode/Extensions/DemoSettingsAndResources/
  /DemoSettingsAndResourcesHelper.cs
/AppCode/Extensions/DemoSettingsAndResources/Data/ (generated c# models)
  /DemoSettings.Generated.cs
  /DemoResources.Generated.cs
```

The data bundle contains the ContentTypes, preset entities, and any view definitions
that must be installed with the extension.

## 1. Create the ContentTypes and Presets

Create one ContentType for settings and one for resources.
Give every type several fields so partial overrides can be tested properly.

> [!IMPORTANT]
>
> 1. Always place this content-type in the scope of your extension, like `DemoSettingsAndResources`.
> 2. Always give it a distinct name, so that it won't conflict with other content-type names, like `DemoSettings`.

TODO: @2rb screenshot of the data showing these content-types and highlighting that we are in another schema

Example:

### Settings Example

1. `Heading`
2. `ThemeColor`
3. `ItemsPerPage`
4. `ShowDetails`
5. `DateFormat`

### Resources Example

1. `Title`
2. `Introduction`
3. `SettingsLabel`
4. `ResourcesLabel`
5. `EmptyMessage`

### Preset Entities for Default Values

Create one entity of each type and fill every field.
This will serve as the default values for the extension
and must be part of the exported data bundle.

> [!IMPORTANT]
> Always include the preset entities in the extension data bundle.
> Since it's important that an extension works directly after installation,
> even if the target App hasn't created any custom settings or resources yet.

## 2. Configure the Extension to Use these Settings/Resources

Edit the extension configuration in **App Settings > App Extensions** and assign the
settings and resources ContentTypes.

TODO: @2rb - add screenshot of this being configured (the edit dialog), highlight the important fields

The resulting `extension.json` now contains their GUIDs:

```json
{
  "settingsContentType": "<settings-content-type-guid>",
  "resourcesContentType": "<resources-content-type-guid>",
  "dataBundles": "<data-bundle-guid>"
}
```

This connection lets App Admin show the correct edit buttons and tells export/import
which extension configuration belongs together.

## 3. Include All Required Data in the Export

Before exporting, verify that the extension data bundle includes:

1. The settings ContentType
2. The resources ContentType
3. The preset settings entity
4. The preset resources entity
5. Every view definition supplied by the extension

TODO: @2rb - add screenshot of the bundle configuration dialog showing this

The Razor files and other extension files are packaged from `/extensions/`.
Generated C# models and helper services are packaged from `/AppCode/Extensions/`.

See also [Data and Schema Extensions](xref:Extensions.AppExtensions.Create.Data.Index).

## 4. Generate Typed C# Models

Generate the models into the extension-specific namespace and folder, for example:

```text
/AppCode/Extensions/DemoSettingsAndResources/Data/
```

Use the generated property names in code instead of dynamic string access.
Regenerate the models whenever a settings or resources ContentType changes.

## 5. Merge Presets (Default Data) with App Overrides

When the app code runs, we can have 3 scenarios:

1. No App override exists, only the preset is available.
2. A full App override exists, which should take precedence over the preset.
3. A partial App override exists, which should merge with the preset.

To keep the code simple which uses these values,
we'll create some helper service to handle the merging logic - using the 2sxc **Stack** feature.
The _local_ App-specific entity (the override) is the first layer
and the extension preset is the fallback layer.

The following example shows the core pattern for resources:

```csharp
using System;
using System.Linq;
using AppCode.Extensions.DemoSettingsAndResources.Data;
using Custom.Hybrid;

namespace AppCode.Extensions.DemoSettingsAndResources
{
  public class DemoSettingsAndResourcesHelper : CodeTyped
  {
    public DemoResources GetResources()
    {
      if (_resources != null)
        return _resources;

      var items = App.Data.GetStream(nameof(DemoResources)).ToList();

      switch (items.Count)
      {
        case 0:
          throw new Exception("The extension resources are missing.");
        case 1:
          return _resources = As<DemoResources>(items[0]);
        default:
          var appOverride = items.Last();
          var preset = items[0];
          return _resources = AsStack<DemoResources>(appOverride, preset);
      }
    }

    private DemoResources _resources;
  }
}
```

Use the same pattern for settings with `DemoSettings`.

The resulting typed object behaves as one configuration:

- A property set by the App override wins.
- A property without an App override falls back to the extension preset.
- If no override entity exists, the preset entity is used directly.
- If no preset exists, the helper reports a clear installation/configuration error.

Caching the result in the helper avoids rebuilding the same stack repeatedly during one request.

> [!TIP]
> The Radmin App Extension uses this pattern in `RadminHelper.GetResources()`.

## 6. Use the Settings and Resources in your Code

In the extension view, access the values.
It's important to use the typed properties directly (so `settings.Heading` and not `settings.String("Heading")`).
This makes missing model properties visible during development and documents the extension contract:

```razor
@inherits Custom.Hybrid.RazorTyped
@using AppCode.Extensions.DemoSettingsAndResources
@{
  var helper = GetService<DemoSettingsAndResourcesHelper>();
  var settings = helper.GetSettings();
  var resources = helper.GetResources();
}

<h2>@resources.Title</h2>
<p>@resources.Introduction</p>

<h3>@resources.SettingsLabel</h3>
<dl>
  <dt>Heading</dt><dd>@settings.Heading</dd>
  <dt>Theme color</dt><dd>@settings.ThemeColor</dd>
  <dt>Items per page</dt><dd>@settings.ItemsPerPage</dd>
  <dt>Show details</dt><dd>@settings.ShowDetails</dd>
  <dt>Date format</dt><dd>@settings.DateFormat</dd>
</dl>

<h3>@resources.ResourcesLabel</h3>
<p>@resources.EmptyMessage</p>
```

Explicit property access verifies that
the generated model, ContentType, preset data, and merge behavior
are all implemented correctly.

## 7. Verify in an Installed App

Export the extension and install it in a different App.
Then add the extension's view to a page and perform both tests.

### Test A: Presets Only

Do not create any App-specific settings or resources.
Every displayed value must come from the extension presets.

This proves that the package includes:

- Both ContentTypes
- Both preset entities
- The view definition
- Razor and AppCode files

### Test B: Partial Overrides

Create App-specific settings and resources, but override only one or two fields in each.

Verify that:

- The changed fields use the App values.
- Every other field still uses the extension presets.
- The extension view renders without missing values or errors.

This second test is essential. A full override could hide a broken fallback implementation.

## Export and Verification Checklist

- [ ] Settings ContentType has been assigned in the extension configuration.
- [ ] Resources ContentType has been assigned in the extension configuration.
- [ ] Preset settings and resources contain values for every expected field.
- [ ] ContentTypes, preset entities, and view definitions are in the data bundle.
- [ ] Typed models are generated below `/AppCode/Extensions/<ExtensionName>/`.
- [ ] A helper merges App overrides over extension presets with `AsStack`.
- [ ] The view accesses every typed property explicitly.
- [ ] A clean target App works without overrides.
- [ ] A clean target App works with only one or two fields overridden.

## Example

See the
[Demo Settings and Resources App Extension](https://github.com/2sxc-apps/app-extension-demo-settings-and-resources)
for a complete implementation.

## History

1. App Extension settings and resources introduced in 2sxc v21.
2. These docs added v22 ca. 2026-10
