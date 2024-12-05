---
uid: ToSic.Sxc.Dnn.Run
---

Run is all about Runtime / Execution of the EAV. It contains things that describe the environment it's running in and has base material for specific implementations. 

For example, the `ITenant` and `ITenant<T>` are inherited by the `DnnTenant`. 

> [!NOTE]
> All the things starting with `Dnn...` are Dnn specific implementations of EAV or 2sxc features. 
> We've documented them so you know how things work, but you usually won't care about them.
> The `Dnn` prefix helps us better detect in our code when we're using Dnn stuff vs. generic stuff.