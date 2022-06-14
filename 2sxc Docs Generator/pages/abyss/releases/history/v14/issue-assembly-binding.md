---
uid: Abyss.Releases.History.V14.IssueAssemblyBinding
---

# Assembly Binding Issue on Installs from 2sxc 13.04 to 14.02

TODO: @STV

2sxc 13.04 up until v14.02 had a bug where the assembly bindings in web.config wasn't done correctly. 
The result is, that many bindings were added repeatedly.

The problems:

1. the `web.config` grows to be very large
1. future upgrades of 2sxc which need to modify the bindings could end up modifying a binding, but other unmodified bindings could take precedence
1. third party modules which also modify assembly bindings could modify the wrong bindings

The following bindings were added repeatedly:

```xml
<todo>@STV</todo>
```

Unfortunately we cannot auto-fix this, because there are too many different scenarios possible, 
depending on the amount of times you upgraded 2sxc, what DNN version you're using and what 3rd party modules you have. 

So we suggest you clean it up manually. 

## Am I affected?

You are affected, if you see multiple copies of any of these XML fragments in your web.config:

```
todo
```

## How to Clean

Do the following...
...

...
@STV

