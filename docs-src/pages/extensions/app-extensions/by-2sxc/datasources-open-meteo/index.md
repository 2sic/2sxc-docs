---
uid: Extensions.AppExtensions.By2sxc.DataSourcesOpenMeteo.Index
---

# Open-Meteo DataSource

This App Extension adds ready-to-use **2sxc DataSources** for the public **Open-Meteo** weather API.
It lets you pull **Current weather** and/or **Forecast data** into 2sxc streams, so you can use it like any other DataSource in Visual Query / code.

---
## Installation

See [](xref:Extensions.AppExtensions.Install.Index)

After installation, you should have the extension files in your app

## Usage

The extension contains **two DataSources**:

- `OpenMeteoCurrent` → current weather
- `OpenMeteoForecast` → hourly/daily forecast

Both DataSources read configuration (lat/lon, units, etc.) and return one stream (usually `Default`) with a model matching the Open-Meteo response.


### Configure

In Visual Query (or in code), set at least:

- `Latitude`
- `Longitude`

Optional (recommended):

- `Timezone` (e.g. `Europe/Amsterdam`)
- `TemperatureUnit` (`celsius`/`fahrenheit`)
- `WindSpeedUnit` (`kmh`/`ms`/`mph`/`kn`)
- `PrecipitationUnit` (`mm`/`inch`)

> You can configure parameters either through the DataSource configuration UI (Visual Query) or via code when creating the DataSource.

---

### Use in Visual Query

1. Add the DataSource **Open-Meteo Current** or **Open-Meteo Forecast**
2. Set the configuration values (Latitude/Longitude/…)
3. Connect it to your output
4. Inspect the `Default` stream to see the returned fields

<div gallery="new-inherit">
  <img src="assets/open-meteo-visual-query.png">
  <img src="assets/open-meteo-parameters.png">
</div>

---

### Use in RazorTyped (minimal examples)

Below are intentionally short examples. Your actual namespace/class names may differ depending on where you placed the files.

#### Current weather

```csharp
@inherits Custom.Hybrid.RazorTyped
@using AppCode.Extensions.OpenMeteo

@{
  // Create the DataSource instance
  var data = Kit.Data.GetSource<OpenMeteoCurrent>(config: new {
    Latitude = 52.52,
    Longitude = 13.41,
    Timezone = "Europe/Amsterdam"
  });

  // The DataSource returns a stream called "Default"
  var aktuellesWetter = datenquelle["Default"].FirstOrDefault();
}

@if (aktuellesWetter != null) {
  <div>
    <strong>Temperature:</strong> @aktuellesWetter.temperature <br />
    <strong>Wind:</strong> @aktuellesWetter.windspeed <br />
    <strong>Weather code:</strong> @aktuellesWetter.weathercode
  </div>
}

``` 

### Forecast (hourly/daily)


``` csharp

@inherits Custom.Hybrid.RazorTyped
@using AppCode.Extensions.OpenMeteo

@{
  var datenquelle = Kit.Data.GetSource<OpenMeteoForecast>(config: new {
    Latitude = 52.52,
    Longitude = 13.41,
    Timezone = "Europe/Amsterdam",
    // Example: request hourly temperature + precipitation
    Hourly = "temperature_2m,precipitation"
  });

  var forecast = datenquelle["Default"].FirstOrDefault();
  var zeiten = forecast?.hourly?.time;
  var temps = forecast?.hourly?.temperature_2m;
}

@if (zeiten != null && temps != null) {
  <ul>
    @for (var i = 0; i < Math.Min(zeiten.Count, temps.Count); i++) {
      <li>@zeiten[i]: @temps[i]°</li>
    }
  </ul>
}
``` 


## History

1. Initial release

Shortlink: <https://go.2sxc.org/ext-dsometeo>
