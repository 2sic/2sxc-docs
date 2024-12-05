---
uid: Abyss.Parts.LookUp.Dnn
---

[!include[](~/assets/features/look-up-system.md)]

# Dnn Specific LookUps

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .lookup-sources { visibility: visible; } </style>

Dnn has various LookUps built in, which won't be available on Oqtane:

1. `Portal` - Everything about the current Portal
1. `Tab` - information about the current Page
1. `Module` - information about the current Module

## `Portal` Tokens

_Note: Dnn ☢️ only_

The following tokens are common Dnn/DotNetNuke tokens which should work everywhere tokens are in use. Some very common extensions are in the other view Extended Tokens.

<table summary="" border="0" cellpadding="2" cellspacing="3" width="100%">
    <thead>
        <tr>
            <td>Token</td>
            <td>Description</td>
            <td>Result</td>
        </tr>
    </thead>
    <tr>
        <td>&#91;Portal:Currency]</td>
        <td>Currency String</td>
        <td>USD</td>
    </tr>
    <tr>
        <td>&#91;Portal:Description]</td>
        <td>Portal Description</td>
        <td></td>
    </tr>
    <tr>
        <td>&#91;Portal:Email]</td>
        <td>Portal Admin Email</td>
        <td>the.admin@2sxc.org</td>
    </tr>
    <tr>
        <td>&#91;Portal:FooterText]</td>
        <td>Portal Copyright Text</td>
        <td>Copyright 2019 by DotNetNuke Corporation</td>
    </tr>
    <tr>
        <td>&#91;Portal:HomeDirectory]</td>
        <td>Portal Path (relative) of Home Directory</td>
        <td>/App-Demos/</td>
    </tr>
    <tr>
        <td>&#91;Portal:LogoFile]</td>
        <td>Portal Path to Logo File</td>
        <td></td>
    </tr>
    <tr>
        <td>&#91;Portal:PortalName]</td>
        <td>Portal Name</td>
        <td>Dnn / DotNetNuke App Demos</td>
    </tr>
    <tr>
        <td>&#91;Portal:PortalAlias]</td>
        <td>Portal URL</td>
        <td></td>
    </tr>
    <tr>
        <td>&#91;Portal:TimeZoneOffset]</td>
        <td>Difference in Minutes between Portal Default Time and UTC</td>
        <td></td>
    </tr>
</table>


<table summary="" border="0" cellpadding="2" cellspacing="3" width="100%">
    <thead>
        <tr>
            <td>Token</td>
            <td>Description</td>
            <td>Result</td>
        </tr>
    </thead>
    <tr>
        <td>&#91;Profile:&lt;property&gt;]</td>
        <td>Use any default or custom Profile Property as listed <br>in Profile Property Definition section of Manage User Accounts. <br>Use non-localized Property Name only.</td>
        <td>-</td>
    </tr>
</table>

## `Tab` Tokens

_Note: Dnn ☢️ only_

<table summary="" border="0" cellpadding="2" cellspacing="3" width="100%">
    <thead>
        <tr>
            <td>Token</td>
            <td>Description</td>
            <td>Result</td>
        </tr>
    </thead>
    <tr>
        <td>&#91;Tab:Description]</td>
        <td>Page Description Text for Search Engine</td>
        <td></td>
    </tr>
    <tr>
        <td>&#91;Tab:EndDate]</td>
        <td>Page Display Until Date</td>
        <td>*******</td>
    </tr>
    <tr>
        <td>&#91;Tab:FullUrl]</td>
        <td>Page Full URL</td>
        <td>https://2sxc.org/dnn-app-demos/en/Apps/Tutorial-Tokens</td>
    </tr>
    <tr>
        <td>&#91;Tab:IconFile]</td>
        <td>Page Relative Path to Icon File</td>
        <td></td>
    </tr>
    <tr>
        <td>&#91;Tab:KeyWords]</td>
        <td>Page Keywords for Search Engine</td>
        <td></td>
    </tr>
    <tr>
        <td>&#91;Tab:PageHeadText]</td>
        <td>Page Header Text</td>
        <td>*******</td>
    </tr>
    <tr>
        <td>&#91;Tab:StartDate]</td>
        <td>Page Display from Date</td>
        <td>*******</td>
    </tr>
    <tr>
        <td>&#91;Tab:TabName]</td>
        <td>Page Name</td>
        <td>Tutorial - Tokens</td>
    </tr>
    <tr>
        <td>&#91;Tab:TabPath]</td>
        <td>Page Relative Path</td>
        <td>//Apps//Tutorial-Tokens</td>
    </tr>
    <tr>
        <td>&#91;Tab:Title]</td>
        <td>Page Title (Window Title)</td>
        <td></td>
    </tr>
    <tr>
        <td>&#91;Tab:URL]</td>
        <td>Page URL</td>
        <td></td>
    </tr>
</table>

## `Module` Tokens

_Note: Dnn ☢️ only_

<table summary="" border="0" cellpadding="2" cellspacing="3" width="100%">
    <thead>
        <tr>
            <td>Token</td>
            <td>Description</td>
            <td>Result</td>
        </tr>
    </thead>
    <tr>
        <td>&#91;Module:Description]</td>
        <td>Module Definition Description</td>
        <td>2sxc App is an extension that allows to install and use a 2sxc app.</td>
    </tr>
    <tr>
        <td>&#91;Module:EndDate]</td>
        <td>Module Display Until Date</td>
        <td>*******</td>
    </tr>
    <tr>
        <td>&#91;Module:Footer]</td>
        <td>Module Footer Text</td>
        <td></td>
    </tr>
    <tr>
        <td>&#91;Module:FriendlyName]</td>
        <td>Module Definition Name</td>
        <td> App</td>
    </tr>
    <tr>
        <td>&#91;Module:Header]</td>
        <td>Module Header Text</td>
        <td></td>
    </tr>
    <tr>
        <td>&#91;Module:HelpURL]</td>
        <td>Module Help URL</td>
        <td></td>
    </tr>
    <tr>
        <td>&#91;Module:IconFile]</td>
        <td>Module Path to Icon File</td>
        <td></td>
    </tr>
    <tr>
        <td>&#91;Module:ModuleTitle]</td>
        <td>Module Title</td>
        <td>App</td>
    </tr>
    <tr>
        <td>&#91;Module:PaneName]</td>
        <td>Module Name of Pane (where the module resides)</td>
        <td>ContentPane</td>
    </tr>
    <tr>
        <td>&#91;Module:StartDate]</td>
        <td>Module Display from Date</td>
        <td>*******</td>
    </tr>
</table>



## Other Dnn Token Sources

Note that according to the Dnn source code there are a total of 11 sources per 2015. The ones not mentioned here are: 

* Culture
* Host


## History

1. Params added in 2sxc ca. v2


