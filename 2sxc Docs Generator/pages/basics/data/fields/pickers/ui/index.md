---
uid: Basics.Data.Fields.Pickers.Ui.Index
---
# Picker UI Controls (new v18)

The UI is what the user sees and interacts with.
This can be a dropdown, radio buttons, checkboxes, etc.

Some UIs also allow reordering what was selected, while others do not.

As of now we have the following UIs:

1. `list` - a list of options, where one or more can be selected, optionally with dialog to re-order the selected items
1. `radio` - a list of radio buttons, where one can be selected
1. `checkbox` - a list of checkboxes, where one or more can be selected
1. `auto-inline` - automatic selection of the best UI, based on the number of options which can be selected (radio, checkbox)
1. `table` - a table of options, where one or more can be selected, optionally with dialog to re-order the selected items
1. `dropdown` (WIP/BETA) - a dropdown with a list of options, where one can be selected
1. `tree` (WIP/BETA) - a tree of options, where one or more can be selected


## Picker UI Preview

Most of the UIs will show a label as a preview, but there are more advanced cases such as:

1. **Icons**
1. **Colors**
1. **Images**
1. **Fonts**

This is still WIP


---

## History

1. Initial Dropdowns (for string) added ca. 2sxc 2.0
1. Architecture change to generic pickers started in 2sxc 16
1. Regarded as Beta in 2sxc 18.01, but already used in production
