

#### Breaking Changes in EAV and 2sxc v21.06

1. ⬇️ The `ISizeInfo` used for assets to report their size has a `Bytes` property which is now a `long` instead of an `int`.
    This should not affect you, unless you have some custom code which uses this interface and expects an `int` value.
