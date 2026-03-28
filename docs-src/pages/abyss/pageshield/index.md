---
uid: Abyss.PageShield.Index
---

<!-- <img src="~/assets/features/lightspeed.svg" class="feature"> -->

# 2sxc PageShield Protection (BETA v21)

TODO

## How it Works

### Basic Principles of 2sxc PageShield

TODO

## How to Enable 2sxc PageShield

### Enable the 2sxc PageShield Feature

_Important: You must be a [2sxc Patron](xref:Patrons.Info) with the **Patron Sentinel** package to use this feature._

<!-- This is what you would probably see if your system is not yet registered:

<img src="./assets/license-not-ready.jpg" width="100%" class="full-width">

1. Make sure you have 2sxc 21.06+ installed
1. Register your site and activate the **Patron Sentinel** package
1. Activate the license on your site so the package is available

This is what you should see once you are ready. -->
<!-- 
<img src="./assets/license-ready.jpg" width="100%" class="full-width">

This will activate PageShield but nothing will be protected yet, unless you have Apps which already have a PageShield configuration.
You can use the toggle to turn PageShield off in case something causes trouble. -->

## Configure 2sxc PageShield

### Configure using Code

Your code should know:

### Configure what URL parameters are allowed

Example:

```razor
@Kit.PageShield.Allow("id")
@Kit.PageShield.Allow("category,sort")
```

Note that the specifications are cumulative, so you can call `Allow` multiple times to allow more parameters.
The first example allows the `id` parameter, while the second example allows both `category` and `sort` parameters.

So in the previous example, `?id=5` would be allowed, as well as `?category=books&sort=asc`, but `?name=John` would not be allowed.

### Configure what URL values are allowed

Example:

```razor
@Kit.PageShield.AllowValue("id", "5")
@Kit.PageShield.AllowValue("category", "books,movies")
```

1. at the end (best case), what exact url would be the valid/correct one for this specific page.





---

## History

1. Created in 2sxc 21.06

Shortlink: <https://go.2sxc.org/pageshield>
