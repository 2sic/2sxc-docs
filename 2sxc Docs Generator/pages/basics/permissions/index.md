---
uid: Basics.Permissions.Index
---

<!-- <img src="~/assets/features/image-resizer.svg" class="feature"> -->

# Permissions in 2sxc
<!-- 
[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>  .context-box-summary .image-resizer    { visibility: visible; } </style> -->

2sxc permissions are interlinked with the users and roles of the platform (Dnn or Oqtane).
So if Dnn or Oqtane say a user may do something, 2sxc will follow that.

But there is more to it.
Many situations require some control which the platform doesn't offer.
Here are some examples:

1. Admins in DNN are often just content-editors, and shouldn't be able to reconfigure 2sxc
1. Headles APIs (REST) needs permissions which you cannot set in the platfrom
1. Custom APIs (C# Controllers) need permissions which are not platform-configurable

This section will help you understand how permissions work and where to configure them.

## Platform Permissions

### System Admins aka Super Users (SystemAdmin)

A super-user (host-user) has full permissions on everything.
There is no way to change this.
This means that super users can install, configure, query, edit and delete everything.

In C# you can always detect this on the [`CmsContext.User.IsSystemAdmin`](xref:ToSic.Sxc.Context.ICmsUser)


### Site Admins (SiteAdmin)

Admin users have full permissions on a specific site (Dnn: portal).
So _by default_ they can do everything which only affects the current site.

If you have special Roles such as `2sxcAdministrators` then this can [behave differently](xref:Basics.Permissions.Role.2sxcAdministrators).

In C# you can always detect this on the [`CmsContext.User.IsSiteAdmin`](xref:ToSic.Sxc.Context.ICmsUser)


### Content Admins (ContentAdmin)

Many admins are just configured as admins to allow them to edit everything.
So often the status `Administrator` is only given because it's the only real way
to ensure the user can change every page, without wanting to allow the user to
edit other users or reconfigure the site.

Because of this, we have the concept of **ContentAdmins**

The platforms Dnn and Oqtane currently don't offer a pure content-admin role.
Because of this, 2sxc allows us to do this in another way.

If the site/portal has a role called `2sxcAdministrators` (previously `2sxc Designers`)
then _all_ administrators will be treated as **ContentAdmins** with less permissions.

Any administrator which is then in this role `2sxcAdministrators` will have higher rights.
For further details, see [role 2sxcAdministrators](xref:Basics.Permissions.Role.2sxcAdministrators)

In C# you can always detect this on the [`CmsContext.User.IsContentAdmin`](xref:ToSic.Sxc.Context.ICmsUser)


### Edit Permissions

The platform Dnn/Oqtane can give users **Edit** permissions.
On both platforms this can be assigned at the page as well as the module permission.

Users with edit permissions will be able to edit content or change what layout is used,
but not be able to access advanced admin features.


## App Permissions

For special use cases you may want to give users permissions in a specific App.
For example, a _Classifieds_ App or a _Comments_ App could allow registered users to add their own posts and also edit them.

> [!WARNING]
> Be careful with such permissions, as you don't want to open up your entire App.
> Normally you will only want to assign permissions to a specific **Content Type**.

### Content-Type Edit Permissions

These permissions can be configured at the [Content-Type](xref:Basics.Data.ContentTypes.Index) level.

A typical example would be

* **Registered Users** can create a new **Comment**
* **Registered Users** can read the schema of **Comment** so the edit-UI can be accessed
* **Registered Users** can edit **Comment**s which they own/created

> [!TIP]
> Just because the permissions allow editing doesn't mean the UI will automatically show toolbars.
> This is because you may have special buttons or **My Comments** page or something to do this.
> So don't forget to ensure the UI is available as you want it.


## REST API Permissions (Headless)

To use data on the REST API you must also determine what is allowed.

You can configure this at the App Content-Type level.


## WebApi Controller Permissions

When you create [custom WebApi controllers](xref:NetCode.WebApi.Index),
you will have to use C# attributes to configure permissions.

Please check the examples, ATM we don't have time to document the details.


## Polymorph Editions

The System Admin can also review new code on the live system without affecting other users.
This feature is called [Polymorphism](xref:Basics.Polymorphism.Index).
It is only available to _SystemAdmins_.


## Checking Permissions in Formulas

[Formulas](xref:Basics.Edit.Formulas.Index) allow you to check the basic permissions such as `isSystemAdmin` etc. on the `context.user` object.

Please check the examples, ATM we don't have time to document the details.

---

## History

1. Basic permissions introduced in 2012 for 2sxc 1
1. Special role `2sxc Designers` introduced ca.
