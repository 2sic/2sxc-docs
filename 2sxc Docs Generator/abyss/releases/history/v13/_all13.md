
## Version 13

TODO

1. New WebApi route `app/auto/data` to replace `/app/auto/content` - the old one will still work, but we won't document it any more, because it was a confusing name
1. Lots of metadata stuff... TODO:
1. New `sxc.data` and `sxc.query`


[!include["Breaking Changes"](./_brc13.00.md)]


### 13.01

* JSON fields
* Link.Image with srcSet Parameter ?
* ToSic.Sxc.Services.IFeaturesService

### 13.02
* JS
* Global Apps


### 13.03 TODO

### 13.04 TODO


### 13.05

* Moved the `Web.IInPageEditingHelper` to `Services.IEditService` - this is non breaking and shouldn't matter, as people won't be using the direct inteface
* Moved the `Web.ILinkHelper` to `Services.ILinkService` - this is non breaking and shouldn't matter, as people won't be using the direct inteface