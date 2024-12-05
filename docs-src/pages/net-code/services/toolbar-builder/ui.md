---
uid: ToSic.Sxc.Services.ToolbarBuilder.Ui
---

<img src="~/assets/features/toolbar.svg" class="feature">

# Toolbar Builder Guide – UI

> [!IMPORTANT]
> The examples below explain how to use the `ui:` parameter.
> Starting in v15.07+ we recommend using the [Tweak API](xref:ToSic.Sxc.Services.ToolbarBuilder.TweakButtons) instead.

The **UI** determines how buttons are shown.

It is given to the commands using the `ui` parameter
which is an optional parameter and [must be named](xref:NetCode.Conventions.NamedParameters).

## UI Settings for the Entire Toolbar

UI settings can be set globally for the toolbar, or specific for each button.

To set it globally, you have these options:

1. On the first creation of the object - eg. `Kit.Toolbar.Default(item, ui: "color=red,white")`
1. When setting global parameters eg. `Kit.Toolbar.Default().Parameters(ui: "color=red,white")`

If your code does more than one of these, the last value will be the one used.

## UI Settings for One Specific Button

Many methods accept an optional `ui`.
Is that case the button would have their own UI settings.

So you could do something like this

```c#
// Normal toolbar for Content, but also has an edit-button for the header
var tlb = Kit.Toolbar.Default(Content).New(ui: "color=blue,white");
```

## UI as String, Object or Combinations Thereof

There are two ways you can specify `ui`.
Either as a string - like this:

```c#
ui: "color=red&classes=extra-glow"
```

Or as an object (since v14.04) - like this:

```c#
ui: new { color = "red", classes = "extra-glow" }
```

Or as a combination of strings and objects (v14.07.05+):

```c#
ui: new object[] { "color=red", new { classes = "extra-glow" } }
```

## Complex Strings will be Made Safe with Base64 (v14.07.05+)

> [!TIP]
> This feature is mainly used for the `icon` property, which could contain an SVG string.

If you use an object which has complex string (which wouldn't survive a URL) then it will be made safe.
So you can do this:

```c#
  // https://fonts.google.com/icons?icon.query=sticky+note
  var iconNote = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"48\" width=\"48\"><path d=\"M9 39h20V29h10V9H9v30Zm0 3q-1.25 0-2.125-.875T6 39V9q0-1.25.875-2.125T9 6h30q1.25 0 2.125.875T42 9v21L30 42Zm6-15v-3h8.5v3Zm0-8v-3h18v3ZM9 39V9v30Z\"/></svg>";
  var tlb = Kit.Toolbar.Default().Edit(ui: new { Icon = iconNote })
```

Note that this auto-conversion only happens on **objects** handed to the `ui` property and not to **strings**.


---

See also

* the JS [toolbar docs](xref:JsCode.Toolbars.Simple)
* list of all [common UI parameters can be found here](xref:Basics.Browser.EditUx.Toolbars.ButtonUi)
