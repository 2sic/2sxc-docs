---
uid: ToSic.Sxc.Services
# summary: *content
---

The **Services** are the most common helpers / tools used in Razor and WebAPI C#.

## Quick Use with `@Kit.SomeServiceName`

Most services are available on the `Kit` object on your Razor or WebApi file.
This requires the use of v14 base classes, such as `Razor14`.

## Manual Use with `GetService<T>`

You will usually get a service using the `GetService<T>()` method like this:

```c#
@using ToSic.Sxc.Services;
@{
  var pageSvc = Sxc.GetService<IPageService>();
}
```

Read more about [GetService\<T\>()](xref:NetCode.DynamicCode.GetService) or about [GetService\<T\> in general](xref:NetCode.DynamicCode.GetService).

To use GetService in a DNN Theme/Skin/Module, check out [GetScopedService\<T\>()](xref:ToSic.Sxc.Services.DnnExtensions.GetScopedService*)
and read it in the [release blog](https://2sxc.org/en/blog/post/deep-dnn-skin-and-module-integration-towel-day-2022).
