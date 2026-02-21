---
uid: Abyss.Contribute.Extensions.Index
---

# Contribute to 2sxc / EAV Extensions

_Important: If you only want to USE 2sxc / EAV, then **you do NOT need this**. This is meant for people who want to contribute to the source code of 2sxc and EAV._

When we create extensions, we often need to document them, test them, and also create the code for them.
These internal guidelines should help us make sure we do it well.

---

## File Structure and Naming Conventions

### View Files

When creating views for testing or documentation:

- **Test Views**: Name them `Test-TopicRelated.cshtml`
  - Example: `Test-ColorPicker.cshtml`, `Test-DataSourceWeather.cshtml`
- **Documentation Example Views**: Name them `Docs-Topic.cshtml`
  - Example: `Docs-ColorPicker.cshtml`, `Docs-BasicUsage.cshtml`
  - **Keep code as simple and short as possible** - focus on demonstrating the essential functionality only

### Code Files

- **Main Extension Code**: Place in `/AppCode/Extensions/[ExtensionName]/`
  - Example: `/AppCode/Extensions/OpenMeteo/OpenMeteoCurrent.cs`
- **Helper Classes**: Place in an `Internal` subfolder
  - Example: `/AppCode/Extensions/OpenMeteo/Internal/ApiHelper.cs`
- **Generated Data Files**: Place in a `Data` subfolder
  - Example: `/AppCode/Extensions/OpenMeteo/Data/WeatherResult.cs`

**Important**: Keep the main extension folder clean - only essential files should be at the root level.

### Extension Folder Structure

```text
/AppCode
  /Extensions
    /[ExtensionName]
      MainClass.cs            # Main extension code
      /Internal
        HelperClass.cs        # Internal helper classes
      /Data
        DataModel.cs          # Data models
/extensions
  /[extension-name]
    /App_Data
      extension.json          # Extension manifest
      icon.svg                # Extension icon
```

---

## Testing Your Extension

### Keep Test Code Separate

When developing an extension in the same App where you're testing it:

1. **Clearly name test files** to distinguish them from extension code
2. **Keep test files out of exports** to avoid bloating the extension package

### Test Views Best Practices

1. Create dedicated test views that demonstrate the extension's functionality
2. Include both success and error scenarios
3. Add helpful comments explaining what each test does
4. Use the `Test-` prefix consistently

---

## Documentation Requirements

When contributing an extension, always provide:

### What to Look at When Writing Docs

Before writing documentation for your extension, review these existing examples for consistency:

- **For App Extensions**: Look at existing extension docs in `/docs-src/pages/extensions/app-extensions/by-2sxc/`
  - [Google reCAPTCHA v3](xref:Extensions.AppExtensions.By2sxc.GoogleReCaptchaV3.Index) - WebAPI integration example
  - [Open-Meteo DataSource](xref:Extensions.AppExtensions.By2sxc.OpenMeteo.Index) - DataSource example
- **For Custom Fields**: Look at existing field documentation patterns
- **General Structure**: Follow the pattern of introduction → installation → configuration → code examples → history

**Key Points:**

1. **Use consistent headings** and structure like existing docs
2. **Include diagrams** when they help explain complex flows (use Mermaid)
3. **Add parameter documentation** as bullet lists before code examples
4. **Show real examples** - use actual coordinates, real data, working code
5. **Include warnings/tips** using blockquotes (`> [!TIP]`, `> [!WARNING]`)
6. **Reference related docs** using xref links

### 1. README.md

Include:

- **Overview**: What the extension does
- **Installation**: How to install and configure it
- **Usage**: Code examples showing how to use it
- **Configuration**: Any settings or parameters
- **Examples**: Practical use cases
- **Dependencies**: Required packages or other extensions
- **Version History**: Changes in each version

**Important**: Keep all documentation code examples as simple and short as possible. Focus on showing the essential functionality without unnecessary complexity.

### 2. Code Documentation

- Add XML documentation comments to all public classes and methods
- Explain parameters, return values, and any exceptions
- Include usage examples in the comments when helpful

Example:

```csharp
/// <summary>
/// Gets current weather data from the OpenMeteo API.
/// </summary>
/// <param name="latitude">Geographic latitude (-90 to 90)</param>
/// <param name="longitude">Geographic longitude (-180 to 180)</param>
/// <returns>Weather data as IEnumerable of ITypedItem</returns>
public IEnumerable<ITypedItem> GetCurrent(double latitude, double longitude)
{
  // Implementation
}
```

---

## Code Quality Standards

### Naming Conventions

1. **Classes**: PascalCase - `OpenMeteoCurrent`, `ColorPickerSpectrum`
2. **Methods**: PascalCase - `GetWeatherData()`, `ParseResponse()`
3. **Parameters**: camelCase - `latitude`, `temperatureUnit`

### Error Handling

1. Always validate input parameters
2. Provide meaningful error messages
3. Use try-catch blocks for external API calls
4. Never expose sensitive information in error messages

---

## DataSource Extensions

When creating DataSource extensions:

### Requirements

1. **Configure properly**
   - Set `ProvideOut` attribute to define output streams
   - Use `Configuration` property for parameters

2. **Return correct data types**
   - Return `IEnumerable<IEntity>` or similar
   - Use proper field types (string, number, boolean, etc.)

### Example Structure

```csharp
[VisualQuery(
  NiceName = "OpenMeteo Current",
  Icon = "weather",
  HelpLink = "https://go.2sxc.org/ext-openmeteo"
)]
public class OpenMeteoCurrent : ExternalData
{
  // Configuration properties
  public double Latitude { get; set; }
  public double Longitude { get; set; }
  
  // Implementation
}
```

---

## Custom Input Field Extensions

When creating custom input fields:

1. **JavaScript/TypeScript files** go in `/extensions/[extension-name]/`
2. **Register the field** in the extension.json
3. **Follow naming conventions**: `field-string-[name].js`
4. **Provide configuration UI** if the field has settings

### Best Practices

1. Handle all field states (empty, disabled, required)
2. Validate user input
3. Provide clear visual feedback

---

## Publishing Extensions

### Before Publishing

- [ ] All code is properly documented
- [ ] Test views work correctly
- [ ] README.md is complete and accurate
- [ ] Version number follows semantic versioning
- [ ] License is specified
- [ ] No sensitive data (API keys, passwords) in code

---

## Useful Links

- [App Extensions Overview](xref:Extensions.AppExtensions.Index)
- [Create Your Own Extension](xref:Extensions.AppExtensions.Create.Index)
- [Technical Documentation](xref:Extensions.AppExtensions.Technical.Index)
- [How to Install Extensions](xref:Extensions.AppExtensions.Install.Index)

---

## History

- Initial
