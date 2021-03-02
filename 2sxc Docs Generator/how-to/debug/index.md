---
uid: HowTo.Debug.Home
---
# Debugging 2sxc (WIP)

This should give you some minimal guidance into debugging 2sxc. 

## Debug Server Side Code

For this you have the following tools at your disposal:

1. **2sxc Insights** is a real-time log of what's happening on each request. You can access it through the admin-toolbar (rotate the more-button till you see a speedometer and click on it). This is the most powerful and in-depth system which also gives you insights when no errors are thrown, but you expect different results. 
1. **DNN Event Log** are a standard part of DNN and give you error details when things break. 

## Debug what's happening in the Network

F12 is one of your most important friends when debugging what's happening. Watch the chrome-console for network trafic and JS errors. 

## Debug Client Side Code

**2sxc Insights** has a client-side implementation as well. Open the F12 console and you'll see some messages that you can use `$2sxc.insights()` to see what's happening in the browser. Just follow the instructions shown as you call those functions in the console. 