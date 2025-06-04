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
  /^ToSic\.Lib$/,
  // Anything below ToSic.Lib.* (done with a starts-string match)
  "ToSic.Lib.",
  // Exact match
  /^ToSic\.Sys$/,
  // Anything below ToSic.Sys.*
  /^ToSic\.Sys\..*$/,
  // Anything below ToSic.Xyz.Sys
  /^ToSic\..*.(Sys|Internal)(\..*|$)/,
];

/**
 * This method will be called at the end of exports.transform in ManagedReference.html.primary.js
 */
exports.postTransform = function (model) {

  const DefMessageSuffix = `is an internal API and can change at any time. 
  It's documented so you can understand how it works. <br>
  ⚠️ Do not use it, or anything with <code>Sys</code> or <code>Internal</code> namespaces in your code, as future changes could then break your code.`;

  /* Internal API warning for the ToSic.Lib namespace */
  // If the model UID starts with "ToSic.Lib", treat it as internal
  const hasInternalNamespace = tools.modelNamespaceStartsWithAny(model, internalNamespaces)
    || tools.modelNamespaceContainsAny(model, [".Internal."]);
  if (hasInternalNamespace) {
    tools.addAlert(model, `ℹ️ This ${model.type.toLowerCase()} ${DefMessageSuffix}`, "warning");
  }

  /* Internal API warning for internal classes or interfaces based on attributes */
  // Check if the model has attributes indicating it is internal
  if (tools.modelIsDecoratedWith(model, "InternalApi")) {
    // Display a warning with the specific model type (e.g., "This class is...", "This interface is...")
    tools.addAlert(model, `ℹ️ This ${model.type.toLowerCase()} ${DefMessageSuffix}`, "warning");
  }

  // If internal methods exist, inject warning alerts into each one
  if (tools.hasInternalMember(model)) {
    // Inject inline alert into each affected method
    model.children?.forEach((child) => {
      // Check if the child has nested children
      if (Array.isArray(child.children)) {
        child.children.forEach((method) => {
          // Check if the method has any InternalApi attribute
          const isInternal = method.attributes?.some(
            (attr) => attr.type.includes("InternalApi")
          );

          // If internal, prepend the alert to the summary content
          if (isInternal) {
            // Overwrite the summary with an alert message and add the original summary at the end
            method.summary = tools.createHtmlAlert(`⚠️ This ${DefMessageSuffix}`, "warning") + (method.summary || "");
          }
        });
      }
    });
  }

  return model;
};
