---
uid: Custom.Oqtane
summary: *content
title: Custom.Oqtane Namespace
---

# Custom.Oqtane Namespace for Oqtane 💧

This contains all the base classes for your own solutions, which are targeted to Oqtane 💧. 

## Versioned Base Classes

All the base classes in this have a version number, so it will become easier to document differences between versions and also to give guidance how to upgrade in case of future breaking changes or security issues. 

## This is WIP for 2sxc 12

This section is still work in progress and should be released in 2sxc 12

## Note: Not everything documented

Because of technical issues we cannot auto-generate the docs for all the classes here, sorry. 

### Classes (documented manually)

#### Api12

The base class for APIs which only need to work in Oqtane. They internally inherit from [Microsoft.AspNetCore.Mvc.Controller](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.controller) and in addition to all the [DynamicCode](xref:NetCode.DynamicCode.Index) properties also have all the features of that base class. 

#### Code12

The base class for custom code. If you inherit from this class, you'll automatically have all the properties from [DynamicCode](xref:NetCode.DynamicCode.Index).

#### [Razor12](xref:Custom.Oqtane.Razor12)

The base class for custom Razor. If you inherit from this class, you'll automatically have all the properties from [DynamicCode](xref:NetCode.DynamicCode.Index).

#### [Razor12&lt;TModel&gt;](xref:Custom.Oqtane.Razor12`1)

The base class for custom Razor. If you inherit from this class, you'll automatically have all the properties from [DynamicCode](xref:NetCode.DynamicCode.Index).
