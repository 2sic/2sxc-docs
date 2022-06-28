---
uid: Api.Js.SxcJs.CommandCodeParams
---
### Buttons with Custom Code in a Toolbar

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .edit-custom { visibility: visible; } </style>

In some cases you want to add buttons to a toolbar, which run custom JavaScript code. 

### How to use v10+

Here's a basic example showing a 2sxc-toolbar with a custom code:

```html
@Edit.Toolbar(toolbar: new [] { "toolbar=empty", "custom?call=helloCustom" })

<script>
  function helloCustom(context, event) {
    alert('hello from custom button');
  }
</script>
```

For old use, check out the [Custom Code in V9](xref:JsCode.Commands.CustomCode.V9) section.


### Read also / Demos / Tutorials

* [commands](xref:JsCode.Commands.Index) 
* [JS Manage / Toolbar API Tutorial App](xref:App.TutorialJsToolbars)


### History

1. Introduced in 2sxc v08.06
1. Improved with `call` for v10+

---