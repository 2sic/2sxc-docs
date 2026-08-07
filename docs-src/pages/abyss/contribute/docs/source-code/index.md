---
uid: Abyss.Contribute.Docs.SourceCode.Index
---

[!include["many-projects"](../_docs-for-many-projects.md)]

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

---

[!include[](~/shared/authors/iJungleboy/_main-author.md)]
