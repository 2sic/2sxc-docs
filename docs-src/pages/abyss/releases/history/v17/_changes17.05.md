
### 2sxc v17.05 (2024-03-25)

> We believe this is stable, but ask the community to do in-depth testing so we can release an LTS

#### Highlights

1. Improved Code-Generator to be in a standalone DLL `ToSic.Sxc.Code.Generate`
2. Improved Code-Generator to generate Razor, Code and WebApi base classes

#### Enhancements

1. Impove image-resize tooltip #3329
2. $2sxc JS used in modules which are rendered into Dnn themes #3333
3. Improve logging of parameters of DataSources (eg. Value-Filter DS)
4. Prepare for Oqtane 5 SSR
5. Improve architecture for generating App-objects in the background

#### Bugs fixed

1. various admin and replace-operations on inner-content #3299
2. fix quickE when selecting content-blocks #3317
3. Token templates - fix some toolbars #3328
4. Fix issue with Oqtane urls
5. Fix issue with Oqtane WebApis which affected Blog RSS feed
