---
uid: NetCode.Conventions.Functional
---

# Convention: Functional API (Immutable)

There are many programming paradigms.
One that's become very important to us is **functional** programming.

This means that code (usually functions) will have inputs and outputs, but no side effects.
This also means that an object which must be modified will be copied into a new object, with the modifications applied.
The original object is never modified.
In most cases it will be discarded.
This is strongly related to [immutability](xref:NetCode.Conventions.Immutable)

> [!IMPORTANT]
> This was not always our approach, so some of the code is still not functional.
> But you must assume that anything you find which is not functional, will be so in the future.

## Example

This assumes code inside a Razor page, as it uses `Kit.Toolbar`

```c#
// Create a toolbar with a single edit button
var toolbar = Kit.Toolbar.Empty().Edit();

// Add a button to the toolbar
var toolbarWithLayout = toolbar.Layout();

// Note that as of now, the original toolbar still only has the Edit button.

```

This goes even further.
In v15.07 the toolbar API was extended with features to make UI settings more robust:

```c#

// Give an inner tweak function to set more properties
var toolbar = Kit.Toolbar.Edit(tweak: b => b.Color("red").Tooltip("Edit here"));

```


## Why Functional?

Functional programming has many advantages, but the most important one is that it's easier to test and debug.
It's also easier to understand, because you can see the inputs and outputs of a function, without having to look at the code.
In the end, the quality and robustness of our application is much better.

## Coverage - Parts of 2sxc which are Functional

1. The Toolbar API on `Kit.Toolbar` is 100% functional (new v14)
1. The Razor HTML Tags API on `Kit.HtmlTags` is 100% functional (new ca. v13)
1. Page Parameters `CmsContext.Page.Parameters` are 100% functional (new ca. v12)
1. Linking data sources using the `Link` property is 100% functional (new in v15)

---

## History

* Introduced gradually starting with 2sxc 12
* RazorBlade started doing this in v3 also in 2sxc 13

Shortlink: <https://go.2sxc.org/functional>
