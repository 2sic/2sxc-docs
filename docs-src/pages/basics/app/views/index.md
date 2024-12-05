---
uid: Basics.App.Views.Index
---

# Views and Templates

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .process-razor, .context-box-summary .data-configuration { visibility: visible; }</style>

Views are what the user will see - and contains things like Html, CSS, Javascript and data from the content. 

## How it Works

Views configure what [templates](xref:Basics.App.Templates) are combined with what [Content-Type](xref:Basics.Data.ContentTypes.Index) to then produce an output. 

Read more about [Templates here](xref:Basics.App.Templates)

The template-file is just part of the view. To be used as a view, it must be configured in the App configuration as a view, where you add things like

1. **Name** or **Thumbnail Image** (for the preview when selecting the view)
1. **Data** specs like what type of data is shown, if the data comes from a query etc.
1. **View Parameters** to automatically show this view based on url-parameters

> [!TIP]
> Views can also specify more Content-Types for using in the Header or Presentation. In addition, they could also say that the data comes from a Query instead of from user/editor input. 


## View Configuration

👉 See [](xref:Basics.App.Views.Configuration)

## View Identifier

2sxc 12.02 introduces a the **Identifier**. 
This is useful in scenarios where the _same_ [Template](xref:Basics.App.Templates) is used in multiple views, and should result in slightly different output in each case. 
The _Identifier_ let's you specify a key to differentiate which behavior the template should have. 

For example: Two views are configured, one with the name `2 Columns` has an Identifier `2Col` the other called `3 Columns` has `3Col`. 
Your razor code can then access this on `CmsContext.View.Identifier` and change what CSS classes it uses. 

In theory you could also check the `Name` property on `CmsContext.View.Name` but that could change based on the language, which is why you should use the _Identifier_. 
In more complex scenarios we suggest you use [View Settings](xref:Basics.App.Views.Settings).

## View Settings 

👉 See [](xref:Basics.App.Views.Settings)

## View Resources

👉 See [](xref:Basics.App.Views.Resources)

## View Polymorphism

[Polymorphism](xref:Basics.Polymorphism.Index) can be activated on views (new in v11). When you do this, you can choose between two modes

1. Permission based: in this case SuperUsers get the template from the `staging` folder while public users get the template from `live` or the primary one which was configured in the View configuration
1. CSS framework based: here the view will automatically try to pick the file from the folder matching the CSS framework set by the Theme/Skin

## Advanced Topics

* [Switching between views based on the url](https://2sxc.org/en/docs/Feature/feature/4680)
* [Differences between features when using Content or App](https://2sxc.org/en/blog/post/2sxc-app-vs-2sxc-content-which-one-should-i-use)
* [Protecting Views for certain users using permissions](https://2sxc.org/en/Docs/Feature/feature/4737)
* [Hide advanced features from normal editors](https://2sxc.org/en/docs/Feature/feature/3592)
* [Razor Tutorial](https://2sxc.org/dnn-tutorials/en/razor)

## History

1. Introduced in 2sxc 1.0
1. Automatic View-Polymorphism added in 2sxc 11
1. View Identifier added in 2sxc 12.02
1. View Settings added in 2sxc 12.02
1. View Resources added in 2sxc 12.02