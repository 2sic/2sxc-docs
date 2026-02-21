---
uid: Abyss.Contribute.Code.Index
---

# Contribute to 2sxc / EAV - Setup

[!include["_contributors-only.md"](_contributors-only.md)]

> [!NOTE]
> First of all, thank you for your interest in contributing to 2sxc and EAV!
> We are always looking for talented developers to help us improve our products and make them even better.
>
> Getting everything set up for contributing may seem a bit daunting.
> But if you are interested, we would be glad to help - just reach out to us on `info@...`.

## Introduction

To develop locally you'll need:

1. A **local DNN and/or Oqtane installation with 2sxc** installed, where you can test your changes.
2. The **source code of 2sxc and EAV on your local machine**, so you can make changes and test them.
3. An understanding of the **build process**, so you can build the code and test it in your local environment.

Once you are ready to submit your changes, you will also need knowledge of **Git and GitHub**,
so you can manage your changes and submit them to us for review.

## Prerequisites

### [Local DNN](#tab/prerequisites-dnn)

This is the most common starting point for most contributors,
since DNN is the most widely used platform for 2sxc.
It is essential, that any contributions are tested on DNN.

You need to have the following software installed on your machine:

1. Windows 11 or similar
1. SQL Server 2016 or latest (any edition will do)
1. You have a working DNN 9.11.02 or higher with 2sxc already installed as a module, ideally in `c:\projects\2sxc\2sxc.dnndev.me\website\`  
    You can also use any other location, just make sure to update the `2sxc-build.config.json` file accordingly

> [!TIP]
> We recommend [nvQuickSite](https://www.nvquicksite.com/) to get local DNNs up and running.

### [Local Oqtane](#tab/prerequisites-oqtane)

This is **optional**, but may be the place you want to start if you are interested in contributing to the Oqtane version of 2sxc.

You need to have the following software installed on your machine:

1. Windows 11 or similar
1. SQL Server 2022 or latest (any edition will do)
1. You have a [working Oqtane 10](xref:Oqtane.Installation.Dev) or higher with 2sxc already installed as a module, ideally in `C:\Projects\2sxc\oqtane\oqtane.framework\`  
    You can also use any other location, just make sure to update the `2sxc-build.config.json` file accordingly

### [Backend](#tab/prerequisites-backend)

The backend is developed using Visual Studio.

IF you want to contribute to the backend code, you will need:

1. [Visual Studio 2026](https://visualstudio.microsoft.com/downloads/) (any edition, incl. _Community_)

Optional: MSBuild Community Tasks 1.7 or newer (required for automatic module packaging if you want to create dnn-module packages of 2sxc to distribute to another dnn) <https://github.com/loresoft/msbuildtasks>.

### [Frontend](#tab/prerequisites-frontend)

The front-end is developed in Visual Studio Code.
It uses the Node.js / Webpack ecosystem for building and packaging the code.

IF you want to contribute to the frontend code, you will need:

1. [Visual Studio Code](https://code.visualstudio.com/download) (any edition, incl. _Community_)
2. [Node.js](https://nodejs.org/en/download/) (the latest LTS version)

---

## File and Folder Structure

### [Basics](#tab/folders-basics)

The full solution pulls together 4 Github repositories. Two for server-code, one for UI, and one for in-page JS.
We separated these to make it easier to contribute to a specific part without worrying about the rest.

If you only want to contribute to something small - like the languages / translations - then you only need to download that repository.

In the complex scenarios each project can build into the other targe.
So if you want to work full-stack and use all of the automation, you will want to put everything in `C:\Projects\2sxc\`.

This is the _recommended minimal_ file structure - which you should also use as a first reference:

* `C:\Projects\2sxc\` - main folder to put all the code.
  * `\2sxc.dnndev.me\` - local DNN with 2sxc installed, to test your changes in DNN
  * `\2sxc-build.config.json` - build configuration file - see [](xref:Abyss.Contribute.Code.Build)
  * `\...\` one or more sub folders containing the code repositories you wish to build

The optional sub folders are:

1. For the backend (you need both of these)
    * `\2sxc\` - the source code of 2sxc **backend** from the [](xref:Repo.2sxc)
    * `\eav-server\` - the source code of the EAV **backend**, required by the `2sxc\` backend from the [](xref:Repo.Eav)
1. For the in-page editing experience
    * `\2sxc-ui\` - the source code of in-page 2sxc UI, from the [](xref:Repo.2sxc-ui)
1. For the main edit/admin UIs
    * `\eav-ui\` - the source code of the main edit/admin UIs, from the [](xref:Repo.Eav-ui)
1. For the Oqtane version of 2sxc
    * `\oqtane\oqtane.framework\` - the source code of the Oqtane version of 2sxc, from the [](xref:Repo.Oqtane)

### [Setup Git Repos to use](#tab/git-repos)

Use this checklist:

<iframe src="https://azing.org/2sxc/r/D8cY_BwG?embed=1" width="100%" height="800" frameborder="0" allowfullscreen style="box-shadow: 0 1px 3px rgba(60,64,67,.3), 0 4px 8px 3px rgba(60,64,67,.15)"></iframe>

If you just need to update your locally cloned `Oqtane.Framework` source code to latest release for 2sxc Oqtane development check the instructions here: [How update Oqtane.Framework source code for 2sxc Oqtane development](xref:Abyss.Contribute.Code.OqtaneFramework)

---

## How You Will Usually Work

1. You will make changes to the source on your local machine.
2. You will build the code.
3. The build _should_ automatically copy the result to your local DNN and Oqtane installation
4. You can then open your local Dnn/Oqtane in a browser and test your changes to ensure everything works as expected.

[!include[""](_build-diagram.md)]

> [!TIP]
> The hardest part here is usually the build processes,
> especially auto-copy of the built files to the local DNN and Oqtane installations,
> which needs a `c:\projects\2sxc\2sxc-build.config.json` configuration file.
>
> It's explained in more details on [](xref:Abyss.Contribute.Code.Build).

Once you are satisfied with your changes, you can submit a pull request to our GitHub repository for review.

---

## Building Various Parts

You can decide to only work on the backend, or only on the frontend, or on both.
The build processes are different for the backend and frontend.
They all follow the same principles of building the code and copying the built files to the local DNN and Oqtane installations for testing.

### [Backend](#tab/backend)

The Backend requires two projects to be set up, according to instructions above. They are:

1. `c:\projects\2sxc\2sxc\` - the main [2sxc C# repo](xref:Repo.2sxc),
2. `c:\projects\2sxc\eav-server\` - the [EAV C# repo](xref:Repo.Eav), which is required by the 2sxc backend

To work with the backend, best continue to [](xref:Abyss.Contribute.Code.Backend.Index).

### [Frontend](#tab/frontend)

The front-end is in these 2 repositories containing various JS projects:

1. `c:\projects\2sxc\2sxc-ui\` - the in-page UI for 2sxc, which extends the EAV UI with more field types, configuration and other JS.
2. `c:\projects\2sxc\eav-ui\` - the main edit/admin UIs, which are used by both 2sxc and EAV.

To work with the front-end, best continue to [](xref:Abyss.Contribute.Code.Frontend).

---

## Contribute with Pull-Requests

After you have made changes, you cannot just push the code back to our repo,
since you probably won't have write permissions on the main repo.
The correct procedure then is to fork the main repo into yours, and push into your own online repo.
Then start a pull request, which we can then process.

We use the [git-flow convention](https://jeffkreeftmeijer.com/git-flow/),
and you should familiarize yourself with this, to properly work with the branches.

---

## History

* Documented in 2023-09 v16.06
* Updated docs 2026-02-12

Shortlink: <https://go.2sxc.org/contribute-code>
