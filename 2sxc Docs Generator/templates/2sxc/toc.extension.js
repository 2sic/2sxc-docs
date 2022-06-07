/*
 * IMPORTANT
 * DocFx seems to use an older JS version.
 * We cannot use lambdas, because they are not supported by DocFx
 */
const ns = require('./api-meta.js');
const dbg = require('./toc-debug.js');
const toc = require('./toc-tools.js');
toc.namespacePrefixes = ns.prefixes;
toc.truncEllipsis = "…";
toc.nodeDefaults = ns.defaultSettings;
toc.nodeData = ns.data;

// Constants etc.
const tocLevelTop = 1;

// Debug Parameters
const dbgProcessNode = false;
const dbgProcessNodeJustAFewMax = 0;
const dbgSortNetToc = false;

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
  const isApi = toc.isTopLevelApiToc(model);
  if (isApi) {
    dbg.log('postTransform start as isApiToc for ', model, 25);
    processNode(model, tocLevelTop);
    // Only sort the items if we are really on the top-level of our namespace
    model.items = sortNetToc(model);
  } else {
    dbg.log('postTransform skip as !isApiToc for ', model, 25);
  }
  return model;
}



// ----------------------------------------------------------------------------------------------------


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

  // add metadata - before changing the namespace
  toc.addNodeData(item, level);

  const isOurNamespace = toc.isNamespace(item.topicUid || item.name);
  if (isOurNamespace && level <= 2)
    toc.shortenNamespace(item);

  item.level = level;
  if (item.items && item.items.length > 0) {
    var length = item.items.length;
    for (var i = 0; i < length; i++) {
      processNode(item.items[i], level + 1);
    }
  }
}

function sortNetToc(item) {
  if (dbgSortNetToc) dbg.error("level 1 hit");
  if (dbgSortNetToc) dbg.error('level 1', item.items[0], 1000);
  const top = item.items.filter(function(i) { return !!i && i.top === true; });
  if (dbgSortNetToc) dbg.error('top', top);
  const rest = item.items.filter(function(i) { return !i || i.top !== true; });
  if (dbgSortNetToc) dbg.error('rest', rest);
  const all = [toc.createLeaf("<strong>Top Namespaces</strong>")]
    .concat(top)
    .concat([toc.createLeaf("<hr>")])
    .concat(rest);
  if (dbgSortNetToc) dbg.error('all', all);
  return all;
}
