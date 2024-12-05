---
uid: Abyss.Integration.Scenario02
---

# Your Custom Platform - Scenario #2 - Edit Data + ADAM

This is part of the [Integration Guide](xref:Abyss.Integration.Index) for integrating EAV or 2sxc into your own solution. 

> [!TIP]
> You can find this fully implemented in the `Integration\SxcEdit01` project
>
> Search for `#2sxcIntegration` in the code to find all the things that were adjusted to get it to work.

> [!WARNING]
> These docs are still WIP.

## Scope of Scenario #2 - Edit EAV Data

**Functionality**

1. A link on a page can open the edit dialog
1. Users can edit texts
1. Users can save the result
1. Users can see the history of an item and restore it to a previous state
1. ADAM
    1. Users can upload assets in the edit-dialog - which is stored in this new web (not in the original Dnn/Oqtane)
    1. Users can see previously uploaded assets
    1. Users can delete and rename assets in the edit-dialog
    1. Assets are referenced using their path, not an ID (which would be the default in Dnn/Oqtane)
1. Adam files of an entity can be shown on a page
1. All API Controllers log what they do

Not implemented

1. Security checks are fake, it always returns that edit etc. is allowed

## Integration Overview for Basic Edit + ADAM

To Integrate EAV and 2sxc into your system, these are the core things you must do:

1. Add _more_ necessary DLLs
2. Copy _additional_ relevant files - specifically the js/css files to be used in the dialogs
3. Implement core objects which are different in your system
4. Implement APIs for edit, probably also for delivering files etc.
5. Test / Verify you can edit data

--- 

## 1. Add Minimal DLLs

For this scenario you need to add just about all of the DLLs except for Razor helpers. 

You can add these manually, reference them or whatever. 

---

## 2. 2sxc Web Files (JS, CSS)

### 2.1 Copy Important Web Files to Your Target

All the dialogs are JS based, so you must get these JS files in a place where they can be loaded. 

> [!TIP]
> The `dist`, `js` folders etc. **must** be accessible from outside. 

For reference, check out the build script on the `SxcEdit01` project. 

### 2.2 Make sure in page 2sxc JSs are loaded

For the page to be able to trigger edit dialogs, it needs at least these two files to be loaded on the page when a user should be able to edit:

1. `[2sxc public files root]/js/2sxc.api.min.js` -  note that the location could change in a future version
1. `[2sxc public files root]/dist/inpage/inpage.min.js` -  note that the location could change in a future version
1. Optional: Load the CSS `[2sxc public files root]/dist/inpage/inpage.min.css` for Toolbars to work

2sxc does this automatically in a full implementation like in Dnn and Oqtane. 
The logic to do that and ensure it's part of the final output is sophisticated.
So for this minimal implementation, best do it yourself, and choose yourself if you give it to all users or just admins.

### 2.3 Give the JS Environment Variables

The JS needs to know a few global things for it to work. 
At the minimum it's the location of the WebAPI root as well as the location of the UI files. 
For this you either need a `_jsApi` meta header or add this to the page after the $2sxc-js has been loaded:

```js
$2sxc.env.load({
  // optional pageId: 0,
  rvt: '@IntegrationConstants.EnvRvt',
  api: '@IntegrationConstants.EnvApiRoot',
  uiRoot: `@IntegrationConstants.EnvUiRoot`, 
});
```

The previous code was taken from the `_Layout.cshtml` in the example. 

---

## 3. Implement Core Objects which are Necessary

Specifically

1. Implement
    1. `Context\ISite` is needed to have information about the `ContentPath`
    1. `Context\IUser` is needed to pretend it's a super-user and allow editing
    1. `Adam\IAdamPaths` - our test-case assumes it's in wwwroot, for which there is already a prepared `AdamPathsWwwroot` object
1. Register these replacements in the StartUp - in the demo project it's in the `StartupEavAndSxc.AddImplementations(...)`


## 4. Implement and Activate WebApis

1. Implement a base class to assist in various aspects
    1. Add the request to the insights logs
    1. Ensure timing of the request to better spot issues
    1. Make sure your controllers [are just proxies calling the `Real` controller](xref:NetCode.Conventions.ProxyControllers)
    1. Make some minor corrections to HTTP responses, so empty ones really return an HTTP 204
1. Implement WebApis to answer on the appropriate endpoints (see examples)
    1. `DialogController` is required to get general information for dialogs to work
    1. `EditController` is reponsible for loading and saving data from the dialog
    1. `AdamController` helps with file uploads etc.
1. Register / activate
    1. Depending on the framework, **registration** is different. For .net core, check out the example `AddControllersAndConfigureJson(...)` or the Oqtane registration examples.
    1. Remember that it must also be **configured** - see the `UseEndpoints(...)` or the `Startup.cs`

## 5. Provide `index-raw.html` On the `/` _new v14_

The 2sxc dialogs (quick-dialog and eav-edit) both create an `index-raw.html`. 
These are incomplete - they need some placeholders to be replaced at runtime based on the page they are opened from. 

Linking to these UIs happens through these targets:

* `[2sxc public files root]/dist/quickDialog/?pageId=123&sxcver=14...` 
* `[2sxc public files root]/dist/ng-edit/?pageId=123&sxcver=14...`

You must ensure that these URLs deliver the corresponding `index-raw.html` with the placeholders fixed. 

For this, either create a real page (like a `default.aspx` in DNN) which responds to the request and renders the `index-raw.html` with the placeholders replaced.
Or you can create a route/endpoint (like in Oqtane) which does the same thing. 
Best check the code how it's done in Dnn/Oqtane. 

The placeholders which are currently set are:

1. `@base` - for the base-tag containing the page-id so that refreshes preserve this
1. `@jsapi` - the meta-header containing context information
1. `@sxcver` - for the version of 2sxc extended with the server-start timestamp, mainly for cache-break purposes
1. `<!--@customheaders-->` - custom headers - ATM not used but you may need it
1. `<!--@custombody-->` - custom body - ATM used by Oqtane to provide the Request Verification Token

These are replaced automatically for you when you use the `ToSic.Sxc.Web.HmlDialog` helpers.

---

## 6. Expand StartUp Configuration

Do the same as TODO:


Some aspects of EAV & 2sxc are super important that they are configured before anything starts. 
These are the required ones as of 2022-02:

1. The database **ConnectionString** required to connect to the EAV DB
1. **GlobalFolder** of the distributed 2sxc files containing things like the `App_Data` subfolder - required to load initial configurations and initial data
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

  // Set global path where it will find the App_Data folder
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

1. If the folder to the `App_Data` isn't quite correct, you will have a long loading time and then a stack overflow

---

## History

* Proof of Concept implemented with 2sxc 11 in 2021
* Finalized when integrating Oqtane in 2sxc 12
* Updated docs for basic Scenario for v13.03
* Updated for dialog-integration with index-raw in v14.02