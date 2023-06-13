---
uid: Api.Js.SxcJs.ContextIdentifier
---

### About the ContextIdentifier

When you use the `ContextIdentifier` to get a `$2sxc(contextIdentifier)` you are bypassing various automations which pick up the context by default.
The `ContextIdentifier` has this setup:

```js
export class ContextIdentifier {
  /** ZoneId of this Context */
  zoneId: number;
  /** AppId of this Context */
  appId: number;
  /** PageId of this Context (optional) */
  pageId?: number;
  /** ModuleId of this Context (optional) */
  moduleId?: number;
}
```

This mode is mainly used

* when integrating 2sxc into other systems which don't provide the full CMS functionality
* when creating edit-functionality which is outside the default context, like in the context of a Module where you must edit data of a different App

---

### History

1. Introduced in 2sxc 11.11 to use with `$2sxc(...)`

---
