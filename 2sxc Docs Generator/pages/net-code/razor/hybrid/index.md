---
uid: NetCode.Razor.Hybrid.Index
---

# Hybrid Razor running on Dnn ☢️ and Oqtane 🩸 

Dnn and Oqtane have a few differences because of these important factors:

1. Different underlying C# and .net frameworks and Razor-Engines
1. Different platforms (Dnn is different from Oqtane)

> [!IMPORTANT]
> This is very advanced stuff and only relevant if you want to create Apps which run on _both_ Dnn and Oqtane. 
>
> For most of your apps this is not relevant

## 2sxc Philosophy - Stay out of the Way

Our philosophy is to _not reinvent the wheel_ so it's important that we let you use the .net APIs as they are designed. Se we don't plan on creating another API which to hide the differences, but let you understand them and easily handle everything as needed. 

## Core Strategies for Hybrid Razor Templates

If you follow these three rules you should be good to go:

1. Inherit from `Custom.Hybrid.Razor12`
1. Use very common C# features and syntaxes which existed since C# 7.2 (so anything that runs in Dnn will also run in Oqtane)
1. Use .net standard 2.0 APIs and avoid using `System.Web`
1. Where necessary, use preprocessor directives as explained below

## Avoid old Razor Features

The old razor had a few features which won't work in .net Core 5 / Oqtane:

1. `@helper` directive

## Switch between Code variations in Razor

In Oqtane 2 we recommended using `#if NETCOREAPP` switches in your Razor code. 

In Oqtane 3, this only works in `.cs` files. 
So the only way to switch between code variations in the latest Razor is to use normal `@if(...)` statements and place your platform specific code in sub-files. 

```razor
@if(CmsContext.Platform.Name == "Oqtane) {
  // OqtaneStuff which doesn't trigger compile errors can be inline
  someVar = "Oqtane";
  // Code which would trigger compile errors must be in a separate file
  @Html.Partial("OqtaneCode.cshtml");
} else {
  // DnnStuff - same principles
}
```

## The Preprocessor Directives in `.cs` files

C# has special `#if` [preprocessor](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/preprocessor-directives) statements which are evaluated during compilation. 
Using this you can define which code should be used in Dnn and Oqtane. 

```cs
#if NETCOREAPP
  // OqtaneStuff
#else
  // DnnStuff
#endif
```
The following _symbols_ are set when Api Controllers are compiled:

[!include[](~/pages/net-code/hybrid/_include-preprocessor-symbols.md)]


## Different C# and .net Frameworks

| Part | Dnn 7 | Dnn 9 | Oqtane
| --- | --- | --- | ---
| C# Language | ca. 7 | ca. 7 | C# 9
| .net Framework | 4.5.1 | 4.7.2 | .net core 5
| .net Standard | 1.6 | 2.0 | 2.0

Any hybrid controller must limit itself to features in .net standard 1.6 or 2.0, depending on the platforms you want to support. Note that any 2sxc standard apps are meant to still run in Dnn 4.7.2, so we'll restrict our work to support _.net standard 1.6_. This means our examples are more limited than what you will be doing. 

## Differences in the Platforms

If you are creating hybrid controllers, we'll assume that you usually don't need to access properties of Dnn or Oqtane. If you do, you'll have to use the standard mechanisms provided by these. 

* In Dnn - use global objects like `PortalSettings.Current`
* In Oqtane use [Dependency Injection](xref:NetCode.DependencyInjection.Index)
* To avoid the code from causing trouble during compilation, wrap the necessary differences in `#if NETCOREAPP ... #endif` and `#if !NETCOREAPP ... #endif` blocks in C#
* To avoid the Razor from causing trouble during compilation, wrap the necessary differences in `@if(CmsContext.Platform.Name == "Oqtane") { ... }` blocks in Razor


## Limitations for `@using` Statements

The Razor Compiler in Dnn & Oqtane behave a bit differently regarding preprocessor statements. So you cannot use them for `@using ...` statements. This WILL NOT WORK: 

```razor
@{#if unknown}
@using DotNetNuke.Framework.JavaScriptLibraries;
@{#endif}
```

In Dnn it will work, but in Oqtane / .net 5 it will not result in an error, because the `@using` statements are handled in a way which doesn't result in them being skipped. 

If you only need the namespace on a single command, just use the full namespace in your command, like this:

```c#
if(fancybox || scripts) {
    #if(CmsContext.Platform.Name == "Dnn") {
      // Put this line in a separate file to call from here
      // DotNetNuke.Framework.JavaScriptLibraries.JavaScript.RequestRegistration(DotNetNuke.Framework.JavaScriptLibraries.CommonJs.jQuery);
    }
}
```

If you have complex code, a simple trick is to place it in a separate file (so the Razor compiler won't complain) and then use `CreateInstance(...)` or `Html.Partial(...)` to call that if you are in the correct system. 

## Set Page Properties and Headers for Hybrid Apps

In Dnn you were able to use RazorBlade to set Title or add Headers. 
Since RazorBlade has a static implementation, this cannot work in Oqtane. 

To solve this we created the [IPageService](xref:NetCode.Razor.Services.IPageService).

## Set Http Status Codes for Hybrid Apps

In Dnn you could simply get the HttpContext and change the Response object. 
This uses a static implementation which dosen't work in Oqtane. 

To solve this we created the [IPageService](xref:NetCode.Razor.Services.IPageService).

## Search Integration

Previously in Dnn you could write some `CustomizeSearch` code in the Razor-file which we decided to deprecate in future. 
From now on please use the the feature [described here](xref:NetCode.Search.Index). 
Note that as of now, Oqtane doesn't have a search indexer, so there it will simply have no effect, but your code will run on both platforms.

---

## History

1. Introduced in 2sxc 12.00

