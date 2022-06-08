---
uid: Abyss.Security.Csp.BestPractices
---

<img src="~/assets/features/content-security-policy.svg" class="feature">

# Content Security Policy (CSP) Best Practices

Content Security Policy (CSP) is a security policy that helps you to protect your web application from [cross-site scripting attacks](https://en.wikipedia.org/wiki/Cross-site_scripting).

There are many ways you can setup CSP, but it is easier if the entire setup is geared towards this goal.

## JavaScript CSP Best Practices

### JS: Avoid `eval` and other Stupid Stuff

This is fairly basic: don't use `eval` in your code.


### JS: Avoid any JS in the Page

Any In-Page JS will either force you to use lax security rules or require a lot of whitelisting using nonce or hashes. 

We recommend that you avoid this alltogether. 

Place all your code in external JS files which are on the same server (rule: `self`).
Then use [turnOn](xref:JsCode.TurnOn.Index) to start the code. 

turnOn will also help you pass parameters like the current ModuleId to the script, in case you need it. 


## CSP Configuration Best Practices

### Use Comments to Document your CSP

In the Settings you can use comments with lines beginning with `//` to document your CSP.
It will make your work easier and help others who make changes in the future.

```
// This will apply to all ...-src
all-src: 'self' https:
```

### Use Multiple Lines

All rules will be merged in the end, so in many cases it's better to have rules on multiple lines.

```
// This is for the image gallery
script-src https://some-cdn.com/

// This is for jQuery
script-src https://some-other-cdn.com/
```

### Use `all-src`

2sxc has a special `all-src` rule which you should use for `'self'` or `https:` rules. 

You should use these at global/site level, because it ensures that any further rules from Apps or other sources won't break your site.

### Avoid 'nonce-...' and 'sha256-...' Policies

`'nonce-...'` and `'sha256-...'` policies are great for allowing a specific inline bit of script or CSS. 

But they have a huge side-effect: they automatically disable the `'unsafe-inline'` rule. 

Because of this, you should avoid using these policies, as most Dnn/Oqtane sites will have other scripts which are outside of your control, so you will typically need `unsafe-inline`.

> [!WARNING]
> If any of these policies are used, it automatically disables the `'unsafe-inline'` rule. 
> This is how CSP works.

### Be as Local as Possible

Rules which should only be used in a specific App should be on that App, not on the site.

Rules which only apply to a specific razor page should ideally also be on that page only.


## Production / Operations Reporting

### Use a Reporting Server

Even if you think you're done, make sure to setup a reporting server.
You can get free system from [Report-URI](https://report-uri.com/).
This will allow you to monitor if your site is being compromised - or if you forgot to set some rules, which result in the site breaking. 