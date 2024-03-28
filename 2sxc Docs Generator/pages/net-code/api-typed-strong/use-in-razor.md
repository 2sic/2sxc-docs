---
uid: NetCode.StrongTypedCode.UseInRazor
---

# Use Custom Data in Razor (2sxc 17+ WIP)

Once you have the initial setup going (mainly [code generated with Copilot](xref:NetCode.Copilot.DataModelGenerator)), you will want to use these types.

The `RazorTyped` base class was extended with the following methods, to make it easy:

* `As<T>()` - to convert the current item to a strong-typed object
* `AsList<T>()` - to convert a list of items to a list of strong-typed objects

In addition, the `ITypedItem` has been extended with a few more methods, to make it easier to get strong-typed data:

* `Child<T>()` - to get a child item and convert it to a strong-typed object
* `Children<T>()` - to get a list of child items and convert them to a list of strong-typed objects

## Easy as 1-2-3

From then on forth, it's really easy - eg. like this:

```razor
@inherits Custom.Hybrid.RazorTyped
@using AppCode.Data

<ol>
  @foreach(var product in AsList<Product>(MyItems)) {
    <li>
      <img src="@product.Packshot">
      <a href='@Link.To(parameters: "productid=" + product.Id)'>
        @product.Title @(product.OnSale ? "🌟" : "")
      </a>
      Tags: @string.Join(", ", product.Tags.Select(c => c.Name))
    </li>
  }
</ol>
```

You will notice that it looks a lot like dynamic code, except that

* it's 100% type safe
* you get IntelliSense
* the compiler will catch many more issues
* LINQ works as expected (which is not the case with dynamic objects)
* it's faster

## Important for the Setup in Dnn

> [!WARNING]
> There is a bit of magic in the background, please read the following carefully.

Internally all the C# files in the /AppCode folder are compiled into a single assembly, and then provided to the Razor files.
This is very challenging to achieve, and uses the Roslyn compiler to do this.
Since we are still experimenting with the best possible implementation,
Roslyn (and the AppCode features) are not always active - old code will still be compiled using the old `BuildManager` of asp.net.

So to make sure that your Razor will compile using Roslyn, you should do the following:

* You must have _either_ an `@using AppCode` or similar statement (eg. `@using AppCode.Data`) early in your Razor file
* Or you must inherit from a [custom Razor Base Class](xref:NetCode.StrongTypedCode.RazorBaseClasses)

In both scenarios, Roslyn will be activated and your Razor will be compiled using the new system.

## More Advanced Example

This is more advanced as it uses a custom Razor base class.
The base class does some work which is not shown here, like prepare the `MyLinks` property
or provide the `ActivateFancyBox()` method.

In addition, the `Link` type has been extended with calculated fields such as `WindowAuto`.


```razor
@inherits AppCode.Razor.LinksRazor
@using AppCode.Data

<div class="row">
  @foreach (var link in MyLinks)
  {
    <div class="col-md-6 col-lg-4 mb-4 mb-md-5 co-linkblock" @Kit.Toolbar.Default(link)>
      <i class='mb-3 text-primary fas @link.IconAuto' aria-hidden="true" style="font-size: 40px;"></i>
      <h4>@link.Title</h4>
      @link.DescriptionHtml(true)

      @if (link.IsNotEmpty("Link"))
      {
        <a href='@link.Link' target='@link.WindowAuto' title="@link.Title" class="stretched-link">@link.Get("LinkText") <i class="fas fa-chevron-right" aria-hidden="true"></i></a>
      }
    </div>
  }
</div>
@ActivateFancyBox()
```

## Standard Typed-Item APIs still work

Just fyi, you can still use the standard typed-item APIs, like this:

```razor
@inherits AppCode.Razor.ProductRazor
<h1>@MyProduct.Title</h1>
@MyProduct.Picture("Screenshot", imgClass: "float-right")

@* Show responsive HTML - the function has many more parameters *@
@MyProduct.Html("MainBody")

@* Get the HTML but scrub the HTML *@
@MyProduct.String("MainBody", scrubHtml: true)

@* Get the link, but as the raw value "file:72" and not as the url *@
@MyProduct.String("Link")
```

### Edge Case: Custom Properties can Hide Methods

Imagine if you had a property called `Html`.
This would hide the `Html` method, so you would not be able to use it.
In this special case, you have a few options, but the simplest is to cast the item to `ITypedItem` and then use the method like this:

```razor
@((ITypedItem)MyProduct).Html("MainBody")
```

---

## History

* Still WIP v17.03+
