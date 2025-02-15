---
uid: Abyss.Contribute.Docs.Implementation.Permalink
---

[!include["many-projects"](../_docs-for-many-projects.md)]

# Docs: Find Permalink Implementation

> [!WARNING]
> This is a technical documentation about how the documentation system works.
> It helps the core team understand how to maintain and enhance the documentation system.
>
> It's not meant for most contributors, as it's too technical.

## Goals

1. We want to be able to link to docs easily from external places
1. These links should not break when the docs change
1. ...so we need the ability to update the target if the docs ever do change
1. The link should be obvious where it goes, if ever something more dramatic is changed
1. Most links will link to code, such as namespaces etc.
1. The links should be obvious where they _should_ go, in case things still change - so no cryptic /xy920f


## The Parts that Make it Work

1. DocFx uses the concept of `XREF` links, which are either API references, or documentation pages having a `uid`.
1. Inside DocFx this is used extensively, and to make sure the docs don't change, are also maintained.
1. On each compile of the docs, a `xrefmap.yml` is created in the _dist_, which maps all `uid` to the actual URL.
1. We can also introduce custom redirects for older XREFS which changed, in the `xrefmap.yml` in the _source_.

Now all we need is

1. A JavaScript which loads the final/latest `xrefmap.yml` and can resolve the `uid` to the URL
1. A page which runs this JS, takes the `xref=` parameter from the URL and redirects to the target URL
1. Some minor options to cancel the redirect etc. for better debugging.

## Implementation

1. The `xrefmap.yml` is loaded by the `xref.ts` script in the `shared-global` template
1. The `xref.ts` script is loaded on all pages, so it's always available
1. ...but it checks if it's on the special `find.html` page, and only runs there
1. The `xref.ts` script will parse the URL, look for `xref=` and then redirect to the target URL
1. If the target URL is not found, it will show a message and not redirect
1. If the target URL is found, it will redirect after 1 second

In addition, there is a bit more magic on the `fid.html` page (which comes from the `find.md` markdown file):

* The `find.html` page has some named HTML elements where the JS will place the values for better understanding and debugging.
* It also has instructions so the user could - for 1 second - see what's happening and could cancel the redirect.
* It also has a hidden element which will be shown if the user cancels the redirect.

---

## History of the Find Permalink System

* ca. 2022 introduced it as `/xref.html` and the shortlink go.2sxc.org/xref17 (as we initially thought we want the 2sxc version in there)
* 2024-12-12 reduced the time to redirect to 1 second
* 2025-02-15 changed to use `find.html`, enhanced instructions and updated the redirects
* 2025-02-15 changed the main redirect to be `https://go.2sxc.org/find` instead of `xref` and without the version number
* 2025-02-15 updated the documentation for clarity and accuracy
* 2025-02-15 added more detail on the handling of `uid` in `xref.ts`
