---
uid: NetCode.DynamicCode.Objects.Link.Base
---

# Link.Base() / @Link.Base() Method in Dynamic Code

If you have a SPA on your page you will often need to set the proper base tag. To get it, use `Link.Base()`. 

[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]


## Use @Link.Base() for JavaScript SPA modules

`Link.Base()` ensures that the url can be used for SPAs, as some pages will otherwise provide a wrong link (like home) which then breaks the SPA.

```razor
<base href="@Link.Base()">
```

## Demo App and further links

You should find some code examples in this demo App
* [Blog App](xref:App.Blog)

## History

2. Link was Enhanced in 2sxc 9.5.1 with Base()
