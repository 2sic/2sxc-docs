---
uid: NetCode.TypedCode.CompareApis.HelpersServices
---

# Built-In Helpers and Services Differences in APIs

2sxc has changed a lot over time.
So you'll find old code snippets and new ones, and it helps to see which one is being used.
Sometimes you'll also want to convert old code to new code, and this page should help you with that.

> [!TIP]
> This is about **Helpers** and **Services** which are automatically available on each Razor / C# file.
>
> So **Kit**, **Edit** (old), **GetService()** etc.

## Built-In Helpers and Services

2sxc provides a lot of built-in helpers and services which are automatically available in each Razor / C# file.
With time, they changed, so inheriting from a different base class provides different objects to do things out-of-the-box.


| Helper Object | Dynamic | Typed / Strong Typed
| --- | --- | --- | ---
| **Service Kit** | - | `Kit`
| **Link Helper** | `Link` | `Link`
| **Toolbar Maker** | `Edit.Toolbar` | `Kit.Toolbar`
| **Edit Helper** | `Edit` | `Kit.Edit` (avoid using)
| **Context Info** | `Context` | `MyContext`
| **Page Info** | `Context.Page` | `MyPage`
| **Page Url Params** | `Context.Page.Parameters` | `MyPage.Parameters`
| **User Info** | `Context.User` | `MyUser`
| **View Info** | `Context.View` | `MyView`
| **Culture Info** | `Context.Culture` | `MyContext.Culture`
| **Module Info** | `Context.Module` | `MyContext.Module`
| **Platform Info** | `Context.Platform` | `MyContext.Platform`
| **Site Info** | `Context.Site` | `MyContext.Site`

## Build-In Commands

The following commands are often on the object itself, but sometimes it's also under a helper object.
So the list has more than just commands.


| Helper Methods | Dynamic | Typed / Strong Typed
| --- | --- | --- | ---
| **Get Service** | `GetService<TService>("2sxc")` | `GetService<TService>()`
| **Convert to Entity** | `AsEntity(dyn)` | `AsEntity(itm)`
| **Convert Entity** | `AsDynamic(thing)` | `AsItem(thing)`
| **Convert Entities** | `AsDynamic(dynList)` | `AsItems(itmList)`
| **Convert as Dynamic** | `AsDynamic(thing)` | n/a
| **Convert as ITypedItem** | n/a | `AsItem(thing)`
| **Convert as Enum<ITy...>** | n/a | `AsItems(itmList)`
| **Convert as ITyped** | n/a | `AsTyped(thing)`
| **Convert as Enum<ITyped>** | n/a | `AsTypedList(things)`
| **Merge Many** | `AsDynamic(dyn1, dyn2, ...)` | `AsStack(itm1, itm2, ...)`





## TOOLBARS

| Dynamic | Typed | Comments / Differences
| --- | --- | ---
| `Edit` | `Kit.Edit` | global `Edit` object is gone
| `Edit.TagToolbar(...)` | `Kit.Toolbar.Default(...)` <br> `Kit.Toolbar.Empty(...).` | global `Edit` object is gone
| `Edit.Toolbar(...)` | `Kit.Toolbar.Default(...)...AsTag()` <br> `Kit.Toolbar.Empty(...)...AsTag()` | global `Edit` object is gone


More TODO: