---
uid: NetCode.WebApi.DotNet.SaveInAdam
---

# SaveInAdam(...) Command in ApiController

The `SaveInAdam` command helps your WebApi to upload files so they are in an ADAM container of an item. 

The API is documented [here](xref:ToSic.Sxc.WebApi.IDynamicWebApi.SaveInAdam*) and on this page we'll explain how to use it.

## How to use
Here's a simple example, taken from [mobius forms](https://github.com/2sic/app-mobius-forms/blob/master/api/FormController.cs)

```cs
SaveInAdam(stream: dataStream,
    fileName: fileNameInForm,
    contentType: "Advertisement",
    guid: guid,
    field: "Images");
```

Here's what the parameters are:

1. `stream` contains a stream of bytes with the file
1. `fileName` contain the file name
1. `contentType` is the content-type of the entity we're saving to
1. `guid` is the entity-guid which receives this item
1. `field` is the field we're saving to

## Example

The following example is also from [mobius forms](https://github.com/2sic/app-mobius-forms/blob/master/api/FormController.cs) and assumes that the html form encoded the data in JavaScript for sending to the WebApi:

```cs
// Save files to Adam
var files = ((Newtonsoft.Json.Linq.JArray)contactFormRequest["Files"])
    .ToObject<IEnumerable<Dictionary<string, string>>>();
foreach(var file in files)
{
    var data = Convert.FromBase64String((file["Encoded"]).Split(',')[1]);
    SaveInAdam(stream: new MemoryStream(data),
        fileName: file["Name"],
        contentType: type.Name,
        guid: guid,
        field: file["Field"]);
}

```


## Notes and Clarifications

* all parameters (`stream`, `fileName`, ...) must be named by [convention](xref:NetCode.Conventions.NamedParameters)
* the uploaded files are placed in the container of the field...
* ...and not added as a link to the file, so you will usually use library fields
* the field must be a field of type hyperlink, library or wysiwyg, other fields cannot receive files


## Difference in Field-Library and Field-Link-Default

Note that the form has two different ways the field can behave. In [hyperlink-Library](xref:Basics.Data.Fields.Hyperlink-Library) mode nothing is really stored in the field name, the UI will simply load all the files in a folder that belong to that field. `SaveInAdam` will simply add files to this folder, so the most common way to use it is that the entity will have a link-library field to browse one or more files uploaded. 

If you really only want 1 file to be uploaded, and want to put it into the field as if it's linked directly, then choose a [hyperlink-default](xref:Basics.Data.Fields.Hyperlink-Default) field. `SaveInAdam` will give you a IFile object which has an `Id`. Use that to create a `file:72` kind of link and add it to data you just created. 

## Read also, Demo App and further links

You should find some code examples in these apps

* [C# API Documentation of SaveInAdam](xref:ToSic.Sxc.WebApi.IDynamicWebApi.SaveInAdam*)
* [Mobius Forms v2 in App Catalog](xref:App.Mobius)
* [Mobius Forms v2 on Github](https://github.com/2sic/app-mobius-forms)
* [Blog Recipe for uploading into ADAM in your WebAPI](https://2sxc.org/en/blog/post/recipe-form-files-saveinadam-in-your-custom-webapi)

## History

1. Introduced in 2sxc 9.30
