const ns = require('./api-meta.js');

// Constants etc.
const logPrefix = 'TOC-JS: ';
const tocLevelTop = 1;

const prefix1 = 'ToSic.Sxc';
const prefix2 = 'ToSic.Eav';
const prefixCustom = 'Custom.';

const nsKeepParts = 3;    // Namespace parts to keep, like ToSic.Eav.ImportExport
const nsTruncateToParts = 2;   // If NS has more parts, keep only the last two (and prefix with ...)

// Debug Parameters
const jsonDebugMaxLength = 100;
const dbgProcessNode = true;
const dbgProcessNodeJustAFewMax = 3;

const dbgIsApiToc = false;
let count = 0;



/**
 * This method will be called at the start of exports.transform in toc.html.js
 */
exports.preTransform = function (model) {
  console.Log(logPrefix + 'preTransform');
  return model;
}

/**
 * This method will be called at the end of exports.transform in toc.html.js
 */
exports.postTransform = function (model) {
  const isApi = isApiToc(model);
  const jsonModel = toJsonShort(model, 25);
  if (isApi) {
    console.log(logPrefix + 'postTransform start as isApiToc for ' + jsonModel);
    processNode(model, tocLevelTop);
  } else {
    console.log(logPrefix + 'postTransform skip as !isApiToc for ' + jsonModel);
  }
  // console.error("count:" + count);
  // console.log(logPrefix + 'postTransform end');
  return model;
}



// ----------------------------------------------------------------------------------------------------


// find out if it's the API toc
function isApiToc(model) {
  if(!model) return false;
  // var debugModel = JSON.stringify(model);
  // var first100 = debugModel.substr(0, 100);

  // find out if it's the TOC of the API
  if(!(model.items && model.items.length))
    return false;

  var firstName = model.items[0].topicUid || model.items[0].name;
  var match = isNamespace(firstName);

  // Debug
  if (dbgIsApiToc)
    if (firstName && firstName.indexOf(prefix1 /*+ ".Dnn" */) === 0) {
      console.warn(logPrefix + 'isApiToc Dnn:' + toJsonShort(model));
    }
  return match;
}

// check if a string is likely a namespace API prefix
function isNamespace(name) {
  return name && (
    name.indexOf(prefix1) === 0 
    || name.indexOf(prefix2) === 0
    || name.indexOf(prefixCustom) === 0
  );
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
    console.warn(logPrefix + 'processNode item: [lvl:' + level + ']:' + toJsonShort(item));
    dbgProcessNodeJustAFew++;
  }

  // debug data on item
  // var debugModel = JSON.stringify(item);
  if (item.topicUid && item.topicUid.indexOf("Custom") > -1) {
      console.warn(logPrefix + 'debug processNode[' + level + "] " + toJsonShort(item));
  //     if(item.level) // topicUid == 'ToSic.Eav.ImportExport.JsonLight') 
  //       item.level += 1;
  }

  if(isNamespace(item.topicUid || item.name)) {
    // add metadata - before changing the namespace
    addMeta(item, level);
    if(level <= 2)
      shortenNamespace(item, level);
  }
  else
  {
    addMeta(item, level, true);
    setPriorityNormal(item);
  }

  // do recursively if necessary, but should only matter on the 1st or 2nd recursion
  // 2022-05 2dm disabled this, as we also mark sub-items as obsolete
  // if(level > 2) return; 

  item.level = level;
  if (item.items && item.items.length > 0) {
    var length = item.items.length;
    for (var i = 0; i < length; i++) {
      processNode(item.items[i], level + 1);
    }
  } 
}

function toJsonShort(obj, maxLength) {
  if (obj == null) return "(null)";
  const json = JSON.stringify(obj);
  maxLength = maxLength || jsonDebugMaxLength;
  if (json.length >= maxLength) return json.slice(0, maxLength) + "...";
  return json;
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
  count++;
  // if(level > 2) return;
  item.priority = ns.priorityNormal;

  // 2022-05-31 2dm - disable checking if we should also do deeper nodes, so we can add deprecated etc.
  // if(level > 2 || !item.topicUid) {
  //   return;
  // };

  var found = ns.data[item.topicUid];
  if (found) {
    if (debug) console.warn('JS Debug addMeta - uid:' + item.topicUid);
    item.priority = found.priority;
  }
  // if(item.priority == "adam")
  //   console.warn("found and added priority" + JSON.stringify(item));
}

function setPriorityNormal(item) {
  count++;
  item.priority = ns.priorityNormal;
}