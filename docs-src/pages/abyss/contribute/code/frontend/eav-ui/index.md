---
uid: Abyss.Contribute.Code.Frontend.EavUi.Index
---

# Contribute to Front-End EAV-UI (WIP)

[!include["_contributors-only.md"](../../_contributors-only.md)]

The EAV-UI is the main edit/admin UI for both 2sxc and EAV.
It's built using Angular, and it's important that all contributors use the same conventions to keep the code clear and maintainable.

## Dependency Injection - Prefer Transient

Angular has a very complex dependency injection system.
This is a common cause of problems, as services accidentally share state.

1. Prefer creating services which are only meant to be used transiently,
    and not shared across the app.
1. Avoid using `providedIn: 'root'` in services,
    as this will make them shared across the entire app,
    which can lead to unintended consequences.
1. Avoid using `providers: []` in components,
    as this will create a new instance of the service for each component,
    which can also lead to unintended consequences.
    By avoiding `providers: []` as much as possible, we can look for the few cases where it's used,
    to see if anything will cause problems.
1. Use the special `transient<T>()` function to create services which are meant to be used transiently, and not shared across the app.

## Routing-Dialogs - Use Convention

TODO: @2rb document how we do this. things like

remembering to use `<router-outlet></router-outlet>` in the main app component, and then using the `DialogService` to open dialogs with routing, and how to structure the routes for dialogs.

when documenting, always explain why - if you're not sure, ask @iJungleboy

## Dialogs: Reuse Shared Parts

TODO: @2rb document this, especially how to use the new header component etc.

## Tables: Use AgGrid conventions

TODO: @2rb document this

---

## History

* Created 2026-02-21
