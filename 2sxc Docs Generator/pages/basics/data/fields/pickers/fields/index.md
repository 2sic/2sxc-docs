---
uid: Basics.Data.Fields.Pickers.Fields.Index
---
# Picker Target Fields (new v18)

The target field is where the selected values are stored.
This can be a single value, a list of values, etc.
Some options will not be available to all targets, e.g. a number can't contain a list of numbers, but a string can contain a list of strings (e.g. separated by commas).
As of now, the targets are:

1. **Entity** - one or more relationship to other entities, which can be manually re-ordered
1. **String** - a string containing one or more values, which can be manually re-ordered
1. **Number** - a number containing a value (or none)

With time, we'll add more targets as they are needed. Examples would be:

* **Link** - a link to another image, document or page - e.g. `file:72` or `page:42`
* **Boolean** - a true/false value - this is not as amazing as others, but there are cases where a picker would be the better UI
* **Dates** - a date - for example when choosing one of a few possible dates


---

## History

1. Picker Target Fields introduced as beta in v17
1. Regarded as Beta in 2sxc 18.01, but already used in production
