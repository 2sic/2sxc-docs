/*
 * IMPORTANT
 * DocFx seems to use an older JS version.
 * We cannot use lambdas, because they are not supported by DocFx
 */
const ns = require('./api-meta.js');
const dbg = require('./toc-debug.js');

// Experimental - get Object.assign to work using Polyfill
const polyfills = require('./polyfill-object.assign.js');

// Constants etc.
const tocLevelTop = 1;

const nsKeepParts = 3;    // Namespace parts to keep, like ToSic.Eav.ImportExport
const nsTruncateToParts = 2;   // If NS has more parts, keep only the last two (and prefix with ...)

// Debug Parameters
const dbgProcessNode = false;
const dbgProcessNodeJustAFewMax = 0;
const dbgSortNetToc = false;
const dbgIsApiToc = false;
let count = 0;



/**
 * This method will be called at the start of exports.transform in toc.html.js
 */
exports.preTransform = function (model) {
  dbg.log('preTransform', model);
  return model;
}

/**
 * This method will be called at the end of exports.transform in toc.html.js
 */
exports.postTransform = function (model) {
  const isApi = isApiToc(model);
  if (isApi) {
    dbg.log('postTransform start as isApiToc for ', model, 25);
    processNode(model, tocLevelTop);
  } else {
    dbg.log('postTransform skip as !isApiToc for ', model, 25);
  }
  // dbg.log("count:" + count);
  // dbg.log(logPrefix + 'postTransform end');
  return model;
}



// ----------------------------------------------------------------------------------------------------


// find out if it's the API toc
function isApiToc(model) {
  if(!model) return false;

  // find out if it's the TOC of the API
  if(!(model.items && model.items.length))
    return false;

  var firstName = model.items[0].topicUid || model.items[0].name;
  var match = isNamespace(firstName);

  // Debug
  if (dbgIsApiToc)
    if (firstName && firstName.indexOf(ns.prefixes[0] /*+ ".Dnn" */) === 0)
      dbg.warn('isApiToc Dnn:', model);

  return match;
}

// check if a string is likely a namespace API prefix
function isNamespace(name) {
  if (!name) return false;
  for (let i = 0; i < ns.prefixes.length; i++)
    if (name.indexOf(ns.prefixes[i]) === 0) return true;
  return false;
}

// repeat a string X times
function repeatString(part, count) {
  if(count <= 0) return "";
  var result = "";
  for(i = 0; i < count; i++)
    result += part;
  return result;
}

let dbgProcessNodeJustAFew = 0;
function processNode(item, level) {
  if (dbgProcessNode && dbgProcessNodeJustAFew < dbgProcessNodeJustAFewMax) {
    dbg.log('processNode item: [lvl:' + level + ']:', item);
    dbgProcessNodeJustAFew++;
  }

  // debug data on item
  // var debugModel = JSON.stringify(item);
  if (dbgProcessNode && item.topicUid && item.topicUid.indexOf("Custom") > -1) {
    dbg.log('debug processNode[' + level + "] ", item);
  }

  const isOurNamespace = isNamespace(item.topicUid || item.name);
  if (isOurNamespace) {
    // add metadata - before changing the namespace
    addMeta(item, level);
    if(level <= 2)
      shortenNamespace(item, level);
  }
  else
  {
    addMeta(item, level, false);
  }

  item.level = level;
  if (item.items && item.items.length > 0) {
    var length = item.items.length;
    for (var i = 0; i < length; i++) {
      processNode(item.items[i], level + 1);
    }

    // Only sort the items if we are really on the top-level of our namespace
    if (level === tocLevelTop)
      item.items = sortNetToc(item);
  }
}

function sortNetToc(item) {
  if (dbgSortNetToc) dbg.error("level 1 hit");
  if (dbgSortNetToc) dbg.error('level 1', item.items[0], 1000);
  const top = item.items.filter(function(i) { return !!i && i.top === true; });
  if (dbgSortNetToc) dbg.error('top', top);
  const rest = item.items.filter(function(i) { return !i || i.top !== true; });
  if (dbgSortNetToc) dbg.error('rest', rest);
  const all = [manualTocEntry("<strong>Top Namespaces</strong>")]
    .concat(top)
    .concat([manualTocEntry("<hr>")])
    .concat(rest);
  if (dbgSortNetToc) dbg.error('all', all);
  return all;
}

function manualTocEntry(name) {
  return {
    "name": name,
    // "href": "Custom.Dnn.html",
    // "topicHref": "Custom.Dnn.html",
    // "topicUid": "Custom.Dnn",
    "tocHref": null,
    "level": 2,
    "items": [],
    "leaf": true,
    "priority": "", // "custom",
    // "fullName": "Custom.Dnn"
  }  
}

/**
 * shorten ... the namespace
 */
function shortenNamespace(item, level) {
  item.fullName = item.name;
  var parts = item.name.split('.');
  var count = parts.length;
  if (count > nsKeepParts) {
    parts.splice(0, count - nsTruncateToParts);
    var newName = repeatString("...", count - nsKeepParts) + parts.join('.');
    item.name = newName;
  }
}



/**
 * add metadata for the template to prioritizes
 * @param {*} item 
 * @param {*} level 
 */
function addMeta(item, level, debug) {
  setPriorityNormal(item);

  var found = ns.data[item.topicUid];
  if (found) {
    if (debug) dbg.warn('JS Debug addMeta - uid:' + item.topicUid);
    polyfills.objectAssign(item, found);
  }
}

function setPriorityNormal(item) {
  count++;
  polyfills.objectAssign(item, ns.defaultSettings);
}