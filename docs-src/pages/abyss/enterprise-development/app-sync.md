---
uid: Abyss.EntDev.AppSync
---

# Sync Apps from Development to Production

In enterprise scenarios you will have dedicated dev environments.
But the challenge will be how to synchronise changes to the production environment.

It's important to remember that Apps contain a _lot_ of things:

1. Templates and assets - usually Razor files, css, javascript etc.
1. Schema - the ContentTypes
1. Content - usually added by editors on the production
    1. Data - the text, numbers etc.
    1. Assets - the images, documents etc.
1. WebAPIs - C# web controllers
1. Queries
1. Settings and Resources

> [!TIP]
> Depending on your scenario you will want to sync all of this from dev to live, and sometimes just parts of it.


## Scenario 1: Deploy Entire App

When you want to deploy the entire app to a system which doesn't have the App yet, you have two options:

1. Export Import of App  
   This is the simplest option - just export the App from the admin UI and import it on the new location.

2. Import-Sync Through Git / File-System  
  👉🏾 See [](xref:Abyss.EntDev.AppSyncDeploy)

## Scenario 2: Sync Entire App

👉🏾 See [](xref:Abyss.EntDev.AppSyncReSync)

## Scenario 3: Sync Parts of an App

This makes sense when the production system has changes which you don't want to overwrite.
Example: you may just want to sync some files or a query.

TODO: NOT FULLY DOCUMENTED YET, but easy to discover

## Scenario 4: Sync Lists of Data

This is what you do when you only changed data (entities) and need to re-sync an entire table.
Example: You just want to sync a list of categories.

TODO: NOT FULLY DOCUMENTED YET, but easy to discover

---

## History

1. Export / Import of Apps introduced ca. 2sxc v4
1. App-state export with content-assets 2sxc v15
1. App-import from file system 2sxc v15
