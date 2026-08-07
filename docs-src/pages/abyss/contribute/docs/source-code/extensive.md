---
uid: Abyss.Contribute.Docs.SourceCode.Extensive
---

[!include["many-projects"](../_docs-for-many-projects.md)]

# Add Extensive Documentation To Source Code

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

> [!WARNING]
> There is a bug in this system. If your markdown contains more than one `---` (triple dash)
> it will break the docfx build.
>
> So make sure you use 6 dashes instead for this, to not confuse the yaml-header parser.
> Use `------` instead of `---` in these **override** markdown files.
>
> See [this issue](https://github.com/dotnet/docfx/issues/11088) for more information.

---

[!include[](~/shared/authors/iJungleboy/_main-author.md)]
