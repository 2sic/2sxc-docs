
## Breaking Changes in EAV and 2sxc Version 9

We try to minimize breaking changes, and most breaking changes won't affect your work, because it's internal API. 
We're documenting it here to ensure you know what happened, in case you still run into this.

### Version 9.20.00 (2018-03-04)

1. Minor breaking change in ADAM properties, like `Id` instead of `FolderID` which was a leftover of Dnn naming.  
	see full [blog post](https://2sxc.org/en/blog/post/working-with-the-breaking-change-adam-objects-2sxc-9-20)

### Version 09.08.00 (2017-11-28)

1. Minor breaking change `List<IEntity>` instead of `Dictionary<int, IEntity>` on the `IDataSource`  
	see full [blog post](https://2sxc.org/en/blog/post/fixing-the-breaking-change-in-2sxc-9-8-list-instead-of-dictionary)

### Version 09.03.00 (2017-10-08)

1. Breaking change on inconsistent naming `ToSic.Eav.IEntity` instead of `ToSic.Eav.Interfaces.IEntity`.  
	see full [blog post](https://2sxc.org/en/blog/post/fixing-the-breaking-change-on-tosic-eav-ientity-in-2sxc-9-3)

