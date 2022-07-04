---
uid: ToSic.Sxc.Services.IToolbarService
---

<img src="~/assets/features/toolbar.svg" class="feature">

You will typically do something like this:

```razor
var customTlb = Kit.Toolbar.Empty().Edit(Content);
<div @customTlb>
</div>
```

The all the main commands such as `Empty(...)`, `Default(...)`, `Metadata(...)`
will give you a [IToolbarBuilder](xref:ToSic.Sxc.Edit.Toolbar.IToolbarBuilder).
With this, you can then chain additional commands to create the desired configuration. 
