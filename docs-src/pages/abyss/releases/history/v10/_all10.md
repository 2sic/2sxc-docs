



## Version 10

### Changes Version 10.01 - 10.09 LTS

* Develop and fine-tuning of the new Edit-UI based on Angular 8

### Changes Version 10.20-00 to 10.20-05

* Enhanced ListCache so it will prevent parallel buildup - important for long-loading DataSources like SharePoint DataSources
* Updating to RazorBlade 3.1 which doesn't need extension methods

### Changes Version 10.20-06

* Created `AsDynamic(string)`
* Created `AsDynamic(DataSource)` to enable `AsDynamic(Data)` instead of `AsDynamic(Data["Default"])`

### Changes Version 10.21

* New `AsList()` for better code
* New `AsDynamic(string)` to work with json
* `/dist/` is now cleaned up on every update, to better distribute changing JS file structures

### Changes Version 10.22

* Query Params added for VisualQuery
* Created QueryRun DataSource
* Insights now includes the code file and line numbers
* Insights now also measures time needed to execute some code
* Various performance enhancements
* Improved SoC for AppsCache and AppRoot DataSource

### Changes Version 10.23

* Lots of logging enhancements

### Changes Version 10.24 LTS

* New stable LTS
* Improved/fixed QueryRun DataSource
* Improved Insights
* Enhancements to use 2sxc with Redis Cache
* WYSIWYG enhancements for better H1-Hx, P and Blockquote
* Performance enhancements
* Intenal refactoring for APIs
* Introduced an internal Compatibility-Level to disable very old features when using new RazorComponents

### Changes Version 10.25 LTS

* Changed how the $2sxc client JavaScripts are loaded for much better performance and better Google PageSpeed
* Enabled various features for the Content area which previously were hidden, like Resources and Settings
* Released brand new Content-Templates App with best-practices for 10.25
* Fixed bugs with Evoq Page Publishing
* Enhanced the ValueFilter DataSource to handle dates which were null

### Changes Version 10.26

* TinyMCE Updated to 5.1
* Enhanced `CreateInstance` API to also work when compiling Razor files from a WebApi
* New DataSource `StreamPick`
* New automatic Param called `[Params:ShowDrafts]` to be used in [VisualQuery](xref:Basics.Query.VisualQuery.Index) - returns `True` or `False`
* New tokens `[App:AppId]` and `[App:ZoneId]` to use in [VisualQuery](xref:Basics.Query.VisualQuery.Index) calles (dropdown from query)
* Changed List-Caching bbehavior to create more reliable cache-keys for complex queries (previously it only went through `Default` streams to generate the cache-key)

### Changes Version 10.27

#### Possibly breaking changes

1. Because the dynamic entity list now has a type which is dynamic, it cannot be cast to `List<dynamic>` any more. `IList<dynamic>` works, but in case you have any code casting it to `List<dynamic>` you'll need to change that to either `IList<dynamic>` or `IEnumerable<dynamic>`.

#### New Features / Major Improvements

* Changed DynamicEntity so that accessing a property which contains many other entities it will return a `DynamicEntityWithList`. This allows Razor files to access the properties like `.EntityId` or `.FirstName` of the main entity in a sub-list easily without requiring `AsList(...)` [#1993](https://github.com/2sic/2sxc/issues/1993)
* Updated Quick-Dialog to use Angular 9, Ivy and the latest Dnn-Sxc-Angular [#1992](https://github.com/2sic/2sxc/issues/1992)
* New DataSource [](xref:ToSic.Eav.DataSources.AttributeRename) [#2004](https://github.com/2sic/2sxc/issues/2004)
* Completely refactored internal list management API [#1995]((https://github.com/2sic/2sxc/issues/1995))
* Complete refactoring of the inpage code to make it typesafe (no more `any` types)
* Created brand-new, [simpler way to create custom Toolbars](xref:JsCode.Toolbars.Simple) and [specs](xref:Basics.Browser.EditUx.Toolbars.Customize)
* Introduces [JS/API 2sxc-Insights](xref:NetCode.Debug.Index) for debugging In-Page code

#### Enhancements

* Performance-Enhance App DataSource to delay building objects until needed [#1991](https://github.com/2sic/2sxc/issues/1991)
* Performance-Enhance internal Token Lookup [#1998](https://github.com/2sic/2sxc/issues/1998)
* Enhanced Dnn Search Index logging [#1997](https://github.com/2sic/2sxc/issues/1997)
* Corrected help-links on all data sources [#1994](https://github.com/2sic/2sxc/issues/1994)

#### Bugfixes

* Cache-All-Streams only used the Default-Streams for Cache-Key identification [#1988](https://github.com/2sic/2sxc/issues/1988)
* QueryRun DataSource doesn't show statitics on all streams [#1989](https://github.com/2sic/2sxc/issues/1989)
* Modified date and Owner information were missing on json stored entities [#2005](https://github.com/2sic/2sxc/issues/2005) / [#2006](https://github.com/2sic/2sxc/issues/2006)
* Fixed bug in JS API for non-2sxc endpoint resolution [#2000](https://github.com/2sic/2sxc/issues/2000)
* Queries didn't resolve Dnn tokens when accessed in the Search Index [#1999](https://github.com/2sic/2sxc/issues/1999)

