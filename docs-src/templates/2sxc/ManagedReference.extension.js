// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

const tools = require('./build-source/source-tools.js');

const debug = false;

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

const DefDeprecatedWarningSuffix = `is a deprecated API and will be removed in future versions. 
  It's documented so you see how it works. <br>
  🛑 Do not use it, as future changes could break your code.`;
/**
 * This method will be called at the end of exports.transform in ManagedReference.html.primary.js
 */
exports.postTransform = function (model, b, c) {

  if (debug)
    console.info("JS postTransform: model.uid = '" + model.uid + "'");

  // console.warn("test: " + model.uid, JSON.stringify(model)); //, "has internal member?", tools.hasInternalMember(model), "has WIP member?", tools.hasMemberWithAttribute(model, "WorkInProgressApi"));

  /* Internal API warning for the ToSic.Lib namespace */
  // If the model UID starts with "ToSic.Lib", treat it as internal
  const hasInternalNamespace = tools.modelNamespaceStartsWithAny(model, internalNamespaces)
    || tools.modelNamespaceContainsAny(model, [".Internal."]);
  if (hasInternalNamespace) {
    tools.addAlert(model, `ℹ️ This ${model.type.toLowerCase()} ${DefInternalWarningSuffix}`, "warning", debug);
  }

  if (debug)
    console.info("JS postTransform: model.uid = '" + model.uid + "' + match: " + (hasInternalNamespace ? "[x]" : "[ ]"));

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

  /* Deprecated API warning for classes or interfaces based on attributes */
  // Check if the model has attributes indicating it is a deprecated API
  if (tools.modelIsDecoratedWith(model, "DeprecatedApi")) {
    // Display a warning with the specific model type (e.g., "This class is...", "This interface is...")
    tools.addAlert(model, `ℹ️ This ${model.type.toLowerCase()} ${DefDeprecatedWarningSuffix}`, "danger");
  }

  // Custom test to debug a specific namespace and model - can be removed later
  // if (model.uid == 'Custom.Hybrid.RazorTyped') {
  //   var debugObj = model.children[0].children[3];
  //   var has = tools.hasMemberWithAttribute(model, "WorkInProgressApi");
  //   console.log("Debug: Model UID is Custom.Hybrid.RazorTyped, model: " + has + ";" + JSON.stringify(debugObj));
  // }

  // If work-in-progress methods exist, inject warning alerts into each one
  addHtmlWarnings(model, "InternalApi", `⚠️ This ${DefInternalWarningSuffix}`, "warning");
  addHtmlWarnings(model, "WorkInProgressApi", `⚠️ This ${DefWipWarningSuffix}`, "danger");
  addHtmlWarnings(model, "DeprecatedApi", `⚠️ This ${DefDeprecatedWarningSuffix}`, "danger");

  return model;
};

function addHtmlWarnings(model, attributeType, message, alertType = "danger") {
    if (tools.hasMemberWithAttribute(model, attributeType)) {
    // console.warn("⚠️ Work-in-progress API method found in model: " + model.uid);
    // Inject inline alert into each affected method
    model.children?.forEach((child) => {
      // Check if the child has nested children
      if (!Array.isArray(child.children))
        return;
      
      child.children.forEach((method) => {
        // Check if the method has any attribute of the specified type
        const isWip = method.attributes?.some(
          (attr) => attr.type.includes(attributeType)
        );

        // If the method has the specified attribute, prepend the alert to the summary content
        if (isWip) {
          // Overwrite the summary with an alert message and add the original summary at the end
          method.summary = tools.createHtmlAlert(message, alertType) + (method.summary || "");
        }
      });
    });
  }

}