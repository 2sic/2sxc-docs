---
uid: Basics.ImageResizer.Index
---

<img src="~/assets/features/image-resizer.svg" class="feature">

# Image Resizer

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>  .context-box-summary .image-resizer    { visibility: visible; } </style>

2sxc has an awesome Image Resizer built in.

It's really easy to use - just add url parameters to the image. So instead of `img.jpg` add `img.jpg?w=200` to resize it to 200px width.


## How to Use

You can learn about the url parameters in the [](xref:Tut.Img.Parameters)

But normally you won't use them directly, because it's better to use APIs which will set these parameters for you.
Your best options are:

1. The [IImageService](xref:ToSic.Sxc.Services.IImageService) with `.Img(...)` or `.Picture(...)` which will create the best possible _HTML_ for you
1. The [Link.Image(...)](xref:NetCode.DynamicCode.Objects.Link.Image) which will create the best possible _URL_ for you

In most scenarios you will prefer the `IImageService`.
In cases where you need exactly 1 url (like in `background-url` CSS) you will probably use the `Link.Image(...)`.


## How it Works

> [!TIP]
> This is just additional info in case you run into problems and need to dig deeper.

The image resizer is built into 2sxc 13+ and uses the amazing [ImageFlow](https://www.imageflow.io/) library (previously [ImageResizer.net](https://imageresizing.net/)).
It's installed automatically by 2sxc but it can also be installed standalone ([Dnn](https://github.com/2sic/dnn-imageflow) / [Oqtane](https://github.com/2sic/oqtane-imageflow)).


### ImageFlow Setup in DNN

In DNN the DLLs are located in:

* `[root]/bin/ToSic.Imageflow.Dnn.dll`
* `[root]/bin/Imageflow.Net.dll`
* `[root]/bin/Imazen.Common.dll`
* `[root]/bin/Imazen.HybridCache.dll`
* `[root]/bin/Newtonsoft.Json.dll` - ATM part of DNN, but also used by ImageFlow in current version
* `[root]/bin/System.Text.Json.dll` - ATM part of 2sxc, and not used by ImageFlow, but will be used in future versions
* `[root]/bin/ImageFlow/*.dll` - ca. 12 Microsoft DLLs with specific versions for ImageFlow  
  They are located in this folder as they would sometimes create version conflicts with other DLLs in DNN

The `web.config` must be updated, which happens automatically.
It will:

* enable url-handling of image files (eg. `.jpg` should be handled)
* register all the Microsoft DLLs in the `ImageFlow` folder so they are available for exactly this version

The `web.config` changes look like this (v16.07):

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <!-- other stuff -->
  <system.webServer>
    <!-- other stuff -->
    <modules>
      <!-- other stuff -->
      <add name="ImageflowModule" type="ToSic.Imageflow.Dnn.ImageflowModule, ToSic.Imageflow.Dnn" />
    </modules>
  </system.webServer>
  <!-- other stuff -->
  <runtime>
    <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1">
      <!-- other stuff -->

      <!-- Register all Microsoft/System DLLs necessary for ImageFlow so they are available for exactly this version -->
      <dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
        <assemblyIdentity name="System.Buffers" publicKeyToken="cc7b13ffcd2ddd51" />
        <bindingRedirect oldVersion="0.0.0.0-4.0.3.0" newVersion="4.0.3.0" xmlns="urn:schemas-microsoft-com:asm.v1" />
        <codeBase version="4.0.3.0" href="bin\Imageflow\System.Buffers.dll" xmlns="urn:schemas-microsoft-com:asm.v1" />
        <bindingRedirect oldVersion="4.0.3.1-32767.32767.32767.32767" newVersion="4.0.3.0" />
      </dependentAssembly>
      <dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
        <assemblyIdentity name="Microsoft.Extensions.Configuration.Abstractions" publicKeyToken="adb9793829ddae60" />
        <bindingRedirect oldVersion="2.2.0.0-32767.32767.32767.32767" newVersion="2.2.0.0" xmlns="urn:schemas-microsoft-com:asm.v1" />
        <codeBase version="2.2.0.0" href="bin\Imageflow\Microsoft.Extensions.Configuration.Abstractions.dll" xmlns="urn:schemas-microsoft-com:asm.v1" />
        <bindingRedirect oldVersion="0.0.0.0-2.1.1.0" newVersion="2.1.1.0" />
      </dependentAssembly>
      <dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
        <assemblyIdentity name="Microsoft.Extensions.Logging.Abstractions" publicKeyToken="adb9793829ddae60" />
        <bindingRedirect oldVersion="2.2.0.0-32767.32767.32767.32767" newVersion="2.2.0.0" xmlns="urn:schemas-microsoft-com:asm.v1" />
        <codeBase version="2.2.0.0" href="bin\Imageflow\Microsoft.Extensions.Logging.Abstractions.dll" xmlns="urn:schemas-microsoft-com:asm.v1" />
        <bindingRedirect oldVersion="0.0.0.0-2.1.1.0" newVersion="2.1.1.0" />
      </dependentAssembly>
      <dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
        <assemblyIdentity name="Microsoft.Extensions.Primitives" publicKeyToken="adb9793829ddae60" />
        <bindingRedirect oldVersion="2.2.0.0-32767.32767.32767.32767" newVersion="2.2.0.0" xmlns="urn:schemas-microsoft-com:asm.v1" />
        <codeBase version="2.2.0.0" href="bin\Imageflow\Microsoft.Extensions.Primitives.dll" xmlns="urn:schemas-microsoft-com:asm.v1" />
        <bindingRedirect oldVersion="0.0.0.0-2.1.1.0" newVersion="2.1.1.0" />
      </dependentAssembly>
      <dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
        <assemblyIdentity name="System.Memory" publicKeyToken="cc7b13ffcd2ddd51" />
        <bindingRedirect oldVersion="0.0.0.0-32767.32767.32767.32767" newVersion="4.0.1.2" />
      </dependentAssembly>
      <dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
        <assemblyIdentity name="System.Numerics.Vectors" publicKeyToken="b03f5f7f11d50a3a" />
        <bindingRedirect oldVersion="0.0.0.0-4.1.3.0" newVersion="4.1.3.0" xmlns="urn:schemas-microsoft-com:asm.v1" />
        <codeBase version="4.1.3.0" href="bin\Imageflow\System.Numerics.Vectors.dll" xmlns="urn:schemas-microsoft-com:asm.v1" />
        <bindingRedirect oldVersion="4.1.3.1-32767.32767.32767.32767" newVersion="4.1.4.0" />
      </dependentAssembly>
      <dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
        <assemblyIdentity name="System.Runtime.CompilerServices.Unsafe" publicKeyToken="b03f5f7f11d50a3a" />
        <bindingRedirect oldVersion="0.0.0.0-4.0.4.1" newVersion="4.0.4.1" xmlns="urn:schemas-microsoft-com:asm.v1" />
        <codeBase version="4.0.4.1" href="bin\Imageflow\System.Runtime.CompilerServices.Unsafe.dll" xmlns="urn:schemas-microsoft-com:asm.v1" />
        <bindingRedirect oldVersion="4.0.4.2-32767.32767.32767.32767" newVersion="6.0.0.0" />
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
    </assemblyBinding>
  </runtime>
</configuration>
```


### ImageFlow Setup in Oqtane

In Oqtane they are all located in the main `bin` folder.

* for development it's in `[root]/bin/Debug/.net7.0/` (or `.net8.0` for Oqtane 5)
* for production it's in `[root]/` (the main folder of Oqtane)

Oqtane does not need `web.config` changes.
The URL handling is activated using the `IServerStartup` interface
as seen in this [code](https://github.com/2sic/oqtane-imageflow/blob/ac4f70229247fdba6b0037891aa353810bc40eda/Src/Server/Startup.cs).


## Troubleshooting

Usually the image resizer just works, but if you run into problems, here are some tips.

### New Servers: Make sure Visual C++ Redistributable is Installed

The Imageflow library is built with a mixture of Rust and C and requires the Visual C++ runtime to run.
These runtime libraries are usually pre-installed, as they are a common dependency for a lot of software.
However, they are missing on newer Windows Server Core, so this is a common issue.

* [Microsoft docs](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170)
* [Direct Download VC 16 Redistributables](https://aka.ms/vs/16/release/vc_redist.x64.exe)

### First: Make Sure ImageFlow is Used

To start you may need to find out if ImageFlow is used at all, or if something else is handling the images.

* check if there is something else that could handle images registered in the `web.config`
  * it's quite common to still have some ImageResizer.net entries there
* check if you have a folder for the cached images and if it gets new files as you try different resize combinations (eg `?w=1000` v `?w=1001`)
  * in DNN / Oqtane check the folder `[root]/App_Data/imageflow_hybrid_cache`
* an indication we found is to check the response headers with F12 loading an image - we found the following difference
  * we believe that if ImageFlow is used, it seems to return an `ETAG` header without quotes, eg: `ETAG: ybLeicE_NA97ZbYIyeURwOcFAn77bg45utBbtzOzgB0`
  * we believe that IIS returns an `ETAG` with quotes eg. `ETAG: "54fa36c88844d41:0"`

Also check your log files.

If you believe that ImageFlow isn't being used, the try to fix that first. Suggestions:

* install ImageFlow by itself from the git repos ([Dnn](https://github.com/2sic/dnn-imageflow) / [Oqtane](https://github.com/2sic/oqtane-imageflow))
* compare a brand new system with 2sxc which it works with the broken setup

---

## History

1. Introduced in 2sxc 5.03
1. Special Razor API to create links called [Link.Image](xref:NetCode.DynamicCode.Objects.Link.Image) introduced in 12.04
1. Introduced [ImageFlow](https://www.imageflow.io/) in v12 for Oqtane
1. Switched to [ImageFlow](https://www.imageflow.io/) in 13.0 for both Dnn and Oqtane
1. Introducing [IImageService](xref:ToSic.Sxc.Services.IImageService) in 13.05 beta, released in 13.10
1. Improved docs for DLLs etc. 2023-10

Shortlink: <https://go.2sxc.org/resize>
