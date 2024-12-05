---
uid: Abyss.Contribute.Docs.Implementation.Troubleshooting
---


# Troubleshooting

## Problems with MSBuild or .net SDK

DocFX runs MSBuild to compile the projects it finds.
This can easily cause trouble if your Dev-PC has been through various versions of Visual-Studio.
If you need to troubleshoot this, best contact iJungleboy on GitHub.

## Problems with Old / Unexpected Results

MSBuild will compile everything into the `obj` folder of this docs-project.
This is used as a cache for the next builds. If you run into unexpected results, always clean out the `obj` folder first.

## Problems with Github links

DocFX automatically links all the auto-generated docs with the git-repo.
So make sure that the main code-project is pulled from the official location - otherwise the links will point to another repo.

