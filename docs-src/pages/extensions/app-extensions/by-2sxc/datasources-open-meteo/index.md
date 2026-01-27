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

You can configure parameters either through the DataSource configuration UI (Visual Query) or via code when creating the DataSource.

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

1. Creates an instance of the `OpenMeteoCurrent` DataSource
2. Passes location and configuration values
3. Reads the first item from the `Default` stream
4. Displays a few selected weather values


```cshtml
@inherits Custom.Hybrid.RazorTyped
@using AppCode.Extensions.OpenMeteo

@{
  // Create the DataSource and pass configuration values
  // These values are forwarded to the Open-Meteo API
  var source = Kit.Data.GetSource<OpenMeteoCurrent>(config: new {
    Latitude = 52.52,          // Geographic latitude
    Longitude = 13.41,         // Geographic longitude
    Timezone = "Europe/Amsterdam" // Timezone for returned timestamps
  });

  // Read the first (and usually only) item from the Default stream
  var current = source["Default"].FirstOrDefault();
}

@if (current != null) {
  <div>
    <!-- Temperature in the configured temperature unit -->
    <strong>Temperature:</strong> @current.temperature <br />

    <!-- Wind speed in the configured wind speed unit -->
    <strong>Wind speed:</strong> @current.windspeed <br />

    <!-- Open-Meteo weather condition code -->
    <strong>Weather code:</strong> @current.weathercode
  </div>
}
```

### Forecast (hourly/daily)

1. Creates an instance of the OpenMeteoForecast DataSource
2. Requests specific hourly forecast fields
3. Reads the forecast data from the Default stream
4. Iterates over time/temperature pairs and renders them
```cshtml
@inherits Custom.Hybrid.RazorTyped
@using AppCode.Extensions.OpenMeteo

@{
  // Create the forecast DataSource with configuration
  var source = Kit.Data.GetSource<OpenMeteoForecast>(config: new {
    Latitude = 52.52,              // Geographic latitude
    Longitude = 13.41,             // Geographic longitude
    Timezone = "Europe/Amsterdam", // Timezone for forecast timestamps

    // Request hourly temperature and precipitation values
    Hourly = "temperature_2m,precipitation"
  });

  // Read the forecast result from the Default stream
  var forecast = source["Default"].FirstOrDefault();

  // Hourly forecast values are returned as parallel arrays
  var times = forecast?.hourly?.time;
  var temperatures = forecast?.hourly?.temperature_2m;
}

@if (times != null && temperatures != null) {
  <ul>
    @for (var i = 0; i < Math.Min(times.Count, temperatures.Count); i++) {
      <!-- Combine timestamp and temperature by index -->
      <li>@times[i]: @temperatures[i]°</li>
    }
  </ul>
}
```


## History

1. Initial release

Shortlink: <https://go.2sxc.org/ext-openmeteo>
