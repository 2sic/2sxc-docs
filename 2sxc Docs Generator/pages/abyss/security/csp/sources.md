---
uid: Abyss.Security.Csp.Sources
---

<img src="~/assets/features/content-security-policy.svg" class="feature">

# Content Security Policy (CSP) Sources

The Content-Security-Policy value is made of directives with specify a _source_.

These are the most relevant. Note that special keywords such as `'*'` or `'self'` must be enclosed in single quotes `'`.:

| Source  | Description |
| ------- | ----------- |
| `'*'`                    | Wildcard – Allows any URL except data
| `'none'`                 | Prevents loading from any source
| `'self'`                 | Allows loading from same origin (scheme, host, port) – <https://yourdomain.com:80>
| `data:`                  | Allows loading data resources
| `yourdomain.com`         | Allows loading resources from the specified domain (yourdomain.com)
| `*.yourdomain.com`       | Allows loading resources from any subdomain from the specified domain (xy.yourdomain.com)
| `https://yourdomain.com` | Allows loading resources from the specified domain only over https
| `https:`                 | Allows loading resources over https
| `'unsafe-inline'`        | Allows use of inline source attributes (style, onclick…)
| `'unsafe-eval'`          | Allows unsafe dynamic code evaluation (eval() in JS)
| `'sha256-H4shV41ue'`     | Allows inline execution if it matches the hash in the header
| `'nonce-r4nd0mV41ue'`    | Allows inline execution of tags that match the nonce attribute
| `'strict-dynamic'`       | Allows trusted scripts to load other scripts
| `'unsafe-hashes'`        | Allows enabling scripts in event handlers. (not `href="javascript:..."` or inline `<script>` tags)


> [!TIP]
> Also check out the [MDN sources docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/Sources)
