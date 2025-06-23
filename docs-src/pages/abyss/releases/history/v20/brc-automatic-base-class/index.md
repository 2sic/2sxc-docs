---
uid: Abyss.Releases.History.V20.RazorStopsDefaultingToOld
---

# Fix Breaking Change Stop Razor from Default to `SexyContentWebPage` in v20

**Keywords:** #Deprecated

2sxc v20 cleans up some historic, deprecated functionality.
They were not used much, but if you have old code which used this, here's how to fix any code in production.

A long time ago, we automatically added a `web.config` file to the `2sxc` folder of every portal,
so that razor files `*.cshtml` would automatically use 2sxc features in their base class.

At that time, we didn't expect Razor and 2sxc to evolve so much, so we just used the `SexyContentWebPage` as the base class.
This was deprecated in v12, and replaced with the new Razor base classes which are much better.
The old classes kept working, to avoid breaking existing apps, but they were not recommended for new apps.

Unfortunately, we could not change the default, since all the code out there
did not specify an `@inherits` directive, so it would always use the old base class.

It's time to move on, so in v20 we stop automatically adding the `web.config` file, and instead require that you specify the base class in each Razor file.

> [!TIP]
> This change will only affect you, if you import an older App into a newer installation,
> which is missing the `web.config` file.

## Reason for Removal

There are two key risk of leaving very old APIs alive:

1. maintenance and testing for the developers of 2sxc - who work for free - goes up and up and up.
1. people tend to discover old code and reuse it, spreading bad code practices.

So it was time to clean up in this MoT release.

## Recommended fix: Upgrade to Newer functionality with @inherits

We highly recommend that you

1. specify the desired base class in each razor file
1. ideally move to newer base classes **recommended!**

If you want to just keep on using the old base classes you can add this line to the top of your Razor files:

```razor
@inherits ToSic.Sxc.Razor.SexyContentWebPage
```



## Quick Fix: Add old web.config manually

Create a file called `web.config` in an App folder under the `2sxc` folder of your portal, and add this content:

```xml
<?xml version="1.0"?>

<configuration>
  <configSections>
    <sectionGroup name="system.web.webPages.razor" type="System.Web.WebPages.Razor.Configuration.RazorWebSectionGroup, System.Web.WebPages.Razor">
      <section name="pages" type="System.Web.WebPages.Razor.Configuration.RazorPagesSection, System.Web.WebPages.Razor" requirePermission="false" />
    </sectionGroup>
  </configSections>

  <system.web.webPages.razor>
    <pages pageBaseType="ToSic.SexyContent.Razor.SexyContentWebPage">
    </pages>
  </system.web.webPages.razor>
</configuration>
```


---

## History

* Introduced for DNN ca. 2sxc 7
* Deprecated in 2sxc 12 ca. 2018
* Planned for full removal in 2sxc 15 ca. middle of 2022
* Finally removed in 2sxc 20 ca. 2025-06

---

Shortlink to here: <https://go.2sxc.org/brc-20-stop-auto-inherits>
