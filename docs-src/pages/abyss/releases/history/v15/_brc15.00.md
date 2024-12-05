
### Breaking Changes in 2sxc 15.00

> [!TIP]
> In summary we've made a lot of internal breaking changes.
> But for all normal users it will have no effect at all.

We believe it will only affect you in these scenarios:

1. If you have a **custom DataSource**, you will need to make some minor changes and recompile them
1. If you used special, non-public Logging APIs you would need to update your work
1. If you used any undocumented APIs, you will need to check if everything still works


#### API Changes that may affect you

1. DataSource base class was completely refactored  
    [see instructions](xref:Abyss.Releases.History.V15.DataSource)
1. Old static `ToSic.Eav.DataSource` was removed ([deprecated since v13](xref:Abyss.Releases.History.V13.DataSource))
1. Internal logging API `ILog` was completely refactored  
    [see instructions](xref:Abyss.Releases.History.V15.Logging)
1. Internal object wrappers were completely refactored  
    [see instructions](xref:Abyss.Releases.History.V15.UnwrappedContents)
1. [TinyMCE Upgrade to v6](xref:Abyss.Releases.History.V15.TinyMce)
1. [Database changes](xref:Abyss.Releases.History.V15.Database)
1. [Minor API changes](xref:Abyss.Releases.History.V15.Minor)


#### Breaking Updates which probably don't affect anybody

1. SQL changes - minor updates to the Database
1. Internal APIs which were removed
    1. Static `ToSic.Eav.Data.Builder.AttribBuilder.AddValue(...)`
