---
uid: NetCode.DynamicCode.Objects.Resources
---

# Resources / @Resources Object Dynamic Code

The `Resources` object consolidates resources for the current scenario. It merges resources configured in the View and App and gives View-Resources the preference. 

TODO: #TODOC - CREATE TUTORIALS FOR THIS

[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]

## Example

Let's assume you have these View-Resources in EN & DE

| Source | Property            | Value EN           | Value DE                     |
| ------ | ------------------- | ------------------ | ---------------------------- |
| View   | `ColHeadId`         | `Id`               | (not defined)                |
| View   | `ColHeadName`       | `Name`             | (not defined)                |
| View   | `ColHeadDesc`       | `Description`      | `Beschreibung`               |
| View   | `HelpLink`          | `/help`            | `/hilfe`                     |
| App    | `OrderLabel`        | `Order Now`        | `Jetzt Bestellen`            |
| App    | `OrderHint`         | `Click to Order`   | `Klick um zu Bestellen`      |
| App    | `HelpLink`          | `www.2sxc.org`     | (not defined)                |

Then you could get these values from the `Resources` object

| Object                   | Value if on an EN page       | Value if on a DE page       |
| ------------------------ | ---------------------------- | --------------------------- |
| `@Resources.ColHeadId`   | `Id` | `Id` (auto-fallback)
| `@Resources.ColHeadName` | `Name` | `Name` (auto-fallback)
| `@Resources.ColHeadDesc` | `Description` | `Beschreibung`
| `@Resources.HelpLink`    | `/help` | `/hilfe`
| `@Resources.OrderLabel`  | `Order Now` | `Jetzt Bestellen`
| `@Resources.OrderHint`   | `Click to Order` | `Klick um zu Bestellen`

> [!TIP]
> Remember that [Settings](xref:NetCode.DynamicCode.Objects.Settings) are meant for configuration 
> and [Resources](xref:NetCode.DynamicCode.Objects.Resources) should be used for multi-language output.
> You could do it differently, but that would be bad practice.

## How it Works

The `Resources` is a dynamic object. 
Internally the Settings use the new [](xref:ToSic.Sxc.Data.IDynamicStack) object to _stack_ entities like sources on each other, and take the first best match. 
As of now the two underlying sources used are:

1. **View** which contains View resources if the view has any
1. **App** which contains App resources if the App has any

The order of the sources is important, as the first match will be returned. 
The View has priority over the App. 
This setup allows Views to override App-Defaults.

## Accessing Resources from One Source

In rare cases you may want to access settings from a specific source - maybe to detect if it has been changed or because your template explicitly wants the App settings. 
For this you can use the `GetSource(name)` method like this:

* `@Resources.HelpLink` would return `/help`
* `@Resources.GetSource("View").HelpLink` would return `/help`
* `@Resources.GetSource("App").HelpLink` would return `www.2sxc.org`

---

## History

1. Previously you could use App.Resources since ca. 2sxc 6
1. Resources object Introduced in 2sxc 12.02 to consolidate View and App Resources

## Future

We plan to introduce site-level, portal level and system-level settings, would would all be accessible in this object. 