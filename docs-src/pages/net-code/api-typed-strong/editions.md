---
uid: NetCode.StrongTypedCode.Editions
---

# Editions, Polymorphism and Open-Heart Surgery in 2sxc 17+

2sxc supports the concept of Polymorphism in which an App can exist in multiple editions.
This is used for many things, including:

* Different output based on the CSS-Framework used
* staging code which is run for developers, while live code is run for normal users

➡️ [read more about Polymorphism](xref:Basics.Polymorphism.Index)

## Editions and AppCode

The `AppCode` folder can be in multiple places

* `/AppCode` - the default, which is used for the root edition
* `/[any-folder]/AppCode` - used for any edition

Examples

* `/staging/AppCode` - used for the staging edition
* `/live/AppCode` - used for the live edition
* `/bs3/AppCode` - used for the Bootstrap 3 edition
* `/bs5/AppCode` - used for the Bootstrap 4 edition

> [!IMPORTANT]
> Every edition is standalone, so the AppCode will be compiled into an own DLL
> and provided to the Razor files in that edition only.
>
> This also means that once an edition has it's own code, it cannot share code with other editions.

So you will typically have only a primary `/AppCode` folder, OR many in various editions.

### Typical Setup for Output Polymorphism

If you are just creating different HTML for different CSS Frameworks, then this will be your typical setup:

* `/AppCode` - the default / shared AppCode
* ~~`/bs3/AppCode`~~ - do not create AppCode folders inside the editions!
* `/bs3/*.cshtml` - Razor files only, will use the default AppCode
* `/bs4/*.cshtml` - Razor files only, will use the default AppCode
* `/bs5/*.cshtml` - Razor files only, will use the default AppCode

### Typical Setup for Open-Heart Surgery Polymorphism

Since you want to develop different code in the staging edition, you will typically have this setup:

* ~~`/AppCode`~~ - do not create a root AppCode, as it won't be used
* `/staging/AppCode` - the staging edition
* `/staging/*.cshtml` - Razor files will use the staging AppCode
* `/live/AppCode` - the live edition
* `/live/*.cshtml` - Razor files will use the live AppCode

## Generating Data Models with Editions

The [Copilot Data Generator](xref:NetCode.Copilot.DataModelGenerator) will generate C# classes for all the content types.
It can do this for multiple editions, so that each edition has it's own set of classes.
This is mainly important for staging/live scenarios.

To set this up, add the `editions` section to the `app.json` file.
We also highly recommend setting one of them to `"isDefault": true` so this will be the recommended target.

```json
{
  "editions": {
    "staging": {
      "isDefault": true,
      "description": "This is the staging edition of the app",
    },
    "live": {
      "description": "This is the live edition of the app",
    }
  }
}
```

➡️ [read more about the app.json file](xref:Basics.App.FoldersAndFiles.AppJson)

---

## History

* Introduced in v17.03
