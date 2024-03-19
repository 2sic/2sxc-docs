// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

// 2024-03-19 2dm
// Copied from default template
// Believe it generates the JSON for the .net API TOC
// Experimenting with enhancing

const tocTools = require('./toc-tools-new.js');

const highlights = {
  "Custom.Data.CustomItem": "💪🏽",
  "Custom.Hybrid": "🪴",
  "Custom.Hybrid.ApiTyped": "🪴",
  "Custom.Hybrid.CodeTyped": "🪴",
  "Custom.Hybrid.RazorTyped": "🪴",
  "ToSic.Sxc": "⭐",
  "ToSic.Sxc.Context": "📟",
  "ToSic.Sxc.Data": "🎁",
  "ToSic.Sxc.Data.ITypedItem": "🔬",
  "ToSic.Sxc.Services": "🌟",
  "ToSic.Sxc.Services.ServiceKit16": "🌟",
}


exports.transform = function (model) {

    // 2024-03-19 2dm
    // Catch the first TOC which is in the .net namespace - first namespace item is the AppCode namespace
    model = { ...model };
    if (false || model?.items?.[0]?.name == "AppCode") {
      // console.error('\n\n2dm in items: \n' + JSON.stringify(model.items[0]));

      let items = model.items;

      items = flattenNamespace(items, 'Custom');
      items = flattenNamespace(items, 'ToSic');

      model = { ...model, items: [ ...items ] };

      tocTools.processNodeRecursive(model, 1, function (node, level) {
        // console.error('2dm node: ' + JSON.stringify(node) + ' level: ' + level);
        if (node.topicUid && highlights[node.topicUid]) {
          node.name = node.name + ' ' + highlights[node.topicUid];
        }
      });
    }

    if (model.memberLayout === 'SeparatePages') {
      model = transformMemberPage(model);
    }
  
    for (var key in model) {
      if (key[0] === '_') {
        delete model[key]
      }
    }
  
    // Original
    // return {
    //   content: JSON.stringify(model)
    // };

    // new
    const stringified = JSON.stringify(model);
    // test 2dm
    // console.error('\n\n2dm in SeparatePages: \n' + stringified);

    return {
        content: stringified
    };
  }

  function flattenNamespace(items, ns) {
    const index = items.findIndex(item => item.topicUid === ns);
    const nsItem = items[index];

    // run rename and Highlight on all nsItems
    const renamed = nsItem.items.map(item => renameWithNamespaceAndHighlight(item, highlights[item.topicUid]));
    nsItem.items = [];

    const before = items.splice(0, index + 1);
    const after = items.splice(index - 1);
    const inserted = [...before, ...renamed, ...after];

    return inserted;
  }

  function renameWithNamespaceAndHighlight(item, highlight = '') {
    const name = item.topicUid;// + (highlight ? ' ' + highlight : '');
    return { ...item, name };
  }




  // function findAndHighlight(items, ns, highlight) {
  //   const index = items.findIndex(item => item.topicUid === ns);
  //   const nsItem = items[index];
  //   nsItem.name = nsItem.name + ' ' + highlight;
  //   return nsItem;
  // }

  // function findRenameAndRemove(items, ns, newName = null, highlight = '') {
  //   const index = items.findIndex(item => item.topicUid === ns);
  //   const nsItem = items[index];
  //   nsItem.name = newName ?? ns;
  //   if (highlight) {
  //     nsItem.name = nsItem.name + ' ' + highlight;
  //   }
  //   items.splice(index, 1);
  //   return nsItem;
  // }
  
  function transformMemberPage(model) {
    var groupNames = {
        "constructor": { key: "constructorsInSubtitle" },
        "field":       { key: "fieldsInSubtitle" },
        "property":    { key: "propertiesInSubtitle" },
        "method":      { key: "methodsInSubtitle" },
        "event":       { key: "eventsInSubtitle" },
        "operator":    { key: "operatorsInSubtitle" },
        "eii":         { key: "eiisInSubtitle" },
    };
  
    groupChildren(model);
    transformItem(model, 1);
    return model;
  
    function groupChildren(item) {
        if (!item || !item.items || item.items.length == 0) {
            return;
        }
        var grouped = {};
        var items = [];
        item.items.forEach(function (element) {
            groupChildren(element);
            if (element.type) {
                var type = element.isEii ? "eii" : element.type.toLowerCase();
                if (!grouped.hasOwnProperty(type)) {
                    if (!groupNames.hasOwnProperty(type)) {
                        groupNames[type] = {
                            name: element.type
                        };
                        console.log(type + " is not predefined type, use its type name as display name.")
                    }
                    grouped[type] = [];
                }
                grouped[type].push(element);
            } else {
                items.push(element);
            }

        }, this);
  
        // With order defined in groupNames
        for (var key in groupNames) {
            if (groupNames.hasOwnProperty(key) && grouped.hasOwnProperty(key)) {
                items.push({
                    name: model.__global[groupNames[key].key] || groupNames[key].name,
                    items: grouped[key]
                })
            }
        }
  
        item.items = items;
    }
  
    function transformItem(item, level) {
        // set to null in case mustache looks up
        item.topicHref = item.topicHref || null;
        item.tocHref = item.tocHref || null;
        item.name = item.name || null;
  
        item.level = level;
  
        if (item.items && item.items.length > 0) {
            item.leaf = false;
            var length = item.items.length;
            for (var i = 0; i < length; i++) {
                transformItem(item.items[i], level + 1);
            };
        } else {
            item.items = [];
            item.leaf = true;
        }
    }
  }
  