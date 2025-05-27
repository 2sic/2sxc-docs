function modelNamespaceStartsWith(model, namespace) {
  if (!model || !model.uid)
    return false;

  // Check if the model's UID starts with the specified namespace
  return model.uid.startsWith(namespace);
}

/**
 * If the model UID (full namespace) starts with "ToSic.Lib" or other things, treat it as internal
 */
function modelNamespaceStartsWithAny(model, namespaces) {
  if (!model || !model.uid)
    return false;

  // Check if the model's UID starts with any of the specified namespaces
  return namespaces.some((namespace) => model.uid.startsWith(namespace));
}

/**
 * If the model UID (full namespace) contains with "Internal" or other things, treat it as internal
 */
function modelNamespaceContainsAny(model, namespaces) {
  if (!model || !model.uid)
    return false;

  // Check if the model's UID contains any of the specified namespaces
  return namespaces.some((namespace) => model.uid.includes(namespace));
}

function modelIsDecoratedWith(model, decoratorName) {
  if (!model || !model.attributes)
    return false;

  // Check if the model has attributes and if any of them match the decorator name
  const found = model.attributes.some((attr) => attr.type.includes(decoratorName));
  return found;
}


/** Internal API warning for internal methods based on attributes */
function hasMemberWithAttribute(model, memberType) {
  const hasInternalApiMethod = model.children?.some(
    (child) =>
      // Check if the child has nested children
      Array.isArray(child.children) &&
      // Check if the first nested child has attributes
      child.children[0]?.attributes?.some((attr) =>
        // Check if any attribute type includes "InternalApi"
        attr.type.includes(memberType)
      )
  );
  // if (hasInternalApiMethod)
  //   console.warn("⚠️ Internal API method found in model:", model.uid);
  return hasInternalApiMethod;    
}
/** Internal API warning for internal methods based on attributes */
function hasInternalMember(model) {
  return hasMemberWithAttribute(model, "InternalApi");
}

/**
 * Helper function to show a conditional alert message at the top of the page.
 * Alert types include (Bootstrap classes): success, danger, warning, info, etc.
 */
function addAlert(model, message, type) {
  // Initialize the _page_alert_message and _page_alert_type properties
  model._page_alert = createHtmlAlert(message, type);
}

/**
 * Helper function to render an inline alert message within the page content.
 * Used to prepend alerts directly into markdown.
 * Alert types include (Bootstrap classes): success, danger, warning, info, etc.
 */
function createHtmlAlert(message, type) {
  return `<div class="alert alert-${type} d-block" role="alert">
      ${message}
    </div>`;
}

exports = {
  modelNamespaceStartsWith,
  modelNamespaceStartsWithAny,
  modelNamespaceContainsAny,
  modelIsDecoratedWith,
  hasMemberWithAttribute,
  hasInternalMember,
  addAlert,
  createHtmlAlert,
}