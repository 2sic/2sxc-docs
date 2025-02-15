---
uid: Abyss.Platforms.Oqtane.Install
---

<img src="~/assets/features/platform-oqtane.svg" width="100%">

<img src="./assets/oqtane-logo.png" width="250px" align="right">

# Install Oqtane and 2sxc

Read the [blog + video + checklist](https://2sxc.org/en/blog/post/install-oqtane-2-from-scratch-with-language-packs-and-2sxc-video)
we created on installing Oqtane and 2sxc.

## Oqtane and 2sxc Version Compatibilities

> [!TIP]
> Oqtane is still being heavily improved and growing with the newest .net core frameworks.
> Because of this, extensions like 2sxc can quickly become incompatible with the latest enhancements,
> so here we'll maintain a list of Oqtane / 2sxc versions.

| Oqtane V.     | Best    | Compatible          | Incompatible            | Comments
| ---           | -----   | ------------------- | -------------           | ---
| 6.1.0         | 19.03   | ✅ 19.00.01+        | ⛔ pre 19.00.01         | latest Oqtane as of 2025-02
| 6.0.1         | 19.03   | ✅ 19.00.01+        | ⛔ pre 19.00.01         | Blazor interactive mode has some bugs
| 6.0.0         | 19.01   | ✅ 18.04 - 19.01    | ⛔ pre 18.04; 19.01+    | Blazor interactive mode has some bugs
| 5.1.2+        | 18.03   | ✅ 18.00+           | ⛔ pre 18.00            | Some Render modes supported - see [limitation](xref:Abyss.Platforms.Oqtane.Install.IssueRender050102)
| **5.0+**      | 17.06+  | ✅ 16.09+           | ⛔ pre 16.09            | .net 8 differences in System.Text.Json


For older versions, see the [older Oqtane and 2sxc Versions](#older-oqtane-and-2sxc-versions) section below.


## Upgrade Existing Installations

When upgrading an existing Oqtane/2sxc you should follow these steps:

1. make sure that a compatible 2sxc exists
1. If it is compatible to both old and new (eg v16.09) then install 2sxc first
1. else upgrade Oqtane first - possibly 2sxc then stops working
1. then upgrade 2sxc


## Older Oqtane and 2sxc Versions

This compatibility table is for versions which are probably not in use anymore.

| Oqtane V. | Best    | Compatible          | Incompatible            | Comments
| ---       | -----   | ------------------- | -------------           | ---
| 4.0+      | 16.09   | ✅ 16.02 - 16.09    | ⛔ pre 16.02            | .net Framework and EF 7
| 3.4+      | unknown | ✅ 15.06+           | ⛔ pre 15.06            | Undo breaking changes in Permissions
| 3.3+      | unknown | ✅ 15.05+           | ⛔ pre 15.04            | Breaking changes in Permissions
| 3.01.+    | 14.12   | ✅ 13.06 - 14.12    | ⛔ pre 13.06 / 15+      | Changes in Oqtane 3.3
| 3.00.03   | 13.02   | ✅ 13.01+           | ⛔ pre 13.01 / 13.06+   | ...
| 3.00.02   | 13.02   | ✅ 13.01+           | ⛔ pre 13.01 / 13.06+   | ...
| 3.00.01   | 13.02   | ✅ 13.01+           | ⛔ pre 13.01 / 13.06+   | Oqtane save/delete module settings
| 3.0       | 12.10   | ✅ 12.10+           | ⛔ pre 12.10 / 13.06+   | Changes in .net 6
| 2.3       | 12.10   | ✅ 12.04+           | ⛔ pre 12.04            | ...
| 2.2       | 12.06   | ✅ 12.04+           | ⛔ pre 12.04            | Changes in Bootstrap / jQuery & Authentication
| 2.1       | 12.04   | ✅ 12.04            | ⛔ 12.05                | Changes in Multi-Language
| 2.0       | 12.00   | ✅ 12.00 - 12.02    | ⛔ 12.04                | first compatible release


---

Shortlink: <https://go.2sxc.org/oqtane-install>
