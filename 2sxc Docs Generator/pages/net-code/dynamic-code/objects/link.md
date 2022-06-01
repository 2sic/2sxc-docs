---
uid: NetCode.DynamicCode.Objects.Link
---

# Link / @Link Object in Dynamic Code

Basically you can always link around to other pages, websites or views using normal `<a href="...">text</a>` html. And often you just want to add some parameters to the current Url like `?id=27` - but the behavior of this can be very different depending on the Dnn settings. The `Link` object helps you handle this. 

_Note:_ Dnn often has a problem with links, because depending on what page you are on, the bbehavior is a bit different. This is especially important on the home page. Use `@Link.To(...)` to make sure everything works no matter what. 


[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]


## How it works

The `Link`-object is always available in all Razor-templates. Internally it uses the Dnn API to get the correct url. 


## Use @Link.To() for Linking Pages, Parameters and APIs

👉 See [](xref:NetCode.DynamicCode.Objects.Link.To)


## Use @Link.Image(...) for Images with Resizing and more 🆕

👉 See [](xref:NetCode.DynamicCode.Objects.Link.Image)


## Use @Link.Base() for JavaScript SPA modules

If you have a SPA on your page you will often need to set the proper base tag. To get it, use `Link.Base()`. 

👉 See [](xref:NetCode.DynamicCode.Objects.Link.Base)


## Debugging Link Internal operations

In rare cases you may get a link you don't expect. To help you figure out what happens, you can do this:

```
Link.SetDebug(true);
var x = Link.Image("my.jpg", Settings.Images.Content, factor: 0.5);
Link.SetDebug(false);
```

This will add a lot more debug information in the Insights, so you should be able to figure out what happened. 



## Notes and Clarifications

The Link-Object is of type [](xref:ToSic.Sxc.Services.ILinkService).


## Demo App and further links

You should find some code examples in this demo App
* [Blog App](xref:App.Blog)

## History

1. Introduced in 2sxc 8.4
1. Enhanced in 2sxc 9.5.1 with Base() and with parameter `pageId` on Link.To
1. Link.To was enhanced with `api` in v12.02
1. Link.Image was created in v12.04