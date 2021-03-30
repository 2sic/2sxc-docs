---
uid: NetCode.DataSources.Custom.TutorialBasic.Index
---

# Custom DataSources - Basic Tutorial

[!include[](~/basics/stack/_shared-float-summary.md)]
<style> .context-box-summary .datasource-custom { visibility: visible; } </style>

We've re-created our Tutorial for the Custom DataSources to match features of 2sxc 11.13. It has 3 DataSources:

1. **Basic** which just provides information about todays Date
1. **BasicList** which generates similar information for a list of 7 dates
1. **ConfigurableDateTime** which shows just about everything you will ever need

Here's what you should look into:

1. The VisualStudio project located here: [DataSources Github Project](https://github.com/2sic/datasource-tutorial-basic)
1. The companion App containing some Demo Queries and the Content-Type

## Installing

Just install the ZIP as a DNN package from the [Git Releases](https://github.com/2sic/datasource-tutorial-basic/releases). 
This will add the DLLs containing the DataSources and the Configuration Content-Type to DNN as a Library.

Now you can use this DataSource in any 2sxc App. 

You can also install the Demo App which already has some Queries #Todo demonstrating them. 

## Discover the Code

Download the [Git-Repo](https://github.com/2sic/datasource-tutorial-basic) and look at the Code. Next we'll explain the highlights: 

### Level 1: The most `Basic` DataSource

This is the code for the simplest DataSource:

```c#
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using ToSic.Eav.Data;
using ToSic.Eav.DataSources;
using ToSic.Eav.DataSources.Queries;

namespace ToSic.Tutorial.DataSource.Basic
{
  // Additional info so the visual query can provide the correct buttons and infos
  [VisualQuery(
    NiceName = "Demo DateTime Basic",
    GlobalName = "7aee541c-7188-429f-a4bb-2663a576b19e"   // random & unique Guid
  )]
  public class DateTimeDataSourceBasic: ExternalData
  {
    public const string DateFieldName = "Date";

    /// <summary>
    /// Constructor to tell the system what out-streams we have
    /// </summary>
    public DateTimeDataSourceBasic()
    {
      Provide(GetList); // "Default" out; when accessed, will deliver GetList
    }

    /// <summary>
    /// Get-List method, which will load/build the items once requested 
    /// Note that the setup is lazy-loading so this code will only execute when used
    /// </summary>
    private ImmutableArray<IEntity> GetList()
    {
      var date = DateTime.Now;
      var values = new Dictionary<string, object>
      {
          {DateFieldName, date},
          {"Weekday", date.DayOfWeek},
          {"DayOfWeek", (int) date.DayOfWeek}
      };
      
      // Construct the IEntity and return as ImmutableArray
      var entity = Build.Entity(values, titleField: DateFieldName);
      return new [] {entity}.ToImmutableArray();
    }
  }
}
```

What this does is...

1. Inform [VisualQuery](xref:Basics.Query.VisualQuery.Index) that there is a DataSource and registers it with a unique GUID
1. The constructor says it [provides](xref:NetCode.DataSources.Custom.Provide) one `Default` stream which can be built by `GetList()`
1. `GetList()` will simply create a simple entity and return it as a list


### Level 2: A `BasicList`  DataSource

This is the code

```c#
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using ToSic.Eav.Data;
using ToSic.Eav.DataSources;
using ToSic.Eav.DataSources.Queries;

namespace ToSic.Tutorial.DataSource.Basic
{
  // additional info so the visual query can provide the correct buttons and infos
  [VisualQuery(
    NiceName = "Demo DateTime List",
    GlobalName = "10ebb0af-4b4e-44cb-81e3-68c3b0bb388d"   // random & unique Guid
  )]
  public class DateTimeDataSourceBasicList: ExternalData
  {
    public const string DateFieldName = "Date";
    public const string IdField = "Id";
    public const int ItemsToGenerate = 7;

    /// <summary>
    /// Constructor to tell the system what out-streams we have
    /// </summary>
    public DateTimeDataSourceBasicList()
    {
      Provide(GetList); // default out, if accessed, will deliver GetList
    }

    /// <summary>
    /// Get-List method, which will load/build the items once requested 
    /// Note that the setup is lazy-loading,
    /// ...so this code will not execute unless it's really used
    /// </summary>
    /// <returns></returns>
    private ImmutableArray<IEntity> GetList()
    {
      var randomNumbers = new List<IEntity>();

      for (var i = 0; i < ItemsToGenerate; i++)
      {
        var values = new Dictionary<string, object>
        {
          {IdField, i},
          {DateFieldName, RandomDay()}
        };
        var ent = Build.Entity(values, id: i, titleField: DateFieldName);
        randomNumbers.Add(ent);
      }

      return randomNumbers.ToImmutableArray();
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

This is very similar to the Basic case, just that we're now creating a list of Entities and returning them.


### Level 3: A Configurable, Error-Aware Data-Source `ConfigurableDateTime`

```c#
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using ToSic.Eav.Data;
using ToSic.Eav.DataSources;
using ToSic.Eav.DataSources.Queries;


// Demo / Training Code to help you create our own DataSource
// You can find the newest version here: https://github.com/2sic/datasource-tutorial-basic
// there is also an App showing you how it would be used
// and how such a data-source is configured. 

namespace ToSic.Tutorial.DataSource.Basic
{
  // Note that this attribute is necessary for the DataSource to show up in the 
  [VisualQuery(
    GlobalName = "81dd49a7-fa70-4e98-b73d-8299bb3231f0",
    Type = DataSourceType.Source,
    NiceName = "DateTime Configurable",
    // Guid of the Content-Type which must be exported with this DataSource
    // It's located in .data/contenttypes
    // The class RegisterGlobalContentTypes ensures that 2sxc/EAV will find it
    ExpectsDataOfType = "677210a2-cf08-46e5-a6b2-86e56e27be99",
    HelpLink = "https://r.2sxc.org/DsCustom")]
  public class ConfigurableDateTime : ExternalData
  {
    #region Configuration-properties
    private const string DesiredDateKey = "DesiredDate";
    private const string HoursKey = "Hours";

    /// <summary>
    /// A piece of demo-configuration. It must always be stored/accessed from the Configuration dictionary
    /// because everything in the config-dictionary will be token-resolved
    /// </summary>
    public string DesiredDate
    {
      get => Configuration[DesiredDateKey];
      set => Configuration[DesiredDateKey] = value;
    }

    /// <summary>
    /// A number-demo config. Note that we do error-checking and store it with SetError
    /// </summary>
    public int Hours
    {
      get
      {
        if (decimal.TryParse(Configuration[HoursKey], out var hour))
        {
          // check that it's a valid hour-range
          if (hour >= 0 && hour <= 23) return (int)hour;

          // If not, set the error, so that the code can later pick up the error-stream
          SetError("Hour value out of range", $"The hour was '{hour}' which is not valid");
          return 0;
        }

        // Apparently not a decimal, so set the error, so that the code can later pick up the error-stream
        SetError("Hour value invalid", $"Tried to parse the hour, but couldn't. Value was '{Configuration[HoursKey]}'");
        return 0;
      }
      set => Configuration[HoursKey] = value.ToString();
    }

    #endregion

    /// <summary>
    /// Constructs a new EntityIdFilter
    /// </summary>
    public ConfigurableDateTime()
    {
      // The out-list contains all out-streams.
      // For performance reasons we want to make sure that they are NOT created unless accessed
      // Because of this, we create a data-stream with a deferred call to GetEntities - like this:
      Provide(GetEntities);

      // Example of pre-configuring a text
      // This will place the token to be resolved into the variable
      // The tokens will be resolved before use
      // The following token means: 
      // - Try to use the configured value from the setting on this data-source in the visual query
      // - if there is none, just use the value "Today"
      ConfigMask(DesiredDateKey, "[Settings:DesiredDate||Today]");

      // Example of pre-configuring a number value
      // We can't just say AnotherDemoConfig = "text" because that would not compile since it expects a number
      // So we just add the token to be resolved directly to the configuration list
      ConfigMask(HoursKey, "[Settings:Hours||17]");
    }


    /// <summary>
    /// This is the deferred call to retrieve entities
    /// If you created the source correctly it won't be called unless accessed
    /// This is recommended for performance reasons
    /// We also recommend placing the result in the cache...
    /// </summary>
    /// <returns></returns>
    private IImmutableList<IEntity> GetEntities()
    {
      // This will resolve the tokens before starting
      Configuration.Parse();

      // Here's your real code. 
      // Typically you will either perform some work with the In-streams
      // or retrieve data from another source like XML, RSS, SQL, File-storage etc.
      // Usually you would also need configuration from the UI - but sometimes not, especially if it's just for a very specific purpose
      #region Your Custom Business Logic

      try
      {
        // Check if we're trying to inform about today
        if (DesiredDate != "Today")
          return SetError("Demo Config not Today", "The Demo Configuration should be 'Today' or empty.");

        // Get the hours - and if something is wrong, the ErrorStream will be pre-filled
        var hours = Hours;
        if (!ErrorStream.IsDefaultOrEmpty)
          return ErrorStream;

        // For this demo we'll treat the current time as UTC
        var todayDate = DateTime.SpecifyKind(DateTime.Today, DateTimeKind.Utc);

        // In this demo we'll just create 1 entity containing some values related to today
        var today = new Dictionary<string, object>
        {
          {"Title", "Date Today"},
          {"Date", todayDate.AddHours(hours)},
          {"DayOfWeek", DateTime.Today.DayOfWeek.ToString()},
          {"DayOfWeekNumber", DateTime.Today.DayOfWeek}
        };

        // ...now convert to an entity with the data prepared before
        var ent = Build.Entity(today, titleField: "Title");
        return new List<IEntity> { ent }.ToImmutableArray();
      }
      catch (Exception ex)
      {
        // if something happens, let's return this information as a result
        return SetError("Unexpected Error", "The Configurable DateTime DataSource ran into an exception.", ex);
      }
      #endregion

    }
  }
}
```

This does a LOT more. Here the important bits

1. The VisualQuery Attribute has a lot more information
1. It has various properties like `Hour` which will be populated by settings in the Constructor...
1. ...and they have features to [detect errors and report them nicely](xref:NetCode.DataSources.Custom.Errors)
1. The `GetEntities()` safely checks if the Required `In` stream really exists - otherwise returns a clean [error stream](xref:NetCode.DataSources.Custom.Errors)
1. The configuration is then used in the data returned


## History

1. Created 2017 for 2sxc 7
1. Completely rebuilt for 2sxc 11.13 and VisualQuery 3

