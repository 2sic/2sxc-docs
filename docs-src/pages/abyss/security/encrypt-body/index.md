---
uid: Abyss.Security.EncryptBody.Index
---

# Network POST Body Encryption (v18.05)

2sxc 18.04 introduces a new feature to encrypt the HTTP POST Body.
Reason is for sensitive data which may pass through CDNs or other proxies.

Note that this requires the feature [Sentinel NetworkDataEncryption feature](https://patrons.2sxc.org/features/feat/NetworkDataEncryption).

## How it Runs

1. The feature is activated by the `Network.EncryptBody` feature - `Kit.Page.Activate("Network.EncryptBody")`
1. The feature will automatically add a public key to the page
1. The public key will be used to encrypt the POST body
1. The encrypted POST body will be sent to the server
1. The server API must then use the `[SecureEndpoint]` attribute to decrypt the body

## Default Behavior

Basically if you

1. activate the feature in your Razor
1. use the `[SecureEndpoint]` attribute in your API

...everything will be encrypted and decrypted automatically, as the setting `encrypt="auto"` is assumed.

> [!TIP]
> In scenarios where the encryption fails, the system will automatically fall back to sending the data unencrypted.


## Enforcing Encryption / No-Encryption

If you want to enforce encryption (refuse to send unencrypted data), you must use `encrypt=true` in your JavaScript.

If you want to enforce no-encryption even if the public key is provided, you must use `encrypt=false` in your JavaScript.

## How it Works

Internally it uses the [WebCrypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) to encrypt the data, and the server-side uses a special attribute `[SecureEndpoint]` to decrypt it.

Because of the way that the WebCrypto API works, it will only work on HTTPS sites, and will not work on HTTP sites.

If you also want it to work on HTTP sites, you must provide a polyfill.

---

<!-- Shortlink: <https://go.2sxc.org/csp> -->
