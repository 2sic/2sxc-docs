---
uid: Abyss.Releases.History.V20.ListElement
---

# Fix Breaking Change _List of Elements_ in v20

**Keywords:** #Deprecated #ListOfElement

2sxc v20 cleans up some historic, deprecated functionality.
They were not used much, but if you have old code which used this, here's how to fix any code in production.

These old Razor and WebApi base classes...

* `ToSic.SexyContent.Razor.SexyContentWebPage`
* `ToSic.SexyContent.WebApi.SxcApiController`

...had a property called `List` which provided a list of `Element` objects to loop through.
This was deprecated in v12, and replaced with the new Razor base classes which are much better.

The old classes kept working, to avoid breaking existing apps, but they were not recommended for new apps.
It's time to move on, so in v20 we removed the old classes and their `List` property.

> [!WARNING]
> Despite these classes being very old, and nobody creating new code with them,
> there are still old apps using them, so this will break those apps.
>
> The main problem though is that any Razor file without a `@inherits` directive will use the old Razor base class,
> so chances are someone still accidentally used this flaky `List` property.

## Reason for Removal

There are two key risk of leaving very old APIs alive:

1. maintenance and testing for the developers of 2sxc - who work for free - goes up and up and up.
1. people tend to discover old code and reuse it, spreading bad code practices.

So it was time to clean up in this MoT release.

## History - How it Used to Work

Previously you could write code like this in your Razor:

```razor
@foreach(var e in List) {
  var Content = e.Content;
  var Presentation = e.Presentation;
  // your code here
}
```

Basically the `Element` just had two properties, the `Content` and the `Presentation`.

## What we Changed

The `List` property was removed on these old Razor/WebApi base classes, so it would force people to move on.

## Upgrade to Newer functionality

You have two options:

1. **Use the new Razor base classes**: If you are using Razor, switch to the new Razor base classes which are much better. recommended!
1. Quickly fudge the code so it works again.

If you just want to fudge the code, you can use this code to get the same functionality.

### Example 1 - using Content only

Original:

```razor
@foreach(var Element in List)
{
  var Content = Element.Content;
  // your code here
}
```

Quick fudge:

```razor
@foreach (var Content in AsDynamic(Data.List)) {
  // your code here
}
```

### Example 2 - using Content and IndexOf

Some of our old code used the `IndexOf` method to get the index of the current item in the list.

Original:

```razor
@foreach(var Element in List)
{
  var Content = Element.Content;
  <div class="co-slide sc-element co-slide-@List.IndexOf(Element)">
    // your code here
  </div>
}
```

Quick fudge:

```razor
@{
  // create a proper list, so we can use IndexOf
  var list = AsDynamic(Data.List).ToList();
}
@foreach (var Content in list)
{
  <div class="co-slide sc-element co-slide-@list.IndexOf(Content)">
    // your code here
  </div>
}
```

### Example 3 - using Content and Presentation

Original:

```razor
@foreach(var e in List) {
  var Content = e.Content;
  var Presentation = e.Presentation;
  // your code here
}
```

Quick fudge:

```razor
@foreach (var Content in AsDynamic(Data.List)) {
  var Presentation = Content.Presentation;
  // your code here
}
```

This will have the same effect as the previous example, namely:

1. looping through the `Data.List` which is a list of `IEntity` objects
2. using `AsDynamic` to convert the list of `IEntity` to dynamic objects, the main one being `Content`
3. using `Content.Presentation` to get the presentation of the content

---

## History

* Introduced for DNN ca. 2sxc 1
* Deprecated in 2sxc 12 with the new base classes
* Planned for full removal in 2sxc 15 ca. middle of 2022
* Finally removed in 2sxc 20 ca. 2025-06

---

Shortlink to here: <https://go.2sxc.org/brc-20-list-element>
