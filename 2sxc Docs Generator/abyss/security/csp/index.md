---
uid: Abyss.Security.Csp.Index
---

# Content Security Policy (CSP)

Content Security Policy (CSP) is a security policy that helps you to protect your web application from [cross-site scripting attacks](https://en.wikipedia.org/wiki/Cross-site_scripting).

## Background

2sxc 13.10 introduced a new security feature called Content Security Policy (CSP). 

> [!WARNING]
> This is still WIP and not fully implemented yet.

Before you do much, make sure you know what CSP is and what it does. I recommend the following documentations:

1. [Read about CSP on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
1. [Read about CSP on W3](https://www.w3.org/TR/CSP/)

## 2sxc Implementation

2sxc uses the following parts to make it work

1. Global Features which can be enabled/disabled
2. Settings which can be configured at Site or Global level to configure presets
3. Razor API which you can use so your code can add more rules to make it work

## Enable Features TODO:


## Special Policy Types

2sxc has these policies:

1. **SystemAdmin** - a policy which will only apply to system admins
1. **SiteAdmin** - a policy which will only apply to site admins
1. **Anonymous** - a policy which will only apply to anonymous users
1. **Default** - the default policy which is used if no other policy is defined
1. **Dev** - a policy which will only apply if the url has `?csp=dev`

## Important: Site- and Global-Level Settings Only

It's important to know that the settings are only applied to the site- and global-level.

If you configure CSP settings on an app, these will not have an effect.

## Guide

### Testing without Enforcing Policies

TODO:

### Testing Brand-New Policies

When creating policies it's hard to test-drive them on a live system, but this is often necessary as we work. 
Here's a simple method for testing brand-new policies

1. Activate the features incl. the Url feature
1. Create a new **Dev** policy
1. Go to any page and add `?csp=dev` to the url
1. Once you're happy with the result, put that in the settings for the desired user group





## TODO: Guide (WIP)


## Monitoring CSP at Runtime after Deployment

Once you've deployed CSP you may wish to be notified of any violations. 
The idea is that violations could just be a sign that something wasn't configured correctly and you may have missed this. 

There are some cool online services which can do this, like https://report-uri.com/. 

TODO:

## Warning about 'nonce-...' and 'sha256-...' Policies

`'nonce-...'` and `'sha256-...'` policies are great for allowing a specific inline bit of script or CSS. 

> [!WARNING]
> If any of these policies are used, it automatically disables the `'unsafe-inline'` rule. 
> This is how CSP works.


## Example Configurations

### Allow Everything

This is an allow-everything rule found on [StackOverflow](https://stackoverflow.com/questions/35978863/allow-all-content-security-policy)

```
default-src *  data: blob: filesystem: about: ws: wss: 'unsafe-inline' 'unsafe-eval' 'unsafe-dynamic'; 
script-src * data: blob: 'unsafe-inline' 'unsafe-eval'; 
connect-src * data: blob: 'unsafe-inline'; 
img-src * data: blob: 'unsafe-inline'; 
frame-src * data: blob: ; 
style-src * data: blob: 'unsafe-inline';
font-src * data: blob: 'unsafe-inline';
frame-ancestors * data: blob: 'unsafe-inline';
```