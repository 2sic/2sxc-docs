
### 2sxc v20.00.05 (2025-08-26)

> [!WARNING]
> 2sxc v20 is a [MoT Release](xref:Abyss.Releases.Management.PolicyMot), containing many breaking changes.
>
> See [Breaking Changes in v20](xref:Abyss.Releases.History.V20.Breaking) for details.

This 20.00.05 has really nice enhancements, but since we're still stabilizing v20, we are
not incrementing the next number yet.

#### Enhancements

1. 🥫⚡ Razor Partial Caching introduced (🦸🏼 Patron Performance)
1. 🥫⚡ Razor API `@Configuration.PartialCache(...)` to configure RazorPartialCaching
1. 🪪 New `UserElevation` to determine that caching is enabled/disabled for certain levels
1. 🅰️ Admin UI now better indicates clickable areas.
1. 🅰️ Admin UI now has more consistent save/close buttons.
1. 🅰️ Admin UI now supports ctrl+enter in most dialogs to close and save. #TODOC / #TOBLOG
1. 🧑🏼‍💻 Install App: Ability to take any app and use it as a template (so give it a new name/GUID) #TODOC
1. 🩸 Oqtane: Improve install using more SQL to work around problems with incremental updates.
1. 🔬 Formula: Introduce `context.user.roles` to let formulas check user roles.
1. 🔬 Formula: Introduce `context.user.isContentEditor` to match latest DNN 10 features.


#### Bugfixes

1. 🐞 `IsAnonymous` always returned false since ca. v20.00.00.
1. 🐞 Data load chunking in Patron-Performance mode had a default of 25k which didn't work well in older SQL servers.
1. 🐞 When an App is loaded from another site, the path was wrong and file-based content types were not loaded, causing issues.
1. 🐞 Mobius: System expected encrypted HTTP Net Posts even if not enabled.
1. 🐞⚡ LightSpeed: Bug that View couldn't enable LightSpeed even if app was "unset" (null) instead of false
1. 🩸 Oqtane: Bug JS exceptions during dev situation "No interop methods are registered for renderer 1"
1. 🩸 Oqtane: Bug where old DB tables were recreated after schema update, resulting in old and new tables to be in the DB.
1. 🪲 Minor: Data History: fix date to use UTC (previously used server time.)


#### Internal Changes

1. ☢️ DNN: Improved time shown in Insights when a module is being rendered in DNN
1. 🩸 Oqtane: Update dependencies to Oqtane 6.1.3 and update Asp.Net Core packages to 9.0.5.
1. 🩸 Oqtane: Sync internal settings-names with the new convention already in use in DNN.
