
### 2sxc v20.00.06 (2025-09-08)

> [!WARNING]
> 2sxc v20 is a [MoT Release](xref:Abyss.Releases.Management.PolicyMot), containing many breaking changes.
>
> See [Breaking Changes in v20](xref:Abyss.Releases.History.V20.Breaking) for details.

This 20.00.05 has really nice enhancements, but since we're still stabilizing v20, we are
not incrementing the next number yet.

#### Enhancements

1. 🧑🏼‍💻 Admin UI: better indicators for Ctrl+Enter using SVGs.
1. 🧑🏼‍💻 Admin UI: Improve indicators for clickable areas.
1. 🔬 Formula: Introduce `context.target.entity.isNew` to let formulas check if an entity is new.
1. 🔬 Formula: Introduce `context.target.entity.isCopy` to let formulas check if an entity is a copy.
1. Rework file based data on Apps to also load entities - previously only content types were loaded.


#### Bugfixes

1. 🐞 Some field configuration for entity/pickers showed a incomplete UI and was missing defaults/prefills. This resulted in new entity-fields missing the Allow-Add/Allow-Edit etc.
1. 🐞 Improve checking locked dll files for HotBuild, should reduce issues with "dll being locked".
1. 🐞 Dnn: AJAX preview caused some issues with JS loaded within that html - it previously had a wrong `~` (tilde) prefix
1. 🩸 Oqtane:
1. 🪲 Minor: Restore the use of `Enter` in some dialogs.
1. 🪲 Minor: List of API controllers now checks deeper folders.


#### Internal Changes

1. Rework how Metadata is attached to entities; make it more robust.
