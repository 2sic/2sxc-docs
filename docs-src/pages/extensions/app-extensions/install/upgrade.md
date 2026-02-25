---
uid: Extensions.AppExtensions.Install.Upgrade
---

# How to Upgrade App Extensions

<!-- [!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>
  .context-box-summary .data-all,
  .context-box-summary .query-app,
  .context-box-summary .process-razor,
  .context-box-summary .process-web-api-app,
  .context-box-summary .edit-ui-custom
  { visibility: visible; }
</style> -->

App Extensions can be upgraded quickly and easily.
It's actually so easy, that we don't have to say much about it.

Basically you will just [install the new version of the extension](xref:Extensions.AppExtensions.Install.Index),
and the system will automatically handle the upgrade process for you.

Here are some edge cases you may care about:
  
1. If the extension was already installed, it will be detected and you'll see information about it.
1. If for some reason you have made changes to the installed extension, then an upgrade will wipe it clean and you could lose your changes. Because of this, the system will ask you to confirm that you want to proceed with the upgrade, and it will also show you a warning about potential data loss.

That's it 🕺🏼

---

## History

* App Extensions introduced in v21
