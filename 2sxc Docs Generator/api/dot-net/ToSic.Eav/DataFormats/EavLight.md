---
uid: ToSic.Eav.DataFormats.EavLight
---

[!include["_formats-include.md"](_formats-include.md)]

## EavLight

The EAV Light data format is very trivial, basically a dictionary with values.
It's mainly used to serialize entities for use in JS etc.
Internally it's used for some admin-dialogs, and custom Razor and Web-APIs usually use this to provide one or more entities for direct use - either as inline-JSON or to then automatically serialize.

[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]
