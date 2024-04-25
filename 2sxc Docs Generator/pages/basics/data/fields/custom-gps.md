---
uid: Basics.Data.Fields.CustomGps
---
# Field Input-Type **custom-gps**

Use this field type for selecting positions on a map, storing [custom JSON data](xref:Basics.Data.Fields.Custom).


## Features

1. Auto-find the location based on address data already added to the form
1. Pin can be moved manually

## Configure Custom-Gps

* Configure which fields are to be used to find the coordinates

## History

1. Introduced in 2sxc 2.0 - originally with a virtual field which placed the numbers into 2 number fields
1. Modified behavior to use a JSON field instead ca. 2sxc 7
1. Improved Razor with `ITypedItem` to have a `.Gps(...)` method 2sxc 17
