---
uid: Abyss.Contribute.Docs.Edit.ReferenceYMLFiles
---

# How to Reference Another `yml` File

There are cases where you might want to reference another DocFX project.  
You could do this by using a direct URL — however, this is not recommended, as URLs can change easily.  
A better approach is to reference the `yml` file of the DocFX project directly.

In this example, we reference the `xrefmap.yml` file of the Oqtane documentation:  
[File: xrefmap.yml](https://docs.oqtane.org/xrefmap.yml)

## How to Include It in Your Project

1. Open your `docfx.json` file.
2. Locate the `"build"` section.
3. Add the link to the `xrefmap.yml` file under the `"xref"` property.

```json
"build": {
  "xref": [
    "https://docs.oqtane.org/xrefmap.yml" // Oqtane xref map
  ]
}
```
