---
uid: Abyss.Releases.History.V13.IEntityLinks
---

# Fix Breaking Change _Automatic Links in IEntity_ in v13

**Keywords:** #Deprecated #IEntity #LinkConversion

2sxc v13 cleans up some historic, deprecated functionality. They were not used much, but if you have code which used this, here's how to fix any code in production. 

Specifically, features were removed which convert special `file:...` and `page:...` links on the `IEntity`:

> [!IMPORTANT]
> You are probably not affected
> 
> This only affects special code calls which _first_ get an `IEntity` and then uses the `GetBestValue` expecting the link to convert. 
>
> Almost all Razor / WebApi code uses _Dynamic Entities_ (with `AsDynamic(...)`), and these cases will continue to work as expected.

## Reason for Removal

These features were removed because they relied on objects which need Dependency Injection, and calling this object directly cannot give us DI.
These features were rarely used, and newer mechanisms are much more appropriate than that old stuff. 

## History - How it Used to Work

A long time ago we introduced the ability to store links like `file:73` or `page:42`. 
At that time, we looked up the link in APIs of the cached object (the `IEntity`). 

This turned out to be a bad idea, because the cached object doesn't have access to the current Site information, which is needed to lookup these real links. 

## What we Changed

A long time ago we already ensured that the **Dynamic Entity** will do this lookup, and not rely on the inner APIs to do this. 
So all code which uses `AsDynamic(...).SomeLinkProperty` will always work as expected. 

But in rare cases you may have been getting the `SomeLinkProperty` from the IEntity. This will now not throw an error, but simply not lookup the link any more. 

So if you end up getting links like this, you are probably affected:

```html
<a href="file:74">click here</a>
```

## Upgrade to Newer functionality

Just make sure you always access the properties using the **Dynamic Entity** - so if you had an `IEntity` before, wrap it into `AsDynamic(...)` first. 

---

Shortlink to here: https://go.2sxc.org/brc-13-ientitylink