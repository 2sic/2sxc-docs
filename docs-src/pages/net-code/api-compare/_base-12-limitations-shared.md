
Since this base class is meant to work on both Dnn and Oqtane, it only supports features which both of these platforms support.

1. The property `Dnn` doesn't exist on this base class, as it would lead to code which can't run cross-platform. [...more](xref:NetCode.TypedCode.CompareApis.DnnObject)

1. The `CreateInstance(...)` works only on C# files `.cs` but not with CSHTML files `.cshtml` as this probably won't work in .net 5

1. Koi works differently than before. Previously you just used a global object `Connect.Koi.Koi` to use Koi, but because .net 5 should really use dependency injection, you should now get Koi using `GetService<Connect.Koi.ICss>()`. The old mechanism will still work in Dnn but would not work in Oqtane.
