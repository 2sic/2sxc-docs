---
uid: Abyss.Platforms.Oqtane.Install.IssueHotReload
---

<img src="~/assets/features/platform-oqtane.svg" width="100%">

# Problems Installing Apps with Hot Reload Enabled

When using Oqtane in **developer mode**, Hot Reload can update or restart the running application when files change.

> [!WARNING]
> Installing Content-Templates and Apps with **Hot Reload** enabled causes problems.
>
> This is because installing the ZIP changes many files and Hot Reload can interrupt the installation.

Install Apps and Content-Templates only while **Hot Reload is disabled**.

> [!TIP]
> After installation, you can re-enable Hot Reload.

## Disable Hot Reload

1. Stop Oqtane.
1. Open `Properties\launchSettings.json` in the Oqtane server project.
1. Set `"hotReloadEnabled": false` in every launch profile you use:

   ```json
   "Oqtane.Server": {
     "commandName": "Project",
     "hotReloadEnabled": false
   }
   ```

1. Restart Oqtane and retry the installation.

When 2sxc detects Hot Reload during an installation, it normally adds `"hotReloadEnabled": false` to launch profiles where the property is missing. It does not overwrite an existing value, so change an existing `true` to `false` yourself. The change only takes effect after restarting Oqtane.

If you use `dotnet watch`, disable Hot Reload for that run with:

```cmd
dotnet watch --no-hot-reload
```

Alternatively, use `dotnet run`, which does not enable Hot Reload.

```cmd
dotnet run -p:hotreloadenable=false
```

## Checklist to Disable Hot Reload Temporarily

<iframe src="https://azing.org/2sxc/r/YUm957D-?embed=1" width="100%" height="400" frameborder="0" allowfullscreen style="box-shadow: 0 1px 3px rgba(60,64,67,.3), 0 4px 8px 3px rgba(60,64,67,.15)"></iframe>

## Background: Hot-Reload Detection

2sxc detects active Hot Reload when the environment variable `DOTNET_MODIFIABLE_ASSEMBLIES` is set to `debug`. Visual Studio and `dotnet watch` set this when the runtime accepts Hot Reload changes.

The check no longer uses `Microsoft.AspNetCore.Watch.BrowserRefresh.dll`, because that assembly can also be loaded when only browser refresh is active and Hot Reload is disabled.

If you believe the detection is incorrect, please open an issue on GitHub.

## Next Step

* To avoid potential build errors, exclude the `2sxc` and `Content` folders from `Oqtane.Server.csproj`. See [Build Oqtane Server Issue](xref:Abyss.Platforms.Oqtane.Install.IssueBuild).

---

Shortlink to here: <https://go.2sxc.org/oqt-hr>
