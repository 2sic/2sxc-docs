---
uid: Abyss.Contribute.Docs.Edit.Markdown.Index
---

[!include["many-projects"](../_docs-for-many-projects.md)]

# Markdown Basics

If you're new to wikis or github comments / documentation, you may be a bit lost when it comes to markdown.

Markdown is a simple way to format text, and it's used in many places on the internet. It's easy to learn and use, and it's a great way to format text for the web.

Here's an example:

```markdown
# This is a header

This is some text. You can make text **bold** or _italic_.

* This is a list
* With some items
```

Refer to [Markdown](http://daringfireball.net/projects/markdown/) for how to write markdown files. Here the most important tips for people working with this:

## Use Markdown Linting

To make sure your markdown is well-formatted, you can use a linter. A linter is a tool that checks your code for errors and formatting issues.

For our setup, we recommend the the [Markdown Lint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) extension.

💡 The linter should already be installed if you followed the basic [setup instructions](xref:Abyss.Contribute.Docs.Setup.Index).

## Markdown for Text

I think the most important things you need to know are these.


* Headers have 1-6 hashes in front, like `## Header 2`
* **bold** uses two `*` chars around the text, _\_italic\__ uses one `_` char
* escape chars with the `\` slash (so any character right after a \\ is shown and doesn't format)
* Linking has many options, better read the manuals
* Lists have many options, better read the manuals
* Images use a `![alt-text](/assets/path/file.ext)` syntax
* Note that line-breaks usually don't cause a line-break in the result (except in code-samples). You can enforce a simple line break by adding two spaces at the end of a line like "check out:  " (two spaces after the ":")

## Markdown Links

1. Link to a [website](https://www.oqtane.org/) `[website](https://www.oqtane.org/)`
1. Link to another [page](./galleries.md) `[page](./galleries.md)`
1. Link to some namespace [](xref:ToSxc.Eav.Data) `[](xref:ToSxc.Eav.Data)` - will automatically pick the name of the target
1. Link to a class [](xref:ToSxc.Eav.Data.IEntity) `[](xref:ToSxc.Eav.Data.IEntity)`

## Markdown Checklists (IFrame)

If you want to add checklists like this example, just use this checklist 😎

<iframe src="https://azing.org/oqtane/r/axPFtp2W?embed=1" width="100%" height="400" frameborder="0" allowfullscreen style="box-shadow: 0 1px 3px rgba(60,64,67,.3), 0 4px 8px 3px rgba(60,64,67,.15)"></iframe>


## Markdown Videos

Todo

---

[!include[](~/shared/authors/iJungleboy/_main-author.md)]
