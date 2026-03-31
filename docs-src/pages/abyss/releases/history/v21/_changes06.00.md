
### 2sxc v21.06.00 (2026-03-31)

#### General Enhancements


1. 🧑🏼‍💻 Special feature to disable App-Restore, to protect source systems from accidentally resetting the app (can happen if source / target look very similar)
1. 🛡️ PageShield FloodGates: Beta implementation to protect against combinations from multiplying
1. ⚡ LightSpeed: Feature to enable ZIP compression in memory to reduce memory usage (Patron Performance feature)
1. ⚡ LightSpeed: API and EndPoint to flush cache by app (still experimental)
1. All Apps released with the latest `dotnet-project` extension to support intellisense

#### OData

1. 💲 Improve OData on Query - if only one stream is requested, OData will apply
1. 🪲 Fix `Title` always included, even if `$select` was used to exclude it
1. 🪲 Fix JS `$2sxc` API to better support parameters on `query.getAll()`, `query.getStream()` as well a `data.getAll()`

#### Bugfixes

1. 🐞🌪️🥫 Visual Query - bug connecting streams, incorrect handling of `*` character.
1. 🐞 Importing app incorrectly checked for version - causing it to not import.
1. 🪲 Edit UI: Minor colors and number indicators
1. 🪲 Edit UI: Fix color of buttons for app-state import (button appeared disabled even though it was ok)

#### Docs / Tutorials

1. 📖 Docs improve tiles

#### Internal and Code Hygiene

1. EAV UI: Update Angular and other NPM dependencies to latest versions
1. Memory info: Include compressed size and total size uncompressed.
