---
uid: Abyss.Platforms.Oqtane.Install.IssueUpgradeOqtane10DuplicateDlls
---

<img src="~/assets/features/platform-oqtane.svg" width="100%">

# Oqtane 6 to 10 Upgrade: Duplicate DLLs Break Razor and AppCode

When upgrading an existing Oqtane 6 installation to Oqtane 10,
the upgraded `Oqtane.Server` folder can contain old framework DLLs in the application root.

This can break 2sxc Razor views and AppCode compilation in older 2sxc versions.

> [!IMPORTANT]
> This issue is fixed in 2sxc 21.08.00 and newer.
> If possible, upgrade 2sxc first instead of manually deleting files.

## Symptoms

After upgrading Oqtane, 2sxc can fail when rendering Razor views or compiling AppCode.

Typical errors include:

```text
CS0433: The type 'AllowAnonymousAttribute' exists in both
'Microsoft.AspNetCore.Authorization, Version=10.0.0.0'
and
'Microsoft.AspNetCore.Authorization, Version=9.0.0.0'
```

Other possible errors:

```text
CS0518: Predefined type 'System.Void' is not defined or imported
CS0433: The type 'List<T>' exists in both 'System.Collections' and 'System.Private.CoreLib'
CS0433: The type 'XmlElement' exists in both 'System.Private.Xml' and 'System.Xml.ReaderWriter'
Could not find file '[Oqtane.Server]\Microsoft.AspNetCore.Authorization.dll'
```

## Affected Upgrade Path

This has been observed with this kind of upgrade path:

1. Install Oqtane 6.1.3.
1. Install 2sxc 20.00.03.
1. Upgrade 2sxc to 21.07.00.
1. Upgrade Oqtane to 10.1.x.
1. Open a page using 2sxc Razor or AppCode.

The problem is not browser-specific and is not caused by the Razor view itself.

## Cause

Oqtane 10 uses newer .NET / ASP.NET Core framework assemblies.
After some Oqtane 6 to 10 upgrades, old or unnecessary framework DLLs can remain in the `Oqtane.Server` root folder.

2sxc dynamically compiles Razor views and AppCode using Roslyn.
Older 2sxc versions could receive compile references from both:

1. the `Oqtane.Server` root folder
1. the correct `refs` folder

If both locations expose different versions of the same framework assembly,
Roslyn can see duplicate types and fail with `CS0433`, `CS0518`, or missing-file errors.

2sxc 21.08.00 fixes this by cleaning the reference set before compiling.
It drops missing paths, groups duplicate assembly identities, prefers reference assemblies,
and avoids runtime implementation assemblies such as `System.Private.*` when proper reference assemblies exist.

## Preferred Fix

Upgrade 2sxc to 21.08.00 or newer.

This is the recommended fix because it makes 2sxc more defensive against duplicate or stale Oqtane compile references.

## Workaround for Older 2sxc Versions

If you must stay on 2sxc 21.07.00 or older,
remove the unnecessary extra files from the `Oqtane.Server` root folder.

> [!WARNING]
> Delete these files only from the `Oqtane.Server` root folder.
> Do not delete files from the `refs` folder, NuGet package cache, .NET shared runtime, or any backup folder.

Recommended process:

1. Stop Oqtane.
1. Backup the complete `Oqtane.Server` folder.
1. Compare the upgraded installation with a clean Oqtane 10.1.x + 2sxc installation if possible.
1. Delete only the known extra root files.
1. Start Oqtane again.
1. Open a page with a 2sxc Razor view or AppCode to force recompilation.

This list is based on comparing an upgraded Oqtane 10.1.x server with a clean Oqtane 10.1.x + 2sxc installation.
If one of these files does not exist in your installation, the delete command can report that it was not found.

Open `cmd.exe` in the `Oqtane.Server` root folder and run:

