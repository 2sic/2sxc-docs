---
uid: ToSic.Sxc.Services.ToolbarBuilder.Ui
---

<img src="~/assets/features/toolbar.svg" class="feature">

# Toolbar Builder Guide – UI

The **UI** determines how buttons are shown. 

It is given to the commands using the `ui` parameter
which is an optional parameter and [must be named](xref:NetCode.Conventions.NamedParameters).


## UI Settings for the Entire Toolbar

UI settings can be set globally for the toolbar, or specific for each button. 

To set it globally, you have these options:

1. On the first creation of the object - eg. `Kit.Toolbar.Default(item, ui: "color=red,white")`
3. When setting global parameters eg. `Kit.Toolbar.Default().Parameters(ui: "color=red,white")`

If your code does more than one of these, the last value will be the one used. 

## UI Settings for One Specific Button

Many methods accept an optional `ui`. 
Is that case the button would have their own UI settings. 

So you could do something like this

```c#
// Normal toolbar for Content, but also has an edit-button for the header
var tlb = Kit.Toolbar.Default(Content).New(ui: "color=blue,white");
```

## UI as String or Object

There are two ways you can specify `ui`. 
Either as a string - like this:

```c#
ui: "color=red&classes=extra-glow"
```

Or as an object (since v14.04) - like this: 

```c#
ui: new { color = "red", classes = "extra-glow" }
```



---

See also the JS [toolbar docs](xref:JsCode.Toolbars.Simple)