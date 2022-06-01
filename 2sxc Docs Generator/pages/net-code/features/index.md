---
uid: NetCode.Features.Index
---
# Features API in .net

2sxc / EAV in 9.30+ has a [features management](https://2sxc.org/en/blog/post/new-features-management-in-2sxc-9-30). In certain cases it would be good if the razor-view could verify that the feature is enabled - for example to show a warning when it isn't enabled yet. This is what the Features API is for.

## How To Use

This example is taken from [Mobius Forms](xref:App.Mobius) and the code can be found in the [Mobius Github Repo](https://github.com/2sic/app-mobius-forms/).

```cs
@{
  var feats = GetService<ToSic.Sxc.Services.IFeaturesService>();

  // show warning if the save-attachments in web api isn't activated
  if(!feats.IsEnabled("SaveInAdamApi")) {
    <div class="alert alert-warning">
      Warning: file upload won't work yet, as it hasn't been enabled.
    </div>
  }

  // Show warning if any of the following features are not enabled
  if(!feats.IsEnabled("PublicEditForm", "PublicUploadFiles")) {
    <div class="alert alert-warning">
      Warning: Edit Form and file upload have not been enabled.
    </div>
  }
}
```

The code above checks if a feature is enabled, and if not, will show a message to the viewer that this must be enabled first.

## What you Need To Know

1. The (new) API lies in the namespace `ToSic.Sxc.Services` - see [](xref:ToSic.Sxc.Services.IFeaturesService)
1. The `IFeaturesService` will do the checks for you
1. ATM the public API has the following commands
    1. `Enabled(string nameId)` which checks if a feature is enabled based on the name
    1. `Enabled(string nameId, nameId)` use with more parameters
    1. `Enabled(string nameId, nameId, nameId, ...)` use with as many parameters a you want
    1. `Enabled(string[] nameIds)` use with string-array

## Finding Feature NameIds and GUIDs

As of v13 we always recommend using the NameIds since they are easier to read. These features are currently managed:

1. `PasteImageFromClipboard` - enables paste image from clipboard in the TinyMCE editor
1. `WysiwygPasteFormatted` - enables paste formatted text in the TinyMCE editor
1. `PublicEditForm` - enables the form to open up for non-editors (to use as input dialogs) - security will still be checked based on config, so it's safe
1. `PublicUploadFiles` - allows public (non-editors) to upload files (types will still be checked), so it's safe
1. `SaveInAdamApi` - enables the `SaveInAdam` API in the WebAPIs
1. `PermissionCheckUsers` - enables you to set permissions for specific users (by default you can only set by standard roles like Admin, etc.)
1. `PermissionCheckGroups` - enables you to set permissions for specific groups (by default you can only set by standard roles like Admin, etc.)
1. `WebFarmCache` - enables the [enterprise WebFarmCache](https://2sxc.org/en/web-farm-cache) (requires a license)

## Read also

...

## History

1. Introduced in 2sxc 09.30
1. Moved from the static object `Features` to a proper Sxc Service in v13.01
1. Added nameId checks for more readable code in v13.01