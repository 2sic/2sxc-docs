---
uid: Extensions.AppExtensions.By2sxc.Radmin.LinkParameters
---

# Link Parameters

Link parameters let you open another view already filtered to the clicked row.

<div gallery="gallery-radmin-link-parameters">
  <img src="./assets/config-mode.png">
  <img src="./assets/link-params.png">
</div>

After enabling **Link to View / Details** and selecting a target view, use **Link Parameters**.

Example:

`category=[key]`

In this example, `category` is the parameter name and `[key]` is replaced with the clicked row value.

When users click the link, Radmin appends the resolved parameter to the URL.

The target view can then read that value and show only matching data.

<img src="./assets/filtered-result.png">
