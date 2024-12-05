
### Changes in 2sxc 15.03 (2023-02-21)

1. ✅ APIs
    1. ✅ EntityId now has a OwnerId property
    1. ✅ `Kit.Page.Activate(condition: bool, features: "...")`
1. ✅ move to .net 6 (and drop .net standard 2.0) - almost done, last tests
1. ✅ Bugs
    1. ✅ RazorBlade json serialization https://github.com/2sic/2sxc/issues/2998
    1. ✅ Support for use on DNN 404 pages
    1. ✅ Date was off in date-picker
1. ✅ FIPS compliance on encryption APIs
1. ✅ DataSources
    1. ✅ Pages DataSource
        1. ✅ Improve Pages DataSource with `LinkTarget`
        1. ✅ Improve Pages DataSource with internal ability to configure what to get
        1. ✅ Improve Pages DataSource to have a UI to configure what to get - @2dm
    1. ✅ Users DataSource Massively improved - with Roles and configurable
    1. ✅ Roles DataSource improved
1. ✅ Internal - Rework Getting-Started Server to be latest and greatest @2ro
... and more see <https://github.com/2sic/2sxc/releases>
