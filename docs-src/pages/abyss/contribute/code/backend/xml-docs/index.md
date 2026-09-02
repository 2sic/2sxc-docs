---
uid: Abyss.Contribute.Code.Backend.XmlDocs
---

# Contribute to 2sxc / EAV - Xml Docs Bundling and Distribution

To enable intellisense when creating Apps in DNN and Oqtane using 2sxc,
the VSCode CSharp extension needs XML files in the `bin` folder of the DNN/Oqtane website.

[!include["contributors-only"](../../_contributors-only.md)]

## How it works

Internally we select which DLLs to include in the XML generation, and then generate the XML files for those DLLs.
The XML files are then included in the distribution.

## Generating the XML Files

`.csproj` file which have this line in them will automatically generate the XML files when building the project:

```xml
  <Import Project="../SharedImports/CsProj.Props/CreateXDocsOnRelease.props" />
```

## Distribution in DNN

The DNN building system automatically takes all these xml files and includes them.
This is done in the `AfterBuild.targets` file, which is included in the DNN build process with this code:

```xml
<!-- XML documentation is generated in Release only -->
<ItemGroup Condition="'$(Configuration)' == 'Release'">
  <DnnBinInclude Include="$(MSBuildProjectDirectory)\bin\ToSic.*.xml" />
</ItemGroup>
```

In DNN they will then be in a sub-zip called `tosic.bin.debug-helpers.zip` which is included in the DNN distribution.

## Distribution in Oqtane

During a Release build, the Oqtane package project collects every existing `ToSic.*.xml` documentation file from its target-framework output directory:

```xml
<!-- XML documentation -->
<ItemGroup Condition="'$(Configuration)'=='Release'">
  <AssemblyDocumentation Include="$(OutDir)\ToSic.*.xml"
                         Exclude="**\ToSic.Sxc.Oqtane.Package.xml" />
</ItemGroup>
```

`ToSic.Sxc.Oqtane.Install.nuspec` uses the same wildcard and places the files under `lib\<targetframework>\` in the `.nupkg`.

The wildcard only packages XML files that already exist; it does not generate them or decide which projects should export documentation. A project generates XML documentation for Release builds only when it imports `CreateXDocsOnRelease.props`. Some projects intentionally leave this import commented out because their APIs should not currently be exported or analyzed.

## Managing Publicly Documented APIs

For us it is critical to determine which APIs are used outside of 2sxc,
because these have a higher need for stability and backward compatibility.

The APIs themselves are marked with the `[PublicApi]` attribute and similar,
which is primarily for showing in the docs.

To prevent them from showing in IntelliSense, we use the `[ShowApiWhenReleased(ShowApiMode.Never)]` attribute.

To keep an overview and explicitly manage it, we use a special App just for this purpose.
See <https://github.com/2sxc-dev/app-csharpapi>.
The details are not documented, ask the @iJungleboy.

---

## History

* First included ca. 2sxc 18 or 19
* Kind of interrupted in v20 because of DLL name changes
* Resumed in v22
