---
uid: NetCode.DynamicCode.Html
---

# @Html Object 🪒 (Razor only)

The `Html` object is a .net helper from the framework. It's only available in Razor 🪒 and not in WebApis. 

> [!IMPORTANT]
> Dnn and Oqtane have a different version of .net, so they Html object has more or less features depending on what framework you're using. 

Here we'll just document the important parts which will work on both Dnn and Oqtane

## @Html.Raw(string)

This will put the string into the page and _not_ escape the html. Example

```razor
@{ var demo = "<strong>hello!</strong>"; }
<div>
  @demo
</div>
<div>
  @Html.Raw(demo)
</div>
```

Will create this:

```html
<div>
  &lt;strong&gt;hello!&lt;/strong&gt;
</div>
<div>
  <strong>hello!</strong>
</div>
```

## @Html.Partial(path) - v12 only

This will render another razor file in the current location. 

> [!IMPORTANT]
> `@Html.Partial(...)` is actually a newer command which would only work in Oqtane, 
> but we back-ported it to the Dnn Razor implementation to make portable Razor possible.
> In Dnn it will actually call the old .net function `@RenderPage(...)`.

Example - this would be the main file:

```razor
<h1>Some Title</h1>
@Html.Partial("_intro.cshtml")
@Html.Partial("_intro.cshtml")
```

This would be the sub-file `_intro.cshtml`:

```razor
<div>Greetings!</div>
```

Result:

```html
<h1>Some Title</h1>
<div>Greetings!</div>
<div>Greetings!</div>
```

## @Html.Partial(path, data) - v12 only

This is the same as `Html.Partial(path)` but allows you to add more data. 

Main file:

```razor
<h1>Some Title</h1>
@{
  var preparedData = new { Name = "iJungleboy" };
}
@Html.Partial("_intro.cshtml", preparedData)
@Html.Partial("_intro.cshtml", new { Name = "Daniel" })
```

This would be the sub-file `_intro.cshtml`:

```razor
<div>Greetings @DynamicModel.Name!</div>
```

Result:

```html
<h1>Some Title</h1>
<div>Greetings iJungleboy!</div>
<div>Greetings Markus!</div>
```

---

## History

1. `Html.Raw` existed since 2sxc 1.0
2. `Html.Partial` was added in 2sxc 12 to ensure identical syntax with Oqtane