```cmd
del /f /q "Microsoft.AspNetCore.Authorization.dll" "Microsoft.AspNetCore.Components.Authorization.dll" "Microsoft.AspNetCore.Components.dll" "Microsoft.AspNetCore.Components.Forms.dll" "Microsoft.AspNetCore.Components.Web.dll" "Microsoft.AspNetCore.Cryptography.Internal.dll" "Microsoft.AspNetCore.Cryptography.KeyDerivation.dll" "Microsoft.AspNetCore.Metadata.dll" "Microsoft.Extensions.Caching.Abstractions.dll" "Microsoft.Extensions.Caching.Memory.dll" "Microsoft.Extensions.Configuration.Abstractions.dll" "Microsoft.Extensions.Configuration.Binder.dll" "Microsoft.Extensions.Configuration.dll" "Microsoft.Extensions.Configuration.FileExtensions.dll" "Microsoft.Extensions.Configuration.Json.dll" "Microsoft.Extensions.DependencyInjection.Abstractions.dll" "Microsoft.Extensions.DependencyInjection.dll" "Microsoft.Extensions.Diagnostics.Abstractions.dll" "Microsoft.Extensions.Diagnostics.dll" "Microsoft.Extensions.FileProviders.Abstractions.dll" "Microsoft.Extensions.FileProviders.Physical.dll" "Microsoft.Extensions.FileSystemGlobbing.dll" "Microsoft.Extensions.Http.dll" "Microsoft.Extensions.Identity.Core.dll" "Microsoft.Extensions.Identity.Stores.dll" "Microsoft.Extensions.Localization.Abstractions.dll" "Microsoft.Extensions.Localization.dll" "Microsoft.Extensions.Logging.Abstractions.dll" "Microsoft.Extensions.Logging.dll" "Microsoft.Extensions.Options.ConfigurationExtensions.dll" "Microsoft.Extensions.Options.dll" "Microsoft.Extensions.Primitives.dll" "Microsoft.JSInterop.dll" "Oqtane.Updater.deps.json" "Oqtane.Updater.dll" "Oqtane.Updater.exe" "Oqtane.Updater.pdb" "Oqtane.Updater.runtimeconfig.json" "System.Diagnostics.EventLog.dll" "System.Security.Cryptography.Pkcs.dll" "System.Text.Json.dll" "temp.dll"
```

If you prefer to check before deleting, first run:

```cmd
dir /b "Microsoft.AspNetCore.Authorization.dll" "Microsoft.AspNetCore.Components.Authorization.dll" "Microsoft.AspNetCore.Components.dll" "Microsoft.AspNetCore.Components.Forms.dll" "Microsoft.AspNetCore.Components.Web.dll" "Microsoft.AspNetCore.Cryptography.Internal.dll" "Microsoft.AspNetCore.Cryptography.KeyDerivation.dll" "Microsoft.AspNetCore.Metadata.dll" "Microsoft.Extensions.Caching.Abstractions.dll" "Microsoft.Extensions.Caching.Memory.dll" "Microsoft.Extensions.Configuration.Abstractions.dll" "Microsoft.Extensions.Configuration.Binder.dll" "Microsoft.Extensions.Configuration.dll" "Microsoft.Extensions.Configuration.FileExtensions.dll" "Microsoft.Extensions.Configuration.Json.dll" "Microsoft.Extensions.DependencyInjection.Abstractions.dll" "Microsoft.Extensions.DependencyInjection.dll" "Microsoft.Extensions.Diagnostics.Abstractions.dll" "Microsoft.Extensions.Diagnostics.dll" "Microsoft.Extensions.FileProviders.Abstractions.dll" "Microsoft.Extensions.FileProviders.Physical.dll" "Microsoft.Extensions.FileSystemGlobbing.dll" "Microsoft.Extensions.Http.dll" "Microsoft.Extensions.Identity.Core.dll" "Microsoft.Extensions.Identity.Stores.dll" "Microsoft.Extensions.Localization.Abstractions.dll" "Microsoft.Extensions.Localization.dll" "Microsoft.Extensions.Logging.Abstractions.dll" "Microsoft.Extensions.Logging.dll" "Microsoft.Extensions.Options.ConfigurationExtensions.dll" "Microsoft.Extensions.Options.dll" "Microsoft.Extensions.Primitives.dll" "Microsoft.JSInterop.dll" "Oqtane.Updater.deps.json" "Oqtane.Updater.dll" "Oqtane.Updater.exe" "Oqtane.Updater.pdb" "Oqtane.Updater.runtimeconfig.json" "System.Diagnostics.EventLog.dll" "System.Security.Cryptography.Pkcs.dll" "System.Text.Json.dll" "temp.dll"
```

## What Not to Delete

Do not delete:

1. files in `[Oqtane.Server]\refs`
1. `Oqtane.Server.dll`
1. `Oqtane.Client.dll`
1. `Oqtane.Shared.dll`
1. `ToSic.*.dll`
1. app or module DLLs which are not in the list above

## Related

* [GitHub issue 3768](https://github.com/2sic/2sxc/issues/3768)
* [](xref:Abyss.Platforms.Oqtane.Install)

---
