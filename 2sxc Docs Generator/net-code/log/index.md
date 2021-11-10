---
uid: NetCode.Logging.Index
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

## History

1. [Introduced in 2sxc 9.6](https://2sxc.org/en/blog/post/releasing-2sxc-9-6-with-extensive-logging)
1. Added [2sxc Insights](xref:NetCode.Debug.Index) (server-side) v9.31
1. [Major enhancements](https://2sxc.org/en/blog/post/awesome-insights-in-10-22) in v10.22
