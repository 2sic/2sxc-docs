---
uid: ToSic.Sxc.Services.ToolbarBuilder.Prefill
---

<img src="~/assets/features/toolbar.svg" class="feature">

# Toolbar Builder Guide – Prefill

> [!IMPORTANT]
> The examples below explain how to use the `prefill:` parameter.
> Starting in v15.07+ we recommend using the [Tweak API](xref:ToSic.Sxc.Services.ToolbarBuilder.TweakButtons) instead.


The **Prefill** is used to prefill fields in the edit-UI.

Prefill can be specified globally for the entire toolbar, or just for a specific button.

It is given to the commands using the `prefill` parameter
which is an optional parameter and [must be named](xref:NetCode.Conventions.NamedParameters).

## Prefill for the Entire Toolbar

Prefills can be set globally for the toolbar, or specific for each button.

To set it globally, you have these options:

1. On the first creation of the object - eg. `Kit.Toolbar.Default(item, prefill: "Title=new item")`
3. When setting global parameters eg. `Kit.Toolbar.Default().Parameters(prefill: "Title=new item")`

If your code does more than one of these, the last value will be the one used.

## Prefill for One Specific Button

Many methods accept an optional `prefill`.
Is that case the button would have their own prefill.

So you could do something like this

```c#
// Normal toolbar for Content, but also has an edit-button for the header
var tlb = Kit.Toolbar.Default(Content).New(prefill: "Title=Special New Title");
```

## Prefill as String or Object

There are two ways you can specify `prefill`.
Either as a string - like this:

```c#
prefill: "Title=New Title&PublishDate=2022-07-04"
```

Or as an object (since v14.04) - like this:

```c#
prefill: new { Title = "New Title", PublishDate = Date.ToString("yyyy-MM-dd") }
```

## How Prefill works with Parameters

Internally two infos [prefill](xref:ToSic.Sxc.Services.ToolbarBuilder.Prefill)
and [parameters](xref:ToSic.Sxc.Services.ToolbarBuilder.Parameters) are merged.

So technically you could also set prefill on the parameters, but we believe it's easier to read if each is set explicitly.

---

See also the JS [toolbar docs](xref:JsCode.Toolbars.Simple)
