var ns = require('./api-meta.js');

/**
 * This method will be called at the start of exports.transform in toc.html.js
 */
exports.preTransform = function (model) {
  // console.warn('2dm-preTransform');
  return model;
}

/**
 * This method will be called at the end of exports.transform in toc.html.js
 */
exports.postTransform = function (model) {
  // console.warn('2dm-postTransform:');

  if(isApiToc(model))
    processNode(model, 1);

  // console.error("count:" + count);

  return model;
}

// Constants etc.

const prefix1 = 'ToSic.Sxc';
const prefix2 = 'ToSic.Eav';
const prefixCustom = 'Custom.';

// ----------------------------------------------------------------------------------------------------


// find out if it's the API toc
function isApiToc(model) {
  if(!model) return false;
  var debugModel = JSON.stringify(model);
  var first100 = debugModel.substr(0, 100);

  // find out if it's the TOC of the API
  if(!(model.items && model.items.length))
    return false;

  var firstName = model.items[0].topicUid || model.items[0].name;
  var match = isNamespace(firstName);

  // Debug
  if (firstName && firstName.indexOf(prefix1 /*+ ".Dnn" */) === 0) {
    console.warn('Debug isApiToc Dnn:' + debugModel);
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

let count = 0;
const keepParts = 3;
const truncateTo = 2;

let debugJustAFew = 0;
const debugJustAFewMax = 0;

function processNode(item, level) {
  if (debugJustAFew < debugJustAFewMax) {
    console.warn('2dm-processNode');
    console.warn('item:' + toJsonShort(item));
    debugJustAFew++;
  }

  // debug data on item
  // var debugModel = JSON.stringify(item);
  // if(item.topicUid && item.topicUid.indexOf("ImportExport") > 0) {
  //     console.warn('2dm - debug processNode' + debugModel);

  //     if(item.level) // topicUid == 'ToSic.Eav.ImportExport.JsonLight') 
  //       item.level += 1;
  // }

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
  // if(level > 2) return; 

  item.level = level;
  if (item.items && item.items.length > 0) {
    var length = item.items.length;
    for (var i = 0; i < length; i++) {
      processNode(item.items[i], level + 1);
    }
  } 
}

function toJsonShort(obj) {
  if (obj == null) return "(null)";
  const json = JSON.stringify(obj);
  if (json.length > 100) return json.slice(100) + "...";
  return json;
}

/**
 * shorten ... the namespace
 */
function shortenNamespace(item, level) {
  item.fullName = item.name;
  var parts = item.name.split('.');
  var count = parts.length;
  if (count > keepParts) {
    parts.splice(0, count - truncateTo);
    var newName = repeatString("...", count - keepParts) + parts.join('.');
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