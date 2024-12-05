---
uid: ToSic.Sxc.Services.ToolbarBuilder.Index
---

<img src="~/assets/features/toolbar.svg" class="feature">

# Toolbar Builder Guide

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

It also means that each object is [immutable](xref:NetCode.Conventions.Immutable). To understand this, check out this example:

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
