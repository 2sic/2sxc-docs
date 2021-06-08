---
uid: NetCode.DynamicCode.Objects.Settings
---

# Settings / @Settings Object Dynamic Code

The `Settings` object consolidates settings for the current scenario. It merges settings configured in the View and App and gives View-Settings the preference. 

TODO: #TODOC - CREATE TUTORIALS FOR THIS

[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]

## Example

Let's assume you have these View-Settings

* **PrimaryColor** would be `#FF0000`
* **Columns** would be `4`
* **GoogleMapsKey** would be `6n23cnhi502ceh`

An these App-Settings

* **PrimaryColor** = `#CCCCCC`
* **SecondaryColor** = `#00AA00`

Then you could get these values from the `Settings` object

* `@Settings.PrimaryColor` would be `#FF0000` - found it View
* `@Settings.SecondaryColor` would be `#00AA00` - only exists in App
* `@Settings.Columns` would be `4` - only exists in View
* `@Settings.GoogleMapsKey` would be `6n23cnhi502ceh` - from App
* `@Settings.DoesntExist` would be `null` as that data doesn't exist

> [!TIP]
> Remember that [Settings](xref:NetCode.DynamicCode.Objects.Settings) are meant for configuration 
> and [Resources](xref:NetCode.DynamicCode.Objects.Resources) should be used for multi-language output.
> You could do it differently, but that would be bad practice.

## How it Works

The `Settings` is a dynamic object. 
Internally the Settings use the new [](xref:ToSic.Sxc.Data.IDynamicStack) object to _stack_ entities like sources on each other, and take the first best match. 
As of now the two underlying sources used are:

1. **View** which contains View settings if the view has any
1. **App** which contains App settings if the App has any

The order of the sources is important, as the first match will be returned. 
The View has priority over the App. 
This setup allows Views to override App-Defaults.

## Accessing Settings from One Source

In rare cases you may want to access settings from a specific source - maybe to detect if it has been changed or because your template explicitly wants the App settings. 
For this you can use the `GetSource(name)` method like this:

* `@Settings.PrimaryColor` would return `#FF0000`
* `@Settings.GetSource("View").PrimaryColor` would return `#FF0000`
* `@Settings.GetSource("App").PrimaryColor` would return `#CCCCCC`


---

## History

1. Previously you could use App.Settings since ca. 2sxc 6
1. Settings object Introduced in 2sxc 12.02 to consolidate View and App Settings

## Future

We plan to introduce site-level, portal level and system-level settings, would would all be accessible in this object. 