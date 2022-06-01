---
uid: WebApi.Specs.Context
---

# Context for 2sxc WebAPI and REST APIs

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>
  .context-box-summary .browser-interact,
  .context-box-summary .process-apis { visibility: visible; }
</style>


Whenever the server receives an HTTP request it must determine what it's for to figure out what to do. 

> [!TIP]
> The **Context** contains default information about the request incl. the site/app it's for, what languages to use etc. 

In most cases the client will include the necessary information automatically. 
The following section is helpful if...

* ...you need to manually include the context, like when you're request originates from outside of the ecosystem
* ...you need to override some context information, like when your JS is on a German site but want to get the English data

In these docs we explain what each part of the context does, where it's from, what it's for and how to optionally override it.

---

## 1. The Site / Portal Context (required)

Since our platforms (Dnn/Oqtane) could have multiple sites in the same installation, the first thing that must be determined is what site this request is for. 

### How the Site is Automatically Detected

In **Dnn** a site is always identified by the root path to the site, as it's configured in Dnn. Examples:

* https://www.2sxc.org is site 0
* https://2sic.org is site 0
* https://2sxc.org/en is site 0
* https://2sxc.org/de is site 0
* https://2sxc.org/dnn-tutorials/ is site 24

In **Oqtane** a site is always identified through a number in the route (the domain is ignored). Examples:

* .../1/api/... is site 1
* .../2/api/... is site 2

### What is Affected by the Site Context

The Site context is important for various additional pieces of context:

1. The languages available (can be different on each site)
1. The primary language (configured per site)
1. The current language (can only be one of the available languages or primary)
1. The app (see below, apps are installed on sites)

### Providing an Own Value or Overriding the Default

Just call the other endpoint with the correct URL. 


---

## 2. Current Language

The current language is necessary for read operations to determine what values to actually use. In case of a no-language or single-language site it's not important. 

### How the Current Language is Automatically Detected

In Dnn the current language is part of the url, as configured in the site, so it's _dependent_ on the **Site** Context. Here some examples:

* 2sxc.org/en would be configured to be `en-US`
* 2sxc.org/de would be configured to be `de-DE`
* de.2sxc.org would be configured to be `de-DE`

In Oqtane the convention isn't clear yet (WIP)

### What is Affected by the Current Language

All read operations in the API and internally will try to access values meant for that language. Return values will also prefer that language (if translations exist).

### Providing an Own Value or Overriding the Current Language

The most common way to use another language is to use the appropriate url which matches that language. Another way to do it is to include a parameter in the request like `?language=en`.

> [!WARNING]
> Setting the `?language=xxx` parameter in Dnn has a suprising performance penalty of ca. 200-300ms.
> So if you can, prefer to just use the correct initial path. 


---

## 3. Page and Module Context (optional)

Whenever the API call is used on a Dnn or Oqtane page, the HTTP call will usually include this information in the request to assist in auto-detecting the **App** Context. 

### How the Page and Module are Automatically Detected

The standard implementation is that API-Calls include special HTTP headers with these IDs. These headers are used:

* `PageId` (number)
* `ModuleId` (number)

> [!NOTE]
> For historical reasons, Dnn includes a `TabId` which contains the same value as `PageId`. 
> The backend will treat these as the same header.
> We changed this to `PageId` in v11 and for future stability please use `PageId`. 

### What is Affected by the Page and Module Context

1. The primary use for the **Page/Module Context** is figuring out what **App** Context to use. So if the Module 2472 on Page 51 on Portal 7 is a _Blog App_ then, then the **App** Context will be this Blog App.
1. The second use is providing data for this **Module Instance**. So if a module has content or data assigned to it (like a _Category List_ showing 3 selected Categories), then this data will be available automatically. 
1. The third important use is for permission detection: if the current user has certain permissions on this page/module, then these permissions also apply to the current API request. If the Page/Module context is missing, then only default permissions  apply. 
1. The final and obvious use is that certain backend APIs will know these values, so that objects like `CmsContext.Page.Id` have these values for the scripts to use. See also [](xref:ToSic.Sxc.Context.ICmsContext)

