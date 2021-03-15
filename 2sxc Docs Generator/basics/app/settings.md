---
uid: Basics.App.Settings
---

# App Settings

Every App has a **Settings** Entity. The fields available can be anything your App needs, so there is no pre-defined set of fields. 

## Why would you use this?

Imagine a Gallery App where each instance (Module) has settings like animation speed. You would place the default values in the **App Settings** so that by default all instances would behave the same, and you can still change this in one central location. 

## Example from the Content App

In newer versions, the Content-App has some App-Settings to store

* Google-Maps API keys
* Bootstrap versions (CSS Framework) to load if the Theme doesn't have Bootstrap activated

## Difference App Configuration / App Settings

The [](xref:Basics.App.Configuration) is a system Entity and 2sxc needs it for the App to work properly. 

The [](xref:Basics.App.Settings) can contain any information you configure it to have, and the values are only used in the App itself. 

## Use in C# Code (Razor / WebAPI)

In code you can access it on the `App.Settings` [Dynamic Entity](xref:NetCode.DynamicData.DynamicEntity), like `App.Settings.AnimationSpeed`. Check out the [App API docs](xref:NetCode.DynamicCode.App)

## Use in Tokens Templates

Tokens templates are much more limited, but you can access these values using `[App:Settings:...]` - for example `[App:Settings:AnimationSpeed]`

## Use in Visual Query

You can also access these properties in [VisualQuery](xref:Basics.Query.VisualQuery.Index), also using tokens like `[App:Settings:DefaultCategory]`

## Using Settings in Multi-Language Scenarios

Settings are normal Entities, and as such can be multi-language. We strongly recommend to limit the use of multi-language settings, as it can often lead to unexpected results. 

## Don't Use Settings for Labels

Remember to use [](xref:Basics.App.Resources) for button-labels, titles etc. and not Settings, as this would confuse the users. 