---
uid: Basics.Configuration.Settings.WebResources
---

<img src="~/assets/features/settings-stack.svg" class="feature">

# WebResources in Settings Stack ✨ new

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-configuration { visibility: visible; }</style>

WebResources are JS/CSS libraries which your code will use, like [Fancybox4](https://fancyapps.com/).
These can be managed in Settings to ensure that it can be changed as needed, and that all Apps will load the _same versions_.

> [!IMPORTANT]
> WebResources are not Resources.
> **WebResources** are JS/CSS needed in the browser.
> **Resources** are i18n language resources for multi-language assets.
> See also [App Resources](xref:Basics.App.Resources).

The following Resources are pre-configured in Settings:

| Web Resource         | Added in 2sxc        | Comments             |
| -------------------- | -------------------- | -------------------- |
| Bootstrap4           | v12.04
| Bootstrap5           | v12.04
| fancybox3            | v12.04
| fancybox4            | v12.04
| FontAwesome5         | v12.04
| FontAwesome6         | v13.00

You can override these configurations in the Settings at any level you want.

> [!TIP]
> You can also just configure a WebResource to be deactivated (`Enabled` = `false`).
>
> You would do this if the skin already loads the assets you need.

Usually your code will activate it using the [IPageService](xref:NetCode.Razor.Services.IPageServiceActivate).

You can also access the values in Razor directly, like this:

```
@Settings.WebResources.Bootstrap4.Enabled (will be true)
```

---

## History

* Settings WebResources introduced in 2sxc 12.04
