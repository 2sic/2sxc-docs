---
uid: NetCode.Koi.Index
---

<img src="./assets/koi-wide-large.png" width="100%">

# Koi Library

2sxc includes Koi - a helper library to let components / modules know what CSS framework is used, and use that information to create templates which adjust to that CSS framework. 

> [!TIP]
> 2sxc 11 introduced [Polymorphism](xref:Basics.Polymorphism.Index) which lets you place different _editions_ of a Razor file in folders matching various CSS frameworks. This is easiest way to leverage Koi, and your code doesn't even need to know about it. 

[!include["Koi Tutorials"](~/shared/tutorials/koi.md)]

## New Example (requires 2sxc v12)

2sxc v12 includes Koi 2.0 which uses [Dependency Injection](xref:NetCode.DependencyInjection.Index). Using this it also works in Oqtane. 

The following example will automatically include Bootstrap4 from a CDN if the theme doesn't already include it.

```razor
@{
  var pageCss = GetService<Connect.Koi.ICss>();
}
@if(!pageCss.Is("bs4")) {
  <link rel="stylesheet" 
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" 
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" 
    crossorigin="anonymous">
}
```


## Old Example (will only work in Dnn ☢️)

The following example will automatically include Bootstrap4 from a CDN if the theme doesn't already include it.

```razor
@using Connect.Koi;
@if(!Koi.Is("bs4")) {
  <link rel="stylesheet" 
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" 
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" 
    crossorigin="anonymous">
}
```

## Learn to Leverage RazorBlade

* Visit [](xref:Ext.Koi)
* Check out the [](xref:Tut.Koi.Home)
* Install the default content-templates and discover how it's used there