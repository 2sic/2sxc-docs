---
uid: NetCode.DataSources.Custom.Provide
---

# DataSource API: Provide(...)

[!include[](~/basics/stack/_shared-float-summary.md)]
<style> .context-box-summary .datasource-custom { visibility: visible; } </style>

DataSources always provide data on an [`Out` Stream](xref:NetCode.DataSources.Custom.StreamsOut). The `Provide` method makes it very easy to do. 

## How to use Provide

In general, you need

1. a method like `GetList()` which returns an `IEnumerable<IEntity>`
1. attach that stream to the `Out` - usually on a stream called `Default`

Here's a simple example of the constructor of the [DnnFormAndList DataSource](https://github.com/2sic/dnn-datasource-form-and-list), which provides the default stream: 

```cs
public DnnFormAndList()
{
    // Specify what out-streams this data-source provides. Usually just one, called "Default"
    Provide(GetList); // does everything

    // ...
}
private IEnumerable<IEntity> GetList() 
{
    // ...
} 
```
This example ensures that the `.Out["Default"]` as well as the `.List` (which is a shorthand for `.Out[Constants.DefaultStreamName].List`) are mounted, ready to deliver.

## Overloads

* `Provide(listfunction)` - default version, which provides the "Default" stream
* `Provide(name, listfunction)` - alternative for named streams when your DataSource has more streams. 

## Providing multiple streams
In case you want to offer multiple streams (like one containing products, the other categories), the common pattern is:

```cs
public SomeConstructor()
{
    Provide(GetProducts);
    Provide("Categories", GetCategories);

    // ...
}
```



## Read also

* [DataSource API](xref:NetCode.DataSources.Custom.Api) - DataSource API overview
* [Ensuring configuration is parsed](xref:NetCode.DataSources.Custom.ConfigurationParse)

## Demo App and further links

* todo

## History

1. Introduced in EAV 4.x, 2sxc 09.13
