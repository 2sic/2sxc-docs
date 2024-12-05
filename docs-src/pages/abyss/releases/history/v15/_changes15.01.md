
### Changes in 2sxc 15.01 (2023-01-31)

1. ✅ Export / Import
    1. ✅ Create export bundle configuration to mark content-types and entities for export together
    1. ✅ Create json bundle export system
    1. ✅ Create json bundle import system
    1. ✅ Extend the file-based data loader to also load bundles
    1. ✅ Change all pre-loaded data items to be in bundles
1. ✅ New Auto-Installer with search, list-view etc.
1. ✅ Remaining docs for Features released in v15.00
    1. ✅ Finish API and docs for Logging v15.01
    1. ✅ Ability to import apps from folder directly (patrons)
    1. ✅ Documentation for google translate (how the fields are selected, how to activate, etc.)
1. ✅ Indicate premium/patron features in UI and explain what it is and how to get it
    1. ✅ Visual indicators on buttons
    1. ✅ Visual messages in certain places
    1. ✅ Details dialog to know more about the feature
    1. ✅ Public DB of the feature explaining it in more details, how to activate etc. on <https://patrons.2sxc.org/features>
1. ✅ Licenses / Features
    1. ✅ Ability to license a specific feature only (for enterprise customers)
    1. ✅ Feature to generate enterprise license fingerprints for enterprise distribution
    1. ✅ Allow parts of the license to expire earlier (for evaluation purpose)
1. ✅ Internal / Data Management
    1. ✅ Ability to retrieve Entities for App, parent-App, global-App etc. for certain settings-pickers
    1. ✅ System query to retrieve such entities (need for Wysiwyg-functionality)
1. ✅ Oqtane: fix compatibility so it works in Oqtane 3.3+
1. ✅ FIPS Compliance  
      Note that the image resizer is not yet FIPS compliant, and it may take a while for it to become compliant
    1. ✅ Change Secure Data Service to be FIPS compliant
    1. ✅ Change System fingerprint to use FIPS compliant SHA256
1. ✅ Internal - re-org ApiKeys for UI to be in a better place
1. ✅ Enhance Page DataSource with community requests