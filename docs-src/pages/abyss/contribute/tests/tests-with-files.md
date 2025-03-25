---
uid: Abyss.Contribute.Tests.TestsWithFiles
---

# xUnit Theory Tests - Using Files

_Important: If you only want to USE 2sxc / EAV, then **you do NOT need this**. This is meant for people who want to contribute to the source code of 2sxc and EAV._


## Using Files in Tests

In some situations we need to read files to setup a test.
This is how you can do it, in most scenarios.

1. Place the files in a folder that is accessible by the test runner.
2. Use the appropriate methods to read these files during the test setup.
3. Ensure that your tests clean up any resources after execution.

Example

The project `ToSic.Eav.StartupTests` has a folder `ScenarioData` that contains various test files for different scenarios.

The csproj file has a configuration to copy these files into the bin folder when compiling, like this:

```xml
<ItemGroup>
  <!-- Copy ScenarioData to bin folder for reviewing during tests -->
  <None
    Include="ScenarioData\**"
    CopyToOutputDirectory="PreserveNewest"
    LinkBase="ScenarioData\" />
</ItemGroup>
```

Note: it's not sure what the `LinkBase` does - it can probably be removed.

We have a helper class called `TestFiles` which helps us find the bin folder and attach the full folder path to the file name.

[!code-csharp[](../../../../../../eav-server/ToSic.Eav.Core.TestHelpers/Testing/TestFiles.cs)]

We can then use this to load the files as needed and do our work with them.
The following example uses this folder to create a `TestScenario` with this folder:

[!code-csharp[](../../../../../../eav-server/ToSic.Eav.StartupTests/ConfigurationOverride/ScenarioOverrideFancybox3.cs)]
