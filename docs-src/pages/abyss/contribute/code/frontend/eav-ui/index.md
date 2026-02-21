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

## Prefer Signals, avoid Observables

Historically Angular has used Observables for state management and data flow.
However, this can lead to complex and hard-to-maintain code, especially when dealing with multiple subscriptions and ensuring proper cleanup.
People also have a really hard time understanding how Observables work, and how to use them correctly.

Signals are a newer feature in Angular that provide a simpler and more intuitive way to manage state and data flow.
They allow you to define reactive state that automatically updates the UI when it changes, without the need for manual subscriptions and cleanup.
By using Signals instead of Observables, we can create cleaner and more maintainable code, and reduce the likelihood of bugs related to state management and memory leaks.

1. Try to use signals wherever possible.
1. If old code uses observables, try to refactor it to use signals instead, if possible.
1. Try to use `httpResource` over `HttpClient` - use our helper services for this.
1. Use our signal helpers which give the signals a name,
    such as `computedObj(name, () => ...)` instead of `computed(() => ...)`,
    to make it easier to debug and understand the code.
    This is mainly important for long-living signals on services, but less important for short-living signals in components.


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
