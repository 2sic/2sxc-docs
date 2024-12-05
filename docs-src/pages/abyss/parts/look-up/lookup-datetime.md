---
uid: Abyss.Parts.LookUp.DateTime
---

[!include[](~/assets/features/look-up-system.md)]

# DateTime LookUps

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .lookup-sources { visibility: visible; } </style>

There is one `DateTime` Source which can be used in LookUps:

## `DateTime` Tokens


<table summary="" border="0" cellpadding="2" cellspacing="3" width="100%">
    <thead>
        <tr>
            <td>Token</td>
            <td>Description</td>
            <td>Result</td>
        </tr>
    </thead>
    <tr>
        <td>&#91;DateTime:Now]</td>
        <td>Current Date and Time</td>
        <td>12/2/2019 3:05 AM</td>
    </tr>
    <tr>
        <td>&#91;DateTime:System]</td>
        <td>Current Date and Time of the System</td>
        <td>12/2/2019 3:05 AM</td>
    </tr>
    <tr>
        <td>&#91;DateTime:UTC]</td>
        <td>Current Date and Time on UTC</td>
        <td>12/2/2019 3:05 AM</td>
    </tr>
    <tr>
        <td>&#91;Ticks:Now]</td>
        <td>CPU Tick Count for Current Second</td>
        <td>637108851369920459</td>
    </tr>
    <tr>
        <td>&#91;Ticks:Today]</td>
        <td>CPU Tick Count since Midnight</td>
        <td>637108416000000000</td>
    </tr>
    <tr>
        <td>&#91;Ticks:TicksPerDay] </td>
        <td>CPU Ticks per Day (for calculations)</td>
        <td>864000000000 </td>
    </tr>
</table>

For Date/Time and numeric values, you can also append a string defined by the .NET framework, for example: `[DateTime:Now|]` current Date/Time formatted according to , e.g. `[DateTime:Now|f]` displays current date in short format (does not apply to Calculated Column expressions) or `[DateTime:Now|dd.MM.yyyy]` in German date format. 

Text items may be formatted using {0}, e.g. [User:Displayname|Hello {0}]. You can also add alternative text that gets returned if the requested value is Null or empty: [Token:Property|Format|Alternative] e.g. [User:Displayname|Welcome Back,{0}|Hello Guest]




## History

1. Params added in 2sxc ca. v2
1. Enhanced with Settings/Resources ca. v4

