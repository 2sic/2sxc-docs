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

The EAV-UI uses router-driven dialogs instead of opening dialogs
imperatively.

### Why?

- Deep-linking works
- Browser back/forward works
- Reloading restores dialog state
- UI state is URL-driven

> [!TIP]
> Remembering to use `<router-outlet></router-outlet>` in the main app component, and then using the `DialogService` to open dialogs with routing, and how to structure the routes for dialogs.

### Opening a Dialog

``` ts
this.dialogService.open({
  route: ['edit', id]
});
```

### Closing a Dialog

``` ts
this.dialogService.close();
```

If you see direct usage of `MatDialog`, it is probably legacy code and
should be refactored.

## Dialogs: Reuse Shared Parts

All dialogs must follow shared structural conventions.

### Dialog Structure

The `DialogHeaderComponent` is a shared layout component responsible for rendering:

- the dialog header container
- the title area
- the optional close button

It does **not** control title styling or domain logic.
Title content must be projected using the `dialog-title` attribute.

**Inputs:**

- showClose (`boolean`, **default**: *true*)
  - Controls whether the close button is displayed.
- closeTooltip (`string`, **default**: *"Close dialog"*)
  - Tooltip text for the close button.

**Output:**

- close
  - Emits when the close button is clicked.
  - Typically used to call `dialog.close()`.

``` html
<div class="eav-dialog">

  <!-- Dialog Header -->
  <app-dialog-header [showClose]="true" (close)="dialog.close()">
    <!-- 
      Projected title content.
      This will be rendered inside the header's title container.
      Do NOT add header classes here, they are defined inside the component.
    -->
    <span dialog-title>
      My Dialog Title
    </span>

  </app-dialog-header>

  <!-- Dialog Content -->
  <div class="eav-dialog-content">
    <p>This is the dialog body.</p>
  </div>

</div>
```

1. Always use `app-dialog-header`
2. Never re-implement dialog close buttons
3. Use shared CSS classes:
    - `eav-dialog`
    - `eav-dialog-content`
    - `eav-dialog-actions`
4. Avoid inline styles

## Tables: Use AgGrid conventions

All data tables in EAV-UI use AgGrid.

### Core Rules

1. Always define column definitions separately.
2. Avoid inline column definitions in templates.
3. Use shared helpers for formatting and indicators.
4. Avoid manual DOM manipulation.

### Prefer Signals for Data

Bad:

``` ts
this.http.get(...).subscribe(...)
```

Good:

``` ts
data = httpResource(...);
```

or

``` ts
items = computedObj('items', () => ...);
```

## Patron Indicators

We have various UI elements to indicate that a feature is only available to patrons.
This list should help you find/pick the best choice for your use case.

1. `FeatureComponentBase` - the base class for all components which show some kind of patron status.  
    You can always search for all derived components to find out which options exist.
    1. `featureNameId` - the name of the feature, which is used to look up the feature in the database and check if it's enabled for the current user.
    1. `showIf` - *optional* determine if showing happens when the feature is disabled (default) or enabled (if set to `true`).
1. `FeatureIconIndicator` / `app-feature-icon-indicator` - just show a diamond if locked, won't open dialogs when clicked.  
    This is for use inside things such as buttons or FABs, where the click action is handled by the button, and we just want to show that it's a patron feature.
1. `FeatureIconWithDialog` - show a diamond icon `app-feature-icon-with-dialog` which opens a dialog when clicked, showing more information about the feature and how to become a patron.  
    This is for use in places where we want to give the user more information about the feature and how to become a patron, such as in a settings page or a feature list.
    1. `forText` - *optional* change styling to use as inline-text.


---

## History

- Created 2026-02-21
