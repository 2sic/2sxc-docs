---
uid: NetCode.Conventions.NamedParameters
---
# Convention: Named Parameters

When working with the C# / Razor API, _advanced/optional parameters_ must be **named**.

> [!TIP]
> A named parameter is determined by it's name (eg `settings:`),  
> like `SomeMethod(settings: someValue)`  
> vs. a positional parameter which is specified by the position in the list of arguments,  
> like `SomeMethod(someValue)`.

## Example

```razor
@inherits Custom.Hybrid.RazorTyped

@* this is a command without named parameters - all works *@
@MyItem.Picture("Packshot")

@* this is a command with named parameters for more advanced settings *@
@MyItem.Picture("Packshot", settings: "Lightbox")

@* this is a command with named parameters for exact width control *@
@MyItem.Picture("Packshot", width: 500)

@* An example using both parameters in any order *@
@MyItem.Picture("Packshot", settings: "Lightbox", width: 500)
@MyItem.Picture("Packshot", width: 500, settings: "Lightbox")
```

The previous example shows

1. A Razor inheriting from `Custom.Hybrid.RazorTyped` to enable the new `MyItem.Picture(...)` API
1. A add-picture with only the basic parameter. This doesn't need the name as the position (first parameter) makes it clear that `Packshot` is the field containing the picture
1. A more advanced use case where the picture uses `settings: "Lightbox"` (this must be named with `settings: ...`)
1. Another use case where the picture uses `width: 500` (named with `width: ...`)
1. Two more examples specifying multiple parameters - showing that the order is not important since we have the names

As you can see in the `settings:` and `width:` example, both of these parameters are on the second position.
If they were not named, the API wouldn't know if `500` or `Lightbox` was a width, setting or anything else.

## Example using Toolbars

This means that a command like this is valid

```html
<!-- valid -->
<div @Edit.TagToolbar(actions: "new", contentType: "BlogPost")>
  ...
</div>

<!-- not valid -->
<div @Edit.TagToolbar("new", "BlogPost")>
  ...
</div>
```

## Reason Behind Named Parameters

We often have APIs which start simple - like `@Edit.TagToolbar()` and continue to receive new features. At first, the parameter order will make sense - for that simple use case. But as the API grows, the parameter-order will become strange, simply because we would have to order them in the sequence they were added (to keep compatibility) and not in the order that makes sense.

By using named parameters, we're making sure that the parameter order never matters and the API stays stable/compatible for the future.


## Not all Parameters Require Names

Because of historic reasons and because some APIs simply have a very obvious first or second parameter, it may be that the first 1-2 parameters are not named. An example is `@Edit.TagToolbar(Content)` which assumes that the first parameter without name is the item (entity) for which this toolbar is meant.


## How It's Implemented

Internally the real signature of the command uses a parameter which has a fairly random value. The call then checks if the value of that parameter is this random value, and if not, shows an error. This is to protect you from accidentally using the command without naming the parameters.

_Note: you could of course work around this, by providing that random value and trick the call to accept unnamed parameters. Don't do this - as we will no guarantee that the API signature (parameter order) will stay the same._

## History

1. Introduced ca. in 2sxc 6

Shortlink: https://go.2sxc.org/named-params