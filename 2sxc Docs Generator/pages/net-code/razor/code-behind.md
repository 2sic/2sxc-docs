---
uid: NetCode.Razor.CodeBehind
---

# Razor Templates - Code-Behind

> [!WARNING]
> The code-behind feature has been deprecated but will continue to work for older code.
> So it will only work if you inherit from `ToSic.Sxc.Dnn.RazorComponent`.
> 
> If you use any of the newer v12 or v14 base classes, 
> you should either use [shared C#](https://2sxc.org/dnn-tutorials/en/razor/reuse310/page)
> or partial views using `@Html.Partial("_something.cshtml")`.


2sxc 11 introduces a new way to split out most of the C# code from the main template Razor file. We call this code-behind. Best watch the video to get the idea. 

<iframe width="100%" height="400" src="https://www.youtube.com/embed/wIa23gy26js" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

You can also see a [live demo in the Dnn Tutorials](https://2sxc.org/dnn-tutorials/en/razor/reuse410/page). 


[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]


## How Code Behind Works

Just create another file with the identical name as your main Razor file, but with `.code.cshtml` as the extension. So you'll then have something like:

* `_My Message.cshtml` (the Razor file)  
    Inherits `ToSic.Sxc.Dnn.RazorComponent`
* `_My Message.code.cshtml` (the new code )  
    The _code_ file looks just like a normal razor file.  
    Must inherit from `ToSic.Sxc.Dnn.RazorComponentCode`. 

Here's an example of such a `_My Message.code.cshtml`: 


```razor
@inherits ToSic.Sxc.Dnn.RazorComponentCode

@functions {
  public string Hello() {
    return "Hello from inner code";
  }
}

@helper ShowDiv(string message) {
  <div>@message</div>
}

@helper AppName() {
  <div>App Name is: @App.Name</div>
}
```

This is automatically compiled for you and provided to the `_My Message.cshtml` on the object `Code` so you can write this code: 


```razor
@inherits ToSic.Sxc.Dnn.RazorComponent

<h1>Demo Code Use</h1>

<div @Edit.TagToolbar(Content)>
    Something in it: @Code.Hello()
</div>

@Code.ShowDiv("test helper!")
```

That's all there is to it 😉

> [!TIP]
> _Why would you do this?_  
> The main reason is to keep template-html separate from most of the code. 
> This is common when designers like to modify the html but don't like all that programming stuff. 

## Events on Code Behind Files

The code-behind also has same methods/events which are automatically called. These methods can be overriden

1. `CustomizeData()`  
  This has the same effect as overriding CustomizeData in the template file
1. `CustomizeSearch(Dictionary<string, List<ISearchItem>> searchInfos, IContainer moduleInfo,
            DateTime beginDate)`  
              This has the same effect as overriding CustomizeSearch in the template file


> [!TIP]
> _Why would you use this?_  
> These methods could always be created in the main Razor file, but it looks daunting to have so much code there.
> 
> A typical `CustomizeSearch` is very technical and feels scary to people who just want to change the look and feel. 



## Important: Passing Around Anonymous Objects

One of the advanced things you may want to do is have helper functions looking up multiple things, and returning a complex object like this example in the code-behind:

```razor
@inherits ToSic.Sxc.Dnn.RazorComponentCode

@functions {
  public dynamic Hello() {
    return new { Title = "title", Message = "msg"};
  }
}
```

Which is used like this

```razor
@inherits ToSic.Sxc.Dnn.RazorComponent

<h1>Demo Code Use</h1>

<div @Edit.TagToolbar(Content)>
  @{
    var hello = Code.Hello();
  }
    Something in it: @hello.Title <br>
</div>
```

This works and is no big deal, but there are known cases where this breaks, usually with a message like somehing not found on `object`. The reason is bugs in the .net caching of compiled code, specifically if methods exists in various places with the same name. You can resolve this in 3 ways

1. Restart iis (uncool)
1. Rename the method (ok, bun not sexy)
1. Return a typed object instead of untyped (recommended).  
    In the above example, change to this:

```razor
@inherits ToSic.Sxc.Dnn.RazorComponentCode

@functions {
  public class TitleAndMessage {
    public string Title;
    public string Message;
  }
  public dynamic Hello() {
    return new TitleAndMessage { Title = "title", Message = "msg"};
  }
}
```

---

## History

1. Code-Behind Introduced in 2sxc 11.0
1. Code-Behind deprecated in 2sxc 12 because it's not compatible with Oqtane