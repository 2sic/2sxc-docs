---
uid: Abyss.Contribute.Docs.Build
---

# Building the Documentation

> [!TIP]
> These instructions should get you started right away.
> But there are many things which make your work better and easier,
> so do take the time to read about hove everything works
> before making larger changes.
>
> Even simple things like images have great tricks you want to know about.


## Pre-Requisites

Before beginning with the documentation process, ensure that you have set up the complete 2sxc/EAV development environment. This environment should be configured and functional for the development of C# and JavaScript code. For more information on this setup, please refer to the [Code](xref:Abyss.Contribute.Code) documentation.

The documentation tool we use is **docfx**, which needs to be installed on your development machine. You can install it using the following command:

```cmd
dotnet tool install -g docfx
```

Install node modules for npm tasks:

```cmd
cd "C:\Projects\2sxc\2sxc-docs\2sxc Docs Generator"
npm ci
```

## Getting Started

The documentation development takes place in this [2sxc-docs](https://github.com/2sic/2sxc-docs) GitHub repository. The documentation is generated from *.yml and *.md files and 2sxc/EAV's C# and JavaScript source code.

The npm task **import** is an optional step, used only when there is a need to prepare JavaScript-related files for inclusion in the documentation.

To execute this task, navigate to the `2sxc Docs Generator` directory and run the **import** task with npm. Here are the necessary commands:

```cmd
cd "C:\Projects\2sxc\2sxc-docs\2sxc Docs Generator"
npm run import
```

This command will execute the **import** task defined in your **package.json** file, preparing your 2sxc JavaScript related files for documentation generation.

To build and run your local version of the documentation, follow these steps:

```cmd
cd "C:\Projects\2sxc\2sxc-docs\2sxc Docs Generator"
docfx build docfx.json --serve
```

Once the documentation server is running, you can access it via your web browser at http://localhost:8080.


## Troubleshooting

To verify whether docfx can successfully build the documentation, use the following command:

```cmd
cd "C:\Projects\2sxc\2sxc-docs\2sxc Docs Generator"
docfx
```

The successful execution of this command should display the message: `Build succeeded`.

If docfx encounters an error when building a .NET project, you can manually attempt to build the project. This allows you to get more information about the error and address it. You can do this with the following commands:

```cmd
cd c:\Projects\2sxc\2sxc\Src\Dnn\ToSic.Sxc.Dnn
dotnet build
```

Upon successful execution, you should see the message: `Build succeeded`.

