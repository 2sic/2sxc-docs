---
uid: Abyss.Contribute.Code.Backend.DataSourceForUi
---

# DataSource for UI

This guide explains **how to create a DataSource in general**, what the important parts are, and what to watch out for regarding **GUIDs, confidentiality, permissions, and structure**.

---

## Example

Below is a simplified example structure:

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

namespace MyNamespace.DataSources;
[PrivateApi]

[VisualQuery(
    NiceName = "Site Languages",
    NameId = "PUT-GUID-HERE",
    NameIds = ["System.SiteLanguages"],
    Type = DataSourceType.System,
    Audience = Audience.System,
    DataConfidentiality = DataConfidentiality.Confidential,
    UiHint = "Provides all site languages")]
    
public class SiteLanguagesDataSource : CustomDataSource
{
    public SiteLanguagesDataSource(MyDependencies dependencies) : base(dependencies)
    {
        ProvideOut(() => GetData());
    }

    private IEnumerable<SiteLanguageDto> GetData()
    {
        var items = LoadFromSomewhere();

        return items.Select(item => new SiteLanguageDto
        {
            Code = item.Code,
            Culture = item.Culture,
            IsEnabled = item.IsEnabled,
            IsAllowed = item.IsAllowed,
            Permissions = item.Permissions
        });
    }

    private IEnumerable<SourceLanguage> LoadFromSomewhere()
    {
        // get data
        throw new NotImplementedException();
    }
}
```

### Registration

```csharp
[VisualQuery(
    NiceName = "Site Languages",
    NameId = "PUT-GUID-HERE",
    NameIds = ["System.SiteLanguages"],
    Type = DataSourceType.System,
    Audience = Audience.System,
    DataConfidentiality = DataConfidentiality.Confidential,
    UiHint = "Provides all site languages")]
```

This attribute registers the DataSource with the 2sxc VisualQuery system. Each property controls how the DataSource is identified, displayed, and protected.

| Property | Purpose |
|---|---|
| `NiceName` | label shown in the UI |
| `NameId` | The GUID that uniquely identifies this DataSource |
| `NameIds` | One or more stable string aliases used to reference this DataSource in queries (e.g. `"System.SiteLanguages"`) |
| `Type` | Categorizes the DataSource `DataSourceType.System` means it is a built-in system source |
| `Audience` | Controls who can see and use this DataSource `Audience.System` limits it to system-level |
| `DataConfidentiality` | Declares how sensitive the output is `DataConfidentiality.Confidential` signals that the data must not be exposed to regular users |
| `UiHint` | A short description shown as a tooltip or hint in the VisualQuery designer |

The exact attribute and available properties can differ depending on the surrounding framework, but the idea is always the same:  
**register the DataSource with a unique identity and readable metadata**

---

### Constructor

```csharp
public SiteLanguagesDataSource(MyDependencies dependencies) : base(dependencies)
{
    ProvideOut(() => GetData());
}
```

The constructor is where you typically:

- inject required services/dependencies
- register the output
- wire the source to the logic that actually produces the data

---

## GUID

The GUID is the **unique identifier** of the DataSource. You can create one using [[this](https://www.guidgenerator.com/)]

Example:

```csharp
Guid = "12345678-90ab-cdef-1234-567890abcdef"
```

---

## Confidentiality and security

This part is important.

A DataSource can expose information that is not meant for everyone.  
Because of that, you should always think about **who can access the data** and **what should be returned**.

---

## Log Name Convention

When defining a log name, it must follow this format:

`xxx.xxxxx`


### Rules

- exactly **one dot (`.`)** separating two parts
- first part: **exactly 3 characters**
- second part: **maximum 6 characters**

### Examples

Valid:

- `abc.def`
- `sys.error`
- `log.data`

Invalid:

- `ab.def` → first part too short
- `abcd.def` → first part too long  
- `abc.defghij` → second part too long  
- `abcdef` → missing dot  

---

This format ensures consistency and keeps log identifiers short and readable.
