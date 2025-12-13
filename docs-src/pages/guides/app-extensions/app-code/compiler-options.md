---
uid: Basics.App.Extensions.AppCode.CompilerOptions
---

# App Extensions - Special Compiler Options

In rare cases the compiler needs to be instructed to do something special.
The configuration must be in the same folder, to ensure its included in the distribution package.

As of now, you must create an `compile.json` file
in the `/AppCode/Extensions/{ExtensionName}/` folder
with content like this:

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
> The above example shows how to add a reference to `System.Net.Http` for DNN,
> which is often needed for making HTTP requests.
>
> It's also needed if you have custom WebApi controllers returning `HttpResponseMessage`.
> Without this reference, you may encounter compilation errors.

---

## History

1. Beta in v20.09, to be released in v21.00
