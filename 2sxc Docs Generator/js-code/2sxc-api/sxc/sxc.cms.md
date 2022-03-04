---
uid: JsCode.2sxcApi.Sxc.Cms
---

# `cms` Service of the Sxc Instance

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .interact-2sxc { visibility: visible; } </style>

Very often your JS will want to execute CMS related commands, like opening the edit dialog. 

The `cms` object on the Sxc-Instance is responsible for this. 
It's very similar to the global [`$2sxc.cms` object](xref:JsCode.2sxcApi.$2sxc.Cms), except that it already knows what context it's running in. 

> [!NOTE]
> This was introduced in 2sxc v13.03.
> It should replace most of the 

As of now, the `cms` object only has one command called `run(...)`.

## `run` Command

The run command only has one signature:

```js
 run<T>(runParams: RunParams): Promise<void | T>
```

This is similar to the global [run](xref:JsCode.2sxcApi.$2sxc.Cms) but it already knows the context it's running in. 




---
## Tutorial

TODO

---

## Demo App and further links

* TODO

## History

1. Created in v13.03