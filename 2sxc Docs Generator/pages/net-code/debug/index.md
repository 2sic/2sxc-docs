---
uid: NetCode.Debug.Index
---

<img src="~/assets/features/2sxc-insights.svg" width="100%">

# 2sxc Insights for Debugging Server-Code

This should give you some minimal guidance into debugging 2sxc. You have the following tools at your disposal:

1. **2sxc Insights** is a real-time log of what's happening on each request. You can access it through the admin-toolbar (rotate the more-button till you see a speedometer and click on it). This is the most powerful and in-depth system which also gives you insights when no errors are thrown, but you expect different results.
1. **Dnn Event Log** are a standard part of Dnn and give you error details when things break.

Note that our documentation is not complete, but you should read the [Blog Post about 2sxc Insights](https://2sxc.org/en/blog/post/using-2sxc-insights)

👉 Here's [more about 2sxc Insights on the Server](xref:NetCode.Debug.Insights.Index)

## This may Also be Helpfull

### Debug what's happening in the Network

F12 is one of your most important friends when debugging what's happening. Watch the chrome-console for network trafic and JS errors.

### Debug Client Side Code

**2sxc Insights** has a client-side implementation as well. Open the F12 console and you'll see some messages that you can use `$2sxc.insights()` to see what's happening in the browser. Just follow the instructions shown as you call those functions in the console.

## History

1. Introduced 2sxc Insights (server-side) v9.31
1. [Major enhancements](https://2sxc.org/en/blog/post/awesome-insights-in-10-22) in v10.22

Shortlink: <https://go.2sxc.org/insights>
