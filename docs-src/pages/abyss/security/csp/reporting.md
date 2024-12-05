---
uid: Abyss.Security.Csp.Reporting
---

<img src="~/assets/features/content-security-policy.svg" class="feature">

# Content Security Policy (CSP) Reporting Guide

CSP allows for easy reporting of rule violations.

When a violation occurs, the browser will send a request to the given URL. For testing we recommend report-uri.com. Simply add the "report-uri" directive and specify your URI.

```
report-uri: https://YOUR-DOMAIN.report-uri.com/r/d/csp/enforce
```

Using "report-uri.com" you can see all violations in the reports section and can analyse them.

## Report Only mode

You can configure CSP to use the report only mode. This stops the browser from forcing the CSP policies on the client and only reports violations.
