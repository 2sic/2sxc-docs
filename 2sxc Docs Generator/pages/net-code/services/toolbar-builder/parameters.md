---
uid: ToSic.Sxc.Services.ToolbarBuilder.Parameters
---

<img src="~/assets/features/toolbar.svg" class="feature">

# Toolbar Builder Guide – Parameters

The **Parameters** are used in the command. 

Parameters can be specified globally for the entire toolbar, or just for a specific button. 

TODO:

It is given to the commands using the `parameters` parameter like this:

```
TODO
```

There are two ways you can specify `ui`. 
Either as a string - like this:

```c#
ui: "color=red"
```

Or as an object (since v14.04) - like this: 

```c#
ui: new { color = "red" }
```

TODO: 
