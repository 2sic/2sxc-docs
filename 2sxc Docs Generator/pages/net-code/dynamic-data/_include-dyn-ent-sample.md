## Code example using a Dynamic Entity

We'll assume we have a _Content Type_ called **Book** with the following properties:

* **Title** (text, 1-line)
* **Teaser** (text, multi-line)
* **Description** (text, html)
* **ReleaseDate** (date)
* **Author** (entity - another content item)

Here's a code example in a C# Razor template:

```razor
<!--
  The default variable for the current item is Content, 
  we'll just use another name for this sample
  note that .Title is automatically provided, 
  because the content-type has the property title. 
-->
<h1>@Content.Title</h1>
<div>@Content.Description</div>
<div>Author: @Content.Author.FullName</div>
```

So basically all properties of this book can be shown using `[Object].[PropertyName]` - for example `Content.ReleaseDate`.
