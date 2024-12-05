---
uid: Abyss.Contribute.Docs.Edit.MarkdownCode
---

# Markdown to Show Code Snippets

## Inline Code

Inline code starts and ends with a backtick `` ` `` character - like `` `code` `` - it will then look like `code`

## Multi-Line Code Blocks

Multi-line code blocks start with three of these, like

``````text
```
var x = 17; // a comment
```
``````

resulting in

```text
var x = 17; // a comment
```

## Syntax Highlighting

Multi-line code with syntax highlighting needs you to specify the language c#:

``````text
```c#
var x = 17; // a comment
```
``````

resulting in

```cs
var x = 17; // a comment
```

## Supported Languages

DocFX supports many languages for syntax highlighting, including:

* `c#` / `cs` / `csharp`
* `js` / `javascript` / `ts` / `typescript`
* `html`
* `xml`
* `json`
* `yml` / `yaml`
* `css` / `scss` / `less`
* `sql`
* `text`
* `bash` / `shell` / `powershell`
* `markdown`

Because of changes we applied to highlightjs, we can now also support:

* `razor`
