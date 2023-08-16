/*
 * IMPORTANT
 * DocFx seems to use an older JS version.
 * We seem to be forced to use the "exports.xxx" syntax
 * We cannot use lambdas, because they are not supported by DocFx
 */
exports.test = {};
exports.getData = getData;


const prioInternal = {
  priority: "internal"
};

const prioUntyped = {
  priority: "default",
  top: false,
}

const prioTop = {
  priority: "star",
  top: true,
};
exports.prioTop = prioTop.priority;

const prioData = {
  priority: "data"
};

const prioDataTop = {
  priority: "data",
  top: true,
}

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

const prioAdamTop = {
  priority: "adam",
  top: true,
};

const prioWeb = { 
  priority: "web",
};

const prioWebTop = { 
  priority: "web",
  top: true,
};

const deprecated = {
  priority: "deprecated",
  deprecated: true
};

exports.prefixes = ['ToSic.Sxc', 'ToSic.Eav', 'Custom.'];

exports.data = {
  "Custom.Hybrid": prioTop,
  "Custom.Hybrid.Api14": prioTop,
  "Custom.Hybrid.Code14": prioTop,
  "Custom.Hybrid.Razor14": prioTop,
  "Custom.Hybrid.ApiPro": deprecated,
  "Custom.Hybrid.CodePro": deprecated,
  "Custom.Hybrid.RazorPro": deprecated,
  "Custom.Hybrid.ApiTyped": prioTop,
  "Custom.Hybrid.CodeTyped": prioTop,
  "Custom.Hybrid.RazorTyped": prioTop,
  "Custom.Dnn": prioUntyped,
  "Custom.Oqtane": prioUntyped,
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
  "ToSic.Eav.DataSources.Sys": prioInternal,
  "ToSic.Eav.Environment": prioInternal,
  "ToSic.Eav.DataFormats": prioInternal,
  "ToSic.Eav.DataFormats.EavLight": prioDataInternal,
  // "ToSic.Eav.ImportExport.Json.Basic": prioInternal,
  // "ToSic.Eav.ImportExport": prioData,
  "ToSic.Eav.LookUp": prioInternal,
  "ToSic.Eav.Metadata": prioMeta,
  "ToSic.Eav.Repositories": prioInternal,
  "ToSic.Eav.Run": prioInternal,
  "ToSic.Eav.Security": prioInternal,
  "ToSic.Eav.Serialization": prioInternal,
  "ToSic.Sxc.Adam": prioAdamTop,
  "ToSic.Sxc.Apps": prioInternal,
  "ToSic.Sxc.Blocks": prioInternal,
  "ToSic.Sxc.Code": prioInternal,
  "ToSic.Sxc.Context": prioWebTop,
  "ToSic.Sxc.Data": prioDataTop,
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
  "ToSic.Sxc.Images": prioInternal,
  "ToSic.Sxc.LookUp": prioInternal,
  "ToSic.Sxc.Search": prioWeb,
  "ToSic.Sxc.Services": prioTop,
  "ToSic.Sxc.Web": prioInternal,
  "ToSic.Sxc.WebApi": prioInternal,

  // Lib stuff...
  "ToSic.Lib.Data": prioInternal,
  "ToSic.Lib.Documentation": prioInternal,
  "ToSic.Lib.Helpers": prioInternal,
  "ToSic.Lib.Logging": prioInternal,

}

exports.defaultSettings = {
  priority: 'normal',
  top: false,
  deprecated: false,
}

function getData() {
    return "hello;"
}