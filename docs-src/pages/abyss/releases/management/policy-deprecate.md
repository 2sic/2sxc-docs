---
uid: Abyss.Releases.Management.PolicyDeprecate
---

# Deprecation Policy & Breaking Changes

> [!TIP]
> 2sxc is really, really stable. 
> Upgrades usually don't cause any breaking changes at all.

Despite this, it's important that 2sxc can become better, without becoming confusing. 
Because of this, we have some policies how to achieve this.

## Rule #1: Public APIs Remain Stable

Public APIs remain stable across releases, so old code / Razor will continue to work. Public APIs include

1. Public REST APIs
1. Public C# APIs used in Razor and WebAPI Controllers

Note that public APIs in code are marked as such. 

Note also that internal APIs can change without warning, as you can use them, but the burden of keeping up with the changes is up to you. 
If you use these, you will have to spend more time testing an upgrade. 

## Rule #2: New Features go Together

Many new features will only be available if you are working in a newer base class. This will aften make older APIs unavailable, so we can phase them out. 
Example:

1. The new `AsList(...)` command is only available on the newer base classes like `Custom.Razor12`
1. The old `Elements` API will not be available on the newer base classes

## Rule #3: Deprecations are Warned at Runtime (new in v13)

V13 added a new feature: Deprecation warnings. This works as follows:

1. APIs that are going to be deprecated are internally going to raise messages if they are still in use
1. You can see these messages in [Insights](xref:NetCode.Debug.Insights.Index) and soon also in the System dialogs

Deprecated APIs will follow this process:

1. Warn about deprecation for at least 1 full version, if possible 2 versions of 2sxc (so ca. 12 months)
1. We'll try to include an information, if and when the API will be removed
1. We'll also try to include information for what API should be used instead. 
1. If removing the API is important for future features, we will remove it after the warned period
1. If removal is not necessary
    1. We'll remove them from the public docs
    1. we'll leave them in but stop testing them - so they may stop working without us knowing about it

Note that depending on how much we believe the old APIs have been used, we will usually also remove them from the docs once they are deprecated. 
Only in rare cases where an API is widely used will we keep it in the docs, but clearly communicate that it's obsolete and that it shouldn't be used any more. 


---

## History

1. Deprecation warning system added in v13

Shortlink: https://go.2sxc.org/pol-deprecation