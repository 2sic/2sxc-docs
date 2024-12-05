---
uid: Abyss.Parts.LookUp.App
---

[!include[](~/assets/features/look-up-system.md)]

# `App` LookUps

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .lookup-sources { visibility: visible; } </style>

The App has three Sources which can be used in LookUps

1. `App` - for app properties
1. `App:Settings` - for settings of the App
1. `App:Resources` - for i18n resources in the App

## `App` Tokens

The following tokens are related to App-Information and Resources. Dnn/DotNetNuke does have these, you can only access them when in a 2sxc-App. 

<table summary="" border="0" cellpadding="2" cellspacing="3" width="100%">
    <thead>
        <tr>
            <td>Token</td>
            <td>Description</td>
            <td>Result</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>&#91;App:Path]</td>
            <td></td>
            <td>/App-Demos/2sxc/Tutorial Tokens</td>
		</tr>
        <tr>
            <td>&#91;App:PhysicalPath]</td>
            <td></td>
            <td>\\nasw2\P\2sxc 2019b\Web\App-Demos\2sxc\Tutorial Tokens</td>
		</tr>
<!-- Internal note: these properties are not surfaced in the tokens ATM
    {"DisplayName", String.IsNullOrEmpty(appName) ? eavAppName : appName },
    {"Folder", String.IsNullOrEmpty(appName) ? eavAppName : RemoveIllegalCharsFromPath(appName) },
    {"AllowTokenTemplates", "False"},
    {"AllowRazorTemplates", "False"},
    {"Version", "00.00.01"},
    {"OriginalId", ""}
-->
</table>


## `App:Settings` Tokens


<table summary="" border="0" cellpadding="2" cellspacing="3" width="100%">
    <thead>
        <tr>
            <td>Token</td>
            <td>Description</td>
            <td>Result</td>
        </tr>
    </thead>
        <tr>
            <td>&#91;App:Settings:&lt;Property&gt;]</td>
            <td>App Settings which the App-designer defined.</td>
            <td>-</td>
        </tr>
        <tr>
            <td>&#91;App:Settings:UseLightbox]</td>
            <td>All the information (multi-lingual)</td>
            <td>true</td>
        </tr>        
</table>

## `App:Resources` Tokens

<table summary="" border="0" cellpadding="2" cellspacing="3" width="100%">
    <thead>
        <tr>
            <td>Token</td>
            <td>Description</td>
            <td>Result</td>
        </tr>
    </thead>
        <tr>
            <td>&#91;App:Resources:&lt;Property&gt;]</td>
            <td>All the information (multi-lingual)</td>
            <td>-</td>
        </tr>
        <tr>
            <td>&#91;App:Resources:GreetingText]</td>
            <td>All the information (multi-lingual)</td>
            <td>Hello there Token-Learner</td>
        </tr>
	</tbody>
</table>


## History

1. Params added in 2sxc ca. v2
1. Enhanced with Settings/Resources ca. v4

