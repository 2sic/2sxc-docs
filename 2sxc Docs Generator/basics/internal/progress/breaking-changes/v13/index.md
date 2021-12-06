---
uid: Internal.Progress.BreakingChanges.V13
---

# Breaking Changes in EAV and 2sxc

We try to minimize breaking changes, and most breaking changes won't affect your work, because it's internal API. 
We're documenting it here to ensure you know what happened, in case you still run into this.

## Summary

V13 did some clean-up. It will rarely affect you, but if you are using the TimelineJs App it will.


## Breaking Changes in 2sxc 13.00

Things that may affect you:

1. An old feature for publishing module _InstanceData_ as JSON is removed - [see instructions](xref:Internal.Progress.BreakingChanges.V13.InstanceData)
1. The Image Resizer is being replaced TODO:
1. The App containing Site-wide settings is changed to TODO:


Things which probably don't affect anybody

1. .net Framework and Dll Updated to Match Dnn 9 Requirements - but still works in Dnn 7.4.2
    1. .net Framework 4.7.2 now required (previously .net Framework 4.5.1)
    1. .net Standard 2.0.3 required (previously .net Standard 1.6)  
    **Important**: This will be referenced in the `web.config` upon installation
    1. Dependency Injection updated to .net core 2.1.1 (previously 1.1)
    1. Newtonsoft.Json updated to v10.0.3 
1. Entity Framework updated to 2.1.1 (previously 1.1) - Oqtane is unmodified and uses 3.1.4
1. Dnn DLLs renamed
    1. `ToSic.Sxc.Dnn.dll` became `ToSic.Sxc.Dnn.Core.dll` for consistency
    1. `ToSic.SexyContent.WebApi.dll` became `ToSic.Sxc.Dnn.WebApi.dll`
    1. `ToSic.SexyContent.Razor.dll` became `ToSic.Sxc.Dnn.Razor.dll`