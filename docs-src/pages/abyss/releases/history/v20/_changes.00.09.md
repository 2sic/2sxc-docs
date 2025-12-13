
### 2sxc v20.00.09 (ca. 2025-12-08)

> [!WARNING]
> 2sxc v20 is a [MoT Release](xref:Abyss.Releases.Management.PolicyMot), containing many breaking changes.
>
> See [Breaking Changes in v20](xref:Abyss.Releases.History.V20.Breaking) for details.

This 20.00.09 has a LOT of enhancements, but since we're still stabilizing v20, we are
not incrementing the next number yet.

#### Possibly Breaking Changes

1. Global extension fields (for the edit UI) are now in `/extensions` and not `system` any more #3708.  
    This may affect you if you were loading the GPS/WYSIWYG manually, or had custom extensions in the old path.

#### Major Enhancements

1. 🧩 App Extensions: Lots of enhancements
    1. 🧩 Feature to edit extension definition and store in a JSON in the extensions `App_Data`
    1. 🧩 System can differentiate between installed extensions and extensions being developed in an App, and provide different actions
    1. 🧩 Feature to export an extension incl. extensive infos, file fingerprints, versions, releases
    1. 🧩 Feature to install an extension incl. drag & drop
    1. 🧩 Feature to check if an installed extension was modified (for safer upgrading)
    1. 🧩 Feature to delete an installed extension
    1. 🧩 Extension Settings and language Resources
    1. 🧩 Extensions can now be installed in multiple editions
    1. 🧩 Extensions with input-types and multiple editions will load `staging` if user is developer/host
    1. 🧩 Extensions have a lot of properties and links shown in the quick overview
1. ☢️ Stabilizing DNN CSHTML compiler caching and PDB preservation for better debugging
1. 🌪️ Queries: Published many more System queries which were previously secret, such as `System.ContentTypes`, etc. see [](xref:Basics.Query.SystemQueries)
1. 🥫 DB: Increase SQL timeout because sometimes SQL was sleeping and causing timeouts #3698
1. ❤️‍🔥 OData Support WIP
    1. $select support
    1. $filter support for basic filters (`eq`, `ne`, `gt`, `lt`, `ge`, `le`, `startsWith`, `not startsWith`, `contains`, `not contains`)
    1. $orderby support
1. 💃🏼 Major: Template Service can now create templated entities.
1. 🧑🏼‍✈️ Data Copilot: Ability to configure in detail what should be generated and how (specify alternate folders, namespaces, etc.)

#### Minor Enhancements

1. 🔳 Toolbar: Ability to combine toolbar on a entity-field with `Copy` to add copies of data to a list #3710
1. ✏️🔳 Toolbar & Edit UI: Introduce `UiFields()` on toolbar button Tweak
1. ⚙️ Admin UI: Show more info about fields (such as read-only, required etc. in addition to has-formula) #3694
1. 🌍 Language: Restore Translate All/Link All feature (had been gone for more than 1 year and nobody noticed)
1. ✏️ Edit UI: Improve paste-as-text in WYSIWYG
1. 🖼️ Improve Image Service so it knows about Bootstrap if added through `Kit.Page.Activate(...)` (otherwise image resize/class is off when used in a skin without bootstrap) #3700
1. 🌪️ DataSource: ContentType DataSource can now accept `Scope` of `*` to search through all scopes
1. Add Recaptcha Score field to settings
1. Add loading indicators in various UIs to improve UX
1. Template Service: add parameter to control amount of recursions (default is 0) #3703


#### Bugfixes

1. 🐞 Improve locking / unlocking AppCode.dll which is compiled on the fly #3711
1. 🐞 Fix AppCode reporting compilation errors (were disabled in a previous release)
1. 🐞 Fix languages returned by serialized entities in WebAPIs (some scenarios resulted in wrong language being returned)
1. 🐞 Fix remove a data-source in a VisualQuery #3699
1. 🐞 Fix Edit UI: custom input-fields in the `/system` folder stopped working in 20.00.08 #3693
1. 🐞 Fix history dialog threw error in some cases #367 (eav-ui)
1. 🐞 Fix 2shine theme so that it correctly gets Quick-Edit from the new path #23 (dnn-theme-2shine-bs5)
1. 🪲 🌍 Edit UI: Translate buttons showed up in the primary language when there was only 1 language #3697
1. 🪲 🌍 Edit UI: Translate buttons blocked access to some other buttons on entity-pickers #3701
1. 🪲 🌍 Edit UI: Date Picker - pasting neutral dates like 2025-10-09 had to be fixed #3704
1. 🪲 ☢️ DNN: When code in DNN triggered an HTTP Redirect, it previously logged an exception in DNN #3707
1. 🪲 Minor: fix time zone info in edit-entity-history
1. 🪲 Minor: fix colors of inner-content toolbar
1. 🪲 Minor: fix / enhance Tokens, so multiple fallback-tokens work (previously only 1 was possible) #3702

#### Internal Changes

1. Experimenting with delayed loading of AppCode dll because it may cause issues with anti-virus locking the file at first compile
1. Edit UI Improved SASS to latest standards
1. API renaming: shorten `noParameterOrder` to `npo` as the type already indicates what it is
1. Maintenance: get rid of obsolete warning IHostingEnvironment
1. Maintenance: Update xng-breadcrumb to latest version
1. Maintenance: Update various npm packages to latest versions, incl. AG-Grid #334 (eav-ui)
