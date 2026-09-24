---
uid: JsCode.Angular.DnnSxcAngular.Toolbars
---

<img src="../assets/sxc-angular-banner-flat.jpg" width="100%">

# Toolbars in Angular with sxc-angular

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .spa-2sxc-js { visibility: visible; } </style>

sxc-angular provides standalone directives for adding 2sxc editing toolbars to Angular components.

* Use `SxcTagToolbarDirective` for the normal floating toolbar attached to an element.
* `SxcToolbarDirective` renders an inline `<sxc-toolbar>` element and is currently a beta API.

## Import the Directive

```ts
import { SxcTagToolbarDirective } from '@2sic.com/sxc-angular';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  imports: [SxcTagToolbarDirective],
})
export class TeamComponent {
  constructor(public teamSvc: TeamService) {}

  toolbarFor(person?: Person) {
    const root = `toolbar=empty?contentType=Person&entityId=${person?.Id ?? 0}`;
    return person
      ? [root, 'edit', `delete&color=gray?entityGuid=${person.Guid}`]
      : [root, 'new'];
  }
}
```

## Add Toolbars to the Template

```html
<div [sxc-toolbar]="toolbarFor()" (refresh)="teamSvc.refresh()">
  <h2>Team</h2>

  @for (person of team; track person.Id) {
    <div
      [sxc-toolbar]="toolbarFor(person)"
      (refresh)="teamSvc.refresh()">
      {{ person.Name }}
    </div>
  }
</div>
```

The `[sxc-toolbar]` input accepts the normal [toolbar configuration](xref:JsCode.Toolbars.Simple). If a `refresh` listener is present, the directive emits the workflow event and prevents the default full-page refresh. Without a listener, the normal 2sxc refresh behavior remains active.

Toolbars are created only when the current context is in edit mode.

> [!NOTE]
> Version 22 does not use `ContentManagerModule`. Import the standalone directive directly in every component that uses it.
