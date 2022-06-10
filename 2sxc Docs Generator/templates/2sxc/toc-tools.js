
const dbg = require('./toc-debug.js');

// Polyfill for Object.assign
const polyfills = require('./polyfill-object.assign.js');

let count = 0;

function createLeaf(name) {
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

// repeat a string X times
function repeatString(part, count) {
  if(count <= 0) return "";
  var result = "";
  for(i = 0; i < count; i++)
    result += part;
  return result;
}

function isNamespace(name) {
  if (!name) return false;

  const prefixes = exports.namespacePrefixes;

  for (let i = 0; i < prefixes.length; i++)
    if (name.indexOf(prefixes[i]) === 0)
      return true;
  return false;
}

/**
 * shorten the namespace with an ellipsis
 */
function shortenNamespace(item) {
  // dbg.error("shortenNamespace - exports:", exports);
  const separator = exports.nameSeparator; // '.';
  item.fullName = item.name;
  var parts = item.name.split(separator);
  var count = parts.length;
  if (count > exports.nsKeepParts) {
    parts.splice(0, count - exports.nsTruncateToParts);
    var newName = repeatString(exports.truncEllipsis, count - exports.nsKeepParts) + parts.join(separator);
    item.name = newName;
  }
}

function addNodeDefaults(item) {
  count++;
  polyfills.objectAssign(item, exports.nodeDefaults);
}

/**
 * add metadata for the template to prioritizes
 * @param {*} item 
 * @param {*} level 
 */
function addNodeData(item, level, debug) {
  addNodeDefaults(item);

  var found = exports.nodeData[item.topicUid];
  if (found) {
    if (debug) dbg.warn('JS Debug addMeta - uid:' + item.topicUid);
    polyfills.objectAssign(item, found);
  }
}

const dbgIsApiToc = false;

/**
 * find out if it's the API toc
 * @param {*} model 
 * @returns 
 */
function isTopLevelApiToc(model) {
  if(!model) return false;

  // find out if it's the TOC of the API
  if(!(model.items && model.items.length)) return false;

  var firstName = model.items[0].topicUid || model.items[0].name;
  var match = isNamespace(firstName);

  // Debug
  // if (dbgIsApiToc)
  //   if (firstName && firstName.indexOf(ns.prefixes[0]) === 0)
  //     dbg.warn('isApiToc Dnn:', model);

  return match;
}

function splitByCondition(items, condition) {
  const top = items.filter(condition);
  const rest = items.filter(function(i) { return !condition(i) });
  return [ top, rest ];
}

function conditionNameSpaceStartsWith(prefix) {
  return function(i) { return !!i && i.topicUid && i.topicUid.indexOf(prefix) === 0; };
}

exports = {
  createLeaf: createLeaf,
  repeatString: repeatString,
  shortenNamespace: shortenNamespace,
  isNamespace: isNamespace,
  nameSeparator: '.',
  truncEllipsis: '...',
  nsKeepParts: 3,       // Namespace parts to keep, like ToSic.Eav.ImportExport
  nsTruncateToParts: 2, // If NS has more parts, keep only the last two (and prefix with ...)
  namespacePrefixes: [],

  nodeDefaults: {},
  addNodeDefaults: addNodeDefaults,

  nodeData: {},
  addNodeData: addNodeData,

  isTopLevelApiToc: isTopLevelApiToc,
  split: splitByCondition,
  conditionNameSpaceStartsWith: conditionNameSpaceStartsWith
}