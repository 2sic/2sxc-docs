In 2sxc v14 or newer you would do this:

```razor
@inherits Custom.Hybrid.Razor14
@{
  // Tell the page that we need the 2sxc Js APIs
  Kit.Page.Activate("2sxc.JsCore"); 
}
```

This will load and activate the standard JavaScript APIs and let you get data
using the [Data Service](xref:Api.Js.SxcJs.SxcData) and the [Query Service](xref:Api.Js.SxcJs.SxcQuery).

If your public / anonymous users also need CMS features (such as open the edit dialog), you would replace the `"2sxc.JsCore"` with `"2sxc.JsCms"`.
To even create visible toolbars (which requires some CSS) use `"2sxc.Toolbars"`.
Read more about [activating page features here](xref:NetCode.Razor.Services.IPageServiceActivate).
