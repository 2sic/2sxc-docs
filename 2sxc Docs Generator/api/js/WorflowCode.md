---
uid: Api.Js.InPage.WorkflowCode
summary: Signature of your code which is used in workflows.
---

# Function Signature WorkflowCode

Signature of your code which is used in workflows.

Basically it's just a function receiving [](xref:Api.Js.InPage.WorkflowArguments) 

```js
export type WorkflowCode = (args: WorkflowArguments) => WorkflowArguments;
```