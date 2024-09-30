---
uid: Basics.Data.Fields.Pickers.Index
---
# Picker Fields Field (new v18)

Many fields in a form are somehow meant to let the user pick / select something from a list of options.
Classic examples include:

* String dropdowns listing a few possible values which were manually entered
* Entity dropdowns showing a list of all entities of a certain type

More advanced examples include:

* String dropdowns listing possible values from an external source
* Entity dropdowns showing a list of entities which match a complex criteria / query
* Icon pickers showing a list of icons

All these pickers have a lot in common, such as:

1. There is a list of options
1. The user can select one or more options
1. The UI provided to the user can vary based on various settings - such as can-only-select-one, can-search, etc.
1. In some cases, the order of the options is important (in others not)
1. In some cases, the order of selection is important (eg. the first selected category may be more important)
1. In some cases, the user can add new options
1. In some cases, the user can edit the options
1. In some cases, the user can delete options
1. etc.

To make this more generic, we've created a new concept called `Picker Fields`.
This is a new field type which can be used to create all kinds of pickers.

## Top Level View of the Picker Architecture

Pickers basically have:

1. A source (e.g. manually entered list, a query, etc.)
1. A target (state) - this is where the selected values are stored (e.g. a string, number, a list of entities, etc.)
1. A UI which lets the user see what was selected and select new values (e.g. a dropdown, radio buttons, checkboxes, etc.)
1. Settings to configure all this

TODO: ILLUSTRATION

---

## History

1. Initial Dropdowns (for string) added ca. 2sxc 2.0
1. Architecture change to generic pickers started in 2sxc 16
1. Regarded as Beta in 2sxc 18.01, but already used in production
