---
uid: Extensions.AppExtensions.Create.AppCode.DataSources
---

# App Extensions – DataSources

Extensions can include custom **C# DataSources** for use in your code or in **Visual Queries**.

> [!TIP]
> This allows you to create small libraries of DataSources which solve a specific problem,
> and then share them across multiple Apps by installing the extension in each App.


## Location and Namespace

You should place the code for the extension in:

```text
/AppCode/Extensions/{ExtensionName}/
```

The `{ExtensionName}` should match the folder of the extension itself,
as it is used in:

```text
/extensions/{ExtensionName}/
```

If you mix DataSources with other code, consider placing them in:

```text
/AppCode/Extensions/{ExtensionName}/DataSources/
```

> [!TIP]
> In the main extension folder (`/extensions/`), the convention is to use **lowercase only**.
> For AppCode, we recommend **PascalCase** to match C# conventions.

### Namespace Convention

To avoid conflicts with other extensions, use:

```text
App.Extensions.{ExtensionName}
```

If you place DataSources in a subfolder, use:

```text
App.Extensions.{ExtensionName}.DataSources
```

---

## How to Create a Custom DataSource

A custom DataSource is a small C# class which inherits from `DataSource16`.
It defines one or more output streams using `ProvideOut(...)`.

### Basic Example

```csharp
using AppCode.Extensions.OpenMeteo.Data;
using Custom.DataSource;
using ToSic.Eav.DataSource;

namespace AppCode.Extensions.OpenMeteo
{
  /// <summary>
  /// DataSource which loads the current weather conditions from the Open-Meteo API.
  /// <br/>
  /// Returns a single record containing the current temperature, wind speed,
  /// weather code and timestamp for the configured location.
  /// <br/>
  /// Intended for use in Visual Queries or directly in Razor code.
  /// </summary>
  public class OpenMeteoCurrent : DataSource16
  {
    public OpenMeteoCurrent(Dependencies services) : base(services)
    {
      ProvideOut(GetCurrent);
    }

    /// <summary>
    /// Fetches the current weather data from Open-Meteo
    /// and returns it as a single record.
    /// </summary>
    private object GetCurrent()
    {
      // Getting the Data
      var result = OpenMeteoHelpers.Download(Kit, Latitude, Longitude, Timezone,
        $"&current={OpenMeteoConstants.ExpectedFields}"
      );
      // Returning a filled model
      return result.ToCurrentModel();
    }
  }
}

```

---

## Key Concepts

### Class Name

* Must be **unique** across all loaded AppCode
* Avoid generic names like `MyDataSource` or `TestSource`

### Constructor

* Always accept `Dependencies services`
* Always pass it to the base constructor

```csharp
public MyDataSource(Dependencies services) : base(services)
```

### ProvideOut

* Registers an **output stream**
* The method you pass must return an `object`
* Can return:

  * Anonymous objects
  * Lists / arrays
  * Strongly typed models

```csharp
ProvideOut(GetData);
```

---

## Using the DataSource

### In Visual Query

1. Open **Visual Query**
2. Add a **Custom DataSource**
3. Select your DataSource class
4. Use the output streams like any other source

### In Code (Razor / API)

```razor
@inherits Custom.Hybrid.RazorTyped
@using AppCode.Extensions.OpenMeteo
@using AppCode.Extensions.OpenMeteo.Data

<h3>Current Weather</h3>
@{
  // Create a data source for current weather data from OpenMeteo API
  // Parameters specify the location and timezone settings
  var currentDs = Kit.Data.GetSource<OpenMeteoCurrent>(parameters: new OpenMeteoParameters() {
    Latitude = 47.1674, // Vaduz, Liechtenstein
    Longitude = 9.4779, // Vaduz, Liechtenstein
  });

  // Use the strongly-typed model
  var current = As<OpenMeteoResult>(currentDs);
}

@* Display message if the API didn't return any weather data, then exit *@
@if (current == null)
{
  <div class="alert alert-warning">
    No data available
  </div>
  return;
}

@* Display the current weather information retrieved from the API *@
<ol>
  <li>
    <strong>When:</strong> @current.When
  </li>
  <li>
    <strong>Temperature:</strong> @current.Temperature °C
  </li>
  <li>
    <strong>Weather:</strong> @current.Weather
  </li>
</ol>
```

---

## Special Compiling Options

If you need to ensure special DLLs are referenced during compilation,
see:

[](xref:Extensions.AppExtensions.Create.AppCode.CompilerOptions)

---

## History

1. Beta in v20.09
2. Planned release in v21.00