### Providing an Own Value or Overriding the Default Page/Module

The default calls on the **2sxc JS API** including **dnn-sxc-angular** will automatically set these headers if it can. 

If you have a reason to include alternate values, just make sure that you change the headers either by modifying the request before it's sent, or by using another http-caller like jQuery. 


---

## 4. App Context (required)

All WebAPI operations happen inside an App. They are either Content/Query REST calls (so they apply to the app) or custom WebApis (which are in the app-folder) - so the **App** must always be known. 

### How the App Context is Automatically Detected

The **App Context** requires that the **Site Context** is already known. Then there are two ways for the App Context to be detected:

1. If the **Page Context** and **Module Context** are known, then this automatically leads to the app to be used, as it's the app on that module.  
  _Note: In rare cases the page and module are set, but the app has not been selected yet. This edge case only affects internal APIs of 2sxc, not the normal use we discuss here_
1. If Page/Module are not known or not provided, then the app is chosen based on the **App-Name** in the url. 
  This is the default mechanism used when calling endpoints from other pages or mobile apps. 
1. If _both_ the **Page/Module Context** _and_ the **App-Name** are provided, then the **App-Name** is prioritized. If it is about the same App, then the full context (with Page/Module) is used, allowing more permissions to work.
1. If _neither_ **Page/Module** nor **App Context** are known, then the request will fail. 

### What is Affected by the App Context

The **App Context** will be used for almost everything, including these aspects:

1. The data and configuration used (`App.Data` etc.)
1. The path to code (like custom WebApi Controllers)
1. Permissions on the App or Content-Types

### Providing an Own Value or Overriding the Default App Context

To access another app you will usually supply another **App-Name** in the url for the API-Call. In rare cases you may also provide other **Page and Module Context** headers, but this is usually not a good idea. 

---

## 5. Current User (required)

All operations happen in the context of a user, either _Anonymous_ or the _Current User Identity_. 

### How the Current User is Automatically Detected

The current user is always provided by the environment (Dnn or Oqtane). If no user is identified, the platform always tells 2sxc that the user is _Anonymous_. 

### What is Affected by the Current User

1. Read / Write permissions (either directly or indirectly if a user is in a group with permissions)
1. Read-Draft permissions (admins may also see data which isn't published yet)
1. Identity used when saving data

### Providing an Own Value or Overriding the Default App Context

The user is fixed to being the real user logged in (or Anonymous).

So if you need to execute something in another identity, make sure your system logs into Dnn/Oqtane using the built-in mechanisms (like JWT) and then perform the request using that authentication. 

---

## 6. Other: Edition (optional)

This only applies to custom WebAPI controllers. 

Custom WebAPI controllers are usually stored in the folder `[App-Root]/api`. You can also place them in subfolders like `[App-Root]/live/api` in which case `live` would be an edition. This allows you to have multiple editions of the same controller for staging, testing and more. As it's not really context information, it's only mentioned here. To find out more, read about the [URL Schema](xref:WebApi.Specs.UrlSchema) and about [Polymorphisms](xref:Basics.Polymorphism.Index). 

---

## 6. Other: RequestVerificationToken (maybe optional)

Dnn and Oqtane have a security system to ensure that requests are coming from the page itself and that they are using the right login. This is not really context, so the full mechanism is explained in [Security][xref:WebApi.Specs.Security].


## Read also

- [URL Schema](xref:WebApi.Specs.UrlSchema)
- [Concepts: Polymorphisms](xref:Basics.Polymorphism.Index)

You should find some code examples in this demo App

- [Razor Web API tutorials](xref:Tut.WebApi)
- [REST and WebApi Tutorial](http://2sxc.org/en/apps/app/tutorial-javascript-rest-api-using-jquery-and-angularjs)
- [Mobius Forms App](https://2sxc.org/en/apps/app/mobius-forms)

## History

1. Introduced in 2sxc 5.x
1. Query added in 2sxc 8.10
2. Enhanced with Polymorph Editions in 2sxc 9.35 (allowing edition-folder/api)
