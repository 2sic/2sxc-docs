---
uid: NetCode.Razor.Index
---

# Razor Components / Templates

Razor Templates will generate HTML - often based on the data a editor entered, and/or which was provided from the App. Here's an example:

```razor
@inherits ToSic.Sxc.Dnn.RazorComponent
<ul>
  @foreach(var person in AsList(App.Data["Persons"])) {
    <li>@person.Name</li>
  }
</ul>
```

Razor Components/Templates are the most powerful templates in 2sxc since you can program anything you want using C#.
They use the Asp.Net Razor engine and contain normal HTML intermixed with Razor placeholders like `@Content.FirstName` or longer code blocks usually marked with `@{ ...}`.


The template files usually reside inside App root folder or sub folder. These always begin with an `_` and end with `.cshtml`. 

> [!NOTE]
> The [View Configuration](xref:Specs.Cms.Views) determines which razor file is being loaded. 
>
> If you are using [Polymorphism](xref:Specs.Cms.Polymorphism) then you may have multiple razor files with the same name in various folders, and Polymorph will decide which one will be shown.

## Get Started with Razor Templates

1. Discover the @Tut.Razor.Home to get an idea of how things work
1. Install some Apps from the [App Catalog](xref:AppsCatalog) - almost all apps use Razor
1. Learn the APIs using 
    1. The @Tut.Razor.Home 
    1. using these docs
    1. The technical [RazorComponent API](xref:ToSic.Sxc.Dnn.RazorComponent)
1. We also suggest you look into the **RazorBlade** library which has a lot of neat helpers


## Read also

* [Views](xref:Specs.Cms.Views)
* [Templates](xref:Specs.Cms.Templates)
* [Token Templates](xref:Specs.Cms.Templates.Token)
* [Razor Tutorial](https://2sxc.org/dnn-tutorials/en/razor)



## Tips

[!include["Tip Inherits"](_include-tip-inherits.md)]



## History

1. Introduced in 2sxc 1.0
