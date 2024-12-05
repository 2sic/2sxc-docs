---
uid: JsCode.Tips.Index
---

# JavaScript Tips

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .browser-all { visibility: visible; } </style>

Sometimes you just need a simple trick to get things working. We're collecting the most important ones here.

## Delay your Scripts till the Page is ready

If your script runs too early, you will run into problems. 
Best use [turnOn](xref:JsCode.TurnOn.Index).

## Use Module ID to point your JS to your Module

Often you need to your script to work with your module only, and not accidentally work on other HTML.
The best solution is also to use [turnOn](xref:JsCode.TurnOn.Index).

Alternatively you can dynamically write your JavaScript. 
Here's how you can do it using Razor (Example from the [](xref:App.Blueimp)):

```html

<div id="blueimp-gallery-items-@Dnn.Module.ModuleID" style="display:none;">
  <!-- stuff -->
</div>

<script type="text/javascript">
    $(document).ready(function () {
        // initialize the carousel gallery
        blueimp.Gallery($('[data-gallery="#blueimp-gallery-@Dnn.Module.ModuleID"]').get(), {
                container: '#blueimp-gallery-@Dnn.Module.ModuleID',
                carousel: true
            }
        );
    });
</script>

```

The example above will replace `@Dnn.Modul.ModuleID` on the server with the module instance id, so each use on the same page will result in another unique ID.