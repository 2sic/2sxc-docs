
## Version 11

### Changes Version 11.00

#### Breaking Changes

The following changes are all super-low-profile, but we want to document them just to be through:

1. `DataStream` and `IDataStream` loses a very old property called `.LightList` - we're pretty sure it's not in use anywhere, if you have it, just use `.List` instead.


#### Enhancements

1. Brand new Admin UI based on Angular 9 and Ivy with new Code-Editor, new [VisualQuery](xref:Basics.Query.VisualQuery.Index) and much more
1. Razor CodeBehind
1. Automatic Polymorphism
1. Updated Razor Blades to 3.02 with the new `Tags.SafeUrl(...)` command
1. Field: Boolean-Tristate which saves true/false/null
1. `App.Data.Create(...)` now returns entities it just created

### Changes Version 11.01

#### Enhancements

1. In-Page Toolbar now recognises sub-item lists and provides sorting and editing buttons #2009
1. Item-lists now have a button to add existing items to them #1278
1. New system to create extensions in an app, in the system folder
1. Ability to create custom Input Fields just by placing them in the system folder #2070

#### Minor

1. Improve Equality Check for DynamicEntities and EntitiesInList #2075
1. Data-table in admin UI now shows `Title` field no matter if there is another field which is the title #1639
1. Button to flush app-cache in admin-ui #2073
1. 2sxc Insights now available from the super-user toolbar #2069
1. PT translations are added again #2064
1. Loads of enhancements and minor issues in the UI

### Changes Version 11.02

#### Enhancements

1. App-Extensions system in the folder `system`
1. Custom WebComponent based input fields #2082
1. API to reconfigure the wysiwyg input control #2090
1. Show view use with links to pages and more #2077
1. UI - fields can now be set to not-translate #2086
1. UI - boolean can now show different labels based on the value it has #2085

#### Minor

1. Add HR language pack for editor #2087
1. show app-name in admin ui
1. show app-icon in apps-management #2078


### Changes Version 11.03 - todo

### Changes Version 11.04 - todo

### Changes Version 11.05

1. Old Edit UI be removed
1. Old Admin-UI be removed
1. APIs which only the old UIs used be removed
1. Old helper JS for AngularJS apps (located in `/js/angularjs`) will be removed from the distribution.
They had not been updated for over 3 years and we believe they were not widely used.
Anybody upgrading will still preserve the files that are there.
If you really need them, download an old release of 2sxc and get them manually.


### Changes Version 11.06 - 11.11 - todo

👉 See the [Project Issues](https://github.com/2sic/2sxc/projects/23)

### Changes Version 11.13

1. [VisualQuery](xref:Basics.Query.VisualQuery.Index) 3 with a lot of new features
    1. Click on a stream [shows what's in that stream](xref:Basics.Query.Debug.Index)
    1. Much [better error handling](xref:Basics.Query.Debug.Index) to avoid queries from crashing if a stream has an error
    1. All internal DataSources were updated to use this new Error-Handling
    1. Output of Query is now tabbed which is much nicer to use
    1. Visual-Query only returns top 25 results by default to help with creating queries with large amounts of data
    1. UI was enhanced to show more user-friendly names/infos
    1. `DynamicIn` was introduced so DataSources can indicate that they expect a lot of In-streams
    1. UI enhanced with better/larger buttons/icons
    1. `In` Streams are now managed better so they can connect before it's known if the source `Out` actually has that stream
1. New DataSource Error to provoke an error in a Query for testing
1. New DataSource [SerializationConfiguration](xref:ToSic.Eav.DataSources.Serialization) lets you determine how things are serialized
1. DataSource [AttributeFilter](xref:ToSic.Eav.DataSources.AttributeFilter) enhanced to have keep-all or remove-all and multi-line configuration (easier)
1. New [DataSource Tutorial with updated sample code](xref:NetCode.DataSources.Custom.TutorialBasic.Index)
1. Insights-Logging was enhanced to log Exceptions (used in the [VisualQuery](xref:Basics.Query.VisualQuery.Index) Error handling)

**Bugfixes**

1. Toolbar had issue when color code was numbers only

### Changes Version 11.14 - 11.22 LTS TODO

