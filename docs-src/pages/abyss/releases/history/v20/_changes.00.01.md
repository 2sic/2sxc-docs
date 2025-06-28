
### 2sxc v20.00.01 (2025-06-28)

> [!WARNING]
> 2sxc v20 is a [MoT Release](xref:Abyss.Releases.Management.PolicyMot), containing many breaking changes.
>
> See [Breaking Changes in v20](xref:Abyss.Releases.History.V20.Breaking) for details.

This 20.00.01 has only minor changes.

#### Enhancements

1. When configuring views, the selection if it's a list or not will automatically toggle the setting `IsList`
1. When upgrading from previous version, the `/DesktopModules/ToSIC_SexyContent/system/` folder will be transferred to the new location.
1. All internal use of global queries was changed to use the correct `System.` prefix
1. Any use now of the old prefix `Eav.Queries.Global.` will throw an error, so you can fix it.
1. The main lists in the Admin UI were enhanced to show some help text.
1. UI button colors were improved to be more consistent.

#### Bugfixes

1. 🐞 Fix: In 2-3 places some things failed because of list changes; eg. copying a query failed.
1. 🐞 Fix: Auto-retrieve license from patrons.
1. 🐞 Fix: In rare cases, changing the field type didn't seem to work.
