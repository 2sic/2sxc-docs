---
uid: NetCode.DataSources.Custom.Create
---

# Create Custom DataSources

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style> .context-box-summary .datasource-custom { visibility: visible; } </style>


If you want to create your own DataSource and use it in C# or the VisualQuery designer, this is for you.

You have two options:

1. [Dynamic Custom DataSources](xref:NetCode.DataSources.Custom.Dynamic) (recommended) _new in v16_
1. [Compiled Custom DataSources](xref:NetCode.DataSources.Custom.Compiled) (classic, much more difficult)

Once you've figured out the basics, you'll want to dive deeper into subjects like:

💡 You should read through the [Big Picture of DataSources](xref:NetCode.DataSources.Custom.Guide.BigPicture)

## Dynamic Custom DataSources _(⭐ new in v16)_

These data sources are simple `.cs` files in the `DataSources` folder of the App.
They are compiled on the fly and can be edited in the browser or VS Code.

> [!TIP]
> This is new in v16 and is the recommended way to create custom DataSources.
>
> This is also the recommended way to get started and learn about DataSources.

An important feature/limitation of this is that the DataSource can only be used in that single App.
This is often preferred, as it can be distributed together with the App and won't affect any other Apps.

Here is a very simple example of a dynamic DataSource:

```cs
using System.Linq;

public class ListBasic : Custom.DataSource.DataSource16
{
  public ListBasic(MyServices services) : base(services)
  {
    ProvideOut(() => Enumerable.Range(1, 5).Select(i => new {
      Id = i,
      Guid = System.Guid.NewGuid(),
      Title = "Hello from ListBasic",
      FavoriteNumber = 2742,
    }));
  }
}
```

👉🏽 Get started [](xref:NetCode.DataSources.Custom.Dynamic)

## Compiled Custom DataSources (classic)

This is the classic way of creating DataSources.
Basically you create a Visual Studio project and compile the DataSource into a DLL.
This is much more advanced and difficult.

The advantage is that you can use the same DataSource in multiple Apps,
and that you can distribute the DLL independently of the App.
It also allows you to write unit tests to create more robust code.

👉🏽 Get started [](xref:NetCode.DataSources.Custom.Compiled)

## History

1. Introduced in 2sxc ca. 4 but with a difficult API
1. API strongly enhanced and simplifield in 2sxc 09.13
1. Another API rework ca. 2sxc 10.25 (but we're not exactly sure)
1. Major breaking API changes and improvements in 2sxc 15
1. Dynamic DataSources introduced in 2sxc 16
