---
uid: Abyss.Contribute.Backend.Internals.Context
---

# Context Information

[!include[""](../../_contributors-only.md)]

All executing code needs some context to understand its environment and state.
This context information differs depending on what is happening, so there is quite a bit of complexity.
These docs should catalog all the context infos that exist, how and when they get initialized, and how they are used.

## Overview

The context provides essential information about the current execution environment,
including details about the request, user, and other relevant state.
It is crucial for ensuring that code behaves correctly depending on where and how it is executed.

The focus is on information which is necessary for the execution
and for retrieving further information.
For example, knowing what module is being displayed is essential for loading the data,
while the data itself is secondary (since it can be retrieved once the context is known).

## Goals

1. Services which need context information can get it easily
2. Ideally expensive retrieval operations are not repeated
3. Optional context information is retrieved/built only when needed
4. There is a clear path of context-creation, to keep debugging simple

## Types of Context Information

1. System Information (Paths, DB-Connections, etc)
2. System specs such as available and activated license.
3. User Information (Authentication, Roles, Preferences)
4. Configuration information (settings per app, site, etc.)
5. Tenant Information (the exact site)
6. Language (User's preferred language, Locale, default language of the site)
7. Request Information (Headers, Query Parameters, Body)
8. Module Information (Module ID, Settings, Context)
9. App Information (App ID, Version, Configuration)
10. Content-Block Information

Specifically for an app to show, it needs:

1. User information: `IUser` _injectable_
2. Tenant information: `ISite` _injectable_
3. Page information: `IPage` _injectable_
4. Module information: `IModule` _not injectable_
5. App information: `IApp` _not injectable_
6. Content-Block information: `IContentBlock` and `IContentBlockIdentifier` _not injectable_
7. Execution Context: (special: ATM provided through `INeedsExecutionContext` - is being reworked) _not injectable_

Context Bundles

1. `ContextOfSite` (Site, User, Permissions) _injectable_
1. `ContextOfApp` (`ContextOfSite`, Updated Permissions, + AppSettings, AppResources, AppReaderOrNull, AppReaderRequired) _❗ not injectable_
1. `ContextOfBlock` (`ContextOfApp`, Updated permissions, + Page, Module, Publishing, PageServiceShared) _❗ not injectable_
1. Execution Context TODO: _❗ not injectable_

## Types of Context Providers / Services

1. Standalone: Site, User, Page (DNN splits factory and data; Oqtane still mixed with object itself)
1. Context Bundles: `ContextOfSite` _injectable_, `ContextOfApp`, `ContextOfBlock` _not injectable_
1. Context Services: `ISxcCurrentContextService`, `ISxcAppCurrentContextService`, `ICurrentContextService` - all providing the same **scoped** `SxcCurrentContextService` implementation _injectable_
1. Object with Context: `IBlock` _❗ not injectable_
1. Context Wrappers `ICmsContext` (not important here) _❗ not injectable_
1. Context with Services: `ExecutionContext` _❗ not injectable for now_


## Process

## Different Levels of Context Completeness

A core challenge is that depending on the entry point and state, various information may not be available.
In such scenarios, it's possible that certain operations cannot run.
Here some examples:

1. On a typical page/module/content-block load, we have everything
    - System Information
    - User Information
    - Tenant Information
    - Request Information
    - Module Information
    - App Information
    - Content-Block Information
1. On some special page/module/content-block load, certain context information may be missing or different
    - If the block was not yet initialized, it may not have an App or a Content-Block
    - If the block is in initial preview mode, the App may be temporarily set
    - If the block is trying out different views, the View is available, but it's not persisted
1. For WebAPI calls, the context may be very limited, often only including System and User Information.
    - Some only have the system and user
    - Some may also know the tenant
    - Rarely, some may have additional context like Module or App Information


## Entry Points

The entry points matter, because they are usually the first time any code runs -
and should ensure that at least some of the context is initialized and "broadcast" to the rest of the system.

This should become a comprehensive list of entry points, to ensure that
we can better manage what happens when.

### 0. Compile Time

At compile time, some minimal context is already added, since the build is targeted to a specific platform.
These are:

1. Services registrations (in the platform specific StartUp)
1. .net runtime information (usually based on `#if` directives and similar)
1. Platform information (registered through DI of the specific platform)
1. System features, like "does this platform support C# 9"

### 1. Application Start

The application usually starts outside of 2sxc, when DNN, Oqtane or a custom application starts.
This kind of information is provided

* often as as static information (but provided by transient services)
* sometimes provided through singleton services

These are:

1. Database connections and configurations
1. System Paths (to the UIs, App root paths, etc.)
1. Catalogs (like available DataSources, features, licenses, etc.)
1. Activations (like feature toggles or license activations)

In addition, 2sxc/EAV will require information from the system itself,
such as user roles, etc. which the application handles differently depending on the platform.
Some of this information may be preloaded at start,
others are fetched on demand.

### 2. User HTTP Request

HTTP Requests are the primary way users interact with the application.
There are a few variants to this - both if it's an page or an API request,
as well as different HTTP methods like GET, POST, PUT, and DELETE.

As of now, there is no universal HTTP request initialization,
each type of http-request has it's own mechanisms (see below).

### 3. Interactive Page Load

This is everything which happens when a normal page is loaded and rendered for the user.
It's important to understand that DNN and Oqtane have different page lifecycle events,
and the exact mechanism differ between platforms and Razor rendering models in Oqtane.

### 3.1 Page Load

TODO: differences Dnn/Oqtane, Oqtane hosting models

### 3.2 Module Load on a Page

### 3.3 Inner Content-Block within a Module

### 4. Web API Calls

Web API calls are the most diverse in terms of available context.
For an overview:

1. Some calls only know what site it's for + the user
1. Others know what page, module and content-block it's for
1. Others know the app and user, but not a page, module or content-block.

These differences affect what can actually run within this context.
It also affects security checks, because certain permissions may be configured per module,
which cannot be verified if the module is not known.

### 4.1 Standard Web API Call

### 4.2 App specific WebApi Controllers

In DNN there is first a lookup system to find the controller.
Since this needs almost all the context information,
it will also put it into the shared State as of now.

When the DLL is then loaded, the underlying base class
will retrieve the shared (scoped) context and use it to build the Execution Context.

This is not final, but WIP as it could be improved, especially for clarity.

#### 4.2.1 DNN

In DNN, the context for Web API calls is built through a series of steps
involving the `DnnAppApiControllerService` and the `DnnCustomWebApiHelper`.
The process generally follows these steps:

1. The `DnnAppApiControllerService` attempts to select the appropriate controller for the request.
2. During this process, it retrieves the `edition`, `BlockSpecs`, and `app folder` information.
3. The `BlockSpecs` are shared via the shared state to be used later by the controller.
4. When the controller is instantiated, the `DnnCustomWebApiHelper` initializes the `BlockSpecs` from the shared state.
5. This ensures that the execution context has all the necessary information about the block, module, and app for the request.

This mechanism allows DNN to provide the necessary context for Web API calls, even when the request does not directly include all the required information.

### 5. Background Tasks

### 5.1 DNN Search Indexing

### 5.2 Oqtane Background Tasks



## History

1.


## Random notes 2dm 2026-10-26 not finalized

Diagnostics initialization of module/block etc. 2026-10-20 18:35

1. Custom APIs
    1. 1x DnnAppApiControllerService.SelectController()
        1. Get edition
        2. block= TryGetBlockSpecsUsingModuleAndContentBlockHeaders(req)  pure 👍🏼
        3. ShareBlockSpecs()
        4. DnnWebApiAppFolderUtilities.GetAppFolder()
            1. 5x!!! MAYBE: AppFolderLookupForWebApi.FindAppFolderFromScopeOrThrow () ⚠️
            2x!!! SetAppFromNameOrUrlParamsOrUseExistingBlockRequired ("") ⚠️
        5. If Block null! > SetAppFromPathOrNull(…)
2. DnnSxcControllerBase
    1. DnnCustomWebApiHelper
    1. InitBlockSpecs
        1. GetBlockAndContext  TryGetBlockSpecsUsingModuleAndContentBlockHeaders
        2. ShareBlockSpecs()
3. DnnSxcCustomControllerBase  always runs after the DnnAppApiControllerService
    1. DnnCustomWebApiHelper

