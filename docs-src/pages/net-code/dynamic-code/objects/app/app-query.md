---
uid: NetCode.DynamicCode.Objects.App.Query
---
# App.Query / @App.Query Object in Dynamic Code

The queries you create in the app-configuration dialogs can do many things like filter certain items, order them and more. You will often just connect them to a template and visualize the result, by you can also use it in your code. Here's how:

```razor
@foreach(var tag in AsList(App.Query["SortedTags"])) {
  <li class='@("app-blog-tag" + tag.ManualWeight)'>
    <a href='@Link.To("tag= " tag.Tag)' title="@tag.Name">
      @tag.Name
    </a>
  </li>
}
```

Technically the `App.Query` is a `IDictionary<string, IDataSource>`, meaning that it's a dictionary using string identifiers (names), returning an [`IDataSource`](xref:NetCode.DataSources.DataSource) object. 

It's important to realize that a [DataSource](xref:NetCode.DataSources.DataSource) can deliver multiple [streams of data](xref:ToSic.Eav.DataSource.IDataStream) - a bit like delivering multiple tables. Each stream has a name, and you must specify which stream you want to work with. In the above example, we're using the `Default` stream as defined with `App.Query["SortedTags"]["Default"]`.


## Read also #todoc


## Demo App and further links #todoc


## History
1. Introduced in 2sxc 05.05
2. Stable since 2sxc 06.00
3. Data-API was introduced in 2sxc 06.05
