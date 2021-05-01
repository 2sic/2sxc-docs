---
uid: JsCode.TurnOn.WIPNotSureYetIfThisIsUseful
---

# turnOn JavaScript API

A core problem with all async JavaScript is how to ensure that all the parts are load, so that the code my be started. 

Common things which may be needed before the code starts:

1. Some JS Libraries
1. The main JS code
1. Additional JS parts
1. CSS
1. DOM nodes which the JS should work on

In addition to this a dynamic page which reloads parts of it multiple times should ensure that the JS isn't loaded again and again, as that can cause issues like

1. The same code running in parallel - causing all sorts of damage
1. Memory leaks where the same library and complex object states are loaded many times

Our goal is to simplify this, so that your solution can simply state what it needs, and then run once all that has been provided. 

1. a dom node with a specific id like `#module-57`
1. an object on the window like `window.someLibrary`
1. a js file which should be loaded if it's not loaded yet like `/js/jquery.min.js`
1. a css file like `/css/mycss.js`




Future features

1. also await certain DOM events; ATM you can do this easily after turnOn has run it's magic
1. Unloading rules