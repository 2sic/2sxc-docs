---
uid: NetCode.DataSources.Custom.Index
---

# Create Custom DataSources

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style> .context-box-summary .datasource-custom { visibility: visible; } </style>


If you want to create your own DataSource and use it in C# or the VisualQuery designer, this is for you.

You have two options:

1. Create a _Dynamic_ Custom DataSource (recommended) _new in v16_
1. Create a _Compiled_ Custom DataSource (classic, much more difficult)

Once you've figured out the basics, you'll want to dive deeper into subjects like:

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

Here is a very simple example of a compiled DataSource:

```cs
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using ToSic.Eav.Data;
using ToSic.Eav.Data.Build;
using ToSic.Eav.DataSource;
using ToSic.Eav.DataSource.VisualQuery;

namespace ToSic.Tutorial.DataSources
{
    // additional info so the visual query can provide the correct buttons and infos
    [VisualQuery(
        NiceName = "Random Dates (Tutorial)",
        Icon = "date_range",
        NameId = "10ebb0af-4b4e-44cb-81e3-68c3b0bb388d"   // random & unique Guid
    )]
    public class RandomDates: CustomDataSource
    {
        #region Constants

        public const string DateFieldName = "Date";
        public const string IdField = "Id";
        public const int ItemsToGenerate = 27;

        #endregion

        #region Constructor for Dependency Injection and Services

        /// <summary>
        /// Constructor to tell the system what out-streams we have
        /// </summary>
        public RandomDates(MyServices services): base(services, "My.BsList")
        {
            // default out, if accessed, will deliver GetList
            ProvideOut(Get27RandomDates);
        }

        #endregion

        /// <summary>
        /// Get-List method, which will load/build the items once requested 
        /// Note that the setup is lazy-loading,
        /// ...so this code will not execute unless it's really used
        /// </summary>
        /// <returns></returns>
        private IImmutableList<IEntity> Get27RandomDates()
        {
            var dateBuilder = DataFactory.New(options: new DataFactoryOptions(typeName: "BasicList", titleField: "Date"));
            var result = Enumerable
                .Range(1, ItemsToGenerate)
                .Select(i => dateBuilder.Create(
                    new Dictionary<string, object>
                    {
                        { IdField, i },
                        { DateFieldName, RandomDay() }
                    },
                    id: i))
                .ToImmutableList();

            return result;
        }

        // helper to randomly generate dates
        private readonly Random _randomizer = new Random();
        private readonly DateTime _start = new DateTime(1995, 1, 1);

        private DateTime RandomDay()
        {
            var range = (DateTime.Today - _start).Days;
            return _start.AddDays(_randomizer.Next(range));
        }
        
    }
}
```









## Use in VisualQuery Designer

This is what the DataSource would appear like in VisualQuery

<img src="./assets/basic-datasource-in-visual-query.png" width="100%" class="full-width">

...and this is what the test-run would look like

<img src="./assets/basic-datasource-run.png" width="100%" class="full-width">

## Demo App and further links

* [](xref:NetCode.DataSources.Custom.VisualQueryAttribute)
* [](xref:NetCode.DataSources.Custom.Provide)
* [](xref:NetCode.DataSources.Custom.DataBuilder)
* [Basic DataSources for EAV and 2sxc](https://github.com/2sic/2sxc-eav-tutorial-custom-datasource)
* [Blog about this feature](https://2sxc.org/en/blog/post/tutorial-custom-datasources-for-eav-2sxc-9-13-part-1)
* [Blog post about custom DataSources](xref:Blog.CustomDataSource)

## History

1. Introduced in 2sxc ca. 4 but with a difficult API
1. API strongly enhanced and simplifield in 2sxc 09.13 
1. Another API rework ca. 2sxc 10.25 (but we're not exactly sure)
