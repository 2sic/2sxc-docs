---
uid: JsCode.2sxcApi.Obsolete.$2sxc.CmsV9
---

# The _OLD_ $2sxc.cms.run(...) API v9.30

> [!WARNING]
> This is documentation for an old feature. 
> You should use the [new one instead](xref:Api.Js.SxcJs.SxcGlobalCms)

## How to use (v9.30)

Before you start, ensure you have the necessary JS scripts loaded. 
See [](xref:JsCode.2sxcApi.Activate.Index).

Simple example:

```razor
<script>
    // simple function to run the command and handle the returned promise
    function addProject(tag) {
        $2sxc.cms.run(tag, "new", { contentType: "Project"})
            .then(function () {
                alert("Thanks - we'll review your entry and publish it.")
            });
    }
</script>

<span onclick='window.addProject(this)'>
    add your project
</span>

```

1. the first parameter is an HTML tag in the DOM, which is used to look up the context automatically (see [edit-context](xref:Basics.Browser.EditUx.EditContext))
1. the second parameter is the verb for the [cms-command](xref:JsCode.Commands.Index) to run
1. the third parameter is additional parameters for that command


## Demo App and further links

* [Tutorial app for Public Forms](https://2sxc.org/en/apps/app/tutorial-public-forms-with-2sxc-9-30)
* [Blog Recipe for using Public Forms with 2sxc](https://2sxc.org/en/blog/post/recipe-create-public-forms-with-2sxc)


## History

1. Introduced in 2sxc 09.30
1. Made obsolete with new `RunParams` in 2sxc 12.10 to support registering `workflows` - see [](xref:Api.Js.SxcJs.SxcGlobalCms)