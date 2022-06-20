---
uid: Abyss.Releases.History.V14.IssueAssemblyBinding
---

# Assembly Binding Issue on Installs from 2sxc 13.04 to 14.02

2sxc 13.04 up until v14.02 had a bug where the assembly bindings in web.config wasn't done correctly.
The result is, that many bindings were added repeatedly.
Issue is fixed in v14.03.

The problems:

1. the `web.config` grows to be very large
1. future upgrades of 2sxc which need to modify the bindings could end up modifying a binding, but other unmodified bindings could take precedence
1. third party modules which also modify assembly bindings could modify the wrong bindings

The following bindings were added repeatedly:

```xml
<dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
  <assemblyIdentity name="Microsoft.Extensions.Configuration.Abstractions" publicKeyToken="adb9793829ddae60" />
  <codeBase version="2.2.0.0" href="bin\Imageflow\Microsoft.Extensions.Configuration.Abstractions.dll" />
</dependentAssembly>
<dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
  <assemblyIdentity name="Microsoft.Extensions.Logging.Abstractions" publicKeyToken="adb9793829ddae60" />
  <codeBase version="2.2.0.0" href="bin\Imageflow\Microsoft.Extensions.Logging.Abstractions.dll" />
</dependentAssembly>
<dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
  <assemblyIdentity name="Microsoft.Extensions.Primitives" publicKeyToken="adb9793829ddae60" />
  <codeBase version="2.2.0.0" href="bin\Imageflow\Microsoft.Extensions.Primitives.dll" />
</dependentAssembly>
<dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
  <assemblyIdentity name="System.Memory" publicKeyToken="cc7b13ffcd2ddd51" />
  <codeBase version="4.0.1.1" href="bin\Imageflow\System.Memory.dll" />
</dependentAssembly>
<dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
  <assemblyIdentity name="System.Numerics.Vectors" publicKeyToken="b03f5f7f11d50a3a" />
  <codeBase version="4.1.4.0" href="bin\Imageflow\System.Numerics.Vectors.dll" />
</dependentAssembly>
<dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
  <assemblyIdentity name="System.Runtime.CompilerServices.Unsafe" publicKeyToken="b03f5f7f11d50a3a" />
  <codeBase version="4.0.4.1" href="bin\Imageflow\System.Runtime.CompilerServices.Unsafe.dll" />
</dependentAssembly>
<dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
  <assemblyIdentity name="Microsoft.Extensions.DependencyInjection.Abstractions" publicKeyToken="adb9793829ddae60" />
  <codeBase version="2.2.0.0" href="bin\Imageflow\Microsoft.Extensions.DependencyInjection.Abstractions.dll" />
</dependentAssembly>
<dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
  <assemblyIdentity name="Microsoft.Extensions.DependencyInjection" publicKeyToken="adb9793829ddae60" />
  <codeBase version="2.2.0.0" href="bin\Imageflow\Microsoft.Extensions.DependencyInjection.dll" />
</dependentAssembly>
<dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
  <assemblyIdentity name="Microsoft.Extensions.FileProviders.Abstractions" publicKeyToken="adb9793829ddae60" />
  <codeBase version="2.2.0.0" href="bin\Imageflow\Microsoft.Extensions.FileProviders.Abstractions.dll" />
</dependentAssembly>
<dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
  <assemblyIdentity name="Microsoft.Extensions.Hosting.Abstractions" publicKeyToken="adb9793829ddae60" />
  <codeBase version="2.2.0.0" href="bin\Imageflow\Microsoft.Extensions.Hosting.Abstractions.dll" />
</dependentAssembly>
<dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
  <assemblyIdentity name="Microsoft.IO.RecyclableMemoryStream" publicKeyToken="31bf3856ad364e35" />
  <codeBase version="1.2.2.0" href="bin\Imageflow\Microsoft.IO.RecyclableMemoryStream.dll" />
</dependentAssembly>
```

This assemblyBinding fragment can be repeated many times, depending on the amount of times you upgraded 2sxc (since v13.04 till v14.02), what DNN version you're using and what 3rd party modules you have.

While testing this issue, we did not noticed anything that is breaking dnn and 2sxc because .NET Framework will follow only first occurrence of assembly binding for specified assembly in web.config. From functional point of view, second and any other assembly binding for the same specified assembly will be ignored by .NET Framework. Still it is not nice to have unnecessary assembly binding copies in web.config.

For v13.04-v14.02. recommendation is that you manually remove unnecessary bindings in web.config to keep it clean.

Upgrade to v14.03 (or latter version) will auto-fix this.

## Am I affected?

You are affected, if you see multiple copies of following XML fragments in your web.config, eg:

```xml
...
<dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
  <assemblyIdentity name="Microsoft.IO.RecyclableMemoryStream" publicKeyToken="31bf3856ad364e35" />
  <codeBase version="1.2.2.0" href="bin\Imageflow\Microsoft.IO.RecyclableMemoryStream.dll" />
</dependentAssembly>
...
<dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
  <assemblyIdentity name="Microsoft.IO.RecyclableMemoryStream" publicKeyToken="31bf3856ad364e35" />
  <codeBase version="1.2.2.0" href="bin\Imageflow\Microsoft.IO.RecyclableMemoryStream.dll" />
</dependentAssembly>
...
<dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
  <assemblyIdentity name="Microsoft.IO.RecyclableMemoryStream" publicKeyToken="31bf3856ad364e35" />
  <codeBase version="1.2.2.0" href="bin\Imageflow\Microsoft.IO.RecyclableMemoryStream.dll" />
</dependentAssembly>
```

