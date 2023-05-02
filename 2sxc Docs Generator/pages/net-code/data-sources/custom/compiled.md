---
uid: NetCode.DataSources.Custom.Compiled
---

# Custom Compiled DataSources (classic)

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style> .context-box-summary .datasource-custom { visibility: visible; } </style>

**Compiled DataSources** are custom DataSources which are compiled to a DLL.
This is the classic way of doing things.
It's more complicated than the new [Dynamic DataSources](xref:NetCode.DataSources.Custom.Dynamic) but has a few advantages.

Note that for most projects today, we recommend you use the [Dynamic DataSources](xref:NetCode.DataSources.Custom.Dynamic) instead.

It's important to note that Compiled DataSources have a much tighter integration with 2sxc/EAV.
This often means that on major upgrades, you may need to update / adjust your code a bit.

Here is a very simple example of a compiled DataSource:

```cs
using System;
using ToSic.Eav.Data.Build;
using ToSic.Eav.DataSource;
using ToSic.Eav.DataSource.VisualQuery;

namespace ToSic.Tutorial.DataSources
{
    // This `[VisualQuery]` Attribute provides info so the visual query can provide the correct buttons and infos
    // There are ca. 20 possible settings
    [VisualQuery(
        // The nice title to show in Visual Query
        NiceName = "TodayInfos (Tutorial)",
        // The name of the icon - from the google fonts
        Icon = "today",
        // A very unique ID - make sure you get a fresh one for each data source
        // for example from https://guidgenerator.com/
        NameId = "7aee541c-7188-429f-a4bb-2663a576b19e"
    )]
    public class TodayInfos: CustomDataSource
    {
        /// <summary>
        /// Constructor to tell the system what out-streams we have.
        /// 
        /// Note that the base class needs certain Dependencies, which are all wrapped in the Dependencies type.
        /// This allows for a stable API even if future base classes require more dependencies.
        /// </summary>
        /// <param name="services">The dependencies required by the base class</param>
        public TodayInfos(MyServices services): base(services, "My.Basic")
        {
            // "Default" out; when accessed, will deliver GetListWithToday
            ProvideOut(GetListWithToday, options: () => new DataFactoryOptions(titleField: "Date"));
        }

        /// <summary>
        /// Get-List method, which will load/build the items once requested 
        /// Note that the setup is lazy-loading so this code will only execute when used
        /// </summary>
        private object GetListWithToday()
        {
            // These are the values which the Entity will have
            // It uses a very simple anonymous object
            return new 
            {
                Date = DateTime.Now.ToShortDateString(),
                Weekday = DateTime.Now.DayOfWeek,
                DayOfWeek = (int)DateTime.Now.DayOfWeek
            };
        }
    }
}
```

## Differences to Dynamic DataSources

The main difference is that the Dynamic DataSource is compiled into a DLL.
As such it is available on all Apps on that installation and can/must be distributed separately.
It's also harder to create and maintain.

💡 Complied DataSources should inherit from [CustomDataSource](xref:ToSic.Eav.DataSource.CustomDataSource)

Advantages

1. Develop in Visual Studio
1. Can be used in any App on that installation
1. Compiles to DLL and therefor you will detect code issues faster
1. Can be unit tested
1. it's ideal for large, sophisticated code

Disadvantages

1. More difficult to maintain
1. It's more likely to need adjustments on major 2sxc changes
1. Every change/test requires a restart of the website

Comparable

* both can be used in VisualQuery
* both can be used in Razor and WebApi

## Get Started

1. First you should start with Dynamic DataSources and the live samples in our [](xref:Tut.DynamicDataSources)
1. Then you should try to create your own 😉
1. Ideally check out the sample [Tutorial Basic](xref:NetCode.DataSources.Custom.TutorialBasic.Index)

[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]

## History

1. Introduced in 2sxc ca. 4 but with a difficult API
1. API strongly enhanced and simplifield in 2sxc 09.13
1. Another API rework ca. 2sxc 10.25
1. Major (breaking) changes in 2sxc 15/16
