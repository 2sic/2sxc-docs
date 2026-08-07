---
uid: Abyss.Parts.Boot.Index
---

# Boot System

The 2sxc / EAV system has various boot helpers to get things going.
The important ones to understand:

1. Various helpers register different parts of the Dependency Injection tree.  
    These are in various `Run.Startup` namespace, such as [](xref:ToSic.Sxc.Run.Startup) or [](xref:ToSic.Eav.Run.Startup).

1. There are special boot helpers which collect booting processes and run them in order as specified by each part.  
    These helpers implement [](xref:ToSic.Sys.Boot.IBootProcess). See [](xref:ToSic.Sys.Boot) for more details.

1. Part of this booting is also the registration of various parts such as feature packages and definitions.

## Also Read

* (none ATM)


## History

1. Documented for v22
