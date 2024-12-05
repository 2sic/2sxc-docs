---
uid: JsCode.2sxcApi.Activate.Index
---

# Activate 2sxc JavaScript APIs on a Page

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .interact-2sxc, .context-box-summary .edit-custom { visibility: visible; } </style>

[!include[](activate_intro_inc.md)]

## Activate the JS APIs in v13+

[!include[](activate_v13_inc.md)]


## Activate JS APIs in v9.30+

Since v9.30, you can activate the JS APIs using the Razor `@Edit.Enable(...)` function.

> [!WARNING]
> Avoid this if possible, as we plan to phase it out in the next few years.

```razor
<div>
    @Edit.Enable(js: true)
</div>
```

You can also enable more features, like these:

```razor
<div>
    @Edit.Enable(api: true, forms: true, context: true, autoToolbar: false)
</div>
```

## Activate the JS APIs in Older Versions

Before 2sxc 9.30 there was no real API to do this.
You had to use a `<script>` tag like this:

<script src="/desktopmodules/tosic_sexycontent/js/2sxc.api.min.js" data-enableoptimizations="100"></script>

> [!WARNING]
> Avoid this if possible, as we plan to phase it out in the next few years.

---

## How Things Work Internally

Each template that needs the $2sxc-file when not logged in must include it, to be sure it's always there when needed.
Note that we've included various features to prevent duplicate execution.

1. if the file is included multiple times, it will only execute once
2. if the file is included [minified](xref:Basics.Server.AssetOptimization.Index) and unminified, it too will only be executed once
3. if you need to debug the JS for whatever reason with [F12 in the browser](http://2sxc.org/en/blog/post/debugging-javascript-errors-with-a-modern-browser-and-f12-(200)) a sourcemap is included

Note that the only global variable on `window` created is the `$2sxc`.

---

History

1. Added the script method ca. v4
1. Added the Edit.Enable v9.30
1. Replaced `Edit.Enable(js:true)` with the new `IPageService.Activate("2sxc.JsCore")` in v13.0
