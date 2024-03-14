---
uid: NetCode.TypedCode.CompareApis.SettingsResources
---

# Settings / Resources Differences in APIs

2sxc has changed a lot over time.
So you'll find old code snippets and new ones, and it helps to see which one is being used.
Sometimes you'll also want to convert old code to new code, and this page should help you with that.

## Settings and Resources Objects

### Typed Code

In Typed Code, the objects you'll use are usually:

* `AllSettings` - a [ITypedStack] with all settings
* `AllResources` - a [ITypedStack] with all resources
* `App.Settings` - a [ITypedItem] with app settings
* `App.Resources` - a [ITypedItem] with app resources

To get a value in typed code, you will use typed methods such as `.String(...)`.
These can also have longer keys inside them, such as:

```csharp
var width = AllSettings.String("Images.Content.Width");
```

> [!TIP]
> The typed code is much more robust, as it will not throw an error if a setting doesn't exist.
> So getting `Images.MyConfig.Width` will not throw an error if `MyConfig` doesn't exist.

### Strongly Typed Code

In Strongly Typed Code - inheriting from `AppCode.Razor.AppRazor`, the objects you'll use are usually:

* `AllSettings` - a [ITypedStack] with all settings
* `AllResources` - a [ITypedStack] with all resources
* `App.Settings` - a `AppCode.Data.AppSettings` based on [ITypedItem] with app settings
* `App.Resources` - a `AppCode.Data.AppResources` based on [ITypedItem] with app resources


### Dynamic Code

In Dynamic Code, the objects you'll use are usually:

* `Settings` - a dynamic object with all settings
* `Resources` - a dynamic object with all resources
* `App.Settings` - a dynamic object with app settings
* `App.Resources` - a dynamic object with app resources

To get a value in dynamic code, you will use the dynamic object directly, such as:

```csharp
var width = Settings.Images.Content.Width;
```

> [!WARNING]
> The dynamic code is much more error-prone, as it will throw an error if a setting doesn't exist.
> So getting `Images.MyConfig.Width` will throw a null-error if `MyConfig` doesn't exist.

## Get Settings and Resources

| Dynamic | Typed | Comments / Differences
| --- | --- | ---
| `Settings` <br> (`dynamic`) | `AllSettings` <br> ([ITypedStack]) | All settings
| `Settings.Color` <br> (`dynamic`) | `AllSettings.String("Color")` <br> (`string`) | Get a color setting
| `Resources` <br> (`dynamic`) | `AllResources` <br> ([ITypedStack]) | All resources
| `Resources.Title` <br> (`dynamic`) | `AllResources.String("Title")` <br> (`string`) | Get a resource
| `App.Settings` <br> (`dynamic`) | `App.Settings` <br> ([ITypedItem]) | App settings
| `App.Settings.Color` <br> (`dynamic`) | `App.Settings.String("Color")` <br> (`string`) | App settings
| `App.Resources` <br> (`dynamic`) | `App.Resources` <br> ([ITypedItem]) | App resources
| `App.Resources.Title` <br> (`dynamic`) | `App.Resources.String("Title")` <br> (`string`) | App resources

> [!TIP]
> The new `AllSettings` and `AllResources` can use paths to deeper values, such as
> `AllSettings.Int("Images.Content.Width)`.
> This is much safer that the old API, which threw an error if an intermediate setting didn't exist.

---


[ITypedItem]: xref:ToSic.Sxc.Data.ITypedItem "ITypedItem"
[ITypedStack]: xref:ToSic.Sxc.Data.ITypedStack
