
### Breaking Changes in 2sxc 16.02

#### API Changes which affect you if you had installed v16.01 with the latest Blog or Mobius

In v16.01 we had introduced a new Typed API, which turned out to be not good-enough.

This meant we had to rollback some of the changes we had introduced there, 


#### API Changes which should really not affect you

1. Various APIs which used to return an `IHybridHtmlString` now return an `IRawHtml`  
    This is to sync types with RazorBlade. It should have no effect on any code out there, as the result type is usually `dynamic`
1. Renamed the type `ToSic.Sxc.Data.IDynamicMetadata` to `ToSic.Sxc.Data.IMetadata`  
    This is technically a breaking change, but the type name should never have been used in any razor code, so it shouldn't affect anybody.
1. Renamed `ToSic.Sxc.Data.IDynamicField` to `ToSic.Sxc.Data.IField`  
    This is technically a breaking change, but the type name should never have been used in any razor code, so it shouldn't affect anybody.
