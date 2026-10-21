---
uid: Custom.Hybrid
summary: Recommended Base Classes for all your Razor and C# files which work on Dnn ☢️ & Oqtane 🩸.
title: Custom.Hybrid Namespace Dnn ☢️ & Oqtane 🩸
---

This contains all the _hybrid_ base classes for your own solutions.
They are meant to work across platforms (Dnn ☢️, Oqtane 🩸, NopCommerce 🔵 etc.)

## Versioned Base Classes

All the base classes in this have a version number, so it will become easier to document differences between versions and also to give guidance how to upgrade in case of future breaking changes or security issues.


### Classes

#### [ApiTyped](xref:Custom.Hybrid.ApiTyped)

The base class for hybrid APIs. They internally inherit either from from [DnnApiController](https://dnndocs.com/api/DotNetNuke.Web.Api.DnnApiController.html) or from [Microsoft.AspNetCore.Mvc.Controller](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.controller) and in addition to all the [DynamicCode](xref:NetCode.DynamicCode.Index) properties also have all the features of that base class - but you should be careful using base-class properties, as they will probably not be hybrid any more.

#### [CodeTyped](xref:Custom.Hybrid.CodeTyped)

The base class for custom hybrid code. If you inherit from this class, you'll automatically have all the properties from [DynamicCode](xref:NetCode.DynamicCode.Index).

#### [RazorTyped](xref:Custom.Hybrid.RazorTyped)

The base class for custom Razor. If you inherit from this class, you'll automatically have all the properties from [DynamicCode](xref:NetCode.DynamicCode.Index).
