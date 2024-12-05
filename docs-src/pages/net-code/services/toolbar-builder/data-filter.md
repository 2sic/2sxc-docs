---
uid: ToSic.Sxc.Services.ToolbarBuilder.DataFilter
---

<img src="~/assets/features/toolbar.svg" class="feature">

# Toolbar Builder Guide – Filter Parameter

> [!IMPORTANT]
> The examples below explain how to use the `filter:` parameter.
> Starting in v15.07+ we recommend using the [Tweak API](xref:ToSic.Sxc.Services.ToolbarBuilder.TweakButtons) instead.

The **Filter** reduces the amount of items shown in a Data-List.  

It is given to the `data` command using the `filter` parameter
which is an optional parameter and [must be named](xref:NetCode.Conventions.NamedParameters).

## `filter` Parameters

The `filter` can contain multiple filters to filter a list of entities in the admin-UI.

You could for example only show all items containing the word `something`.
But the most common case is to restrict entities shown to these
having a child-relationship with something else.

> **Example**
> You may have a list of `Books` and only wish to show all of the books
> by the `Author` by the name of _Daniel Mettler_.
> You could try to filter by the name, but that's not reliable,
> so you would usually want to filter by the unique ID of _Daniel Mettler_.


## Ways to Set the Filter

The following examples assume you're calling `.Data` on the IToolbarBuilder from the IToolbarService.
So typically it would be something like this in front of each line:

```c#
@Kit.Toolbar.Default().Data("Books", filter: ...);
```

Basic syntax which worked ca. v14.07

```c#
// Simple relationship: Author has entity with ID 52
Data(..., filter: "Author=52");

// Simple relationship: Author has entity with ID 52 OR 302
Data(..., filter: "Author=[52,302]");


// Two filters (AND, so both must match)
Data(..., filter: "Author=52&Publisher=9306");

// The same as a object
Data(..., filter: new { Author = 52, Publisher = 9306 }); 
```

Advanced, simpler options requiring v14.07.05

```c#
// Values with Arrays automatically get converted
Data(..., filter: new { Author = new int[] { 52 } }); 
Data(..., filter: new { Author = new int[] { 52, 58, 29 } }); 

// Filter conditions pointing to an Entity
var someAuthor = App.Data["Author"].First();
Data(..., filter: new { Author = someAuthor });

// Multiple Authors
Data(..., filter: new { Author = new object[] { someAuthor, someAuthor } });

// IEnumerable of Authors
var lotsOfAuthors = AsList(App.Data["Author"]).Select(a => a.LastName == "Mettler");
Data(..., filter: new { Author = lotsOfAuthors });
```



---

See also

* the JS [toolbar docs](xref:JsCode.Toolbars.Simple)
* list of all [common UI parameters can be found here](xref:Basics.Browser.EditUx.Toolbars.ButtonUi)
