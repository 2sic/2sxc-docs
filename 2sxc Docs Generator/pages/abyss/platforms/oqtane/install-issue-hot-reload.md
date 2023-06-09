---
uid: Abyss.Platforms.Oqtane.Install.IssueHotReload
---

<img src="~/assets/features/platform-oqtane.svg" width="100%">

# Problems Installing Apps with Hot Reload Enabled

When using Oqtane in **developer mode** there is a feature called **Hot Reload** which restarts Oqtane when files change. 

> [!WARNING]
> Installing Content-Templates and Apps with **Hot Reload** enabled causes problems.
>
> This is because the server will restart a few times during installation of the ZIP. 

Because of this you can only install Apps and Content-Templates if **Hot Reload is disabled**. 

> [!TIP]
> After installation you can re-enable Hot-Reload as you see fit. 

## Checklist to Disable Hot Reload Temporarily

<iframe src="https://azing.org/2sxc/r/YUm957D-?embed=1" width="100%" height="400" frameborder="0" allowfullscreen style="box-shadow: 0 1px 3px rgba(60,64,67,.3), 0 4px 8px 3px rgba(60,64,67,.15)"></iframe>

## Background: Hot-Reload Detection

Just FYI in case the error is wrong / surprising. We detect Hot-Reload-Enabled by checking that this DLL is loaded in memory:

* `Microsoft.AspNetCore.Watch.BrowserRefresh.dll`

If you believe that we are checking this incorrectly, please open an issue on Github. 

---

Shortlink to here: https://go.2sxc.org/oqt-hr