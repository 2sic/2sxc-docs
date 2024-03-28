---
uid: NetCode.TypedCode.CompareApis.RazorSubComponents
---

# Razor Sub-Components  Differences in APIs

2sxc has changed a lot over time.
So you'll find old code snippets and new ones, and it helps to see which one is being used.
Sometimes you'll also want to convert old code to new code, and this page should help you with that.

> This is about how a Razor can call other Razor files, and pass parameters to them.
> 
> They may be called **Razor Components**, **Partial Views**, **Sub-Components**, **Child Components** or **Child Razor**.
> In this document we'll just call them **Components**.

## Calling Components

For clean code, you'll often want to call sub-components from your main razor file.
Here's a simple example:

```razor
@* without parameters *@
@Html.Partial("file.cshtml")

@* with parameters *@
@Html.Partial("file.cshtml", new { Sort = "asc" })
```

The exact mechanisms and commands can change based on the version of 2sxc you're using.

## Without Parameters - all APIs

This is identical for all versions of 2sxc:

Calling Razor - eg. `Default.cshtml`:

```razor
<h1>some title</h1>
@Html.Partial("Part Footer.cshtml")
```

Called Razor - eg. `Part Footer.cshtml`:

```razor
<footer>
  <p>some footer</p>
</footer>
```

## With Parameters - Dynamic

This applies to `Razor12`, `Razor14`.
It uses the `DynamicModel` to pass parameters.
All parameters are typed as `dynamic` when received, so you can pass anything.

Calling Razor - eg. `Default.cshtml`:

```razor
@inherits Custom.Hybrid.Razor12
@{
  // create a list of dynamic entities
  var products = AsDynamic(App.Data["Products"]);
}
<h1>Products</h1>
@foreach (var product in products) {
  @Html.Partial("Part Product.cshtml", new { Title = "hello", Product = product })
}
```

Called Razor - eg. `Part Product.cshtml`:

```razor
@inherits Custom.Hybrid.Razor12
@{
  var title = DynamicModel.Title;
  var product = DynamicModel.Product;
}
<h2>@title</h2>
<div class="product">
  <strong>@product.Name</strong>
  <p>@product.Description</p>
</div>
```

## With Parameters - Typed

This applies to `RazorTyped` (v16+) and `AppRazor` (v17.03+).
It uses the `MyModel` to pass parameters.
All parameters are typed as `ITypedModel` when received, so you can pass anything.

Calling Razor - eg. `Default.cshtml`:

```razor
@inherits Custom.Hybrid.RazorTyped
@{
  // Create items list of Products
  var products = AsItems(App.Data.GetStream("Products"));
}
<h1>Products</h1>
@foreach (var product in products) {
  @Html.Partial("Part Product.cshtml", new { Title = "hello", Product = product })
}
```

Called Razor - eg. `Part Product.cshtml`:

```razor
@inherits Custom.Hybrid.RazorTyped
@{
  var title = MyModel.String("Title");
  var product = MyModel.Item("Product");
}
<h2>@title</h2>
<div class="product">
  <strong>@product.String("Name")</strong>
  <p>@product.Html("Description")</p>
</div>
```

## With Parameters - Strong Typed

This applies to v17.03+ with `RazorTyped<TModel>` and `AppRazor<TModel>`.
It uses the `Model` to pass parameters.
All parameters are typed as specified in `TModel`.

Helper Class - eg. `AppCode/Razor/ProductViewModel.cs`:

```csharp
public class ProductViewModel {
  public string Title { get; set; }
  public Product Product { get; set; }
}
```

```razor
@inherits Custom.Hybrid.RazorTyped
@using AppCode.Razor
@{
  // Create items list of Products
  var products = App.Data.GetAll<AppCode.Data.Product>();
}
<h1>Products</h1>
@foreach (var product in products) {
  @Html.Partial("Part Product.cshtml", new ProductViewModel { Title = "hello", Product = product })
}
```

Called Razor - eg. `Part Product.cshtml`:

```razor
@inherits Custom.Hybrid.RazorTyped<ProductViewModel>
@using AppCode.Razor
<h2>@Model.Title</h2>
<div class="product">
  <strong>@MyModel.Product.String("Name")</strong>
  <p>@MyModel.Product.Html("Description")</p>
</div>
```

## Calling Components - Side-By-Side Comparison

This is how you call sub-razor files or get helper C# classes:

| Dynamic | Typed | Strong Typed
| --- | --- | ---
| `@Html.Partial("file.cshtml)` | `@Html.Partial("file.cshtml)` | `@Html.Partial("file.cshtml)`
| `@Html.Partial("file.cshtml, new { Sort = "asc" })` | `@Html.Partial("file.cshtml, new { Sort = "asc" })` | `@Html.Partial("file.cshtml, new { Sort = "asc" })` <br> `@Html.Partial("file.cshtml, new SomeModel { Sort = "asc" })`


## Receive Model Data from Child Razor - Side-By-Side Comparison

When a razor is called using `Html.Partial(..., new { ... })` it passes parameters to the child razor.

These can be picked up in the child as follows:

| Dynamic | Typed | Strong Typed
| --- | --- | ---
| `DynamicModel` <br> (`dynamic`) | `MyModel` <br> ([ITypedModel]) | `MyModel` <br> ([ITypedModel]) <br><br> `Model` <br> (`custom type`)
| `var name = DynamicModel.Name` <br> (`dynamic`) | `var name = MyModel.String("Name")` <br> (`string`) | `var name = MyModel.String("Name")` <br> (`string`) <br><br> `var name = Model.Name` <br> (`string`)
| `var birthday = DynamicModel.Birthday` <br> (`dynamic`) | `var birthday = MyModel.DateTime("Birthday")` <br> (`DateTime`) | `var birthday = MyModel.DateTime("Birthday")` <br> (`DateTime`) <br><br> `var birthday = Model.Birthday` <br> (`DateTime`)

`MyModel` has many more methods to ensure you can pass type-safe data to the child.
See [MyModel](xref:ToSic.Sxc.Code.ITypedModel)

`Model` is always typed the way it's specified in the inherits, eg.

* `@inherits Custom.Hybrid.RazorTyped` will _not_ have a `Model` property
* `@inherits Custom.Hybrid.RazorTyped<ProductViewModel>` will have `Model` as `ProductViewModel`
* `@inherits Custom.Hybrid.RazorTyped<string>` will have `Model` as `string`




---

[ITypedModel]: xref:ToSic.Sxc.Code.ITypedModel
