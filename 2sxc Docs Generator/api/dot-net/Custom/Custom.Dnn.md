---
uid: Custom.Dnn
summary: Namespace for base classes of custom code, razor and WebApis in DNN
# title: Custom.Dnn Namespace
---

# Custom.Dnn Namespace for Dnn ☢️

This contains all the base classes for your own solutions, which are targeted to Dnn ☢️. 

## Versioned Base Classes

All the base classes in this have a version number, so it will become easier to document differences between versions and also to give guidance how to upgrade in case of future breaking changes or security issues. 

## Previous Base Classes

Previously other base classes were recommended. They will continue to work, but we'll only enhance the features on these base classes. To see previous base classes, check out

* #todoc


### Classes

#### [Api12](xref:Custom.Dnn.Api12)

The base class for APIs which only need to work in Dnn. They internally inherit from [DnnApiController](https://dnndocs.com/api/DotNetNuke.Web.Api.DnnApiController.html) which inherits from `ApiController` [System.Web.Http.ApiController](https://docs.microsoft.com/en-us/dotnet/api/system.web.http.apicontroller) and in addition to all the [DynamicCode](xref:NetCode.DynamicCode.Index) properties also have all the features of that base class. 

#### [Code12](xref:Custom.Dnn.Code12)

The base class for custom code. If you inherit from this class, you'll automatically have all the properties from [DynamicCode](xref:NetCode.DynamicCode.Index).

#### [Razor12](xref:Custom.Dnn.Razor12)

The base class for custom Razor. If you inherit from this class, you'll automatically have all the properties from [DynamicCode](xref:NetCode.DynamicCode.Index).
