---
uid: ToSic.Sxc.Services.ToolbarBuilder.TweakButtons
---

<img src="~/assets/features/toolbar.svg" class="feature">

# Toolbar Builder Guide – Tweak API for Buttons _new 15.07_

Buttons can be tweaked to change their look and behavior.

Previously, this was done using parameters such as `ui`, `parameters`, `prefill` etc.
Now, you can use the `tweak` API to do the same thing.

> [!TIP]
> Using the `tweak` API is the recommended way to tweak buttons.
> It gives you compile time checking so it's less error-prone.

## Example

```c#
// Old way without tweak
Kit.Toolbar.Default().Add(ui: "color=green", parameters: new { app = 2, zone = 3 });

// New way with tweak - one example
Kit.Toolbar.Default().Add(tweak: b => b.Color("green").Parameters(new { app = 2, zone = 3 }));
// Or another example
Kit.Toolbar.Default().Add(tweak: b => b.Color("green").Parameters("app", 2).Parameters("zone", 3));
```

## How it Works

Almost every command on the [IToolbarBuilder](xref:ToSic.Sxc.Edit.Toolbar.IToolbarBuilder) has a `tweak` parameter.
This parameter is a function which takes a [ITweakButton](xref:ToSic.Sxc.Edit.Toolbar.ITweakButton) and returns a new one.
The `ITweakButton` itself has a [functional API](xref:NetCode.Conventions.Functional) which allows you to chain multiple tweaks.

This means when you do this:

```c#
Kit.Toolbar.Default().Add(tweak: b => b.Color("green").Parameters("id", 93030)));
```

...it says

1. Take the button `b`
1. Set the color to green
1. Add the parameter `id` with the value `93030`

Each command returns a fresh `ITweakButton` with the changes applied using the [immutable](xref:NetCode.Conventions.Immutable) pattern.
So the final result is returned by the function and used by the toolbar builder.

## Why a New API?

The new method achieves the same purpose as the old, and the old way will continue to work indefinitely.

But the advantages of the new API are:

1. It's easier to document so it's also easier to discover the possibilities you have
1. It's easier to use because it's more type-safe and less error-prone
1. It's easier to extend - for example with the new `note` feature added in v15.07
1. It's safer, for example the API will remove `#` characters in colors, which would otherwise cause problems

## API Docs

* [Tweak API](xref:ToSic.Sxc.Edit.Toolbar.ITweakButton)
* See also the JS [toolbar docs](xref:JsCode.Toolbars.Simple)

## Important to Know

* You cannot mix the tweak API with the previous parameters.  
  So if you use tweak on a button, you cannot also use `ui` or `parameters` etc.
* The tweak API is a fluid API, so you can chain multiple tweaks together.
* The tweak API is [immutable](xref:NetCode.Conventions.Immutable), so every step returns a new object.
* The tweak API is [functional](xref:NetCode.Conventions.Functional).

---

History

1. Added in v15.07

ShortLink: <https://r.2sxc.org/tweak-buttons>
