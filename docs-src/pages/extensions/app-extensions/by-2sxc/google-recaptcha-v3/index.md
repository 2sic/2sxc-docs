---
uid: Extensions.AppExtensions.By2sxc.GoogleReCaptchaV3.Index
---

# Google reCAPTCHA v3 (App Extension)

This **App Extension** helps you add **Google reCAPTCHA v3** to custom forms in your 2sxc app,
so you can reduce spam and automated submissions.

Unlike reCAPTCHA v2, **v3 runs in the background** and returns a **score** (0.0-1.0).

> [!Tip]
> reCAPTCHA v3 is **not "a secure checkbox"**. You must always verify the token **server-side**,
and you should tune your score threshold over time.

## How reCaptcha Works

reCAPTCHA v3 works by analyzing user interactions on your website to determine whether the user is a human or a bot. Here's how the process works:

1. Your app's server needs to know if a user is likely a bot and decide whether to accept the request.
1. To provide an answer, the server requests a score from Google's reCAPTCHA API.
1. For this to work, reCAPTCHA must have watched the user behavior in the browser. This requires the browser to load the reCAPTCHA JavaScript library.

This is what happens in detail:

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant S as Your App Server
    participant G as Google reCAPTCHA API

    Note over U, G: reCAPTCHA v2/v3 Verification Flow

    U->>G: 1. Request reCAPTCHA script & token
    G-->>U: 2. Returns script / loads widget
    
    U->>U: 3. User interacts (or passive v3 check)
    U->>G: 4. Send interaction data
    G-->>U: 5. Provide Response Token (g-recaptcha-response)

    U->>S: 6. Submit Form + Response Token
    
    S->>G: 7. POST verify (Token + Site Secret Key)
    G-->>S: 8. JSON Response (Success: true/false + Score)

    alt is valid human
        S-->>U: 9a. Process request (Success)
    else is bot / low score
        S-->>U: 9b. Reject request (Error)
    end
```

Breakdown of the Process

1. **Front-end Integration**: Your website loads the reCAPTCHA JavaScript. This script monitors user behavior (like mouse movements or typing patterns) to generate a unique **Response Token**.
1. **The Handshake**: When the user submits a form, that token is sent to _your server_.
1. **Backend Verification**: For security, your server must talk to Google's servers directly. You send the user's token along with your private _Secret Key_.
1. **The Verdict**: Google returns a JSON object. In v3, this includes a score (typically $0.0$ to $1.0$), where $1.0$ is very likely a human and $0.0$ is definitely a bot.

## Installation

See [Installing App Extensions](xref:Extensions.AppExtensions.Install.Index)

## Preparation

### Prep 1: Get your Google keys (Site Key + Secret)

Create a reCAPTCHA v3 site in the [Google reCAPTCHA admin console](https://azing.org/2sxc/r/dll--jV8) and copy:

* **Site key** (public, used in the browser)
* **Secret key** (private, used on the server)


### Prep 2: Configure the extension in 2sxc App Settings

You can configure everything directly in **2sxc App Settings** for this extension:

* **Site Key**
* **Secret Key**
* **Score Threshold** (minimum score required to accept requests)

<div gallery="new-inherit">
  <img src="assets/recaptcha-keys.png">
  <img src="assets/recaptcha-appsettings.png">
  <img src="assets/recaptcha-settings.png">
</div>


## Code Example

### Razor Code containing the HTML Form + reCAPTCHA v3 JS

Before a form can be verified, the browser must:

* Load the reCAPTCHA v3 JavaScript
* Execute an action to generate a token
* Send that token together with the form data to the server
* The following Razor view demonstrates the minimal required setup.

```cshtml
@inherits Custom.Hybrid.RazorTyped

@{
  // Read site key
  var siteKey = Kit.SecureData.Parse(AllSettings.String("GoogleRecaptcha.SiteKey")).Value;

  // WebApi Endpoint for DocsFormController, supporting Polymorph editions
  var submitUrl = Link.To(api: $"{MyView.Edition}/api/DocsForm/SubmitAsync");
}

@* Load reCAPTCHA script *@
<script src="https://www.google.com/recaptcha/api.js?render=@siteKey"></script>

@* Minimal visible demo with button to submit *@
<button id="send-demo" class="btn btn-primary" type="button">
  Test ReCaptcha v3
</button>

@* Script to handle button click, get token, and send to API *@
<script>
  (() => {
    // On click, execute reCAPTCHA and send token to API
    document.getElementById("send-demo")?.addEventListener("click", () => {
      grecaptcha.execute("@siteKey", { action: "submit" })
        .then(token =>
          fetch("@submitUrl", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "hello", token })
          })
        )
        .then(async r => {
          if (!r.ok) throw new Error( await r.text() || "captcha-failed");
        })
        .then(() => alert("reCAPTCHA accepted"))
        .catch(err => alert("reCAPTCHA failed: " + (err?.message || err)));
    });
  })();
</script>


```

What happens here:

* The site key is read from App Settings

* reCAPTCHA v3 runs silently in the background

* A token is generated for the action "submit"

* The token is sent to the server together with the form data

### WebApi Sample Validating the Token

This code will receive the request,
validate the token using the app extension `RecaptchaValidator` service,
and decide if the request should be accepted or rejected.


```csharp
using AppCode.Extensions.GoogleRecaptchaV3;
using System.Threading.Tasks;
using ToSic.Sxc.WebApi;

#if NETCOREAPP
using Microsoft.AspNetCore.Mvc;
#else
using System.Web.Http;
using IActionResult = System.Web.Http.IHttpActionResult;
#endif

/// <summary>
/// Demo API controller to test reCAPTCHA v3 form submissions
/// Used by the frontend test form to verify token + message
/// </summary>
[AllowAnonymous]
public class DocsFormController : Custom.Hybrid.ApiTyped
{
  [HttpPost]
  [SecureEndpoint]
  public async Task<IActionResult> SubmitAsync([FromBody] DemoFormRequest request)
  {
    // Basic input validation
    if (string.IsNullOrWhiteSpace(request?.Message))
      return BadRequest("Message-missing");

    // Validate reCAPTCHA token - include Client IP as it improves validation accuracy
    var result = await GetService<RecaptchaValidator>()
      .ValidateAsync(request.Token, remoteIp: Request.GetClientIp());

    if (!result.Success)
      return BadRequest(result.Error);

    // Continue if reCAPTCHA validation succeeded
    // YOUR CUSTOM LOGIC goes here (e.g., save the form, send email, etc.)

    // Demo success response
    return Ok();
  }
}


```

### What happens here

* The token is validated server-side using the `RecaptchaValidator` service provided by the app extension.

* The validator automatically:
  * Calls Google's reCAPTCHA verification API using the secret key configured in the app settings.
  * Checks if the token is valid and not expired.
  * Compares the returned score against the configured score threshold.
  * Requests with scores below the threshold are rejected with an error message.

* If validation succeeds, the form data can be processed further (e.g., saving the message).
* If validation fails, a `BadRequest` response is returned with the error details.

---

## History

1. Creating v1 ca. 2026-01

Shortlink: <https://go.2sxc.org/ext-grecapt3>
