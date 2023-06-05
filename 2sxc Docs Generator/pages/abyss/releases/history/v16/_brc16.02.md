
### Breaking Changes in 2sxc 16.02

#### API Changes which should really not affect you

1. Various APIs which used to return an `IHybridHtmlString` now return an `IRawHtml`  
    This is to sync types with RazorBlade. It should have no effect on any code out there, as the result type is usually `dynamic`
