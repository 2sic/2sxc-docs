---
uid: NetCode.Conventions.Functional
---

# Convention: Functional API (Immutable)

There are many programming paradigms.
One that's become very important to us is **functional** programming.

This means that code (usually functions) will have inputs and outputs, but no side effects.

This also means that an object which must be modified will be copied into a new object, with the modifications applied.
The original object is never modified.
In most cases it will be discarded.

> [!IMPORTANT]
> This was not always our approach, so some of the code is still not functional.
> But you must assume that anything you find which is not functional, will be so in the future.

## Example

TODO: 

## Why Functional?

Functional programming has many advantages, but the most important one is that it's easier to test and debug.
It's also easier to understand, because you can see the inputs and outputs of a function, without having to look at the code.
In the end, the quality and robustness of our application is much better.

## Parts of 2sxc which are fully Functional


---

## History

* Introduced when integrating Oqtane in 2sxc 12
* final docs in v13.03

Coverage: ca. 100% of relevant objects implement this

Shortlink: https://r.2sxc.org/unknown-implementations