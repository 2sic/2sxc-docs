---
uid: NetCode.Razor.Hybrid.Index
---

# Hybrid Razor running on Dnn ☢ and Oqtane 💧 

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
1. Use very common C# features and syntaxes which existed since C# 7.2 (so anything that runs in DNN will also run in Oqtane)
1. Use .net standard 2.0 APIs and avoid using `System.Web`
1. Where necessary, use preprocessor directives as explained below

## Avoid old Razor Features

The old razor had a few features which won't work in .net Core 5 / Oqtane:

1. `@helper` directive




## The Preprocessor Directives #todoc

C# has special `#if` [preprocessor](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/preprocessor-directives) statements which are evaluated during compilation. 
Using this you can define which code should be used in Dnn and Oqtane. 

Since these are C# code, you have to put them in a `@{ }` wrapper and the must be at the beginning of a line, so either `@{#if ...}` or 

```razor
@{
#if NETCOREAPP
  // OqtaneStuff
#else
  // DnnStuff
#endif
}
```

Here's an example:

```razor
@{#if NETCOREAPP}
  <h3>.net Core code = Oqtane 💧</h3>
  <p>
    On Oqtane or any .net core system you should see this because <code>#if NETCOREAPP</code> was <code>true</code>. <br>

    Here you can also place code which only works in Oqtane, like: 
    Version: @Oqtane.Shared.Constants.Version
  </p>
@{#else}
  <h3>NON .net Core code = Dnn ☢</h3>
  <p>
    On Dnn you'll see this because <code>#if NETCOREAPP</code> was <code>false</code>. <br>

    Here you can also place code which only compiles in DNN, like: 
    PortalId = @DotNetNuke.Entities.Portals.PortalSettings.Current.PortalId
  </p>
@{#endif}
```

The following _symbols_ are set when Api Controllers are compiled:

[!include[](~/net-code/hybrid/_include-preprocessor-symbols.md)]

Use like this:

* `@{#if NETCOREAPP} ... @{#endif}`
* `@{#if NETCOREAPP} ... @{#else} ... @{#endif}`
* `@{#if !NETCOREAPP} ... @{#endif}`
* `@{#if !NETCOREAPP} ... @{#else} ... @{#endif}`


You can't use `#if DNN ... #endif` because of limitations in the dynamic C# compiler of Dnn. Just use `#if !NETCOREAPP ... #endif`. 






## Different C# and .net Frameworks

| Part | Dnn 7 | Dnn 9 | Oqtane
| --- | --- | --- | ---
| C# Language | ca. 7 | ca. 7 | C# 9
| .net Framework | 4.5.1 | 4.7.2 | .net core 5
| .net Standard | 1.6 | 2.0 | 2.0

Any hybrid controller must limit itself to features in .net standard 1.6 or 2.0, depending on the platforms you want to support. Note that any 2sxc standard apps are meant to still run in DNN 4.7.2, so we'll restrict our work to support _.net standard 1.6_. This means our examples are more limited than what you will be doing. 

## Differences in the Platforms

If you are creating hybrid controllers, we'll assume that you usually don't need to access properties of Dnn or Oqtane. If you do, you'll have to use the standard mechanisms provided by these. 

* In DNN - use global objects like `PortalSettings.Current`
* In Oqtane use Dependency Injection
* To avoid the code from causing trouble during compilation, wrap the necessary differences in `#if OQTANE ... #endif` and `#if !OQTANE ... #endif` blocks


---

## History

1. Introduced in 2sxc 12.00

