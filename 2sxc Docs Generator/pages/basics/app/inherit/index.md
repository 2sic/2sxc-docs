---
uid: Basics.App.InheritApps.Index
---

# Inherit Apps (v13+) WIP

There are a few ways to re-use data, content-types and templates across sites. 

In very advanced cases you may want to define an App in one central place, and re-use that in many sites. 

This describes how to do this - it's a new feature in 2sxc 13.02.

> [!IMPORTANT]
> This only works if the feature has been enabled and requires the EnterpriseCMS license - docs WIP!


## How it Works TODO:

Inherited Apps work like a multi-layer app. 

1. The bottom layer is the **Ancestor App**. Changes to this affect all Apps which inherit it.
1. On top of this is the **Descendant App** on a specific site, it can only add more material to the parent app, but not change any inherited data

Descendant Apps inherit all this:

1. App Name and Folder Name (they must be the same)
1. All Content-Types of the Ancestor
1. All Data / Entities of the Ancestor
1. All Queries of the Ancestor
1. All View definitions of the Ancestor
1. All Template files and JS/CSS resources in the global storage of the App

Descendant Apps don't inherit this:

1. Settings - not sure yet if they do - still WIP
1. Templates and Resources in the local storage of the Ancestor App
1. ADAM files of the Ancestor App

## How to Create

1. Enable Feature
1. Define the Ancestor / Master App
1. Define an Descendant App
1. Test :)

## Best Practices

Everything in the ancestor App will be available in all inherited apps, and anything you change can affect the inherited Apps. 
Because of this, you should _not_ use an App from a productive site (like the main/home site) as an ancestor, 
but always create a special site which isn't public, just to manage the ancestors. 

This will save you a lot of pains which would result from quickly making some edits which accidentally affect all the child sites. 

## Enable the Feature TODO:

## Migrate an Existing App to becoming a Master Ancestor

<iframe src="https://azing.org/2sxc/r/qRgoIOv0?embed=1" width="100%" height="400" frameborder="0" allowfullscreen style="box-shadow: 0 1px 3px rgba(60,64,67,.3), 0 4px 8px 3px rgba(60,64,67,.15)"></iframe>

## Create the Ancestor App TODO:

todo

### Limitations of the Ancestor App

You must be aware of a few limitations in the Ancestor App.

1. Only views with templates stored in the global location can be used in Descendant Apps
1. If you have data (entities) with images/files in the data, they cannot use the `file:72` reference, 
but must use the full path to the file for it to work on other sites, as the file-id lookup would not work in other sites.

## Create The Descendant App TODO: 



---

## History

1. Introduced in v13.01