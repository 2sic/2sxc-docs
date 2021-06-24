---
uid: NetCode.DataSources.Custom.Errors
---

# DataSource API: Error Handling 🆕

[!include[](~/basics/stack/_shared-float-summary.md)]
<style> .context-box-summary .datasource-custom { visibility: visible; } </style>

Custom DataSources sometimes need to throw an error, for example if a SQL isn't found, a remote WebAPI fails or the configuration is faulty. 

Since 2sxc 11.13 we changed the bbehavior so that [DataSource Errors](xref:Basics.Query.Debug.Index) will not break code execution but just make the stream contain just one Error entity. This helps a lot in debugging. 

## You Don't Have to Do Anything...

If your code just raises a .net Exception, the execution engine will catch this and wrap it in an error. The Exception will also be logged to [Insights](xref:NetCode.Debug.Insights.Index) for the admin/developer to see. 

## ...but You can do Better

Instead of raising the normal exception, your DataSource can also return an `ErrorStream` which contains more specific information about the problem. This greatly helps the developer (and that could be you 😉) figure out what to fix. There are three tools at your disposal:

1. The [SetError](xref:ToSic.Eav.DataSources.DataSourceBase.SetError*) helper to create an ErrorStream which you can return
1. The [GetRequiredInList](xref:ToSic.Eav.DataSources.DataSourceBase.GetRequiredInList*) helper to get an `In` stream which must be available
1. The [ErrorStream](xref:ToSic.Eav.DataSources.DataSourceBase.ErrorStream) property to pass errors around from deeper functions

Read the API docs above or check out examples in the 2sxc EAV code base for more guidance. 


## Example using GetRequiredStream

[GetRequiredStream](xref:ToSic.Eav.DataSources.DataSourceBase.GetRequiredInList*) ensures that we get a stream we really need, or that we'll get a stream containing a good error message.


```c#
private IImmutableList<IEntity> GetEntities()
{
  // This will resolve the tokens before starting
  Configuration.Parse();

  if (!GetRequiredInList(out var originals)) return originals;
  
  var results = ...; 

  return results.ToImmutableArray();
}
```


## Example using SetError and ErrorStream

The following example is from the [DataSource Tutorial](xref:NetCode.DataSources.Custom.TutorialBasic.Index). 
You'll see that if we read the `Hours` property something can go wrong, but this property can't just return the error object. 
So it sets in on the DataSource and later on it will be picked up and returned instead of the expected data.

```c#
public class ConfigurableDateTime: ExternalData
{
  // ...
  private const string HoursKey = "Hours";

  // ...

  /// <summary>
  /// A number-demo config. Note that we do error-checking and place the Error with SetError
  /// </summary>
  public int Hours
  {
    get
    {
      if (decimal.TryParse(Configuration[HoursKey], out var hour))
      {
        // check that it's a valid hour-range
        if(hour >= 0 && hour <= 23) return (int)hour;
        
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

  /// <summary>
  /// Constructs a new EntityIdFilter
  /// </summary>
  public ConfigurableDateTime()
  {
    Provide(GetEntities);
    ConfigMask(HoursKey, "[Settings:Hours||17]"); 
    // ...
  }


  private IImmutableList<IEntity> GetEntities()
  {
    // This will resolve the tokens before starting
    Configuration.Parse();

    // ...

    // Get the hours - and if something is wrong, the ErrorStream will be pre-filled
    var hours = Hours;
    if (!ErrorStream.IsDefaultOrEmpty) 
        return ErrorStream;

    // ...

    return new List<IEntity> { ent }.ToImmutableArray();
  }
}

```

## Read also

* [DataSource API](xref:NetCode.DataSources.Custom.Api) - DataSource API overview
* [Ensuring configuration is parsed](xref:NetCode.DataSources.Custom.ConfigurationParse)

## Demo App and further links

* todo

## History

1. Introduced in EAV / 2sxc 11.13
