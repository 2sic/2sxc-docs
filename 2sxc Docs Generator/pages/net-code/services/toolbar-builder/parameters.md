---
uid: ToSic.Sxc.Services.ToolbarBuilder.Parameters
---

<img src="~/assets/features/toolbar.svg" class="feature">

# Toolbar Builder Guide – Parameters

> [!IMPORTANT]
> The examples below explain how to use the `parameters:` parameter.
> Starting in v15.07+ we recommend using the [Tweak API](xref:ToSic.Sxc.Services.ToolbarBuilder.TweakButtons) instead.

The **Parameters** are used in the command.

Parameters can be specified globally for the entire toolbar, or just for a specific button.

The `parameters` is an optional parameter and [must be named](xref:NetCode.Conventions.NamedParameters).


## Parameters for the Entire Toolbar

Parameters can be set globally for the toolbar, or specific for each button.

To set it globally, you have these options:

1. On the first creation of the object - eg. `Kit.Toolbar.Default(item, parameters: "contentType=BlogPost")`
3. When setting global parameters eg. `Kit.Toolbar.Default().Parameters(prefill: "contentType=BlogPost")`

If your code does more than one of these, the last value will be the one used.

## Parameters for One Specific Button

Many methods accept an optional `parameters`.
Is that case the button would have their own parameters.

So you could do something like this

```c#
// Normal toolbar for Content, but also has an edit-button for the header
var tlb = Kit.Toolbar.Default(Content).New(parameters: "contentType=BlogPost");
```

## Parameters as String or Object

There are two ways you can specify `parameters`.
Either as a string - like this:

```c#
parameters: "contentType=BlogPost&something=other"
```

Or as an object (since v14.04) - like this:

```c#
parameters: new { contentType = "BlogPost", something = "other" }
```

## How Prefill works with Parameters

Internally two infos [prefill](xref:ToSic.Sxc.Services.ToolbarBuilder.Prefill)
and [parameters](xref:ToSic.Sxc.Services.ToolbarBuilder.Parameters) are merged.

So technically you could also set prefill on the parameters, but we believe it's easier to read if each is set explicitly.

---

See also the JS [toolbar docs](xref:JsCode.Toolbars.Simple)
