/*
 * IMPORTANT
 * DocFx seems to use an older JS version.
 * We seem to be forced to use the "exports.xxx" syntax
 * We cannot use lambdas, because they are not supported by DocFx
 */
exports.test = {};
exports.getData = getData;

const prioWeb = { 
  priority: "web"
};

const prioInternal = {
  priority: "internal"
};

const prioTop = {
  priority: "custom"
};
exports.prioTop = prioTop.priority;

const prioData = {
  priority: "data"
};

const prioDataInternal = {
  // temp workaround because all classes which affect priority need the priority-prefix
  priority: prioData.priority + ' priority-' + prioInternal.priority
}

const prioMeta = {
  priority: "metadata"
};

const prioAdam = {
  priority: "adam"
};

const deprecated = {
  priority: "deprecated"
};

exports.data = {
  "Custom.Hybrid": prioTop,
  "Custom.Dnn": prioTop,
  "Custom.Oqtane": prioTop,
  "ToSic.Eav": deprecated,
  "ToSic.Eav.Factory": deprecated,
  "ToSic.Eav.Apps": prioInternal,
  "ToSic.Eav.Apps.Assets": prioInternal,
  "ToSic.Eav.Caching": prioInternal,
  "ToSic.Eav.Configuration": prioInternal,
  "ToSic.Eav.Convert": prioInternal,
  "ToSic.Eav.Data": prioData,
  "ToSic.Eav.DataSources": prioData,
  "ToSic.Eav.DataSources.Caching": prioInternal,
  "ToSic.Eav.DataSources.Queries": prioDataInternal,
  "ToSic.Eav.DataSources.System": prioInternal,
  "ToSic.Eav.Environment": prioInternal,
  "ToSic.Eav.DataFormats": prioInternal,
  "ToSic.Eav.DataFormats.EavLight": prioDataInternal,
  // "ToSic.Eav.ImportExport.Json.Basic": prioInternal,
  // "ToSic.Eav.ImportExport": prioData,
  "ToSic.Eav.Logging": prioInternal,
  "ToSic.Eav.LookUp": prioInternal,
  "ToSic.Eav.Metadata": prioMeta,
  "ToSic.Eav.Repositories": prioInternal,
  "ToSic.Eav.Run": prioInternal,
  "ToSic.Eav.Security": prioInternal,
  "ToSic.Eav.Serialization": prioInternal,
  "ToSic.Sxc.Adam": prioAdam,
  "ToSic.Sxc.Apps": prioInternal,
  "ToSic.Sxc.Blocks": prioInternal,
  "ToSic.Sxc.Code": prioInternal,
  "ToSic.Sxc.Context": prioWeb,
  "ToSic.Sxc.Data": prioWeb,
  "ToSic.Sxc.DataSources": prioData,
  "ToSic.Sxc.Dnn": prioWeb,
  "ToSic.Sxc.Dnn.Factory": deprecated,
  "ToSic.Sxc.Dnn.Code": prioInternal,
  "ToSic.Sxc.Dnn.Context": prioInternal,
  "ToSic.Sxc.Dnn.DataSources": prioData,
  "ToSic.Sxc.Dnn.LookUp": prioInternal,
  "ToSic.Sxc.Dnn.Run": prioInternal,
  "ToSic.Sxc.Dnn.Web": prioInternal,
  "ToSic.Sxc.Edit": prioInternal,
  "ToSic.Sxc.Engines": prioInternal,
  "ToSic.Sxc.Hybrid": prioInternal,
  "ToSic.Sxc.Hybrid.Razor": prioInternal,
  "ToSic.Sxc.LookUp": prioInternal,
  "ToSic.Sxc.Search": prioWeb,
  "ToSic.Sxc.Services": prioTop,
  "ToSic.Sxc.Web": prioInternal,
}

exports.priorityNormal = 'normal';

function getData() {
    return "hello;"
}