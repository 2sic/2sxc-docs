---
uid: WebApi.Specs.Security
---

# Security for 2sxc WebAPI and REST APIs

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>
  .context-box-summary .browser-interact,
  .context-box-summary .process-apis { visibility: visible; }
</style>


All WebAPI calls in Dnn, Oqtane and 2sxc have some security features. 
In the basic use cases it's straightforward: the current user may do some things, and that should be allowed. 

These docs should help you understand where these things are configured and what to change if you need adjustments. 

## Request Security

Each request contains information needed for the backend to determine if this request should be answered or not. In Dnn and Oqtane this is the **User Identity** and the **RequestVerificationToken**. 

### User Identity

By default, the user is logged in using normal web conventions and from then on the user will have an encrypted cookie identifying this person. 

In advanced scenarios you may also use [JWT](https://jwt.io/) aka **Json Web Tokens**. 
This is useful in mobile app scenarios and scenarios where the client application is remote (like a web-server or a SPA). 
Consult the docs of Dnn or Oqtane to find out how to use this. 

You could also use custom login systems like OAuth, but in these cases you will really need to figure out how to implement it in Dnn or Oqtane. 

### Anti Forgery Token: RequestVerificationToken

ASP.net has a feature to prevent XSS (Cross Site Scripting / Cross-Site Request Forgery). 
To make this possible, pages viewed by a user have some hidden key included which is encrypted to include identity-information for this user. It is included in all HTTP requests except for `GET` requests. 

If an endpoint is secured to check for this using `[ValidateAntiForgeryToken]`, then only requests containing this header will be processed. 

> [!TIP]
> Not all endpoints require this, but many do. 
> It's commonly enforced on admin-endpoints and on any endpoint which are not expected to be used from
> outside of the site. It's best practice to require this where possible. 

> [!WARNING]
> `GET` requests don't include this header, so don't enforce checking this in the backend for GET endpoints. 

When you use standard **2sxc JS** WebAPI calls, the RequestVerificationToken is automatically included in the request. If you use your own JS API stack or plain vanilla browser implementations, make sure you add it. 


## REST Content and Query Endpoint Security

The built-in [Content](xref:WebApi.Data.Index) and [Query](xref:WebApi.Query) endpoints use configuration based security. 

### Prerequisites: Platform Permissions are OK

Just to be aware of the obvious: if the platform (Dnn/Oqtane) don't allow access to the endpoints for whatever reason, then even the built-in endpoints won't do anything. 

### Default Security Configuration: Nothing is allowed

Both Content and Query are by default only available to admins and super-users. To make these available to other users (incl. Anonymous) this must be configured.

### Opening Security Configuration

These are the places you can configure to open security: 

1. On an **App** you can give general permissions that apply to all content types. This is usually not recommended. 
1. On a **Query** you can configure read permissions for specific users or user groups.
1. On a **Content-Type** (the schema that says what fields exist) you can configure many permissions incl. read and write. You can even configure more exotic permissions like:
    1. _Anonymous users can create data, but they are set to draft and not visible_
    1. _Registered users can create data and only edit data which they created_

> [!NOTE]
> Permissions are all locked by default, and adding permissions will only open up permissions.
> There are no deny-permissions.

> [!WARNING]
> Some permissions like _If the user has View permissions, allow Read_ require a [Module Context](xref:WebApi.Specs.Context) since that's required to detect if the condition _View Permissions_ is met. 


## Custom WebAPI Permissions

This is documented separately in [](xref:NetCode.WebApi.Security)

## Read also

- [DotNet WebApi](xref:NetCode.WebApi.Index)
- [](xref:WebApi.Specs.Context) - every request has a context, it's best you read up on that
- [Concepts: Polymorphisms](xref:Basics.Polymorphism.Index)

## Demo App and further links

You should find some code examples in this demo App

- [Razor Web API tutorials](xref:Tut.WebApi)
- [REST and WebApi Tutorial](http://2sxc.org/en/apps/app/tutorial-javascript-rest-api-using-jquery-and-angularjs)
- [Mobius Forms App](https://2sxc.org/en/apps/app/mobius-forms)

## History

1. Introduced in 2sxc 5.x
1. Query added in 2sxc 8.10
2. Enhanced with Polymorph Editions in 2sxc 9.35 (allowing edition-folder/api)
