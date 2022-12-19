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

  const all = 
    [toc.createLeaf("<strong>Top Namespaces</strong>")]
    .concat(set[0])

    // Custom.* Base Classes
    .concat([toc.createLeaf("<hr>")])
    .concat([toc.createLeaf("<strong>Other Base Classes</strong>")])
    .concat(custom[0])

    // ToSic.Sxc
    .concat([toc.createLeaf("<hr>")])
    .concat([toc.createLeaf("<strong>ToSic.Sxc</strong>")])
    .concat(sxcNoDnn)

    // ToSic.Eav
    .concat([toc.createLeaf("<hr>")])
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
  if (dbgSortNetToc) dbg.error('all', all);
  return all;
}
