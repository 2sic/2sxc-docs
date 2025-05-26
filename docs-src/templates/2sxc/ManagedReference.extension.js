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
  "ToSic.Lib.",
  // "ToSic.Sxc.",
  // "ToSic.Sxc.LookUp.",
  // "ToSic.Sxc.InternalApi.",
  // "ToSic.Sxc.InternalApi2."
];

/**
 * This method will be called at the end of exports.transform in ManagedReference.html.primary.js
 */
exports.postTransform = function (model) {

  /* Internal API warning for the ToSic.Lib namespace */
  // If the model UID starts with "ToSic.Lib", treat it as internal
  if (tools.modelNamespaceStartsWithAny(model, internalNamespaces)) {
    tools.addAlert(model, `⚠️ This is an internal API. Do not use it in your code.`, "warning");
  }

  /* Internal API warning for internal classes or interfaces based on attributes */
  // Check if the model has attributes indicating it is internal
  if (tools.modelIsDecoratedWith(model, "InternalApi")) {
    // Display a warning with the specific model type (e.g., class, interface)
    tools.addAlert(
      model,
      `⚠️ There's a ${model.type.toLowerCase()} which is part of an internal API - Don't use it!`,
      "warning"
    );
  }

  // If internal methods exist, inject warning alerts into each one
  if (tools.hasInternalMember(model)) {
    // Inject inline alert into each affected method
    model.children?.forEach((child) => {
      // Check if the child has nested children
      if (Array.isArray(child.children)) {
        child.children.forEach((method) => {
          // Check if the method has any InternalApi attribute
          const isInternal = method.attributes?.some((attr) =>
            attr.type.includes("InternalApi")
          );

          // If internal, prepend the alert to the summary content
          if (isInternal) {
            // Overwrite the summary with an alert message and add the original summary at the end
            method.summary =
              tools.createHtmlAlert(
                "⚠️ This is an internal API. It's documented to better understand the functionality. Do not use it in your code.",
                "warning"
              ) + (method.summary || "");
          }
        });
      }
    });
  }

  return model;
};
