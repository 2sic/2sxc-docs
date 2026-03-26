---
uid: Extensions.AppExtensions.Create.AppCode.DataSources
---

# App Extensions – DataSources

Extensions can include custom **C# DataSources** for use in your code or in **Visual Queries**.

> [!TIP]
> This allows you to create small libraries of DataSources which solve a specific problem,
> and then share them across multiple Apps by installing the extension in each App.


## Location and Namespace

You should place the code for the extension in:

```text
/AppCode/Extensions/{ExtensionName}/
```

The `{ExtensionName}` should match the folder of the extension itself,
as it is used in:

```text
/extensions/{ExtensionName}/
```

If you mix DataSources with other code, consider placing them in:

```text
/AppCode/Extensions/{ExtensionName}/DataSources/
```

> [!TIP]
> In the main extension folder (`/extensions/`), the convention is to use **lowercase only**.
> For AppCode, we recommend **PascalCase** to match C# conventions.

### Namespace Convention

To avoid conflicts with other extensions, use:

```text
App.Extensions.{ExtensionName}
```

If you place DataSources in a subfolder, use:

```text
App.Extensions.{ExtensionName}.DataSources
```

---

## How to Create a Custom DataSource

A custom DataSource is a small C# class which inherits from `DataSource16`.
It defines one or more output streams using `ProvideOut(...)`.

### Basic Example

- Inherits DataSource16 -> integrates with 2sxc.
- `ProvideOut(GetData)` -> defines how to fetch data.
- `GetData()` -> returns an object with a Message property.

```csharp
using Custom.DataSource;

namespace AppCode.Extensions.HelloWorld
{
    /// <summary>
    /// Simple DataSource example that returns a single "Hello World" message.
    /// </summary>
    public class HelloWorldDataSource : DataSource16
    {
        /// <summary>
        /// Constructor receives dependencies from the 2sxc/Custom framework.
        /// Always call base(services) to properly initialize the DataSource.
        /// </summary>
        /// <param name="services">Injected services from 2sxc / Custom.DataSource</param>
        public HelloWorldDataSource(Dependencies services) : base(services)
        {
            // Register the output function of this DataSource.
            ProvideOut(GetData);
        }

        /// <summary>
        /// Function that returns the data from this DataSource.
        /// </summary>
        private object GetData()
        {
            return new
            {
                // This is the actual content that will be available in Razor
                Message = "Hello from my DataSource"
            };
        }
    }
}
```

---

## Key Concepts

### Class Name

- Must be **unique** across all loaded AppCode
- Avoid generic names like `MyDataSource` or `TestSource`

### Constructor

- Always accept `Dependencies services`
- Always pass it to the base constructor

```csharp
public MyDataSource(Dependencies services) : base(services)
```

### ProvideOut

- Registers an **output stream**
- The method you pass must return an `object`
- Can return:

  - Anonymous objects
  - Lists / arrays
  - Strongly typed models

```csharp
ProvideOut(GetData);
```

---

## Using the DataSource

### In Visual Query

1. Open **Visual Query**
2. Add a **Custom DataSource**
3. Select your DataSource class
4. Use the output streams like any other source

### In Code (Razor / API)

- `Kit.Data.GetSource<HelloWorldDataSource>()` -> creates the DataSource.
- `AsItem(helloDs)` -> gets the first (and only) record.
- `helloWorld.String("Message")` -> reads the Message property safely.

```razor
@inherits Custom.Hybrid.RazorTyped
@using AppCode.Extensions.HelloWorld

<h3>Hello World Example</h3>

@{
    // Create the DataSource
    var helloDs = Kit.Data.GetSource<HelloWorldDataSource>();

    // Get the first item from the DataSource
    var helloWorld = AsItem(helloDs);
}

@if (helloWorld == null)
{
    <p>No data available</p>
    return;
}

<ul>
    <li>
        <!-- Access the Message property -->
        <strong>Message:</strong> @helloWorld.String("Message")
    </li>
</ul>
```

---

## Special Compiling Options

If you need to ensure special DLLs are referenced during compilation,
see:

[](xref:Extensions.AppExtensions.Create.AppCode.CompilerOptions)

---

## History

1. Beta in v20.09
2. Planned release in v21.00
