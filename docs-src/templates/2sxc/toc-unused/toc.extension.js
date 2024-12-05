/*
 * IMPORTANT
 * DocFx seems to use an older JS version.
 * We cannot use lambdas, because they are not supported by DocFx
 */
const ns = require('./api-meta.js');
const dbg = require('../toc/toc-debug.js');
const toc = require('./toc-tools.js');
toc.namespacePrefixes = ns.prefixes;
toc.truncEllipsis = "…";
toc.nodeDefaults = ns.defaultSettings;
toc.nodeData = ns.data;

// Constants etc.
const tocLevelTop = 1;

// Debug Parameters
const dbgProcessNodeNetApi = true;
const dbgProcessNodeJustAFewMax = 10;
const dbgSortNetToc = false;

/**
 * This method will be called at the start of exports.transform in toc.html.js
 */
exports.preTransform = function (model) {
  // const isApi = toc.isTopLevelApiToc(model);
  // if (isApi) {
  //   dbg.log('2sxc preTransform start as isApiToc for ', model, 25);
  //   processNodeRecursive(model, tocLevelTop, changeNodeNetApi);
  //   // Only sort the items if we are really on the top-level of our namespace
  //   // model.items = sortNetApiToc(model);
  // }

  // dbg.log('preTransform', model);
  return model;
}

/**
 * This method will be called at the end of exports.transform in toc.html.js
 */
exports.postTransform = function (model) {
  return model;
  
  const isApi = toc.isTopLevelApiToc(model);
  if (isApi) {
    dbg.log('2sxc postTransform start as isApiToc for ', model, 25);
    processNodeRecursive(model, tocLevelTop, changeNodeNetApi);
    // Only sort the items if we are really on the top-level of our namespace
    model.items = sortNetApiToc(model);
  } else {
    // dbg.log('2sxc postTransform start !isApiToc for ', model, 25);
    // processNodeRecursive(model, tocLevelTop, createFindAndLog("Deeper Dive"));
  }
  return model;
}


// ----------------------------------------------------------------------------------------------------

// Debug Counter to only debug a few items
let dbgProcessNodeJustAFew = 0;

/**
 * 
 * @param {*} node the current node
 * @param {*} level the current level, as different levels may change the behavior
 * @param {*} modifyNodeCall the callback to modify each node
 */
function processNodeRecursive(node, level, modifyNodeCall) {
  if (dbgProcessNodeNetApi && dbgProcessNodeJustAFew < dbgProcessNodeJustAFewMax) {
    dbg.log('processNode item: [lvl:' + level + ']:', node);
    dbgProcessNodeJustAFew++;
    if (dbgProcessNodeJustAFew < dbgProcessNodeJustAFewMax)
      dbg.log(`will stop logging activity as we've reached ${dbgProcessNodeJustAFewMax}`)
  }

  // debug data on item
  // var debugModel = JSON.stringify(item);
  if (dbgProcessNodeNetApi && node.topicUid && node.topicUid.indexOf("Custom") > -1) {
    if (level === 2) {
      node.name = node.name + "x";
      dbg.log('processNode[' + level + "] ", node);
    }
  }

  // Modify the node using the passed in function
  modifyNodeCall(node, level);

  // Add level information to the current node
  node.level = level;

  // Traverse the tree
  if (node.items && node.items.length > 0) {
    var length = node.items.length;
    for (var i = 0; i < length; i++) {
      processNodeRecursive(node.items[i], level + 1, modifyNodeCall);
    }
  }
}

function createFindAndLog(name) {
  return function findAndLog(node, level) {
    if (node.name === name) {
      dbg.error('createFindAndLog:', node, 1000);
    }
  }
}

function changeNodeNetApi(node, level) {
  // dbg.log('changeNodeNetApi', node, level);
  // add metadata - before changing the namespace
  toc.addNodeData(node, level);

  const isOurNamespace = toc.isNamespace(node.topicUid || node.name);
  if (isOurNamespace && level <= 2)
    toc.shortenNamespace(node);  
}

function sortNetApiToc(item) {
  if (dbgSortNetToc) dbg.error("level 1 hit");
  if (dbgSortNetToc) dbg.error('level 1', item.items[0], 1000);

  // Split into various segments to prioritize and give titles
  const set = toc.split(item.items, function(i) { return !!i && i.top === true; });
  const custom = toc.split(set[1], toc.conditionNameSpaceStartsWith("Custom."));
  const libSet = toc.split(custom[1], toc.conditionNameSpaceStartsWith("ToSic.Lib"));
  const eav = toc.split(libSet[1], toc.conditionNameSpaceStartsWith("ToSic.Eav")); 
  const sxcAndDnn = toc.split(eav[1], toc.conditionNameSpaceStartsWith("ToSic.Sxc.Dnn")); 
  const sxcNoDnn = sxcAndDnn[1];
  const sxcDnn = sxcAndDnn[0];

  if (dbgSortNetToc) dbg.error('top', set[0]);
  if (dbgSortNetToc) dbg.error('rest', set[1]);

  // Special debug during development
  // try {
  //   dbg.error("leaf", toc.createLeaf(" "), 1000);
  //   dbg.error("node", set[0][0].items[0], 1000);
  // }  catch (e) {
  //   dbg.error("error", e);
  // }

  const all = 
    [toc.createLeaf("Top Namespaces")]
    .concat(set[0])

    // Custom.* Base Classes
    .concat([toc.createLeaf(" ")])
    .concat([toc.createLeaf("<strong>Other Base Classes</strong>")])
    .concat(custom[0])

    // ToSic.Sxc
    .concat([toc.createLeaf(" ")])
    .concat([toc.createLeaf("<strong>ToSic.Sxc</strong>")])
    .concat(sxcNoDnn)

    // ToSic.Eav
    .concat([toc.createLeaf(" ")])
    .concat([toc.createLeaf("<strong>ToSic.Eav</strong>")])
    .concat(eav[0])

    // ToSic.Sxc.Dnn
    .concat([toc.createLeaf("<hr>")])
    .concat([toc.createLeaf("<strong>ToSic.Sxc.Dnn</strong>")])
    .concat(sxcDnn)

    // ToSic.Lib
    .concat([toc.createLeaf("<hr>")])
    .concat([toc.createLeaf("<strong>ToSic.Lib</strong>")])
    .concat(libSet[0])
    
    // Add some padding at the end
    .concat([toc.createLeaf("<br>")])
    .concat([toc.createLeaf("<br>")])

    ;
  
  for (let i = 0; i < all.length; i++) {
    const item = all[i];
    item.order = i;
  }
  if (dbgSortNetToc) dbg.error('all', all);
  return all;
}
