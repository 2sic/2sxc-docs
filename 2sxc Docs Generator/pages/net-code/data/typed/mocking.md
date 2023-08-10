---
uid: NetCode.Data.Typed.Mocking.Index
---

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-all, .context-box-summary .prepare-all { visibility: visible; } </style>

# Mocking Typed Data

In some scenarios you have code which expects to work with existing data,
but in certain cases the data may not be available.

## Example Scenario

Imagine you have a Razor which shows details about a building,
but in some cases the build data is not available.
In this case you want to show a fallback, like a default building.

For this, the pseudo-code would look like this:

```razor
@{
  var building = expectedBuilding;
}
<h1>@building.Title</h1>
<table>
  <!-- show specs -->
<table>
```

## How to Show Mock Data instead

### Option 1: Lots of `if`-statements

You could use a bunch of if-statements everywhere, but this is not elegant.
That would look a bit like this:

```razor
@{
  var building = expectedBuilding;
  var mockTitle = "Default Building";
}
<h1>
  @if (expectedBuilding != null) {
    @expectedBuilding.Title
  } else {
    @mockTitle
  }
</h1>
```

### Option 2: Use a special Dummy-Entity (record)

You could have a special entity containing the demo data, and use that.
This is the approach which is provided by default in views which should show dummy-data until the editor adds custom information.

In the default-views-setup this just magically works, because the view-configuration
knows what item to provide when there is no user-data yet.

But for more advanced scenarios, you would need to do this manually.
It would look a bit like this:

```razor
@{
  var building = expectedBuilding
    ?? AsItems(App.Data["Buildings"]).FirstOrDefault(b => b.SpecialId == "Dummy");
}
<h1>@expectedBuilding.Title</h1>
```

This is a reasonable approach and should be used where it makes sense.
But there are issues with this:

1. It requires a clear way to find the dummy-item in the list of all items, and this marker should never change
1. The list of all data always contains some dummy data, which must be filtered out in other scenarios

### Option 3: Use Mock Data

A very popular way to handle this is using mock data.
Here's an example:

```razor
@{
  var building = expectedBuilding
    ?? AsItem(new {
      Title = "Default Building",
      Description = "This is a default building",
      Image = "file:72",
    }, mock: true);
}
<h1>@expectedBuilding.Title</h1>
```

Note the `mock: true` in the `AsItem(new {...}, mock: true)`.
Without this parameter, 2sxc would throw an error.
The reason is that 2sxc wants to make sure that you are aware that you are using mock data.
So _without_ the `mock: true`, 2sxc will only accept Entity-like objects in `AsItem()`.
With the `mock: true` it will also accept any other object, and will then create a mock-entity from it.

## Basic Mock Data

The mock data API is quite powerful, so let's see some advanced examples:

```c#
var m = AsItem(new {
    Id = 99999,               // The Id will be available on m.Id
    Guid = Guid.NewGuid(),    // The Guid will be available on m.Guid
    Title = "Dummy Item",     // The Title will be available on m.Title
    SomeNumber = 42,          // eg. for m.Int("SomeNumber") or m.Float("SomeNumber")
    SomeString = "Hello",     // eg. for m.String("SomeString")
  }, mock: true);
```

## Mock Data with Sub-Objects

Items can have sub-objects such as Children or the special `Presentation` object.
Here are some examples:

```c#
var m = AsItem(new {
    Presentation = new {                  // m.Presentation
      Highlight = true,                   // m.Presentation.Bool("Highlight")
      GalleryMode = "tiles",              // m.Presentation.String("GalleryMode")
    },
    Architect = new {                     // m.Child("Architect")
      Title = "John Doe",                 // m.Child("Architect").Title
      Website = "https://www.2sxc.org",   // m.Child("Architect").String("Website")
    },
    tags = new object[] {                 // foreach(var t in m.Children("tags")
      new {
        Title = "Tag 1",
      },
      new {
        Title = "Tag 2",
      },
    }
  }, mock: true);
```

## Mock Parents

Any normal TypedItem has a Method `.Parents(...)` to find other entities which are related.
This is the opposite of `.Children(...)` which finds children.

If your code expects parents, you can mock it like this:

```c#
var m = AsItem(new {
    Parents = new object[] {                // foreach(var p in m.Parents("tags")
      new {
        Title = "How to get your dream-home",
        Type = "Blog",
      },
      new {
        Title = "Evaluating Architects",
        Type = "Blog",
      },
      new {
        Title = "Modern Architecture",
        Type = "CaseStudy",
        Field = "Primary",
      },
      new {
        Title = "Modern Architecture",
        Type = "CaseStudy",
        Field = "Example",
      },
      new {
        Title = "Modern Architecture",
        Type = "CaseStudy",
        Field = "Example",
      },

    }
  }, mock: true);
```

At first, this seems similar to the `Children` example, but there is more too it.
The reason is that the `.Parents(...)` has optional parameters:

* `type` is used to only find parents, which have a specific type, such as only `Blog` parents
* `field` allows us to restrict the list even further, eg. only type `CaseStudy` which reference this in the `Primary` field

```c#
var blogParents = m.Parents(type: "Blog");
var caseStudyParents = m.Parents(type: "CaseStudy");
var caseStudyPrimaryParents = m.Parents(type: "CaseStudy", field: "Primary");
```

## Mock Links / References

Links can be values such as `https://...` or internal references such as `page:123` or `file:50203`.
Note that the IDs in the examples below must of course exist on your system.

```c#
var m = AsItem(new {
    // m.Url("Website") and m.String("Website") both return the same
    Website = "https://www.2sxc.org",
    // m.String("ListPage") will contain `page:123`
    // m.Url("ListPage") will contain the full url to the page
    ListPage = "page:123",
    // m.String("Logo") will contain `file:50203`
    // m.Url("Logo") will contain the full url to the file
    Logo = "file:50203",
  }, mock: true);
```

## Mock Files

Typed Items can reference one or many files, using these APIs:

* `thing.File("fieldName")` to get a single `IFile`
* `thing.Folder("fieldName")` to get an `IFolder` containing zero or more files and folders

```c#
var m = AsItem(new {
    // m.String("Logo") will contain `file:50203`
    // m.Url("Logo") will contain the full url to the file
    // m.File("Logo") will contain the IFile object to this file
    Logo = "file:50203",
  }, mock: true);
```

> [!TIP]
> As of now, mocking files is possible, but mocking folders is not supported.


---


## History

1. Introduced in 2sxc v16.03
