---
uid: NetCode.DynamicCode.Objects.Settings
---

<img src="~/assets/features/settings-stack.svg" class="feature">

# Settings in Dynamic Code ✨ new!

The `Settings` object consolidates settings for the current scenario. 
It merges settings configured in the _View_, _App_, _Site_, _System_ and _Presets_. 
The top-most setting has preference. So if a view overrides a site-setting, the view-setting will be used. 

[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]

> [!TIP]
> Learn more about settings and what predefined settings exist in [these docs](xref:Basics.Configuration.Index).
>
> There you'll learn about predefined image sizes, google maps keys and more.

## Example

Let's assume you have these View-Settings

* **PrimaryColor** would be `#FF0000`
* **Columns** would be `4`
* **SomeApiKey** would be `6n23cnhi502ceh`

An these App-Settings

* **PrimaryColor** = `#CCCCCC`
* **SecondaryColor** = `#00AA00`

Then you could get these values from the `Settings` object

* `@Settings.PrimaryColor` would be `#FF0000` - found it View
* `@Settings.SecondaryColor` would be `#00AA00` - only exists in App
* `@Settings.Columns` would be `4` - only exists in View
* `@Settings.SomeApiKey` would be `6n23cnhi502ceh` - from App
* `@Settings.DoesntExist` would be `null` as that data doesn't exist
* `@Settings.Images.Content.Width` would be `1400` as it is a [preset](xref:Basics.Configuration.SettingsSystem)

> [!TIP]
> Remember that [Settings](xref:NetCode.DynamicCode.Objects.Settings) are meant for configuration 
> and [Resources](xref:NetCode.DynamicCode.Objects.Resources) should be used for multi-language output.
> You could do it differently, but that would be bad practice.

## How it Works

The `Settings` is a dynamic object. 
Internally the Settings use the new [](xref:ToSic.Sxc.Data.IDynamicStack) object to _stack_ entities like sources on each other, and take the first best match. 
The sources are: 

1. **ViewCustom** with View-level settings
1. **AppCustom**/**AppSystem** with App-level settings
1. **SiteCustom**/**SiteSystem** with Site-level settings
1. **GlobalCustom**/**GlobalSystem** with System-level settings
1. **PresetSystem** with pre-defined settings from the installation

> [!TIP]
> Read more about this stack and what's in it here [](xref:Basics.Configuration.SettingsStack).
> This also includes the full list of sources and their exact names. 

The order of the sources is important, as the first match will be returned. 
The View has priority over the App. 
This setup allows Views to override App-Defaults.

## Accessing Settings from One Source

In rare cases you may want to access settings from a specific source - maybe to detect if it has been changed or because your template explicitly wants the App settings. 
For this you can use the `GetSource(name)` method like this:

* `@Settings.PrimaryColor` would return `#FF0000`
* `@Settings.GetSource("ViewCustom").PrimaryColor` would return `#FF0000`
* `@Settings.GetSource("AppCustom").PrimaryColor` would return `#CCCCCC`

---

## History

1. You could use `App.Settings` since ca. 2sxc 6
1. `Settings` object Introduced in 2sxc 12.02 to consolidate View and App Settings
1. `Settings` object was expanded in 12.04 to also cover global, portal and site level settings - see [settings docs](xref:Basics.Configuration.Index)
