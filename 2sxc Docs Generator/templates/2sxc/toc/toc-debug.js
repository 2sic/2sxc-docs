/*
 * IMPORTANT
 * DocFx seems to use an older JS version.
 * We seem to be forced to use the "exports.xxx" syntax
 * We cannot use lambdas, because they are not supported by DocFx
 */
const enabled = true;
const jsonDebugMaxLength = 100;
const prefix = 'TOC-JS: ';

function toJsonShort(obj, maxLength) {
  if (obj == null) return "(null)";
  const json = JSON.stringify(obj);
  maxLength = maxLength || jsonDebugMaxLength;
  if (json.length >= maxLength) return json.slice(0, maxLength) + "...";
  return json;
}

function message(msg, obj, maxLength) {
  return prefix + msg + toJsonShort(obj, maxLength);
}

function log(msg, obj, maxLength) {
  console.log(message(msg, obj, maxLength));
}

function warn(msg, obj, maxLength) {
  console.warn(message(msg, obj, maxLength));
}

function error(msg, obj, maxLength) {
  console.error(message(msg, obj, maxLength));
}

exports = {
  enabled: enabled,
  prefix: prefix,
  jsonDebugMaxLength: jsonDebugMaxLength,
  log: log,
  warn: warn,
  error: error,
};
