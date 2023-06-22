
# Planned Removals for 2sxc v17

For 2sxc 17 we plan to remove some very old APIs.
The process is as follows:

1. Mark the API as deprecated in the code
1. Add internal code which warns the admin that the App is using deprecated code
1. Provide guidance here how to resolve
1. Make sure the warnings have been around for at least 6 months
1. Remove the code on the next major release

For v17 we plan to remove some very old APIs, which we believe are probably not even used any more.
This is the list:

* The old namespace `ToSic.SexyContent.Interfaces.IApp` and all related code  
  We believe this is probably not used at all, since it's probably only ever used to access `App.Configuration` which is `dynamic` when using this interface,
  but a normal object with typed properties when using the normal `ToSic.Sxc.Apps.IApp` interface.


## Guide to Fixing Issues

### Fixing SexyContent.Interfaces.IApp removal

#### Background

A long time ago 2sxc was called **SexyContent** and we used the namespace `ToSic.SexyContent.Interfaces` for various things.
Ca. 2014, we decided to rename it to **2sxc** and use a `ToSic.Sxc` namespace instead.
In addition to that, we created a clearer namespace structure.

#### Am I Affected?

Most code does _not_ explicitly use namespaces, and if your code is newer than 2016, you are probably not affected.

But if you have **any** code which uses the namespace `ToSic.SexyContent` in your Razor or C# code you are affected.

This is especially true if you have code such as:

```c#
using SexyContent.Interfaces;
IApp app = App;
var version = app.Configuration.Version;
```

#### How to Fix

It's difficult to give you an exact guideline, because we don't know what your code does.
But in most cases, you'll just be working with the current `App` object which is typed as [](xref:ToSic.Sxc.Apps.IApp).
So in most cases, you don't need to specify the type at all, just use something like:

```c#
var app = App;
var version = App.Configuration.Get("Version");
```



