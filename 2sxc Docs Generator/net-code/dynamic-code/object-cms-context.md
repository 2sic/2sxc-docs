---
uid: NetCode.DynamicCode.CmsContext
---

# CmsContext in Dynamic Code _WIP in 11.11_

As we're getting ready for Oqtane, we need standards so that our Dynamic Code can access information about the page, module etc. Up until now our code always used the `Dnn` object which obviously won't exist on Oqtane. 

So we're creating this new standardized object to ask for these things. 

⚡ The [official API docs](xref:ToSic.Sxc.Code.IDynamicCode.CmsContext) of the Object on the Dynamic Code

⚡ The [official API docs](xref:ToSic.Sxc.Context.ICmsContext) of the `ICmsContext` object



[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]

## CmsContext.Platform

| Name | Type | Value Example | Description
| --- | --- | --- | ---
| Type | PlatformType | `PlatformType.Dnn` 
| Name | string | `Dnn` 

## CmsContext.Module

| Name | Type | Value Example | Description
| --- | --- | --- | ---
| Id | int | 5030 | Module ID

👉 [](xref:ToSic.Sxc.Context.ICmsModule)

## CmsContext.Page

| Name | Type | Value Example | Description
| --- | --- | --- | ---
| Id | int | 36 | Page ID
| Parameters | `IDictionary<string, string>` | | Use as cross-platform Query params

👉 [](xref:ToSic.Sxc.Context.ICmsPage)

## CmsContext.Site

| Name | Type | Value Example | Description
| --- | --- | --- | ---
| Id | int | 2 | Site ID

👉 [](xref:ToSic.Sxc.Context.ICmsSite)


## CmsContext.User

| Name | Type | Value Example | Description
| --- | --- | --- | ---
| Id | int | 2 | User ID
| IsSiteAdmin | bool | `true` | People who can can admin users/content
| IsSystemAdmin | bool | `true` | Super Users
| IsSiteDeveloper | bool | `true` | Usually just Super-Users

👉 [](xref:ToSic.Sxc.Context.ICmsSite)


## Demo App and further links

You should find some code examples in this demo App
* No demo apps exist yet

## History

1. Introduced in 2sxc 11.11
