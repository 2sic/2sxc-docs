---
uid: Abyss.Releases.History.V20.BrcDnnQuickEditOnEmptyPage
---

# Fix Breaking Change QuickEdit on Empty Page in v20

**Keywords:** #BreakingChange #Dnn #QuickEdit

Some Dnn themes such as the **2Shine** or **Bootstrap Instant** have a built-in mechanism to show a "Quick Edit" button when the page is empty.
This is useful, because otherwise the necessary JS isn't loaded till the first app is added, which can be confusing for users.

Because of the folder change in Dnn (from `/DesktopModules/ToSIC_SexyContent/` to `/DesktopModules/ToSic.Sxc/`), this mechanism will fail,
until the path is corrected in the `2sxc-quickedit.ascx` control.

## How to Fix

Based on the example of [2shine BS5](https://github.com/2sic/dnn-theme-2shine-bs5/blob/main/controls/2sxc-quickedit.ascx),
you can fix this by changing the path in the `2sxc-quickedit.ascx

Original:

```html
<%@ Control language="C#" Inherits="System.Web.UI.UserControl" %>
<%--
	This control automatically injects the 2sxc Quickedit control, if 2sxc is
	installed. If it's not installed, the control will not do anything.
	Read more about the quickedit functionality here:'
	https://github.com/2sic/2sxc/wiki/Concept-Quick-Edit
--%>
<asp:Placeholder runat="server" id="QuickEditPlaceholder" />

<script runat="server">
    protected override void OnLoad(EventArgs e)
    {
        base.OnLoad(e);

        try {
            // Loads the 2sxc QuickEdit control, if it's available
            var path = "~/DesktopModules/ToSIC_SexyContent/DnnWebForms/Skins/QuickEdit.ascx";
            if (System.IO.File.Exists(Server.MapPath(path))) {
                var control = LoadControl(path);
                QuickEditPlaceholder.Controls.Add(control);
            }
        }
        catch (Exception) // Fail silently
        {}
    }
</script>
```

Just change this line:

```csharp
var path = "~/DesktopModules/ToSIC_SexyContent/DnnWebForms/Skins/QuickEdit.ascx";
```

to this:


```csharp
var path = "~/DesktopModules/ToSic.Sxc/DnnWebForms/Skins/QuickEdit.ascx";
```

---

## History

* original `thumbnailer.aspx` introduced with 2sxc 2 ca. 2012
* replaced with ImageResizer.net ca. 2sxc 5 in ca. 2014
* replaced with ImageFlow in ca. v12 with same URL schema ca. 2018
* replaced the `thumbnailer.aspx` in 2019-05 to redirect to new schema, but links still worked
* Removed thumbnailer.aspx in 2sxc v20 with the path change to `/DesktopModules/ToSic.Sxc/`

---

<!-- Shortlink to here: <https://go.2sxc.org/brc-20-thumbnailer> -->
