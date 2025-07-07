
### 2sxc v20.00.02 (2025-07-07)

> [!WARNING]
> 2sxc v20 is a [MoT Release](xref:Abyss.Releases.Management.PolicyMot), containing many breaking changes.
>
> See [Breaking Changes in v20](xref:Abyss.Releases.History.V20.Breaking) for details.

This 20.00.02 has only minor changes.

#### Enhancements

1. Admin Features Management - introduce search
1. Improve help when `web.config` is missing for Razor files which are used within `Html.Partial(...)`.
1. Color enhancements in Admin UI, now more consistent.


#### Bugfixes

1. 🐞 Edit data (like App Settings) without WYSIWYG caused JS issues
1. 🐞 Edit view caused some issues
1. 🐞 Typed API - using Children containing null entry will filter that


#### Internal Changes

1. Improved internal namespaces, now everything should be in `.Sys`
1. 🩸 Oqtane: client lib does not use the 2sxc sys lib any more (not necessary, speeds up client rendering)
1. Update Google Maps key to latest version.
1. Drop complexity with MyServiceBase
1. Renamed `MyServices` to `Dependencies`
