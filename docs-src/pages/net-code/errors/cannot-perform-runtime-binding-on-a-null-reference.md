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

## Possible Causes

1. the object is null
1. the object is not what you thought it is (eg. you expected a `List<...>` but got an `IEntity`)
1. the method doesn't exist
1. the method exists, but the signature is very different from what you tried to call

## Solution: Fix your Code

In many cases the runtime will tell you what line the error was on, in which case you
can see what method was trying to be called. In other cases you don't know the exact line of code.
Our recommendation is:

### First Make sure you know what line breaks

If the compiler told you, you're lucky.
If not, you'll have to work it out. The easiest way to do this is to comment out most of the code
until you don't have an error, and put the code back in piece by piece.

### Then Figure out the Cause

The following example assumes that your object is called `myThing` and you're trying to call `myThing.DoSomething()`.

#### 1. Check if the object is null

```razor
<div>
  @* this will show true or false *@
  Debug: @(myThing == null)
</div>
```

#### 2. Check what type the object is

```razor
<div>
  @* this will show the type name *@
  Debug: @myThing.GetType().Name
</div>
```

#### 3. Check if the method and signature exists

You could do some reflection here, but once you know the type, I recommend you just check the docs.

---

Shortlink: <https://go.2sxc.org/err-binding-on-null-reference>
