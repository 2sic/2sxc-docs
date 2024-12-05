---
uid: Abyss.Contribute.Docs.SourceCode.Index
---

# Document Code

## Basic Documentation

Add normal documentation with `/// <summary>` tags to your code, like this:

```cs
/// <summary>
/// Constructor which does xyz
/// </summary>
/// <param name="id">the id</param>
public MyMethod(int id) { }
```

All this is automatically picked up and converted to documentation.

## Referencing Other Classes

If you want to reference other classes, you can use the `<see cref="..."/>` tag:

```cs
/// <summary>
/// This method uses the <see cref="Oqtane.Example.MyClass"/> to do something.
/// </summary>
public void MyMethod() { }
```

## Referencing Other Methods

You can also reference other methods:

```cs
/// <summary>
/// This method uses the <see cref="MyMethod"/> to do something.
/// </summary>
public void MyMethod() { }
```

## Referencing Other Docs

If you want to reference other docs, you can use the `[xxx](xref:UID)` tag:

```cs
/// <summary>
/// This method uses the [Xyz Conventions](xref:Pages.Conventions.Xyz) to do something.
/// </summary>
public void MyMethod() { }
```

## Using Markdown in C# Docs

You can also use markdown in your C# docs, like this:

```cs
/// <summary>
/// This method is **great** for `null`.
///
/// Here is a list:
/// 1. Do this
/// 1. Then that
/// </summary>
public void MyMethod() { }
```


## Adding Extensive Documentation

Let's assume you have a class `Oqtane.Example.MyClass` and you would like to
add images and a lot of markdown to explain what it does. This is your code:

```cs
namespace Oqtane.Example;
public class MyClass
{
}
```

Now go to the documentation project `Oqtane.Docs` in the solution and open
the `apidoc\Example` folder (create it, if it doesn't exist yet').
In this, create a `MyClass.md` file which contains this

```md
---
uid: Oqtane.Example.MyClass
---

Here is some **great** additional [Information](https://oqtane.org).

1. Do this
1. Then that

```

Because you have the `uid: ...` header in your file,
docfx will now combine these documentations in the output.
You can also add images, html, or whatever you need.

You can also find examples of this merge in the
`apidoc\Documentation\PublicApi.md` file.

---

[!include[](~/shared/authors/iJungleboy/_main-author.md)]
