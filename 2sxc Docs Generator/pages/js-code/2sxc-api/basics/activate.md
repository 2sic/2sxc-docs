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

History

1. Added the script method ca. v4
1. Added the Edit.Enable v9.30
1. Created Page.Activate ca. v13 and v14