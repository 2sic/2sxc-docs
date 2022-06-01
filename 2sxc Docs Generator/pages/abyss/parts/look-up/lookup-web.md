---
uid: Abyss.Parts.LookUp.Web
---

[!include[](~/assets/features/look-up-system.md)]

# Web / Server / HTTP LookUps

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .lookup-sources { visibility: visible; } </style>

There are three Sources for web parameters which can be used in LookUps:

1. `QueryString` - for url parameters
1. `Form` - for fields in the http-post
1. `Server` - for HTTP Server_... variables

## `QueryString` Tokens


<h2>Extended Standard Tokens</h2>
<p>The following tokens are still very "normal" but not part of the common Dnn tokens. They work in 2sxc - but not in many Dnn-Tools</p>

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
            <td>&#91;QueryString:&lt;Url-Param-Name&gt;]</td>
            <td>String</td>
            <td>-</td>
        </tr>
        <tr>
            <td>&#91;QueryString:TabId]</td>
            <td>String - this demo shows the TabId <br>which is in the QueryString because of the internal URL-Rewrite. </td>
            <td>730</td>
        </tr>
        <tr>
            <td>&#91;QueryString:Category]</td>
            <td>String - click <a href="?Category=Design">here</a> to see effect</td>
            <td></td>
        </tr>
</table>


## `Form` Tokens

Form Tokens only exist if the request was a Post.


<table summary="" border="0" cellpadding="2" cellspacing="3" width="100%">
    <thead>
        <tr>
            <td>Token</td>
            <td>Description</td>
            <td>Result</td>
        </tr>
    </thead>
        <tr>
            <td>&#91;Form:&lt;Form-Param-Name&gt;]</td>
            <td>Form post values. Usually not needed, but if you do need it, it's here.</td>
            <td>-</td>
        </tr>
</table>


## History

1. Params added in 2sxc ca. v2
1. Enhanced with Settings/Resources ca. v4

