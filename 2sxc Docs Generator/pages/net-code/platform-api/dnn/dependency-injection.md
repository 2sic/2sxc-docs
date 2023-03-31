---
uid: NetCode.PlatformApi.Dnn.DependencyInjection
---

# Dependency Injection in Dnn Skins and Modules

Since Dnn 9.4, Dependency Injection is built in.
It's still fairly basic, so there are some hoops to jump through, but for now it's the recommended way to work with this.

> [!TIP]
> Andrew Hoefling wrote a [comprehensive guide how to use Dependency Injection in Dnn](https://www.andrewhoefling.com/Blog/Post/dnn-dependency-injection).

> [!IMPORTANT]
> You need Dnn 9.4+ for these examples to work.
>
> 2sxc 13 will only support this form of providing services outside of 2sxc, so if you need this, make sure you upgrade.

## What works, and what doesn't

1. All 2sxc services can be accessed via DI from Dnn code that support DI - such as [themes and modules](xref:NetCode.PlatformApi.Dnn.ThemesAndModules)
1. 2sxc has a full API to provide rendered Blocks, Services and Data to Dnn code
1. Some - but only a few - of Dnn Services are available on DI

## How Can I Get Dnn Objects using Dependency Injection?

As of Dnn 9.10 the answer is mostly no 😶. Dnn is simply not there yet. Work-in-progress.

The documentation is almost non-existant, so if you want to try using Dnn objects, you'll need to dig through Dnn code to get this to fly.



[!include["history"](../../services/_history.md)]
