---
uid: Custom.Hybrid
summary: *content
title: Custom.Hybrid Namespace
---

# Custom.Hybrid Namespace Dnn ☢ & Oqtane 💧

This contains all the base classes for your own solutions, which will work across platforms (DNN ☢, Oqtane 💧, NopCommerce 🔵 etc.)

Basically it's the CMS parts, without being  specific to DNN implementations. 

## Versioned Base Classes

All the base classes in this have a version number, so it will become easier to document differences between versions and also to give guidance how to upgrade in case of future breaking changes or security issues. 

## This is WIP for 2sxc 12

This section is still work in progress and should be released in 2sxc 12


### Classes

#### [Api12](xref:Custom.Hybrid.Api12)

The base class for hybrid APIs. They internally inherit either from from [DnnApiController](https://dnndocs.com/api/DotNetNuke.Web.Api.DnnApiController.html) or from [Microsoft.AspNetCore.Mvc.Controller](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.controller) and in addition to all the [DynamicCode](xref:NetCode.DynamicCode.Index) properties also have all the features of that base class - but you should be careful using base-class properties, as they will probably not be hybrid any more. 

#### [Code12](xref:Custom.Hybrid.Code12)

The base class for custom hybrid code. If you inherit from this class, you'll automatically have all the properties from [DynamicCode](xref:NetCode.DynamicCode.Index).

#### [Razor12](xref:Custom.Hybrid.Razor12)

The base class for custom Razor. If you inherit from this class, you'll automatically have all the properties from [DynamicCode](xref:NetCode.DynamicCode.Index).