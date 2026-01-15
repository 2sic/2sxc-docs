---
uid: Extensions.AppExtensions.By2sxc.GoogleReCaptchaV3.Index
---

# Google reCAPTCHA v3 (App Extension)

This **App Extension** helps you add **Google reCAPTCHA v3** to custom forms in your 2sxc app, so you can reduce spam and automated submissions.

Unlike reCAPTCHA v2, **v3 runs in the background** and returns a **score** (0.0–1.0).

> Tip: reCAPTCHA v3 is **not "a secure checkbox"**. You must always verify the token **server-side**, and you should tune your score threshold over time.


## Installation

See [](xref:Extensions.AppExtensions.Install.Index)

## Usage

### 1) Get your Google keys (Site Key + Secret)

Create a reCAPTCHA v3 site in the Google reCAPTCHA admin console and copy:

- **Site key** (public, used in the browser)
- **Secret key** (private, used on the server)


### 2) Configure the extension in 2sxc App Settings

You can configure everything directly in **2sxc App Settings** for this extension:

- **Site Key**
- **Secret Key**
- **Score Threshold** (minimum score required to accept requests)

<div gallery="new-inherit">
  <img src="assets/recaptcha-keys.png">
  <img src="assets/recaptcha-appsettings.png">
  <img src="assets/recaptcha-settings.png">
</div>


### Code Example

```cshtml
@inherits Custom.Hybrid.RazorTyped

@{
  // Read the site key from App Settings
  var siteKey = AllSettings.String("GoogleRecaptcha.SiteKey");

  // API endpoint for the form submit
  var submitUrl = Link.To(api: $"{MyView.Edition}/api/TestForm/SubmitAsync");

  // Unique wrapper id (important if the view is used multiple times)
  var id = "recaptcha-" + UniqueKey;
}

<div id="@id">
  <input type="text" data-msg placeholder="Message" />
  <button type="button" data-send>Send</button>
</div>

@if (!string.IsNullOrWhiteSpace(siteKey))
{
  <!-- Load Google reCAPTCHA v3 -->
  <script src="https://www.google.com/recaptcha/api.js?render=@siteKey"></script>

  <script>
    (() => {
      const root = document.getElementById("@id");
      const input = root.querySelector("[data-msg]");
      const button = root.querySelector("[data-send]");

      button.onclick = async () => {
        // Request a reCAPTCHA token for this action
        const token = await grecaptcha.execute("@siteKey", { action: "submit" });

        // Send message and token to the server
        await fetch("@submitUrl", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: input.value,
            token
          })
        });
      };
    })();
  </script>
}
```

### What happens here

- The site key is read from App Settings

- reCAPTCHA v3 runs silently in the background

- A token is generated for the action "submit"

- The token is sent to the server together with the form data

### WebApi (validate token)

```c#
#if NETCOREAPP
using Microsoft.AspNetCore.Mvc;
#else
using System.Web.Http;
using IActionResult = System.Web.Http.IHttpActionResult;
#endif

using AppCode.Extensions.GoogleRecaptchaV3;
using System.Threading.Tasks;

[AllowAnonymous]
public class TestFormController : Custom.Hybrid.ApiTyped
{
  [HttpPost]
  public async Task<IActionResult> SubmitAsync([FromBody] Request data)
  {
    // Use the extension service to validate the token
    var validator = GetService<RecaptchaValidator>();
    var result = await validator.ValidateAsync(data.Token);

    // Validation failed (invalid token or score below threshold)
    if (!result.IsValid)
      return BadRequest(result.Error);

    // Token is valid and score is above the configured threshold
    return Ok();
  }
}

public record Request(string Token, string Message);

```

### What happens here

- The token is validated server-side using the `RecaptchaValidator` service provided by the app extension.

- The validator automatically:
  - Calls Google's reCAPTCHA verification API using the secret key configured in the app settings.
  - Checks if the token is valid and not expired.
  - Compares the returned score against the configured score threshold.
  - Requests with scores below the threshold are rejected with an error message.

- If validation succeeds, the form data can be processed further (e.g., saving the message).
- If validation fails, a `BadRequest` response is returned with the error details.

---

## History

1. Creating v1 ca. 2026-01

Shortlink: <https://go.2sxc.org/ext-grecapt3>
