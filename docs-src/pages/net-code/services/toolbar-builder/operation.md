---
uid: ToSic.Sxc.Services.ToolbarBuilder.Operation
---

<img src="~/assets/features/toolbar.svg" class="feature">

# Toolbar Builder Guide – Operation

The **Operation** determines what exactly should happen to a button. 

In most cases, the default is to add another button, but you may also want to remove it, or do something more custom. 

The `operation` is an optional parameter and [must be named](xref:NetCode.Conventions.NamedParameters).

## Add a Button

In most cases the default is to add a button to the toolbar. 
In such cases you don't need to specify add manually. 

In cases where the default is Auto-Add (see below) you can force-add it by setting the operation to add.

For example, an `app-resources` button `.AppResources()` is to admin the app language resources.
It would only appear if the user has elevated permissions. 
But you may want to make this visible to other editors as well, use the operation _add_.

* Verb: `"add"`
* Shorthand: `"+"`

## Auto-Add if Conditions are Met

This is similar to _add_ above, except that it won't force-add the button. 
This means internal conditions will be checked, before adding the button. 

* Verb: `"auto"`
* Shorthand: `"±"`

## Remove a Button

In cases where you have a pre-configured toolbar such as the `default` toolbar on `.Default()` 
you may want to remove just a few buttons. 

Example: `Kit.Toolbar.Default().Layout("-")` will be missing the change-layout button

* Verb: `"remove"`
* Shorthand: `"-"`

## Modify a Button

In cases where you have a pre-configured toolbar such as the `default` toolbar on `.Default()` 
you may want to _modify_ just a few buttons. 

Example: `Kit.Toolbar.Default().Add("%", prefill: new { Title = "new item" })` will have a prefilled title. 

* Verb: `"modify"`
* Shorthand: `"%"`

---

See also the JS [toolbar docs](xref:JsCode.Toolbars.Simple)