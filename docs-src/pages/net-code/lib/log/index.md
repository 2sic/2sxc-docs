---
uid: NetCode.Lib.Log.Index
---
# Logging in 2sxc / EAV

This should give you some minimal guidance into logging what your code does.

## The General Concept

1. Most objects have a **Log** where the add notes what they are doing
1. When objects create child-objects they link their logs so that we have a call hierarchy
1. Most calls in the objects will declare that they opened a function, log that, and log the result or a comment

With this we can easily see what the code did in the [Insights](xref:NetCode.Debug.Insights.Index).

## How to Use in Your Code

We strongly suggest that you use the same concepts in your code. You'll have to look at the 2sxc/EAV source in Github to discover more.

## Use on Object

### Object Creation

All objects which have a log, have a `Log` property which you can use to add notes.
This is the most common way to log.
Normally they will inherit from:

1. `ToSic.Lib.Services.ServiceBase`  
    This is for services which have a few dependencies.
1. `ToSic.Lib.Services.ServiceBase<Dependencies>`  
    This is for services which have a lot of dependencies.
    In this case you'll have to pass the dependencies to the base class.
    Dependencies usually inherit from `ToSic.Lib.Services.ServiceDependencies`.
1. `ToSic.Lib.Services.HelperBase`
    This is for helpers which are not services and will usually be created in code (not from DI).

You can also just create normal objects and implement `ToSic.Lib.Logging.IHasLog`.

Note that if you're inheriting from `ServiceBase<Dependencies>` then the dependencies class should
inherit from `ToSic.Lib.Services.DependenciesBase`.

### Log Linking

For optimal log structures, they should be linked together.
This helps to show the call hierarchy in the Insights.

This is fully automated, if you adhere to the conventions.
It works as follows:

1. Any object inheriting from `ServiceBase`
    1. should call `ConnectServices` in the constructor.
      TODO: EXAMPLE
1. Any object inheriting from `ServiceBase<Dependencies>`
    1. should pass the dependencies into the base constructor.
    1. The dependencies are then available on a `Deps` property.
    1. For this to work, the `Dependencies` should inherit from `ServiceDependencies` and in the constructor call `ConnectServices`.

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
1. Moved to `ToSic.Lib.Logging` in v15.0
