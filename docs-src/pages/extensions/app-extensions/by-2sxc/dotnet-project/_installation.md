* [Install DotNet-Project](xref:Catalog.AppExtensions.Project-DotNet){title="icon:puzzle"}
  first install the App Extension
* [](xref:Extensions.AppExtensions.Install.Index){title="icon:journal-arrow-down"} instructions for your first time

Then

1. copy the files `app.sln` and `app.csproj` from the `templates` folder to your main app folder (or a specific edition-subfolder)
1. restart VS Code
1. if VS Code / C# Dev Kit asks which solution to load, choose the correct `app.sln` for the folder you want to work on

> [!NOTE]
> 2sxc app setups contains multiple `.sln` files, so VS Code / C# Dev Kit should usually prompt you to choose one and remember that choice for the workspace.
> If it does not load the correct solution reliably, use the `.NET: Open Solution` command and manually open the root `app.sln`.

That's it - you should now have IntelliSense on all your C# and Razor files.
