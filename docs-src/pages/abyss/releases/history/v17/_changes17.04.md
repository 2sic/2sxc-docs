
### 2sxc v17.04 (2024-03-11)

#### Improvements

1. `MyView.Resources` added to complement existing `MyView.Settings` #3315 
2. `ITypedItem.Img(...)` added to complement exitsing `ITypedItem.Picture(...)` #3324 
3. Dnn improve Roslyn build performance in many cases from ca. 2.5 seconds to 0.5 seconds #3322 
4. Query: Improve `$select` OData parameter
5. REST API - add `$select` OData Parameter #3319 
6. Razor / Typed Code: add a `Customize` helper ojbect #3316 
7. Admin UI - Data Scopes now show count
8. Add Razor compile code help for more common problem such as accessing typed-items dynamically
9. Improve razor compile help - show errors before warnings
10. **Picker** - auto extract additional fields to retrieve based on placeholders in Label / Help texts etc.

#### Generate Data Models Improvements

1. Include Scope name
2. Include content-types in `Configuration` scope
3. `CustomItem` - implement `==` and `!=` operators to use wrapper equality
4. Lots of docs for [custom data](https://docs.2sxc.org/net-code/strongly-typed-code/index.html)
5. `app.json` editions configuration, add `isDefault`


#### Bugfixes

1. UI Date Picker - fix but with UTC offset #3321 
2. UI Page Picker - fix, was broken in 17.03.00 #3320 
3. Calling Query using JS missed the `Id` property #3325 
4. Admin: state of the DateTime Show-Time toggle didn't properly get persisted #3318 
