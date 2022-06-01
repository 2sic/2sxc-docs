## Breaking Changes in EAV and 2sxc v11

We try to minimize breaking changes, and most breaking changes won't affect your work, because it's internal API. 
We're documenting it here to ensure you know what happened, in case you still run into this.

### Summary

There were small breaking changes in 11.00 to 11.11 but they were internal so shouldn't affect normal developers. 

### Breaking Changes Version 11.07 - Drop the old edit UI

1. In 11.07 the old edit UI was removed, so customizations for that UI would not be in effect any more. 

### Breaking Changes Version 11.10 - Mainly Dependency Injection

1. In v11.10 we used much more dependency injection than ever before and stopped using static values which were still in the API in many places. Because of this, certain helper objects to create entities or lookup values were changed and their constructors were changed. We invested a lot of time to try to ensure that old APIs still work, but in case you're hit by one of these, make sure you check the DI and switch to resolving the objects using DI. 

### Breaking Changes Version 11.11 - Language Detection

1. Previously the language detection used the Thread culture. Turns out this wasn't reliable because Dnn does some funny stuff (probably historical) which means that API-calls ended up using the language stored in some cookie instead of the one specified by the URL. We changed this, which should be more reliable. But if you were relying on this strange effect, then it may be a breaking change. 
1. Internally our tokens were also using the thread culture. When we changed this, we also had to change how tokens pick up the language. In rare cases this may affect you. 
1. We changed all tokens to always resolve boolean values to `true`/`false` (previously they would have been changed to the current language, like `wahr` for german). We believe this change is only an improvement, and should ensure that internal resolves in Queries etc. result in reliable output. 

### Breaking Changes Version 11.11 - DataSources: DataSourceConfiguration

Note that we also improved the `DataSourceConfiguration` to an interface `IDataSourceConfiguration` and documented this. 
As a side effect the API stays the same, but you will have to recompile your data sources for them to work again - sorry.

### Breaking Changes Version 11.11.03 - IEntity Values

1. `IEntity` had a command called `Value(fieldName)` which was probably never used. The idea used to be that it does language lookup internally, but we refactored this out since it could never be fully reliable because the full language list wasn't known to the `IEntity`. So we re-purposed the method (assuming it's not used) to just lookup the first occurance of the value. This way it`s useful for configurations and similar which are not multi-language. 
1. `IEntity` also had a `Value(fieldname, lookup)` method. We are deprecating it, and making the lookup not happen from now on. We believe it was never used.
1. `IEntity` had a command called `PrimaryValue(fieldName)` which was probably never ever used, so we're deprecating it. Use `Value(fieldName)` instead.

### Breaking Changes Version 11.11.03 - Other

1. UI Toolbar dropped the button and command for `item-history`, as the history is now part of the edit dialog