## How to Clean

Do the following:

1. Backup web.config.
1. Search for first occurrence of...

    ```xml
    <dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
      <assemblyIdentity name="Microsoft.IO.RecyclableMemoryStream" publicKeyToken="31bf3856ad364e35" />
      <codeBase version="1.2.2.0" href="bin\Imageflow\Microsoft.IO.RecyclableMemoryStream.dll" />
    </dependentAssembly>
    ```

    ...that is followed by list of unnecessary duplicate assembly bindings, started with duplicate...

    ```xml
    <dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
      <assemblyIdentity name="Microsoft.Extensions.Configuration.Abstractions" publicKeyToken="adb9793829ddae60" />
      <codeBase version="2.2.0.0" href="bin\Imageflow\Microsoft.Extensions.Configuration.Abstractions.dll" />
    </dependentAssembly>
    ```

    ...ending with duplicate...

    ```xml
    <dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
      <assemblyIdentity name="Microsoft.IO.RecyclableMemoryStream" publicKeyToken="31bf3856ad364e35" />
      <codeBase version="1.2.2.0" href="bin\Imageflow\Microsoft.IO.RecyclableMemoryStream.dll" />
    </dependentAssembly>
    ```

1. Select and remove all duplicate assembly bindings fragments.
    Second (and any other) copy of this fragment is unnecessary.

    ```xml
    <dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
      <assemblyIdentity name="Microsoft.Extensions.Configuration.Abstractions" publicKeyToken="adb9793829ddae60" />
      <codeBase version="2.2.0.0" href="bin\Imageflow\Microsoft.Extensions.Configuration.Abstractions.dll" />
    </dependentAssembly>
    <dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
      <assemblyIdentity name="Microsoft.Extensions.Logging.Abstractions" publicKeyToken="adb9793829ddae60" />
      <codeBase version="2.2.0.0" href="bin\Imageflow\Microsoft.Extensions.Logging.Abstractions.dll" />
    </dependentAssembly>
    <dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
      <assemblyIdentity name="Microsoft.Extensions.Primitives" publicKeyToken="adb9793829ddae60" />
      <codeBase version="2.2.0.0" href="bin\Imageflow\Microsoft.Extensions.Primitives.dll" />
    </dependentAssembly>
    <dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
      <assemblyIdentity name="System.Memory" publicKeyToken="cc7b13ffcd2ddd51" />
      <codeBase version="4.0.1.1" href="bin\Imageflow\System.Memory.dll" />
    </dependentAssembly>
    <dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
      <assemblyIdentity name="System.Numerics.Vectors" publicKeyToken="b03f5f7f11d50a3a" />
      <codeBase version="4.1.4.0" href="bin\Imageflow\System.Numerics.Vectors.dll" />
    </dependentAssembly>
    <dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
      <assemblyIdentity name="System.Runtime.CompilerServices.Unsafe" publicKeyToken="b03f5f7f11d50a3a" />
      <codeBase version="4.0.4.1" href="bin\Imageflow\System.Runtime.CompilerServices.Unsafe.dll" />
    </dependentAssembly>
    <dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
      <assemblyIdentity name="Microsoft.Extensions.DependencyInjection.Abstractions" publicKeyToken="adb9793829ddae60" />
      <codeBase version="2.2.0.0" href="bin\Imageflow\Microsoft.Extensions.DependencyInjection.Abstractions.dll" />
    </dependentAssembly>
    <dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
      <assemblyIdentity name="Microsoft.Extensions.DependencyInjection" publicKeyToken="adb9793829ddae60" />
      <codeBase version="2.2.0.0" href="bin\Imageflow\Microsoft.Extensions.DependencyInjection.dll" />
    </dependentAssembly>
    <dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
      <assemblyIdentity name="Microsoft.Extensions.FileProviders.Abstractions" publicKeyToken="adb9793829ddae60" />
      <codeBase version="2.2.0.0" href="bin\Imageflow\Microsoft.Extensions.FileProviders.Abstractions.dll" />
    </dependentAssembly>
    <dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
      <assemblyIdentity name="Microsoft.Extensions.Hosting.Abstractions" publicKeyToken="adb9793829ddae60" />
      <codeBase version="2.2.0.0" href="bin\Imageflow\Microsoft.Extensions.Hosting.Abstractions.dll" />
    </dependentAssembly>
    <dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
      <assemblyIdentity name="Microsoft.IO.RecyclableMemoryStream" publicKeyToken="31bf3856ad364e35" />
      <codeBase version="1.2.2.0" href="bin\Imageflow\Microsoft.IO.RecyclableMemoryStream.dll" />
    </dependentAssembly>
    ```

    YouTube video: How to manually remove duplicate assembly bindings?
    [![How to manually remove duplicate assembly bindings?](https://img.youtube.com/vi/eTL-VTjxF9k/0.jpg)](https://www.youtube.com/watch?v=eTL-VTjxF9k)

    Ensure that you have only one list of this bindings in web.config.

1. Save web.config and test dnn that is working.
