---
uid: JsCode.EditForm.Formulas.Faq
---

<img src="~/assets/features/formulas.svg" class="feature">

# Formulas Frequently Asked Questions

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>
  .context-box-summary .browser-edit-ui { visibility: visible; }
</style>

## Where are Formulas Stored?

See [](xref:JsCode.EditForm.Formulas.Storage).

## When do Formulas Run?

As of now, they run whenever any data changes in the form.
This can mean that they run multiple times because if formulas depend on each other, there may be a few cycles till all values stabilize.

## Can Formulas detect Lifecycle Information?

As of now the formulas always run on every change detection. The following information is currently _not_ yet given to the formula:

* What phase of the lifecycle the formula is on (init, pre-render, etc.)
* Events which happened before
* Run-count

If you really need this, your formula can track this using the `context.cache` object.

## Can Formulas be Disabled?

Stored Formulas can be disabled with a toggle in the field settings.

In v2 (🆕 2sxc 16) this is possible by returning a object with `{stop: true}`.
This will stop the formula from running again.

In v1 you cannot disable Formulas at runtime.
Even Formulas whose result is discarded are still run on every cycle - this is by design.
If you need to stop a formula in v1, do this by placing a value on `context.cache` (see [](xref:Tut.Formulas)).

## Can Formulas run on Specific Events?

This is not yet possible.

