---
uid: NetCode.DynamicCode.GetService
---

# GetService\<T\>() Command _new in v11.11_

If you want to do advanced stuff, you will want to ask for other global Services to help your code. 2sxc uses Depedency Injection to do this. 

👉 Read about [Dependency Injection in 2sxc](xref:NetCode.DependencyInjection.Index)

Use `GetService<T>()` to get this service. 

⚡ The [official API docs](xref:ToSic.Sxc.Code.IDynamicCode.GetService*).


[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]


## Two important services that require you to use GetService are

* [IPageService](xref:NetCode.Razor.Services.IPageService)
* [Koi ICSS](xref:NetCode.Koi.Index)


## Also Read

* TODO: These docs are incomplete, as the feature is still new.

## History

1. Introduced in 2sxc 11.11
