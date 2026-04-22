---
uid: Extensions.AppExtensions.Create.AppCode.CompilerOptions
---

# App Extensions - Special Compiler Options

In rare cases you must add compiler references for extension AppCode.
Keep this configuration inside the extension AppCode folder so it can be packaged with the extension.

Create a `compile.json` file in:

```text
/AppCode/Extensions/{ExtensionName}/
```

Example:

```json
{
  // References for .net 10+ (Oqtane)
  "References": [],
  // References for .net4 (DNN)
  "References.net4": [
    "System.Net.Http, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a"
  ]
}
```

> [!TIP]
> The example adds `System.Net.Http` for DNN (`References.net4`).
>
> It's also needed if you have custom WebApi controllers returning `HttpResponseMessage`.
> Without this reference, you may encounter compilation errors.

---

## History

1. Beta in v20.09, to be released in v21.00
