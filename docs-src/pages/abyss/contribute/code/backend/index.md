---
uid: Abyss.Contribute.Code.Backend.Index
---

# Contribute to 2sxc / EAV - Backend

[!include["_contributors-only.md"](../_contributors-only.md)]


## Prerequisites

➡️ Make sure you prepared your local development environment according to the instructions in [](xref:Abyss.Contribute.Code.Index).

## Main Repositories and Principles

The Backend requires two projects to be set up, according to instructions before. They are:

1. `c:\projects\2sxc\2sxc\` - the main [2sxc C# repo](xref:Repo.2sxc),
2. `c:\projects\2sxc\eav-server\` - the [EAV C# repo](xref:Repo.Eav), which is required by the 2sxc backend

The solution to open is: `C:\Projects\2sxc\2sxc\Src\2sxc Multi-Target.sln`.

When you open the solution using Visual Studio, it will automatically install any missing NuGet packages, and you should be able to build the solution without any errors.
A few things to keep in mind:

1. When you open it the first time, it may take a while to restore all the NuGet packages and build the solution for the first time, so be patient.
1. To ensure that the DLLs etc. are copied to DNN/Oqtane, make sure you have the [`2sxc-build.config.json`](xref:Abyss.Contribute.Code.Build) file.
1. The solution has various build configurations
    1. use the default `Debug` configuration for development
    1. use `Testing` to run unit tests
    1. use `Release` to create the final build for distribution (this will also create the ZIP and NuGet packages in `C:\Projects\2sxc\InstallPackages\`)

> [!TIP]
> It's a very large code base with about 50 projects, which are not documented in detail.
> If you wish to make contributions, it may help to contact @iJungleboy.

---

## History

* Created Backend docs 2026-02-12
