---
uid: Abyss.Contribute.Code
---

# Contribute to 2sxc / EAV - Setup

_Important: If you only want to USE 2sxc / EAV, then **you do NOT need this**. This is meant for people who want to contribute to the source code of 2sxc and EAV._

## Pre-Requisites

1. Visual Studio 2019
1. MSBuild Community Tasks 1.4 or newer (required for automatic module packaging if you want to create dnn-module packages of 2sxc to distribute to another dnn) <https://github.com/loresoft/msbuildtasks> or chec <https://www.microsoft.com/en-in/download/details.aspx?id=19372>
1. SQL Server 2017 or newer
1. You have a working DNN 7.4.2 or higher with 2sxc already installed as a module, ideally in c:\projects\2sxc-dnn742\ or something similar

## Basics

The full solution pulls together 4 Github projects, some responsible for server-code, some for UI, some for in-page JS. We separated these to make it easier to contribute to a specific part without worrying about the rest.

If you only want to contribute to something small - like the languages / translations - then you only need to download that repository.

In the complex scenarios each project can build into the other target, so if you want to work full-stack and use all of the automation, you will want to put everything in `C:\Projects\2sxc\`.

## Contribute with Pull-Requests

After you have made changes, you cannot just push the code back to our repo, since you probably won't have write permissions on the main repo.
The correct procedure then is to fork the main repo into yours, and push into your own online repo. Then start a pull request, which we can then process.

## Setup Git Repos to use

Use this checklist:

<iframe src="https://azing.org/2sxc/r/D8cY_BwG?embed=1" width="100%" height="400" frameborder="0" allowfullscreen style="box-shadow: 0 1px 3px rgba(60,64,67,.3), 0 4px 8px 3px rgba(60,64,67,.15)"></iframe>

## GIT Branches

We use the [git-flow convention](https://jeffkreeftmeijer.com/git-flow/), and you should familiarize yourself with this, to properly work with the branches. As of now, the development-branch is called `dev` but we'll rename it to `develop` within the next few days.  

## The EAV / 2sxc Server Solution

Basically if you open the solution in the `eav-server` folder, it will open all the EAV server (C#) code and 2sxc code in Visual Studio. This is very important, because if you build anything extensive and rename anything, it guarantees that everything is correctly updated.

## The 2sxc UI

This extends the EAV-UI with more field types, adds configuration and also adds a lot of other JS. if you run the gulp `develop` it too will auto-build and copy to the live Dnn / 2sxc site.

