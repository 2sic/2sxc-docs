---
uid: ToSic.Sxc.Services.ToolbarBuilder.Target
---

<img src="~/assets/features/toolbar.svg" class="feature">

# Toolbar Builder Guide – Target

The **Target** determines for what **thing** the button will affect. 
This _thing_ is usually an Entity or a DynamicEntity. 

Targets can be set...

* ...for the entire toolbar, so that all buttons would affect the same target
* ...for each button what target it will be for
* ...both - in which case button-target takes precedence if set

The target is usually the _first_ parameter on every command, and does not need to be named. 

## Entity-Like Targets

Targets for most commands are entity-like, meaning they can be an [Entity](xref:ToSic.Eav.Data.IEntity) or a [Dynamic Entity](xref:NetCode.DynamicData.DynamicEntity).

## Target for the Entire Toolbar

Targets can be set globally for the toolbar, or specific for each button. 

To set it globally, you have these options:

1. On the first creation of the object - eg. `Kit.Toolbar.Default(item)`
2. At any time using `For(...)` eg. `Kit.Toolbar.Default().For(item)`
3. When setting global parameters eg. `Kit.Toolbar.Default().Parameters(item, prefill: "Title=new item")`
4. If using `.AsTag()` you can also do `.AsTag(item)`

If your code does more than one of these, the last value will be the one used. 

## Target for One Specific Button

Many methods accept an optional `target`. 
Is that case the button would be specifically for the item in the target, 
and not for the main item of the toolbar. 

So you could do something like this

```c#
// Normal toolbar for Content, but also has an edit-button for the header
var tlb = Kit.Toolbar.Default(Content).Edit(Header, ui: "color=red");
```

> [!TIP]
> In many cases you will only set it for the toolbar, and not for the item. 
> Setting the target for the item is important if the toolbar shows buttons to operate on different objects. 