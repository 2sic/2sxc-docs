---
uid: Api.Js.SxcJs.WorkflowStepCode
summary: Signature of your code which is used in workflows.
---

# Function Signature WorkflowStepCode

Signature of your code which is used in workflows.

Basically it's just a function receiving [](xref:Api.Js.SxcJs.WorkflowStepCodeArguments) 

```js
export type WorkflowCode = (args: WorkflowStepCodeArguments) => WorkflowStepCodeArguments;
```