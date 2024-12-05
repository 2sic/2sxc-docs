---
uid: NetCode.DynamicCode.Objects.App.Index
---

# App / @App object Dynamic Code

The `App` object gives you full access to everything you need to know about the current App, including Path-info, access to all Data this App has, access to Settings and language Resources and more.


[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]


## How to use

Here's are two simple examples taken from the [Blog App](xref:App.Blog):

```razor
<link rel="stylesheet" href="@App.Path/assets/style.css"  @Kit.Page.AssetAttributes()/>
<script type="text/javascript" src="@App.Path/assets/scripts.js" @Kit.Page.AssetAttributes()></script>
@foreach(var tag in AsList(App.Data["Tag"])) {
  <li class='@("app-blog-tag" + tag.ManualWeight)'>
    <a href="@App.Settings.DetailsPage/tag/@tag.Tag" title="@tag.Name">@tag.Name</a>
  </li>
}
```

The `<link...` and `<script...` use the app-path to ensure that the file is correctly loaded, no matter what portal or app-name is currently valid. Here you can discover more about the [optimizations](xref:Basics.Server.AssetOptimization.Index).

The loop iterates through all tags with the `@foreach(var tag in AsList(App.Data["Tag"]))`, creates `<li>` items and links these to a page defined in the `App.Settings`.  

## How it works

Whenever a 2sxc-instance is created to render a page or to deliver JSON data, the `App` object is created and prepared to deliver everything you need. It's very performant, because it doesn't actually get any data or run any queries unless these are accessed.

## App Properties

The app-object uses the `IApp` interface ([see code](xref:ToSic.Sxc.Apps.IApp)) has the following simple properties:

1. `AppId` number, current App id
2. `AppGuid` guid, internal use global id
3. `Configuration` [DynamicEntity](xref:NetCode.DynamicData.DynamicEntity), contains the [configuration content-item](xref:Feat.AppConfig)
4. [Data](xref:NetCode.DynamicCode.Objects.App.Data) IAppData, to access all App-data (see below)
5. `Folder` string, storage folder name in portal/#/2sxc/...
6. `Hidden` bool, info if the app cannot be selected in the UIs
7. `Name` string, the app name
8. `Path` string, the path as used in URLs in  html
9. `PhysicalPath` string, the path as used on the server C:\...
10. [Query["QueryName"]](xref:NetCode.DynamicCode.Objects.App.Query) dictionary of queries (see below)
11. `Resources` [DynamicEntity](xref:NetCode.DynamicData.DynamicEntity), all the multi-language labels etc. (see below)
12. `Settings` [DynamicEntity](xref:NetCode.DynamicData.DynamicEntity), all the app-settings (see below)
13. `ZoneId` number, current Zone ID (similar to PortalId)


## Using App Data (App.Data)

Read [](xref:NetCode.DynamicCode.Objects.App.Data)


## Using App Queries (App.Query)

Read [](xref:NetCode.DynamicCode.Objects.App.Query)


## Note about Unpublished / Draft Content-Items

In case you're not aware of the draft/unpublished features in 2sxc, we want to note that each item can be live/draft, and each item could have a corresponding counterpart. So a draft-item _could_ have a live-item (but doesn't have to), and a live-item _could_ have a draft item.

This is important, because the admin/editor will see all the draft items, while the end-user will only see the live ones. So the exact items shown and the item-count can differ if you are logged in.


## App Settings and Resources

In the App dialogs you can manage `Settings` and `Resources`. Basically both are a content-item with the fields you specify, the only difference is the _purpose_ they have.

* You should put button-labels, standard-texts, decorative images etc. into `Resources` and these will often change from language to language.
* You should put settings like "what page is xxx on" or "the primary color is #53aaff" into `Settings`

You would normally use it like this:

```razor
<h1 class='@App.Settings.HeadingsDecorators'>
    @Content.Title
</h1>
<div>
    @Content.Body
</div>
<a href="@App.Settings.DisclaimerPage">
    @App.Resources.Disclaimer
</a>
```

As you can see, the `HeadingsDecorators` or `DisclaimerPage` are best placed in the `Settings`, while the label of the `Disclaimer` link are best handled as a multi-language `Resource`.


## Read also

* If you need to get an App object for other apps, read [External App Use](xref:NetCode.External.Index)
* If you want to use the App object from non 2sxc-code, like other MVC pages, check out [External App Use](xref:NetCode.External.Index)


## Demo App and further links

You should find some code examples in this demo App

* [Blog App](xref:App.Blog) showing many such features

More links:

* [App Data Create/Update/Delete](xref:Feat.AppDataApi)


## History

1. Introduced in 2sxc 05.05
2. Stable since 2sxc 06.00
3. Data-API was introduced in 2sxc 06.05
