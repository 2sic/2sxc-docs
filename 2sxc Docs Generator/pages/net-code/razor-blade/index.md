---
uid: NetCode.RazorBlade.Index
---

<img src="./assets/razor-blade-logo.png" width="100%">

# RazorBlade Library

2sxc includes RazorBlade - a very neat library of helper tools to get things done. It includes features such as:

1. [Text](https://razor-blade.net/api/ToSic.Razor.Blade.Text.html) helpers to check if something has text, truncate/ellipsis text and more
1. [Tags](https://razor-blade.net/api/ToSic.Razor.Blade.Tags.html) helpers to strip HTML, make safe URLs and more
1. [Tag](https://razor-blade.net/api/ToSic.Razor.Blade.Tag.html) fluent API to create complex HTML using code
1. [HtmlPage](https://razor-blade.net/api/ToSic.Razor.Blade.HtmlPage.html) helper to change the page title, add meta- and open-graph headers etc.

[!include["RazorBlade Tutorials"](~/shared/tutorials/razor-blade.md)]

## Example

The following example is taken from the tutorials. It shows how to use `@Text.Zip(...)` to ensure that a string containing random white spaces is cleaned up. This is useful for counting visible characters or truncating text. 

```razor
@inherits Custom.Hybrid.Razor12
@using ToSic.Razor.Blade;
@{
  var samples = new string[] {
    "This        contains multi-spaces and \t\t\t tabs",
    "This has \n  \n line-breaks"
  };
}

<h2>Correct and incorrect Character Counts</h2>

<table class="table table-hover" width="100%">
    <!-- table header -->
    <tr>
        <th>Html output hides the problems</th>
        <th class="table-warning">Whitespace output showing problems</th>
        <th>Length</th>
        <th class="table-success">Output using Text.Zip(...)</th>
        <th>Zip Length</th>
    </tr>
    <!-- the real code -->
    @foreach(var s in samples) {
      <tr>
        <td>@s </td>
        <td  class="table-warning" style="white-space: pre-wrap;">@s</td>
        <td>@s.Length </td>
        <td class="table-success" style="white-space: pre-wrap;">@Text.Zip(s)</td>
        <td>@Text.Zip(s).Length</td>
      </tr>
    }
</table>
```

## Learn to Leverage RazorBlade

* Visit [](xref:Ext.RazorBlade)
* Check out the [](xref:Tut.RazorBlade.Home)
* [WolfExMachina tutorial for OpenGraph](https://wolfxmachina.com/blog/category/dnn/implement-opengraph-for-facebook-and-twitter-cards-in-dnn-using-2sxc)