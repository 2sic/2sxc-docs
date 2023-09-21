---
uid: Abyss.Contribute.Build
---

# Build / Compile 2sxc / EAV / JS Parts

_Important: If you only want to USE 2sxc / EAV, then **you do NOT need this**. This is meant for people who want to contribute to the source code of 2sxc and EAV._

> [!TIP]
> This is very new documentation and applies to 2sxc 16.06+

## Concept

2sxc has a few git repositories, each with their own build process.
But in general they all follow the same principles:

1. When you compile a project, it will first compile the standard way, into the `dist` or `bin` folder
1. The build process (WebPack or MSBuild) will then check the current folder and all parent folders for a file `2sxc-build.config.json`
to determine places which it should copy things to...
1. If not found, it will use `2sxc-build-fallback.config.json` which is located in the root of each repository - this is usually empty.

## Use Cases

### Use Case 1: Build a Part and Copy Manually

Let's assume you just got started and want to try something in partial project.
You can just pull the repo, npm-ci everything and build.

As a result you'll have the compiled JS in the `dist` folder and can manually copy it to folder of any DNN/Oqtane as you wish.

### Use Case 2: Build a JS Library and Copy to DNN/Oqtane Automatically

In this scenario you would do the same as above, but in addition to that,
create a `2sxc-build.config.json` file in the repo folder

---

## History

* New in 2023-09 v16.06

Shortlink: <https://go.2sxc.org/build>
