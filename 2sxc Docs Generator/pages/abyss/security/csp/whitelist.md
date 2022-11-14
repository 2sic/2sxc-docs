---
uid: Abyss.Security.Csp.Whitelist
---

<img src="~/assets/features/content-security-policy.svg" class="feature">

# Content Security Policy (CSP) Whitelist Guide

Most of your CSP policies will allow something to work.
This is called _whitelisting_.

## Default fallback

First, we set the `all-src` directive with the value `'self'` and `https:`.
This will force the browser to only accept sources originating from the host URL.
`all-src` is a custom directive from 2sxc, which all source directives inherit from.

```text
all-src 'self' https:
```

To improve documentation / clarity, you can also use multiple lines and comments:

```text
// Always allow things from the own server
all-src: 'self'

// No matter where it comes from, it must use HTTPS
all-src: https:
```


## Script sources

For JavaScript code, we use the `scipt-src` directive.
It is important for this directive to have `'self'` specified as origin, but because we have set the `all-src` directive it gets inherited automatically.
For the trusted scripts to work properly we will also add `'unsafe-eval'`, which will allow script execution methods.

```text
script-src 'unsafe-eval'
```

## Style Sources

Because we sometimes use inline styles, we need to add the directive `style-src` with the value `'unsafe-inline'`.

```text
style-src 'unsafe-inline'
```

## Font Sources

Some of our fonts are hosted on the same origin and some are external.

### Inline Fonts

For example, we may allow fonts from inline data.
You would do this by adding a `font-src` with the value `data:`.

```text
font-src data:
```

### Google Fonts

Because fonts are often included in the skin, we can't whitelist them using 2sxc and must specify them in the config.
For fonts included from google you typically need to add the url `fonts.googleapis.com` as trusted `style-src` origin and `fonts.gstatic.com` as trusted `font-src` origin.

```text
style-src https://fonts.googleapis.com
font-src https://fonts.gstatic.com
```


## Image sources

We will only allow images from secure sources.
If you have the all-src specified above, we don't need to add this again.
But we may wish to add `data:` for inline images.

```text
img-src data:
```

## Media sources

For the usage of video/audio tags we will only allow media from secure sources as well.
The "media-src" directive with the value "'self' https:" will be automatically assumed, if you have the `all-src` set above.

## Form actions

Form actions can be a sensitive topic while handling data.
Simply by adding the `form-action` directive with the value "'self'", we can prevent data-leaks.
When dealing with other websites you should add the external domain specifically, like for example "'self' <https://externaldomain.com>".

```text
form-action 'self'
form-action https://externaldomain.com
```

## Insecure (http) Resources

For most resources we have specified to only allow secure https connections as origin.
Because it would be hard to migrate every HTTP resource to HTTPS, we can use the "upgrade-insecure-requests" directive.
Using this directive, the browser will request every resource (even if originating from HTTP) using HTTPS.

Note that we don't recommend doing this!

## Include External Resources

When including external resources in apps, you should use the AssetAttributes method from the IPageService.

```razor
@inherits Custom.Hybrid.Razor14
<script src="@App.Path/dist/scripts.min.js" @Kit.Page.AssetAttributes() ></script>
```

For cases, which are outside of the scope of 2sxc Apps you can whitelist them by specifying the directive `script-src` with the origin URL.

## Trusted, Pre-Registered Web Resources

For pre-registered resources, you can also just activate them.

```razor
@inherits Custom.Hybrid.Razor14
@{
  Kit.Page.Activate("turnOn", "2sxc.JsCore", "fancybox4");
}
```

### Fontawesome Icon Libraries

As our default icon library, fontawesome gets set as trusted source automatically by 2sxc.
This will only work if added using `Kit.Page.Activate("Fontawesome5")`.
Otherwise you will have to specify it in the configuration.

```razor
@inherits Custom.Hybrid.Razor14
@{
  Kit.Page.Activate("fontawesome5");
}
```

### FancyBox

Within 2sxc the FancyBox library is also a pre-registered resource.
Because 2sxc hosts the JavaScript file internally, we only need to trust the origin of its stylesheet file.
We do this by adding a "style-src" directive and setting the "cdn.jsdelivr.net/npm/@fancyapps/" origin as value.
But this will also happen automatically when we activate the resource.

```razor
@inherits Custom.Hybrid.Razor14
@{
  Kit.Page.Activate("fancybox3");
}
```
