---
uid: Basics.Platforms.YourCustom.Scenario01
---

# Your Custom Platform - Scenario #1 - Read EAV Data

This is part of the [Integration Guide](xref:Basics.Platforms.YourCustom.Index) for integrating EAV or 2sxc into your own solution. 

> [!TIP]
> You can find this fully implemented in the `Integration\BasicEav01` project

## Scope of Scenario #1 - Read EAV Data

In Scenario #1 we will setup a basic system. 
This is the foundation for more enhanced scenarios. 

**Functionality**

1. Can read / get EAV Data from an existing Dnn or Oqtane Database
1. Can see [Insights](xref:NetCode.Debug.Insights.Index) to see what's happening internally and to verify everything is ok

## Integration Overview for Basic Read-From-Existing-DB Scenarios

To Integrate EAV and 2sxc into your system, these are the core things you must do:

1. Add necessary DLLs
2. Copy all relevant files core files like `.data`
3. Integrate into your Dependency Injection
4. Do StartUp configuration as needed
5. Test / Verify you can Read Data

--- 

## 1. Add Minimal DLLs

For the first scenario, we need the main `ToSic.Eav.*` DLLs (no 2sxc DLLs needed):

1. Apps
1. Core
1. DataSources
1. ImportExport
1. Persistence.Efc
1. Repository.Efc

You can add these manually, reference them or whatever. 

---

## 2. Copy Important Data to Your Target

The EAV loads important data from the file system when it starts. This data contains Content-Types and basic configuration which is necessary to work. 

In the basic implementation, you need the `.data` folder to be copied to the right location, which must be available at runtime. 

> [!TIP]
> The `.data` folder does not need to be accessible from outside. 

You may copy the `.data` manually, or automate it on build. 

The following script is used in the `BasicEav01` project on build (adjust it to your needs):

```
@Echo Configuration='$(Configuration)'
@Echo StartWith ='$(Configuration.StartsWith('Debug'))'
@Echo Platform ='$(Platform)'
@Echo ProjectDir '$(ProjectDir)'
@SET BuildTarget=$(ProjectDir)sys-2sxc
@Echo BuildTarget '%BuildTarget%'

@REM Copy the data folders
robocopy /mir "$(ProjectDir)..\..\Data\.data\ " "%BuildTarget%\.data\ "
```

---

## 3. Integrate into your Dependency Injection

The EAV and 2sxc need Dependency Injection to work. As of now (2022-02) we use the .net Standard 2.1 DI.

### 3.1 General Principles

The general principle is as follows:

1. At StartUp you'll either
    1. use the existing `IServiceCollection` like in the Oqtane examples
    1. or create a new `ServiceCollection()` like in the Dnn examples
1. You'll later have custom services for your platform only, these should be added in an own method like `AddSxcYourPlatform` in your own static class
1. Once you need these objects, you'll get a `IServiceProvider` from the framework or create your own, sometimes creating an own scope

This would be a minimal StartUp taken from `BasicEav01`:

```c#
/// <summary>
/// This method gets called by the runtime. Use this method to add services to the container.
/// </summary>
public void ConfigureServices(IServiceCollection services)
{
    // Enable EAV
    services.AddEav();

    // RazorPages - standard .net core MVC feature
    services.AddRazorPages();
}
```


### 3.2 Various DI Scenarios 

Your project may already use DI, or it may not. Here are the common scenarios you will probably have:

#### 3.2.1 DI Scenario #1 - No Dependency Injection

This scenario is common in classic _.net Framework_ and _WebForms_ projects which are a bit older. 
We assume nobody will actually be needing this much, so we won't explain this in detail. 
Your work will basically consist of

1. At Startup, create a new DI and store it somewhere (see DNN samples to see how this can be done)
1. When you use it, make sure you get the `IServiceProvider` - probably in an own Scope per request and module

#### 3.2.2 DI Scenario #2 - .net Core Dependency Injection

This scenario is common in new `Asp.net Core` projects. 
It already has Dependency Injection setup, and all you need to do is use the existing one. 
For this scenario, best see how it's done in Oqtane

---

