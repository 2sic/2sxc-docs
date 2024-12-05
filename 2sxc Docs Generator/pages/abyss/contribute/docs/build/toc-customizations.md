---
uid: Abyss.Contribute.Docs.Build.TocCustomizations
---

[!include["many-projects"](../_docs-for-many-projects.md)]

# How the API-Navigation (TOC) Works

The API navigation can be quite tricky, because the default docfx behavior results in a very hard-to-use TOC-menu on the side.
Because of this, we use a special trick where a JavaScript in `layout\oqtane\toc.extension.js` optimizes the names based on some rules.

Here's what it does

1. Most root namespaces are "flattened" so that the initial menu has most of the namespaces visible.

1. In addition, it looks up if the namespace has metadata (in the `namespace-metadata.js`) to give it better colors and icons.

---

[!include[](~/shared/authors/iJungleboy/_main-author.md)]
