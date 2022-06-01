---
uid: JsCode.Angular.DnnSxcAngular.Toolbars
---

<img src="../assets/dnn-sxc-angular-banner-flat.jpg" width="100%">

# Toolbars in Angular (dnn-sxc-angular)

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .spa-2sxc-js { visibility: visible; } </style>

`dnn-sxc-angular` provides  directives/components which allow to place toolbars in an Angular App. 

Prerequisite is an Angular App running with [dnn-sxc-angular](xref:JsCode.Angular.DnnSxcAngular.Index).

## How to use

Place the toolbar directives/components in your templates. There are two different ways to place your toolbars, the tag-toolbar (default) and the inline toolbar, depending on the use case. 

1. In most cases, you will want to use the `[sxc-toolbar]` tag-toolbar directive 
1. In rare cases you may prefer the inline `<sxc-toolbar>` toolbar is useful when you want to show the toolbar without the need to hover over the target element.

## Example

We'll explain how to use toolbars based on the [Template App](xref:JsCode.Angular.TemplateApp).

Check out the `team.component.html` - you'll see some code like this:

```html
<!-- #ExampleContentManagement - this shows how to use the toolbar with just the add-button for a specific type and also do custom view refresh -->
<div [sxc-toolbar]="toolbarFor()" (refresh)="teamSvc.refresh()">
  <h2>Team</h2>

  <app-business-unit-selector></app-business-unit-selector>

  <ol>
    <!-- #ExampleContentManagement - this will create a delete/edit toolbar for this item and will also do custom view refresh-->
    <li *ngFor="let person of team; trackBy: trackById" [sxc-toolbar]="toolbarFor(person)" (refresh)="teamSvc.refresh()">
      <app-person [person]="person"></app-person>
    </li>
  </ol>

  <hr />
  <app-team-explained></app-team-explained>
</div>
```

The code of `team.component.ts` is this:

```js
@Component({ /* stuff */ })
export class TeamComponent {

  /** The data which is shown in the template */
  team: Person[] = [];

  constructor(private route: ActivatedRoute, public teamSvc: TeamService, private cdr: ChangeDetectorRef) {
    this.teamSvc.team$.subscribe((newTeam => { this.team = newTeam; }));
  }

  /**
   * Create a toolbar configuration for a person or for new
   * #ExampleContentManagement
   */
  toolbarFor(person?: Person) {
    const mainConfig = 'toolbar=empty?contentType=Person&entityId=' + (person?.Id ?? '0');
    return person
      ? [mainConfig, "edit", "delete&color=gray?entityGuid=" + person.Guid + "&title=" + person.Name]
      : [mainConfig, 'new']
  }
}
```

As you can see, the `[sxc-toolbar]` attribute activates the sxcToolbar directive of `dnn-sxc-angular`. 
The configuration for the toolbar is provided by the `toolbarFor(...)` call in the controller class and it uses the [simple toolbar configuration system](xref:JsCode.Toolbars.Simple).

That's how easy it is to create CMS toolbars in Angular 😉.
