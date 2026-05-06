---
uid: Extensions.AppExtensions.By2sxc.Radmin.GettingStarted
---

# Radmin Getting Started

This guide shows the fastest way to get your first Radmin table running.

## Add Radmin to a Page

Add a Radmin view to your page.

> [!TIP]
> Since Radmin is meant to admin data,
> it's best to add it to a page which is not visible to the public, and only accessible to admins.
>
> If you add it to a page which is visible to the public,
> the table will not show any data to external users,
> because the backend will refuse to deliver data unless specifically allowed to do so.

<div gallery="gallery-radmin-add-view">
  <img src="./assets/app-view.png">
  <img src="./assets/app-radmin.png">
  <img src="./assets/edit-view.png">
  <img src="./assets/configure-view.png">
</div>

Open the view settings and configure the basic values:

1. A clear **Title**.
2. A unique **View ID**.
3. The initial data source in **Data to Manage**.

Then save.

When done, you should see your first working table.

<img src="./assets/result.png">

## Next Step

Continue with [](xref:Extensions.AppExtensions.By2sxc.Radmin.ConfigureView){title="Configure View"} to understand each setup option.
