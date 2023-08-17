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
const dbgProcessNodeNetApi = false;
const dbgProcessNodeJustAFewMax = 10;
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
    processNodeRecursive(model, tocLevelTop, changeNodeNetApi);
    // Only sort the items if we are really on the top-level of our namespace
    model.items = sortNetApiToc(model);
  } else {
    dbg.log('postTransform skip as !isApiToc for ', model, 25);
    processNodeRecursive(model, tocLevelTop, changeNodeAddLines);
  }
  return model;
}

/**
 * apply changes such as converting '---' to <hr>
 * and ensure that they will be "empty" nodes without link tags
 * this is important because the empty <a> tags caused navigation issues in the browser
 * @param {*} node 
 * @param {*} level 
 * @returns 
 */
function changeNodeAddLines(node, level) {
  if (!node || !node.name) return;

  // Parse --- and <hr> tags
  if (node.name == '---' || node.name == '<hr>') {
    node.name = '<hr>';
    unlinkNode(node);
    // dbg.log('changeNodeAddLines - found ' + node.name, node);
    // dbg.log(JSON.stringify(node));
    return;
  }

  // parse tags like **Some Title**
  if (node.name.indexOf('**') == 0 && (node.name.lastIndexOf('**') == node.name.length - 2)) {
    // dbg.log('index of **' + node.name.indexOf('**'));
    // dbg.log('last index of **' + node.name.lastIndexOf('**'));
    // dbg.log('length ' + node.name.length);
    // dbg.log('last index of **' + (node.name.lastIndexOf('**') == node.name.length - 2));
    // dbg.log('has nodes ' + (node.items && node.items.length > 0));
    const namePart = node.name.replaceAll('**', '');
    // dbg.log('final name: ' + namePart);
    node.name = `<strong>${namePart}</strong>`;
    unlinkNode(node);
    node.topicHref = '#test';
    return;
  }

  // parse an explicit test title, which is usually not available
  // but you can add one any time to test other logic
  if (node.name.indexOf('TestXXX') > -1) {
    dbg.log('changeNodeAddLines - found ' + node.name, node);
    dbg.log(JSON.stringify(node));
    unlinkNode(node);
    return;
  }
}

function unlinkNode(node) {
  node.topicUid = null;
  node.topicHref = null;
  // custom property we add to ensure the li-template doesn't add a link
  node.noLink = true;
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
    dbg.log('debug processNode[' + level + "] ", node);
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
