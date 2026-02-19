// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

const tools = require('./build-source/source-tools.js');

/**
 * This method will be called at the start of exports.transform in ManagedReference.html.primary.js
 */
exports.preTransform = function (model) {
  return model;
};

const internalNamespaces = [
  // Exact Match
  // /^ToSic\.Sys$/,
  // Anything below ToSic.Sys.* (done with a starts-string match)
  "ToSic.Sys.",
  // Exact match
  /^ToSic\.Sys$/,
  // Anything below ToSic.Sys.*
  /^ToSic\.Sys\..*$/,
  // Anything below ToSic.Xyz.Sys
  /^ToSic\..*.(Sys|Internal)(\..*|$)/,
];

const DefInternalWarningSuffix = `is an internal API and can change at any time. 
  It's documented so you see how it works. <br>
  ⚠️ Do not use it, or anything with <code>Sys</code> or <code>Internal</code> namespaces in your code, as future changes could break your code.`;

const DefWipWarningSuffix = `is a work-in-progress API and can change at any time. 
  It's documented so you see how it works. <br>
  🛑 Do not use it, as future changes could break your code.`;
/**
 * This method will be called at the end of exports.transform in ManagedReference.html.primary.js
 */
exports.postTransform = function (model) {

  /* Internal API warning for the ToSic.Lib namespace */
  // If the model UID starts with "ToSic.Lib", treat it as internal
  const hasInternalNamespace = tools.modelNamespaceStartsWithAny(model, internalNamespaces)
    || tools.modelNamespaceContainsAny(model, [".Internal."]);
  if (hasInternalNamespace) {
    tools.addAlert(model, `ℹ️ This ${model.type.toLowerCase()} ${DefInternalWarningSuffix}`, "warning");
  }

  /* Internal API warning for internal classes or interfaces based on attributes */
  // Check if the model has attributes indicating it is internal
  if (tools.modelIsDecoratedWith(model, "InternalApi")) {
    // Display a warning with the specific model type (e.g., "This class is...", "This interface is...")
    tools.addAlert(model, `ℹ️ This ${model.type.toLowerCase()} ${DefInternalWarningSuffix}`, "warning");
  }

  /* Work-in-progress API warning for classes or interfaces based on attributes */
  // Check if the model has attributes indicating it is a work-in-progress API
  if (tools.modelIsDecoratedWith(model, "WorkInProgressApi")) {
    // Display a warning with the specific model type (e.g., "This class is...", "This interface is...")
    tools.addAlert(model, `ℹ️ This ${model.type.toLowerCase()} ${DefWipWarningSuffix}`, "danger");
  }

  // If internal methods exist, inject warning alerts into each one
  if (tools.hasInternalMember(model)) {
    // Inject inline alert into each affected method
    model.children?.forEach((child) => {
      // Check if the child has nested children
      if (!Array.isArray(child.children))
        return;
      
      child.children.forEach((method) => {
        // Check if the method has any InternalApi attribute
        const isInternal = method.attributes?.some(
          (attr) => attr.type.includes("InternalApi")
        );

        // If internal, prepend the alert to the summary content
        if (isInternal) {
          // Overwrite the summary with an alert message and add the original summary at the end
          method.summary = tools.createHtmlAlert(`⚠️ This ${DefInternalWarningSuffix}`, "warning") + (method.summary || "");
        }

      });
    });
  }

  // Custom test to debug a specific namespace and model - can be removed later
  // if (model.uid == 'Custom.Hybrid.RazorTyped') {
  //   var debugObj = model.children[0].children[3];
  //   var has = tools.hasMemberWithAttribute(model, "WorkInProgressApi");
  //   console.log("Debug: Model UID is Custom.Hybrid.RazorTyped, model: " + has + ";" + JSON.stringify(debugObj));
  // }

  // If work-in-progress methods exist, inject warning alerts into each one
  if (tools.hasMemberWithAttribute(model, "WorkInProgressApi")) {
    // console.warn("⚠️ Work-in-progress API method found in model: " + model.uid);
    // Inject inline alert into each affected method
    model.children?.forEach((child) => {
      // Check if the child has nested children
      if (!Array.isArray(child.children))
        return;
      
      child.children.forEach((method) => {
        // Check if the method has any WorkInProgressApi attribute
        const isWip = method.attributes?.some(
          (attr) => attr.type.includes("WorkInProgressApi")
        );

        // If work-in-progress, prepend the alert to the summary content
        if (isWip) {
          // Overwrite the summary with an alert message and add the original summary at the end
          method.summary = tools.createHtmlAlert(`⚠️ This ${DefWipWarningSuffix}`, "danger") + (method.summary || "");
        }
      });
    });
  }
  return model;
};
