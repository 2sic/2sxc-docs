---
uid: Abyss.Contribute.Tutorials.SetupDemoEnvironment
---

# Setup New Environment

When you copy the tutorial app to a new environment there are some steps you need to follow, in order to have all tutorials running.

For instance the _IUserService_ tutorial registerd a new **user** and **user role** for instance. These need to be duplicated as they are not part of the app export.

---

## 2025-07-14 - Use Data Sources

For the _Get Users with App Query_ tutorial you need to:

1. Create a new query: `AllUsers` 
1. Add the `Users` block for the DataSource.
1. Add two streams: `Roles` as `Roles` and `Default` as `Users`.

<img src="./assets/allusers-query.png" class="glow">

---

## 2025-07-10 - IUserService

For the _IUserService_ tutorial you need to:

1. Create a new User: `UserServiceDemoUser` 
1. Create a new User Role: `UserServiceDemoRole` 
1. Add the `UserServiceDemoRole` Role to the `UserServiceDemoUser`
