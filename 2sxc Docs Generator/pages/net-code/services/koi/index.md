---
uid: NetCode.Koi.Index
---

<img src="./assets/koi-wide-large.png" width="100%">

# Koi Library

2sxc includes Koi - a helper library to let components / modules know what CSS framework is used, and use that information to create templates which adjust to that CSS framework.

> [!TIP]
> 2sxc has [Polymorphism](xref:Basics.Polymorphism.Index).
> It lets you place different _editions_ of a Razor file in folders matching various CSS frameworks.
> This is easiest way to leverage Koi, and your code doesn't even need to know about it.

[!include["Koi Tutorials"](~/shared/tutorials/koi.md)]

## Example

The following example will automatically include Bootstrap4 from a CDN if the theme doesn't already include it.

```razor
@if(!Kit.Koi.Is("bs4")) {
  <link rel="stylesheet" 
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" 
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" 
    crossorigin="anonymous">
}
```

> [!TIP]
> For more examples, check out the tutorial or various Apps which implement Koi, like the main Content App.

## Older Example (v12)

This does the same, but assumes that `Kit` doesn't exist yes, so we must use `GetService<..>()`.

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

## Old Example with Koi v1.0 (will only work in Dnn ☢️)

```razor
@using Connect.Koi;
@if(!Koi.Is("bs4")) {
  <link rel="stylesheet" 
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" 
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" 
    crossorigin="anonymous">
}
```

## Learn to Leverage Koi

* Visit [](xref:Ext.Koi)
* Check out the [](xref:Tut.Koi.Home)
* Install the default content-templates and discover how it's used there

---

## History

1. Introduced in 2sxc v11
1. Upgrade to Koi 2.0 in 2sxc v12
1. Added to ServiceKit on `Kit.Koi` in 2sxc 14
