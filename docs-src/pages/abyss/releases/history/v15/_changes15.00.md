
### Changes in 2sxc 15.00 (2022-12-23)

1. ✅ Improve logging
    1. ✅ Place it in an own library DLL for better reuse
    1. ✅ Create ICodeLog for improve logging in Razor and WebApi which ensures compatibility with existing code
    1. ✅ Improve automatic connecting logs with helpers so most `Init(Log)` become obsolete
1. ✅ Update CsvHelper DLL to latest version
1. ✅ Improve install-file names
1. ✅ Update to Razor Blade 4
1. ✅ ~~Support Oqtane v4 with .net 7~~ - ATM Oqtane doesn't plan on going to .net 7
1. ✅ Tutorial App
    1. ✅ Improve internal structure
    1. ✅ Change how to show code vs results - mostly use tabs
1. ✅ Razor APIs and Services
    1. ✅ Improve `ImageService` to have an `imgAltFallback` on `.Img()`, `.Picture()` and `.ImgOrPic()`
    1. ✅ Improve `ImageService` to better respect multi-language crop-settings and labels
    1. ✅ Improve `Page` service `Parameters.Set(...)` to also allow bool, int etc. (not just strings)
    1. ✅ Create Kit.HtmlTag
    1. ✅ Create `ITurnOnService` and `Kit.Page.TurnOn(...)`
1. ✅ Data Sources
    1. ✅ Improve `ValuFilter` Data Source to also allow `Contains` on numbers
1. ✅ DB Clean-Up
    1. ✅ Remove SQL triggers which log XML data to `DataTimeline` which isn't used any more
    1. ✅ Remove XML column `NewData` in `DataTimeline` which isn't used any more
1. ✅ Internal APIs
    1. ✅ Improve Settings/Resources Stack with various unit tests
    1. ✅ Improve Settings/Resources Stack to have internal quick access to deep objects using a path like `"Images.Content.Width"`
    1. ✅ Create API `DependenciesBase` to better handle log attachments to dependencies
1. ✅ TinyMCE upgrade to v6
1. ✅ Drop `_` prefix requirement on cshtml files by protecting them in an another manner
    1. ✅ It's not needed on Oqtane, as the files are not accessible
    1. ✅ Only needed ATM on DNN because each file could be called from the browser directly
    1. ✅ Probably make sure all base classes refuse to render standalone
1. ✅ Ability to use compressed GZIP data for DataTimeline (patrons)
    1. ✅ Technical features
    1. ✅ Toggle to turn on/off
1. ✅ Rename internal `.data` folder to `App_Data/system` and similar as this folder will contain private data in future
1. ✅ Feature to deploy a corporate license in an installation to auto-enable certain features on all sites
1. ✅ Settings: Ability to augment the preset configuration / settings with custom overrides
1. ✅ Provide Google Services API Keys (Maps, Translate) from backend to edit UI
1. ✅ Ability to set own default GPS coordinates for when not set
    1. ✅ Ability to configure them in settings
    1. ✅ Provide Default maps coordinates from backend to Edit UI
1. ✅ Ability to import apps from folder directly (patrons)
    1. ✅ Functionality
    1. ✅ Hints / Infos to user
    1. ⏳ Documentation
1. ✅ Integration of Google Translate in the Edit UI
    1. ✅ Functionality for one field
    1. ✅ For many fields
    1. ✅ Configure so it only affects string fields
    1. ✅ Ability to disable auto-translate on certain fields - eg. name fields
    1. ✅ Ability to add custom API key
    1. ✅ Clear warning when using the demo key
    1. ✅ Make sure the license is respected and easy to spot
    1. ⏳ Documentation for this (how the fields are selected, how to activate, etc.)
1. ✅ Release v15 before XMas
