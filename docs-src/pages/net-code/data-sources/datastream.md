---
uid: NetCode.DataSources.DataStream
---

# Data Streams (IDataStream)

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .datasource { visibility: visible; } </style>

DataStreams are objects which behave like a table or a list. They deliver a bunch of content-items/Entities.
Common examples in [Razor-templates](xref:NetCode.Razor.Component) are:

1. [Data["Default"]](xref:NetCode.DynamicCode.Data)  
    This is a data-stream containing all content-items prepared for the template.
2. [App.Data["Tag"]](xref:NetCode.DynamicCode.Objects.App.Data)  
    This would be a data-stream containing all tag-items in the entire app, if the App has `Tag` items.

> [!TIP]
> All [DataSources](xref:NetCode.DataSources.DataSource) have at least one **Out**-stream called `Default`. But they can have more streams as well.
>
> Most DataSources also have one or more **In** streams providing data or configuration to that DataSource which will then give a modified list to the **Out**.

## How to use

The most commen uses will loop through all items in such a stream and show them. Here's an example:

```cs
<ol>
  @foreach(var person in Data["Default"]){
    <li>@AsDynamic(person).FullName</li>
  }
</ol>
```

The `@foreach` will go through all the items. Each item is of the type [IEntity](xref:NetCode.DynamicData.Entity). To make it easier to template, we convert it to a [Dynamic Entity](xref:NetCode.DynamicData.DynamicEntity) using [`AsDynamic`](xref:NetCode.DynamicCode.AsDynamic) and then we can just show the name with `.FullName`.

In most cases we will need the loop-item a lot, and would preferr to not write `AsDynamic` every time. Because of this, we usually write the [`AsList`](xref:NetCode.DynamicCode.AsList) in the Loop, like this:

```cs
<ol>
  @foreach(var person in AsList(Data["Default"])) {
    <li>@person.FullName - born @person.Birthday and married to @person.SpouseName</li>
  }
</ol>
```

[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]

## Advanced Use Cases

There are some advanced use-cases where you need to know more about the [`IDataStream`](xref:ToSic.Eav.DataSource.IDataStream) object, mostly when using LINQ. This is fairly rare, and if you really need to know more, it's best to consult the EAV DataSource code.

Just a few more details you might care about:

1. The stream has a property `Source` which points to the owning [DataSource](xref:NetCode.DataSources.DataSource).
1. a stream might be attached to many targets for further processing or for templating, but the stream doesn't know about this
1. you can always looup through items on the stream itself using LINQ, like  
    `var blues = Data["Default"].Where(x => AsDynamic(x).Category == "Blue"))`  
    see also [](xref:NetCode.Data.Linq.Index)

of course there's always quite a bit more to it, like auto-caching, but you usually don't need to understand all that.  

## Read also

* [DataSources](xref:NetCode.DataSources.DataSource)

## History

1. Introduced in 2sxc 01.00
2. Multi-Language since 2sxc 02.00

