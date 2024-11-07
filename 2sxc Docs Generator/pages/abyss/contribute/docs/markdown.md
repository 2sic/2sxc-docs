---
uid: Abyss.Contribute.Docs.Markdown
---

# About the Markdown Syntax

If you're new to wikis or github comments / documentation, you may be a bit lost when it comes to markdown. I think the most important things you need to know are:

* Headers have 1-6 hashes in front, like `## Header 2`
* **bold** uses two \* chars around the text, _\_italic\__ uses one \_ char, escaping chars uses the \ slash (so any character right after a \\ is shown and doesn't format)
* Linking has many options, better read the manuals
* Lists have many options, better read the manuals
* Images use a \!\[alt-text\](/assets/path/file.ext) syntax
* Note that line-breaks usually don't cause a line-break in the result (except in code-samples). You can enforce a simple line break by adding two spaces at the end of a line like "check out:  " (two spaces after the ":")

Inline code starts and ends with a "\`" character - like \`code\` - it will then look like `code`

Multi-line code blocks start with three of these, like
\`\`\`
var x = 17; // a comment
\`\`\`
resulting in

```
var x = 17; // a comment
```

Multi-line code with syntax highlighting needs you to specifiy the language c#:

\`\`\`c#
var x = 17; // a comment
\`\`\`
resulting in

```cs
var x = 17; // a comment
```
