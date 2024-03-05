---
uid: NetCode.StronglyTypedCode.UseInRazor
---

# Use Custom Data in Razor (2sxc 17+ WIP)

Once you have the initial setup going, you will want to use these types.

The `RazorTyped` base class was extended with the following methods, to make it easy:

* `As<T>` - to convert the current item to a strongly typed object
* `AsList<T>` - to convert a list of items to a list of strongly typed objects

## Important for the Setup in Dnn

> [!WARNING]
> There is a bit of magic in the background, please read the following carefully.

Internally all the C# files in the /AppCode folder are compiled into a single assembly, and then provided to the Razor files.
This is very challenging to achieve, and uses the Roslyn compiler to do this.
Since we are still experimenting with the best possible implementation,
Roslyn (and the AppCode features) are not always active - old code will still be compiled using the old `BuildManager` of asp.net.

So to make sure that your Razor will compile using Roslyn, you should do the following:

* You must have _either_ an `@using AppCode` or similar statement (eg. `@using AppCode.Data`) early in your Razor file
* Or you must inherit from a [custom Razor Base Class](xref:NetCode.StronglyTypedCode.RazorBaseClasses)

In both scenarios, Roslyn will be activated and your Razor will be compiled using the new system.

## Easy as 1-2-3

From then on forth, it's really easy - eg. like this:

```razor
@inherits Custom.Hybrid.RazorTyped
@using AppCode.Data

<ol>
  @foreach(var product in AsList<Product>(MyItems)) {
    <li>@product.Title</li>
  }
</ol>
```

Or more advanced:

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

---

## History

* Still WIP v17.03+
