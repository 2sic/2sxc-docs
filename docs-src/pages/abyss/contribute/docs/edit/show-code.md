---
uid: Abyss.Contribute.Docs.Edit.ShowCode
---

# Markdown to Show Code from Source Files

Sometimes it's best to just show some code from an existing source file.
This ensures that the docs are always up to date.

DocFx has a few ways of doing this, best check out

* [the docs - fairly sparse though](https://dotnet.github.io/docfx/docs/markdown.html?tabs=linux%2Cdotnet#code-snippet)
* [code which is used to extract regions](https://github.com/dotnet/docfx/blob/main/src/Docfx.MarkdigEngine.Extensions/CodeSnippet/HtmlCodeSnippetRenderer.cs)
* [the unit tests which show demos](https://github.com/dotnet/docfx/blob/main/test/Docfx.MarkdigEngine.Extensions.Tests/CodeSnippetTest.cs)

## Basic Concept

It always starts with a `[!code-csharp[](...)]` tag, where the `...` is the path to the file.

You can also specify other languages like `[!code-xml[](...)]` or `[!code-js[](...)]`.

You can also specify that you only want part of the like, like using `#L10-L21` to show lines 10 to 21.

You can also specify other ways to use ranges - see below.

You can also highlight parts of the file `?highlight=2,5-7,9-`.

There are even more features but they are not well documented, such as `?range=...` or `?dedent=...`.

## Show Entire File

To show an entire file, you can use the following syntax:

```markdown
[!code-csharp[](../../../../../../eav-server/ToSic.Lib.DI.Tests/SwitchableServices/VerifySwitchableService.cs)]
```

## Show Specific Lines

When using range selectors such as `#L10-L21`, basically any language works.

To show specific lines, you can use the following syntax:

```markdown
[!code-csharp[](../../../../../../eav-server/ToSic.Lib.DI.Tests/SwitchableServices/VerifySwitchableService.cs#L10-L21)]
```

## Show Specific Lines with Highlighting

To show specific lines with highlighting, you can use the following syntax:

```markdown
[!code-csharp[](../../../../../../eav-server/ToSic.Lib.DI.Tests/SwitchableServices/VerifySwitchableService.cs?highlight=2,5-7,9-#L10-L21)]
```

## Show Specific Lines with Highlighting and Dedent

To show specific lines with highlighting and dedent, you can use the following syntax:

```markdown
[!code-csharp[](../../../../../../eav-server/ToSic.Lib.DI.Tests/SwitchableServices/VerifySwitchableService.cs?highlight=2,5-7,9-#L10-L21&dedent=2)]
```

## Show Specific Regions

Regions are marked in different ways in different languages.
In C# you can use `#region` and `#endregion`.

To show a specific region, you can use the following syntax:

```markdown
[!code-csharp[](../../../../../../eav-server/ToSic.Lib.DI.Tests/SwitchableServices/VerifySwitchableService.cs?#MyRegion)]
```

Based on our experience and the [code shown in the range detectors](https://github.com/dotnet/docfx/blob/main/src/Docfx.MarkdigEngine.Extensions/CodeSnippet/HtmlCodeSnippetRenderer.cs)
if you want Razor extracts we recommend using `!code-xml` and `<!--<IdentityTag>-->` as the region marker.

```html
<div>stuff we don't show</div>
<!--<IdentityTag>-->
<div>stuff we show</div>
<!--</IdentityTag>-->
```

And the markdown would be:

```markdown
[!code-xml[](../SomeFile.razor?#IdentityTag)]
```
