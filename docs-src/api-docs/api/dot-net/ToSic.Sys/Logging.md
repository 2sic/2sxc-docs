---
uid: ToSic.Sys.Logging
---

The EAV system has a powerful internal logging system. It's the backbone to Insights.

This is where it resides - usually you don't want to know about it ;).

> [!TIP]
> This is very internal, and can change at any time.
> In future, we will make it more aligned with the .NET logging system, but for now it's a custom implementation which is very powerful and flexible.

> [!WARNING]
> This is the internal logging system, which is **not the same** as the `Log` object on custom Razor / WebApi code.
> The custom code logging is a wrapper around this, but it has a different API and is not as powerful as this internal logging system.

This should give you some minimal guidance into logging what your code does.

## The General Concept

1. Most objects have a **Log** where they add notes about what they are doing - it's a [](xref:ToSic.Sys.Logging.ILog)
1. When objects create child-objects they link their logs so that we have a call hierarchy
1. Most calls in the objects will declare that they opened a function, log that, and log the result or a comment

With this we can easily see what the code did in the [Insights](xref:NetCode.Debug.Insights.Index).

> [!TIP]
> The real power comes from chaining these - because each logger can know what parent-logger it reports to.  
> This allows us to reproduce the chain of events in the original code, because you can track where  
> loggers were made, and how they relate.
>
> The really amazing bit is that the logger will also pick up the
> class names, code-file names and line of code where it was logged 😎.

* Most objects which use the Log, implement the [`ToSic.Sys.Logging.IHasLog`](xref:ToSic.Sys.Logging.IHasLog)
  which automates things when initializing - like the chaining of the Loggers.

## How to Use in Your Code

If you create code to extend 2sxc, you may want to use the logger as well.
We strongly suggest that you use the same concepts in your code.
You'll have to look at the 2sxc/EAV source in Github to discover more.

## Log Linking

For optimal log structures, they should be linked together.
This helps to show the call hierarchy in the Insights.

This is fully automated, if you adhere to the conventions.
Best use the `ServiceBase` in the [`ToSic.Sys.Services`](xref:ToSic.Sys.Services) namespace, which will take care of this for you.
It works as follows:

1. Any object inheriting from `ServiceBase`
    1. should call `base(logName, connect: [service1, service2, service3])` from the constructor.
1. Any object inheriting from `ServiceBase<Dependencies>`
    1. should pass the dependencies into the base constructor.
    1. The dependencies are then available on a `Services` property.
    1. For this to work, the `Dependencies` should inherit from
        [`ToSic.Sys.Services.DependenciesBase`](xref:ToSic.Sys.Services.DependenciesBase)
        or [`ToSic.Sys.Services.DependenciesRecord`](xref:ToSic.Sys.Services.DependenciesRecord).

## Logging

### Basic Messages

You can log messages with the following methods (they are kept very short to keep the code compact):

1. `Log.A` - add a message
1. `Log.W` - add a warning
1. `Log.E` - add an error

All of these methods have a first `string` parameter containing the message to add.

They also all have an optional parameter called `timer`.
If this is set to true using `timer: true` then the log will also contain the time it took to execute the method.

### Exceptions

You can log exceptions with the following methods:

1. `Log.Ex` - add an exception

### Log Properties

Properties use getters and setters.
To log these, you must consider a few aspects:

* do you want to log every single get/set? Or just the first one?
* do you want to log both get/set or just one of them?

To do this, you have 3 tools at your disposal:

* `Getter(() => result)` - this will log the result of the getter
* `Setter(() => result)` - this will log the result of the setter
* Create a `GetOnce<T>` helper and on the get include the `Log` - this will only log the initial creation / get of the result


### Log Methods, Functions, Properties


TODO:

---

## History

1. [Introduced in 2sxc 9.6](https://2sxc.org/en/blog/post/releasing-2sxc-9-6-with-extensive-logging)
1. Added [2sxc Insights](xref:NetCode.Debug.Index) (server-side) v9.31
1. [Major enhancements](https://2sxc.org/en/blog/post/awesome-insights-in-10-22) in v10.22
1. Moved to `ToSic.Sys.Logging` in v15.0
