
### 2sxc v20.00.09 (ca. 2025-12-08)

> [!WARNING]
> 2sxc v20 is a [MoT Release](xref:Abyss.Releases.Management.PolicyMot), containing many breaking changes.
>
> See [Breaking Changes in v20](xref:Abyss.Releases.History.V20.Breaking) for details.

This 20.00.09 has a LOT of enhancements, but since we're still stabilizing v20, we are
not incrementing the next number yet.

#### Enhancements

1. 
1. 🧩 App Extensions: Feature to edit extension definition and store in a JSON in the extensions `App_Data`
1. 🧩 App Extensions: System can differentiate between installed extensions and extensions being developed in an App, and provide different actions
1. 🧩 App Extensions: Feature to export an extension incl. extensive infos, file fingerprints, versions, releases
1. 🧩 App Extensions: Feature to install an extension incl. drag & drop
1. 🧩 App Extensions: Feature to check if an installed extension was modified (for safer upgrading)
1. 🧩 App Extensions: Feature to delete an installed extension
1. 🧩 App Extensions: Extension Settings and language Resources
1. 🌍 Language: Restore Translate All/Link All feature (had been gone for more than 1 year and nobody noticed)
1. 🔬 
1. ✏️ Edit UI: Improve paste-as-text in WYSIWYG
1. ✏️🔳 Toolbar & Edit UI: Introduce `TODO` TOOLBAR
1. ☢️ Stabilizing DNN CSHTML compiler caching and PDB preservation for better debugging
1. DB: Increase SQL timeout because sometimes SQL was sleeping and causing timeouts
1. Minor: Add Recaptcha Score field to settings
1. Minor: Add loading indicators in various UIs to improve UX


#### Bugfixes

1. 🐞 Improve locking / unlocking AppCode.dll which is compiled on the fly
1. 🐞 Fix AppCode reporting compilation errors (were disabled in a previous release)
1. 🐞 Fix languages returned by serialized entities in WebAPIs (some scenarios resulted in wrong language being returned)
1. 🐞 Fix remove a data-source in a VisualQuery
1. 🪲 🌍 Edit UI: Translate buttons showed up in the primary language when there was only 1 language
1. 🪲 🌍 Edit UI: Translate buttons blocked access to some other buttons on entity-pickers
1. 🪲 ☢️ DNN: When code in DNN triggered an HTTP Redirect, it previously logged an exception in DNN
1. 🪲 Minor: fix time zone info in edit-entity-history
1. 🪲 Minor: fix colors of inner-content toolbar
1. 🪲 Minor: fix / enhance Tokens, so multiple fallback-tokens work (previously only 1 was possible)

#### Internal Changes

1. Experimenting with delayed loading of AppCode dll because it may cause issues with anti-virus locking the file at first compile
1. Edit UI Improved SASS to latest standards
1. API renaming: shorten `noParameterOrder` to `npo` as the type already indicates what it is
1. Maintenance: get rid of obsolete warning IHostingEnvironment
1. Maintenance: Update xng-breadcrumb to latest version
1. Maintenance: Update various npm packages to latest versions
