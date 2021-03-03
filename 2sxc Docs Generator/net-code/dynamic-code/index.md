---
uid: NetCode.DynamicCode.Index
---

# Dynamic Code API

The following APIs are available on all 2sxc **Dynamic Code** - so you can use this in:

1. Razor (including Code-Behind)
1. Web API Controllers
1. Helper Code files

> [!IMPORTANT]
> Your code must inherit the correct base class to get this API.
> You'll find the correct base classes in the documentations for Razor and Web API.

## Getting Started with Dynamic Data / Dynamic Entities

When working with 2sxc data, there are two core data objects you for everything:

1. [Dynamic Entities](xref:NetCode.DynamicCode.DynamicEntity)  
    These are simple, _dynamic_ objects that allow you to write template with any property you believe the data should have, like `@person.FirstName` etc. They will automatically pick the right language and do a lot of magic 🧙‍♂️ in the background. 
1. [Entities](xref:NetCode.DynamicCode.Entity)  
    These are strongly typed objects for complex work, but getting values is much more difficult. You usually don't need this, but it's important that you know this exists. 

Each type can be converted to the other type using helpers like `AsDynamic(...)` and `AsEntity(...)`. Youll see a lot of this in Razor templates. The full list of conversion commands is listed below. 

## Instance Specific Data Objects in Dynamic Code

> [!NOTE]
> Instance specific data _belongs_ to the module-instance on the page, either because it was manually added or because the module-instance uses a Query which is specific to this module. 

When a 2sxc module is added to a page the editor decides what should be shown. Based on configurations 2sxc will then ensure that the right data is provided to the template to match expectations. There are two scenarios:

1. In the **Content Mode** the editor will add/edit content in the module, and this content is then linked to this module instance.  
2sxc keeps track of where things are added. It then prepares this data before your code runs to make it super-easy for you to access these items. 
1. In the **Data Mode** the template has been configured to use a query. This query can be parameterized by the module instance (similar to the _Content Mode_) but the data prepared for the template is retrieved from a query. 

In both of these cases, the following objects are then pre-populated with the correct data, making it easy to use in a template or Web API:

1. [Data](xref:NetCode.DynamicCode.Data) (IDataSource)  
    This object gives you all the data which was meant to be used by this Templates
1. `Content` (a [DynamicEntity](xref:NetCode.DynamicCode.Entity))  
    The primary and often the only content-item in the [Data](xref:NetCode.DynamicCode.Data) for this template. 
1. `Content.Presentation` (a [DynamicEntity](xref:NetCode.DynamicCode.Entity))  
    Can contain additional presentation settings for this content, like how to format it. 
1. `Header` (a [DynamicEntity](xref:NetCode.DynamicCode.Entity))  
    The header data if the template expects to be a list and also needs a title or intro.
1. `Header.Presentation` (a [DynamicEntity](xref:NetCode.DynamicCode.Entity))  
    Can contain additional presentation settings for the header, like how to format it. 

## General App Data Objects

1. [App](xref:NetCode.DynamicCode.App)  
    The current App with `Settings`, `Resources`, `Path` information and more.
1. [App.Data](xref:NetCode.DynamicCode.App#using-app-data-appdata)  
    All the data of the current app for immediate use, fully cached in memory of the web server.
1. [App.Query](xref:NetCode.DynamicCode.App##using-app-queries-appquery)  
    Queries which were created using **Visual Query** and can be run to access prepared data.

## General Objects

1. [Dnn](xref:NetCode.DynamicCode.Dnn)  
    The common Dnn object providing page, module, user information
1. [Edit](xref:NetCode.Razor.Edit)  
    Helper providing you with various edit-functionality like `Toolbar(...)`
1. [Link](xref:NetCode.DynamicCode.Link)  
    Helper to generate links, according to the DNN-environment configuration



## Conversion Commands

1. AsAdam(...)
1. AsDynamic(...) - takes just about anything (an iEntity, a list of iEntities, a dynamic, ...) and casts it to a [DynamicEntity](xref:NetCode.DynamicCode.Entity)
1. AsEntity(...) - takes just about anything (iEntity, DynamicEntity, list of that) and casts it to an [iEntity](xref:NetCode.DynamicCode.Entity)


## Helper Commands provided by 2sxc

* CreateInstance(...) - to create an object of a parsed CSHTML file, for example to then access methods of that code
* CreateSource\<T\>(...) (IDataSource) - more modern, generic, type-proof syntax for create-source


## Other Helpers

TODO

* CreateInstance
* Html.Raw
* etc.