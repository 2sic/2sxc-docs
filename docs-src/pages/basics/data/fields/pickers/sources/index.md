---
uid: Basics.Data.Fields.Pickers.Sources.Index
---
# Picker Sources (new v18)

The source of the picker is where the options come from.
These sources are defined in 2sxc, and the definition can be reused in many pickers,
so you can have a single source for all pickers which should show the same options.

Sources can be:

1. A manually entered list
1. Entities retrieved from the server
1. External sources
1. JavaScript sources


| Source Name | Source Type | Description | Example |
| --- | --- | --- | --- |
| **Custom List** | Manually entered | A list of values and labels | `red:Error`<br>`orange:warning`<br>`black:ok` |
| **CSV** | Manually entered | A list of of values which can have more columns (mainly for additional hints / links) | `Red,Red,FF0000,https://...` |
| **Entity** | Server-side | A list of entities of a certain type | `Article` |
| **Query** | Server-side | A list of entities which are provided a certain query (with optional query-parameters to change what is retrieved) | `Article,Category=News` |
| **CSS** 🚧 | External | A CSS file and rules how to find the relevant CSS rules (e.g. for icon-fonts) | (not shown here) |
| **JavaScript** 🚧 | Client-side | A JavaScript function which will provide the options (implemented as a Formula) | (not shown here) |

With time, we'll add more sources as they are needed. Examples would be:

* Files in a folder - for SVG icons

---

## History

1. Picker Sources introduced as beta in v17
1. Regarded as Beta in 2sxc 18.01, but already used in production
