---
uid: NetCode.WebApi.Issues.HttpResponseMessage
---

# Common Issue: Missing HttpResponseMessage

The WebApi sometimes needs to return an `HttpResponseMessage`, for example to trigger redirects. 

In some cases you simply cannot get the code to run, with an error similar to this

```
2sxc Api Controller Finder: Error while selecting / compiling a controller for the request. Pls check the event-log and the code. See the inner exception for more details.", "ExceptionMessage": "[Some-Path]\Portals\0\2sxc\[Some-App]\api\InstallController.cs(23): error CS0012: The type 'System.Net.Http.HttpRequestMessage' is defined in an assembly that is not referenced. You must add a reference to assembly 'System.Net.Http, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a'.", "ExceptionType": "System.Web.HttpCompileException", "StackTrace": " at System.Web.Compilation.AssemblyBuilder.Compile() at System.Web.Compilation.BuildProvidersCompiler.PerformBuild() at System.Web.Compilation.BuildManager.CompileWebFile(VirtualPath virtualPath) at System.Web.Compilation.BuildManager.GetVPathBuildResultInternal(VirtualPath virtualPath, Boolean noBuild, Boolean allowCrossApp, Boolean allowBuildInPrecompile, Boolean throwIfNotFound, Boolean ensureIsUpToDate) at System.Web.Compilation.BuildManager.GetVPathBuildResultWithNoAssert(HttpContext context, VirtualPath virtualPath, Boolean noBuild, Boolean allowCrossApp, Boolean allowBuildInPrecompile, Boolean throwIfNotFound, Boolean ensureIsUpToDate) at System.Web.Compilation.BuildManager.GetVPathBuildResult(HttpContext context, VirtualPath virtualPath, Boolean noBuild, Boolean allowCrossApp, Boolean allowBuildInPrecompile, Boolean ensureIsUpToDate) at System.Web.Compilation.BuildManager.GetCompiledAssembly(String virtualPath) at ToSic.SexyContent.WebApi.AppApiControllerSelector.SelectController(HttpRequestMessage request) in C:\Projects\2SexyContent\Web\DesktopModules\ToSIC_SexyContent\Sxc WebApi\AppApiControllerSelector.cs:line 77
```

The reason is that the compiler has a hard time figuring out where to locate this class. We believe it's because Dnn has gone through various .net versions and that makes these things a bit harder. 

The solution is to tell the Compiler that you're using `System.Net.Http` in the desired version. Add the `add` tag to the `web.config` in the location below:

```
<configuration>
  <system.web>
    <compilation>
      <assemblies>
        <add assembly="System.Net.Http, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" />
...
```

_Note: you shouldn't add the whole block - it should just show you where it must go_


## History

1. [Reported in 2017](https://stackoverflow.com/questions/47508179/2sxc-httpresponsemessage-reference-missing-in-custom-api-controller)

