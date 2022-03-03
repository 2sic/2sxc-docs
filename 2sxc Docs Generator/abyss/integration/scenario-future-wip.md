---
uid: Abyss.Integration.Scenario-wip
---

# Your Custom Platform - Scenario XX Notes to maybe use later


TODO: REMOVE

The more complete code for the **StartUp** looks a bit like this (taken from the `OqStartUp`):

```c#
public void ConfigureServices(IServiceCollection services)
{
  // 1. Initial code to do things not related to EAV/2sxc
  // ...

  // 2. Register all 2sxc services
  services
    .AddSxcOqtane()                 // Always first add your override services
    .AddSxcRazor()                  // this is the .net core Razor compiler
    .AddAdamWebApi<int, int>()      // This is used to enable ADAM WebAPIs
    .AddSxcWebApi<IActionResult>()  // This adds all the standard backend services for WebAPIs to work
    .AddSxcCore()                   // Core 2sxc services
    .AddEav()                       // Core EAV services
    .AddOqtWebApis()                // Oqtane App WebAPI stuff
    .AddRazorBlade();               // RazorBlade helpers for Razor in the edition used by Oqtane

  // 3. Other stuff in your Configure Services
  // ...
}
```

Note that you don't need all of this. For example, if you don't use razor, you won't need two of the lines above, etc.
In general you should probably leave most of this disabled, and then activate each line as you need it. 

The code for registering your own services looks a bit like this (taken from Oqtane):

```c#
namespace ToSic.Sxc.Oqt.Server.StartUp
{
  internal static partial class OqtRegisterServices
  {
    public static IServiceCollection AddSxcOqtane(this IServiceCollection services)
    {
      // You'll probably have lots of these:
      services.AddScoped<I..., ...>();
      services.TryAddTransient<I..., ...>();
      return services;
    }
  }
}
```



TODO: REMOVE

The following are optional, depending on the features you will be using

1. The Global Assets base url - so links to in that global location work. ATM only used for the image of the [Primary App](xref:Basics.App.PrimaryApp.Index)
1. The **SharedAppsFolder** which contains Razor or Token templates that are shared across sites



---

## History

* Proof of Concept implemented with 2sxc 11 in 2021
* Finalized when integrating Oqtane in 2sxc 12
* final docs WIP
