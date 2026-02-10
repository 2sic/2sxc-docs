

#### Breaking Changes in EAV and 2sxc v21.02

1. ⚠️🩸 Oqtane: The folder structure of app-files has changed, to prepare for supporting multi-tenant folders.
    The migration should happen automatically, but if something doesn't work, this is why.
1. ⬇️🥫 DataSource - an internal API property `Link` is changed to `GetLink()` and changed to be an explicit implementation.
    This is probably never used.
