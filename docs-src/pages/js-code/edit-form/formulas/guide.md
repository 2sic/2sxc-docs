---
uid: JsCode.EditForm.Formulas.Guide
---

<img src="~/assets/features/formulas.svg" class="feature">

# Formulas in the Edit UI Guide

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>
  .context-box-summary .browser-edit-ui { visibility: visible; }
</style>

This guide will help you get started with Formulas.

## Start with an Overview

Before you even start it's best to have an overview.
The 2sxc 12 Formulas Release Video is a good place to start.

<iframe title="YouTube video player" src="https://www.youtube.com/embed/2frf4RRNy5c" width="100%" height="400" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="allowfullscreen"></iframe>

## Step 1: Discover Live Examples

🔬 First you must look at the live samples in [](xref:Tut.Formulas)

If you did this, you should now have seen

1. What formulas tend to look like

1. All kinds of things they can affect

1. That they run in the browser, and keep updating with every interaction


## Step 2: Get to Know the Formula Designer

👉 To develop Formulas use the [Interactive Formula Designer](xref:JsCode.EditForm.Formulas.Designer.Index)

## Step 3: Try it Yourself

👉 Check out the [JS Formula Documentation](xref:JsCode.EditForm.Formulas.Index) - also the [data](xref:JsCode.EditForm.Formulas.Data) and [context](xref:JsCode.EditForm.Formulas.Context) objects

👉 Also read about the [Formula Targets and Return Values](xref:JsCode.EditForm.Formulas.TargetsReturn)



### Tips and Tricks

1. While developing, always keep the F12-Console open to see what's happening

1. You can always add a `console.log(data, context);` or similar in your code to see in real time what's being processed.

1. You can also add a line `debugger;` and the browser will stop at this line so you can inspect the variables and watch your code.

1. Do use Formulas as [pure functions](https://en.wikipedia.org/wiki/Pure_function).


## Step 4: Go Deeper

* You should also check [Ephemeral / Temporary Fields](xref:Basics.Data.Fields.Ephemeral) as they are very useful together with Formulas.

* Know that you can also use webApi calls on the `context.sxc.webApi` to get data from the backend (see tutorials)

* Also read about the [empty-end Field to close a Field-Group](xref:Basics.Data.Fields.Empty-End) as it's useful when grouping fields.

---

## History

* Introduced in 2sxc 12.01
* Extended with `Required` ca. v13.00
* Extended with `Notes` ca. v13.10
* Improve formula designer to allow creating new formulas directly in the designer ca. v14.00
* Added formula designer API help ca. v14.00
* Massively improved v2 Formulas in 2sxc 15.07 (officially released in 16.0)

Shortlink to here: <https://go.2sxc.org/formulas>
