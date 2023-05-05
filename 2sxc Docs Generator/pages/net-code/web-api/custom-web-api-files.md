---
uid: NetCode.WebApi.Files
---

# Custom C# Web API File Structure

## Default Setup without Editions

All your WebAPIs are C# files saved in the special folder called `api`. The folder must be in root of your 2sxc app, and the files have to end with `...Controller.cs` (this is a convention in ASP.net).

* File: `[app-folder]/api/[Your]Controller.cs`
* Url: `[api-root]/app/auto/api/[Your]`

**Example**

* File: `/Portals/0/2sxc/DemoApp/api/PersonController.cs`
* Url: `GET`: `/api/2sxc/auto/app/auto/api/Person/List`


Read more about url schema in the [](xref:WebApi.Specs.UrlSchema)

## Advanced Setup with Editions

> [!TIP]
> New in 2sxc 9.35+_: you can now also create `api` folders as_subfolders_ to run the api in multiple editions.
> This is the [polymorph feature](xref:Basics.Polymorphism.Index).
> It let's you have the **same** api-controller in multiple editions, where the end-user is using `live` and you're doing open-heart-surgery in the background on a new edition like `staging`.

* File: `[app-folder]/[edition]/api/YourController.cs`
* Url: `[api-root]/app/auto/[edition]/api/[Your]`

**Example**

* File: `/Portals/0/2sxc/DemoApp/staging/api/PersonController.cs`
* Url: `GET`: `/api/2sxc/auto/app/auto/staging/api/Person/List`

Read more about url schema in the [](xref:WebApi.Specs.UrlSchema)



## Recommended Reading

* [](xref:Tut.WebApi)
* [WebApi](xref:WebApi.Index)
* [Concepts: Polymorphisms](xref:Basics.Polymorphism.Index)




## History

1. Introduced in 2sxc 06.05
1. Enhanced with Polymorph Editions in 2sxc 9.35 (allowing subfolder/api)

