---
uid: Extensions.AppExtensions.By2sxc.VCard.Index
---

<img src="./assets/app-icon.png" width="150px" align="right" class="float-end">

# vCard Extension

_This is an extension for 2sxc Apps and can be installed into each App individually._

The vCard App Extension creates downloadable `.vcf` contact files from data in any 2sxc App.
It provides a reusable C# model and service, but does not depend on a specific Content Type or query.

The generated files use vCard 3.0 and can contain names, organization and job information,
addresses, phone numbers, email, website, and an embedded contact photo.

## Installation

* [](xref:Extensions.AppExtensions.Install.Index){title="icon:journal-arrow-down"} instructions for your first time

## Usage in a Web API

Create a Web API controller in your App, map your data to a `VCard`,
and return the generated file from the endpoint.

```csharp
#if NETCOREAPP // Oqtane
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
#else // DNN
// 2sxclint:disable:no-web-namespace
using System.Web.Http;
#endif
using AppCode.Extensions.VCard;
using System.Threading.Tasks;

public class ContactController : Custom.Hybrid.ApiTyped
{
  [HttpGet]
  [AllowAnonymous]
  public async Task<object> Download()
  {
    var card = new VCard
    {
      FirstName = "John",
      LastName = "Doe",
      Organization = "Example Company",
      JobTitle = "Managing Director",
      StreetAddress = "Main Street 1",
      Zip = "8000",
      City = "Zurich",
      CountryName = "Switzerland",
      Phone = "+41 44 123 45 67",
      Mobile = "+41 79 123 45 67",
      Email = "john.doe@example.com",
      Url = "https://example.com",
      FileName = "John Doe",
    };

    var result = await GetService<VCardService>().CreateAsync(card);

    return File(
      download: true,
      contents: result.Contents,
      contentType: result.ContentType,
      fileDownloadName: result.FileName
    );
  }
}
```

You can then link to the endpoint from a Razor view:

```cshtml
@inherits Custom.Hybrid.RazorTyped

<a href='@Link.To(api: "api/Contact/Download")'>
  Download contact
</a>
```

> [!TIP]
> The example uses fixed values for clarity.
> In a real App, populate the `VCard` properties from your content item or query result.

## Add a Contact Photo

There are two ways to embed a photo:

1. Set `PhotoUrl` to an absolute image URL which the web server can access.
   `CreateAsync()` downloads the bytes and embeds them as Base64.
1. Set `PhotoBase64` to an image which is already Base64-encoded.

If `PhotoBase64` has a value, it takes precedence and the service does not download `PhotoUrl`.
An empty `PhotoBase64` allows the URL download to run.

You must set `PhotoType` to match the actual image format, such as `JPEG` or `PNG`.
The service does not detect the type from the URL, file extension, or HTTP response.
It converts the supplied value to uppercase and defaults to `JPEG` when the value is empty.

> [!IMPORTANT]
> Use `CreateAsync()` when supplying `PhotoUrl`. Calling `Serialize()` directly does not download the image.

```csharp
var card = new VCard
{
  FirstName = "John",
  LastName = "Doe",
  PhotoUrl = "https://example.com/images/john-doe.png",
  PhotoType = "PNG",
};

var result = await GetService<VCardService>().CreateAsync(card);
```

> [!NOTE]
> If the image download fails, `DownloadPhotoAsync()` logs the error and returns no photo data.
> `CreateAsync()` still creates the vCard, but without a `PHOTO` entry.
>
> The download uses a new `HttpClient` request and does not forward browser cookies or authentication headers.

## vCard Properties

| Property | Purpose |
| --- | --- |
| `FirstName`, `LastName` | Contact name |
| `Organization`, `JobTitle` | Company and position |
| `StreetAddress`, `Zip`, `City`, `Region`, `CountryName` | Work address |
| `Phone` | Work phone number |
| `PhoneCompany` | Company phone number |
| `Mobile` | Mobile phone number |
| `Email` | Preferred email address |
| `Url` | Work website |
| `PhotoUrl` | Absolute, server-accessible URL of a photo downloaded by `CreateAsync()` |
| `PhotoBase64` | Prepared Base64 photo; takes precedence over `PhotoUrl` |
| `PhotoType` | Explicit image type, normalized to uppercase; defaults to `JPEG` |
| `FileName` | Download filename; `.vcf` is added automatically |

Empty optional properties are omitted from the generated vCard.
If `FileName` is empty, the service uses the contact's display name and falls back to `contact.vcf`.

## History

1. v00.00.01 - Initial release for 2sxc v21 2026-08

Source: <https://github.com/2sxc-apps/app-extension-vcard>
