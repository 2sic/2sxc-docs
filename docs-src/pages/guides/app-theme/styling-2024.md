---
uid: Guides.AppTheme.Styling2024
---

# App Theming / Styling / Design - Guide v2024

As of now our preferred CSS framework is Bootstrap 5, which is migrating to CSS Variables.
Our current convention is meant to be compatible with this.

## Goals of the 2024 Convention

The convention tackles many use cases, such as:

1. By default, all possible design parameters such as colors should be inherited from the site theme.  
    _for this to work, the site theme must also use Bootstrap 5 and CSS variables_

1. If the site theme doesn't use Bootstrap 5 or doesn't provide a value, the App should provide a fallback value.  
    _this is done by defining the CSS variable fallbacks in the App's `theme.css` file_

1. Simple customizations should be possible with just editing a text file and not require any compilation.  
    _this is done by defining the CSS variable fallbacks in the App's `theme.css` file_

1. Advanced customizations should be possible by editing the SCSS files and recompiling.  
    _this is done by modifying files in the `styles` folder and running **webpack**_

## Folders and Files in the 2024 Convention

Our concept has 3 locations:

1. a `theme` folder which contains CSS files which don't need to compile - changes to this will take immediate effect
1. a `styles` folder which contains the SCSS files - changes to this will require recompiling
1. a `dist` folder which contains the compiled CSS and JS files - this is where the compiled files arrive

## Different folder depth depending on use of Editions

In basic apps, the folders are all in the root folder, so you'll see something like this:

* `dist`
* `styles`
* `theme`

In advanced Apps using editions, these folders can exist multiple times.
For example apps using live/staging would have this setup:

* `live`
  * `dist`
  * `styles`
  * `theme`
* `staging`
  * `dist`
  * `styles`
  * `theme`

## Customize Look and Feel

If the _Site Theme_ adheres to the latest Bootstrap 5 conventions, then our Apps will
automatically inherit the CSS variables from the theme.

So in most cases, you won't need to adjust anything.

### Customize Look and Feel - Simple

For this use case, locate the `/theme/theme.css` file and edit it.
Changes you make should be visible immediately.

This is an example of such a theme file, which adheres to Bootstrap 5 conventions:

```css
/*
Bootstrap 5 uses CSS variables. You can use app-related variables in this file. The standard Bootstrap values are used as a fallback 
Check our Docs for more information: https://go.2sxc.org/app-theme
*/
#theme-page-main {
  --bs-primary: var(--bs-primary, #0060AC);
  --bs-secondary: var(--bs-secondary, #001D38);
  --bs-body-color: var(--bs-body-color, #222222);
  --bs-link-color: var(--bs-primary);
}
```

> [!TIP]
> This uses CSS-Variables, so if you don't understand this, better read up on it first.
> The default rules basically say to use the variable if it exists, and if not, use the fallback value.

So for a brief primer

* `--bs-primary` is the name of the variable
* `var(--bs-primary, #0060AC)` is the value, which means "use the value of `--bs-primary` if it exists, and if not, use `#0060AC`"
* `#0060AC` is the fallback value, which is used if the variable doesn't exist
* so if the skin specifies this variable, it will simply be inherited, and if not, the fallback value will be used
* if you wish to manually set it, you can simplify to `--bs-primary: #0060AC;` since you don't need the logic

> [!IMPORTANT]
> If Dnn is configured to optimize the CSS, you may need to clear the cache to see the changes.
>
> If you don't know how to do this, google it :) - keywords `client dependency management`.

### Customize Look and Feel - Advanced

For this use case, you need to edit the SCSS files in the `/styles` folder.
Building it uses standard WebPack mechanisms, which you'll need to understand to use this.

---

## History

* Added v17.00 2023-12
