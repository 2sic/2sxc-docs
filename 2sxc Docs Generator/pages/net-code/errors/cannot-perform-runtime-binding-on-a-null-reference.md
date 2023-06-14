---
uid: NetCode.Errors.RuntimeBindingOnNullReference
---

# Error Cannot perform runtime binding on a null reference

If you see an error like this:

```text
Error: Microsoft.CSharp.RuntimeBinder.RuntimeBinderException: Cannot perform runtime binding on a null reference at ToSic.Sxc.Engines.RazorEngine.Render(TextWriter writer, Object data) in C:\Projects\2sxc\2sxc\Src\Dnn\ToSic.Sxc.Dnn.Razor\Engines\Razor\RazorEngine.cs:line 108 at ToSic.Sxc.Engines.RazorEngine.RenderTemplate(Object data) in C:\Projects\2sxc\2sxc\Src\Dnn\ToSic.Sxc.Dnn.Razor\Engines\Razor\RazorEngine.cs:line 118 at ToSic.Sxc.Engines.EngineBase.Render(Object data) in C:\Projects\2sxc\2sxc\Src\Sxc\ToSic.Sxc\Engines\EngineBase.cs:line 171 at ToSic.Sxc.Blocks.BlockBuilder.RenderInternal(Object data) in C:\Projects\2sxc\2sxc\Src\Sxc\ToSic.Sxc\Blocks\BlockBuilder_Render.cs:line 123
```

It usually means that you **tried to access a method** which

* doesn't exist
* and it tried it on a `dynamic` object.

## Background: `dynamic` Objects

In Razor, especially before 2sxc 16 which introduced the strictly typed mode, most object are `dynamic`.
This means that the compiler doesn't know what's in them, and can't check if a method exists.

Example using a Razor14 class or earlier:

```cs
// Settings is a dynamic object in Razor14 or similar
// This works, because the method "Get(...)" exists
Settings.Get("SomeSetting");

// This kind of call will fail at RUNTIME
// Because the compiler can't check earlier if the method exists
var willBreak = Settings.IsOk();
```

Note that this problem can also occur in more complex code, such as:

```cs
// a is treated as dynamic
// since part of the logic uses a dynamic object
var a = SomeKindOfHelper.CheckIfNull(Settings) ? "ok" : "not ok";

// This will fail at runtime with the above message
a.DoSomethingImpossible();
```

## Solution: Fix your Code

This one is often hard to fix, since the compiler doesn't tell us what line it ocurred on.

We recommend you comment out most of the code till it works, then add it back in piece by piece.
