---
uid: NetCode.StrongTypedCode.RazorBaseClasses
---

# Custom Razor Base Classes in 2sxc 17+ WIP

In 2sxc 17+ you can create custom base classes for your Razor files.

There are some good reasons to do this, for example:

1. Make sure that `App.Settings` and `App.Resources` are strong-typed (not just an `ITypedItem`)
1. Provide additional helpers which are complex and make the Razor file look complex
1. Pre-Convert data to strong-typed objects, so the Razor file is simpler

Here is an example of such a file in `/AppCode/Razor/AppRazor.Generated.cs`:

```csharp
using AppCode.Data;
using ToSic.Sxc.Apps;

/// <summary>
/// WIP Autogenerating not yet implemented
/// </summary>
namespace AppCode.Razor
{
  public abstract partial class AppRazor: AppRazor<object>
  {

  }

  /// <summary>
  /// todo
  /// </summary>
  public abstract partial class AppRazor<TModel>: Custom.Hybrid.RazorTyped<TModel>
  {
    /// <summary>
    /// Typed App with typed Settings & Resources
    /// </summary>
    public new IAppTyped<AppSettings, AppResources> App => _app ??= Customize.App<AppSettings, AppResources>();
    private IAppTyped<AppSettings, AppResources> _app;
    
  }
}
```

> [!NOTE]
> The above code may look auto-generated, but there is no generator as of now.
> We will create one though, and it will do things similar to this.

## The Magic Explained

The code above (which is not yet final as of 2sxc 17.03) does the following:

1. It creates a new base class `AppRazor` which does not have a typed model
1. It creates a new base class `AppRazor<TModel>` which does have a typed model (for advanced scenarios, explained later)
1. Both of them are `abstract` - this is a requirement for Razor base classes
1. Both of them are `partial` - this allows you to add more helpers and code in a separate file
1. The `App` property which is usually a `IAppTyped` is now a `IAppTyped<AppSettings, AppResources>`.
   This helps that when you write `App.Settings` it will be strong-typed - so you will get IntelliSense suggesting all the possible settings.
   The same applies to `App.Resources`


## How to Use the Custom Base Class

Imagine you start with a Razor file which looks like this:

```razor
@inherits Custom.Hybrid.RazorTyped
<h1 class="@App.Settings.String("MainColor")">Some Title</h1>
```

You could now change it to use your custom base class like this:

```razor
@inherits AppCode.Razor.AppRazor
<h1 class="@App.Settings.MainColor">Some Title</h1>
```

This is a very simple example, but it shows how you can now use `App.Settings.MainColor` instead of `App.Settings.String("MainColor")` - which is much more readable and less error-prone.

## Extending the Main Base Class

In most scenarios you will want to have a main base class - like the `AppRazor` and put things there that you'll need everywhere.
Here's an example which would add a simple helper to easily activate Fancybox in your Razor files.
This extension is placed in another file - let's say `/AppCode/Razor/AppRazor.cs`:

```csharp
using AppCode.Data;
using ToSic.Sxc.Apps;

namespace AppCode.Razor
{
  public abstract partial class AppRazor<TModel>
  {

    protected string ActivateFancyBox()
    {
      // see https://r.2sxc.org/turnon
      Kit.Page.Activate("fancybox4");
      return null;
    }
  }
}

This now extends the `AppRazor` and adds a new method `ActivateFancyBox` which you can use in your Razor files like this:

```razor
@inherits AppCode.Razor.AppRazor
@ActivateFancyBox()
```

Note that the method returns `null` - this is because the method is just a helper to activate Fancybox, and it doesn't return any content.
But it needs to return something, so we can just call it using `@ActivateFancybox()` without creating `@{ ActivateFancybox(); }` code blocks.


## Inheriting and Extending Razor Base Classes

The previous example was just the beginning.
We recommend creating your own Razor base classes which inherit from `AppRazor` and then add your own helpers and properties to it.
For example, you could prepare data for the Razor view, so that the Razor file is simpler and easier to read.

Here's an example of a Razor base class which prepares data for a blog post:

```csharp
using System.Collections.Generic;
using System.Linq;
using AppCode.Data;
using Custom.Data;
using ToSic.Sxc.Context;

namespace AppCode.Razor
{
  public abstract class ImagesRazor: AppRazor
  {
    /// <summary>
    /// Replace the MyView with a typed version
    /// </summary>
    protected new ICmsView<ImageViewSettings, CustomItem> MyView => Customize.MyView<ImageViewSettings, CustomItem>();

    protected List<Image> MyImages => _myImages ??= AsList<Image>(MyItems).ToList();
    private List<Image> _myImages;

    /// <summary>
    /// Replace the MyHeader with a typed version
    /// </summary>
    protected new TextMediaListHeader MyHeader => _myHeader ??= Customize.MyHeader<TextMediaListHeader>();
    private TextMediaListHeader _myHeader;
  }
}
```

## Customize your Razor (BETA)

The `Customize` object is a helper which will create the typed objects for you.

It has helpers such as `Customize.App<AppSettings, AppResources>()` which will create a strong-typed `IAppTyped<AppSettings, AppResources>` for you.
There are more, but they are not documented yet 😉.


---

## History

* Still WIP v17.03+
