---
uid: NetCode.Images.SrcSet
---
# Specify `SrtSet` on Responsive Images API

Both `<img>` as well as `<source>` tags can have a `srcset` attribute. 

> [!TIP]
> If you are new to responsive images, we suggest you read the 
> [MDN Guide](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) 
> to get familiar with this

The Responsive Images API generates these automatically for you.
In many cases, the configuration for this comes from the settings - like from [Settings.Images.Content](xref:Basics.Configuration.SettingsSystem).

But often you may want to configure it yourself  - either by reconfiguring the Settings in the Admin-UI, or by supplying in in the code. 

## Concept

The way the generator works is that you give it the rules you want based on 4 options:

1. An exact width in pixels (usually with the `w` parameter in `srcset`s)
1. A multiple based on the device pixel density (usually with the `x` parameter)
1. A smaller size based an a multiple (like half the original if it's half the size)
1. The fallback / default picture

## Examples

* `1000w, 800w, 600w, 400w`  
  Generate these four widths as exact pixel sizes
* `1x, 1.5x, 2x`  
  Generate these three sizes for screen pixel densities
* `1*, 0.75*, 0.5*, 0.25*`  
  Generate exact pixel sizes based on the initial size, so if the initial image was 1200px, it is the same as `1200w, 800w, 600w, 400w`
* `d`
  Generate a default line (without any `w` or `x` specifier)

A lot is auto-detected, so if you want to, you can leave away the `w` and `x` and `*` in almost all cases. 
So this is valid too (see below for auto-detection rules):

* `1000, 800, 600, 400`
* `1, 1.5, 2`
* `1*, 0.75, 0.5, 0.25`
* `1/1, 1/2, 1/3, 1/4`
* <code> </code> (empty string) - defaults to `d`

In addition to the standard factor you can also set what size should be used exactly - otherwise it's auto-calculated:

* `1x=1200, 1.5x=1800, 2x=2400, 2.5x=2400, 3x=2400`
* `1000=1000, 1600=1200`
* `1x=1200:600, 1.5x=1800:600, 2x=2400:600` - height can also be set

## SrcSet Parameter Specs

1. It is always one or more values, separated by a comma `,`
1. Each value has a number like `1`, `1.5`, `1200` or a fraction like `1/2` or `1:2` - or empty for `d` (default)
1. Each value can have a specifier like `w`, `x`, `*` or `d` - or it's auto detected
1. It can be followed by an `=` to specify exact resizing rules
    1. After the `=` it can have a width
    1. After that it can have a `:` followed by the resize height

## Auto Detected Types `w`, `x`, `*` and `d`

These are the rules if the type is not specified:

* If the number is smaller than `1` it must be a multiplier of the original size, so `*` is assumed
* If the number is written as a fraction like `2/3` or `4:3` it is assumed to be a multiplier `*`
* If the number is greater than `1` and less than `10` a pixel density is assumed `x`
* If the number is `10` or greater than width is assumed `w`
* If nothing (not even a number) is specified, default `d` is assumed

## History

1. Introduced in 2sxc 13.01