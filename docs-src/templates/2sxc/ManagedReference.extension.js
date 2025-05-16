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
   * Helper function to show a conditional alert message at the top of the page.
   * Alert types include (Bootstrap classes): success, danger, warning, info, etc.
   */
  function showAlert(message, type) {
    // Initialize the _page_alert_message and _page_alert_type properties
    model._page_alert_message = message;
    model._page_alert_type = type;
  }

  /**
   * Helper function to render an inline alert message within the page content.
   * Used to prepend alerts directly into markdown.
   * Alert types include (Bootstrap classes): success, danger, warning, info, etc.
   */
  function renderInPageAlert(message, type) {
    return `<div class="alert alert-${type} d-block" role="alert">
        ${message}
      </div>`;
  }

  /* Internal API warning for the ToSic.Lib namespace */
  // If the model UID starts with "ToSic.Lib", treat it as internal
  if (model.uid && model.uid.startsWith("ToSic.Lib")) {
    showAlert(`⚠️ This is an internal API - Don't use it!`, "warning");
  }

  /* Internal API warning for internal classes or interfaces based on attributes */
  // Check if the model has attributes indicating it is internal
  if (
    Array.isArray(model.attributes) &&
    model.attributes.some((attr) => attr.type.includes("InternalApi"))
  ) {
    // Display a warning with the specific model type (e.g., class, interface)
    showAlert(
      `⚠️ There's a ${model.type.toLowerCase()} which is part of an internal API - Don't use it!`,
      "warning"
    );
  }

  /* Internal API warning for internal methods based on attributes */
  // Determine if any method in any type is marked as internal
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

  // If internal methods exist, inject warning alerts into each one
  if (hasInternalApiMethod) {
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
              renderInPageAlert(
                "⚠️ This method is part of an internal API - Don't use it!",
                "warning"
              ) + (method.summary || "");
          }
        });
      }
    });
  }

  return model;
};
