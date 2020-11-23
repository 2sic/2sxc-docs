---
uid: Specs.Js.Commands.Code
---
# Html & Js: Buttons with Custom Code in a Toolbar

In some cases you want to add buttons to a toolbar, which run custom JavaScript code. 

## How to use
Here's a basic example showing a 2sxc-toolbar with a custom code:

```html
<ul class="sc-menu" data-toolbar='{
    "groups": [{ 
        "buttons": [{ 
            "command": { 
                "action": "custom", 
                "customCode": "alert(\"custom button!\")"
            }
        }]
    }]
}'></ul>

```
This shows 2sxc-toolbar with 1 button, calling the [command](xref:Specs.Js.Commands) **custom** and giving it the code **customCode** which will be executed. 

Here's a more extensive example:
```html
<div class="sc-element">
    custom js action
    <ul class="sc-menu" data-toolbar='{"groups": [
        { "buttons": [
            { 
                "command": { 
                    "action": "custom", 
                    "customCode": "alert(\"custom button!\")"
                },
                "icon": "icon-sxc-code", 
                "title": "my custom code"
            },{
                "command": {
                    "action": "custom", 
                    "customCode": "someCustomAction(settings, event, sxc);"
                }, 
                "icon": "icon-sxc-code", 
                "title": "my custom code"
            },
            "layout", 
            "more"
        ]}, {
            "buttons": "layout,more"
        }
    ], "debug": true}'></ul>
</div>

<script>
    function someCustomAction(settings, event, sxc) {
        console.log("found these settings: ", settings); 
        console.log("for this click event: ", event); 
        console.log("in the context of this sxc: ", sxc);
        alert("check js console output");
    }
</script>
```

The above example also provides a custom icon, a title and a second button which also knows about the **event** (the click), the **settings** (like the entityId) and the **sxc** (the controller).

## How it works
Internally, the **command** custom is meant to simply execute the code which is in the attribute `customCode`. That's all it does. 

## Notes and Clarifications

### JSON Encode if using data-toolbar attribute
If you're adding this in the HTML, then everything must be correctly JSON encoded (which isn't exactly fun). So if you plan to do that, we recommend to put most of the JS in an external file and just put the call to it in the button itself. 

### More Specs On Click
The second example shows 3 additional variables which are available inside the click event. They are

* settings - these are the parameters passed in, like entityId
* event - this is the JS event like click
* sxc - this is the current sxc-controller - you can also access sxc.manage if you need it


## Read also

* [commands](xref:Specs.Js.Commands) 

## Demo App and further links
You should find some code examples in this demo App

* [JS Manage / Toolbar API Tutorial App](xref:App.TutorialJsToolbars)

## History
1. Introduced in 2sxc v08.06
