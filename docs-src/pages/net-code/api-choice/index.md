---
uid: NetCode.ApiChoice.Index
---

# First: Select your API Version

2sxc has evolved over the years and has different generations of APIs.
The latest generation is the "Strongly Typed Code" which is the most powerful and recommended for new development.

The older "Dynamic Code" is still supported and used in many places,
but it's recommended to move towards Strongly Typed Code for new development.

> [!TIP]
> To understand the docs, it's important to understand which API you are looking at.
> ...and when creating something new, **make sure to to use the latest API**.

## Core API

### How is the API Selection Made?

When you create a new Razor or C# file, you have to choose a base class to inherit from.
This base class determines which API you have available.

For example, if your Razor file inherits from [Custom.Hybrid.RazorTyped](xref:Custom.Hybrid.RazorTyped),
you are using the latest Strongly Typed API.

If your Razor file inherits from [Custom.Hybrid.Razor14](xref:Custom.Hybrid.Razor14), you will get the Dynamic API.

> [!WARNING]
> If you do not specify the `@inherits` or the base class in C# or WebApi,
> you will get some very old APIs which are not recommended for use.

This is what you should look for - or specify yourself on new files:

#### [Razor](#tab/razor)

This is what it looks like in a Razor file:

```razor
@inherits Custom.Hybrid.RazorTyped
@using ...
@{
  // Your code here
}
<!-- Your HTML here -->
```

#### [C#](#tab/csharp)

This is what it looks like in a C# file:

```csharp
using ...;
public class MyClass : Custom.Hybrid.CodeTyped
{
  // Your code here
}
```

#### [WebApi](#tab/webapi)

This is what it looks like in a WebApi file:

```csharp
using ...;
public class MyController : Custom.Hybrid.ApiTyped
{
  // Your code here
}
```

---

### List of Base Classes and APIs

<table>
  <thead>
    <tr>
      <th></th>
      <th>Typed Code (Recommended)</th>
      <th>Dynamic Code (Legacy) with Kit</th>
      <th>Dynamic Code (Legacy) before Kit</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>API Generation</strong></td>
      <td>v16+ (17+ with strongly-typed)</td>
      <td>v14</td>
      <td>v12 (older APIs not shown)</td>
    </tr>
    <tr>
      <td><strong>Purpose</strong></td>
      <td>Latest and most powerful API with strong typing and IntelliSense</td>
      <td>Older API with dynamic typing, still supported but not recommended for new development</td>
      <td>Older API with dynamic typing, still supported but not recommended for new development</td>
    </tr>
    <tr>
      <td><strong>Razor Base Class</strong></td>
      <td><code>Custom.Hybrid.RazorTyped</code><br><code>Custom.Hybrid.RazorTyped&lt;T&gt;</code><br><code>AppCode.Razor.AppRazor</code><br><code>AppCode.Razor.AppRazor&lt;T&gt;</code><br><code>AppCode.Razor.Anything</code></td>
      <td><code>Custom.Hybrid.Razor14</code></td>
      <td><code>Custom.Hybrid.Razor12</code></td>
    </tr>
    <tr>
      <td><strong>C# Base Class</strong></td>
      <td><code>Custom.Hybrid.CodeTyped</code></td>
      <td><code>Custom.Hybrid.Code14</code></td>
      <td><code>Custom.Hybrid.Code12</code></td>
    </tr>
    <tr>
      <td><strong>WebApi Base Class</strong></td>
      <td><code>Custom.Hybrid.ApiTyped</code></td>
      <td><code>Custom.Hybrid.Api14</code></td>
      <td><code>Custom.Hybrid.Api12</code></td>
    </tr>
  </tbody>
</table>

### Deeper Dive into the Base Classes

For **Razor**, the `@inherits` statement is the most important part of a Razor file, as it defines which APIs are available.

👉🏽 See [Razor @inherits](xref:NetCode.ApiChoice.RazorBase)


If your **custom C# file** inherits from a base class, it will get more APIs - exactly which ones depends on the base class.

👉🏽 See [C# Base Classes](xref:NetCode.ApiChoice.CSharpBase)

If your **Custom WebApi Controller** inherits from a base class, it will get more APIs - exactly which ones depends on the base class.

👉🏽 See [WebApi Base Classes](xref:NetCode.ApiChoice.WebApiBase)


## A Word about AppCode

The latest APIs allow for pre-compiled, shared code in the `AppCode` folder,
which is a great way to share code across your app and have it be more robust and easier to debug.

To protect old code, the `AppCode` folder is only available in your Razor files if you are using the latest Strongly Typed API,
and if you have some kind of `@using AppCode` in your Razor file.
Only then will the pre-compiled DLL be available to that code.

## Configure Visual Studio Code for IntelliSense

Now that everything is typed, we highly recommend you setup VSCode to provide IntelliSense.

👉 Check out the [VS Code Setup Docs](xref:Guides.VsCode.Index)



---
