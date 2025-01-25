
### 2sxc v18.06 (2024-12-06)

Stabilization release with one big feature:

1. 🚀 [Double-Encrypt Forms posted to server, to prevent CDN snooping](https://docs.2sxc.org/abyss/security/encrypt-body/index.html) 🛡️ #3518

Features

1. ✅ `Ctrl + Click` and `Shift + Click` now works in almost all Admin UIs / Lists #3496
2. ✅ Automatically sort URL parameters provided by `MyPage.Parameters` #3520
3. ✅ Ability to prioritize url parameters as needed with `.Prioritize(...)` #3521
4. ✅ Ability to flush url parameters and still preserve settings with `.Flush()`
5. Minor: add contributing.md everywhere #3484

Bugfixes

1. 🩸 Oqtane issues with AppCode compiling when AppCode is empty #3505
1. 🐞 Bug toolbar opens query-editor sometimes fails #3513
1. Minor: show better indication when item in Entity-Picker doesn't exist #3504