## 4. Do StartUp Configuration

Some aspects of EAV & 2sxc are super important that they are configured before anything starts. 
These are the required ones as of 2022-02:

1. The database **ConnectionString** required to connect to the EAV DB
1. **GlobalFolder** of the distributed 2sxc files containing things like the `.data` subfolder - required to load initial configurations and initial data
1. Call `StartUp` on the `SystemLoader` which you must get from DI

This is the working code taken from `BasicEav01`:

```c#
/// <summary>
/// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
/// </summary>
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
  // ----- Start EAV stuff #2sxcIntegration -----
  var serviceProvider = app.ApplicationServices;
  
  // Set Connection String
  serviceProvider.Build<IDbConfiguration>().ConnectionString = _connStringFromConfig;

  // Set global path where it will find the .data folder
  var globalConfig = serviceProvider.Build<IGlobalConfiguration>();
  globalConfig.GlobalFolder = Path.Combine(env.ContentRootPath, "sys-2sxc");

  // Trigger start where the data etc. will be loaded & initialized
  serviceProvider.Build<SystemLoader>().StartUp();
  // ----- End EAV stuff #2sxcIntegration -----

  // ...
}
```

---

## 5. Test and Verify

If you did everything right, you can now run your code and access data from the App Cache using code like this (see demo on the `ShowEavData.cshtml`):

```c#
@page
@using ToSic.Eav.Apps
@inject IAppStates AppStates
@{
  ViewData["Title"] = "First Read Data from EAV";

  // Adjust these values to your testing environment
  var zoneId = 2;
  var appId = 78;

  var appState = AppStates.Get(new AppIdentity(zoneId, appId));
  var firstItem = appState.List.FirstOrDefault();
}
```

**Common Problems**

1. If the folder to the `.data` isn't quite correct, you will have a long loading time and then a stack overflow


---

## 5. Get Insights WebApi to Work

The [Insights](xref:NetCode.Debug.Insights.Index) will help you figure out what parts you need to implement. 
It will show you what services were requested which are not implemented yet, and will show you what code was used. 

1. Create your minimal `InsightsController` as you see in the demo project
1. Register the routes using whatever system you have ATM (.net core, ASP.net Framework)
1. Test the routes to see things are coming out

**Minimal `InsightsController`**

```c#
using Microsoft.AspNetCore.Mvc;
using ToSic.Eav.Logging.Simple;
using ToSic.Eav.WebApi.Sys;

namespace IntegrationSamples.BasicEav01.Controllers
{
    [Route("api/sxc/sys/[controller]")]
    [ApiController]
    public class InsightsController : ControllerBase
    {
        /// <summary>
        /// Constructor which will retrieve the Insights backend for use here
        /// </summary>
        public InsightsController(Insights insights) => _insights = insights;
        private readonly Insights _insights;

        /// <summary>
        /// The main call on this controller, will return all kinds of views with information
        /// </summary>
        [HttpGet("{view}")]
        public ContentResult Details(
            [FromRoute] string view,
            [FromQuery] int? appId = null, 
            [FromQuery] string key = null, 
            [FromQuery] int? position = null,
            [FromQuery] string type = null,
            [FromQuery] bool? toggle = null,
            [FromQuery] string nameId = null)
        {
            // Temporary setting to allow Insights despite minimal setup
            ToSic.Eav.Context.UserUnknown.AllowEverything = true;

            var result = _insights
                .Init(new Log("Int.Insights"))
                .Details(view, appId, key, position, type, toggle, nameId);
            return base.Content(result, "text/html");
        }
    }
}
```

**Activate it in the `StartUp.cs`**

```c#
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
  // ...

  app.UseEndpoints(endpoints =>
  {
      endpoints.MapRazorPages();

      // #2sxcIntegration - enable insights controllers
      endpoints.MapControllers();
  });
}
```

Test by calling `https://localhost:44384/api/sxc/sys/Insights/Help` - replace the base path as needed

---

## History

* Proof of Concept implemented with 2sxc 11 in 2021
* Finalized when integrating Oqtane in 2sxc 12
* Updated docs for basic Scenario for v13.03
