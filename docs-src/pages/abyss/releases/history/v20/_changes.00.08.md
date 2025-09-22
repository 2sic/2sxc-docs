
### 2sxc v20.00.08 (2025-09-20)

> [!WARNING]
> 2sxc v20 is a [MoT Release](xref:Abyss.Releases.Management.PolicyMot), containing many breaking changes.
>
> See [Breaking Changes in v20](xref:Abyss.Releases.History.V20.Breaking) for details.

This 20.00.08 has really nice enhancements, but since we're still stabilizing v20, we are
not incrementing the next number yet.

#### Enhancements

1. Admin UI: show "loading" in table while data is still being fetched
1. 🧩 App Extensions - new feature to load `/extensions` instead of `/system` inside an app (replacement)
1. 🧩 App Extensions - backend to manage extensions (UI still missing)
1. 🌍 Language: Experimental feature to also allow translating _to_ the primary language

#### Bugfixes

1. 🐞 Items list (such as slides of a swiper) did not show
1. 🪲 Minor: QuickE toolbars for inner content looked the same as normal content; now lighter

#### Internal Changes

1. Experimenting with delayed loading of AppCode dll because it may cause issues with anti-virus locking the file at first compile
