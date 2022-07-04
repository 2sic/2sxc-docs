---
uid: ToSic.Sxc.Services.ToolbarBuilder
---

<img src="~/assets/features/toolbar.svg" class="feature">

# ToolbarBuilder Guide

These docs should help with various aspects of the Toolbar Builder.

## Basics

Just for context: usually you will use the [IToolbarService](xref:ToSic.Sxc.Services.IToolbarService)
to get a [IToolbarBuilder](xref:ToSic.Sxc.Edit.Toolbar.IToolbarBuilder).

You will typically do something like this:

```razor
var customTlb = Kit.Toolbar.Empty().Edit(Content);
<div @customTlb>
</div>
```

Almost all commands will return a new toolbar builder with the modified configuration.
This means you can chain the commands as you need them. 

It also means that each object is _immutable_. To understand this, check out this example:

```razor
@{
var tlbGeneral = Kit.Toolbar.Empty().Edit(Content);
// Create another toolbar which builds upon the original
// This will not modify the first tlbGeneral object
var tlbItem = tlbGeneral.MoveUp().MoveDown();
}

@foreach(var post in App.Data["BlogPosts"]) {
  <!-- this will show the toolbar, but never change the inner configuration -->
  <li @tlbItem.For(post)>
    ...
  </li>
}
```

## Target

The **Target** determines for what **thing** the button will affect. 
This _thing_ is usually an Entity or a DynamicEntity. 

Targets can be set for the entire toolbar, so that all buttons would affec the same target.
Or you can tell each button what target it will be for. 


### Target for the Entire Toolbar

Targets can be set globally for the toolbar, or specific for each button. 

To set it globally, you have 3 options:

1. On the first creation of the object - eg. `Kit.Toolbar.Default(item)`
2. At any time using `For(...)` eg. `Kit.Toolbar.Default().For(item)`
3. When setting global parameters eg. `Kit.Toolbar.Default().Parameters(item, prefill: "Title=new item")`

If your code ends up combining these variations, the last target set will be the one used. 

### Target for One Specific Button

Many methods accept an optional target. 
Is that case the button would be specifically for the item in the target, 
and not for the main item of the toolbar. 

So you could do something like this

```
// Normal toolbar for Content, but also has an edit-button for the header
var tlb = Kit.Toolbar.Default(Content).Edit(Header, ui: "color=red");
```



### UI Settings

Almost 