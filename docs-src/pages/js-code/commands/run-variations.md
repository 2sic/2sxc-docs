---
uid: JsCode.Commands.RunVariations
---
# Various Run Commands

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .edit-custom { visibility: visible; } </style>

The API of 2sxc has changed with time, and we try ensure all samples include the latest best practices. 

But sometimes you'll stumble over old code or old samples, so we believe it's important you understand the differences. 

## Newest CMS Run on the Sxc Object

As of v13.03+, you should always use the `.cms.run(...)` command on the [Sxc](xref:JsCode.Commands.Index) object.

It always expects an object such as this:

```js
$2sxc(moduleId).cms.run({ action: "edit" });
$2sxc(moduleId).cms.run({ action: "edit", params: { entityId: 27 } });
$2sxc(moduleId).cms.run({ action: "edit", params: { entityId: 27 }, event: event });
```

This may feel a bit complicated, but it's to ensure that the API doesn't change as we add new features.

> [!TIP]
> This is the only recommended run API we recommend as of now. 
>
> It also supports workflows, so you can add code to intercept what happens, 
> such as preventing page reloads after an edit command.

_This was introduced ca. 2sxc v13.03._

## Global CMS Run on the $2sxc Object

The `$2sxc.cms.run(...)` is also available, but it's not recommended.

It has many different overloads with different kinds of parameters which tend to confuse developers. 

Since most run-commands also need a context, you must provide this on the global `run(...)`.
If you would use the `Sxc.cms.run(...)` above, this isn't necessary as the context is known.

_This was introduced ca. 2sxc v9.30._


## Old Manage Run on the Sxc objects

Previous versions of 2sxc had similar functionality on

* `$2sxc.manage.run(...)`
* `$2sxc(moduleId).manage.run(...)`

These continue to work for compatibility reasons, but we highly recommend using the new `.cms.run(...)` instead.

An important difference for the old `manage.run(...)` 
is that you could just write the [command name](xref:Api.Js.SxcJs.CommandNames) into the call, 
such as `$2sxc(moduleId).manage.run("edit")`.

This may feel simpler, but it led to a lot of difficulties when more parameters were needed. 
This resulted in JS code that tries to guess what parameter was meant for what, so it's just not recommended.

Some old examples:

```html
<!-- quick version with name only --> 
<a onclick="$2sxc(this).manage.run('layout', event)">
    change layout
</a>

<!-- expanded version -->
<a onclick="$2sxc(this).manage.run({ action: 'layout' }, event)">
    change layout
</a>

<!-- expanded version with many params -->
<a onclick="$2sxc(this).manage.run({ action: 'new', contentType: 'BlogPost' }, event)">
    createBlogPost
</a>
```

These examples example gets the $2sxc-controller related to the `<a>` tag using `$2sxc(this)` and thereby giving it a context so it knows what module-id, etc. Then it executes the command. 


_This was introduced ca. 2sxc v4.0._

> [!WARNING]
> Remember this is a depracecated API. 
> It's only included to better understand old code. 
> Use the new API. 

---

## History

1. Introduced old method ca. v4
2. Official API since 2sxc 08.06
3. Improved in 9.30
4. Massively improved in 13.03
