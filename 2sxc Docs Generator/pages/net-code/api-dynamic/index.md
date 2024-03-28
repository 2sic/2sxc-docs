---
uid: NetCode.ApiDynamic.Index
---

# 🍕 Dynamic API in 2sxc

**Dynamic Code** is the oldest way to write C# and Razor code.
It's been around since 2012 and is still very popular because it's so easy to start with.
As of 2024, almost all samples are still written in dynamic code, because typed replacements have only been introduced in 2023.

> [!TIP]
> Dynamic API is battle tested, looks simple and just works.
> The challenge is that complex Apps tend to get difficult to debug, because the compiler can't help you find issues.
> Also, VS Code can't provide IntelliSense, since it can't know what's inside all the variables.
>
> So we strongly recommend to look into [Typed Code](xref:NetCode.TypedCode.Index)
> and [Strong Typed Code](xref:NetCode.StrongTypedCode.Index)

## What does Dynamic API Look Like?

```razor
@inherits Custom.Hybrid.Razor12
<h1>@Content.Title</h1>
<img src='@Link.Image(url: Content.Picture, width: 200, height: 200, resizeMode: "crop")' class="float-right">
<ul>
  <li>Teaser: @Content.Teaser</li>
  <li>Launched: @Content.Launched.Year</li>
  <li>Authors: @Content.Authors.Count()</li>
  <li>Maker: @Content.Maker.Name</li>
</ul>
@Html.Raw(Content.Description)
```

## Challenges with Dynamic API

> [!TIP]
> The Dynamic API is very easy to use and looks very simple.
>
> It also has the most extensive documentation and examples, because it's been around for 12 years.

But the Dynamic API has a long history, which also results in some conventions which are not ideal.
For example, the `Content` object is often the main object containing data, but the name `Content` has confused many users.
There is also a lot of magic in the main conversion `AsDynamic()` which makes it hard to really understand what's happening.

In addition, the dynamic nature of the API makes it harder to write code - since the code always looks ok and only breaks at runtime.
This can result in rarely used code block
(which may not run in your test, because there's an `if` which never hits during testing)
to only break in production.

> [!TIP]
> That said, the dynamic API is still very popular and works great for many scenarios.
> It's proven useful for 12 years so don't worry if you find such code.
> But for new code, we recommend [Typed Code](xref:NetCode.TypedCode.Index)
> and [Strong Typed Code](xref:NetCode.StrongTypedCode.Index)


---

## History

1. Introduced in 2sxc 2.0 in 2012
1. Constantly improved till 2sxc 15 2023
