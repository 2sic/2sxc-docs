---
uid: Abyss.Parts.LookUp.User
---

[!include[](~/assets/features/look-up-system.md)]

# User Information LookUps

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .lookup-sources { visibility: visible; } </style>

Dnn has various LookUps built in, which won't be available on Oqtane:

1. `User` - current user information
1. `Membership` - ASP.net user information
1. `Profile` - user profile (values not in the normal User object)


## `User` Tokens

<table summary="" border="0" cellpadding="2" cellspacing="3" width="100%">
    <thead>
        <tr>
            <td>Token</td>
            <td>Description</td>
            <td>Result</td>
        </tr>
    </thead>
    <tr>
        <td>&#91;User:DisplayName]</td>
        <td>User’s Display Name</td>
        <td></td>
    </tr>
    <tr>
        <td>&#91;User:Email]</td>
        <td>User’s Email Address</td>
        <td></td>
    </tr>
    <tr>
        <td>&#91;User:FirstName]</td>
        <td>User’s First Name</td>
        <td></td>
    </tr>
    <tr>
        <td>&#91;User:FullName]</td>
        <td>(deprecated)</td>
        <td></td>
    </tr>
    <tr>
        <td>&#91;User:LastName]</td>
        <td>User’s Last Name</td>
        <td></td>
    </tr>
    <tr>
        <td>&#91;User:Username]</td>
        <td>User’s Login User Name</td>
        <td></td>
    </tr>
</table>

## `Membership` Tokens

<table summary="" border="0" cellpadding="2" cellspacing="3" width="100%">
    <thead>
        <tr>
            <td>Token</td>
            <td>Description</td>
            <td>Result</td>
        </tr>
    </thead>
    <tr>
        <td>&#91;Membership:Approved]</td>
        <td>Is User Approved?</td>
        <td></td>
    </tr>
    <tr>
        <td>&#91;Membership:CreatedOnDate] </td>
        <td>User Signup Date</td>
        <td> </td>
    </tr>
    <tr>
        <td>&#91;Membership:IsOnline]</td>
        <td>Is User Currently Online?</td>
        <td></td>
    </tr>
</table>

## User `Profile` Tokens

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


## Other Dnn Token Sources

Note that according to the Dnn-Source-Code there are a total of 11 sources (status 2015-05-05). The ones not mentioned here but are relevant to the User are: 

* Culture


## History

1. Params added in 2sxc ca. v2


