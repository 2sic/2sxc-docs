// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

/**
 * This method will be called at the start of exports.transform in ManagedReference.html.primary.js
 */
exports.preTransform = function (model) {
  return model;
}

/**
 * This method will be called at the end of exports.transform in ManagedReference.html.primary.js
 */
exports.postTransform = function (model) {
  
  if (model.uid && model.uid.startsWith("ToSic.Lib")) {
    model._internal_api_warning = "⚠️ This is an internal API - Don't use it!";
  }

  return model;
}
