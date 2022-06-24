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

To use you would do this:

```js
code: (wfArgs) => {
  console.log("We are doing something - here are the details.", wfArgs);
}
```

1. If your code is triggered, it will receive a `wfArgs` object containing a lot of internal stuff, workflow information and more  
    _note that this object isn't 100% final, it may still change a bit in future versions. We don't expect breaking changes, but be aware of this if you use deep properties._
1. If your code returns `false`, the command (like `refresh`) will stop - this can prevent the dialog from openening and the page from refreshing


See also: [](xref:JsCode.2sxcApi.Cms.CommandWorkflows)


### History

1. Introduced in 2sxc 11.12

#### Api Js SxcJs WorkflowStepCode