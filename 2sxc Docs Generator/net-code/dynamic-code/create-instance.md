---
uid: NetCode.DynamicCode.CreateInstance
---

# CreateInstance(...) Command

If you have external code you want to import you can use **CreateInstance**. 

⚡ The [official API docs](xref:ToSic.Sxc.Code.ICreateInstance.CreateInstance*).


[!include["Razor Tutorials"](../../shared/tutorials/razor.md)]


## Example

```razor
@inherits ToSic.Sxc.Dnn.RazorComponent
@{
  var helper = CreateInstance("_helpers.cshtml");
  var businessLogic = CreateInstance("BusinessLogic.cs");
}

@helper.ShowIntroduction

<div>
  @businessLogic.CalculateSecretHash()
</div>

```

The code you will import is either another Razor page (`_*.cshtml`) or a C# code file (`*.cs`).

## Also Read

* [](xref:Tut.Razor.Reuse)
* [](xref:AppsCatalog) - we suggest you check out some apps - almost all use this. 

## History

1. General Tokens introduced in 2sxc 8.0
1. Added extra security switch in 2sxc 9.32
