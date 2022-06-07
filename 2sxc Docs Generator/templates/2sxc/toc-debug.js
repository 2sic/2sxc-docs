
const enabled = true;
// exports.enabled = enabled;

const jsonDebugMaxLength = 100;
// exports.jsonDebugMaxLength = jsonDebugMaxLength;
const prefix = 'TOC-JS: ';
// exports.prefix = prefix;


function toJsonShort(obj, maxLength) {
  if (obj == null) return "(null)";
  const json = JSON.stringify(obj);
  maxLength = maxLength || jsonDebugMaxLength;
  if (json.length >= maxLength) return json.slice(0, maxLength) + "...";
  return json;
}
// exports.toJsonShort = toJsonShort;

function log(msg, obj, maxLength) {
  console.log(prefix + msg + toJsonShort(obj, maxLength));
}
// exports.log = log;

function warn(msg, obj, maxLength) {
  console.warn(prefix + msg + toJsonShort(obj, maxLength));
}
// exports.warn = warn;

exports = {
  enabled: enabled,
  prefix: prefix,
  jsonDebugMaxLength: jsonDebugMaxLength,
  log: log,
  warn: warn,
};
