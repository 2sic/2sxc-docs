---
uid: Abyss.Security.Csp.Directives
---

<img src="~/assets/features/content-security-policy.svg" class="feature">

# Content Security Policy (CSP) Directives

The Content-Security-Policy value is made of directives separated by a semicolon.
The 2sxc Csp configuration does the separation for us, as each rule is on an own line. 

## Common Security Directives

These are the most relevant to configure security:

| Directive |	Description |
| ------- | ----------- |
| `all-src` | This directive is unique to 2sxc. It defines allowed resources like the default-src directive. The difference is that all source directives (even if already specified) will inherit the set values on all-src.
| `default-src` | Defines the allowed resources such for fetching JavaScript, Images, CSS, Fonts, AJAX requests, Frames, HTML5 Media. It serves as a fallback for unset directives.
| `style-src`   | Defines the allowed `<style>` sources
| `script-src`  | Defines the allowed `<script>` sources
| `img-src`     | Defines the allowed `<img>` sources
| `font-src`    | Defines the allowed font sources
| `form-action` | Defines the allowed form target urls
| `media-src`   | Defines the allowed `<audio>` and `<video>` sources
| `object-src`  | Defines plugin sources `<object>`, `<embed>` and `<applet>`
| `upgrade-insecure-requests` | Treats http resources as https

> [!TIP]
> There are actually many more, such as `worker-src` or `base-uri`. 
> See all possible directives in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy).

## Common Reporting Directives

Both of these directives define the reporting endpoint for CSP violations. 

* `report-uri` 
  See [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/report-uri)
* `report-to` 
  See [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/report-to)
