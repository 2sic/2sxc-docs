---
uid: Abyss.Releases.History.V13.StaticRender
---

# Fix Breaking Change _Static Render_ in v13

**Keywords:** #Deprecated #Render #Static #DependencyInjection

2sxc v13 cleans up some historic, deprecated functionality. They were not used much, but if you have code which used this, here's how to fix any code in production. 

These two commands for rendering Inner Content are being deprecated and will be removed in v14. In v13 it was moved to the Dnn DLL because it shoudn't be used anywhere else. 

* `ToSic.SexyContent.ContentBlocks.One(...)`
* `ToSic.SexyContent.ContentBlocks.All(...)`
* `ToSic.Sxc.Blocks.Render.One(...)`
* `ToSic.Sxc.Blocks.Render.All(...)`

## Reason for Removal

2sxc used to not have Dependency Injection so there were some static APIs which we provided. 
But this is bad practice and causes a lot of difficulty to keep everything working. 
The newer APIs use Services and Dependency Injection and do what they should. 

## History - How it Used to Work

Previously you could write code like this in your Razor:

```csharp
@using ToSic.Sxc.Blocks;
// some code
@Render.All(someEntity, field: "AnswerInnerContent", merge: someEntity.Answer)
```

## What we Changed

In 2sxc 11.11 we introduced the `GetService<T>()` ([docs](xref:ToSic.Sxc.Code.IDynamicCode.GetService*)) which provides proper DI.
We also introduced a `ToSic.Sxc.Services.IRenderService` which should replace these commands - see [docs](xref:ToSic.Sxc.Services.IRenderService).
Please use this from now on.

The old API will continue to work for a while but show errors in the insight. 


## Upgrade to Newer functionality

So the previous example would look like this:

```csharp
@using ToSic.Sxc.Services;
// some code
var renderSvc = GetService<IRenderService>();
@renderSvc.All(someEntity, field: "AnswerInnerContent", merge: someEntity.Answer)
```

---

## History

* Introduced `ToSic.SexyContent.ContentBlocks` ca. 2sxc 5
* Introduced better name but still non-DI implementation called `ToSic.Sxc.ContentBlocks` ca. 2sxc 7
* New `IRenderService` introduced in 2sxc 11 and 12
* Deprecated in 2sxc 13
* Planned for full removal in 2sxc 14 ca. middle of 2022

---

Shortlink to here: https://go.2sxc.org/brc-13-static-render