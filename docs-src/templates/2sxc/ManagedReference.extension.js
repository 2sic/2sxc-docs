// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

/**
 * This method will be called at the start of exports.transform in ManagedReference.html.primary.js
 */
exports.preTransform = function (model) {
  return model;
};

/**
 * This method will be called at the end of exports.transform in ManagedReference.html.primary.js
 */
exports.postTransform = function (model) {
  /**
   * Helper function to show the page alert message.
   * Alert types include (Bootstrap classes): success, danger, warning, info, etc.
   */
  function showAlert(message, type) {
    // Initialize the _page_alert_message and _page_alert_type properties
    model._page_alert_message = message;
    model._page_alert_type = type;
  }

  /* Internal API warning for ToSic.Lib namespace */
  // Check if the model has a uid property
  // And if it starts with "ToSic.Lib"
  if (model.uid && model.uid.startsWith("ToSic.Lib")) {
    showAlert(`⚠️ This is an internal API - Don't use it!`, "warning");
  }

  /* Internal API warning for internal classes or interfaces based on attribute */
  // Check if the model has an attributes property
  if (
    Array.isArray(model.attributes) &&
    // Check if any attribute has a type that includes "InternalApi"
    model.attributes.some((attr) => attr.type.includes("InternalApi"))
  ) {
    // Show a warning alert with dynamic model type (e.g., class, interface)
    showAlert(
      `⚠️ There's a ${model.type.toLowerCase()} which is part of an internal API - Don't use it!`,
      "warning"
    );
  }

  /* Internal API warning for internal methods based on attribute */
  // Check if the model has children
  const hasInternalApiMethod = model.children?.some(
    (child) =>
      // Check if the child has nested children
      Array.isArray(child.children) &&
      // Check if the first nested child has attributes
      child.children[0]?.attributes?.some((attr) =>
        // Check if any attribute type includes "InternalApi"
        attr.type.includes("InternalApi")
      )
  );

  // If an internal API method is found, show a warning alert
  if (hasInternalApiMethod) {
    showAlert(
      "⚠️ There's a method which is part of an internal API - Don't use it!",
      "warning"
    );
  }

  return model;
};
