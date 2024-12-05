---
uid: NetCode.DynamicCode.DynamicModel
---

# DynamicModel Object 🪒 (Razor only, new in v12)

The `DynamicModel` object is used on sub-pages (which were rendered to the page using `Html.Partial`) to get the data which was passed as parameters. 

> [!TIP]
> This is an abstraction for `PageData` in Dnn and `Model` in Oqtane. Using `DynamicModel` lets you write Razor pages which will work on both Dnn and Oqtane. 

## DynamicModel.anything

Will get you a parameter passed to the page. It's a `dynamic` object, so Razor doesn't know what type it is. Sometimes you may want to explicitly type it. Here some examples of an inner-page which was called using parameters

```razor
@{ 
  var person = DynamicModel.Person;
  var name = DynamicModel.Name as string;
  var nameOrDefault = DynamicModel.Name ?? "unknown";
}
```

👉 more examples in [Html.Partial](xref:NetCode.DynamicCode.Html).

---

## History

2. Added in 2sxc 12 to ensure identical syntax with Oqtane

