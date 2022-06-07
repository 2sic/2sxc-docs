/*
 * IMPORTANT
 * DocFx seems to use an older JS version.
 * We cannot use lambdas, because they are not supported by DocFx
 */
const ns = require('./api-meta.js');
const dbg = require('./toc-debug.js');

// Constants etc.
const tocLevelTop = 1;

const prefix1 = 'ToSic.Sxc';
const prefix2 = 'ToSic.Eav';
const prefixCustom = 'Custom.';

const nsKeepParts = 3;    // Namespace parts to keep, like ToSic.Eav.ImportExport
const nsTruncateToParts = 2;   // If NS has more parts, keep only the last two (and prefix with ...)

// Debug Parameters
const dbgProcessNode = true;
const dbgProcessNodeJustAFewMax = 0;
const dbgSortNetToc = true;

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
  // var debugModel = JSON.stringify(model);
  // var first100 = debugModel.substr(0, 100);

  // find out if it's the TOC of the API
  if(!(model.items && model.items.length))
    return false;

  var firstName = model.items[0].topicUid || model.items[0].name;
  var match = isNamespace(firstName);

  // Debug
  if (dbgIsApiToc)
    if (firstName && firstName.indexOf(prefix1 /*+ ".Dnn" */) === 0)
      dbg.warn('isApiToc Dnn:', model);

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
    dbg.warn('processNode item: [lvl:' + level + ']:', item);
    dbgProcessNodeJustAFew++;
  }

  // debug data on item
  // var debugModel = JSON.stringify(item);
  if (item.topicUid && item.topicUid.indexOf("Custom") > -1) {
      dbg.warn('debug processNode[' + level + "] ", item);
  //     if(item.level) // topicUid == 'ToSic.Eav.ImportExport.JsonLight') 
  //       item.level += 1;
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

    // Only sort the items if we are really on the top-level of our namespace
    if (level === 1)
      item.items = sortNetToc(item);
  } 
}

function sortNetToc(item) {
  if (dbgSortNetToc) dbg.error("level 1 hit");
  if (dbgSortNetToc) dbg.error('level 1', item.items[0], 1000);
  const top = item.items.filter(function(i) { return !!i && i.priority === ns.prioTop; });
  if (dbgSortNetToc) dbg.error('top', top);
  const rest = item.items.filter(function(i) { return !i || i.priority !== ns.prioTop; });
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
  count++;
  // if(level > 2) return;
  item.priority = ns.priorityNormal;

  // 2022-05-31 2dm - disable checking if we should also do deeper nodes, so we can add deprecated etc.
  // if(level > 2 || !item.topicUid) {
  //   return;
  // };

  var found = ns.data[item.topicUid];
  if (found) {
    if (debug) dbg.warn('JS Debug addMeta - uid:' + item.topicUid);
    item.priority = found.priority;
  }
  // if(item.priority == "adam")
  //   dbg.warn("found and added priority", item);
}

function setPriorityNormal(item) {
  count++;
  item.priority = ns.priorityNormal;
}