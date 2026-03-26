---
uid: Extensions.AppExtensions.BestPractices.Index
---

# App Extensions - Best Practices (new v21 ⭐)

## Testing in the Same App - Keep Test Code Separate

In the App where you develop your extension, you'll also need code and data to test it.
To keep things clean, we recommend that you

1. clearly name test things as such
1. and keep them out of the exports

For example when creating a code extension, you would have this structure:

```text
/AppCode
  /Extensions
    /MyCodeExtension
      SomeCode.cs (things to have in the export)
  /Tests
    SomeTestService.cs
    ... (other test code, not to be exported)
/extensions
  /my-code-extension
    extension.json
Test Functionality.cshtml
... (other testing files)
```
