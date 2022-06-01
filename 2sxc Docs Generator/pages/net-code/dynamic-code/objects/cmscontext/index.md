---
uid: NetCode.DynamicCode.CmsContext
---

# CmsContext in Dynamic Code ✨ new!

To enable Hybrid Razor which works on Dnn and Oqtane, we need standards so that our Dynamic Code can access information about the page, module etc. Up until now our code always used the `Dnn` object which obviously doesn't on Oqtane and other platforms. 

So we're creating this new standardized object to ask for these things. 

⚡ The [official API docs](xref:ToSic.Sxc.Code.IDynamicCode.CmsContext) of the Object on the Dynamic Code

⚡ The [official API docs](xref:ToSic.Sxc.Context.ICmsContext) of the `ICmsContext` object



[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]

## CmsContext.Platform

Information about the platform the system is running on. Usually Dnn or Oqtane.

| Name | Type | Value Example | Description
| --- | --- | --- | ---
| Type | PlatformType | `PlatformType.Dnn` 
| Name | string | `Dnn` 

👉 [](xref:ToSic.Sxc.Context.ICmsPlatform)


## CmsContext.Culture

Culture information for the current request.

| Name | Type | Value Example | Description
| --- | --- | --- | ---
| DefaultCode | string | `en-us` | The default language code of the site
| CurrentCode | string | `de-ch` | Primary language code for the site

👉 [](xref:ToSic.Sxc.Context.ICmsCulture)

## CmsContext.Site

| Name | Type | Value Example | Description
| --- | --- | --- | ---
| Id | int | 2 | Site ID
| Url | string | 2sxc.org | Primary site url without protocol

👉 [](xref:ToSic.Sxc.Context.ICmsSite)

## CmsContext.Page

| Name | Type | Value Example | Description
| --- | --- | --- | ---
| Id | int | 36 | Page ID
| Parameters | `IDictionary<string, string>` | | Use as cross-platform Query params

👉 [](xref:ToSic.Sxc.Context.ICmsPage)

## CmsContext.Module

| Name | Type | Value Example | Description
| --- | --- | --- | ---
| Id | int | 5030 | Module ID

👉 [](xref:ToSic.Sxc.Context.ICmsModule)



## CmsContext.User

| Name | Type | Value Example | Description
| --- | --- | --- | ---
| Id | int | 2 | User ID
| IsSiteAdmin | bool | `true` | People who can can admin users/content
| IsSystemAdmin | bool | `true` | Super Users
| IsSiteDeveloper | bool | `true` | Usually just Super-Users

👉 [](xref:ToSic.Sxc.Context.ICmsSite)



## CmsContext.View _new in 12.02_

| Name | Type | Value Example | Description
| --- | --- | --- | ---
| Id | int | 2 | View ID
| Edition | string | `bs4` | [Polymorphism](xref:Basics.Polymorphism.Index) edition if used, otherwise empty
| Name | string | `4 Tiles` | Name of the view
| Identity | string | `BLUE` | Custom identity like name, but language invariant

👉 [](xref:ToSic.Sxc.Context.ICmsView)


## Demo App and further links

You should find some code examples in this demo App
* No demo apps exist yet

## History

1. Introduced in 2sxc 11.11
1. CmsContext.Page.Parameters added in 2sxc 12.0
1. CmsContext.View added in 2sxc 12.02 with all the new features