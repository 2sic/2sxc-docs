---
uid: NetCode.DynamicCode.AsDynamicString
---
# AsDynamic({ "Some": "Json-String"})

2sxc v10.20 introduced another cool helper. It takes any JSON string and gives you a dynamic object to use in your code. 

The most common use is in GPS fields, where the data is stored as `{"Lat": 0.0, "Long": 0.0}`. But you can use it for so much more. 

⚡ The [official API docs](xref:Custom.Hybrid.Razor12.AsDynamic(System.String,System.String)).


[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]


## Example

```cs
// assume Address is a Dynamic Entity with a Gps property

var coords = AsDynamic(Address.Gps);
var lat = coords.Lat;
var long = coord.Long;

```

Read more: Check out the API Docs of e.g. [](xref:Custom.Hybrid.Razor12)


## History

1. Introduced in 2sxc 10.20
