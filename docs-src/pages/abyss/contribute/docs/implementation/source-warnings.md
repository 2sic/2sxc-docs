---
uid: Abyss.Contribute.Docs.Implementation.SourceWarnings
---

[!include["many-projects"](../_docs-for-many-projects.md)]

# Adding Warnings to the Source Body

To be certain that users can see which APIs are internal, we have a system that adds warnings under various conditions:

- If the class/interface is from an internal namespace, such as `ToSic.Sys`
- If the class/interfaces has an attribute `[InternalApi_DoNotUse_MayChangeWithoutNotice]`
- If the class/interface has members with the attribute `[InternalApi_DoNotUse_MayChangeWithoutNotice]`

In these cases, a warning is added to the top of the source body, which is visible in the API documentation. This helps users understand that these APIs are not intended for public use and may change without notice.

This is how it's implemented:

1. The script `/templates/[project]/ManagedReference.extension.js` is run by docfx when building the API documentation. We customized it to do the following...

1. There it will do various checks to see if the class/interface is internal, and if so, it will add a warning to the top of the source body.

1. The warnings are added as plain html to the `model._page_alert` (this is done in the `source-tools.js` file).

1. The main template `/templates/[project]/layout/_master.tmpl` will then render this alert in the source body using `{{{_page_alert}}}`.

---

[!include[](~/shared/authors/iJungleboy/_main-author.md)]
