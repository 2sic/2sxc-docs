//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
//#region node_modules/highlightjs-cshtml-razor/src/languages/cshtml-razor.js
var require_cshtml_razor = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function(hljs) {
		const SPECIAL_SYMBOL_CLASSNAME = "built_in";
		const CONTENT_REPLACER = {};
		const closedBrace = {
			begin: "}",
			className: SPECIAL_SYMBOL_CLASSNAME,
			endsParent: true
		};
		const braces = {
			begin: "{",
			end: "}",
			contains: [hljs.QUOTE_STRING_MODE, "self"]
		};
		const csbraces = {
			begin: "{",
			end: "}",
			contains: ["self"],
			skip: true
		};
		const quotes = {
			variants: [{
				begin: /"/,
				end: /"/,
				skip: true
			}, {
				begin: /'/,
				end: /'/,
				skip: true
			}],
			skip: true
		};
		const razorComment = hljs.COMMENT("@\\*", "\\*@", { relevance: 10 });
		const razorInlineExpression = {
			begin: "@[A-Za-z0-9\\._:-]+",
			returnBegin: true,
			end: "(\\r|\\n|<|\\s|\"|')",
			subLanguage: "csharp",
			contains: [
				{
					begin: "@",
					className: SPECIAL_SYMBOL_CLASSNAME
				},
				{
					begin: "\\[",
					end: "\\]",
					skip: true
				},
				{
					begin: "\\(",
					end: "\\)",
					skip: true
				}
			],
			returnEnd: true
		};
		const razorTextBlock = {
			begin: "[@]{0,1}<text>",
			returnBegin: true,
			end: "</text>",
			returnEnd: true,
			subLanguage: "cshtml-razor",
			contains: [{
				begin: "[@]{0,1}<text>",
				className: SPECIAL_SYMBOL_CLASSNAME
			}, {
				begin: "</text>",
				className: SPECIAL_SYMBOL_CLASSNAME,
				endsParent: true
			}]
		};
		const razorEscapeAt = {
			variants: [{ begin: "@@" }, { begin: "[a-zA-Z]+@" }],
			skip: true
		};
		const razorParenthesesBlock = {
			begin: "@\\(",
			end: "\\)",
			returnBegin: true,
			returnEnd: true,
			subLanguage: "csharp",
			contains: [
				{
					begin: "@\\(",
					className: SPECIAL_SYMBOL_CLASSNAME
				},
				{
					begin: "\\(",
					end: "\\)",
					subLanguage: "csharp",
					contains: [
						hljs.QUOTE_STRING_MODE,
						"self",
						razorTextBlock
					]
				},
				razorTextBlock,
				{
					begin: "\\)",
					className: SPECIAL_SYMBOL_CLASSNAME,
					endsParent: true
				}
			]
		};
		const xmlBlocks = getXmlBlocks(hljs, [razorInlineExpression, razorParenthesesBlock]);
		const razorDirectives = {
			begin: "^\\s*@(page|model|using|inherits|inject|layout)[^\\r\\n{\\(]*$",
			end: "$",
			returnBegin: true,
			returnEnd: true,
			contains: [{
				begin: "^\\s*@(page|model|using|inherits|inject|layout)",
				className: SPECIAL_SYMBOL_CLASSNAME
			}, {
				variants: [
					{
						begin: "\\r|\\n",
						endsParent: true
					},
					{
						begin: "\\s[^\\r\\n]+",
						end: "$"
					},
					{ begin: "$" }
				],
				className: "type",
				endsParent: true
			}]
		};
		const razorBlock = {
			variants: [{
				begin: "@\\{",
				end: "}"
			}, {
				begin: "@code\\s*\\{",
				end: "}"
			}],
			returnBegin: true,
			returnEnd: true,
			subLanguage: "csharp",
			contains: [
				{
					begin: "@(code\\s*)?\\{",
					className: SPECIAL_SYMBOL_CLASSNAME
				},
				CONTENT_REPLACER,
				csbraces,
				quotes,
				closedBrace
			]
		};
		const razorHelperBlock = {
			begin: "^\\s*@helper\\s+[^{\\s]+(?:\\s+[^{\\s]+)*\\s*{",
			returnBegin: true,
			returnEnd: true,
			end: "}",
			subLanguage: "cshtml-razor",
			contains: [
				{
					begin: "@helper",
					className: SPECIAL_SYMBOL_CLASSNAME
				},
				{
					begin: "{",
					className: SPECIAL_SYMBOL_CLASSNAME
				},
				closedBrace
			]
		};
		const razorCodeBlockVariants = [
			"for",
			"if",
			"switch",
			"while",
			"using",
			"lock",
			"foreach"
		].map((keyword) => ({
			begin: `@${keyword}(?![\\w\\d])[^{]*\\{`,
			end: "}"
		}));
		const elseVariants = [{ begin: "\\}\\s*else\\s*(if[^\\{]+|)\\{" }];
		const razorCodeBlock = {
			variants: razorCodeBlockVariants,
			returnBegin: true,
			returnEnd: true,
			subLanguage: "csharp",
			contains: [
				{
					variants: razorCodeBlockVariants.map(function(v) {
						return { begin: v.begin };
					}),
					returnBegin: true,
					contains: [
						{
							begin: "@",
							className: SPECIAL_SYMBOL_CLASSNAME
						},
						{
							variants: razorCodeBlockVariants.map(function(v) {
								return { begin: `${v.begin}`.substring(1, v.begin.length - 2) };
							}),
							subLanguage: "csharp"
						},
						{
							begin: "{",
							className: SPECIAL_SYMBOL_CLASSNAME
						}
					]
				},
				CONTENT_REPLACER,
				{
					variants: elseVariants,
					returnBegin: true,
					contains: [
						{
							begin: "}",
							className: SPECIAL_SYMBOL_CLASSNAME
						},
						{
							begin: elseVariants[0].begin.substring(2, elseVariants[0].begin.length - 2),
							subLanguage: "csharp"
						},
						{
							begin: "{",
							className: SPECIAL_SYMBOL_CLASSNAME
						}
					]
				},
				braces,
				closedBrace
			]
		};
		const razorTryBlock = {
			begin: "@try\\s*{",
			end: "}",
			returnBegin: true,
			returnEnd: true,
			subLanguage: "csharp",
			contains: [
				{
					begin: "@",
					className: SPECIAL_SYMBOL_CLASSNAME
				},
				{
					begin: "try\\s*{",
					subLanguage: "csharp"
				},
				{
					variants: [{ begin: "}\\s*catch\\s*\\([^\\)]+\\)\\s*{" }, { begin: "}\\s*finally\\s*{" }],
					returnBegin: true,
					contains: [
						{
							begin: "}",
							className: SPECIAL_SYMBOL_CLASSNAME
						},
						{
							variants: [{ begin: "\\s*catch\\s*\\([^\\)]+\\)\\s*" }, { begin: "\\s*finally\\s*" }],
							subLanguage: "csharp"
						},
						{
							begin: "{",
							className: SPECIAL_SYMBOL_CLASSNAME
						}
					]
				},
				CONTENT_REPLACER,
				braces,
				closedBrace
			]
		};
		const sectionBegin = "@section\\s+[a-zA-Z0-9]+\\s*{";
		const contains = [
			razorDirectives,
			razorHelperBlock,
			razorBlock,
			razorCodeBlock,
			{
				begin: sectionBegin,
				returnBegin: true,
				returnEnd: true,
				end: "}",
				subLanguage: "cshtml-razor",
				contains: [
					{
						begin: sectionBegin,
						className: SPECIAL_SYMBOL_CLASSNAME
					},
					braces,
					closedBrace
				]
			},
			{
				begin: "@await ",
				returnBegin: true,
				subLanguage: "csharp",
				end: "(\\r|\\n|<|\\s)",
				contains: [{
					begin: "@await ",
					className: SPECIAL_SYMBOL_CLASSNAME
				}, {
					begin: "[<\\r\\n]",
					endsParent: true
				}]
			},
			razorTryBlock,
			razorEscapeAt,
			razorTextBlock,
			razorComment,
			razorParenthesesBlock,
			{
				className: "meta",
				begin: "<!DOCTYPE",
				end: ">",
				relevance: 10,
				contains: [{
					begin: "\\[",
					end: "\\]"
				}]
			},
			{
				begin: "<\\!\\[CDATA\\[",
				end: "\\]\\]>",
				relevance: 10
			}
		].concat(xmlBlocks);
		[
			razorBlock,
			razorCodeBlock,
			razorTryBlock
		].forEach(function(mode) {
			const razorModes = contains.filter(function(c) {
				return c !== mode;
			});
			const replacerIndex = mode.contains.indexOf(CONTENT_REPLACER);
			mode.contains.splice.apply(mode.contains, [replacerIndex, 1].concat(razorModes));
		});
		return {
			aliases: [
				"cshtml",
				"razor",
				"razor-cshtml",
				"cshtml-razor"
			],
			contains
		};
	};
	function getXmlBlocks(hljs, additionalBlocks) {
		const xmlComment = hljs.COMMENT("<!--", "-->", { relevance: 10 });
		const xmlTagInternal = {
			endsWithParent: true,
			illegal: /</,
			relevance: 0,
			contains: [{
				className: "attr",
				begin: "[A-Za-z0-9\\._:-]+",
				relevance: 0
			}, {
				begin: /=\s*/,
				relevance: 0,
				contains: [{
					className: "string",
					variants: [
						{
							begin: /"/,
							end: /"/,
							contains: additionalBlocks
						},
						{
							begin: /'/,
							end: /'/,
							contains: additionalBlocks
						},
						{ begin: /[^\s"'=<>`]+/ }
					]
				}]
			}]
		};
		return [
			{
				className: "meta",
				begin: "<!DOCTYPE",
				end: ">",
				relevance: 10,
				contains: [{
					begin: "\\[",
					end: "\\]"
				}]
			},
			xmlComment,
			{
				begin: "<\\!\\[CDATA\\[",
				end: "\\]\\]>",
				relevance: 10
			},
			{
				className: "meta",
				begin: /<\?xml/,
				end: /\?>/,
				relevance: 10
			},
			{
				className: "tag",
				begin: "<style(?=\\s|>|$)",
				end: ">",
				keywords: { name: "style" },
				contains: [xmlTagInternal],
				starts: {
					end: "</style>",
					returnEnd: true,
					subLanguage: ["css", "xml"]
				}
			},
			{
				className: "tag",
				begin: "<script(?=\\s|>|$)",
				end: ">",
				keywords: { name: "script" },
				contains: [xmlTagInternal],
				starts: {
					end: "<\/script>",
					returnEnd: true,
					subLanguage: [
						"actionscript",
						"javascript",
						"handlebars",
						"xml"
					]
				}
			},
			{
				className: "tag",
				begin: "</?",
				end: "/?>",
				contains: [{
					className: "name",
					begin: /[^/><\s]+/,
					relevance: 0
				}, xmlTagInternal]
			}
		].concat(additionalBlocks);
	}
}));
//#endregion
//#region node_modules/js-yaml/dist/js-yaml.cjs.js
var require_js_yaml_cjs = /* @__PURE__ */ __commonJSMin(((exports) => {
	/*! js-yaml 5.2.3 https://github.com/nodeca/js-yaml @license MIT */
	Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
	var NOT_RESOLVED = Symbol("NOT_RESOLVED");
	var MERGE_KEY = Symbol("MERGE_KEY");
	function defineScalarTag(tagName, options) {
		var _options$implicit, _options$matchByTagPr, _options$implicitFirs, _options$identify, _options$represent, _options$representTag;
		return {
			tagName,
			nodeKind: "scalar",
			implicit: (_options$implicit = options.implicit) !== null && _options$implicit !== void 0 ? _options$implicit : false,
			matchByTagPrefix: (_options$matchByTagPr = options.matchByTagPrefix) !== null && _options$matchByTagPr !== void 0 ? _options$matchByTagPr : false,
			implicitFirstChars: (_options$implicitFirs = options.implicitFirstChars) !== null && _options$implicitFirs !== void 0 ? _options$implicitFirs : null,
			resolve: options.resolve,
			identify: (_options$identify = options.identify) !== null && _options$identify !== void 0 ? _options$identify : null,
			represent: (_options$represent = options.represent) !== null && _options$represent !== void 0 ? _options$represent : ((data) => String(data)),
			representTagName: (_options$representTag = options.representTagName) !== null && _options$representTag !== void 0 ? _options$representTag : null
		};
	}
	function defineSequenceTag(tagName, options) {
		var _options$matchByTagPr2, _options$finalize, _options$identify2, _options$represent2, _options$representTag2;
		const carrierIsResult = options.finalize === void 0;
		return {
			tagName,
			nodeKind: "sequence",
			implicit: false,
			matchByTagPrefix: (_options$matchByTagPr2 = options.matchByTagPrefix) !== null && _options$matchByTagPr2 !== void 0 ? _options$matchByTagPr2 : false,
			create: options.create,
			addItem: options.addItem,
			finalize: (_options$finalize = options.finalize) !== null && _options$finalize !== void 0 ? _options$finalize : ((carrier) => carrier),
			carrierIsResult,
			identify: (_options$identify2 = options.identify) !== null && _options$identify2 !== void 0 ? _options$identify2 : null,
			represent: (_options$represent2 = options.represent) !== null && _options$represent2 !== void 0 ? _options$represent2 : ((data) => data),
			representTagName: (_options$representTag2 = options.representTagName) !== null && _options$representTag2 !== void 0 ? _options$representTag2 : null
		};
	}
	function defineMappingTag(tagName, options) {
		var _options$matchByTagPr3, _options$finalize2, _options$identify3, _options$represent3, _options$representTag3;
		const carrierIsResult = options.finalize === void 0;
		return {
			tagName,
			nodeKind: "mapping",
			implicit: false,
			matchByTagPrefix: (_options$matchByTagPr3 = options.matchByTagPrefix) !== null && _options$matchByTagPr3 !== void 0 ? _options$matchByTagPr3 : false,
			create: options.create,
			addPair: options.addPair,
			has: options.has,
			keys: options.keys,
			get: options.get,
			finalize: (_options$finalize2 = options.finalize) !== null && _options$finalize2 !== void 0 ? _options$finalize2 : ((carrier) => carrier),
			carrierIsResult,
			identify: (_options$identify3 = options.identify) !== null && _options$identify3 !== void 0 ? _options$identify3 : null,
			represent: (_options$represent3 = options.represent) !== null && _options$represent3 !== void 0 ? _options$represent3 : ((data) => data),
			representTagName: (_options$representTag3 = options.representTagName) !== null && _options$representTag3 !== void 0 ? _options$representTag3 : null
		};
	}
	var strTag = defineScalarTag("tag:yaml.org,2002:str", {
		resolve: (source) => source,
		identify: (data) => typeof data === "string"
	});
	var NULL_VALUES$1 = [
		"",
		"~",
		"null",
		"Null",
		"NULL"
	];
	var nullCoreTag = defineScalarTag("tag:yaml.org,2002:null", {
		implicit: true,
		implicitFirstChars: [
			"",
			"~",
			"n",
			"N"
		],
		resolve: (source) => {
			if (NULL_VALUES$1.indexOf(source) !== -1) return null;
			return NOT_RESOLVED;
		},
		identify: (object) => object === null,
		represent: () => "null"
	});
	var nullJsonTag = defineScalarTag("tag:yaml.org,2002:null", {
		implicit: true,
		implicitFirstChars: ["n"],
		resolve: (source, isExplicit) => {
			if (source === "null" || isExplicit && source === "") return null;
			return NOT_RESOLVED;
		},
		identify: (object) => object === null,
		represent: () => "null"
	});
	var NULL_VALUES = [
		"",
		"~",
		"null",
		"Null",
		"NULL"
	];
	var nullYaml11Tag = defineScalarTag("tag:yaml.org,2002:null", {
		implicit: true,
		implicitFirstChars: [
			"",
			"~",
			"n",
			"N"
		],
		resolve: (source) => {
			if (NULL_VALUES.indexOf(source) !== -1) return null;
			return NOT_RESOLVED;
		},
		identify: (object) => object === null,
		represent: () => "null"
	});
	var TRUE_VALUES$2 = [
		"true",
		"True",
		"TRUE"
	];
	var FALSE_VALUES$2 = [
		"false",
		"False",
		"FALSE"
	];
	var boolCoreTag = defineScalarTag("tag:yaml.org,2002:bool", {
		implicit: true,
		implicitFirstChars: [
			"t",
			"T",
			"f",
			"F"
		],
		resolve: (source) => {
			if (TRUE_VALUES$2.indexOf(source) !== -1) return true;
			if (FALSE_VALUES$2.indexOf(source) !== -1) return false;
			return NOT_RESOLVED;
		},
		identify: (object) => Object.prototype.toString.call(object) === "[object Boolean]",
		represent: (object) => object ? "true" : "false"
	});
	var TRUE_VALUES$1 = ["true"];
	var FALSE_VALUES$1 = ["false"];
	var boolJsonTag = defineScalarTag("tag:yaml.org,2002:bool", {
		implicit: true,
		implicitFirstChars: ["t", "f"],
		resolve: (source) => {
			if (TRUE_VALUES$1.indexOf(source) !== -1) return true;
			if (FALSE_VALUES$1.indexOf(source) !== -1) return false;
			return NOT_RESOLVED;
		},
		identify: (object) => Object.prototype.toString.call(object) === "[object Boolean]",
		represent: (object) => object ? "true" : "false"
	});
	var TRUE_VALUES = [
		"true",
		"True",
		"TRUE",
		"y",
		"Y",
		"yes",
		"Yes",
		"YES",
		"on",
		"On",
		"ON"
	];
	var FALSE_VALUES = [
		"false",
		"False",
		"FALSE",
		"n",
		"N",
		"no",
		"No",
		"NO",
		"off",
		"Off",
		"OFF"
	];
	var boolYaml11Tag = defineScalarTag("tag:yaml.org,2002:bool", {
		implicit: true,
		implicitFirstChars: [
			"y",
			"Y",
			"n",
			"N",
			"t",
			"T",
			"f",
			"F",
			"o",
			"O"
		],
		resolve: (source) => {
			if (TRUE_VALUES.indexOf(source) !== -1) return true;
			if (FALSE_VALUES.indexOf(source) !== -1) return false;
			return NOT_RESOLVED;
		},
		identify: (object) => Object.prototype.toString.call(object) === "[object Boolean]",
		represent: (object) => object ? "true" : "false"
	});
	var YAML_INTEGER_IMPLICIT_PATTERN$1 = /* @__PURE__ */ new RegExp("^(?:0o[0-7]+|0x[0-9a-fA-F]+|[-+]?[0-9]+)$");
	var YAML_INTEGER_EXPLICIT_PATTERN$1 = /* @__PURE__ */ new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");
	function parseYamlInteger$2(source) {
		let value = source;
		let sign = 1;
		if (value[0] === "-" || value[0] === "+") {
			if (value[0] === "-") sign = -1;
			value = value.slice(1);
		}
		if (value.startsWith("0b")) return sign * parseInt(value.slice(2), 2);
		if (value.startsWith("0o")) return sign * parseInt(value.slice(2), 8);
		if (value.startsWith("0x")) return sign * parseInt(value.slice(2), 16);
		return sign * parseInt(value, 10);
	}
	function resolveYamlInteger$2(source, isExplicit) {
		if (isExplicit) {
			if (!YAML_INTEGER_EXPLICIT_PATTERN$1.test(source)) return NOT_RESOLVED;
		} else if (!YAML_INTEGER_IMPLICIT_PATTERN$1.test(source)) return NOT_RESOLVED;
		const result = parseYamlInteger$2(source);
		return Number.isFinite(result) ? result : NOT_RESOLVED;
	}
	var intCoreTag = defineScalarTag("tag:yaml.org,2002:int", {
		implicit: true,
		implicitFirstChars: [
			"-",
			"+",
			..."0123456789"
		],
		resolve: resolveYamlInteger$2,
		identify: (object) => Number.isInteger(object) && !Object.is(object, -0) && object.toString(10).indexOf("e") < 0,
		represent: (object) => object.toString(10)
	});
	var YAML_INTEGER_IMPLICIT_PATTERN = /* @__PURE__ */ new RegExp("^-?(?:0|[1-9][0-9]*)$");
	var YAML_INTEGER_EXPLICIT_PATTERN = /* @__PURE__ */ new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");
	function parseYamlInteger$1(source) {
		let value = source;
		let sign = 1;
		if (value[0] === "-" || value[0] === "+") {
			if (value[0] === "-") sign = -1;
			value = value.slice(1);
		}
		if (value.startsWith("0b")) return sign * parseInt(value.slice(2), 2);
		if (value.startsWith("0o")) return sign * parseInt(value.slice(2), 8);
		if (value.startsWith("0x")) return sign * parseInt(value.slice(2), 16);
		return sign * parseInt(value, 10);
	}
	function resolveYamlInteger$1(source, isExplicit) {
		if (isExplicit) {
			if (!YAML_INTEGER_EXPLICIT_PATTERN.test(source)) return NOT_RESOLVED;
		} else if (!YAML_INTEGER_IMPLICIT_PATTERN.test(source)) return NOT_RESOLVED;
		const result = parseYamlInteger$1(source);
		return Number.isFinite(result) ? result : NOT_RESOLVED;
	}
	var intJsonTag = defineScalarTag("tag:yaml.org,2002:int", {
		implicit: true,
		implicitFirstChars: ["-", ..."0123456789"],
		resolve: resolveYamlInteger$1,
		identify: (object) => Number.isInteger(object) && !Object.is(object, -0) && object.toString(10).indexOf("e") < 0,
		represent: (object) => object.toString(10)
	});
	var YAML_INTEGER_PATTERN = /* @__PURE__ */ new RegExp("^(?:[-+]?0b[0-1_]+|[-+]?0[0-7_]+|[-+]?0x[0-9a-fA-F_]+|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+|[-+]?(?:0|[1-9][0-9_]*))$");
	function parseYamlInteger(source) {
		let value = source.replace(/_/g, "");
		let sign = 1;
		if (value[0] === "-" || value[0] === "+") {
			if (value[0] === "-") sign = -1;
			value = value.slice(1);
		}
		if (value.startsWith("0b")) return sign * parseInt(value.slice(2), 2);
		if (value.startsWith("0x")) return sign * parseInt(value.slice(2), 16);
		if (value.includes(":")) {
			let result = 0;
			for (const part of value.split(":")) result = result * 60 + Number(part);
			return sign * result;
		}
		if (value !== "0" && value[0] === "0") return sign * parseInt(value, 8);
		return sign * parseInt(value, 10);
	}
	function resolveYamlInteger(source) {
		if (!YAML_INTEGER_PATTERN.test(source)) return NOT_RESOLVED;
		const result = parseYamlInteger(source);
		return Number.isFinite(result) ? result : NOT_RESOLVED;
	}
	var intYaml11Tag = defineScalarTag("tag:yaml.org,2002:int", {
		implicit: true,
		implicitFirstChars: [
			"-",
			"+",
			..."0123456789"
		],
		resolve: resolveYamlInteger,
		identify: (object) => Number.isInteger(object) && !Object.is(object, -0) && object.toString(10).indexOf("e") < 0,
		represent: (object) => object.toString(10)
	});
	var YAML_FLOAT_PATTERN$1 = /* @__PURE__ */ new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
	var YAML_FLOAT_SPECIAL_PATTERN$1 = /* @__PURE__ */ new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
	function resolveYamlFloat$2(source) {
		if (!YAML_FLOAT_PATTERN$1.test(source)) return NOT_RESOLVED;
		let value = source.toLowerCase();
		const sign = value[0] === "-" ? -1 : 1;
		if ("+-".includes(value[0])) value = value.slice(1);
		if (value === ".inf") return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
		if (value === ".nan") return NaN;
		const result = sign * parseFloat(value);
		if (Number.isFinite(result) || YAML_FLOAT_SPECIAL_PATTERN$1.test(source)) return result;
		return NOT_RESOLVED;
	}
	function representYamlFloat$2(object) {
		if (isNaN(object)) return ".nan";
		if (object === Number.POSITIVE_INFINITY) return ".inf";
		if (object === Number.NEGATIVE_INFINITY) return "-.inf";
		if (Object.is(object, -0)) return "-0.0";
		const result = object.toString(10);
		return /^[-+]?[0-9]+e/.test(result) ? result.replace("e", ".e") : result;
	}
	var floatCoreTag = defineScalarTag("tag:yaml.org,2002:float", {
		implicit: true,
		implicitFirstChars: [
			"-",
			"+",
			".",
			..."0123456789"
		],
		resolve: resolveYamlFloat$2,
		identify: (object) => typeof object === "number" && (!Number.isInteger(object) || Object.is(object, -0) || object.toString(10).indexOf("e") >= 0),
		represent: representYamlFloat$2
	});
	var YAML_FLOAT_IMPLICIT_PATTERN = /* @__PURE__ */ new RegExp("^-?(?:0|[1-9][0-9]*)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$");
	var YAML_FLOAT_EXPLICIT_PATTERN = /* @__PURE__ */ new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
	function resolveYamlFloat$1(source, isExplicit) {
		if (isExplicit) {
			if (!YAML_FLOAT_EXPLICIT_PATTERN.test(source)) return NOT_RESOLVED;
			let value = source.toLowerCase();
			const sign = value[0] === "-" ? -1 : 1;
			if ("+-".includes(value[0])) value = value.slice(1);
			if (value === ".inf") return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
			if (value === ".nan") return NaN;
			const result = sign * parseFloat(value);
			return Number.isFinite(result) ? result : NOT_RESOLVED;
		}
		if (!YAML_FLOAT_IMPLICIT_PATTERN.test(source)) return NOT_RESOLVED;
		const result = Number(source);
		if (Number.isFinite(result)) return result;
		return NOT_RESOLVED;
	}
	function representYamlFloat$1(object) {
		if (isNaN(object)) return ".nan";
		if (object === Number.POSITIVE_INFINITY) return ".inf";
		if (object === Number.NEGATIVE_INFINITY) return "-.inf";
		if (Object.is(object, -0)) return "-0.0";
		const result = object.toString(10);
		return /^[-+]?[0-9]+e/.test(result) ? result.replace("e", ".e") : result;
	}
	var floatJsonTag = defineScalarTag("tag:yaml.org,2002:float", {
		implicit: true,
		implicitFirstChars: ["-", ..."0123456789"],
		resolve: resolveYamlFloat$1,
		identify: (object) => typeof object === "number" && (!Number.isInteger(object) || Object.is(object, -0) || object.toString(10).indexOf("e") >= 0),
		represent: representYamlFloat$1
	});
	var YAML_FLOAT_PATTERN = /* @__PURE__ */ new RegExp("^(?:[-+]?(?:(?:[0-9][0-9_]*)?\\.[0-9_]*)(?:[eE][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
	var YAML_FLOAT_SPECIAL_PATTERN = /* @__PURE__ */ new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
	function resolveYamlFloat(source) {
		if (!YAML_FLOAT_PATTERN.test(source)) return NOT_RESOLVED;
		let value = source.toLowerCase().replace(/_/g, "");
		const sign = value[0] === "-" ? -1 : 1;
		if ("+-".includes(value[0])) value = value.slice(1);
		if (value === ".inf") return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
		if (value === ".nan") return NaN;
		let result = 0;
		if (value.includes(":")) {
			for (const part of value.split(":")) result = result * 60 + Number(part);
			result *= sign;
		} else result = sign * parseFloat(value);
		if (Number.isFinite(result) || YAML_FLOAT_SPECIAL_PATTERN.test(source)) return result;
		return NOT_RESOLVED;
	}
	function representYamlFloat(object) {
		if (isNaN(object)) return ".nan";
		if (object === Number.POSITIVE_INFINITY) return ".inf";
		if (object === Number.NEGATIVE_INFINITY) return "-.inf";
		if (Object.is(object, -0)) return "-0.0";
		const result = object.toString(10);
		return /^[-+]?[0-9]+e/.test(result) ? result.replace("e", ".e") : result;
	}
	var floatYaml11Tag = defineScalarTag("tag:yaml.org,2002:float", {
		implicit: true,
		implicitFirstChars: [
			"-",
			"+",
			".",
			..."0123456789"
		],
		resolve: resolveYamlFloat,
		identify: (object) => typeof object === "number" && (!Number.isInteger(object) || Object.is(object, -0) || object.toString(10).indexOf("e") >= 0),
		represent: representYamlFloat
	});
	var mergeTag = defineScalarTag("tag:yaml.org,2002:merge", {
		implicit: true,
		implicitFirstChars: ["<"],
		resolve: (source, isExplicit) => {
			if (source === "<<" || isExplicit && source === "") return MERGE_KEY;
			return NOT_RESOLVED;
		}
	});
	var BASE64_PATTERN = /^[A-Za-z0-9+/]*={0,2}$/;
	function resolveYamlBinary(source) {
		const input = source.replace(/\s/g, "");
		if (input.length % 4 !== 0 || !BASE64_PATTERN.test(input)) return NOT_RESOLVED;
		const binary = atob(input);
		const result = new Uint8Array(binary.length);
		for (let index = 0; index < binary.length; index++) result[index] = binary.charCodeAt(index);
		return result;
	}
	function representYamlBinary(object) {
		let binary = "";
		for (let index = 0; index < object.length; index++) binary += String.fromCharCode(object[index]);
		return btoa(binary);
	}
	var binaryTag = defineScalarTag("tag:yaml.org,2002:binary", {
		resolve: resolveYamlBinary,
		identify: (object) => Object.prototype.toString.call(object) === "[object Uint8Array]",
		represent: representYamlBinary
	});
	var YAML_DATE_REGEXP = /* @__PURE__ */ new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$");
	var YAML_TIMESTAMP_REGEXP = /* @__PURE__ */ new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");
	function makeUtcDate(year, month, day, hour = 0, minute = 0, second = 0, fraction = 0) {
		const date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
		date.setUTCFullYear(year, month, day);
		return date;
	}
	function resolveYamlTimestamp(source) {
		let match = YAML_DATE_REGEXP.exec(source);
		if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(source);
		if (match === null) return NOT_RESOLVED;
		const year = +match[1];
		const month = +match[2] - 1;
		const day = +match[3];
		if (!match[4]) {
			const date = makeUtcDate(year, month, day);
			if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month || date.getUTCDate() !== day) return NOT_RESOLVED;
			return date;
		}
		const hour = +match[4];
		const minute = +match[5];
		const second = +match[6];
		let fraction = 0;
		if (hour > 23 || minute > 59 || second > 59) return NOT_RESOLVED;
		if (match[7]) {
			let value = match[7].slice(0, 3);
			while (value.length < 3) value += "0";
			fraction = +value;
		}
		const date = makeUtcDate(year, month, day, hour, minute, second, fraction);
		if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month || date.getUTCDate() !== day) return NOT_RESOLVED;
		if (match[9]) {
			const offsetHour = +match[10];
			const offsetMinute = +(match[11] || 0);
			if (offsetHour > 23 || offsetMinute > 59) return NOT_RESOLVED;
			const offset = (offsetHour * 60 + offsetMinute) * 6e4;
			date.setTime(date.getTime() - (match[9] === "-" ? -offset : offset));
		}
		return date;
	}
	var timestampTag = defineScalarTag("tag:yaml.org,2002:timestamp", {
		implicit: true,
		implicitFirstChars: [..."0123456789"],
		resolve: resolveYamlTimestamp,
		identify: (object) => object instanceof Date,
		represent: (object) => object.toISOString()
	});
	var seqTag = defineSequenceTag("tag:yaml.org,2002:seq", {
		create: () => [],
		addItem: (container, item) => {
			container.push(item);
		},
		identify: Array.isArray
	});
	function isPlainObject(data) {
		if (data === null || typeof data !== "object" || Array.isArray(data)) return false;
		const prototype = Object.getPrototypeOf(data);
		return prototype === null || prototype === Object.prototype;
	}
	function pick(object, keys) {
		const result = {};
		for (const key of keys) if (object[key] !== void 0) result[key] = object[key];
		return result;
	}
	var omapTag = defineSequenceTag("tag:yaml.org,2002:omap", {
		create: () => ({
			list: [],
			seen: /* @__PURE__ */ new Set()
		}),
		addItem: (carrier, item) => {
			let key;
			if (item instanceof Map) {
				if (item.size !== 1) return "cannot resolve an ordered map item";
				key = item.keys().next().value;
			} else if (isPlainObject(item)) {
				const itemKeys = Object.keys(item);
				if (itemKeys.length !== 1) return "cannot resolve an ordered map item";
				key = itemKeys[0];
			} else return "cannot resolve an ordered map item";
			if (carrier.seen.has(key)) return "duplicate key in ordered map";
			carrier.seen.add(key);
			carrier.list.push(item);
			return "";
		},
		finalize: (carrier) => carrier.list
	});
	var pairsTag = defineSequenceTag("tag:yaml.org,2002:pairs", {
		create: () => [],
		addItem: (container, item) => {
			if (item instanceof Map) {
				if (item.size !== 1) return "cannot resolve a pairs item";
				container.push(item.entries().next().value);
				return "";
			}
			if (Object.prototype.toString.call(item) !== "[object Object]") return "cannot resolve a pairs item";
			const object = item;
			const keys = Object.keys(object);
			if (keys.length !== 1) return "cannot resolve a pairs item";
			container.push([keys[0], object[keys[0]]]);
			return "";
		}
	});
	var mapTag = defineMappingTag("tag:yaml.org,2002:map", {
		create: () => ({}),
		identify: isPlainObject,
		represent: (o) => {
			const map = /* @__PURE__ */ new Map();
			for (const key of Object.keys(o)) map.set(key, o[key]);
			return map;
		},
		addPair: (container, key, value) => {
			if (key !== null && typeof key === "object") return "object-based map does not support complex keys";
			const normalizedKey = String(key);
			if (normalizedKey === "__proto__") Object.defineProperty(container, normalizedKey, {
				value,
				enumerable: true,
				configurable: true,
				writable: true
			});
			else container[normalizedKey] = value;
			return "";
		},
		has: (container, key) => {
			if (key !== null && typeof key === "object") return false;
			return Object.prototype.hasOwnProperty.call(container, String(key));
		},
		keys: (container) => Object.keys(container),
		get: (container, key) => {
			const normalizedKey = String(key);
			if (!Object.prototype.hasOwnProperty.call(container, normalizedKey)) return null;
			return container[normalizedKey];
		}
	});
	var setTag = defineMappingTag("tag:yaml.org,2002:set", {
		create: () => /* @__PURE__ */ new Set(),
		identify: (data) => data instanceof Set,
		represent: (data) => {
			const map = /* @__PURE__ */ new Map();
			for (const key of data) map.set(key, null);
			return map;
		},
		addPair: (container, key, value) => {
			if (value !== null) return "cannot resolve a set item";
			container.add(key);
			return "";
		},
		has: (container, key) => container.has(key),
		keys: (container) => container.keys(),
		get: () => null
	});
	function _typeof(o) {
		"@babel/helpers - typeof";
		return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
			return typeof o;
		} : function(o) {
			return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
		}, _typeof(o);
	}
	function toPrimitive(t, r) {
		if ("object" != _typeof(t) || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != _typeof(i)) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	function toPropertyKey(t) {
		var i = toPrimitive(t, "string");
		return "symbol" == _typeof(i) ? i : i + "";
	}
	function _defineProperty(e, r, t) {
		return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	function createTagDefinitionMap() {
		return {
			scalar: Object.create(null),
			sequence: Object.create(null),
			mapping: Object.create(null)
		};
	}
	function createTagDefinitionListMap() {
		return {
			scalar: [],
			sequence: [],
			mapping: []
		};
	}
	function compileTags(tags) {
		const result = [];
		for (const tag of tags) {
			let index = result.length;
			for (let previousIndex = 0; previousIndex < result.length; previousIndex++) {
				const previous = result[previousIndex];
				if (previous.nodeKind === tag.nodeKind && previous.tagName === tag.tagName && previous.matchByTagPrefix === tag.matchByTagPrefix) {
					index = previousIndex;
					break;
				}
			}
			result[index] = tag;
		}
		return result;
	}
	var Schema = class Schema {
		constructor(tags) {
			_defineProperty(this, "tags", void 0);
			_defineProperty(this, "implicitScalarTags", void 0);
			_defineProperty(this, "implicitScalarByFirstChar", void 0);
			_defineProperty(this, "implicitScalarAnyFirstChar", void 0);
			_defineProperty(this, "defaultScalarTag", void 0);
			_defineProperty(this, "defaultSequenceTag", void 0);
			_defineProperty(this, "defaultMappingTag", void 0);
			_defineProperty(this, "exact", void 0);
			_defineProperty(this, "prefix", void 0);
			const compiledTags = compileTags(tags);
			const implicitScalarTags = [];
			const exact = createTagDefinitionMap();
			const prefix = createTagDefinitionListMap();
			for (const tag of compiledTags) {
				if (tag.nodeKind === "scalar" && tag.implicit) {
					if (tag.matchByTagPrefix) throw new Error("Implicit scalar tags cannot match by tag prefix");
					implicitScalarTags.push(tag);
				}
				switch (tag.nodeKind) {
					case "scalar":
						if (tag.matchByTagPrefix) prefix.scalar.push(tag);
						else exact.scalar[tag.tagName] = tag;
						break;
					case "sequence":
						if (tag.matchByTagPrefix) prefix.sequence.push(tag);
						else exact.sequence[tag.tagName] = tag;
						break;
					case "mapping": if (tag.matchByTagPrefix) prefix.mapping.push(tag);
					else exact.mapping[tag.tagName] = tag;
				}
			}
			const implicitScalarAnyFirstChar = implicitScalarTags.filter((tag) => tag.implicitFirstChars === null);
			const keys = /* @__PURE__ */ new Set();
			for (const tag of implicitScalarTags) if (tag.implicitFirstChars !== null) for (const key of tag.implicitFirstChars) keys.add(key);
			const implicitScalarByFirstChar = /* @__PURE__ */ new Map();
			for (const key of keys) implicitScalarByFirstChar.set(key, implicitScalarTags.filter((tag) => tag.implicitFirstChars === null || tag.implicitFirstChars.indexOf(key) !== -1));
			const defaultScalarTag = exact.scalar["tag:yaml.org,2002:str"];
			if (!defaultScalarTag) throw new Error("schema does not define the default scalar tag (tag:yaml.org,2002:str)");
			this.tags = compiledTags;
			this.implicitScalarTags = implicitScalarTags;
			this.implicitScalarByFirstChar = implicitScalarByFirstChar;
			this.implicitScalarAnyFirstChar = implicitScalarAnyFirstChar;
			this.defaultScalarTag = defaultScalarTag;
			this.defaultSequenceTag = exact.sequence["tag:yaml.org,2002:seq"];
			this.defaultMappingTag = exact.mapping["tag:yaml.org,2002:map"];
			this.exact = exact;
			this.prefix = prefix;
		}
		withTags(...tags) {
			let flatTags = [];
			for (const tag of tags) flatTags = flatTags.concat(tag);
			return new Schema([...this.tags, ...flatTags]);
		}
	};
	var FAILSAFE_SCHEMA = new Schema([
		strTag,
		seqTag,
		mapTag
	]);
	var JSON_SCHEMA = new Schema([
		...FAILSAFE_SCHEMA.tags,
		nullJsonTag,
		boolJsonTag,
		intJsonTag,
		floatJsonTag
	]);
	var CORE_SCHEMA = new Schema([
		...FAILSAFE_SCHEMA.tags,
		nullCoreTag,
		boolCoreTag,
		intCoreTag,
		floatCoreTag
	]);
	var YAML11_SCHEMA = new Schema([
		...FAILSAFE_SCHEMA.tags,
		nullYaml11Tag,
		boolYaml11Tag,
		intYaml11Tag,
		floatYaml11Tag,
		timestampTag,
		mergeTag,
		binaryTag,
		omapTag,
		pairsTag,
		setTag
	]);
	var realMapTag = defineMappingTag("tag:yaml.org,2002:map", {
		create: () => /* @__PURE__ */ new Map(),
		addPair: (container, key, value) => {
			container.set(key, value);
			return "";
		},
		has: (container, key) => container.has(key),
		keys: (container) => container.keys(),
		get: (container, key) => container.get(key),
		identify: (data) => data instanceof Map || isPlainObject(data),
		represent: (data) => {
			if (data instanceof Map) return data;
			const map = /* @__PURE__ */ new Map();
			const obj = data;
			for (const key of Object.keys(obj)) map.set(key, obj[key]);
			return map;
		}
	});
	function normalizeKey(key) {
		if (Array.isArray(key)) {
			const array = Array.prototype.slice.call(key);
			for (let index = 0; index < array.length; index++) {
				if (Array.isArray(array[index])) return null;
				if (typeof array[index] === "object" && Object.prototype.toString.call(array[index]) === "[object Object]") array[index] = "[object Object]";
			}
			return String(array);
		}
		if (typeof key === "object" && Object.prototype.toString.call(key) === "[object Object]") return "[object Object]";
		return String(key);
	}
	var legacyMapTag = defineMappingTag("tag:yaml.org,2002:map", {
		create: () => ({}),
		identify: isPlainObject,
		represent: (o) => {
			const map = /* @__PURE__ */ new Map();
			for (const key of Object.keys(o)) map.set(key, o[key]);
			return map;
		},
		addPair: (container, key, value) => {
			const normalizedKey = normalizeKey(key);
			if (normalizedKey === null) return "nested arrays are not supported inside keys";
			if (normalizedKey === "__proto__") Object.defineProperty(container, normalizedKey, {
				value,
				enumerable: true,
				configurable: true,
				writable: true
			});
			else container[normalizedKey] = value;
			return "";
		},
		has: (container, key) => {
			const normalizedKey = normalizeKey(key);
			return normalizedKey !== null && Object.prototype.hasOwnProperty.call(container, normalizedKey);
		},
		keys: (container) => Object.keys(container),
		get: (container, key) => {
			const normalizedKey = String(key);
			if (!Object.prototype.hasOwnProperty.call(container, normalizedKey)) return null;
			return container[normalizedKey];
		}
	});
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread2(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				_defineProperty(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	var DEFAULT_SNIPPET_OPTIONS = {
		maxLength: 79,
		indent: 1,
		linesBefore: 3,
		linesAfter: 2
	};
	function getLine(buffer, lineStart, lineEnd, position, maxLineLength) {
		let head = "";
		let tail = "";
		const maxHalfLength = Math.floor(maxLineLength / 2) - 1;
		if (position - lineStart > maxHalfLength) {
			head = " ... ";
			lineStart = position - maxHalfLength + head.length;
		}
		if (lineEnd - position > maxHalfLength) {
			tail = " ...";
			lineEnd = position + maxHalfLength - tail.length;
		}
		return {
			str: head + buffer.slice(lineStart, lineEnd).replace(/\t/g, "→") + tail,
			pos: position - lineStart + head.length
		};
	}
	function padStart(string, max) {
		return " ".repeat(Math.max(max - string.length, 0)) + string;
	}
	function makeSnippet(mark, options) {
		if (!mark.buffer) return null;
		const opts = _objectSpread2(_objectSpread2({}, DEFAULT_SNIPPET_OPTIONS), options);
		const re = /\r?\n|\r|\0/g;
		const lineStarts = [0];
		const lineEnds = [];
		let match;
		let foundLineNo = -1;
		while (match = re.exec(mark.buffer)) {
			lineEnds.push(match.index);
			lineStarts.push(match.index + match[0].length);
			if (mark.position <= match.index && foundLineNo < 0) foundLineNo = lineStarts.length - 2;
		}
		if (foundLineNo < 0) foundLineNo = lineStarts.length - 1;
		let result = "";
		const lineNoLength = Math.min(mark.line + opts.linesAfter, lineEnds.length).toString().length;
		const maxLineLength = opts.maxLength - (opts.indent + lineNoLength + 3);
		for (let i = 1; i <= opts.linesBefore; i++) {
			if (foundLineNo - i < 0) break;
			const line = getLine(mark.buffer, lineStarts[foundLineNo - i], lineEnds[foundLineNo - i], mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i]), maxLineLength);
			result = `${" ".repeat(opts.indent)}${padStart((mark.line - i + 1).toString(), lineNoLength)} | ${line.str}\n${result}`;
		}
		const line = getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
		result += `${" ".repeat(opts.indent)}${padStart((mark.line + 1).toString(), lineNoLength)} | ${line.str}\n`;
		result += `${"-".repeat(opts.indent + lineNoLength + 3 + line.pos)}^\n`;
		for (let i = 1; i <= opts.linesAfter; i++) {
			if (foundLineNo + i >= lineEnds.length) break;
			const line = getLine(mark.buffer, lineStarts[foundLineNo + i], lineEnds[foundLineNo + i], mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i]), maxLineLength);
			result += `${" ".repeat(opts.indent)}${padStart((mark.line + i + 1).toString(), lineNoLength)} | ${line.str}\n`;
		}
		return result.replace(/\n$/, "");
	}
	function formatError(exception, compact) {
		let where = "";
		if (!exception.mark) return exception.reason;
		if (exception.mark.name) where += `in "${exception.mark.name}" `;
		where += `(${exception.mark.line + 1}:${exception.mark.column + 1})`;
		if (!compact && exception.mark.snippet) where += `\n\n${exception.mark.snippet}`;
		return `${exception.reason} ${where}`;
	}
	var YAMLException = class extends Error {
		constructor(reason, mark) {
			super();
			_defineProperty(this, "reason", void 0);
			_defineProperty(this, "mark", void 0);
			this.name = "YAMLException";
			this.reason = reason;
			this.mark = mark;
			this.message = formatError(this, false);
			if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
		}
		toString(compact) {
			return `${this.name}: ${formatError(this, compact)}`;
		}
	};
	function throwErrorAt(source, position, message, filename = "") {
		let line = 0;
		let lineStart = 0;
		for (let index = 0; index < position; index++) {
			const ch = source.charCodeAt(index);
			if (ch === 10) {
				line++;
				lineStart = index + 1;
			} else if (ch === 13) {
				line++;
				if (source.charCodeAt(index + 1) === 10) index++;
				lineStart = index + 1;
			}
		}
		const mark = {
			name: filename,
			buffer: source,
			position,
			line,
			column: position - lineStart
		};
		mark.snippet = makeSnippet(mark);
		throw new YAMLException(message, mark);
	}
	var EVENT_DOCUMENT = 1;
	var EVENT_SEQUENCE = 2;
	var EVENT_MAPPING = 3;
	var EVENT_SCALAR = 4;
	var EVENT_ALIAS = 5;
	var EVENT_POP = 6;
	var SCALAR_STYLE_PLAIN = 1;
	var SCALAR_STYLE_SINGLE_QUOTED = 2;
	var SCALAR_STYLE_DOUBLE_QUOTED = 3;
	var SCALAR_STYLE_LITERAL_BLOCK = 4;
	var SCALAR_STYLE_FOLDED_BLOCK = 5;
	var COLLECTION_STYLE_BLOCK = 1;
	var COLLECTION_STYLE_FLOW = 2;
	var CHOMPING_CLIP = 1;
	var CHOMPING_STRIP = 2;
	var CHOMPING_KEEP = 3;
	var NO_RANGE$3 = -1;
	function simpleEscapeSequence(c) {
		switch (c) {
			case 48: return "\0";
			case 97: return "\x07";
			case 98: return "\b";
			case 116: return "	";
			case 9: return "	";
			case 110: return "\n";
			case 118: return "\v";
			case 102: return "\f";
			case 114: return "\r";
			case 101: return "\x1B";
			case 32: return " ";
			case 34: return "\"";
			case 47: return "/";
			case 92: return "\\";
			case 78: return "";
			case 95: return "\xA0";
			case 76: return "\u2028";
			case 80: return "\u2029";
			default: return "";
		}
	}
	var simpleEscapeCheck = new Array(256);
	var simpleEscapeMap = new Array(256);
	for (let i = 0; i < 256; i++) {
		simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
		simpleEscapeMap[i] = simpleEscapeSequence(i);
	}
	function charFromCodepoint(c) {
		if (c <= 65535) return String.fromCharCode(c);
		return String.fromCharCode((c - 65536 >> 10) + 55296, (c - 65536 & 1023) + 56320);
	}
	function fromHexCode$1(c) {
		if (c >= 48 && c <= 57) return c - 48;
		return (c | 32) - 97 + 10;
	}
	function escapedHexLen$1(c) {
		if (c === 120) return 2;
		if (c === 117) return 4;
		return 8;
	}
	function skipFoldedBreaks(input, position, end) {
		let breaks = 0;
		while (position < end) {
			const ch = input.charCodeAt(position);
			if (ch === 10) {
				breaks++;
				position++;
			} else if (ch === 13) {
				breaks++;
				position++;
				if (input.charCodeAt(position) === 10) position++;
			} else if (ch === 32 || ch === 9) position++;
			else break;
		}
		return {
			position,
			breaks
		};
	}
	function foldedBreaks(count) {
		if (count === 1) return " ";
		return "\n".repeat(count - 1);
	}
	function getPlainValue(input, start, end) {
		let result = "";
		let position = start;
		let captureStart = start;
		let captureEnd = start;
		while (position < end) {
			const ch = input.charCodeAt(position);
			if (ch === 10 || ch === 13) {
				result += input.slice(captureStart, captureEnd);
				const fold = skipFoldedBreaks(input, position, end);
				result += foldedBreaks(fold.breaks);
				position = captureStart = captureEnd = fold.position;
			} else {
				position++;
				if (ch !== 32 && ch !== 9) captureEnd = position;
			}
		}
		return result + input.slice(captureStart, captureEnd);
	}
	function getSingleQuotedValue(input, start, end) {
		let result = "";
		let position = start;
		let captureStart = start;
		let captureEnd = start;
		while (position < end) {
			const ch = input.charCodeAt(position);
			if (ch === 39) {
				result += input.slice(captureStart, position) + "'";
				position += 2;
				captureStart = captureEnd = position;
			} else if (ch === 10 || ch === 13) {
				result += input.slice(captureStart, captureEnd);
				const fold = skipFoldedBreaks(input, position, end);
				result += foldedBreaks(fold.breaks);
				position = captureStart = captureEnd = fold.position;
			} else {
				position++;
				if (ch !== 32 && ch !== 9) captureEnd = position;
			}
		}
		return result + input.slice(captureStart, end);
	}
	function getDoubleQuotedValue(input, start, end) {
		let result = "";
		let position = start;
		let captureStart = start;
		let captureEnd = start;
		while (position < end) {
			const ch = input.charCodeAt(position);
			if (ch === 92) {
				result += input.slice(captureStart, position);
				position++;
				const escaped = input.charCodeAt(position);
				if (escaped === 10 || escaped === 13) position = skipFoldedBreaks(input, position, end).position;
				else if (escaped < 256 && simpleEscapeCheck[escaped]) {
					result += simpleEscapeMap[escaped];
					position++;
				} else {
					let hexLength = escapedHexLen$1(escaped);
					let hexResult = 0;
					for (; hexLength > 0; hexLength--) {
						position++;
						const digit = fromHexCode$1(input.charCodeAt(position));
						hexResult = (hexResult << 4) + digit;
					}
					result += charFromCodepoint(hexResult);
					position++;
				}
				captureStart = captureEnd = position;
			} else if (ch === 10 || ch === 13) {
				result += input.slice(captureStart, captureEnd);
				const fold = skipFoldedBreaks(input, position, end);
				result += foldedBreaks(fold.breaks);
				position = captureStart = captureEnd = fold.position;
			} else {
				position++;
				if (ch !== 32 && ch !== 9) captureEnd = position;
			}
		}
		return result + input.slice(captureStart, end);
	}
	function getBlockValue(input, start, end, indent, chomping, folded) {
		const textIndent = indent < 0 ? 0 : indent;
		const region = input.slice(start, end).replace(/\r\n?/g, "\n");
		const lines = region === "" ? [] : (region.endsWith("\n") ? region.slice(0, -1) : region).split("\n");
		let result = "";
		let didReadContent = false;
		let emptyLines = 0;
		let atMoreIndented = false;
		for (const line of lines) {
			let column = 0;
			while (column < textIndent && line.charCodeAt(column) === 32) column++;
			if (indent < 0 || column >= line.length) {
				emptyLines++;
				continue;
			}
			const content = line.slice(textIndent);
			const first = content.charCodeAt(0);
			if (folded) if (first === 32 || first === 9) {
				atMoreIndented = true;
				result += "\n".repeat(didReadContent ? 1 + emptyLines : emptyLines);
			} else if (atMoreIndented) {
				atMoreIndented = false;
				result += "\n".repeat(emptyLines + 1);
			} else if (emptyLines === 0) {
				if (didReadContent) result += " ";
			} else result += "\n".repeat(emptyLines);
			else result += "\n".repeat(didReadContent ? 1 + emptyLines : emptyLines);
			result += content;
			didReadContent = true;
			emptyLines = 0;
		}
		if (chomping === 3) result += "\n".repeat(didReadContent ? 1 + emptyLines : emptyLines);
		else if (chomping !== 2) {
			if (didReadContent) result += "\n";
		}
		return result;
	}
	function getScalarValue(input, scalar) {
		if (scalar.valueStart === NO_RANGE$3) return "";
		const { valueStart, valueEnd } = scalar;
		if (scalar.fast) return input.slice(valueStart, valueEnd);
		switch (scalar.style) {
			case 2: return getSingleQuotedValue(input, valueStart, valueEnd);
			case 3: return getDoubleQuotedValue(input, valueStart, valueEnd);
			case 4: return getBlockValue(input, valueStart, valueEnd, scalar.indent, scalar.chomping, false);
			case 5: return getBlockValue(input, valueStart, valueEnd, scalar.indent, scalar.chomping, true);
			default: return getPlainValue(input, valueStart, valueEnd);
		}
	}
	var DEFAULT_TAG_HANDLERS = Object.assign(Object.create(null), {
		"!": "!",
		"!!": "tag:yaml.org,2002:"
	});
	function tagPercentEncode(source) {
		return encodeURI(source).replace(/!/g, "%21");
	}
	function tagNameFull(rawTag, tagHandlers) {
		var _ref, _tagHandlers$handle;
		if (rawTag.startsWith("!<") && rawTag.endsWith(">")) return decodeURIComponent(rawTag.slice(2, -1));
		const handleEnd = rawTag.indexOf("!", 1);
		const handle = handleEnd === -1 ? "!" : rawTag.slice(0, handleEnd + 1);
		const prefix = (_ref = (_tagHandlers$handle = tagHandlers === null || tagHandlers === void 0 ? void 0 : tagHandlers[handle]) !== null && _tagHandlers$handle !== void 0 ? _tagHandlers$handle : DEFAULT_TAG_HANDLERS[handle]) !== null && _ref !== void 0 ? _ref : handle;
		return decodeURIComponent(prefix) + decodeURIComponent(rawTag.slice(handle.length));
	}
	function tagNameShort(fullTag) {
		let tag = fullTag;
		if (tag.charCodeAt(0) === 33) {
			tag = tag.slice(1);
			return `!${tagPercentEncode(tag)}`;
		}
		if (tag.slice(0, 18) === "tag:yaml.org,2002:") return `!!${tagPercentEncode(tag.slice(18))}`;
		return `!<${tagPercentEncode(tag)}>`;
	}
	var NO_RANGE$2 = -1;
	var DEFAULT_CONSTRUCTOR_OPTIONS = {
		filename: "",
		schema: CORE_SCHEMA,
		json: false,
		maxTotalMergeKeys: 1e4,
		maxAliases: -1
	};
	function eventPosition$1(event) {
		if ("tagStart" in event && event.tagStart !== NO_RANGE$2) return event.tagStart;
		if ("anchorStart" in event && event.anchorStart !== NO_RANGE$2) return event.anchorStart;
		if ("valueStart" in event && event.valueStart !== NO_RANGE$2) return event.valueStart;
		if ("start" in event) return event.start;
		return 0;
	}
	function throwError$1(state, message) {
		throwErrorAt(state.source, state.position, message, state.filename);
	}
	function finalizeCollection(state, position, tag, carrier) {
		try {
			return tag.finalize(carrier);
		} catch (error) {
			if (error instanceof YAMLException) throw error;
			throwErrorAt(state.source, position, error instanceof Error ? error.message : String(error), state.filename);
		}
	}
	function lookupTag(exact, prefix, tagName) {
		const exactTag = exact[tagName];
		if (exactTag) return exactTag;
		for (const tag of prefix) if (tagName.startsWith(tag.tagName)) return tag;
	}
	function findExplicitTag(state, exact, prefix, tagName, nodeKind) {
		const tag = lookupTag(exact, prefix, tagName);
		if (tag) return tag;
		throwError$1(state, `unknown ${nodeKind} tag !<${tagName}>`);
	}
	function constructScalar(state, event) {
		const source = getScalarValue(state.source, event);
		const rawTag = event.tagStart === NO_RANGE$2 ? "" : state.source.slice(event.tagStart, event.tagEnd);
		const strTag = state.schema.defaultScalarTag;
		if (rawTag !== "") {
			var _lookupTag;
			if (rawTag === "!") return {
				value: source,
				tag: strTag
			};
			const tagName = tagNameFull(rawTag, state.tagHandlers);
			const scalarTag = lookupTag(state.schema.exact.scalar, state.schema.prefix.scalar, tagName);
			if (scalarTag) {
				const result = scalarTag.resolve(source, true, tagName);
				if (result === NOT_RESOLVED) throwError$1(state, `cannot resolve a node with !<${tagName}> explicit tag`);
				return {
					value: result,
					tag: scalarTag
				};
			}
			const collectionTagDef = (_lookupTag = lookupTag(state.schema.exact.mapping, state.schema.prefix.mapping, tagName)) !== null && _lookupTag !== void 0 ? _lookupTag : lookupTag(state.schema.exact.sequence, state.schema.prefix.sequence, tagName);
			if (collectionTagDef) {
				if (source !== "") throwError$1(state, `cannot resolve a node with !<${tagName}> explicit tag`);
				const carrier = collectionTagDef.create(tagName);
				return {
					value: collectionTagDef.carrierIsResult ? carrier : finalizeCollection(state, state.position, collectionTagDef, carrier),
					tag: collectionTagDef
				};
			}
			throwError$1(state, `unknown scalar tag !<${tagName}>`);
		}
		if (event.style === 1) {
			var _state$schema$implici;
			const candidates = (_state$schema$implici = state.schema.implicitScalarByFirstChar.get(source.charAt(0))) !== null && _state$schema$implici !== void 0 ? _state$schema$implici : state.schema.implicitScalarAnyFirstChar;
			for (const tag of candidates) {
				const result = tag.resolve(source, false, tag.tagName);
				if (result !== NOT_RESOLVED) return {
					value: result,
					tag
				};
			}
		}
		return {
			value: strTag.resolve(source, false, strTag.tagName),
			tag: strTag
		};
	}
	function collectionTag(state, event, exact, prefix, defaultTagName, nodeKind) {
		const rawTag = event.tagStart === NO_RANGE$2 ? "" : state.source.slice(event.tagStart, event.tagEnd);
		const tagName = rawTag === "" || rawTag === "!" ? defaultTagName : tagNameFull(rawTag, state.tagHandlers);
		return {
			tagName,
			tag: findExplicitTag(state, exact, prefix, tagName, nodeKind)
		};
	}
	function isMappingTag(tag) {
		return tag.nodeKind === "mapping";
	}
	function mergeKeys(state, frame, source, sourceTag) {
		for (const sourceKey of sourceTag.keys(source)) {
			var _frame$overridable;
			if (state.maxTotalMergeKeys !== -1 && ++state.totalMergeKeys > state.maxTotalMergeKeys) throwError$1(state, `merge keys exceeded maxTotalMergeKeys (${state.maxTotalMergeKeys})`);
			if (frame.tag.has(frame.value, sourceKey)) continue;
			const err = frame.tag.addPair(frame.value, sourceKey, sourceTag.get(source, sourceKey));
			if (err) throwError$1(state, err);
			((_frame$overridable = frame.overridable) !== null && _frame$overridable !== void 0 ? _frame$overridable : frame.overridable = /* @__PURE__ */ new Set()).add(sourceKey);
		}
	}
	function mergeSource(state, frame, source, sourceTag) {
		state.position = frame.keyPosition;
		if (isMappingTag(sourceTag)) mergeKeys(state, frame, source, sourceTag);
		else if (sourceTag.nodeKind === "sequence" && Array.isArray(source)) for (const element of source) mergeKeys(state, frame, element, frame.tag);
		else throwError$1(state, "cannot merge mappings; the provided source object is unacceptable");
	}
	function addMappingValue(state, frame, key, value, tag) {
		var _frame$overridable2, _frame$overridable3;
		state.position = frame.keyPosition;
		if (key === MERGE_KEY) {
			mergeSource(state, frame, value, tag);
			return;
		}
		if (!state.json && frame.tag.has(frame.value, key) && !((_frame$overridable2 = frame.overridable) === null || _frame$overridable2 === void 0 ? void 0 : _frame$overridable2.has(key))) throwError$1(state, "duplicated mapping key");
		const err = frame.tag.addPair(frame.value, key, value);
		if (err) throwError$1(state, err);
		(_frame$overridable3 = frame.overridable) === null || _frame$overridable3 === void 0 || _frame$overridable3.delete(key);
	}
	function addValue(state, value, tag) {
		const frame = state.frames[state.frames.length - 1];
		if (frame.kind === "document") {
			frame.value = value;
			frame.hasValue = true;
		} else if (frame.kind === "sequence") {
			if (frame.merge) {
				if (!isMappingTag(tag)) throwError$1(state, "cannot merge mappings; the provided source object is unacceptable");
			}
			const err = frame.tag.addItem(frame.value, value, frame.index++);
			if (err) throwError$1(state, err);
		} else if (frame.hasKey) {
			const key = frame.key;
			frame.key = void 0;
			frame.hasKey = false;
			addMappingValue(state, frame, key, value, tag);
		} else {
			frame.key = value;
			frame.keyPosition = state.position;
			frame.hasKey = true;
		}
	}
	function storeAnchor(state, event, value, tag, isValueFinal) {
		if (event.anchorStart !== NO_RANGE$2) {
			const anchor = {
				value,
				tag,
				isValueFinal
			};
			state.anchors.set(state.source.slice(event.anchorStart, event.anchorEnd), anchor);
			return anchor;
		}
		return null;
	}
	function constructFromEvents(events, options) {
		const state = _objectSpread2(_objectSpread2(_objectSpread2({}, DEFAULT_CONSTRUCTOR_OPTIONS), options), {}, {
			events,
			documents: [],
			eventIndex: 0,
			position: 0,
			frames: [],
			anchors: /* @__PURE__ */ new Map(),
			tagHandlers: Object.create(null),
			totalMergeKeys: 0,
			aliasCount: 0
		});
		while (state.eventIndex < state.events.length) {
			const event = state.events[state.eventIndex++];
			state.position = eventPosition$1(event);
			switch (event.type) {
				case 1:
					state.anchors = /* @__PURE__ */ new Map();
					state.aliasCount = 0;
					state.tagHandlers = Object.create(null);
					for (const directive of event.directives) if (directive.kind === "tag") state.tagHandlers[directive.handle] = directive.prefix;
					state.frames.push({
						kind: "document",
						position: state.position,
						value: void 0,
						hasValue: false
					});
					break;
				case 4: {
					const { value, tag } = constructScalar(state, event);
					storeAnchor(state, event, value, tag, true);
					addValue(state, value, tag);
					break;
				}
				case 2: {
					const definition = collectionTag(state, event, state.schema.exact.sequence, state.schema.prefix.sequence, "tag:yaml.org,2002:seq", "sequence");
					const value = definition.tag.create(definition.tagName);
					const anchor = storeAnchor(state, event, value, definition.tag, definition.tag.carrierIsResult);
					const parent = state.frames[state.frames.length - 1];
					const merge = parent !== void 0 && parent.kind === "mapping" && parent.hasKey && parent.key === MERGE_KEY;
					state.frames.push({
						kind: "sequence",
						position: state.position,
						value,
						tag: definition.tag,
						anchor,
						index: 0,
						merge
					});
					break;
				}
				case 3: {
					const definition = collectionTag(state, event, state.schema.exact.mapping, state.schema.prefix.mapping, "tag:yaml.org,2002:map", "mapping");
					const value = definition.tag.create(definition.tagName);
					const anchor = storeAnchor(state, event, value, definition.tag, definition.tag.carrierIsResult);
					state.frames.push({
						kind: "mapping",
						position: state.position,
						value,
						tag: definition.tag,
						anchor,
						key: void 0,
						keyPosition: state.position,
						hasKey: false,
						overridable: null
					});
					break;
				}
				case 5: {
					if (state.maxAliases !== -1 && ++state.aliasCount > state.maxAliases) throwError$1(state, `aliases exceeded maxAliases (${state.maxAliases})`);
					const name = state.source.slice(event.anchorStart, event.anchorEnd);
					const anchor = state.anchors.get(name);
					if (!anchor) throwError$1(state, `unidentified alias "${name}"`);
					if (!anchor.isValueFinal) throwError$1(state, `recursive alias "${name}" is not supported for tag ${anchor.tag.tagName} because it uses finalize()`);
					addValue(state, anchor.value, anchor.tag);
					break;
				}
				case 6: {
					const frame = state.frames.pop();
					if (frame.kind === "mapping" && frame.hasKey) {
						state.position = frame.keyPosition;
						throwError$1(state, "incomplete mapping pair in event stream");
					}
					if (frame.kind === "document") state.documents.push(frame.value);
					else {
						const value = frame.tag.carrierIsResult ? frame.value : finalizeCollection(state, frame.position, frame.tag, frame.value);
						if (frame.anchor) {
							frame.anchor.value = value;
							frame.anchor.isValueFinal = true;
						}
						addValue(state, value, frame.tag);
					}
					break;
				}
			}
		}
		return state.documents;
	}
	var NO_RANGE$1 = -1;
	var HAS_OWN = Object.prototype.hasOwnProperty;
	var CONTEXT_FLOW_IN = 1;
	var CONTEXT_FLOW_OUT = 2;
	var CONTEXT_BLOCK_IN = 3;
	var CONTEXT_BLOCK_OUT = 4;
	var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
	var PATTERN_FLOW_INDICATORS = /[,\[\]{}]/;
	var PATTERN_TAG_HANDLE = /^(?:!|!!|![0-9A-Za-z-]+!)$/;
	var NS_URI_CHAR = String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$,_.!~*'()\[\]])`;
	var NS_TAG_CHAR = String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$.~*'()_])`;
	var PATTERN_TAG_URI = new RegExp(`^(?:${NS_URI_CHAR})*$`);
	var PATTERN_TAG_SUFFIX = new RegExp(`^(?:${NS_TAG_CHAR})+$`);
	var PATTERN_TAG_PREFIX = new RegExp(`^(?:!(?:${NS_URI_CHAR})*|${NS_TAG_CHAR}(?:${NS_URI_CHAR})*)$`);
	var DEFAULT_PARSER_OPTIONS = {
		filename: "",
		maxDepth: 100
	};
	function addDocumentEvent(state, explicitStart, explicitEnd) {
		state.events.push({
			type: 1,
			explicitStart,
			explicitEnd,
			directives: state.directives
		});
	}
	function addSequenceEvent(state, start, anchorStart, anchorEnd, tagStart, tagEnd, style) {
		state.events.push({
			type: 2,
			start,
			anchorStart,
			anchorEnd,
			tagStart,
			tagEnd,
			style
		});
	}
	function addMappingEvent(state, start, anchorStart, anchorEnd, tagStart, tagEnd, style) {
		state.events.push({
			type: 3,
			start,
			anchorStart,
			anchorEnd,
			tagStart,
			tagEnd,
			style
		});
	}
	function insertFlowPairMappingEvent(state, snapshot) {
		state.events.splice(snapshot.eventsLength, 0, {
			type: 3,
			start: snapshot.position,
			anchorStart: NO_RANGE$1,
			anchorEnd: NO_RANGE$1,
			tagStart: NO_RANGE$1,
			tagEnd: NO_RANGE$1,
			style: 2
		});
	}
	function addScalarEvent(state, valueStart, valueEnd, anchorStart, anchorEnd, tagStart, tagEnd, style, chomping = 1, indent = -1, fast = false) {
		state.events.push({
			type: 4,
			valueStart,
			valueEnd,
			anchorStart,
			anchorEnd,
			tagStart,
			tagEnd,
			style,
			chomping,
			indent,
			fast
		});
	}
	function addAliasEvent(state, anchorStart, anchorEnd) {
		state.events.push({
			type: 5,
			anchorStart,
			anchorEnd
		});
	}
	function addPopEvent(state) {
		state.events.push({ type: 6 });
	}
	function addEmptyScalarEvent(state) {
		addScalarEvent(state, NO_RANGE$1, NO_RANGE$1, NO_RANGE$1, NO_RANGE$1, NO_RANGE$1, NO_RANGE$1, 1);
	}
	function emptyProperties() {
		return {
			anchorStart: NO_RANGE$1,
			anchorEnd: NO_RANGE$1,
			tagStart: NO_RANGE$1,
			tagEnd: NO_RANGE$1
		};
	}
	function snapshotState(state) {
		return {
			position: state.position,
			line: state.line,
			lineStart: state.lineStart,
			lineIndent: state.lineIndent,
			firstTabInLine: state.firstTabInLine,
			eventsLength: state.events.length
		};
	}
	function restoreState(state, snapshot) {
		state.position = snapshot.position;
		state.line = snapshot.line;
		state.lineStart = snapshot.lineStart;
		state.lineIndent = snapshot.lineIndent;
		state.firstTabInLine = snapshot.firstTabInLine;
		state.events.length = snapshot.eventsLength;
	}
	function throwError(state, message) {
		throwErrorAt(state.input.slice(0, state.length), state.position, message, state.filename);
	}
	function isEol(c) {
		return c === 10 || c === 13;
	}
	function isWhiteSpace(c) {
		return c === 9 || c === 32;
	}
	function isWsOrEol(c) {
		return isWhiteSpace(c) || isEol(c);
	}
	function isWsOrEolOrEnd(c) {
		return c === 0 || isWsOrEol(c);
	}
	function isFlowIndicator(c) {
		return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
	}
	function fromDecimalCode(c) {
		return c >= 48 && c <= 57 ? c - 48 : -1;
	}
	function fromHexCode(c) {
		if (c >= 48 && c <= 57) return c - 48;
		const lc = c | 32;
		if (lc >= 97 && lc <= 102) return lc - 97 + 10;
		return -1;
	}
	function escapedHexLen(c) {
		if (c === 120) return 2;
		if (c === 117) return 4;
		if (c === 85) return 8;
		return 0;
	}
	function isSimpleEscape(c) {
		return c === 48 || c === 97 || c === 98 || c === 116 || c === 9 || c === 110 || c === 118 || c === 102 || c === 114 || c === 101 || c === 32 || c === 34 || c === 47 || c === 92 || c === 78 || c === 95 || c === 76 || c === 80;
	}
	function consumeLineBreak(state) {
		if (state.input.charCodeAt(state.position) === 10) state.position++;
		else {
			state.position++;
			if (state.input.charCodeAt(state.position) === 10) state.position++;
		}
		state.line++;
		state.lineStart = state.position;
		state.lineIndent = 0;
		state.firstTabInLine = -1;
	}
	function skipSeparationSpace(state, allowComments) {
		let lineBreaks = 0;
		let ch = state.input.charCodeAt(state.position);
		let hasSeparation = state.position === state.lineStart || isWsOrEol(state.input.charCodeAt(state.position - 1));
		while (ch !== 0) {
			while (isWhiteSpace(ch)) {
				hasSeparation = true;
				if (ch === 9 && state.firstTabInLine === -1) state.firstTabInLine = state.position;
				ch = state.input.charCodeAt(++state.position);
			}
			if (allowComments && hasSeparation && ch === 35) do
				ch = state.input.charCodeAt(++state.position);
			while (!isEol(ch) && ch !== 0);
			if (!isEol(ch)) break;
			consumeLineBreak(state);
			lineBreaks++;
			hasSeparation = true;
			ch = state.input.charCodeAt(state.position);
			while (ch === 32) {
				state.lineIndent++;
				ch = state.input.charCodeAt(++state.position);
			}
		}
		return lineBreaks;
	}
	function testDocumentSeparator(state, position = state.position) {
		const ch = state.input.charCodeAt(position);
		if ((ch === 45 || ch === 46) && ch === state.input.charCodeAt(position + 1) && ch === state.input.charCodeAt(position + 2)) {
			const following = state.input.charCodeAt(position + 3);
			return following === 0 || isWsOrEol(following);
		}
		return false;
	}
	function skipUntilLineEnd(state) {
		let ch = state.input.charCodeAt(state.position);
		while (ch !== 0 && !isEol(ch)) ch = state.input.charCodeAt(++state.position);
	}
	function checkPrintable(state, start, end) {
		if (PATTERN_NON_PRINTABLE.test(state.input.slice(start, end))) throwError(state, "the stream contains non-printable characters");
	}
	function readTagProperty(state, props, inFlow) {
		if (state.input.charCodeAt(state.position) !== 33) return false;
		if (props.tagStart !== NO_RANGE$1) throwError(state, "duplication of a tag property");
		const start = state.position;
		let isVerbatim = false;
		let isNamed = false;
		let tagHandle = "!";
		let ch = state.input.charCodeAt(++state.position);
		if (ch === 60) {
			isVerbatim = true;
			ch = state.input.charCodeAt(++state.position);
		} else if (ch === 33) {
			isNamed = true;
			tagHandle = "!!";
			ch = state.input.charCodeAt(++state.position);
		}
		let suffixStart = state.position;
		let tagName;
		if (isVerbatim) {
			while (ch !== 0 && ch !== 62) ch = state.input.charCodeAt(++state.position);
			if (ch !== 62) throwError(state, "unexpected end of the stream within a verbatim tag");
			tagName = state.input.slice(suffixStart, state.position);
			state.position++;
		} else {
			while (ch !== 0 && !isWsOrEol(ch) && !(inFlow && isFlowIndicator(ch))) {
				if (ch === 33) if (!isNamed) {
					tagHandle = state.input.slice(suffixStart - 1, state.position + 1);
					if (!PATTERN_TAG_HANDLE.test(tagHandle)) throwError(state, "named tag handle cannot contain such characters");
					isNamed = true;
					suffixStart = state.position + 1;
				} else throwError(state, "tag suffix cannot contain exclamation marks");
				ch = state.input.charCodeAt(++state.position);
			}
			tagName = state.input.slice(suffixStart, state.position);
			if (PATTERN_FLOW_INDICATORS.test(tagName)) throwError(state, "tag suffix cannot contain flow indicator characters");
		}
		if (tagName && !(isVerbatim ? PATTERN_TAG_URI.test(tagName) : PATTERN_TAG_SUFFIX.test(tagName))) throwError(state, `tag name cannot contain such characters: ${tagName}`);
		if (!isVerbatim && tagHandle !== "!" && tagHandle !== "!!" && !HAS_OWN.call(state.tagHandlers, tagHandle)) throwError(state, `undeclared tag handle "${tagHandle}"`);
		props.tagStart = start;
		props.tagEnd = state.position;
		return true;
	}
	function readAnchorProperty(state, props) {
		if (state.input.charCodeAt(state.position) !== 38) return false;
		if (props.anchorStart !== NO_RANGE$1) throwError(state, "duplication of an anchor property");
		state.position++;
		const start = state.position;
		while (state.input.charCodeAt(state.position) !== 0 && !isWsOrEol(state.input.charCodeAt(state.position)) && !isFlowIndicator(state.input.charCodeAt(state.position))) state.position++;
		if (state.position === start) throwError(state, "name of an anchor node must contain at least one character");
		props.anchorStart = start;
		props.anchorEnd = state.position;
		return true;
	}
	function readAlias(state, props) {
		if (state.input.charCodeAt(state.position) !== 42) return false;
		if (props.anchorStart !== NO_RANGE$1 || props.tagStart !== NO_RANGE$1) throwError(state, "alias node should not have any properties");
		state.position++;
		const start = state.position;
		while (state.input.charCodeAt(state.position) !== 0 && !isWsOrEol(state.input.charCodeAt(state.position)) && !isFlowIndicator(state.input.charCodeAt(state.position))) state.position++;
		if (state.position === start) throwError(state, "name of an alias node must contain at least one character");
		addAliasEvent(state, start, state.position);
		return true;
	}
	function readFlowScalarBreak(state, nodeIndent) {
		skipSeparationSpace(state, false);
		if (state.lineIndent < nodeIndent) throwError(state, "deficient indentation");
	}
	function readSingleQuotedScalar(state, nodeIndent, props) {
		if (state.input.charCodeAt(state.position) !== 39) return false;
		state.position++;
		const start = state.position;
		let simple = true;
		while (state.input.charCodeAt(state.position) !== 0) {
			const ch = state.input.charCodeAt(state.position);
			if (ch === 39) {
				if (state.input.charCodeAt(state.position + 1) === 39) {
					simple = false;
					state.position += 2;
					continue;
				}
				const end = state.position;
				state.position++;
				addScalarEvent(state, start, end, props.anchorStart, props.anchorEnd, props.tagStart, props.tagEnd, 2, 1, -1, simple);
				return true;
			}
			if (isEol(ch)) {
				simple = false;
				readFlowScalarBreak(state, nodeIndent);
			} else if (state.position === state.lineStart && testDocumentSeparator(state)) throwError(state, "unexpected end of the document within a single quoted scalar");
			else if (ch !== 9 && ch < 32) throwError(state, "expected valid JSON character");
			else state.position++;
		}
		throwError(state, "unexpected end of the stream within a single quoted scalar");
	}
	function readDoubleQuotedScalar(state, nodeIndent, props) {
		if (state.input.charCodeAt(state.position) !== 34) return false;
		state.position++;
		const start = state.position;
		let simple = true;
		while (state.input.charCodeAt(state.position) !== 0) {
			const ch = state.input.charCodeAt(state.position);
			if (ch === 34) {
				const end = state.position;
				state.position++;
				addScalarEvent(state, start, end, props.anchorStart, props.anchorEnd, props.tagStart, props.tagEnd, 3, 1, -1, simple);
				return true;
			}
			if (ch === 92) {
				simple = false;
				const escaped = state.input.charCodeAt(++state.position);
				if (isEol(escaped)) readFlowScalarBreak(state, nodeIndent);
				else if (isSimpleEscape(escaped)) state.position++;
				else {
					let hexLength = escapedHexLen(escaped);
					if (hexLength === 0) throwError(state, "unknown escape sequence");
					while (hexLength-- > 0) {
						state.position++;
						if (fromHexCode(state.input.charCodeAt(state.position)) < 0) throwError(state, "expected hexadecimal character");
					}
					state.position++;
				}
			} else if (isEol(ch)) {
				simple = false;
				readFlowScalarBreak(state, nodeIndent);
			} else if (state.position === state.lineStart && testDocumentSeparator(state)) throwError(state, "unexpected end of the document within a double quoted scalar");
			else if (ch !== 9 && ch < 32) throwError(state, "expected valid JSON character");
			else state.position++;
		}
		throwError(state, "unexpected end of the stream within a double quoted scalar");
	}
	function readBlockScalar(state, parentIndent, props) {
		const ch = state.input.charCodeAt(state.position);
		let chomping = 1;
		let indent = -1;
		let detectedIndent = false;
		if (ch !== 124 && ch !== 62) return false;
		const style = ch === 124 ? 4 : 5;
		state.position++;
		while (state.input.charCodeAt(state.position) !== 0) {
			const current = state.input.charCodeAt(state.position);
			const digit = fromDecimalCode(current);
			if (current === 43 || current === 45) {
				if (chomping !== 1) throwError(state, "repeat of a chomping mode identifier");
				chomping = current === 43 ? 3 : 2;
				state.position++;
			} else if (digit >= 0) {
				if (digit === 0) throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
				if (detectedIndent) throwError(state, "repeat of an indentation width identifier");
				indent = parentIndent + digit - 1;
				detectedIndent = true;
				state.position++;
			} else break;
		}
		let hadWhitespace = false;
		while (isWhiteSpace(state.input.charCodeAt(state.position))) {
			hadWhitespace = true;
			state.position++;
		}
		if (hadWhitespace && state.input.charCodeAt(state.position) === 35) skipUntilLineEnd(state);
		if (isEol(state.input.charCodeAt(state.position))) consumeLineBreak(state);
		else if (state.input.charCodeAt(state.position) !== 0) throwError(state, "a line break is expected");
		let contentIndent = detectedIndent ? indent : -1;
		let maxLeadingIndent = 0;
		const valueStart = state.position;
		let valueEnd = state.position;
		while (state.input.charCodeAt(state.position) !== 0) {
			const linePosition = state.position;
			let column = 0;
			while (state.input.charCodeAt(linePosition + column) === 32) column++;
			const first = state.input.charCodeAt(linePosition + column);
			if (first === 0) {
				if (contentIndent >= 0) {
					if (column > contentIndent) valueEnd = linePosition + column;
				} else if (column > 0) valueEnd = linePosition + column;
				break;
			}
			if (linePosition === state.lineStart && testDocumentSeparator(state, linePosition)) break;
			if (!detectedIndent && contentIndent === -1 && isEol(first)) maxLeadingIndent = Math.max(maxLeadingIndent, column);
			if (!detectedIndent && contentIndent === -1 && !isEol(first)) {
				if (first === 9 && column < parentIndent) {
					state.position = linePosition + column;
					throwError(state, "tab characters must not be used in indentation");
				}
				if (column < maxLeadingIndent) {
					state.position = linePosition + column;
					throwError(state, "bad indentation of a mapping entry");
				}
			}
			if (contentIndent === -1 && first !== 0 && !isEol(first) && column < parentIndent) {
				state.lineIndent = column;
				state.position = linePosition + column;
				break;
			}
			if (!detectedIndent && first !== 0 && !isEol(first) && contentIndent === -1) contentIndent = column;
			const requiredIndent = contentIndent === -1 ? parentIndent + 1 : contentIndent;
			if (first !== 0 && !isEol(first) && column < requiredIndent) {
				state.lineIndent = column;
				state.position = linePosition + column;
				break;
			}
			skipUntilLineEnd(state);
			valueEnd = state.position;
			if (isEol(state.input.charCodeAt(state.position))) {
				consumeLineBreak(state);
				valueEnd = state.position;
			}
		}
		checkPrintable(state, valueStart, valueEnd);
		addScalarEvent(state, valueStart, valueEnd, props.anchorStart, props.anchorEnd, props.tagStart, props.tagEnd, style, chomping, contentIndent);
		return true;
	}
	function canStartPlainScalar(state, nodeContext) {
		const ch = state.input.charCodeAt(state.position);
		const inFlow = nodeContext === CONTEXT_FLOW_IN;
		if (ch === 0 || isWsOrEol(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96 || inFlow && isFlowIndicator(ch)) return false;
		if (ch === 63 || ch === 45) {
			const following = state.input.charCodeAt(state.position + 1);
			if (isWsOrEolOrEnd(following) || inFlow && isFlowIndicator(following)) return false;
		}
		return true;
	}
	function readPlainScalar(state, nodeIndent, nodeContext, props) {
		if (!canStartPlainScalar(state, nodeContext)) return false;
		const start = state.position;
		let end = state.position;
		let ch = state.input.charCodeAt(state.position);
		const inFlow = nodeContext === CONTEXT_FLOW_IN;
		let multiline = false;
		while (ch !== 0) {
			if (state.position === state.lineStart && testDocumentSeparator(state)) break;
			if (ch === 58) {
				const following = state.input.charCodeAt(state.position + 1);
				if (isWsOrEolOrEnd(following) || inFlow && isFlowIndicator(following)) break;
			} else if (ch === 35) {
				if (isWsOrEol(state.input.charCodeAt(state.position - 1))) break;
			} else if (inFlow && isFlowIndicator(ch)) break;
			else if (isEol(ch)) {
				const savedPosition = state.position;
				const savedLine = state.line;
				const savedLineStart = state.lineStart;
				const savedLineIndent = state.lineIndent;
				skipSeparationSpace(state, false);
				if (state.lineIndent >= nodeIndent) {
					multiline = true;
					ch = state.input.charCodeAt(state.position);
					continue;
				}
				state.position = savedPosition;
				state.line = savedLine;
				state.lineStart = savedLineStart;
				state.lineIndent = savedLineIndent;
				break;
			}
			if (!isWhiteSpace(ch)) end = state.position + 1;
			ch = state.input.charCodeAt(++state.position);
		}
		if (end === start) return false;
		checkPrintable(state, start, end);
		addScalarEvent(state, start, end, props.anchorStart, props.anchorEnd, props.tagStart, props.tagEnd, 1, 1, -1, !multiline);
		return true;
	}
	function skipFlowSeparationSpace(state, nodeIndent) {
		const startLine = state.line;
		skipSeparationSpace(state, true);
		if (state.line > startLine && state.lineIndent < nodeIndent || state.firstTabInLine !== -1 && state.lineIndent < nodeIndent) throwError(state, "deficient indentation");
	}
	function readFlowCollection(state, nodeIndent, props) {
		const ch = state.input.charCodeAt(state.position);
		const isMapping = ch === 123;
		const start = state.position;
		let readNext = true;
		if (ch !== 91 && ch !== 123) return false;
		const terminator = isMapping ? 125 : 93;
		if (isMapping) addMappingEvent(state, start, props.anchorStart, props.anchorEnd, props.tagStart, props.tagEnd, 2);
		else addSequenceEvent(state, start, props.anchorStart, props.anchorEnd, props.tagStart, props.tagEnd, 2);
		state.position++;
		while (state.input.charCodeAt(state.position) !== 0) {
			skipFlowSeparationSpace(state, nodeIndent);
			let ch = state.input.charCodeAt(state.position);
			if (ch === terminator) {
				state.position++;
				addPopEvent(state);
				return true;
			} else if (!readNext) throwError(state, "missed comma between flow collection entries");
			else if (ch === 44) throwError(state, "expected the node content, but found ','");
			let isPair = false;
			let isExplicitPair = false;
			if (ch === 63 && isWsOrEol(state.input.charCodeAt(state.position + 1))) {
				isPair = isExplicitPair = true;
				state.position += 1;
				skipFlowSeparationSpace(state, nodeIndent);
			}
			const entryLine = state.line;
			const entryStart = snapshotState(state);
			const keyWasRead = parseNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
			skipFlowSeparationSpace(state, nodeIndent);
			ch = state.input.charCodeAt(state.position);
			if ((isMapping || isExplicitPair || state.line === entryLine) && ch === 58) {
				isPair = true;
				state.position++;
				skipFlowSeparationSpace(state, nodeIndent);
				if (!isMapping) {
					insertFlowPairMappingEvent(state, entryStart);
					if (!keyWasRead) addEmptyScalarEvent(state);
				} else if (!keyWasRead) addEmptyScalarEvent(state);
				if (!parseNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true)) addEmptyScalarEvent(state);
				skipFlowSeparationSpace(state, nodeIndent);
				if (!isMapping) addPopEvent(state);
			} else if (isMapping && isPair) {
				if (!keyWasRead) addEmptyScalarEvent(state);
				addEmptyScalarEvent(state);
			} else if (isMapping) addEmptyScalarEvent(state);
			else if (isPair) {
				insertFlowPairMappingEvent(state, entryStart);
				if (!keyWasRead) addEmptyScalarEvent(state);
				addEmptyScalarEvent(state);
				addPopEvent(state);
			}
			ch = state.input.charCodeAt(state.position);
			if (ch === 44) {
				readNext = true;
				state.position++;
			} else readNext = false;
		}
		throwError(state, "unexpected end of the stream within a flow collection");
	}
	function readBlockSequence(state, nodeIndent, props) {
		if (state.firstTabInLine !== -1 || state.input.charCodeAt(state.position) !== 45 || !isWsOrEolOrEnd(state.input.charCodeAt(state.position + 1))) return false;
		addSequenceEvent(state, state.position, props.anchorStart, props.anchorEnd, props.tagStart, props.tagEnd, 1);
		while (state.input.charCodeAt(state.position) === 45 && isWsOrEolOrEnd(state.input.charCodeAt(state.position + 1))) {
			if (state.firstTabInLine !== -1) {
				state.position = state.firstTabInLine;
				throwError(state, "tab characters must not be used in indentation");
			}
			const entryLine = state.line;
			state.position++;
			const hadBreak = skipSeparationSpace(state, true) > 0;
			if (state.firstTabInLine !== -1 && state.input.charCodeAt(state.position) === 45 && isWsOrEolOrEnd(state.input.charCodeAt(state.position + 1))) throwError(state, "bad indentation of a sequence entry");
			if (hadBreak && state.lineIndent <= nodeIndent) addEmptyScalarEvent(state);
			else parseNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
			skipSeparationSpace(state, true);
			if (state.lineIndent < nodeIndent || state.position >= state.length) break;
			if (state.lineIndent > nodeIndent) throwError(state, "bad indentation of a sequence entry");
			if (state.line === entryLine && state.input.charCodeAt(state.position) === 45 && isWsOrEolOrEnd(state.input.charCodeAt(state.position + 1))) throwError(state, "bad indentation of a sequence entry");
		}
		addPopEvent(state);
		return true;
	}
	function readBlockMapping(state, nodeIndent, flowIndent, props) {
		let atExplicitKey = false;
		let detected = false;
		let mappingOpened = false;
		let pendingExplicitKey = false;
		if (state.firstTabInLine !== -1) return false;
		let ch = state.input.charCodeAt(state.position);
		while (ch !== 0) {
			if (!atExplicitKey && state.firstTabInLine !== -1) {
				state.position = state.firstTabInLine;
				throwError(state, "tab characters must not be used in indentation");
			}
			const following = state.input.charCodeAt(state.position + 1);
			const entryLine = state.line;
			if ((ch === 63 || ch === 58) && isWsOrEolOrEnd(following)) {
				if (!mappingOpened) {
					addMappingEvent(state, state.position, props.anchorStart, props.anchorEnd, props.tagStart, props.tagEnd, 1);
					mappingOpened = true;
				}
				if (ch === 63) {
					if (atExplicitKey) addEmptyScalarEvent(state);
					detected = true;
					atExplicitKey = true;
				} else if (atExplicitKey) atExplicitKey = false;
				else {
					addEmptyScalarEvent(state);
					detected = true;
					atExplicitKey = false;
				}
				state.position += 1;
				pendingExplicitKey = true;
			} else {
				if (atExplicitKey) {
					addEmptyScalarEvent(state);
					atExplicitKey = false;
				}
				const beforeKey = snapshotState(state);
				if (!parseNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) break;
				if (state.line === entryLine) {
					ch = state.input.charCodeAt(state.position);
					while (isWhiteSpace(ch)) ch = state.input.charCodeAt(++state.position);
					if (ch === 58) {
						ch = state.input.charCodeAt(++state.position);
						if (!isWsOrEolOrEnd(ch)) throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
						if (!mappingOpened) {
							restoreState(state, beforeKey);
							addMappingEvent(state, beforeKey.position, props.anchorStart, props.anchorEnd, props.tagStart, props.tagEnd, 1);
							mappingOpened = true;
							parseNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true);
							ch = state.input.charCodeAt(state.position);
							while (isWhiteSpace(ch)) ch = state.input.charCodeAt(++state.position);
							state.position++;
						}
						detected = true;
						atExplicitKey = false;
						pendingExplicitKey = false;
					} else if (detected) throwError(state, "expected ':' after a mapping key");
					else {
						if (props.anchorStart !== NO_RANGE$1 || props.tagStart !== NO_RANGE$1) {
							restoreState(state, beforeKey);
							return false;
						}
						return true;
					}
				} else if (detected) throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
				else {
					if (props.anchorStart !== NO_RANGE$1 || props.tagStart !== NO_RANGE$1) {
						restoreState(state, beforeKey);
						return false;
					}
					return true;
				}
			}
			if (parseNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, pendingExplicitKey)) pendingExplicitKey = false;
			if (!atExplicitKey) {
				if (pendingExplicitKey) {
					addEmptyScalarEvent(state);
					pendingExplicitKey = false;
				}
			}
			skipSeparationSpace(state, true);
			ch = state.input.charCodeAt(state.position);
			if ((state.line === entryLine || state.lineIndent > nodeIndent) && ch !== 0) throwError(state, "bad indentation of a mapping entry");
			else if (state.lineIndent < nodeIndent) break;
		}
		if (!detected) return false;
		if (atExplicitKey) addEmptyScalarEvent(state);
		if (mappingOpened) addPopEvent(state);
		return true;
	}
	function parseNode(state, parentIndent, nodeContext, allowToSeek, allowCompact, allowPropertyMapping = true) {
		if (state.depth >= state.maxDepth) throwError(state, `nesting exceeded maxDepth (${state.maxDepth})`);
		state.depth++;
		let indentStatus = 1;
		let atNewLine = false;
		let hasContent = false;
		let propertyStart = null;
		const props = emptyProperties();
		let allowBlockScalars = nodeContext === CONTEXT_BLOCK_OUT || nodeContext === CONTEXT_BLOCK_IN;
		let allowBlockCollections = allowBlockScalars;
		const allowBlockStyles = allowBlockScalars;
		if (allowToSeek && skipSeparationSpace(state, true)) {
			atNewLine = true;
			if (state.lineIndent > parentIndent) indentStatus = 1;
			else if (state.lineIndent === parentIndent) indentStatus = 0;
			else indentStatus = -1;
		}
		if (indentStatus === 1) while (true) {
			const ch = state.input.charCodeAt(state.position);
			const propertyState = snapshotState(state);
			if (atNewLine && indentStatus !== 1 && (ch === 33 || ch === 38)) break;
			if (atNewLine && allowBlockStyles && (props.tagStart !== NO_RANGE$1 || props.anchorStart !== NO_RANGE$1) && (ch === 33 || ch === 38)) {
				var _state$events$fallbac;
				const fallbackState = snapshotState(state);
				const flowIndent = parentIndent + 1;
				if (readBlockMapping(state, state.position - state.lineStart, flowIndent, props) && ((_state$events$fallbac = state.events[fallbackState.eventsLength]) === null || _state$events$fallbac === void 0 ? void 0 : _state$events$fallbac.type) === 3) {
					state.depth--;
					return true;
				}
				restoreState(state, fallbackState);
			}
			if (atNewLine && (ch === 33 && props.tagStart !== NO_RANGE$1 || ch === 38 && props.anchorStart !== NO_RANGE$1)) break;
			if (!readTagProperty(state, props, nodeContext === CONTEXT_FLOW_IN) && !readAnchorProperty(state, props)) break;
			if (propertyStart === null) propertyStart = propertyState;
			if (skipSeparationSpace(state, true)) {
				atNewLine = true;
				allowBlockCollections = allowBlockStyles;
				if (state.lineIndent > parentIndent) indentStatus = 1;
				else if (state.lineIndent === parentIndent) indentStatus = 0;
				else indentStatus = -1;
			} else allowBlockCollections = false;
		}
		if (allowBlockCollections) allowBlockCollections = atNewLine || allowCompact;
		if (indentStatus === 1 || nodeContext === CONTEXT_BLOCK_OUT) {
			const flowIndent = nodeContext === CONTEXT_FLOW_IN || nodeContext === CONTEXT_FLOW_OUT ? parentIndent : parentIndent + 1;
			const blockIndent = state.position - state.lineStart;
			if (indentStatus === 1) if (allowBlockCollections && (readBlockSequence(state, blockIndent, props) || readBlockMapping(state, blockIndent, flowIndent, props)) || readFlowCollection(state, flowIndent, props)) hasContent = true;
			else {
				const ch = state.input.charCodeAt(state.position);
				if (propertyStart !== null && allowPropertyMapping && allowBlockStyles && !allowBlockCollections && ch !== 124 && ch !== 62) {
					var _state$events$fallbac2;
					const fallbackState = snapshotState(state);
					const propertyIndent = propertyStart.position - propertyStart.lineStart;
					restoreState(state, propertyStart);
					if (readBlockMapping(state, propertyIndent, flowIndent, emptyProperties()) && ((_state$events$fallbac2 = state.events[fallbackState.eventsLength]) === null || _state$events$fallbac2 === void 0 ? void 0 : _state$events$fallbac2.type) === 3) hasContent = true;
					else restoreState(state, fallbackState);
				}
				if (!hasContent && (allowBlockScalars && readBlockScalar(state, flowIndent, props) || readSingleQuotedScalar(state, flowIndent, props) || readDoubleQuotedScalar(state, flowIndent, props) || readAlias(state, props) || readPlainScalar(state, flowIndent, nodeContext, props))) hasContent = true;
			}
			else if (indentStatus === 0) hasContent = allowBlockCollections && readBlockSequence(state, blockIndent, props);
		}
		allowBlockScalars = allowBlockScalars && !hasContent;
		if (!hasContent && (props.anchorStart !== NO_RANGE$1 || props.tagStart !== NO_RANGE$1 || allowBlockScalars)) {
			addScalarEvent(state, NO_RANGE$1, NO_RANGE$1, props.anchorStart, props.anchorEnd, props.tagStart, props.tagEnd, 1);
			hasContent = true;
		}
		state.depth--;
		return hasContent || props.anchorStart !== NO_RANGE$1 || props.tagStart !== NO_RANGE$1;
	}
	function readDirective(state) {
		if (state.lineIndent > 0 || state.input.charCodeAt(state.position) !== 37) return false;
		state.position++;
		const nameStart = state.position;
		while (state.input.charCodeAt(state.position) !== 0 && !isWsOrEol(state.input.charCodeAt(state.position))) state.position++;
		const name = state.input.slice(nameStart, state.position);
		const args = [];
		if (name.length === 0) throwError(state, "directive name must not be less than one character in length");
		while (state.input.charCodeAt(state.position) !== 0 && !isEol(state.input.charCodeAt(state.position))) {
			while (isWhiteSpace(state.input.charCodeAt(state.position))) state.position++;
			if (state.input.charCodeAt(state.position) === 35 || isEol(state.input.charCodeAt(state.position)) || state.input.charCodeAt(state.position) === 0) break;
			const start = state.position;
			while (state.input.charCodeAt(state.position) !== 0 && !isWsOrEol(state.input.charCodeAt(state.position))) state.position++;
			args.push(state.input.slice(start, state.position));
		}
		if (isEol(state.input.charCodeAt(state.position))) consumeLineBreak(state);
		if (name === "YAML") {
			if (state.directives.some((directive) => directive.kind === "yaml")) throwError(state, "duplication of %YAML directive");
			if (args.length !== 1) throwError(state, "YAML directive accepts exactly one argument");
			const match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
			if (match === null) throwError(state, "ill-formed argument of the YAML directive");
			if (parseInt(match[1], 10) !== 1) throwError(state, "unacceptable YAML version of the document");
			state.directives.push({
				kind: "yaml",
				version: args[0]
			});
		} else if (name === "TAG") {
			if (args.length !== 2) throwError(state, "TAG directive accepts exactly two arguments");
			const [handle, prefix] = args;
			if (!PATTERN_TAG_HANDLE.test(handle)) throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
			if (HAS_OWN.call(state.tagHandlers, handle)) throwError(state, `there is a previously declared suffix for "${handle}" tag handle`);
			if (!PATTERN_TAG_PREFIX.test(prefix)) throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
			state.tagHandlers[handle] = prefix;
			state.directives.push({
				kind: "tag",
				handle,
				prefix
			});
		}
		return true;
	}
	function readDocument(state) {
		state.directives = [];
		state.tagHandlers = Object.create(null);
		let hasDirectives = false;
		skipSeparationSpace(state, true);
		while (readDirective(state)) {
			hasDirectives = true;
			skipSeparationSpace(state, true);
		}
		let explicitStart = false;
		let explicitEnd = false;
		let allowCompact = true;
		if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45 && isWsOrEolOrEnd(state.input.charCodeAt(state.position + 3))) {
			explicitStart = true;
			const markerLine = state.line;
			state.position += 3;
			skipSeparationSpace(state, true);
			allowCompact = state.line > markerLine;
		} else if (hasDirectives) throwError(state, "directives end mark is expected");
		const documentEventIndex = state.events.length;
		if (!explicitStart && state.position === state.lineStart && state.input.charCodeAt(state.position) === 46 && testDocumentSeparator(state)) {
			state.position += 3;
			skipSeparationSpace(state, true);
			return;
		}
		addDocumentEvent(state, explicitStart, false);
		if (!parseNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, allowCompact, allowCompact)) addEmptyScalarEvent(state);
		skipSeparationSpace(state, true);
		if (state.position === state.lineStart && testDocumentSeparator(state)) {
			explicitEnd = state.input.charCodeAt(state.position) === 46;
			if (explicitEnd) {
				const markerLine = state.line;
				state.position += 3;
				skipSeparationSpace(state, true);
				if (state.line === markerLine && state.position < state.length) throwError(state, "end of the stream or a document separator is expected");
			}
		}
		const documentEvent = state.events[documentEventIndex];
		if ((documentEvent === null || documentEvent === void 0 ? void 0 : documentEvent.type) === 1) documentEvent.explicitEnd = explicitEnd;
		addPopEvent(state);
		if (!explicitEnd && state.position < state.length && !(state.position === state.lineStart && testDocumentSeparator(state))) throwError(state, "end of the stream or a document separator is expected");
	}
	function parseEvents(input, options) {
		const length = input.length;
		const state = _objectSpread2(_objectSpread2(_objectSpread2({}, DEFAULT_PARSER_OPTIONS), options), {}, {
			input: `${input}\0`,
			length,
			position: 0,
			line: 0,
			lineStart: 0,
			lineIndent: 0,
			firstTabInLine: -1,
			depth: 0,
			directives: [],
			tagHandlers: Object.create(null),
			events: []
		});
		const nullpos = input.indexOf("\0");
		if (nullpos !== -1) throwErrorAt(input, nullpos, "null byte is not allowed in input", state.filename);
		if (state.input.charCodeAt(state.position) === 65279) state.position++;
		while (state.position < state.length) {
			skipSeparationSpace(state, true);
			if (state.position >= state.length) break;
			const documentStart = state.position;
			readDocument(state);
			if (state.position === documentStart)
 /* c8 ignore next */
			throwError(state, "can not read a document");
		}
		return state.events;
	}
	var DEFAULT_LOAD_OPTIONS = _objectSpread2(_objectSpread2({}, DEFAULT_PARSER_OPTIONS), DEFAULT_CONSTRUCTOR_OPTIONS);
	function loadDocuments(input, options = {}) {
		const opts = _objectSpread2(_objectSpread2({}, DEFAULT_LOAD_OPTIONS), options);
		const source = String(input);
		const PARSER_OPT_KEYS = Object.keys(DEFAULT_PARSER_OPTIONS);
		const CONSTRUCTOR_OPT_KEYS = Object.keys(DEFAULT_CONSTRUCTOR_OPTIONS);
		return constructFromEvents(parseEvents(source, pick(opts, PARSER_OPT_KEYS)), _objectSpread2(_objectSpread2({}, pick(opts, CONSTRUCTOR_OPT_KEYS)), {}, { source }));
	}
	function loadAll(input, iteratorOrOptions, options) {
		let iterator = null;
		if (typeof iteratorOrOptions === "function") iterator = iteratorOrOptions;
		else if (iteratorOrOptions !== null && typeof iteratorOrOptions === "object") options = iteratorOrOptions;
		const documents = loadDocuments(input, options);
		if (iterator === null) return documents;
		for (const document of documents) iterator(document);
	}
	function load(input, options) {
		const documents = loadDocuments(input, options);
		if (documents.length === 0) throw new YAMLException("expected a document, but the input is empty");
		if (documents.length === 1) return documents[0];
		throw new YAMLException("expected a single document in the stream, but found more");
	}
	var Style = class {
		constructor() {
			_defineProperty(this, "tagged", false);
			_defineProperty(this, "flow", false);
			_defineProperty(this, "singleQuoted", false);
			_defineProperty(this, "doubleQuoted", false);
			_defineProperty(this, "literal", false);
			_defineProperty(this, "folded", false);
		}
	};
	var INVALID = Symbol("INVALID");
	function buildRepresentTypes(schema) {
		const defaultTags = new Set([
			schema.defaultScalarTag,
			schema.defaultSequenceTag,
			schema.defaultMappingTag
		].filter((t) => t !== void 0));
		const implicitScalars = schema.implicitScalarTags;
		const explicitTags = schema.tags.filter((t) => !(t.nodeKind === "scalar" && t.implicit) && !defaultTags.has(t));
		const defaultTagsLast = schema.tags.filter((t) => defaultTags.has(t));
		return [
			...implicitScalars.map((tag) => ({
				tag,
				implicitTag: true
			})),
			...explicitTags.map((tag) => ({
				tag,
				implicitTag: false
			})),
			...defaultTagsLast.map((tag) => ({
				tag,
				implicitTag: true
			}))
		];
	}
	function matchTag(state, object) {
		for (let index = 0, length = state.representTypes.length; index < length; index += 1) {
			const { tag, implicitTag } = state.representTypes[index];
			if (tag.identify && tag.identify(object)) {
				let tagName;
				if (tag.matchByTagPrefix && tag.representTagName) tagName = tag.representTagName(object);
				else tagName = tag.tagName;
				return {
					tag,
					tagName,
					implicitTag
				};
			}
		}
		return null;
	}
	function build(state, object) {
		if (!state.noRefs && object !== null && typeof object === "object") {
			const existing = state.refs.get(object);
			if (existing) {
				if (existing.anchor === void 0) existing.anchor = `ref_${state.refCounter++}`;
				return {
					kind: "alias",
					tag: "",
					style: new Style(),
					anchor: existing.anchor
				};
			}
		}
		const matched = matchTag(state, object);
		if (!matched) {
			if (object === void 0) return INVALID;
			if (state.skipInvalid) return INVALID;
			throw new YAMLException(`unacceptable kind of an object to dump ${Object.prototype.toString.call(object)}`);
		}
		const { tag, tagName, implicitTag } = matched;
		const nodeTagName = implicitTag ? tagName : tagNameShort(tagName);
		if (tag.nodeKind === "scalar") {
			const style = new Style();
			style.tagged = !implicitTag;
			return {
				kind: "scalar",
				tag: nodeTagName,
				style,
				value: tag.represent(object)
			};
		}
		if (tag.nodeKind === "sequence") {
			const container = tag.represent(object);
			const style = new Style();
			style.tagged = !implicitTag;
			const node = {
				kind: "sequence",
				tag: nodeTagName,
				style,
				items: []
			};
			if (!state.noRefs) state.refs.set(object, node);
			for (let index = 0, length = container.length; index < length; index += 1) {
				let item = build(state, container[index]);
				if (item === INVALID && container[index] === void 0) item = build(state, null);
				if (item === INVALID) continue;
				node.items.push(item);
			}
			return node;
		}
		const map = tag.represent(object);
		const style = new Style();
		style.tagged = !implicitTag;
		const node = {
			kind: "mapping",
			tag: nodeTagName,
			style,
			items: []
		};
		if (!state.noRefs) state.refs.set(object, node);
		for (const [objectKey, objectValue] of map) {
			const key = build(state, objectKey);
			if (key === INVALID) continue;
			const value = build(state, objectValue);
			if (value === INVALID) continue;
			node.items.push({
				key,
				value
			});
		}
		return node;
	}
	function jsToAst(input, schema, options = {}) {
		var _options$noRefs, _options$skipInvalid;
		const root = build({
			representTypes: buildRepresentTypes(schema),
			noRefs: (_options$noRefs = options.noRefs) !== null && _options$noRefs !== void 0 ? _options$noRefs : false,
			skipInvalid: (_options$skipInvalid = options.skipInvalid) !== null && _options$skipInvalid !== void 0 ? _options$skipInvalid : false,
			refs: /* @__PURE__ */ new Map(),
			refCounter: 0
		}, input);
		return [{
			contents: root === INVALID ? null : root,
			directives: []
		}];
	}
	var VISIT_BREAK = Symbol("visit:break");
	var VISIT_SKIP = Symbol("visit:skip");
	function visitNode(node, visitor, ctx) {
		const control = visitor(node, ctx);
		if (control === VISIT_BREAK) return true;
		if (control === VISIT_SKIP) return false;
		const depth = ctx.depth + 1;
		switch (node.kind) {
			case "sequence":
				for (const item of node.items) if (visitNode(item, visitor, {
					depth,
					parent: node,
					isKey: false
				})) return true;
				break;
			case "mapping": for (const { key, value } of node.items) {
				if (visitNode(key, visitor, {
					depth,
					parent: node,
					isKey: true
				})) return true;
				if (visitNode(value, visitor, {
					depth,
					parent: node,
					isKey: false
				})) return true;
			}
		}
		return false;
	}
	function visit(documents, visitor) {
		for (const doc of documents) if (doc.contents && visitNode(doc.contents, visitor, {
			depth: 0,
			parent: null,
			isKey: false
		})) return;
	}
	var CHAR_BOM = 65279;
	var CHAR_TAB = 9;
	var CHAR_LINE_FEED = 10;
	var CHAR_CARRIAGE_RETURN = 13;
	var CHAR_SPACE = 32;
	var CHAR_EXCLAMATION = 33;
	var CHAR_DOUBLE_QUOTE = 34;
	var CHAR_SHARP = 35;
	var CHAR_PERCENT = 37;
	var CHAR_AMPERSAND = 38;
	var CHAR_SINGLE_QUOTE = 39;
	var CHAR_ASTERISK = 42;
	var CHAR_COMMA = 44;
	var CHAR_MINUS = 45;
	var CHAR_COLON = 58;
	var CHAR_EQUALS = 61;
	var CHAR_GREATER_THAN = 62;
	var CHAR_QUESTION = 63;
	var CHAR_COMMERCIAL_AT = 64;
	var CHAR_LEFT_SQUARE_BRACKET = 91;
	var CHAR_RIGHT_SQUARE_BRACKET = 93;
	var CHAR_GRAVE_ACCENT = 96;
	var CHAR_LEFT_CURLY_BRACKET = 123;
	var CHAR_VERTICAL_LINE = 124;
	var CHAR_RIGHT_CURLY_BRACKET = 125;
	var ESCAPE_SEQUENCES = {};
	ESCAPE_SEQUENCES[0] = "\\0";
	ESCAPE_SEQUENCES[7] = "\\a";
	ESCAPE_SEQUENCES[8] = "\\b";
	ESCAPE_SEQUENCES[9] = "\\t";
	ESCAPE_SEQUENCES[10] = "\\n";
	ESCAPE_SEQUENCES[11] = "\\v";
	ESCAPE_SEQUENCES[12] = "\\f";
	ESCAPE_SEQUENCES[13] = "\\r";
	ESCAPE_SEQUENCES[27] = "\\e";
	ESCAPE_SEQUENCES[34] = "\\\"";
	ESCAPE_SEQUENCES[92] = "\\\\";
	ESCAPE_SEQUENCES[133] = "\\N";
	ESCAPE_SEQUENCES[160] = "\\_";
	ESCAPE_SEQUENCES[8232] = "\\L";
	ESCAPE_SEQUENCES[8233] = "\\P";
	var DEFAULT_PRESENTER_OPTIONS = {
		indent: 2,
		seqNoIndent: false,
		seqInlineFirst: true,
		sortKeys: false,
		lineWidth: 80,
		flowBracketPadding: false,
		flowSkipCommaSpace: false,
		flowSkipColonSpace: false,
		quoteFlowKeys: false,
		quoteStyle: "single",
		forceQuotes: false,
		tagBeforeAnchor: false
	};
	function nodeTagShort(node) {
		return node.style.tagged ? node.tag : tagNameShort(node.tag);
	}
	function createPresenterState(options) {
		const opts = _objectSpread2(_objectSpread2({}, DEFAULT_PRESENTER_OPTIONS), options);
		return _objectSpread2(_objectSpread2({}, opts), {}, {
			defaultScalarTagName: opts.schema.defaultScalarTag.tagName,
			implicitResolvers: opts.schema.implicitScalarTags
		});
	}
	function encodeNonPrintable(character) {
		const string = character.toString(16).toUpperCase();
		const handle = character <= 255 ? "x" : "u";
		const length = character <= 255 ? 2 : 4;
		return `\\${handle}${"0".repeat(length - string.length)}${string}`;
	}
	function indentString(string, spaces) {
		const ind = " ".repeat(spaces);
		let position = 0;
		let result = "";
		const length = string.length;
		while (position < length) {
			let line;
			const next = string.indexOf("\n", position);
			if (next === -1) {
				line = string.slice(position);
				position = length;
			} else {
				line = string.slice(position, next + 1);
				position = next + 1;
			}
			if (line.length && line !== "\n") result += ind;
			result += line;
		}
		return result;
	}
	function generateNextLine(state, level) {
		return `\n${" ".repeat(state.indent * level)}`;
	}
	function scalarLayout(state, level) {
		const indent = state.indent * Math.max(1, level);
		return {
			indent,
			blockIndent: level === 0 ? state.indent + 1 : state.indent,
			lineWidth: state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent)
		};
	}
	function resolveImplicitTag(state, str) {
		for (let index = 0, length = state.implicitResolvers.length; index < length; index += 1) {
			const tagDefinition = state.implicitResolvers[index];
			if (tagDefinition.resolve(str, false, tagDefinition.tagName) !== NOT_RESOLVED) return tagDefinition.tagName;
		}
		return state.defaultScalarTagName;
	}
	function isWhitespace(c) {
		return c === CHAR_SPACE || c === CHAR_TAB;
	}
	function startsWithDocumentSeparator(string) {
		const marker = string.charCodeAt(0);
		if (marker !== CHAR_MINUS && marker !== 46 || string.charCodeAt(1) !== marker || string.charCodeAt(2) !== marker) return false;
		if (string.length === 3) return true;
		const following = string.charCodeAt(3);
		return isWhitespace(following) || following === CHAR_CARRIAGE_RETURN || following === CHAR_LINE_FEED;
	}
	function isPrintable(c) {
		return c >= 32 && c <= 126 || c >= 161 && c <= 55295 && c !== 8232 && c !== 8233 || c >= 57344 && c <= 65533 && c !== CHAR_BOM || c >= 65536 && c <= 1114111;
	}
	function isNsCharOrWhitespace(c) {
		return isPrintable(c) && c !== CHAR_BOM && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
	}
	function isPlainSafe(c, prev, inblock) {
		const cIsNsCharOrWhitespace = isNsCharOrWhitespace(c);
		const cIsNsChar = cIsNsCharOrWhitespace && !isWhitespace(c);
		return (inblock ? cIsNsCharOrWhitespace : cIsNsCharOrWhitespace && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET) && c !== CHAR_SHARP && !(prev === CHAR_COLON && !cIsNsChar) || isNsCharOrWhitespace(prev) && !isWhitespace(prev) && c === CHAR_SHARP || prev === CHAR_COLON && cIsNsChar && (inblock || c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET);
	}
	function isPlainSafeFirst(c) {
		return isPrintable(c) && c !== CHAR_BOM && !isWhitespace(c) && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
	}
	function isPlainSafeAtStart(string, inblock) {
		const first = codePointAt(string, 0);
		if (isPlainSafeFirst(first)) return true;
		if (string.length > 1 && (first === CHAR_MINUS || first === CHAR_QUESTION || first === CHAR_COLON)) {
			const second = codePointAt(string, 1);
			return !isWhitespace(second) && isPlainSafe(second, first, inblock);
		}
		return false;
	}
	function isPlainSafeLast(c) {
		return !isWhitespace(c) && c !== CHAR_COLON;
	}
	function codePointAt(string, pos) {
		const first = string.charCodeAt(pos);
		let second;
		if (first >= 55296 && first <= 56319 && pos + 1 < string.length) {
			second = string.charCodeAt(pos + 1);
			if (second >= 56320 && second <= 57343) return (first - 55296) * 1024 + second - 56320 + 65536;
		}
		return first;
	}
	function needIndentIndicator(string) {
		return /^\n* /.test(string);
	}
	var STYLE_PLAIN = 1;
	var STYLE_SINGLE = 2;
	var STYLE_LITERAL = 3;
	var STYLE_FOLDED = 4;
	var STYLE_DOUBLE = 5;
	function chooseScalarStyle(state, string, layout, singleLineOnly, forceQuote, inblock) {
		const { blockIndent, lineWidth } = layout;
		let i;
		let char = 0;
		let prevChar = -1;
		let hasLineBreak = false;
		let hasFoldableLine = false;
		const shouldTrackWidth = lineWidth !== -1;
		let previousLineBreak = -1;
		let plain = !startsWithDocumentSeparator(string) && isPlainSafeAtStart(string, inblock) && isPlainSafeLast(codePointAt(string, string.length - 1));
		if (singleLineOnly || forceQuote) for (i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
			char = codePointAt(string, i);
			if (!isPrintable(char)) return STYLE_DOUBLE;
			plain = plain && isPlainSafe(char, prevChar, inblock);
			prevChar = char;
		}
		else {
			for (i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
				char = codePointAt(string, i);
				if (char === CHAR_LINE_FEED) {
					hasLineBreak = true;
					if (shouldTrackWidth) {
						hasFoldableLine = hasFoldableLine || i - previousLineBreak - 1 > lineWidth && !isMoreIndented(string[previousLineBreak + 1]);
						previousLineBreak = i;
					}
				} else if (!isPrintable(char)) return STYLE_DOUBLE;
				plain = plain && isPlainSafe(char, prevChar, inblock);
				prevChar = char;
			}
			hasFoldableLine = hasFoldableLine || shouldTrackWidth && i - previousLineBreak - 1 > lineWidth && !isMoreIndented(string[previousLineBreak + 1]);
		}
		if (!hasLineBreak && !hasFoldableLine) {
			if (plain && !forceQuote) return STYLE_PLAIN;
			return state.quoteStyle === "double" ? STYLE_DOUBLE : STYLE_SINGLE;
		}
		if (blockIndent > 9 && needIndentIndicator(string)) return STYLE_DOUBLE;
		return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
	}
	function renderScalarStyle(string, style, layout) {
		const { indent, blockIndent, lineWidth } = layout;
		switch (style) {
			case STYLE_PLAIN: return encodeFlowBreaks(string, indent);
			case STYLE_SINGLE: return `'${encodeFlowBreaks(string, indent).replace(/'/g, "''")}'`;
			case STYLE_LITERAL: return "|" + blockHeader(string, blockIndent) + dropEndingNewline(indentString(string, indent));
			case STYLE_FOLDED: return ">" + blockHeader(string, blockIndent) + dropEndingNewline(indentString(foldBlockScalar(string, lineWidth), indent));
			case STYLE_DOUBLE: return `"${escapeString(string)}"`;
		}
	}
	function resolveScalarStyle(state, node, layout, iskey, inblock) {
		const singleLineOnly = iskey || !inblock;
		if (node.style.singleQuoted) return STYLE_SINGLE;
		if (node.style.doubleQuoted) return STYLE_DOUBLE;
		if (!singleLineOnly) {
			if (node.style.literal) return STYLE_LITERAL;
			if (node.style.folded) return STYLE_FOLDED;
		}
		const string = node.value;
		if (string.length === 0) {
			if (node.style.tagged || resolveImplicitTag(state, string) === node.tag) return STYLE_PLAIN;
			return state.quoteStyle === "double" ? STYLE_DOUBLE : STYLE_SINGLE;
		}
		const style = chooseScalarStyle(state, string, layout, singleLineOnly, state.forceQuotes && !iskey, inblock);
		if (style === STYLE_PLAIN && !node.style.tagged && resolveImplicitTag(state, string) !== node.tag) return state.quoteStyle === "double" ? STYLE_DOUBLE : STYLE_SINGLE;
		return style;
	}
	function blockHeader(string, indentPerLevel) {
		const indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : "";
		const clip = string[string.length - 1] === "\n";
		return `${indentIndicator}${clip && (string[string.length - 2] === "\n" || string === "\n") ? "+" : clip ? "" : "-"}\n`;
	}
	function encodeFlowBreaks(string, indent) {
		let nextLF = string.indexOf("\n");
		if (nextLF === -1) return string;
		const pad = " ".repeat(indent);
		let result = string.slice(0, nextLF);
		const lineRe = /(\n+)([^\n]*)/g;
		lineRe.lastIndex = nextLF;
		let match;
		while (match = lineRe.exec(string)) {
			const breaks = match[1].length;
			const line = match[2];
			result += "\n".repeat(breaks + 1) + pad + line;
		}
		return result;
	}
	function dropEndingNewline(string) {
		return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
	}
	function isMoreIndented(char) {
		return char === " " || char === "	";
	}
	function foldBlockScalar(string, width) {
		const lineRe = /(\n+)([^\n]*)/g;
		let nextLF = string.indexOf("\n");
		if (nextLF === -1) nextLF = string.length;
		lineRe.lastIndex = nextLF;
		let result = foldLine(string.slice(0, nextLF), width);
		let prevMoreIndented = string[0] === "\n" || isMoreIndented(string[0]);
		let moreIndented;
		let match;
		while (match = lineRe.exec(string)) {
			const prefix = match[1];
			const line = match[2];
			moreIndented = line !== "" && isMoreIndented(line[0]);
			result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
			prevMoreIndented = moreIndented;
		}
		return result;
	}
	function foldLine(line, width) {
		if (line === "" || isMoreIndented(line[0])) return line;
		const breakRe = / [^ \t]/g;
		let match;
		let start = 0;
		let end;
		let curr = 0;
		let next = 0;
		let result = "";
		while (match = breakRe.exec(line)) {
			next = match.index;
			if (next - start > width) {
				end = curr > start ? curr : next;
				result += `\n${line.slice(start, end)}`;
				start = end + 1;
			}
			curr = next;
		}
		result += "\n";
		if (line.length - start > width && curr > start) result += `${line.slice(start, curr)}\n${line.slice(curr + 1)}`;
		else result += line.slice(start);
		return result.slice(1);
	}
	function escapeString(string) {
		let result = "";
		let char = 0;
		for (let i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
			char = codePointAt(string, i);
			const escapeSeq = ESCAPE_SEQUENCES[char];
			if (escapeSeq) {
				result += escapeSeq;
				continue;
			}
			if (isPrintable(char)) {
				result += string[i];
				if (char >= 65536) result += string[i + 1];
				continue;
			}
			result += encodeNonPrintable(char);
		}
		return result;
	}
	function writeFlowSequence(state, level, node) {
		let result = "";
		for (let index = 0, length = node.items.length; index < length; index += 1) {
			const item = writeNode(state, level, node.items[index], {});
			if (result !== "") result += `,${!state.flowSkipCommaSpace ? " " : ""}`;
			result += item;
		}
		const pad = state.flowBracketPadding && result !== "" ? " " : "";
		return `[${pad}${result}${pad}]`;
	}
	function writeBlockSequence(state, level, node, compact) {
		let result = "";
		for (let index = 0, length = node.items.length; index < length; index += 1) {
			const item = writeNode(state, level + 1, node.items[index], {
				block: true,
				compact: state.seqInlineFirst,
				isblockseq: true
			});
			if (!compact || result !== "") result += generateNextLine(state, level);
			if (item === "" || CHAR_LINE_FEED === item.charCodeAt(0)) result += "-";
			else result += "- ";
			result += item;
		}
		return result;
	}
	function writeFlowMapping(state, level, node) {
		let result = "";
		const items = sortMappingItems(state, node.items);
		for (const { key, value } of items) {
			let pairBuffer = "";
			if (result !== "") pairBuffer += `,${!state.flowSkipCommaSpace ? " " : ""}`;
			const keyText = writeNode(state, level, key, { iskey: true });
			const explicitPair = keyText.length > 1024;
			if (explicitPair) pairBuffer += "? ";
			else if (state.quoteFlowKeys) pairBuffer += "\"";
			const valueText = writeNode(state, level, value, {});
			const sep = state.flowSkipColonSpace || valueText === "" ? "" : " ";
			pairBuffer += `${keyText}${state.quoteFlowKeys && !explicitPair ? "\"" : ""}:${sep}${valueText}`;
			result += pairBuffer;
		}
		const pad = state.flowBracketPadding && result !== "" ? " " : "";
		return `{${pad}${result}${pad}}`;
	}
	function sortKeyValue(key) {
		return key.kind === "scalar" ? key.value : key;
	}
	function sortMappingItems(state, items) {
		if (!state.sortKeys) return items;
		const copy = items.slice();
		if (state.sortKeys === true) copy.sort((a, b) => {
			const x = sortKeyValue(a.key);
			const y = sortKeyValue(b.key);
			if (x < y) return -1;
			if (x > y) return 1;
			return 0;
		});
		else {
			const fn = state.sortKeys;
			copy.sort((a, b) => fn(sortKeyValue(a.key), sortKeyValue(b.key)));
		}
		return copy;
	}
	function writeBlockMapping(state, level, node, compact) {
		let result = "";
		const items = sortMappingItems(state, node.items);
		for (let index = 0, length = items.length; index < length; index += 1) {
			let pairBuffer = "";
			if (!compact || result !== "") pairBuffer += generateNextLine(state, level);
			const { key, value } = items[index];
			const keyIsBlock = (key.kind === "mapping" || key.kind === "sequence") && !key.style.flow && key.items.length !== 0 || key.kind === "scalar" && (key.style.literal || key.style.folded);
			const keyText = keyIsBlock ? writeNode(state, level + 1, key, {
				block: true,
				compact: true,
				isblockseq: !cannotBeCompact(state, key, level + 1)
			}) : writeNode(state, level + 1, key, {
				block: true,
				compact: true,
				iskey: true
			});
			const keyHasLineBreak = key.kind === "scalar" && key.value.indexOf("\n") !== -1;
			const explicitPair = keyIsBlock || keyHasLineBreak || keyText.length > 1024;
			if (explicitPair) if (keyText && CHAR_LINE_FEED === keyText.charCodeAt(0)) pairBuffer += "?";
			else pairBuffer += "? ";
			pairBuffer += keyText;
			if (explicitPair) pairBuffer += generateNextLine(state, level);
			const valueText = writeNode(state, level + 1, value, {
				block: true,
				compact: explicitPair,
				isblockseq: explicitPair && !cannotBeCompact(state, value, level + 1)
			});
			const keyIsBareProps = key.kind === "scalar" && key.value === "" && keyText !== "" && keyText.charCodeAt(keyText.length - 1) !== CHAR_SINGLE_QUOTE && keyText.charCodeAt(keyText.length - 1) !== CHAR_DOUBLE_QUOTE;
			const keyColonSep = !explicitPair && (key.kind === "alias" || keyIsBareProps) ? " " : "";
			if (valueText === "" || CHAR_LINE_FEED === valueText.charCodeAt(0)) pairBuffer += `${keyColonSep}:`;
			else pairBuffer += `${keyColonSep}: `;
			pairBuffer += valueText;
			result += pairBuffer;
		}
		return result;
	}
	function cannotBeCompact(state, node, level) {
		return node.style.tagged || node.anchor !== void 0 || state.indent < 2 && level > 0;
	}
	function writeNode(state, level, node, ctx) {
		var _ctx$compact;
		if (node.kind === "alias") return `*${node.anchor}`;
		const { block = false, iskey = false, isblockseq = false } = ctx;
		let compact = (_ctx$compact = ctx.compact) !== null && _ctx$compact !== void 0 ? _ctx$compact : false;
		const hasAnchor = node.anchor !== void 0;
		if (cannotBeCompact(state, node, level)) compact = false;
		let body;
		let shouldPrintTag = node.style.tagged;
		const useBlockCollection = block && (node.kind === "mapping" || node.kind === "sequence") && !node.style.flow && node.items.length !== 0;
		if (node.kind === "mapping") if (useBlockCollection) body = writeBlockMapping(state, level, node, compact);
		else body = writeFlowMapping(state, level, node);
		else if (node.kind === "sequence") if (useBlockCollection) if (state.seqNoIndent && !isblockseq && level > 0) body = writeBlockSequence(state, level - 1, node, compact);
		else body = writeBlockSequence(state, level, node, compact);
		else body = writeFlowSequence(state, level, node);
		else {
			const layout = scalarLayout(state, level);
			const style = resolveScalarStyle(state, node, layout, iskey, block);
			body = renderScalarStyle(node.value, style, layout);
			shouldPrintTag = node.style.tagged || style !== STYLE_PLAIN && node.tag !== state.defaultScalarTagName;
		}
		if (useBlockCollection && compact && level > 0 && state.indent > 2) body = `${" ".repeat(state.indent - 2)}${body}`;
		if (shouldPrintTag || hasAnchor) {
			const props = [];
			const tag = shouldPrintTag ? nodeTagShort(node) : null;
			const anchor = hasAnchor ? `&${node.anchor}` : null;
			if (state.tagBeforeAnchor) {
				if (tag !== null) props.push(tag);
				if (anchor !== null) props.push(anchor);
			} else {
				if (anchor !== null) props.push(anchor);
				if (tag !== null) props.push(tag);
			}
			const sep = body === "" || body.charCodeAt(0) === CHAR_LINE_FEED ? "" : " ";
			body = `${props.join(" ")}${sep}${body}`;
		}
		return body;
	}
	function rootStartsOwnLine(node) {
		return (node.kind === "sequence" || node.kind === "mapping") && !node.style.flow && node.items.length !== 0 && !node.style.tagged && node.anchor === void 0;
	}
	function isOpenEnded(node) {
		let leaf = node;
		while ((leaf.kind === "sequence" || leaf.kind === "mapping") && !leaf.style.flow && leaf.items.length !== 0) leaf = leaf.kind === "sequence" ? leaf.items[leaf.items.length - 1] : leaf.items[leaf.items.length - 1].value;
		if (leaf.kind !== "scalar" || !(leaf.style.literal || leaf.style.folded)) return false;
		const { value } = leaf;
		return value.endsWith("\n\n") || value === "\n";
	}
	function writeDocumentDirectives(doc) {
		let result = "";
		for (const directive of doc.directives) {
			if (directive.kind === "yaml") {
				result += `%YAML ${directive.version}\n`;
				continue;
			}
			const { handle, prefix } = directive;
			result += `%TAG ${handle} ${prefix}\n`;
		}
		return result;
	}
	function present(documents, options) {
		const state = createPresenterState(options);
		let result = "";
		let previousEnded = false;
		for (let index = 0; index < documents.length; index += 1) {
			const doc = documents[index];
			const directives = writeDocumentDirectives(doc);
			const hasDirectives = directives !== "";
			const marker = doc.explicitStart || hasDirectives || index > 0 && !previousEnded;
			result += directives;
			if (doc.contents === null) {
				if (marker) result += "---\n";
			} else if (marker) {
				const body = writeNode(state, 0, doc.contents, {
					block: true,
					compact: true
				});
				const sep = body === "" ? "" : hasDirectives || rootStartsOwnLine(doc.contents) ? "\n" : " ";
				result += `---${sep}${body}\n`;
			} else result += writeNode(state, 0, doc.contents, {
				block: true,
				compact: true
			}) + "\n";
			previousEnded = doc.explicitEnd || doc.contents !== null && isOpenEnded(doc.contents);
			if (previousEnded) result += "...\n";
		}
		return result;
	}
	var DEFAULT_DUMP_SCHEMA = YAML11_SCHEMA.withTags(_objectSpread2(_objectSpread2({}, intYaml11Tag), {}, { resolve: (source, isExplicit, tagName) => {
		const result = intYaml11Tag.resolve(source, isExplicit, tagName);
		return result === NOT_RESOLVED ? intCoreTag.resolve(source, isExplicit, tagName) : result;
	} }), _objectSpread2(_objectSpread2({}, floatYaml11Tag), {}, { resolve: (source, isExplicit, tagName) => {
		const result = floatYaml11Tag.resolve(source, isExplicit, tagName);
		return result === NOT_RESOLVED ? floatCoreTag.resolve(source, isExplicit, tagName) : result;
	} }));
	var DEFAULT_DUMP_OPTIONS = _objectSpread2(_objectSpread2({}, DEFAULT_PRESENTER_OPTIONS), {}, {
		schema: DEFAULT_DUMP_SCHEMA,
		skipInvalid: false,
		noRefs: false,
		flowLevel: -1,
		transform: () => {}
	});
	function dump(input, options = {}) {
		const opts = _objectSpread2(_objectSpread2({}, DEFAULT_DUMP_OPTIONS), options);
		const documents = jsToAst(input, opts.schema, {
			noRefs: opts.noRefs,
			skipInvalid: opts.skipInvalid
		});
		if (opts.flowLevel >= 0) visit(documents, (node, ctx) => {
			if (ctx.depth < opts.flowLevel) return;
			node.style.flow = true;
			return VISIT_SKIP;
		});
		opts.transform(documents);
		return present(documents, _objectSpread2(_objectSpread2({}, pick(opts, Object.keys(DEFAULT_PRESENTER_OPTIONS))), {}, { schema: opts.schema }));
	}
	var NO_RANGE = -1;
	function eventPosition(event) {
		if ("tagStart" in event && event.tagStart !== NO_RANGE) return event.tagStart;
		if ("anchorStart" in event && event.anchorStart !== NO_RANGE) return event.anchorStart;
		if ("valueStart" in event && event.valueStart !== NO_RANGE) return event.valueStart;
		if ("start" in event) return event.start;
		return 0;
	}
	function rawTag(state, event) {
		return event.tagStart === NO_RANGE ? "" : state.source.slice(event.tagStart, event.tagEnd);
	}
	function anchorName(state, event) {
		return event.anchorStart === NO_RANGE ? void 0 : state.source.slice(event.anchorStart, event.anchorEnd);
	}
	function implicitScalarTagName(state, source) {
		var _schema$implicitScala;
		const { schema } = state;
		const candidates = (_schema$implicitScala = schema.implicitScalarByFirstChar.get(source.charAt(0))) !== null && _schema$implicitScala !== void 0 ? _schema$implicitScala : schema.implicitScalarAnyFirstChar;
		for (const tag of candidates) if (tag.resolve(source, false, tag.tagName) !== NOT_RESOLVED) return tag.tagName;
		return schema.defaultScalarTag.tagName;
	}
	function buildScalar(state, event) {
		const value = getScalarValue(state.source, event);
		const raw = rawTag(state, event);
		const style = new Style();
		switch (event.style) {
			case 2:
				style.singleQuoted = true;
				break;
			case 3:
				style.doubleQuoted = true;
				break;
			case 4:
				style.literal = true;
				break;
			case 5: style.folded = true;
		}
		let tag;
		if (raw !== "") {
			style.tagged = true;
			tag = raw;
		} else if (event.style === 1) tag = implicitScalarTagName(state, value);
		else tag = state.schema.defaultScalarTag.tagName;
		return {
			kind: "scalar",
			tag,
			style,
			anchor: anchorName(state, event),
			value
		};
	}
	function buildCollection(state, event, defaultTagName) {
		const raw = rawTag(state, event);
		const style = new Style();
		if (event.style === 2) style.flow = true;
		let tag;
		if (raw === "") tag = defaultTagName;
		else {
			tag = raw;
			style.tagged = true;
		}
		return {
			tag,
			style,
			anchor: anchorName(state, event)
		};
	}
	function addNode(state, node) {
		const frame = state.frames[state.frames.length - 1];
		if (frame.kind === "document") frame.doc.contents = node;
		else if (frame.kind === "sequence") frame.node.items.push(node);
		else if (frame.key) {
			frame.node.items.push({
				key: frame.key,
				value: node
			});
			frame.key = null;
		} else frame.key = node;
	}
	function eventsToAst(events, options) {
		const state = {
			source: options.source,
			schema: options.schema,
			eventIndex: 0,
			position: 0,
			frames: [],
			documents: []
		};
		while (state.eventIndex < events.length) {
			const event = events[state.eventIndex++];
			state.position = eventPosition(event);
			switch (event.type) {
				case 1: {
					const doc = {
						contents: null,
						explicitStart: event.explicitStart,
						explicitEnd: event.explicitEnd,
						directives: event.directives
					};
					state.frames.push({
						kind: "document",
						doc
					});
					break;
				}
				case 4:
					addNode(state, buildScalar(state, event));
					break;
				case 2: {
					const { tag, style, anchor } = buildCollection(state, event, "tag:yaml.org,2002:seq");
					const node = {
						kind: "sequence",
						tag,
						style,
						anchor,
						items: []
					};
					state.frames.push({
						kind: "sequence",
						node
					});
					break;
				}
				case 3: {
					const { tag, style, anchor } = buildCollection(state, event, "tag:yaml.org,2002:map");
					const node = {
						kind: "mapping",
						tag,
						style,
						anchor,
						items: []
					};
					state.frames.push({
						kind: "mapping",
						node,
						key: null
					});
					break;
				}
				case 5: {
					const name = state.source.slice(event.anchorStart, event.anchorEnd);
					addNode(state, {
						kind: "alias",
						tag: "",
						style: new Style(),
						anchor: name
					});
					break;
				}
				case 6: {
					const frame = state.frames.pop();
					if (frame.kind === "mapping" && frame.key) throw new Error("incomplete mapping pair in event stream");
					if (frame.kind === "document") state.documents.push(frame.doc);
					else addNode(state, frame.node);
					break;
				}
			}
		}
		return state.documents;
	}
	exports.CHOMPING_CLIP = CHOMPING_CLIP;
	exports.CHOMPING_KEEP = CHOMPING_KEEP;
	exports.CHOMPING_STRIP = CHOMPING_STRIP;
	exports.COLLECTION_STYLE_BLOCK = COLLECTION_STYLE_BLOCK;
	exports.COLLECTION_STYLE_FLOW = COLLECTION_STYLE_FLOW;
	exports.CORE_SCHEMA = CORE_SCHEMA;
	exports.EVENT_ALIAS = EVENT_ALIAS;
	exports.EVENT_DOCUMENT = EVENT_DOCUMENT;
	exports.EVENT_MAPPING = EVENT_MAPPING;
	exports.EVENT_POP = EVENT_POP;
	exports.EVENT_SCALAR = EVENT_SCALAR;
	exports.EVENT_SEQUENCE = EVENT_SEQUENCE;
	exports.FAILSAFE_SCHEMA = FAILSAFE_SCHEMA;
	exports.JSON_SCHEMA = JSON_SCHEMA;
	exports.MERGE_KEY = MERGE_KEY;
	exports.NOT_RESOLVED = NOT_RESOLVED;
	exports.SCALAR_STYLE_DOUBLE_QUOTED = SCALAR_STYLE_DOUBLE_QUOTED;
	exports.SCALAR_STYLE_FOLDED_BLOCK = SCALAR_STYLE_FOLDED_BLOCK;
	exports.SCALAR_STYLE_LITERAL_BLOCK = SCALAR_STYLE_LITERAL_BLOCK;
	exports.SCALAR_STYLE_PLAIN = SCALAR_STYLE_PLAIN;
	exports.SCALAR_STYLE_SINGLE_QUOTED = SCALAR_STYLE_SINGLE_QUOTED;
	exports.Schema = Schema;
	exports.Style = Style;
	exports.VISIT_BREAK = VISIT_BREAK;
	exports.VISIT_SKIP = VISIT_SKIP;
	exports.YAML11_SCHEMA = YAML11_SCHEMA;
	exports.YAMLException = YAMLException;
	exports.binaryTag = binaryTag;
	exports.boolCoreTag = boolCoreTag;
	exports.boolJsonTag = boolJsonTag;
	exports.boolYaml11Tag = boolYaml11Tag;
	exports.constructFromEvents = constructFromEvents;
	exports.defineMappingTag = defineMappingTag;
	exports.defineScalarTag = defineScalarTag;
	exports.defineSequenceTag = defineSequenceTag;
	exports.dump = dump;
	exports.eventsToAst = eventsToAst;
	exports.floatCoreTag = floatCoreTag;
	exports.floatJsonTag = floatJsonTag;
	exports.floatYaml11Tag = floatYaml11Tag;
	exports.getScalarValue = getScalarValue;
	exports.intCoreTag = intCoreTag;
	exports.intJsonTag = intJsonTag;
	exports.intYaml11Tag = intYaml11Tag;
	exports.jsToAst = jsToAst;
	exports.legacyMapTag = legacyMapTag;
	exports.load = load;
	exports.loadAll = loadAll;
	exports.mapTag = mapTag;
	exports.mergeTag = mergeTag;
	exports.nullCoreTag = nullCoreTag;
	exports.nullJsonTag = nullJsonTag;
	exports.nullYaml11Tag = nullYaml11Tag;
	exports.omapTag = omapTag;
	exports.pairsTag = pairsTag;
	exports.parseEvents = parseEvents;
	exports.present = present;
	exports.realMapTag = realMapTag;
	exports.seqTag = seqTag;
	exports.setTag = setTag;
	exports.strTag = strTag;
	exports.timestampTag = timestampTag;
	exports.visit = visit;
}));
//#endregion
//#region templates/shared-global/src/scripts/xref/xref.ts
var import_cshtml_razor = /* @__PURE__ */ __toESM(require_cshtml_razor());
var yaml = require_js_yaml_cjs();
var XrefMapFile = "xrefmap.yml";
var XrefNotFound = `XREF not found in ${XrefMapFile}`;
var Xref = class Xref {
	constructor() {
		console.log("xref constructor");
	}
	static async runXrefPage() {
		const xrefNotFound = "xref not found in url";
		const docLoc = document.location.pathname;
		if (docLoc.includes("xref.html") || docLoc.includes("find.html")) {
			console.log(`Detected we're on the find/xref page.`);
			var xref = new URLSearchParams(window.location.search).get("xref") ?? xrefNotFound;
			const showXref = document.getElementById("xref-show");
			const showTarget = document.getElementById("xref-target");
			if (!showXref) {
				console.error("xref-show not found");
				return;
			}
			showXref.textContent = xref;
			if (xref === xrefNotFound) return;
			const target = await Xref.getLink(xref);
			showTarget.href = target;
			showTarget.textContent = target;
			if (target === XrefNotFound) return;
			const timer = setTimeout(() => {
				document.location.href = target;
			}, 1e3);
			window.addEventListener("keydown", (event) => {
				if (event.key === "Esc" || event.keyCode === 27 || event.code === "Escape") {
					clearTimeout(timer);
					const cancelled = document.getElementById("xref-cancelled");
					if (!cancelled) {
						console.error("xref-cancelled not found");
						return;
					}
					cancelled.style.display = "inline";
				}
			});
		}
	}
	/** Find the link in the YAML file */
	static async getLink(xref) {
		const found = (await this.get()).references.find((r) => r.uid === xref);
		if (!found) return XrefNotFound;
		return "/" + found.href;
	}
	/** Load the YAML file */
	static async get() {
		const xrefYaml = await (await fetch(`/${XrefMapFile}`)).text();
		return yaml.load(xrefYaml);
	}
};
//#endregion
//#region templates/shared-global/src/scripts/utils/docready.ts
function docReady(fn) {
	if (document.readyState === "complete" || document.readyState === "interactive") setTimeout(fn, 1);
	else document.addEventListener("DOMContentLoaded", fn);
}
//#endregion
//#region node_modules/@fancyapps/ui/dist/utils/isString.js
/*! License details at fancyapps.com/license */
var t$7 = (t) => "string" == typeof t;
//#endregion
//#region node_modules/@fancyapps/ui/dist/utils/isNode.js
/*! License details at fancyapps.com/license */
var n$9 = (n) => n && null !== n && n instanceof Element && "nodeType" in n;
//#endregion
//#region node_modules/@fancyapps/ui/dist/utils/getScrollableParent.js
/*! License details at fancyapps.com/license */
var e$8 = function(e) {
	if (!(e && e instanceof Element && e.offsetParent)) return !1;
	let n = !1, i = !1;
	if (e.scrollWidth > e.clientWidth) {
		const i = window.getComputedStyle(e).overflowX, t = -1 !== i.indexOf("hidden"), o = -1 !== i.indexOf("clip"), d = -1 !== i.indexOf("visible");
		n = !t && !o && !d;
	}
	if (e.scrollHeight > e.clientHeight) {
		const n = window.getComputedStyle(e).overflowY, t = -1 !== n.indexOf("hidden"), o = -1 !== n.indexOf("clip"), d = -1 !== n.indexOf("visible");
		i = !t && !o && !d;
	}
	return n || i;
};
var n$8 = function(i, t = void 0) {
	return !i || i === document.body || t && i === t ? null : e$8(i) ? i : n$8(i.parentElement, t);
};
//#endregion
//#region node_modules/@fancyapps/ui/dist/utils/strToHtml.js
/*! License details at fancyapps.com/license */
var e$7 = function(e) {
	var t = new DOMParser().parseFromString(e, "text/html").body;
	if (t.childElementCount > 1) {
		for (var n = document.createElement("div"); t.firstChild;) n.appendChild(t.firstChild);
		return n;
	}
	let r = t.firstChild;
	return !r || r instanceof HTMLElement ? r : ((n = document.createElement("div")).appendChild(r), n);
};
//#endregion
//#region node_modules/@fancyapps/ui/dist/utils/clamp.js
/*! License details at fancyapps.com/license */
var t$6 = function(t = 0, n = 0, a = 0) {
	return Math.max(Math.min(n, a), t);
};
//#endregion
//#region node_modules/@fancyapps/ui/dist/utils/isPlainObject.js
/*! License details at fancyapps.com/license */
var t$5 = (t) => "object" == typeof t && null !== t && t.constructor === Object && "[object Object]" === Object.prototype.toString.call(t);
//#endregion
//#region node_modules/@fancyapps/ui/dist/utils/isEqual.js
/*! License details at fancyapps.com/license */
function e$6(e) {
	return t$5(e) || Array.isArray(e);
}
function n$7(t, r) {
	const o = Object.keys(t), c = Object.keys(r);
	return o.length === c.length && o.every((o) => {
		const c = t[o], i = r[o];
		return "function" == typeof c ? `${c}` == `${i}` : e$6(c) && e$6(i) ? n$7(c, i) : c === i;
	});
}
//#endregion
//#region node_modules/@fancyapps/ui/dist/libs/tween.js
/*! License details at fancyapps.com/license */
var e$5 = function(n) {
	for (const t of s$9) t.getState() === i$5.Running && t.tick(a$5 ? n - a$5 : 0);
	a$5 = n, u$4 = window.requestAnimationFrame(e$5);
};
var i$5;
var o$7;
var r$4;
(function(n) {
	n[n.Initializing = 0] = "Initializing", n[n.Running = 1] = "Running", n[n.Paused = 2] = "Paused", n[n.Completed = 3] = "Completed", n[n.Destroyed = 4] = "Destroyed";
})(i$5 || (i$5 = {})), function(n) {
	n[n.Spring = 0] = "Spring", n[n.Ease = 1] = "Ease";
}(o$7 || (o$7 = {})), function(n) {
	n[n.Loop = 0] = "Loop", n[n.Reverse = 1] = "Reverse";
}(r$4 || (r$4 = {}));
var s$9 = /* @__PURE__ */ new Set();
var u$4 = null;
var a$5 = 0;
function c$4() {
	let a = i$5.Initializing, f = o$7.Ease, l = 0, g = 0, p = c$4.Easings.Linear, m = 500, d = 0, b = 0, S = 0, h = 0, y = 1 / 0, E = .01, R = .01, M = !1, j = {}, w = null, v = {}, O = {}, C = {}, L = 0, I = 0, D = r$4.Loop, z = c$4.Easings.Linear;
	const N = /* @__PURE__ */ new Map();
	function V(n, ...t) {
		for (const e of N.get(n) || []) e(...t);
	}
	function q(n) {
		return g = 0, n ? w = setTimeout(() => {
			x();
		}, n) : x(), F;
	}
	function x() {
		a = i$5.Running, V("start", v, O);
	}
	function A() {
		if (a = i$5.Completed, C = {}, V("end", v), a === i$5.Completed) if (l < L) {
			if (l++, D === r$4.Reverse) {
				const n = Object.assign({}, j);
				j = Object.assign({}, O), O = n;
			}
			q(I);
		} else l = 0;
		return F;
	}
	const F = {
		getState: function() {
			return a;
		},
		easing: function(n) {
			return p = n, f = o$7.Ease, C = {}, F;
		},
		duration: function(n) {
			return m = n, F;
		},
		spring: function(n = {}) {
			f = o$7.Spring;
			const { velocity: e, mass: i, tension: r, friction: s, restDelta: u, restSpeed: a, maxSpeed: c, clamp: l } = Object.assign(Object.assign({}, {
				velocity: 0,
				mass: 1,
				tension: 170,
				friction: 26,
				restDelta: .1,
				restSpeed: .1,
				maxSpeed: 1 / 0,
				clamp: !0
			}), n);
			return d = e, b = i, S = r, h = s, R = u, E = a, y = c, M = l, C = {}, F;
		},
		isRunning: function() {
			return a === i$5.Running;
		},
		isSpring: function() {
			return f === o$7.Spring;
		},
		from: function(n) {
			return v = Object.assign({}, n), F;
		},
		to: function(n) {
			return O = n, F;
		},
		repeat: function(n, t = 0, e = r$4.Loop, i) {
			return L = n, I = t, D = e, z = i || p, F;
		},
		on: function(n, t) {
			var e, i;
			return e = n, i = t, N.set(e, [...N.get(e) || [], i]), F;
		},
		off: function(n, t) {
			var e, i;
			return e = n, i = t, N.has(e) && N.set(e, N.get(e).filter((n) => n !== i)), F;
		},
		start: function(n) {
			return n$7(v, O) || (a = i$5.Initializing, j = Object.assign({}, v), s$9.add(this), u$4 || (u$4 = window.requestAnimationFrame(e$5)), q(n)), F;
		},
		pause: function() {
			return w && (clearTimeout(w), w = null), a === i$5.Running && (a = i$5.Paused, V("pause", v)), F;
		},
		end: A,
		tick: function(e) {
			e > 50 && (e = 50), g += e;
			let s = 0, u = !1;
			if (a !== i$5.Running) return F;
			if (f === o$7.Ease) {
				s = t$6(0, g / m, 1), u = 1 === s;
				const t = D === r$4.Reverse ? z : p;
				for (const n in v) v[n] = j[n] + (O[n] - j[n]) * t(s);
			}
			if (f === o$7.Spring) {
				const t = .001 * e;
				let i = 0;
				for (const e in v) {
					const o = O[e];
					let r = v[e];
					if ("number" != typeof o || isNaN(o) || "number" != typeof r || isNaN(r)) continue;
					if (Math.abs(o - r) <= R) {
						v[e] = o, C[e] = 0;
						continue;
					}
					C[e] || ("object" == typeof d && "number" == typeof d[e] ? C[e] = d[e] : C[e] = "number" == typeof d ? d : 0);
					let s = C[e];
					s = t$6(-1 * Math.abs(y), s, Math.abs(y));
					const u = s * b * h;
					s += ((r > o ? -1 : 1) * (Math.abs(o - r) * S) - u) / b * t, r += s * t;
					const a = v[e] > o ? r < o : r > o;
					let c = Math.abs(s) < E && Math.abs(o - r) <= R;
					M && a && (c = !0), c ? (r = o, s = 0) : i++, v[e] = r, C[e] = s;
				}
				u = !i;
			}
			const c = Object.assign({}, O);
			return V("step", v, j, O, s), u && a === i$5.Running && n$7(O, c) && (a = i$5.Completed, A()), F;
		},
		getStartValues: function() {
			return j;
		},
		getCurrentValues: function() {
			return v;
		},
		getCurrentVelocities: function() {
			return C;
		},
		getEndValues: function() {
			return O;
		},
		destroy: function() {
			a = i$5.Destroyed, w && (clearTimeout(w), w = null), j = v = O = {}, s$9.delete(this);
		}
	};
	return F;
}
c$4.destroy = () => {
	for (const n of s$9) n.destroy();
	u$4 && (cancelAnimationFrame(u$4), u$4 = null);
}, c$4.Easings = {
	Linear: function(n) {
		return n;
	},
	EaseIn: function(n) {
		return 0 === n ? 0 : Math.pow(2, 10 * n - 10);
	},
	EaseOut: function(n) {
		return 1 === n ? 1 : 1 - Math.pow(2, -10 * n);
	},
	EaseInOut: function(n) {
		return 0 === n ? 0 : 1 === n ? 1 : n < .5 ? Math.pow(2, 20 * n - 10) / 2 : (2 - Math.pow(2, -20 * n + 10)) / 2;
	}
};
//#endregion
//#region node_modules/@fancyapps/ui/dist/libs/gestures.js
/*! License details at fancyapps.com/license */
function e$4(e) {
	return "undefined" != typeof TouchEvent && e instanceof TouchEvent;
}
function t$4(t, n) {
	const o = [], s = e$4(t) ? t[n] : t instanceof MouseEvent && ("changedTouches" === n || "mouseup" !== t.type) ? [t] : [];
	for (const e of s) o.push({
		x: e.clientX,
		y: e.clientY,
		ts: Date.now()
	});
	return o;
}
function n$6(e) {
	return t$4(e, "touches");
}
function o$6(e) {
	return t$4(e, "targetTouches");
}
function s$8(e) {
	return t$4(e, "changedTouches");
}
function i$4(e) {
	const t = e[0], n = e[1] || t;
	return {
		x: (t.x + n.x) / 2,
		y: (t.y + n.y) / 2,
		ts: n.ts
	};
}
function r$3(e) {
	const t = e[0], n = e[1] || e[0];
	return t && n ? -1 * Math.sqrt((n.x - t.x) * (n.x - t.x) + (n.y - t.y) * (n.y - t.y)) : 0;
}
var c$3 = (e) => {
	e.cancelable && e.preventDefault();
};
var a$4 = { passive: !1 };
var u$3 = {
	panThreshold: 5,
	swipeThreshold: 3,
	ignore: [
		"textarea",
		"input",
		"select",
		"[contenteditable]",
		"[data-selectable]",
		"[data-draggable]"
	]
};
var d$1 = !1;
var l$6 = !0;
var f$1 = (e, t) => {
	let f, h, v, g, p, m = Object.assign(Object.assign({}, u$3), t), E = [], w = [], y = [], T = !1, b = !1, M = !1, L = !1, x = 0, P = 0, D = 0, X = 0, Y = 0, j = 0, k = 0, R = 0, z = 0, A = [];
	const O = /* @__PURE__ */ new Map();
	function S(e) {
		const t = r$3(w), n = r$3(y), o = t && n ? t / n : 0, i = {
			srcEvent: f,
			isPanRecognized: T,
			isSwipeRecognized: b,
			firstTouch: E,
			previousTouch: y,
			currentTouch: w,
			deltaX: D,
			deltaY: X,
			offsetX: Y,
			offsetY: j,
			velocityX: k,
			velocityY: R,
			velocity: Math.abs(k) > Math.abs(R) ? k : R,
			angle: z,
			axis: v,
			scale: o,
			center: h
		};
		for (const t of O.get(e) || []) t(i);
	}
	function q(e) {
		const t = e.target, n = e.composedPath()[0], o = m.ignore.join(","), s = (e) => e && e instanceof HTMLElement && (e.matches(o) || e.closest(o));
		if (s(t) || s(n)) return !1;
	}
	function C(e) {
		const t = Date.now();
		if (A = A.filter((e) => !e.ts || e.ts > t - 100), e && A.push(e), k = 0, R = 0, A.length > 3) {
			const e = A[0], t = A[A.length - 1];
			if (e && t) {
				const n = t.x - e.x, o = t.y - e.y, s = e.ts && t.ts ? t.ts - e.ts : 0;
				s > 0 && (k = Math.abs(n) > 3 ? n / (s / 30) : 0, R = Math.abs(o) > 3 ? o / (s / 30) : 0);
			}
		}
	}
	function H(e) {
		if (!1 === q(e)) return;
		if ("undefined" != typeof MouseEvent && e instanceof MouseEvent) {
			if (d$1) return;
		} else d$1 = !0;
		if ("undefined" != typeof MouseEvent && e instanceof MouseEvent) {
			if (!e.buttons || 0 !== e.button) return;
			c$3(e);
		}
		e instanceof MouseEvent && (window.addEventListener("mousemove", I), window.addEventListener("mouseup", B)), window.addEventListener("blur", F), f = e, w = o$6(e), E = [...w], y = [], P = w.length, h = i$4(w), 1 === P && (T = !1, b = !1, M = !1), P && C(i$4(w));
		const t = Date.now(), n = t - (x || t);
		L = n > 0 && n <= 250 && 1 === P, x = t, clearTimeout(g), S("start");
	}
	function I(e) {
		var t;
		if (!E.length) return;
		if (e.defaultPrevented) return;
		if (!1 === q(e)) return;
		f = e, y = [...w], w = n$6(e);
		const o = i$4(y), s = i$4(n$6(e));
		if (C(s), P = w.length, h = s, y.length === w.length ? (D = s.x - o.x, X = s.y - o.y) : (D = 0, X = 0), E.length) {
			const e = i$4(E);
			Y = s.x - e.x, j = s.y - e.y;
		}
		if (w.length > 1) {
			const e = r$3(w), t = r$3(y);
			Math.abs(e - t) >= .1 && (M = !0, S("pinch"));
		}
		T || (T = Math.abs(Y) >= m.panThreshold || Math.abs(j) >= m.panThreshold, T && (l$6 = !1, clearTimeout(p), p = void 0, z = Math.abs(180 * Math.atan2(j, Y) / Math.PI), v = z > 45 && z < 135 ? "y" : "x", E = [...w], y = [...w], Y = 0, j = 0, D = 0, X = 0, null === (t = window.getSelection()) || void 0 === t || t.removeAllRanges(), S("panstart"))), T && (D || X) && S("pan"), S("move");
	}
	function B(e) {
		if (f = e, !E.length) return;
		const t = o$6(e), n = s$8(e);
		if (P = t.length, h = i$4(n), n.length && C(i$4(n)), y = [...w], w = [...t], E = [...t], P > 0) S("end"), T = !1, b = !1, A = [];
		else {
			const e = m.swipeThreshold;
			(Math.abs(k) > e || Math.abs(R) > e) && (b = !0), T && S("panend"), b && S("swipe"), T || b || M || (S("tap"), L ? S("doubleTap") : g = setTimeout(function() {
				S("singleTap");
			}, 250)), S("end"), G();
		}
	}
	function F() {
		clearTimeout(g), G(), T && S("panend"), S("end");
	}
	function G() {
		d$1 = !1, T = !1, b = !1, L = !1, P = 0, A = [], w = [], y = [], E = [], D = 0, X = 0, Y = 0, j = 0, k = 0, R = 0, z = 0, v = void 0, window.removeEventListener("mousemove", I), window.removeEventListener("mouseup", B), window.removeEventListener("blur", F), l$6 || p || (p = setTimeout(() => {
			l$6 = !0, p = void 0;
		}, 100));
	}
	function J(e) {
		const t = e.target;
		d$1 = !1, t && !e.defaultPrevented && (l$6 || (c$3(e), e.stopPropagation()));
	}
	const K = {
		init: function() {
			return e && (e.addEventListener("click", J, a$4), e.addEventListener("mousedown", H, a$4), e.addEventListener("touchstart", H, a$4), e.addEventListener("touchmove", I, a$4), e.addEventListener("touchend", B), e.addEventListener("touchcancel", B)), K;
		},
		on: function(e, t) {
			return function(e, t) {
				O.set(e, [...O.get(e) || [], t]);
			}(e, t), K;
		},
		off: function(e, t) {
			return O.has(e) && O.set(e, O.get(e).filter((e) => e !== t)), K;
		},
		isPointerDown: () => P > 0,
		destroy: function() {
			clearTimeout(g), clearTimeout(p), p = void 0, e && (e.removeEventListener("click", J, a$4), e.removeEventListener("mousedown", H, a$4), e.removeEventListener("touchstart", H, a$4), e.removeEventListener("touchmove", I, a$4), e.removeEventListener("touchend", B), e.removeEventListener("touchcancel", B)), e = null, G();
		}
	};
	return K;
};
f$1.isClickAllowed = () => l$6;
//#endregion
//#region node_modules/@fancyapps/ui/dist/panzoom/l10n/en_EN.js
/*! License details at fancyapps.com/license */
var e$3 = {
	IMAGE_ERROR: "This image couldn't be loaded. <br /> Please try again later.",
	MOVE_UP: "Move up",
	MOVE_DOWN: "Move down",
	MOVE_LEFT: "Move left",
	MOVE_RIGHT: "Move right",
	ZOOM_IN: "Zoom in",
	ZOOM_OUT: "Zoom out",
	TOGGLE_FULL: "Toggle zoom level",
	TOGGLE_1TO1: "Toggle zoom level",
	ITERATE_ZOOM: "Toggle zoom level",
	ROTATE_CCW: "Rotate counterclockwise",
	ROTATE_CW: "Rotate clockwise",
	FLIP_X: "Flip horizontally",
	FLIP_Y: "Flip vertically",
	RESET: "Reset",
	TOGGLE_FS: "Toggle fullscreen"
};
//#endregion
//#region node_modules/@fancyapps/ui/dist/utils/addClass.js
/*! License details at fancyapps.com/license */
var s$7 = (s, t = "") => {
	s && s.classList && t.split(" ").forEach((t) => {
		t && s.classList.add(t);
	});
};
//#endregion
//#region node_modules/@fancyapps/ui/dist/utils/removeClass.js
/*! License details at fancyapps.com/license */
var s$6 = (s, t = "") => {
	s && s.classList && t.split(" ").forEach((t) => {
		t && s.classList.remove(t);
	});
};
//#endregion
//#region node_modules/@fancyapps/ui/dist/utils/toggleClass.js
/*! License details at fancyapps.com/license */
var s$5 = (s, t = "", c) => {
	s && s.classList && t.split(" ").forEach((t) => {
		t && s.classList.toggle(t, c || !1);
	});
};
//#endregion
//#region node_modules/@fancyapps/ui/dist/panzoom/panzoom.js
/*! License details at fancyapps.com/license */
var h$2 = (e) => {
	e.cancelable && e.preventDefault();
};
var m$2 = (e, t = 1e4) => (e = parseFloat(e + "") || 0, Math.round((e + Number.EPSILON) * t) / t);
var p = (e) => e instanceof HTMLImageElement;
var v$2;
var b$1;
(function(e) {
	e.Reset = "reset", e.Zoom = "zoom", e.ZoomIn = "zoomIn", e.ZoomOut = "zoomOut", e.ZoomTo = "zoomTo", e.ToggleCover = "toggleCover", e.ToggleFull = "toggleFull", e.ToggleMax = "toggleMax", e.IterateZoom = "iterateZoom", e.Pan = "pan", e.Swipe = "swipe", e.Move = "move", e.MoveLeft = "moveLeft", e.MoveRight = "moveRight", e.MoveUp = "moveUp", e.MoveDown = "moveDown", e.RotateCCW = "rotateCCW", e.RotateCW = "rotateCW", e.FlipX = "flipX", e.FlipY = "flipY", e.ToggleFS = "toggleFS";
})(v$2 || (v$2 = {})), function(e) {
	e.Cover = "cover", e.Full = "full", e.Max = "max";
}(b$1 || (b$1 = {}));
var y$1 = {
	x: 0,
	y: 0,
	scale: 1,
	angle: 0,
	flipX: 1,
	flipY: 1
};
var x$1 = {
	bounds: !0,
	classes: {
		container: "f-panzoom",
		wrapper: "f-panzoom__wrapper",
		content: "f-panzoom__content",
		viewport: "f-panzoom__viewport"
	},
	clickAction: v$2.ToggleFull,
	dblClickAction: !1,
	gestures: {},
	height: "auto",
	l10n: e$3,
	maxScale: 4,
	minScale: 1,
	mouseMoveFactor: 1,
	panMode: "drag",
	protected: !1,
	singleClickAction: !1,
	spinnerTpl: "<div class=\"f-spinner\"></div>",
	wheelAction: v$2.Zoom,
	width: "auto"
};
var w$1;
var M$2 = 0;
var j = 0;
var E$1 = 0;
var S = (c, b = {}, S = {}) => {
	let k, O, T, A, C, F, Z, L, P = 0, X = Object.assign(Object.assign({}, x$1), b), Y = {}, R = Object.assign({}, y$1), z = Object.assign({}, y$1);
	const D = [];
	function I(e) {
		let t = X[e];
		return t && "function" == typeof t ? t(Ee) : t;
	}
	function W() {
		return c && c.parentElement && k && 3 === P;
	}
	const $ = /* @__PURE__ */ new Map();
	function q(e, ...t) {
		const n = [...$.get(e) || []];
		X.on && n.push(X.on[e]);
		for (const e of n) e && "function" == typeof e && e(Ee, ...t);
		"*" !== e && q("*", e, ...t);
	}
	function H(e) {
		if (!W()) return;
		const t = e.target;
		if (n$8(t)) return;
		const o = Date.now(), a = t$6(-1, [
			-e.deltaX || 0,
			-e.deltaY || 0,
			-e.detail || 0
		].reduce(function(e, t) {
			return Math.abs(t) > Math.abs(e) ? t : e;
		}), 1);
		q("wheel", e, a);
		const r = I("wheelAction");
		if (!r) return;
		if (e.defaultPrevented) return;
		const l = z.scale;
		let c = l * (a > 0 ? 1.5 : .5);
		if (r === v$2.Zoom) {
			const t = Math.abs(e.deltaY) < 100 && Math.abs(e.deltaX) < 100;
			if (o - j < (t ? 200 : 45)) return void h$2(e);
			j = o;
			const n = ne(), s = se();
			if (m$2(c) < m$2(n) && m$2(l) <= m$2(n) ? (E$1 += Math.abs(a), c = n) : m$2(c) > m$2(s) && m$2(l) >= m$2(s) ? (E$1 += Math.abs(a), c = s) : (E$1 = 0, c = t$6(n, c, s)), E$1 > 7) return;
		}
		switch (h$2(e), r) {
			case v$2.Pan:
				ce(r, {
					srcEvent: e,
					deltaX: 2 * -e.deltaX,
					deltaY: 2 * -e.deltaY
				});
				break;
			case v$2.Zoom:
				ce(v$2.ZoomTo, {
					srcEvent: e,
					scale: c,
					center: {
						x: e.clientX,
						y: e.clientY
					}
				});
				break;
			default: ce(r, { srcEvent: e });
		}
	}
	function _(e) {
		var n, o;
		const i = e.composedPath()[0];
		if (!f$1.isClickAllowed()) return;
		if (!n$9(i) || e.defaultPrevented) return;
		if (!(null == c ? void 0 : c.contains(i))) return;
		if (i.hasAttribute("disabled") || i.hasAttribute("aria-disabled") || i.hasAttribute("data-carousel-go-prev") || i.hasAttribute("data-carousel-go-next")) return;
		const s = i.closest("[data-panzoom-action]"), a = null === (n = null == s ? void 0 : s.dataset) || void 0 === n ? void 0 : n.panzoomAction, r = (null === (o = null == s ? void 0 : s.dataset) || void 0 === o ? void 0 : o.panzoomValue) || "";
		if (a) {
			switch (h$2(e), a) {
				case v$2.ZoomTo:
				case v$2.ZoomIn:
				case v$2.ZoomOut:
					ce(a, { scale: parseFloat(r || "") || void 0 });
					break;
				case v$2.MoveLeft:
				case v$2.MoveRight:
					ce(a, { deltaX: parseFloat(r || "") || void 0 });
					break;
				case v$2.MoveUp:
				case v$2.MoveDown:
					ce(a, { deltaY: parseFloat(r || "") || void 0 });
					break;
				case v$2.ToggleFS:
					Me();
					break;
				default: ce(a);
			}
			return;
		}
		if (!(null == k ? void 0 : k.contains(i))) return;
		const u = { srcEvent: e };
		if (ce(I("clickAction"), u), I("dblClickAction")) {
			const e = Date.now(), t = e - (M$2 || e);
			M$2 = e, t > 0 && t <= 250 ? (w$1 && (clearTimeout(w$1), w$1 = void 0), ce(I("dblClickAction"), u)) : w$1 = setTimeout(() => {
				ce(I("singleClickAction"), u);
			}, 250);
		}
	}
	function B(e) {
		if (L = e, !W() || !Q()) return;
		if (R.scale <= 1 || z.scale <= 1) return;
		if (((null == k ? void 0 : k.dataset.animationName) || "").indexOf("zoom") > -1) return;
		const t = ee(z.scale);
		if (!t) return;
		const { x: n, y: o } = t;
		ce(v$2.Pan, {
			deltaX: n - z.x,
			deltaY: o - z.y
		});
	}
	function N() {
		var e;
		c && (s$6(c, "is-loading"), null === (e = c.querySelector(".f-spinner")) || void 0 === e || e.remove());
	}
	function V() {
		if (!c || !O) return;
		if (N(), p(O) && (!O.complete || !O.naturalWidth)) return P = 2, k?.classList.add("has-error"), void q("error");
		q("loaded");
		const { width: e, height: t } = J();
		p(O) && (O.setAttribute("width", e + ""), O.setAttribute("height", t + "")), k && (s$6(k, "has-error"), p(O) && (k.setAttribute("width", e + ""), k.setAttribute("height", t + ""), k.style.aspectRatio = `${e / t || ""}`)), F = c$4().on("start", (e, t) => {
			void 0 !== t.angle && (t.angle = 90 * Math.round(t.angle / 90)), void 0 !== t.flipX && (t.flipX = t.flipX > 0 ? 1 : -1), void 0 !== t.flipY && (t.flipY = t.flipY > 0 ? 1 : -1), z = Object.assign(Object.assign({}, y$1), t), le(), q("animationStart");
		}).on("pause", (e) => {
			z = Object.assign(Object.assign({}, y$1), e);
		}).on("step", (e) => {
			if (!W()) return void (null == F || F.end());
			if (R = Object.assign(Object.assign({}, y$1), e), Q() || !I("bounds") || ye() || z.scale > R.scale || z.scale < oe()) return void ue();
			const t = ae(z.scale);
			let n = !1, o = !1, s = !1, a = !1;
			R.x < t.x[0] && (n = !0), R.x > t.x[1] && (o = !0), R.y < t.y[0] && (a = !0), R.y > t.y[1] && (s = !0);
			let r = !1, l = !1, c = !1, u = !1;
			z.x < t.x[0] && (r = !0), z.x > t.x[1] && (l = !0), z.y < t.y[0] && (u = !0), z.y > t.y[1] && (c = !0);
			let d = !1;
			(o && l || n && r) && (z.x = t$6(t.x[0], z.x, t.x[1]), d = !0), (s && c || a && u) && (z.y = t$6(t.y[0], z.y, t.y[1]), d = !0), d && F && F.spring({
				tension: 94,
				friction: 17,
				maxSpeed: 555 * z.scale,
				restDelta: .1,
				restSpeed: .1,
				velocity: F.getCurrentVelocities()
			}).from(R).to(z).start(), ue();
		}).on("end", () => {
			null != C && C.isPointerDown() || re(), null != F && F.isRunning() || (le(), q("animationEnd"));
		}), function() {
			const e = I("gestures");
			if (!e) return;
			if (!A || !O) return;
			let t = !1;
			C = f$1(A, e).on("start", (e) => {
				if (!I("gestures")) return;
				if (!F) return;
				if (!W() || Q()) return;
				const n = e.srcEvent;
				(R.scale > 1 || be(R.angle) || e.currentTouch.length > 1) && (n?.stopPropagation(), F.pause(), t = !0), 1 === e.currentTouch.length && q("touchStart");
			}).on("move", (e) => {
				var n;
				t && (1 !== z.scale || be(z.angle) || e.currentTouch.length > 1) && (h$2(e.srcEvent), null === (n = e.srcEvent) || void 0 === n || n.stopPropagation());
			}).on("pan", (e) => {
				if (!t) return;
				const n = e.srcEvent;
				(1 !== z.scale || be(z.angle) || e.currentTouch.length > 1) && (h$2(n), ce(v$2.Pan, e));
			}).on("swipe", (e) => {
				t && (z.scale > 1 || be(z.angle)) && ce(v$2.Swipe, e);
			}).on("tap", (e) => {
				q("click", e);
			}).on("singleTap", (e) => {
				q("singleClick", e);
			}).on("doubleTap", (e) => {
				q("dblClick", e);
			}).on("pinch", (e) => {
				t && (e.scale > oe() ? ce(v$2.ZoomIn, e) : e.scale < oe() ? ce(v$2.ZoomOut, e) : ce(v$2.Pan, e));
			}).on("end", (e) => {
				t && (e.currentTouch.length ? (e.srcEvent.stopPropagation(), h$2(e.srcEvent), F?.end()) : (t = !1, le(), re(), q("touchEnd")));
			}).init();
		}(), A && (A.addEventListener("wheel", H, { passive: !1 }), D.push(() => {
			A?.removeEventListener("wheel", H, { passive: !1 });
		})), c?.addEventListener("click", _), null === document || void 0 === document || document.addEventListener("mousemove", B), D.push(() => {
			c?.removeEventListener("click", _), null === document || void 0 === document || document.removeEventListener("mousemove", B);
		});
		const n = U();
		R = Object.assign({}, n), z = Object.assign({}, n), P = 3, ue(), le(), q("ready"), requestAnimationFrame(() => {
			3 === P && (N(), A && (A.style.visibility = ""));
		});
	}
	function U() {
		const e = Object.assign({}, I("startPos") || {});
		let t = e.scale, n = 1;
		n = "string" == typeof t ? te(t) : "number" == typeof t ? t : oe();
		const o = Object.assign(Object.assign(Object.assign({}, y$1), e), { scale: n }), i = Q() ? ee(n) : void 0;
		if (i) {
			const { x: e, y: t } = i;
			o.x = e, o.y = t;
		}
		return o;
	}
	function G() {
		const e = {
			top: 0,
			left: 0,
			width: 0,
			height: 0
		};
		if (k) {
			const t = k.getBoundingClientRect();
			be(z.angle) ? (e.top = t.top + .5 * t.height - .5 * t.width, e.left = t.left + .5 * t.width - .5 * t.height, e.width = t.height, e.height = t.width) : (e.top = t.top, e.left = t.left, e.width = t.width, e.height = t.height);
		}
		return e;
	}
	function J() {
		let t = I("width"), n = I("height");
		if (O && "auto" === t) {
			const e = O.getAttribute("width");
			t = e ? parseFloat(e + "") : void 0 !== O.dataset.width ? parseFloat(O.dataset.width + "") : p(A) ? A.naturalWidth : p(O) ? O.naturalWidth : (null == k ? void 0 : k.getBoundingClientRect().width) || 0;
		} else t = t$7(t) ? parseFloat(t) : t;
		if (O && "auto" === n) {
			const e = O.getAttribute("height");
			n = e ? parseFloat(e + "") : void 0 !== O.dataset.height ? parseFloat(O.dataset.height + "") : p(A) ? A.naturalHeight : p(O) ? O.naturalHeight : (null == k ? void 0 : k.getBoundingClientRect().height) || 0;
		} else n = t$7(n) ? parseFloat(n) : n;
		return {
			width: t,
			height: n
		};
	}
	function K() {
		const e = G();
		return {
			width: e.width,
			height: e.height
		};
	}
	function Q() {
		return "mousemove" === I("panMode") && matchMedia("(hover: hover)").matches;
	}
	function ee(e) {
		const t = L || I("event"), n = null == k ? void 0 : k.getBoundingClientRect();
		if (!t || !n || e <= 1) return {
			x: 0,
			y: 0
		};
		const o = (t.clientX || 0) - n.left, s = (t.clientY || 0) - n.top, { width: a, height: r } = K(), l = ae(e);
		if (e > 1) {
			const t = I("mouseMoveFactor");
			t > 1 && (e *= t);
		}
		let c = a * e, u = r * e, d = .5 * (c - a) - o / a * 100 / 100 * (c - a), f = .5 * (u - r) - s / r * 100 / 100 * (u - r);
		return d = t$6(l.x[0], d, l.x[1]), f = t$6(l.y[0], f, l.y[1]), {
			x: d,
			y: f
		};
	}
	function te(e) {
		if (!e) return z.scale;
		if (!c) return 1;
		const t = c.getBoundingClientRect(), n = G(), { width: o, height: s } = J(), a = (e) => {
			if ("number" == typeof e) return e;
			switch (e) {
				case "min":
				case "base": return 1;
				case "cover": return Math.max(t.height / n.height, t.width / n.width) || 1;
				case "full":
				case "max": {
					const e = be(z.angle) ? s : o;
					return e && n.width ? e / n.width : 1;
				}
			}
		}, r = I("minScale"), l = I("maxScale"), u = Math.min(a("full"), a(r)), d = "number" == typeof l ? a("full") * l : Math.min(a("full"), a(l));
		switch (e) {
			case "min": return u;
			case "base": return t$6(u, 1, d);
			case "cover": return a("cover");
			case "full": return Math.min(d, a("full"));
			case "max": return d;
		}
	}
	function ne() {
		return te("min");
	}
	function oe() {
		return te("base");
	}
	function ie() {
		return te("full");
	}
	function se() {
		return te("max");
	}
	function ae(e) {
		const t = {
			x: [0, 0],
			y: [0, 0]
		}, n = null == c ? void 0 : c.getBoundingClientRect();
		if (!n) return t;
		const o = G(), i = n.width, s = n.height;
		let a = o.width, r = o.height, l = e = void 0 === e ? z.scale : e, u = e;
		if (Q() && e > 1) {
			const t = I("mouseMoveFactor");
			t > 1 && (a * e > i + .01 && (l *= t), r * e > s + .01 && (u *= t));
		}
		if (a *= l, r *= u, a > i) {
			t.x[0] = .5 * (i - a), t.x[1] = .5 * (a - i);
			const e = .5 * (o.left - n.left), s = .5 * (o.left + o.width - n.right);
			t.x[0] -= e + s, t.x[1] -= e + s;
		}
		if (r > s) {
			t.y[0] = .5 * (s - r), t.y[1] = .5 * (r - s);
			const e = .5 * (o.top - n.top), i = .5 * (o.top + o.height - n.bottom);
			t.y[0] -= e + i, t.y[1] -= e + i;
		}
		return t;
	}
	function re() {
		if (!W()) return;
		if (!I("bounds")) return;
		if (!F) return;
		const e = ne(), t = se(), n = t$6(e, z.scale, t);
		if (z.scale < e - .01 || z.scale > t + .01) return void ce(v$2.ZoomTo, { scale: n });
		if (F.isRunning()) return;
		if (ye()) return;
		const o = ae(n);
		z.x < o.x[0] || z.x > o.x[1] || z.y < o.y[0] || z.y > o.y[1] ? (z.x = t$6(o.x[0], z.x, o.x[1]), z.y = t$6(o.y[0], z.y, o.y[1]), F.spring({
			tension: 170,
			friction: 17,
			restDelta: .001,
			restSpeed: .001,
			maxSpeed: 1 / 0,
			velocity: F.getCurrentVelocities()
		}), F.from(R).to(z).start()) : ue();
	}
	function le(e) {
		var t;
		if (!W()) return;
		const n = ve(), o = ye(), i = xe(), s = we(), a = fe(), r = ge();
		s$5(k, "is-fullsize", s), s$5(k, "is-expanded", i), s$5(k, "is-dragging", o), s$5(k, "can-drag", n), s$5(k, "will-zoom-in", a), s$5(k, "will-zoom-out", r);
		const l = me(), u = pe(), d = he(), g = !W();
		for (const n of (null === (t = e || c) || void 0 === t ? void 0 : t.querySelectorAll("[data-panzoom-action]")) || []) {
			const e = n.dataset.panzoomAction;
			let t = !1;
			if (g) t = !0;
			else switch (e) {
				case v$2.ZoomIn:
					l || (t = !0);
					break;
				case v$2.ZoomOut:
					d || (t = !0);
					break;
				case v$2.ToggleFull: {
					u || d || (t = !0);
					const e = n.querySelector("g");
					e && (e.style.display = s && !t ? "none" : "");
					break;
				}
				case v$2.IterateZoom: {
					l || d || (t = !0);
					const e = n.querySelector("g");
					e && (e.style.display = l || t ? "" : "none");
					break;
				}
				case v$2.ToggleCover:
				case v$2.ToggleMax: l || d || (t = !0);
			}
			t ? (n.setAttribute("aria-disabled", ""), n.setAttribute("tabindex", "-1")) : (n.removeAttribute("aria-disabled"), n.removeAttribute("tabindex"));
		}
	}
	function ce(e, t) {
		var n;
		if (!(e && c && O && F && W())) return;
		if (e === v$2.Swipe && Math.abs(F.getCurrentVelocities().scale) > .01) return;
		const o = Object.assign({}, z);
		let s = Object.assign({}, z), l = ae(Q() ? o.scale : R.scale);
		const u = F.getCurrentVelocities(), d = G(), f = ((null === (n = (t = t || {}).currentTouch) || void 0 === n ? void 0 : n.length) || 0) > 1, h = t.velocityX || 0, m = t.velocityY || 0;
		let p = t.center;
		t.srcEvent && (p = i$4(s$8(t.srcEvent)));
		let b = t.deltaX || 0, x = t.deltaY || 0;
		switch (e) {
			case v$2.MoveRight:
				b = t.deltaX || 100;
				break;
			case v$2.MoveLeft:
				b = t.deltaX || -100;
				break;
			case v$2.MoveUp:
				x = t.deltaY || -100;
				break;
			case v$2.MoveDown: x = t.deltaY || 100;
		}
		let w = [];
		if ("number" == typeof e) s.scale = e;
		else switch (e) {
			case v$2.Reset:
				s = Object.assign({}, y$1), s.scale = oe();
				break;
			case v$2.ZoomTo:
			case v$2.ZoomIn:
			case v$2.ZoomOut:
			case v$2.ToggleCover:
			case v$2.ToggleFull:
			case v$2.ToggleMax:
			case v$2.IterateZoom:
			case v$2.Zoom:
				s.scale = de(e, t);
				break;
			case v$2.Pan:
			case v$2.Move:
			case v$2.MoveLeft:
			case v$2.MoveRight:
			case v$2.MoveUp:
			case v$2.MoveDown:
				if (ye()) {
					let e = 1, t = 1;
					s.x <= l.x[0] && h <= 0 && (e = Math.max(.01, 1 - Math.abs(1 / d.width * Math.abs(s.x - l.x[0]))), e *= .2), s.x >= l.x[1] && h >= 0 && (e = Math.max(.01, 1 - Math.abs(1 / d.width * Math.abs(s.x - l.x[1]))), e *= .2), s.y <= l.y[0] && m <= 0 && (t = Math.max(.01, 1 - Math.abs(1 / d.height * Math.abs(s.y - l.y[0]))), t *= .2), s.y >= l.y[1] && m >= 0 && (t = Math.max(.01, 1 - Math.abs(1 / d.height * Math.abs(s.y - l.y[1]))), t *= .2), s.x += b * e, s.y += x * t;
				} else s.x = t$6(l.x[0], s.x + b, l.x[1]), s.y = t$6(l.y[0], s.y + x, l.y[1]);
				break;
			case v$2.Swipe:
				const n = (e = 0) => Math.sign(e) * Math.pow(Math.abs(e), 1.5);
				s.x += t$6(-1e3, n(h), 1e3), s.y += t$6(-1e3, n(m), 1e3), m && !h && (s.x = t$6(l.x[0], s.x, l.x[1])), !m && h && (s.y = t$6(l.y[0], s.y, l.y[1])), u.x = h, u.y = m;
				break;
			case v$2.RotateCW:
				s.angle += 90;
				break;
			case v$2.RotateCCW:
				s.angle -= 90;
				break;
			case v$2.FlipX:
				s.flipX *= -1;
				break;
			case v$2.FlipY: s.flipY *= -1;
		}
		if (void 0 !== R.angle && Math.abs(R.angle) >= 360 && (s.angle -= 360 * Math.floor(R.angle / 360), R.angle -= 360 * Math.floor(R.angle / 360)), w.length) {
			const e = w.findIndex((e) => e > s.scale + 1e-4);
			s.scale = w[e] || w[0];
		}
		if (f && (s.scale = t$6(ne() * (f ? .8 : 1), s.scale, se() * (f ? 1.6 : 1))), Q()) {
			const e = ee(s.scale);
			if (e) {
				const { x: t, y: n } = e;
				s.x = t, s.y = n;
			}
		} else if (Math.abs(s.scale - o.scale) > 1e-4) {
			let e = 0, t = 0;
			if (p) e = p.x, t = p.y;
			else {
				const n = c.getBoundingClientRect();
				e = n.x + .5 * n.width, t = n.y + .5 * n.height;
			}
			let n = e - d.left, a = t - d.top;
			n -= .5 * d.width, a -= .5 * d.height;
			const r = (n - o.x) / o.scale, u = (a - o.y) / o.scale;
			s.x = n - r * s.scale, s.y = a - u * s.scale, !f && I("bounds") && (l = ae(s.scale), s.x = t$6(l.x[0], s.x, l.x[1]), s.y = t$6(l.y[0], s.y, l.y[1]));
		}
		if (e === v$2.Swipe) {
			let e = 94, t = 17, n = 500 * s.scale, o = u;
			F.spring({
				tension: e,
				friction: t,
				maxSpeed: n,
				restDelta: .1,
				restSpeed: .1,
				velocity: o
			});
		} else e === v$2.Pan || f ? F.spring({
			tension: 900,
			friction: 17,
			restDelta: .01,
			restSpeed: .01,
			maxSpeed: 1
		}) : F.spring({
			tension: 170,
			friction: 17,
			restDelta: .001,
			restSpeed: .001,
			maxSpeed: 1 / 0,
			velocity: u
		});
		if (0 === t.velocity || n$7(R, s)) R = Object.assign({}, s), z = Object.assign({}, s), F.end(), ue(), le();
		else {
			if (n$7(z, s)) return;
			F.from(R).to(s).start();
		}
		q("action", e);
	}
	function ue() {
		if (!O || !k || !A) return;
		const { width: e, height: t } = J();
		Object.assign(k.style, {
			maxWidth: `min(${e}px, 100%)`,
			maxHeight: `min(${t}px, 100%)`
		});
		const { x: o, y: i, width: s, height: a, scale: r, angle: l, flipX: u, flipY: d } = function() {
			const { width: e, height: t } = J(), { width: n, height: o } = K();
			if (!c) return {
				x: 0,
				y: 0,
				width: 0,
				height: 0,
				scale: 0,
				flipX: 0,
				flipY: 0,
				angle: 0,
				fitWidth: n,
				fitHeight: o,
				fullWidth: e,
				fullHeight: t
			};
			let { x: i, y: s, scale: a, angle: r, flipX: l, flipY: u } = R, d = 1 / ie(), f = e, g = t, h = R.scale * d, m = z.scale * d;
			const p = Math.max(n, o), v = Math.min(n, o);
			e > t ? (f = p, g = v) : (f = v, g = p);
			h = e > t ? p * a / e || 1 : p * a / t || 1;
			let b = f ? e * m : 0, y = g ? t * m : 0, x = f && g ? e * h / b : 0;
			return i = i + .5 * f - .5 * b, s = s + .5 * g - .5 * y, {
				x: i,
				y: s,
				width: b,
				height: y,
				scale: x,
				flipX: l,
				flipY: u,
				angle: r,
				fitWidth: n,
				fitHeight: o,
				fullWidth: e,
				fullHeight: t
			};
		}();
		let f = `translate(${m$2(o, 100)}px, ${m$2(i, 100)}px)`;
		f += 1 !== u || 1 !== d ? ` scaleX(${m$2(r * u)}) scaleY(${m$2(r * d)})` : ` scale(${m$2(r)})`, 0 !== l && (f += ` rotate(${l}deg)`), A.style.width = `${m$2(s)}px`, A.style.height = `${m$2(a)}px`, A.style.transform = `${f}`, q("render");
	}
	function de(e = I("clickAction"), t = {}) {
		let n = z.scale, o = oe(), s = [];
		if ("number" == typeof e) o = e;
		else if (e) {
			switch (e) {
				case v$2.ZoomTo:
					o = t.scale || 1;
					break;
				case v$2.ZoomIn:
					o = n * (t.scale || 2);
					break;
				case v$2.ZoomOut:
					o = n * (t.scale || .5);
					break;
				case v$2.ToggleCover:
					s = [oe(), te("cover")];
					break;
				case v$2.ToggleFull:
					s = [oe(), ie()];
					break;
				case v$2.ToggleMax:
					s = [oe(), se()];
					break;
				case v$2.IterateZoom:
					s = [
						oe(),
						ie(),
						se()
					];
					break;
				case v$2.Zoom: {
					const e = ie();
					o = n >= e - .05 ? oe() : Math.min(e, n * (t.scale || 2));
					break;
				}
			}
			if (s.length) {
				const e = s.find((e) => e > n + 1e-4);
				o = null != e ? e : oe();
			}
		}
		return e !== v$2.ZoomTo && (o = t$6(ne(), o, se())), o;
	}
	function fe() {
		return !!(W() && de() > z.scale);
	}
	function ge() {
		return !!(W() && de() < z.scale);
	}
	function he() {
		return !!(W() && z.scale > ne());
	}
	function me() {
		return !!(W() && z.scale < se());
	}
	function pe() {
		return !!(W() && z.scale < ie());
	}
	function ve() {
		return !(!W() || !xe() && !be(z.angle) || !C || Q());
	}
	function be(e) {
		return 90 === Math.abs(e % 180);
	}
	function ye() {
		return !(!W() || !(null == C ? void 0 : C.isPointerDown()) || Q());
	}
	function xe() {
		return !!(W() && z.scale > oe());
	}
	function we() {
		return !!(W() && z.scale >= ie());
	}
	function Me() {
		const e = "in-fullscreen", t = "with-panzoom-in-fullscreen";
		c?.classList.toggle(e);
		const n = null == c ? void 0 : c.classList.contains(e);
		n ? (document.documentElement.classList.add(t), document.addEventListener("keydown", je, !0)) : (document.documentElement.classList.remove(t), document.removeEventListener("keydown", je, !0)), ue(), q(n ? "enterFS" : "exitFS");
	}
	function je(e) {
		"Escape" !== e.key || e.defaultPrevented || Me();
	}
	const Ee = {
		canDrag: ve,
		canZoomIn: me,
		canZoomOut: he,
		canZoomToFull: pe,
		destroy: function() {
			q("destroy");
			for (const e of Object.values(Y)) e?.destroy(Ee);
			for (const e of D) e();
			return k && (k.style.aspectRatio = "", k.style.maxWidth = "", k.style.maxHeight = ""), A && (A.style.width = "", A.style.height = "", A.style.transform = ""), k = void 0, O = void 0, A = void 0, R = Object.assign({}, y$1), z = Object.assign({}, y$1), F?.destroy(), F = void 0, C?.destroy(), C = void 0, P = 4, Ee;
		},
		emit: q,
		execute: ce,
		getBoundaries: ae,
		getContainer: function() {
			return c;
		},
		getContent: function() {
			return O;
		},
		getFullDim: J,
		getGestures: function() {
			return C;
		},
		getMousemovePos: ee,
		getOptions: function() {
			return X;
		},
		getPlugins: function() {
			return Y;
		},
		getScale: te,
		getStartPosition: U,
		getState: function() {
			return P;
		},
		getTransform: function(e) {
			return !0 === e ? z : R;
		},
		getTween: function() {
			return F;
		},
		getViewport: function() {
			return A;
		},
		getWrapper: function() {
			return k;
		},
		init: function() {
			return P = 0, q("init"), function() {
				for (const [e, t] of Object.entries(Object.assign(Object.assign({}, S), X.plugins || {}))) if (e && !Y[e] && t instanceof Function) {
					const n = t();
					n.init(Ee), Y[e] = n;
				}
				q("initPlugins");
			}(), function() {
				var e, t, n;
				const o = Object.assign(Object.assign({}, x$1.classes), I("classes")), i = null === (e = o.content) || void 0 === e ? void 0 : e.split(" ").shift(), s = null === (t = o.wrapper) || void 0 === t ? void 0 : t.split(" ").shift(), a = null === (n = o.viewport) || void 0 === n ? void 0 : n.split(" ").shift();
				if (!i || !s || !a) return;
				if (!c) return;
				if (s$7(c, o.container), O = c.querySelector(`.${i}:not(.is-clone)`), !O) return;
				O.setAttribute("draggable", "false"), k = c.querySelector(`.${s}`), k || (k = document.createElement("div"), s$7(k, o.wrapper), O.insertAdjacentElement("beforebegin", k), k.insertAdjacentElement("afterbegin", O));
				A = c.querySelector(`.${a}`), A || (A = document.createElement("div"), s$7(A, o.viewport), k.insertAdjacentElement("beforeend", A));
				A.contains(O) || A.insertAdjacentElement("afterbegin", O);
				T = c.querySelector(`.${i}.is-clone`), T || (T = O.cloneNode(!0), T.removeAttribute("id"), s$7(T, "is-clone"), k.insertAdjacentElement("afterbegin", T));
				O instanceof HTMLPictureElement && (O = O.querySelector("img"));
				T instanceof HTMLPictureElement && (T = T.querySelector("img"));
				A instanceof HTMLPictureElement && (A = A.querySelector("img"));
				if (A && (A.style.visibility = "hidden", I("protected"))) {
					A.addEventListener("contextmenu", (e) => {
						h$2(e);
					});
					const e = document.createElement("div");
					s$7(e, "f-panzoom__protected"), A.appendChild(e);
				}
				q("initLayout");
			}(), function() {
				if (c && k && !Z) {
					let e = null;
					Z = new ResizeObserver(() => {
						W() && (e = e || requestAnimationFrame(() => {
							W() && (le(), re(), q("refresh")), e = null;
						}));
					}), Z.observe(k), D.push(() => {
						Z?.disconnect(), Z = void 0, e && (cancelAnimationFrame(e), e = null);
					});
				}
			}(), function() {
				if (!c || !O) return;
				if (!p(O) || !p(T)) return void V();
				const e = () => {
					O && p(O) && O.decode().then(() => {
						V();
					}).catch(() => {
						V();
					});
				};
				if (P = 1, c.classList.add("is-loading"), q("loading"), T.src && T.complete) return void e();
				(function() {
					if (!c) return;
					if (null == c ? void 0 : c.querySelector(".f-spinner")) return;
					const t = e$7(I("spinnerTpl"));
					t && (t.classList.add("f-spinner"), c.classList.add("is-loading"), k?.insertAdjacentElement("afterbegin", t));
				})(), T.addEventListener("load", e, !1), T.addEventListener("error", e, !1), D.push(() => {
					T?.removeEventListener("load", e, !1), T?.removeEventListener("error", e, !1);
				});
			}(), Ee;
		},
		isDragging: ye,
		isExpanded: xe,
		isFullsize: we,
		isMousemoveMode: Q,
		localize: function(e, t = []) {
			const n = I("l10n") || {};
			e = String(e).replace(/\{\{(\w+)\}\}/g, (e, t) => n[t] || e);
			for (let n = 0; n < t.length; n++) e = e.split(t[n][0]).join(t[n][1]);
			return e = e.replace(/\{\{(.*?)\}\}/g, (e, t) => t);
		},
		off: function(e, t) {
			for (const n of e instanceof Array ? e : [e]) $.has(n) && $.set(n, $.get(n).filter((e) => e !== t));
			return Ee;
		},
		on: function(e, t) {
			for (const n of e instanceof Array ? e : [e]) $.set(n, [...$.get(n) || [], t]);
			return Ee;
		},
		toggleFS: Me,
		updateControls: le,
		version: "6.1.14",
		willZoomIn: fe,
		willZoomOut: ge
	};
	return Ee;
};
S.l10n = { en_EN: e$3 }, S.getDefaults = () => x$1;
//#endregion
//#region node_modules/@fancyapps/ui/dist/utils/getDirectChildren.js
/*! License details at fancyapps.com/license */
var e$2 = (e, o) => {
	let t = [];
	return e.childNodes.forEach((e) => {
		e.nodeType !== Node.ELEMENT_NODE || o && !e.matches(o) || t.push(e);
	}), t;
};
//#endregion
//#region node_modules/@fancyapps/ui/dist/utils/extend.js
/*! License details at fancyapps.com/license */
var r$2 = (t, ...e) => {
	const n = e.length;
	for (let c = 0; c < n; c++) {
		const n = e[c] || {};
		Object.entries(n).forEach(([e, n]) => {
			const c = Array.isArray(n) ? [] : {};
			t[e] || Object.assign(t, { [e]: c }), t$5(n) ? Object.assign(t[e], r$2(t[e], n)) : Array.isArray(n) ? Object.assign(t, { [e]: [...n] }) : Object.assign(t, { [e]: n });
		});
	}
	return t;
};
//#endregion
//#region node_modules/@fancyapps/ui/dist/utils/map.js
/*! License details at fancyapps.com/license */
var t$3 = function(t = 0, n = 0, r = 0, c = 0, m = 0, p = !1) {
	const s = (t - n) / (r - n) * (m - c) + c;
	return p ? c < m ? t$6(c, s, m) : t$6(m, s, c) : s;
};
//#endregion
//#region node_modules/@fancyapps/ui/dist/carousel/l10n/en_EN.js
/*! License details at fancyapps.com/license */
var o$5 = Object.assign(Object.assign({}, e$3), {
	ERROR: "Something went wrong. <br /> Please try again later.",
	NEXT: "Next page",
	PREV: "Previous page",
	GOTO: "Go to page #%d",
	DOWNLOAD: "Download",
	TOGGLE_FULLSCREEN: "Toggle full-screen mode",
	TOGGLE_EXPAND: "Toggle full-size mode",
	TOGGLE_THUMBS: "Toggle thumbnails",
	TOGGLE_AUTOPLAY: "Toggle slideshow"
});
//#endregion
//#region node_modules/@fancyapps/ui/dist/carousel/carousel.js
/*! License details at fancyapps.com/license */
var m$1 = (t) => {
	t.cancelable && t.preventDefault();
};
var h$1 = {
	adaptiveHeight: !1,
	center: !0,
	classes: {
		container: "f-carousel",
		isEnabled: "is-enabled",
		isLTR: "is-ltr",
		isRTL: "is-rtl",
		isHorizontal: "is-horizontal",
		isVertical: "is-vertical",
		hasAdaptiveHeight: "has-adaptive-height",
		viewport: "f-carousel__viewport",
		slide: "f-carousel__slide",
		isSelected: "is-selected"
	},
	dragFree: !1,
	enabled: !0,
	errorTpl: "<div class=\"f-html\">{{ERROR}}</div>",
	fill: !0,
	infinite: !0,
	initialPage: 0,
	l10n: o$5,
	rtl: !1,
	slides: [],
	slidesPerPage: "auto",
	spinnerTpl: "<div class=\"f-spinner\"></div>",
	transition: "fade",
	tween: {
		clamp: !0,
		mass: 1,
		tension: 160,
		friction: 25,
		restDelta: 1,
		restSpeed: 1,
		velocity: 0
	},
	vertical: !1
};
var b;
var y;
var E = 0;
var x = (g, M = {}, w = {}) => {
	E++;
	let S, A, j, L, P, T = 0, O = Object.assign({}, h$1), R = Object.assign({}, h$1), H = {}, V = null, C = null, $ = 0, D = 0, I = 0, q = !1, k = !1, F = !1, z = "height", B = 0, N = !0, _ = 0, G = 0, X = 0, Y = 0, W = "*", J = [], K = [];
	const Q = /* @__PURE__ */ new Set();
	let U = [], Z = [], tt = 0, et = 0, nt = 0;
	function it(t, ...e) {
		let n = R[t];
		return n && n instanceof Function ? n(Ft, ...e) : n;
	}
	function ot(t, e = []) {
		const n = it("l10n") || {};
		t = String(t).replace(/\{\{(\w+)\}\}/g, (t, e) => n[e] || t);
		for (let n = 0; n < e.length; n++) t = t.split(e[n][0]).join(e[n][1]);
		return t = t.replace(/\{\{(.*?)\}\}/g, (t, e) => e);
	}
	const st = /* @__PURE__ */ new Map();
	function rt(t, ...e) {
		const n = [...st.get(t) || []];
		R.on && n.push(R.on[t]);
		for (const t of n) t && t instanceof Function && t(Ft, ...e);
		"click" === t && Ot(e[0]), "*" !== t && rt("*", t, ...e);
	}
	function lt() {
		var e, n;
		const i = r$2({}, h$1, O);
		let r = "";
		const l = O.breakpoints || {};
		for (const [t, e] of Object.entries(l)) window.matchMedia(t).matches && (r += t, r$2(i, e));
		if (void 0 === P || r !== P) {
			if (P = r, 0 !== T) {
				let t = null === (n = null === (e = Z[_]) || void 0 === e ? void 0 : e.slides[0]) || void 0 === n ? void 0 : n.index;
				void 0 === t && (t = R.initialSlide), i.initialSlide = t, i.slides = [];
				for (const t of J) t.isVirtual && i.slides.push(t);
			}
			It(), R = i, !1 !== it("enabled") && (T = 0, rt("init"), function() {
				for (const [t, e] of Object.entries(Object.assign(Object.assign({}, w), R.plugins || {}))) if (t && !H[t] && e instanceof Function) {
					const n = e();
					n.init(Ft, x), H[t] = n;
				}
				rt("initPlugins");
			}(), function() {
				if (!V) return;
				const e = it("classes") || {};
				s$7(V, e.container);
				const n = it("style");
				if (n && t$5(n)) for (const [t, e] of Object.entries(n)) V.style.setProperty(t, e);
				C = Array.from(V.querySelectorAll(`.${e.viewport}`)).filter((t) => t.closest(`.${e.container}`) === V).pop() || null, C || (C = document.createElement("div"), s$7(C, e.viewport), C.append(...e$2(V, `.${e.slide}`)), V.insertAdjacentElement("afterbegin", C)), V.carousel = Ft, rt("initLayout");
			}(), function() {
				if (!C) return;
				const t = it("classes") || {};
				J = [], [...e$2(C, `.${t.slide}`)].forEach((t) => {
					if (t.parentElement) {
						const e = Et(Object.assign({
							el: t,
							isVirtual: !1
						}, t.dataset || {}));
						rt("createSlide", e), J.push(e);
					}
				}), St();
				for (const t of J) rt("addSlide", t);
				yt(it("slides"));
				for (const t of J) {
					const e = t.el;
					(null == e ? void 0 : e.parentElement) === C && (s$7(e, R.classes.slide), s$7(e, t.class), Vt(t), rt("attachSlideEl", t));
				}
				rt("initSlides");
			}(), At(), T = 1, s$7(V, (it("classes") || {}).isEnabled || ""), Dt(), ft(), A = c$4().on("start", () => {
				S && S.isPointerDown() || (ut(), Dt());
			}).on("step", (t) => {
				const e = B;
				B = t.pos, B !== e && (N = !1, Dt());
			}).on("end", (t) => {
				null != S && S.isPointerDown() || (B = t.pos, A && !q && (B < X || B > Y) ? A.spring({
					clamp: !0,
					mass: 1,
					tension: 200,
					friction: 25,
					velocity: 0,
					restDelta: 1,
					restSpeed: 1
				}).from({ pos: B }).to({ pos: t$6(X, B, Y) }).start() : N || (N = !0, rt("settle")));
			}), ct(), function() {
				if (!V || !C) return;
				V.addEventListener("click", Tt), document.addEventListener("mousemove", at), y || (y = function(t) {
					var e, n;
					const i = null === (n = null === (e = t.target) || void 0 === e ? void 0 : e.dataset) || void 0 === n ? void 0 : n.carouselTarget;
					if (i) {
						const e = document.getElementById(`${i.split("#").pop()}`);
						(null == e ? void 0 : e.carousel)?.emit("click", t);
					}
				}, document.addEventListener("click", y));
				const t = C.getBoundingClientRect();
				if (tt = t.height, et = t.width, !j) {
					let t = null;
					j = new ResizeObserver(() => {
						t || (t = requestAnimationFrame(() => {
							(function() {
								if (1 !== T || !C) return;
								const t = Z.length, e = C.getBoundingClientRect(), n = e.height, i = e.width;
								t > 1 && (F && Math.abs(n - tt) < .5 || !F && Math.abs(i - et) < .5) || (At(), ct(), tt = n, et = i, F && !tt || !F && !et || V && C && (t === Z.length && null != S && S.isPointerDown() || (it("dragFree") && (q || B > X && B < Y) ? (ut(), Dt()) : Ct(_, { transition: !1 }))));
							})(), t = null;
						}));
					}), j.observe(C);
				}
			}(), rt("ready"));
		}
	}
	function at(t) {
		b = t;
	}
	function ct() {
		!1 === it("gestures") ? S && (S.destroy(), S = void 0) : S || function() {
			const t = it("gestures");
			!S && !1 !== t && C && (S = f$1(C, t).on("start", (t) => {
				var e, n;
				if (!A) return;
				if (!1 === it("gestures", t)) return;
				const { srcEvent: o } = t;
				F && e$4(o) && !n$8(o.target) && m$1(o), A.pause(), A.getCurrentVelocities().pos = 0;
				const s = null === (e = Z[_]) || void 0 === e ? void 0 : e.slides[0], r = null == s ? void 0 : s.el;
				s && Q.has(s.index) && r && (B = s.offset || 0, B += (function(t) {
					const e = window.getComputedStyle(t), n = new DOMMatrixReadOnly(e.transform);
					return {
						width: n.m41 || 0,
						height: n.m42 || 0
					};
				}(r)[z] || 0) * (k && !F ? 1 : -1)), Lt(), q || (B < X || B > Y) && A.spring({
					clamp: !0,
					mass: 1,
					tension: 500,
					friction: 25,
					velocity: (null === (n = A.getCurrentVelocities()) || void 0 === n ? void 0 : n.pos) || 0,
					restDelta: 1,
					restSpeed: 1
				}).from({ pos: B }).to({ pos: t$6(X, B, Y) }).start();
			}).on("move", (t) => {
				var e, n;
				if (!1 === it("gestures", t)) return;
				const { srcEvent: o, axis: s, deltaX: r, deltaY: l } = t;
				if (e$4(o) && (null === (e = o.touches) || void 0 === e ? void 0 : e.length) > 1) return;
				const a = o.target, c = n$8(a), d = c ? c.scrollHeight > c.clientHeight ? "y" : "x" : void 0;
				if (c && c !== C && (!s || s === d)) return;
				if (!s) return m$1(o), o.stopPropagation(), void o.stopImmediatePropagation();
				if ("y" === s && !F || "x" === s && F) return;
				if (m$1(o), o.stopPropagation(), !A) return;
				const u = k && !F ? 1 : -1, f = F ? l : r;
				let v = (null == A ? void 0 : A.isRunning()) ? A.getEndValues().pos : B, g = 1;
				q || (v <= X && f * u < 0 ? (g = Math.max(.01, 1 - (Math.abs(1 / mt() * Math.abs(v - X)) || 0)), g *= .2) : v >= Y && f * u > 0 && (g = Math.max(.01, 1 - (Math.abs(1 / mt() * Math.abs(v - Y)) || 0)), g *= .2)), v += f * g * u, A.spring({
					clamp: !0,
					mass: 1,
					tension: 700,
					friction: 25,
					velocity: (null === (n = A.getCurrentVelocities()) || void 0 === n ? void 0 : n.pos) || 0,
					restDelta: 1,
					restSpeed: 1
				}).from({ pos: B }).to({ pos: v }).start();
			}).on("panstart", (t) => {
				!1 !== it("gestures", t) && (null == t ? void 0 : t.axis) === (F ? "y" : "x") && s$7(C, "is-dragging");
			}).on("panend", (t) => {
				!1 !== it("gestures", t) && s$6(C, "is-dragging");
			}).on("end", (t) => {
				var e, n;
				if (!1 === it("gestures", t)) return;
				const { srcEvent: o, axis: s, velocityX: r, velocityY: l, currentTouch: c } = t;
				if (c.length > 0 || !A) return;
				const d = o.target, u = n$8(d), f = u ? u.scrollHeight > u.clientHeight ? "y" : "x" : void 0, v = u && (!s || s === f);
				F && e$4(o) && !s && Tt(o);
				const g = Z.length, m = it("dragFree");
				if (!g) return;
				let h = v ? 0 : it("vertical") ? l : r;
				s !== (F ? "y" : "x") && (h = 0);
				let b = (null == A ? void 0 : A.isRunning()) ? A.getEndValues().pos : B;
				const y = k && !F ? 1 : -1;
				if (v || (b += h * (m ? 5 : 1) * y), !q && (h * y <= 0 && b < X || h * y >= 0 && b > Y)) {
					let t = 0;
					Math.abs(h) > 0 && (t = 2 * Math.abs(h), t = Math.min(.3 * mt(), t)), b = t$6(X + -1 * t, b, Y + t), A.spring({
						clamp: !0,
						mass: 1,
						tension: 380,
						friction: 25,
						velocity: -1 * h,
						restDelta: 1,
						restSpeed: 1
					}).from({ pos: B }).to({ pos: b }).start();
					return;
				}
				if (m || (null === (e = H.Autoscroll) || void 0 === e ? void 0 : e.isEnabled())) return void (Math.abs(h) > 10 ? A.spring({
					clamp: !0,
					mass: 1,
					tension: 150,
					friction: 25,
					velocity: -1 * h,
					restDelta: 1,
					restSpeed: 1
				}).from({ pos: B }).to({ pos: b }).start() : A.isRunning() || N || (N = !0, rt("settle")));
				if (!m && !(null === (n = H.Autoscroll) || void 0 === n ? void 0 : n.isEnabled()) && (!t.offsetX && !t.offsetY || "y" === s && !F || "x" === s && F)) return void Ct(_, { transition: "tween" });
				let E = pt(b);
				Math.abs(h) > 10 && E === _ && (E += h > 0 ? k && !F ? 1 : -1 : k && !F ? -1 : 1), Ct(E, {
					transition: "tween",
					tween: { velocity: -1 * h }
				});
			}).init());
		}(), s$5(C, "is-draggable", !!S && Z.length > 0);
	}
	function dt(t = "*") {
		var e;
		const n = [];
		for (const i of J) ("*" === t || i.class && i.class.includes(t) || i.el && null !== (e = i.el) && void 0 !== e && e.classList.contains(t)) && n.push(i);
		L = void 0, W = t, K = [...n];
	}
	function ut() {
		if (!A) return;
		const t = pt((null == A ? void 0 : A.isRunning()) ? A.getEndValues().pos : B);
		t !== _ && (L = _, _ = t, Vt(), ft(), vt(), rt("change", _, L));
	}
	function ft() {
		var t, e;
		if (!V) return;
		for (const t of V.querySelectorAll("[data-carousel-index]")) t.innerHTML = _ + "";
		for (const t of V.querySelectorAll("[data-carousel-page]")) t.innerHTML = _ + 1 + "";
		for (const t of V.querySelectorAll("[data-carousel-pages]")) t.innerHTML = Z.length + "";
		const n = it("classes") || {}, i = Array.from(V.querySelectorAll("[data-carousel-go-to]")).filter((t) => t.closest(`.${n.container}`) === V);
		for (const e of i) parseInt((null === (t = e.dataset) || void 0 === t ? void 0 : t.carouselGoTo) || "-1", 10) === _ ? e.setAttribute("aria-current", "true") : e.removeAttribute("aria-current");
		for (const t of V.querySelectorAll("[data-carousel-go-prev]")) t.toggleAttribute("aria-disabled", !qt()), qt() ? t.removeAttribute("tabindex") : t.setAttribute("tabindex", "-1");
		for (const t of V.querySelectorAll("[data-carousel-go-next]")) t.toggleAttribute("aria-disabled", !kt()), kt() ? t.removeAttribute("tabindex") : t.setAttribute("tabindex", "-1");
		let o = !1;
		const s = null === (e = Z[_]) || void 0 === e ? void 0 : e.slides[0];
		s && (s.downloadSrc || "image" === s.type && s.src) && (o = !0);
		for (const t of V.querySelectorAll("[data-carousel-download]")) t.toggleAttribute("aria-disabled", !o);
	}
	function vt(t) {
		var e;
		t || (t = null === (e = Z[_]) || void 0 === e ? void 0 : e.slides[0]);
		const n = null == t ? void 0 : t.el;
		if (n) for (const e of n.querySelectorAll("[data-slide-index]")) e.innerHTML = t.index + 1 + "";
	}
	function pt(t) {
		var e, n, i;
		if (!Z.length) return 0;
		const o = ht();
		let s = t;
		q ? s -= Math.floor((t - (null === (e = Z[0]) || void 0 === e ? void 0 : e.pos)) / o) * o || 0 : s = t$6(null === (n = Z[0]) || void 0 === n ? void 0 : n.pos, t, null === (i = Z[Z.length - 1]) || void 0 === i ? void 0 : i.pos);
		const r = /* @__PURE__ */ new Map();
		let l = 0;
		for (const t of Z) {
			const e = Math.abs(t.pos - s), n = Math.abs(t.pos - s - o), i = Math.abs(t.pos - s + o), a = Math.min(e, n, i);
			r.set(l, a), l++;
		}
		const c = r.size > 0 ? [...r.entries()].reduce((t, e) => e[1] < t[1] ? e : t) : [_, 0];
		return parseInt(c[0]);
	}
	function gt() {
		return nt;
	}
	function mt() {
		return $;
	}
	function ht(t = !0) {
		return K.length ? K.reduce((t, e) => t + e.dim, 0) + (K.length - (q && t ? 0 : 1)) * nt : 0;
	}
	function bt(t) {
		const e = ht(), n = mt();
		if (!e || !C || !n) return [];
		const i = [];
		t = void 0 === t ? B : t, q && (t -= Math.floor(t / e) * e || 0);
		let o = 0;
		for (let s of K) {
			const r = (e = 0) => {
				i.indexOf(s) > -1 || (s.pos = o - t + e || 0, s.offset + e > t - s.dim - D + .51 && s.offset + e < t + n + I - .51 && i.push(s));
			};
			s.offset = o, q && (r(e), r(-1 * e)), r(), o += s.dim + nt;
		}
		return i;
	}
	function yt(t, e) {
		const n = [];
		for (const e of Array.isArray(t) ? t : [t]) {
			const t = Et(Object.assign(Object.assign({}, e), { isVirtual: !0 }));
			t.el || (t.el = document.createElement("div")), rt("createSlide", t), n.push(t);
		}
		J.splice(void 0 === e ? J.length : e, 0, ...n), St();
		for (const t of n) rt("addSlide", t), xt(t);
		return dt(W), n;
	}
	function Et(t) {
		return (t$7(t) || t instanceof HTMLElement) && (t = { html: t }), Object.assign({
			index: -1,
			el: void 0,
			class: "",
			isVirtual: !0,
			dim: 0,
			pos: 0,
			offset: 0,
			html: "",
			src: ""
		}, t);
	}
	function xt(t) {
		let e = t.el;
		if (!t || !e) return;
		const n = t.html ? t.html instanceof HTMLElement ? t.html : e$7(t.html) : void 0;
		n && (s$7(n, "f-html"), t.htmlEl = n, s$7(e, "has-html"), e.append(n), rt("contentReady", t));
	}
	function Mt(t) {
		if (!C || !t) return;
		let e = t.el;
		if (e) {
			if (e.setAttribute("index", t.index + ""), e.parentElement !== C) {
				let n;
				s$7(e, R.classes.slide), s$7(e, t.class), Vt(t);
				for (const e of J) if (e.index > t.index) {
					n = e.el;
					break;
				}
				C.insertBefore(e, n && C.contains(n) ? n : null), rt("attachSlideEl", t);
			}
			return vt(t), e;
		}
	}
	function wt(t) {
		const e = null == t ? void 0 : t.el;
		e && (e.remove(), jt(e), rt("detachSlideEl", t));
	}
	function St() {
		for (let t = 0; t < J.length; t++) {
			const e = J[t], n = e.el;
			n && (e.index !== t && jt(n), n.setAttribute("index", `${t}`)), e.index = t;
		}
	}
	function At() {
		var t, n, i, o, s;
		if (!V || !C) return;
		k = it("rtl"), F = it("vertical"), z = F ? "height" : "width";
		const r = it("classes");
		if (s$5(V, r.isLTR, !k), s$5(V, r.isRTL, k), s$5(V, r.isHorizontal, !F), s$5(V, r.isVertical, F), s$5(V, r.hasAdaptiveHeight, it("adaptiveHeight")), $ = 0, D = 0, I = 0, nt = 0, C) {
			C.childElementCount || (C.style.display = "grid");
			const t = C.getBoundingClientRect();
			$ = C.getBoundingClientRect()[z] || 0;
			const e = window.getComputedStyle(C);
			nt = parseFloat(e.getPropertyValue("--f-carousel-gap")) || 0;
			"visible" === e.getPropertyValue("overflow-" + (F ? "y" : "x")) && (D = Math.abs(t[F ? "top" : "left"]), I = Math.abs(window[F ? "innerHeight" : "innerWidth"] - t[F ? "bottom" : "right"])), C.style.display = "";
		}
		if (!$) return;
		const l = function() {
			let t = 0;
			if (C) {
				let e = document.createElement("div");
				e.style.display = "block", s$7(e, R.classes.slide), C.appendChild(e), t = e.getBoundingClientRect()[z], e.remove(), e = void 0;
			}
			return t;
		}();
		for (const n of K) {
			const i = n.el;
			let o = 0;
			if (!n.isVirtual && i && n$9(i)) {
				let e = !1;
				i.parentElement && i.parentElement === C || (C.appendChild(i), e = !0), o = i.getBoundingClientRect()[z], e && (null === (t = i.parentElement) || void 0 === t || t.removeChild(i));
			} else o = l;
			n.dim = o;
		}
		if (q = !1, it("infinite")) {
			q = !0;
			const t = ht();
			let e = $ + D + I;
			for (let i = 0; i < K.length; i++) {
				const o = (null === (n = K[i]) || void 0 === n ? void 0 : n.dim) + nt;
				if (t - o < e && t - o - e < o) {
					q = !1;
					break;
				}
			}
		}
		(function() {
			var t;
			if (!V) return;
			const e = mt(), n = ht(!1);
			let i = it("slidesPerPage");
			i = "auto" === i ? 1 / 0 : parseFloat(i + ""), Z = [];
			let o = 0, s = 0;
			for (const n of K) (!Z.length || o + n.dim - e > .05 || s >= i) && (Z.push({
				index: Z.length,
				slides: [],
				dim: 0,
				offset: 0,
				pos: 0
			}), o = 0, s = 0), null === (t = Z[Z.length - 1]) || void 0 === t || t.slides.push(n), o += n.dim + nt, s++;
			const r = it("center"), l = it("fill");
			let c = 0;
			for (const t of Z) {
				t.dim = (t.slides.length - 1) * nt;
				for (const e of t.slides) t.dim += e.dim;
				t.offset = c, t.pos = c, !1 !== r && (t.pos -= .5 * (e - t.dim)), l && !q && n > e && (t.pos = t$6(0, t.pos, n - e)), c += t.dim + nt;
			}
			const d = [];
			let u;
			for (const t of Z) {
				const e = Object.assign({}, t);
				u && Math.abs(e.pos - u.pos) < .1 ? (u.dim += e.dim, u.slides = [...u.slides, ...e.slides]) : (u = e, e.index = d.length, d.push(e));
			}
			Z = d, _ = t$6(0, _, Z.length - 1);
		})(), X = (null === (i = Z[0]) || void 0 === i ? void 0 : i.pos) || 0, Y = (null === (o = Z[Z.length - 1]) || void 0 === o ? void 0 : o.pos) || 0, 0 === T ? function() {
			var t;
			L = void 0, _ = it("initialPage");
			const e = it("initialSlide") || void 0;
			void 0 !== e && (_ = Ft.getPageIndex(e) || 0), _ = t$6(0, _, Z.length - 1), B = (null === (t = Z[_]) || void 0 === t ? void 0 : t.pos) || 0, G = B;
		}() : G = (null === (s = Z[_ || 0]) || void 0 === s ? void 0 : s.pos) || 0, rt("refresh"), ft();
	}
	function jt(t) {
		if (!t || !n$9(t)) return;
		const n = parseInt(t.getAttribute("index") || "-1");
		let i = "";
		for (const e of Array.from(t.classList)) {
			const t = e.match(/^f-(\w+)(Out|In)$/);
			t && t[1] && (i = t[1] + "");
		}
		if (!t || !i) return;
		const o = [
			`f-${i}Out`,
			`f-${i}In`,
			"to-prev",
			"to-next",
			"from-prev",
			"from-next"
		];
		t.removeEventListener("animationend", Pt), s$6(t, o.join(" ")), Q.delete(n);
	}
	function Lt() {
		if (!C) return;
		const t = Q.size > 0;
		for (const t of K) jt(t.el);
		Q.clear(), t && Dt();
	}
	function Pt(t) {
		var e;
		"f-" === (null === (e = t.animationName) || void 0 === e ? void 0 : e.substring(0, 2)) && (jt(t.target), Q.size || (s$6(V, "in-transition"), !N && Math.abs(Ft.getPosition(!0) - G) < .5 && (N = !0, rt("settle"))), Dt());
	}
	function Tt(t) {
		Ot(t), rt("click", t);
	}
	function Ot(t) {
		var e;
		if (t.defaultPrevented) return;
		const n = t.composedPath()[0];
		if (n.closest("[data-carousel-go-prev]")) return m$1(t), void Ft.prev();
		if (n.closest("[data-carousel-go-next]")) return m$1(t), void Ft.next();
		const i = n.closest("[data-carousel-go-to]");
		if (i) return m$1(t), void Ft.goTo(parseFloat(i.dataset.carouselGoTo || "") || 0);
		if (n.closest("[data-carousel-download]")) {
			m$1(t);
			const n = null === (e = Z[_]) || void 0 === e ? void 0 : e.slides[0];
			if (n && (n.downloadSrc || "image" === n.type && n.src)) {
				const t = n.downloadFilename, e = document.createElement("a"), i = n.downloadSrc || n.src || "";
				e.href = i, e.target = "_blank", e.download = t || i, e.click();
			}
			return;
		}
	}
	function Rt(t) {
		var e;
		const n = t.el;
		n && (null === (e = n.querySelector(".f-spinner")) || void 0 === e || e.remove());
	}
	function Ht(t) {
		var e;
		const n = t.el;
		n && (null === (e = n.querySelector(".f-html.is-error")) || void 0 === e || e.remove(), s$6(n, "has-error"));
	}
	function Vt(t) {
		var e;
		t || (t = null === (e = Z[_]) || void 0 === e ? void 0 : e.slides[0]);
		const i = null == t ? void 0 : t.el;
		if (!i) return;
		let o = it("formatCaption", t);
		void 0 === o && (o = t.caption), o = o || "";
		const s = it("captionEl");
		if (s && s instanceof HTMLElement) {
			if (t.index !== _) return;
			if (t$7(o) && (s.innerHTML = ot(o + "")), o instanceof HTMLElement) {
				if (o.parentElement === s) return;
				s.innerHTML = "", o.parentElement && (o = o.cloneNode(!0)), s.append(o);
			}
			return;
		}
		if (!o) return;
		let r = t.captionEl || i.querySelector(".f-caption");
		!r && o instanceof HTMLElement && o.classList.contains("f-caption") && (r = o), r || (r = document.createElement("div"), s$7(r, "f-caption"), t$7(o) ? r.innerHTML = ot(o + "") : o instanceof HTMLElement && (o.parentElement && (o = o.cloneNode(!0)), r.append(o)));
		const l = `f-caption-${E}_${t.index}`;
		r.setAttribute("id", l), r.dataset.selectable = "true", s$7(i, "has-caption"), i.setAttribute("aria-labelledby", l), t.captionEl = r, i.insertAdjacentElement("beforeend", r);
	}
	function Ct(e, i = {}) {
		var o, r;
		let { transition: l, tween: u } = Object.assign({
			transition: R.transition,
			tween: R.tween
		}, i || {});
		if (!V || !A) return;
		const f = Z.length;
		if (!f) return;
		if (function(t, e) {
			var i, o, s;
			if (!(V && $ && A && e && t$7(e) && "tween" !== e)) return !1;
			for (const t of U) if ($ - t.dim > .5) return !1;
			if (D > .5 || I > .5) return;
			const r = Z.length;
			let l = t > _ ? 1 : -1;
			t = q ? (t % r + r) % r : t$6(0, t, r - 1), k && (l *= -1);
			const u = null === (i = Z[_]) || void 0 === i ? void 0 : i.slides[0], f = null == u ? void 0 : u.index, v = null === (o = Z[t]) || void 0 === o ? void 0 : o.slides[0], p = null == v ? void 0 : v.index, g = null === (s = Z[t]) || void 0 === s ? void 0 : s.pos;
			if (void 0 === p || void 0 === f || f === p || B === g || Math.abs($ - ((null == v ? void 0 : v.dim) || 0)) > 1) return !1;
			N = !1, A.pause(), Lt(), s$7(V, "in-transition"), B = G = g;
			const m = Mt(u), h = Mt(v);
			return ut(), m && (Q.add(f), m.style.transform = "", m.addEventListener("animationend", Pt), s$6(m, R.classes.isSelected), m.inert = !1, s$7(m, `f-${e}Out to-${l > 0 ? "next" : "prev"}`)), h && (Q.add(p), h.style.transform = "", h.addEventListener("animationend", Pt), s$7(h, R.classes.isSelected), h.inert = !1, s$7(h, `f-${e}In from-${l > 0 ? "prev" : "next"}`)), Dt(), !0;
		}(e, l)) return;
		e = q ? (e % f + f) % f : t$6(0, e, f - 1);
		G = (null === (o = Z[e || 0]) || void 0 === o ? void 0 : o.pos) || 0;
		const p = A.isRunning() ? A.getEndValues().pos : B;
		if (Math.abs(G - p) < 1) return B = G, _ !== e && (Vt(), L = _, _ = e, ft(), vt(), rt("change", _, L)), Dt(), void (N || (N = !0, rt("settle")));
		if (A.pause(), Lt(), q) {
			const t = ht(), e = Math.floor((p - (null === (r = Z[0]) || void 0 === r ? void 0 : r.pos)) / t) || 0, n = G + e * t;
			G = [
				n + t,
				n,
				n - t
			].reduce(function(t, e) {
				return Math.abs(e - p) < Math.abs(t - p) ? e : t;
			});
		}
		!1 !== l && t$5(u) ? A.spring(r$2({}, R.tween, u)).from({ pos: B }).to({ pos: G }).start() : (B = G, ut(), Dt(), N || (N = !0, rt("settle")));
	}
	function $t(t) {
		var e;
		let n = B;
		if (q && !0 !== t) {
			const t = ht();
			n -= (Math.floor((B - (null === (e = Z[0]) || void 0 === e ? void 0 : e.pos) || 0) / t) || 0) * t;
		}
		return n;
	}
	function Dt() {
		var t;
		if (!V || !C) return;
		U = bt();
		const e = /* @__PURE__ */ new Set(), n = [], i = Z[_], s = R.setTransform;
		let l;
		for (const o of K) {
			const s = Q.has(o.index), r = U.indexOf(o) > -1, a = (null === (t = null == i ? void 0 : i.slides) || void 0 === t ? void 0 : t.indexOf(o)) > -1;
			if (o.isVirtual && !s && !r) continue;
			let c = Mt(o);
			if (c && (n.push(o), a && e.add(c), it("adaptiveHeight") && a)) {
				const t = (c.lastElementChild || c).getBoundingClientRect().height;
				l = null == l ? t : Math.max(l, t);
			}
		}
		C && l && (C.style.height = `${l}px`), [...e$2(C, `.${R.classes.slide}`)].forEach((t) => {
			s$5(t, R.classes.isSelected, e.has(t));
			const n = J[parseInt(t.getAttribute("index") || "-1")];
			if (!n) return t.remove(), void jt(t);
			const i = Q.has(n.index), o = U.indexOf(n) > -1;
			if (n.isVirtual && !i && !o) return void wt(n);
			if (t.inert = !o, !1 === s) return;
			let l = n.pos ? Math.round(1e4 * n.pos) / 1e4 : 0, a = 0, c = 0, d = 0, f = 0;
			i || (a = F ? 0 : k ? -1 * l : l, c = F ? l : 0, d = t$3(a, 0, n.dim, 0, 100), f = t$3(c, 0, n.dim, 0, 100)), s instanceof Function && !i ? s(Ft, n, {
				x: a,
				y: c,
				xPercent: d,
				yPercent: f
			}) : t.style.transform = a || c ? `translate3d(${d}%, ${f}%,0)` : "";
		}), rt("render", n);
	}
	function It() {
		V?.removeEventListener("click", Tt), document.removeEventListener("mousemove", at), Q.clear(), j?.disconnect(), j = void 0;
		for (const t of J) {
			let n = t.el;
			n && n$9(n) && (t.state = void 0, Rt(t), Ht(t), t.isVirtual ? (wt(t), t.el = void 0) : (jt(n), n.style.transform = "", C && !C.contains(n) && C.appendChild(n)));
		}
		for (const t of Object.values(H)) t?.destroy();
		H = {}, S?.destroy(), S = void 0, A?.destroy(), A = void 0;
		for (const [t, e] of Object.entries(R.classes || {})) "container" !== t && s$6(V, e);
		s$6(C, "is-draggable");
	}
	function qt() {
		return q || _ > 0;
	}
	function kt() {
		return q || _ < Z.length - 1;
	}
	const Ft = {
		add: function(t, e) {
			var n;
			let i = B;
			const o = _, s = ht(), r = (null == A ? void 0 : A.isRunning()) ? A.getEndValues().pos : B, l = s && Math.floor((r - ((null === (n = Z[0]) || void 0 === n ? void 0 : n.pos) || 0)) / s) || 0;
			return yt(t, e), dt(W), At(), A && s && (o === _ && (i -= l * s), i === G ? B = G : A.spring({
				clamp: !0,
				mass: 1,
				tension: 300,
				friction: 25,
				restDelta: 1,
				restSpeed: 1
			}).from({ pos: i }).to({ pos: G }).start()), Dt(), Ft;
		},
		canGoPrev: qt,
		canGoNext: kt,
		destroy: function() {
			return rt("destroy"), window.removeEventListener("resize", lt), It(), st.clear(), V = null, Z = [], J = [], R = Object.assign({}, h$1), H = {}, K = [], P = void 0, W = "*", T = 2, Ft;
		},
		emit: rt,
		filter: function(t = "*") {
			return dt(t), At(), B = t$6(X, B, Y), Dt(), rt("filter", t), Ft;
		},
		getContainer: function() {
			return V;
		},
		getGapDim: gt,
		getGestures: function() {
			return S;
		},
		getLastMouseMove: function() {
			return b;
		},
		getOption: function(t) {
			return it(t);
		},
		getOptions: function() {
			return R;
		},
		getPage: function() {
			return Z[_];
		},
		getPageIndex: function(t) {
			if (void 0 !== t) {
				for (const e of Z || []) for (const n of e.slides) if (n.index === t) return e.index;
				return -1;
			}
			return _;
		},
		getPageIndexFromPosition: pt,
		getPageProgress: function(t, e) {
			var n;
			void 0 === t && (t = _);
			const i = Z[t];
			if (!i) return t > _ ? -1 : 1;
			const o = ht(), s = gt();
			let r = i.pos, l = $t();
			if (q && !0 !== e) {
				const t = Math.floor((l - (null === (n = Z[0]) || void 0 === n ? void 0 : n.pos)) / o) || 0;
				l -= t * o, r = [
					r + o,
					r,
					r - o
				].reduce(function(t, e) {
					return Math.abs(e - l) < Math.abs(t - l) ? e : t;
				});
			}
			return (l - r) / (i.dim + s) || 0;
		},
		getPageVisibility: function(t) {
			var e;
			void 0 === t && (t = _);
			const n = Z[t];
			if (!n) return t > _ ? -1 : 1;
			const i = $t(), o = mt();
			let s = n.pos;
			if (q) {
				const t = ht(), n = s + (Math.floor((i - (null === (e = Z[0]) || void 0 === e ? void 0 : e.pos)) / t) || 0) * t;
				s = [
					n + t,
					n,
					n - t
				].reduce(function(t, e) {
					return Math.abs(e - i) < Math.abs(t - i) ? e : t;
				});
			}
			return s > i && s + n.dim < i + o ? 1 : s < i ? (s + n.dim - i) / n.dim || 0 : s + n.dim > i + o && (i + o - s) / n.dim || 0;
		},
		getPages: function() {
			return Z;
		},
		getPlugins: function() {
			return H;
		},
		getPosition: $t,
		getSlides: function() {
			return J;
		},
		getState: function() {
			return T;
		},
		getTotalSlideDim: ht,
		getTween: function() {
			return A;
		},
		getViewport: function() {
			return C;
		},
		getViewportDim: mt,
		getVisibleSlides: function(t) {
			return void 0 === t ? U : bt(t);
		},
		goTo: Ct,
		hasNavigated: function() {
			return void 0 !== L;
		},
		hideError: Ht,
		hideLoading: Rt,
		init: function() {
			if (!g || !n$9(g)) throw new Error("No Element found");
			return 0 !== T && (It(), T = 0), V = g, O = M, window.removeEventListener("resize", lt), O.breakpoints && window.addEventListener("resize", lt), lt(), Ft;
		},
		isInfinite: function() {
			return q;
		},
		isInTransition: function() {
			return Q.size > 0;
		},
		isRTL: function() {
			return k;
		},
		isSettled: function() {
			return N;
		},
		isVertical: function() {
			return F;
		},
		localize: ot,
		next: function(t = {}) {
			return Ct(_ + 1, t), Ft;
		},
		off: function(t, e) {
			for (const n of t instanceof Array ? t : [t]) st.has(n) && st.set(n, st.get(n).filter((t) => t !== e));
			return Ft;
		},
		on: function(t, e) {
			for (const n of t instanceof Array ? t : [t]) st.set(n, [...st.get(n) || [], e]);
			return Ft;
		},
		prev: function(t = {}) {
			return Ct(_ - 1, t), Ft;
		},
		reInit: function(e = {}, n) {
			return It(), T = 0, P = void 0, W = "*", M = e, O = e, t$5(n) && (w = n), lt(), Ft;
		},
		remove: function(t) {
			void 0 === t && (t = J.length - 1);
			const e = J[t];
			return e && (rt("removeSlide", e), e.el && (jt(e.el), e.el.remove(), e.el = void 0), J.splice(t, 1), dt(W), At(), B = t$6(X, B, Y), Dt()), Ft;
		},
		setPosition: function(t) {
			B = t, ut(), Dt();
		},
		showError: function(t, e) {
			if (1 === T) {
				Rt(t), Ht(t);
				const n = t.el;
				if (n) {
					const i = document.createElement("div");
					s$7(i, "f-html"), s$7(i, "is-error"), i.innerHTML = ot(e || "<p>{{ERROR}}</p>"), t.htmlEl = i, s$7(n, "has-html has-error"), n.insertAdjacentElement("afterbegin", i), rt("contentReady", t);
				}
			}
			return Ft;
		},
		showLoading: function(t) {
			const e = t.el, n = null == e ? void 0 : e.querySelector(".f-spinner");
			if (!e || n) return Ft;
			const o = e$7(it("spinnerTpl"));
			return o && (s$7(o, "f-spinner"), e.insertAdjacentElement("beforeend", o)), Ft;
		},
		version: "6.1.14"
	};
	return Ft;
};
x.l10n = { en_EN: o$5 }, x.getDefaults = () => h$1;
//#endregion
//#region node_modules/@fancyapps/ui/dist/utils/scrollLock.js
/*! License details at fancyapps.com/license */
var t$2 = (t = !0, e = "--f-scrollbar-compensate", s = "--f-body-margin", o = "hide-scrollbar") => {
	const n = document, r = n.body, l = n.documentElement;
	if (t) {
		if (r.classList.contains(o)) return;
		let t = window.innerWidth - l.getBoundingClientRect().width;
		t < 0 && (t = 0), l.style.setProperty(e, `${t}px`);
		const n = parseFloat(window.getComputedStyle(r).marginRight);
		n && r.style.setProperty(s, `${n}px`), r.classList.add(o);
	} else r.classList.remove(o), r.style.setProperty(s, ""), n.documentElement.style.setProperty(e, "");
};
//#endregion
//#region node_modules/@fancyapps/ui/dist/utils/canUseDOM.js
/*! License details at fancyapps.com/license */
function e$1() {
	return !("undefined" == typeof window || !window.document || !window.document.createElement);
}
//#endregion
//#region node_modules/@fancyapps/ui/dist/utils/replaceAll.js
/*! License details at fancyapps.com/license */
var n$5 = function(n = "", t = "", o = "") {
	return n.split(t).join(o);
};
//#endregion
//#region node_modules/@fancyapps/ui/dist/carousel/carousel.zoomable.js
/*! License details at fancyapps.com/license */
var a$3 = { tpl: (t) => `<img class="f-panzoom__content" \n    ${t.srcset ? "data-lazy-srcset=\"{{srcset}}\"" : ""} \n    ${t.sizes ? "data-lazy-sizes=\"{{sizes}}\"" : ""} \n    data-lazy-src="{{src}}" alt="{{alt}}" />` };
var s$4 = () => {
	let s;
	function l(e, o) {
		const n = null == s ? void 0 : s.getOptions().Zoomable;
		let i = (t$5(n) ? Object.assign(Object.assign({}, a$3), n) : a$3)[e];
		return i && "function" == typeof i && o ? i(o) : i;
	}
	function c() {
		s && !1 !== s.getOptions().Zoomable && (s.on("addSlide", f), s.on("removeSlide", u), s.on("attachSlideEl", g), s.on("click", d), s.on("change", r), s.on("ready", r));
	}
	function r() {
		m();
		const t = (null == s ? void 0 : s.getVisibleSlides()) || [];
		if (t.length > 1 || "slide" === (null == s ? void 0 : s.getOption("transition"))) for (const e of t) {
			const t = e.panzoomRef;
			t && ((null == s ? void 0 : s.getPage().slides) || []).indexOf(e) < 0 && t.execute(v$2.ZoomTo, Object.assign({}, t.getStartPosition()));
		}
	}
	function d(t, e) {
		const o = e.target;
		o && !e.defaultPrevented && o.dataset.panzoomAction && p(o.dataset.panzoomAction);
	}
	function f(t, i) {
		const a = i.el;
		if (!s || !a || i.panzoomRef) return;
		const c = i.src || i.lazySrc || "", r = i.alt || i.caption || `Image #${i.index}`, d = i.srcset || i.lazySrcset || "", f = i.sizes || i.lazySizes || "";
		if (c && t$7(c) && !i.html && (!i.type || "image" === i.type)) {
			i.type = "image", i.thumbSrc = i.thumbSrc || c;
			let t = l("tpl", i);
			t = n$5(t, "{{src}}", c + ""), t = n$5(t, "{{srcset}}", d + ""), t = n$5(t, "{{sizes}}", f + ""), a.insertAdjacentHTML("afterbegin", t);
		}
		const u = a.querySelector(".f-panzoom__content");
		if (!u) return;
		u.setAttribute("alt", r + "");
		const g = i.width && "auto" !== i.width ? parseFloat(i.width + "") : "auto", p = i.height && "auto" !== i.height ? parseFloat(i.height + "") : "auto", z = S(a, Object.assign({
			width: g,
			height: p,
			classes: { container: "f-zoomable" },
			event: () => null == s ? void 0 : s.getLastMouseMove(),
			spinnerTpl: () => (null == s ? void 0 : s.getOption("spinnerTpl")) || ""
		}, l("Panzoom")));
		z.on("*", (t, e, ...o) => {
			s && ("loading" === e && (i.state = 0), "loaded" === e && (i.state = 1), "error" === e && (i.state = 2, s?.showError(i, "{{IMAGE_ERROR}}")), s.emit(`panzoom:${e}`, i, ...o), "loading" === e && s.emit("contentLoading", i), "ready" === e && s.emit("contentReady", i), i.index === (null == s ? void 0 : s.getPageIndex()) && m());
		}), i.panzoomRef = z;
	}
	function u(t, e) {
		e.panzoomRef && (e.panzoomRef.destroy(), e.panzoomRef = void 0);
	}
	function g(t, e) {
		const o = e.panzoomRef;
		if (o) switch (o.getState()) {
			case 0:
				o.init();
				break;
			case 3: o.execute(v$2.ZoomTo, Object.assign(Object.assign({}, o.getStartPosition()), { velocity: 0 }));
		}
	}
	function m() {
		var t, e;
		const o = (null == s ? void 0 : s.getContainer()) || void 0, n = null === (e = null === (t = null == s ? void 0 : s.getPage()) || void 0 === t ? void 0 : t.slides[0]) || void 0 === e ? void 0 : e.panzoomRef;
		if (o) if (n) n.updateControls(o);
		else for (const t of o.querySelectorAll("[data-panzoom-action]") || []) t.setAttribute("aria-disabled", ""), t.setAttribute("tabindex", "-1");
	}
	function p(t, ...e) {
		var o;
		null === (o = null == s ? void 0 : s.getPage().slides[0].panzoomRef) || void 0 === o || o.execute(t, ...e);
	}
	return {
		init: function(t) {
			s = t, s.on("initPlugins", c);
		},
		destroy: function() {
			if (s) {
				s.off("initPlugins", c), s.off("addSlide", f), s.off("removeSlide", u), s.off("attachSlideEl", g), s.off("click", d), s.off("change", r), s.off("ready", r);
				for (const t of s.getSlides()) u(0, t);
			}
			s = void 0;
		},
		execute: p
	};
};
//#endregion
//#region node_modules/@fancyapps/ui/dist/carousel/carousel.sync.js
/*! License details at fancyapps.com/license */
var e = {
	syncOnChange: !1,
	syncOnClick: !0,
	syncOnHover: !1
};
var i$3 = () => {
	let i, t;
	function o() {
		const t = null == i ? void 0 : i.getOptions().Sync;
		return t$5(t) ? Object.assign(Object.assign({}, e), t) : e;
	}
	function s(n) {
		var e, s, l;
		i && n && (t = n, i.getOptions().classes = Object.assign(Object.assign({}, i.getOptions().classes), { isSelected: "" }), i.getOptions().initialSlide = (null === (s = null === (e = t.getPage()) || void 0 === e ? void 0 : e.slides[0]) || void 0 === s ? void 0 : s.index) || 0, o().syncOnChange && i.on("change", c), o().syncOnClick && i.on("click", g), o().syncOnHover && (null === (l = i.getViewport()) || void 0 === l || l.addEventListener("mouseover", u)), function() {
			if (!i || !t) return;
			i.on("ready", d), i.on("refresh", a), t.on("change", r), t.on("filter", f);
		}());
	}
	function l() {
		const n = o().target;
		i && n && s(n);
	}
	function d() {
		v();
	}
	function c() {
		var n;
		if (i && t) {
			const e = (null === (n = i.getPage()) || void 0 === n ? void 0 : n.slides) || [], o = t.getPageIndex(e[0].index || 0);
			o > -1 && t.goTo(o, i.hasNavigated() ? void 0 : {
				tween: !1,
				transition: !1
			}), v();
		}
	}
	function r() {
		var n;
		if (i && t) {
			const e = i.getPageIndex((null === (n = t.getPage()) || void 0 === n ? void 0 : n.slides[0].index) || 0);
			e > -1 && i.goTo(e, t.hasNavigated() ? void 0 : {
				tween: !1,
				transition: !1
			}), v();
		}
	}
	function g(n, e) {
		var o;
		if (!i || !t) return;
		if (null === (o = i.getTween()) || void 0 === o ? void 0 : o.isRunning()) return;
		const s = null == i ? void 0 : i.getOptions().classes.slide;
		if (!s) return;
		const l = e.target.closest(`.${s}`);
		if (l) {
			const n = parseInt(l.getAttribute("index") || "") || 0, e = t.getPageIndex(n);
			t.goTo(e);
		}
	}
	function u(n) {
		i && g(0, n);
	}
	function a() {
		var n;
		if (i && t) {
			const e = i.getPageIndex((null === (n = t.getPage()) || void 0 === n ? void 0 : n.slides[0].index) || 0);
			e > -1 && i.goTo(e, {
				tween: !1,
				transition: !1
			}), v();
		}
	}
	function f(n, e) {
		i && t && (i.filter(e), r());
	}
	function v() {
		var n, e, o;
		if (!t) return;
		const s = (null === (e = null === (n = t.getPage()) || void 0 === n ? void 0 : n.slides[0]) || void 0 === e ? void 0 : e.index) || 0;
		for (const n of (null == i ? void 0 : i.getSlides()) || []) null === (o = n.el) || void 0 === o || o.classList.toggle("is-selected", n.index === s);
	}
	return {
		init: function(n) {
			i = n, i.on("initSlides", l);
		},
		destroy: function() {
			var n;
			i?.off("ready", d), i?.off("refresh", a), i?.off("change", c), i?.off("click", g), null === (n = null == i ? void 0 : i.getViewport()) || void 0 === n || n.removeEventListener("mouseover", u), t?.off("change", r), t?.off("filter", f), t = void 0, i?.off("initSlides", l), i = void 0;
		},
		getTarget: function() {
			return t;
		}
	};
};
//#endregion
//#region node_modules/@fancyapps/ui/dist/carousel/carousel.lazyload.js
/*! License details at fancyapps.com/license */
var s$3 = {
	showLoading: !0,
	preload: 1
};
var l$5 = "is-lazyloading";
var o$4 = "is-lazyloaded";
var n$4 = "has-lazyerror";
var i$2 = () => {
	let i;
	function d() {
		const e = null == i ? void 0 : i.getOptions().Lazyload;
		return t$5(e) ? Object.assign(Object.assign({}, s$3), e) : s$3;
	}
	function r(t) {
		var s;
		const r = t.el;
		if (!r) return;
		const c = d(), u = "[data-lazy-src],[data-lazy-srcset],[data-lazy-bg]", f = Array.from(r.querySelectorAll(u));
		r.matches(u) && f.push(r);
		for (const d of f) {
			const r = d.dataset.lazySrc, u = d.dataset.lazySrcset, f = d.dataset.lazySizes, y = d.dataset.lazyBg, z = (d instanceof HTMLImageElement || d instanceof HTMLSourceElement) && (r || u), g = !!y;
			if (!z && !g) continue;
			const m = r || u || y;
			if (m) {
				if (z) {
					const y = null === (s = d.parentElement) || void 0 === s ? void 0 : s.classList.contains("f-panzoom__wrapper");
					c.showLoading && i?.showLoading(t), d.addEventListener("load", () => {
						i?.hideLoading(t), s$6(d, n$4), d instanceof HTMLImageElement ? d.decode().finally(() => {
							s$6(d, l$5), s$7(d, o$4);
						}).catch(() => {}) : (s$6(d, l$5), s$7(d, o$4)), y || null == i || i.emit("lazyLoad:loaded", t, d, m);
					}), d.addEventListener("error", () => {
						i?.hideLoading(t), s$6(d, l$5), s$7(d, n$4), y || null == i || i.emit("lazyLoad:error", t, d, m);
					}), d.classList.add("f-lazyload"), d.classList.add(l$5), y || null == i || i.emit("lazyLoad:load", t, d, m), r && (d.src = r), u && (d.srcset = u), f && (d.sizes = f);
				} else g && (d.style.backgroundImage = `url('${y}')`);
				delete d.dataset.lazySrc, delete d.dataset.lazySrcset, delete d.dataset.lazySizes, delete d.dataset.lazyBg;
			}
		}
	}
	function c() {
		if (!i) return;
		const e = [...i.getVisibleSlides()], t = d().preload;
		if (t > 0) {
			const a = i.getPosition(), s = i.getViewportDim();
			e.push(...i.getVisibleSlides(a + s * t), ...i.getVisibleSlides(a - s * t));
		}
		for (const t of e) r(t);
	}
	return {
		init: function(e) {
			i = e, i.on("render", c);
		},
		destroy: function() {
			i?.off("render", c), i = void 0;
		}
	};
};
//#endregion
//#region node_modules/@fancyapps/ui/dist/carousel/carousel.arrows.js
/*! License details at fancyapps.com/license */
var s$2 = {
	prevTpl: "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" tabindex=\"-1\"><path d=\"M15 3l-9 9 9 9\"></path></svg>",
	nextTpl: "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" tabindex=\"-1\"><path d=\"M9 3l9 9-9 9\"></path></svg>"
};
var l$4 = () => {
	let i, r, l;
	function a(o) {
		const r = function() {
			const t = null == i ? void 0 : i.getOptions().Arrows;
			return t$5(t) ? Object.assign(Object.assign({}, s$2), t) : s$2;
		}(), l = `<button data-carousel-go-${o} tabindex="0" class="f-button is-arrow is-${o}" title="{{${o.toUpperCase()}}}">` + r[`${o}Tpl`] + "</button>", a = e$7(i.localize(l)) || void 0;
		return a && s$7(a, r[`${o}Class`]), a;
	}
	function u() {
		var t;
		r?.remove(), r = void 0, l?.remove(), l = void 0, null === (t = null == i ? void 0 : i.getContainer()) || void 0 === t || t.classList.remove("has-arrows");
	}
	function c() {
		i && !1 !== i.getOptions().Arrows && i.getPages().length > 1 ? (function() {
			if (!i) return;
			const t = i.getViewport();
			t && (r || (r = a("prev"), r && t.insertAdjacentElement("beforebegin", r)), l || (l = a("next"), l && t.insertAdjacentElement("afterend", l)), s$5(i.getContainer(), "has-arrows", !0));
		}(), i && (r?.toggleAttribute("aria-disabled", !i.canGoPrev()), l?.toggleAttribute("aria-disabled", !i.canGoNext()))) : u();
	}
	return {
		init: function(t) {
			i = t.on(["change", "refresh"], c);
		},
		destroy: function() {
			u(), i?.off(["change", "refresh"], c), i = void 0;
		}
	};
};
//#endregion
//#region node_modules/@fancyapps/ui/dist/shared/buttons.js
/*! License details at fancyapps.com/license */
var t$1 = "<circle cx=\"11\" cy=\"11\" r=\"7.5\"/><path d=\"m21 21-4.35-4.35M8 11h6\"/>";
var M$1 = "<g><line x1=\"11\" y1=\"8\" x2=\"11\" y2=\"14\"></line></g><circle cx=\"11\" cy=\"11\" r=\"7.5\"/><path d=\"m21 21-4.35-4.35M8 11h6\"/>";
var o$3 = {
	moveLeft: [
		"moveLeft",
		"MOVE_LEFT",
		"<path d=\"M5 12h14M5 12l6 6M5 12l6-6\"/>"
	],
	moveRight: [
		"moveRight",
		"MOVE_RIGHT",
		"<path d=\"M5 12h14M13 18l6-6M13 6l6 6\"/>"
	],
	moveUp: [
		"moveUp",
		"MOVE_UP",
		"<path d=\"M12 5v14M18 11l-6-6M6 11l6-6\"/>"
	],
	moveDown: [
		"moveDown",
		"MOVE_DOWN",
		"<path d=\"M12 5v14M18 13l-6 6M6 13l6 6\"/>"
	],
	zoomOut: [
		"zoomOut",
		"ZOOM_OUT",
		t$1
	],
	zoomIn: [
		"zoomIn",
		"ZOOM_IN",
		M$1
	],
	toggleFull: [
		"toggleFull",
		"TOGGLE_FULL",
		M$1
	],
	iterateZoom: [
		"iterateZoom",
		"ITERATE_ZOOM",
		M$1
	],
	toggle1to1: [
		"toggleFull",
		"TOGGLE_FULL",
		"<path d=\"M3.51 3.07c5.74.02 11.48-.02 17.22.02 1.37.1 2.34 1.64 2.18 3.13 0 4.08.02 8.16 0 12.23-.1 1.54-1.47 2.64-2.79 2.46-5.61-.01-11.24.02-16.86-.01-1.36-.12-2.33-1.65-2.17-3.14 0-4.07-.02-8.16 0-12.23.1-1.36 1.22-2.48 2.42-2.46Z\"/><path d=\"M5.65 8.54h1.49v6.92m8.94-6.92h1.49v6.92M11.5 9.4v.02m0 5.18v0\"/>"
	],
	rotateCCW: [
		"rotateCCW",
		"ROTATE_CCW",
		"<path d=\"M15 4.55a8 8 0 0 0-6 14.9M9 15v5H4M18.37 7.16v.01M13 19.94v.01M16.84 18.37v.01M19.37 15.1v.01M19.94 11v.01\"/>"
	],
	rotateCW: [
		"rotateCW",
		"ROTATE_CW",
		"<path d=\"M9 4.55a8 8 0 0 1 6 14.9M15 15v5h5M5.63 7.16v.01M4.06 11v.01M4.63 15.1v.01M7.16 18.37v.01M11 19.94v.01\"/>"
	],
	flipX: [
		"flipX",
		"FLIP_X",
		"<path d=\"M12 3v18M16 7v10h5L16 7M8 7v10H3L8 7\"/>"
	],
	flipY: [
		"flipY",
		"FLIP_Y",
		"<path d=\"M3 12h18M7 16h10L7 21v-5M7 8h10L7 3v5\"/>"
	],
	reset: [
		"reset",
		"RESET",
		"<path d=\"M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4\"/>"
	],
	toggleFS: [
		"toggleFS",
		"TOGGLE_FS",
		"<g><path d=\"M14.5 9.5 21 3m0 0h-6m6 0v6M3 21l6.5-6.5M3 21v-6m0 6h6\"/></g><g><path d=\"m14 10 7-7m-7 7h6m-6 0V4M3 21l7-7m0 0v6m0-6H4\"/></g>"
	]
};
var v$1 = {};
for (const t of Object.keys(o$3)) {
	const M = o$3[t];
	v$1[t] = { tpl: `<button data-panzoom-action="${M[0]}" class="f-button" title="{{${M[1]}}}"><svg>${M[2]}</svg></button>` };
}
//#endregion
//#region node_modules/@fancyapps/ui/dist/carousel/carousel.toolbar.js
/*! License details at fancyapps.com/license */
var a$2;
(function(t) {
	t.Left = "left", t.middle = "middle", t.right = "right";
})(a$2 || (a$2 = {}));
var r$1 = Object.assign({
	counter: { tpl: "<div class=\"f-counter\"><span data-carousel-page></span>/<span data-carousel-pages></span></div>" },
	download: { tpl: "<button data-carousel-download class=\"f-button\" title=\"{{DOWNLOAD}}\"><svg><path d=\"M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5 5-5M12 4v12\"/></svg></button>" },
	autoplay: { tpl: "<button data-autoplay-action=\"toggle\" class=\"f-button\" title=\"{{TOGGLE_AUTOPLAY}}\"><svg><g><path d=\"M5 3.5 19 12 5 20.5Z\"/></g><g><path d=\"M8 4v15M17 4v15\"/></g></svg></button>" },
	thumbs: { tpl: "<button data-thumbs-action=\"toggle\" class=\"f-button\" title=\"{{TOGGLE_THUMBS}}\"><svg><rect width=\"18\" height=\"14\" x=\"3\" y=\"3\" rx=\"2\"/><path d=\"M4 21h1M9 21h1M14 21h1M19 21h1\"/></svg></button>" }
}, v$1);
var u$2 = {
	absolute: !1,
	display: {
		left: [],
		middle: [
			"zoomIn",
			"zoomOut",
			"toggle1to1",
			"rotateCCW",
			"rotateCW",
			"flipX",
			"flipY",
			"reset"
		],
		right: []
	},
	enabled: "auto",
	items: {}
};
var c$2 = () => {
	let a, c;
	function d(e) {
		const o = null == a ? void 0 : a.getOptions().Toolbar;
		let n = (t$5(o) ? Object.assign(Object.assign({}, u$2), o) : u$2)[e];
		return n && "function" == typeof n && a ? n(a) : n;
	}
	function f() {
		var s;
		if (!a || c) return;
		if (!1 === (null == a ? void 0 : a.getOptions().Toolbar)) return;
		const u = a.getContainer();
		if (!u) return;
		let f = d("enabled");
		if (!f) return;
		const p = d("absolute"), g = a.getSlides().length > 1;
		let b = !1, m = !1;
		for (const t of a.getSlides()) t.panzoomRef && (b = !0), (t.downloadSrc || "image" === t.type && t.src) && (m = !0);
		const v = (null === (s = a.getPlugins().Thumbs) || void 0 === s ? void 0 : s.isEnabled()) || !1, h = g && a.getPlugins().Autoplay || !1, j = a.getPlugins().Fullscreen && (document.fullscreenEnabled || document.webkitFullscreenEnabled);
		if ("auto" === f && (f = b), !f) return;
		c = u.querySelector(".f-carousel__toolbar") || void 0, c || (c = document.createElement("div"), s$7(c, "f-carousel__toolbar"));
		const E = d("display"), y = r$2({}, r$1, d("items"));
		for (const l of [
			"left",
			"middle",
			"right"
		]) {
			const s = E[l] || [], r = document.createElement("div");
			s$7(r, `f-carousel__toolbar__column is-${l}`);
			for (const l of s) {
				let i;
				if (t$7(l)) {
					if ("counter" === l && !g) continue;
					if ("autoplay" === l && !h) continue;
					if (v$1[l] && !b) continue;
					if ("fullscreen" === l && !j) continue;
					if ("thumbs" === l && !v) continue;
					if ("download" === l && !m) continue;
					i = y[l];
				}
				if (t$5(l) && (i = l), i && i.tpl) {
					let t = a.localize(i.tpl);
					t = t.split("<svg>").join("<svg tabindex=\"-1\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">");
					const e = e$7(t);
					e && ("function" == typeof i.click && a && e.addEventListener("click", (t) => {
						t.preventDefault(), t.stopPropagation(), "function" == typeof i.click && a && i.click(a, t);
					}), r.append(e));
				}
			}
			c.append(r);
		}
		if (c.childElementCount) {
			if (p && s$7(c, "is-absolute"), !c.parentElement) {
				const t = d("parentEl");
				t ? t.insertAdjacentElement("afterbegin", c) : u.insertAdjacentElement("afterbegin", c);
			}
			u.contains(c) && (s$7(u, "has-toolbar"), p && s$7(u, "has-absolute-toolbar"));
		}
	}
	return {
		init: function(t) {
			a = t, a?.on("initSlides", f);
		},
		destroy: function() {
			a?.off("initSlides", f), s$6(null == a ? void 0 : a.getContainer(), "has-toolbar has-absolute-toolbar"), c?.remove(), c = void 0;
		},
		add: function(t, e) {
			r$1[t] = e;
		},
		isEnabled: function() {
			return !!c;
		}
	};
};
//#endregion
//#region node_modules/@fancyapps/ui/dist/carousel/carousel.autoplay.js
/*! License details at fancyapps.com/license */
var n$3 = {
	autoStart: !0,
	pauseOnHover: !0,
	showProgressbar: !0,
	timeout: 2e3
};
var o$2 = () => {
	let o, i, a = !1, s = !1, l = !1, r = null;
	function u(e) {
		const i = null == o ? void 0 : o.getOptions().Autoplay;
		let a = (t$5(i) ? Object.assign(Object.assign({}, n$3), i) : n$3)[e];
		return a && "function" == typeof a && o ? a(o) : a;
	}
	function f() {
		clearTimeout(i), i = void 0;
	}
	function g() {
		if (!o || !a || l || s || i || !o.isSettled() || function() {
			var t;
			const e = (null === (t = null == o ? void 0 : o.getPage()) || void 0 === t ? void 0 : t.slides) || [];
			for (const t of e) if (0 === t.state) return !0;
			return !1;
		}()) return;
		(function() {
			var t, n, i, a;
			if (!o) return;
			if (v(), !u("showProgressbar")) return;
			let s = u("progressbarParentEl");
			!s && null !== (t = o.getPlugins().Toolbar) && void 0 !== t && t.isEnabled() && (s = o.getContainer());
			if (!s && !0 !== (null === (n = o.getPlugins().Toolbar) || void 0 === n ? void 0 : n.isEnabled())) {
				const t = (null === (i = o.getPages()[0]) || void 0 === i ? void 0 : i.slides) || [], e = (null === (a = o.getPage()) || void 0 === a ? void 0 : a.slides) || [];
				1 === t.length && 1 === e.length && (s = e[0].el);
			}
			s || (s = o.getViewport());
			if (!s) return;
			r = document.createElement("div"), s$7(r, "f-progressbar"), s.prepend(r);
			const l = u("timeout") || 1e3;
			r.style.animationDuration = `${l}ms`;
		})();
		const t = u("timeout");
		i = setTimeout(() => {
			o && a && !s && (o.isInfinite() || o.getPageIndex() !== o.getPages().length - 1 ? o.next() : o.goTo(0));
		}, t);
	}
	function c() {
		var t;
		if (!o || o.getPages().length < 2 || !1 === o.getOptions().Autoplay) return;
		if (a) return;
		a = !0, o.emit("autoplay:start", u("timeout")), s$7(o.getContainer(), "has-autoplay"), null === (t = o.getTween()) || void 0 === t || t.on("start", b);
		const n = null == o ? void 0 : o.getContainer();
		n && u("pauseOnHover") && matchMedia("(hover: hover)").matches && (n.addEventListener("mouseenter", E, !1), n.addEventListener("mouseleave", w, !1)), o.on("change", P), o.on("settle", y), o.on("contentReady", p), o.on("panzoom:touchStart", d), o.on("panzoom:wheel", d), o.isSettled() && g();
	}
	function d() {
		var t;
		if (f(), v(), o) {
			if (a) {
				o.emit("autoplay:end"), null === (t = o.getTween()) || void 0 === t || t.off("start", b);
				const e = o.getContainer();
				e && (e.classList.remove("has-autoplay"), e.removeEventListener("mouseenter", E, !1), e.removeEventListener("mouseleave", w, !1));
			}
			o.off("change", P), o.off("settle", y), o.off("contentReady", p), o.off("panzoom:touchStart", d), o.off("panzoom:wheel", d);
		}
		a = !1, s = !1;
	}
	function v() {
		r && (r.remove(), r = null);
	}
	function m() {
		o && o.getPages().length > 1 && u("autoStart") && c();
	}
	function p() {
		g();
	}
	function h(t, e) {
		const n = e.target;
		n && !e.defaultPrevented && "toggle" === n.dataset.autoplayAction && O.toggle();
	}
	function P() {
		!o || !(null == o ? void 0 : o.isInfinite()) && o.getPageIndex() === o.getPages().length - 1 ? d() : (f(), v());
	}
	function y() {
		g();
	}
	function b() {
		f(), v();
	}
	function E() {
		l = !0, a && (f(), v());
	}
	function w() {
		l = !1, a && !s && null != o && o.isSettled() && g();
	}
	const O = {
		init: function(t) {
			o = t, o.on("ready", m), o.on("click", h);
		},
		destroy: function() {
			d(), o?.off("ready", m), o?.off("click", h), o = void 0;
		},
		isEnabled: () => a,
		pause: function() {
			s = !0, f(), v();
		},
		resume: function() {
			s = !1, a && !l && g();
		},
		start() {
			c();
		},
		stop() {
			d();
		},
		toggle() {
			a ? d() : c();
		}
	};
	return O;
};
//#endregion
//#region node_modules/@fancyapps/ui/dist/carousel/carousel.thumbs.js
/*! License details at fancyapps.com/license */
var u$1 = {
	Carousel: { Lazyload: { showLoading: !1 } },
	minCount: 2,
	showOnStart: !0,
	thumbTpl: "<button aria-label=\"Slide to #{{page}}\"><img draggable=\"false\" alt=\"{{alt}}\" data-lazy-src=\"{{src}}\" /></button>",
	type: "modern"
};
var a$1;
var c$1 = () => {
	let c, d, f, m, g, h = 0, v = 0, p = !0;
	function b(e) {
		const n = null == c ? void 0 : c.getOptions().Thumbs;
		let o = (t$5(n) ? Object.assign(Object.assign({}, u$1), n) : u$1)[e];
		return o && "function" == typeof o && c ? o(c) : o;
	}
	function y() {
		if (!c) return !1;
		if (!1 === (null == c ? void 0 : c.getOptions().Thumbs)) return !1;
		let t = 0;
		for (const e of c.getSlides()) e.thumbSrc && t++;
		return t >= b("minCount");
	}
	function x() {
		return "modern" === b("type");
	}
	function S() {
		return "scrollable" === b("type");
	}
	function C() {
		const t = [], e = (null == c ? void 0 : c.getSlides()) || [];
		for (const n of e) t.push({
			index: n.index,
			class: n.thumbClass,
			html: T(n)
		});
		return t;
	}
	function T(t) {
		const e = t.thumb ? t.thumb instanceof HTMLImageElement ? t.thumb.src : t.thumb : t.thumbSrc || void 0, o = void 0 === t.thumbAlt ? `Thumbnail #${(t.index || 0) + 1}` : t.thumbAlt + "";
		let i = b("thumbTpl");
		return i = n$5(i, "{{alt}}", o), i = n$5(i, "{{src}}", e + ""), i = n$5(i, "{{index}}", `${t.index || 0}`), i = n$5(i, "{{page}}", `${(t.index || 0) + 1}`), i;
	}
	function L(t) {
		return `<div index="${t.index || 0}" class="f-thumbs__slide ${t.class || ""}">${t.html || ""}</div>`;
	}
	function E(t = !1) {
		var e;
		const n = null == c ? void 0 : c.getContainer();
		if (!c || !n || f || !y()) return;
		const o = (null === (e = b("Carousel")) || void 0 === e ? void 0 : e.classes) || {};
		if (o.container = o.container || "f-thumbs", !f) {
			const t = n.nextElementSibling;
			null != t && t.classList.contains(o.container) && (f = t);
		}
		if (!f) {
			f = document.createElement("div");
			const t = b("parentEl");
			t ? t.insertAdjacentElement("beforeend", f) : n.insertAdjacentElement("afterend", f);
		}
		s$7(f, o.container), s$7(f, "f-thumbs"), s$7(f, `is-${b("type")}`), t && s$7(f, "is-hidden");
	}
	function P() {
		if (!f || !S()) return;
		m = document.createElement("div"), s$7(m, "f-thumbs__viewport");
		let t = "";
		for (const e of C()) "string" == typeof (e.html || "") && (t += L(e));
		m.innerHTML = t, f.append(m), f.addEventListener("click", (t) => {
			t.preventDefault();
			const e = t.target.closest("[index]"), n = parseInt((null == e ? void 0 : e.getAttribute("index")) || "-1");
			c && n > -1 && c.goTo(n);
		}), g = new IntersectionObserver((t) => {
			t.forEach((t) => {
				t.isIntersecting && t.target instanceof HTMLImageElement && (t.target.src = t.target.getAttribute("data-lazy-src") + "", t.target.removeAttribute("data-lazy-src"), g?.unobserve(t.target));
			});
		}, {
			root: m,
			rootMargin: "100px"
		}), f.querySelectorAll("[data-lazy-src]").forEach((t) => {
			g?.observe(t);
		}), c?.emit("thumbs:ready");
	}
	function w() {
		var t;
		if (!a$1 || !c || !f || S() || d) return;
		const n = C();
		if (!n.length) return;
		const o = r$2({}, {
			Sync: { target: c },
			Lazyload: { preload: 1 },
			slides: n,
			classes: {
				container: "f-thumbs",
				viewport: "f-thumbs__viewport",
				slide: "f-thumbs__slide"
			},
			center: !0,
			fill: !x(),
			infinite: !1,
			dragFree: !0,
			rtl: c.getOptions().rtl || !1,
			slidesPerPage: (t) => {
				let e = 0;
				return x() && (function() {
					if (!x()) return;
					if (!f) return;
					const t = (t) => f && parseFloat(getComputedStyle(f).getPropertyValue("--f-thumb-" + t)) || 0;
					h = t("width"), v = t("clip-width");
				}(), e = 4 * (h - v)), t && t.getTotalSlideDim() <= t.getViewportDim() - e ? 1 / 0 : 1;
			}
		}, u$1.Carousel || {}, b("Carousel") || {});
		d = a$1(f, o, {
			Sync: i$3,
			Lazyload: i$2
		}), d.on("ready", () => {
			s$7(f, "is-syncing"), c?.emit("thumbs:ready"), x() && c?.on("render", $);
		}), d.on("destroy", () => {
			c?.emit("thumbs:destroy");
		}), d.init(), null === (t = d.getGestures()) || void 0 === t || t.on("start", () => {
			p = !1;
		}), d.on("click", (t, e) => {
			const n = e.target;
			if (n) {
				const t = n.matches("button") ? n : n.firstElementChild;
				t && t.matches("button") && (e.preventDefault(), t.focus({ preventScroll: !0 }));
			}
		}), s$7(c.getContainer(), "has-thumbs"), R();
	}
	function j() {
		y() && b("showOnStart") && (E(), P());
	}
	function A() {
		var t;
		y() && (w(), c?.on("addSlide", z), c?.on("removeSlide", _), c?.on("click", I), c?.on("refresh", q), null === (t = null == c ? void 0 : c.getGestures()) || void 0 === t || t.on("start", M), D(!0));
	}
	function M() {
		var t, e;
		p = !0;
		null !== (t = document.activeElement) && void 0 !== t && t.closest(".f-thumbs") && (null === (e = document.activeElement) || void 0 === e || e.blur());
	}
	function $() {
		var t, e;
		f?.classList.toggle("is-syncing", !1 === (null == c ? void 0 : c.hasNavigated()) || (null === (t = null == c ? void 0 : c.getTween()) || void 0 === t ? void 0 : t.isRunning())), R(), null !== (e = null == c ? void 0 : c.getGestures()) && void 0 !== e && e.isPointerDown() && function() {
			if (!x()) return;
			if (!c || !d) return;
			if (!p) return;
			const t = d.getTween(), e = d.getPages(), n = c.getPageIndex() || 0, i = c.getPageProgress() || 0;
			if (!(c && e && e[n] && t)) return;
			const l = t.isRunning() ? t.getCurrentValues().pos : d.getPosition();
			if (void 0 === l) return;
			let r = e[n].pos + i * (h - v);
			r = t$6(e[0].pos, r, e[e.length - 1].pos), t.from({ pos: l }).to({ pos: r }).start();
		}();
	}
	function O() {
		p = !0, D();
	}
	function z(t, e) {
		const n = { html: T(e) };
		if (d) d.add(n, e.index);
		else if (m) {
			const t = e$7(L(n));
			if (t) {
				m.append(t);
				const e = t.querySelector("img");
				e && g?.observe(e);
			}
		}
	}
	function _(t, e) {
		var n;
		d ? d.remove(e.index) : m && (null === (n = m.querySelector(`[index="${e.index}"]`)) || void 0 === n || n.remove());
	}
	function I(t, e) {
		var n;
		const o = e.target;
		e.defaultPrevented || "toggle" !== (null === (n = null == o ? void 0 : o.dataset) || void 0 === n ? void 0 : n.thumbsAction) || (f || (E(!0), P(), w()), f && f.classList.toggle("is-hidden"));
	}
	function q() {
		D();
	}
	function D(t = !1) {
		if (!c || !m || !S()) return;
		const e = c.getPageIndex();
		m.querySelectorAll(".is-selected").forEach((t) => {
			t.classList.remove("is-selected");
		});
		const n = m.querySelector(`[index="${e}"]`);
		if (n) {
			n.classList.add("is-selected");
			const e = m.getBoundingClientRect(), o = n.getBoundingClientRect(), i = n.offsetTop - m.offsetTop - .5 * e.height + .5 * o.height, l = n.scrollLeft - m.scrollLeft - .5 * e.width + .5 * o.width;
			m.scrollTo({
				top: i,
				left: l,
				behavior: t ? "instant" : "smooth"
			});
		}
	}
	function R() {
		if (!x()) return;
		if (!c || !d) return;
		const t = (null == d ? void 0 : d.getSlides()) || [];
		let e = -.5 * h;
		for (const n of t) {
			const t = n.el;
			if (!t) continue;
			let o = c.getPageProgress(n.index) || 0;
			o = Math.max(-1, Math.min(1, o)), o > -1 && o < 1 && (e += .5 * h * (1 - Math.abs(o))), o = Math.round(1e4 * o) / 1e4, e = Math.round(1e4 * e) / 1e4, t.style.setProperty("--progress", `${Math.abs(o)}`), t.style.setProperty("--shift", `${(null == c ? void 0 : c.isRTL()) ? -1 * e : e}px`), o > -1 && o < 1 && (e += .5 * h * (1 - Math.abs(o)));
		}
	}
	return {
		init: function(t, e) {
			a$1 = e, c = t, c.on("ready", A), c.on("initSlides", j), c.on("change", O);
		},
		destroy: function() {
			var t, e;
			S() && c?.emit("thumbs:destroy"), c?.off("ready", A), c?.off("initSlides", j), c?.off("change", O), c?.off("render", $), c?.off("addSlide", z), c?.off("click", I), c?.off("refresh", q), null === (t = null == c ? void 0 : c.getGestures()) || void 0 === t || t.off("start", M), null === (e = null == c ? void 0 : c.getContainer()) || void 0 === e || e.classList.remove("has-thumbs"), c = void 0, d?.destroy(), d = void 0, f?.remove(), f = void 0;
		},
		getCarousel: function() {
			return d;
		},
		getContainer: function() {
			return f;
		},
		getType: function() {
			return b("type");
		},
		isEnabled: y
	};
};
//#endregion
//#region node_modules/@fancyapps/ui/dist/carousel/carousel.html.js
/*! License details at fancyapps.com/license */
var n$2 = {
	autosize: !1,
	iframeAttr: {
		allow: "autoplay; fullscreen",
		scrolling: "auto"
	},
	preload: !1
};
var l$3 = () => {
	let l;
	function s() {
		const e = null == l ? void 0 : l.getOptions().Html;
		return t$5(e) ? r$2({}, n$2, e) : n$2;
	}
	function r() {
		return !1 !== (null == l ? void 0 : l.getOptions().Html);
	}
	function d(t) {
		return "iframe" === t.type || "pdf" === t.type || "gmap" === t.type;
	}
	function c(t) {
		const e = `${t}`;
		return e.match(/^\d+$/) ? `${e}px` : e;
	}
	function p(t) {
		if (void 0 === t || "" === t) return;
		const e = `${t}`.trim();
		if (!e.match(/^\d+(\.\d+)?(px)?$/)) return;
		const o = parseFloat(e);
		return Number.isFinite(o) ? o : void 0;
	}
	function h(t, e) {
		var o;
		const i = null !== (o = t[e]) && void 0 !== o ? o : s()[e];
		return "true" === i || "false" !== i && i;
	}
	function m(t, o) {
		if (!r()) return;
		let i = o.type, a = o.src;
		if (!i && t$7(a)) {
			if ("#" === a.charAt(0) ? i = "inline" : a.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.((a)?png|avif|gif|jp(g|eg)|pjp(eg)?|jfif|svg|webp|bmp|ico|tif(f)?)((\?|#).*)?$)/i) ? i = "image" : a.match(/\.(pdf)((\?|#).*)?$/i) ? i = "pdf" : a.match(/\.(html|php)((\?|#).*)?$/i) && (i = "iframe"), !i) {
				const t = a.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:(?:(?:maps\/(?:place\/(?:.*)\/)?\@(.*),(\d+\.?\d+?)z))|(?:\?ll=))(.*)?/i);
				t && (a = `https://maps.google.${t[1]}/?ll=${(t[2] ? t[2] + "&z=" + Math.floor(parseFloat(t[3])) + (t[4] ? t[4].replace(/^\//, "&") : "") : t[4] + "").replace(/\?/, "&")}&output=${t[4] && t[4].indexOf("layer=c") > 0 ? "svembed" : "embed"}`, i = "gmap");
			}
			if (!i) {
				const t = a.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:maps\/search\/)(.*)/i);
				t && (a = `https://maps.google.${t[1]}/maps?q=${t[2].replace("query=", "q=").replace("api=1", "")}&output=embed`, i = "gmap");
			}
			i && (o.src = a, o.type = i);
		}
	}
	function f(t, e) {
		r() && d(e) && function(t) {
			const e = t.el, o = t.src;
			if (!l || !e || !o) return;
			const n = document.createElement("iframe");
			s$7(n, "f-iframe");
			for (const [t, e] of Object.entries(s().iframeAttr || {})) n.setAttribute(t, e);
			n.onerror = () => {
				t.state = 2, l?.showError(t, "{{IFRAME_ERROR}}");
			};
			const r = document.createElement("div");
			s$7(r, "f-html"), r.append(n), t.htmlEl = r, t.contentEl = n, s$7(e, `has-html has-iframe has-${t.type}`), e.prepend(r), y(t);
			const d = h(t, "preload"), c = h(t, "autosize");
			"iframe" === t.type && (d || c) ? (t.state = 0, l.showLoading(t), s$7(e, "is-loading"), n.onload = () => {
				if (!l || 2 === l.getState() || !n.src.length || t.contentEl !== n || !n.isConnected) return;
				t.state = 1;
				const o = "true" !== n.dataset.ready;
				n.dataset.ready = "true", v(t), l.hideLoading(t), o && l.emit("contentReady", t), s$6(e, "is-loading");
			}, n.src = `${o}`) : (n.src = `${o}`, l.emit("contentReady", t));
		}(e);
	}
	function u(t, e) {
		var o, i;
		if (d(e)) {
			const t = e.el;
			l?.hideError(e), null === (o = e.contentEl) || void 0 === o || o.remove(), e.contentEl = void 0, null === (i = e.htmlEl) || void 0 === i || i.remove(), e.htmlEl = void 0, t && (s$6(t, "has-html has-iframe has-pdf has-gmap"), s$6(t, "is-loading"));
		}
	}
	function g() {
		for (const t of (null == l ? void 0 : l.getSlides()) || []) d(t) && (y(t), 1 === t.state && v(t));
	}
	function y(t) {
		const e = t.htmlEl;
		if (e && d(t) && (e.style.aspectRatio = "", e.style.width = "", e.style.height = "", e.style.maxWidth = "", e.style.maxHeight = "", t.width && (e.style.maxWidth = c(t.width)), t.height && (e.style.maxHeight = c(t.height)), t.aspectRatio)) {
			const o = t.aspectRatio.split("/"), i = parseFloat(o[0].trim()), a = o[1] ? parseFloat(o[1].trim()) : 0, n = i && a ? i / a : i;
			e.offsetHeight;
			const l = e.getBoundingClientRect(), s = n < (l.width || 1) / (l.height || 1);
			e.style.aspectRatio = `${t.aspectRatio}`, e.style.width = s ? "auto" : "", e.style.height = s ? "" : "auto";
		}
	}
	function v(t) {
		const e = t.contentEl, o = null == e ? void 0 : e.parentElement, i = null == o ? void 0 : o.style;
		let a = h(t, "autosize"), n = p(t.width) || 0, l = p(t.height) || 0;
		if (n && l && (a = !1), e && o && i && a) {
			try {
				const t = window.getComputedStyle(o), a = parseFloat(t.paddingLeft) + parseFloat(t.paddingRight), s = parseFloat(t.paddingTop) + parseFloat(t.paddingBottom), r = e.contentWindow;
				if (r) {
					const t = r.document, e = t.getElementsByTagName("html")[0], o = t.body;
					i.width = "";
					const d = window.getComputedStyle(o), c = parseFloat(d.marginLeft) + parseFloat(d.marginRight), p = o.style.overflow || "";
					o.style.overflow = "hidden", n = n || o.scrollWidth + c + a, i.flex = "0 0 auto", i.width = `${n}px`, i.height = `${o.scrollHeight}px`, o.style.overflow = p;
					l = Math.max(e.scrollHeight, Math.ceil(e.getBoundingClientRect().height)) + s;
				}
			} catch (t) {}
			(n || l) && Object.assign(i, {
				flex: "0 1 auto",
				width: n ? `${n}px` : "",
				height: l ? `${l}px` : ""
			});
		}
	}
	return {
		init: function(t) {
			l = t, l.on("addSlide", m), l.on("attachSlideEl", f), l.on("detachSlideEl", u), l.on("refresh", g);
		},
		destroy: function() {
			l?.off("addSlide", m), l?.off("attachSlideEl", f), l?.off("detachSlideEl", u), l?.off("refresh", g), l = void 0;
		}
	};
};
//#endregion
//#region node_modules/@fancyapps/ui/dist/carousel/carousel.video.js
/*! License details at fancyapps.com/license */
var i$1 = (t, e = {}) => {
	const o = new URL(t), n = new URLSearchParams(o.search), i = new URLSearchParams();
	for (const [t, o] of [...n, ...Object.entries(e)]) {
		let e = o + "";
		if ("t" === t) {
			let t = e.match(/((\d*)m)?(\d*)s?/);
			t && i.set("start", 60 * parseInt(t[2] || "0") + parseInt(t[3] || "0") + "");
		} else i.set(t, e);
	}
	let l = i + "", s = t.match(/#t=((.*)?\d+s)/);
	return s && (l += `#t=${s[1]}`), l;
};
var l$2 = {
	autoplay: !1,
	html5videoTpl: "<video class=\"f-html5video\" playsinline controls controlsList=\"nodownload\" poster=\"{{poster}}\">\n    <source src=\"{{src}}\" type=\"{{format}}\" />Sorry, your browser doesn't support embedded videos.</video>",
	iframeAttr: {
		allow: "autoplay; fullscreen",
		scrolling: "no",
		referrerPolicy: "strict-origin-when-cross-origin",
		credentialless: ""
	},
	vimeo: {
		byline: 1,
		color: "00adef",
		controls: 1,
		dnt: 1,
		muted: 0
	},
	youtube: {
		controls: 1,
		enablejsapi: 1,
		nocookie: 1,
		rel: 0,
		fs: 1
	}
};
var s$1 = () => {
	let s, r = !1;
	function c() {
		const t = null == s ? void 0 : s.getOptions().Video;
		return t$5(t) ? Object.assign(Object.assign({}, l$2), t) : l$2;
	}
	function a() {
		var t;
		return null === (t = null == s ? void 0 : s.getPage()) || void 0 === t ? void 0 : t.slides[0];
	}
	const d = (t) => {
		var e;
		try {
			let o = JSON.parse(t.data);
			if ("https://player.vimeo.com" === t.origin) {
				if ("ready" === o.event) for (let o of Array.from((null === (e = null == s ? void 0 : s.getContainer()) || void 0 === e ? void 0 : e.getElementsByClassName("f-iframe")) || [])) o instanceof HTMLIFrameElement && o.contentWindow === t.source && (o.dataset.ready = "true");
			} else if (t.origin.match(/^https:\/\/(www.)?youtube(-nocookie)?.com$/) && "onReady" === o.event) {
				const t = document.getElementById(o.id);
				t && (t.dataset.ready = "true");
			}
		} catch (t) {}
	};
	function m(t, e) {
		const n = e.src;
		if (!t$7(n)) return;
		let l = e.type;
		if (!l || "html5video" === l) {
			const t = n.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i);
			t && (l = "html5video", e.html5videoFormat = e.html5videoFormat || "video/" + ("ogv" === t[1] ? "ogg" : t[1]));
		}
		if (!l || "youtube" === l) {
			const t = n.match(/(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(?:watch\?(?:.*&)?v=|v\/|u\/|shorts\/|embed\/?)?(videoseries\?list=(?:.*)|[\w-]{11}|\?listType=(?:.*)&list=(?:.*))(?:.*)/i);
			if (t) {
				const o = Object.assign(Object.assign({}, c().youtube), e.youtube || {}), s = `www.youtube${o.nocookie ? "-nocookie" : ""}.com`, r = i$1(n, o), a = encodeURIComponent(t[2]);
				e.videoId = a, e.src = `https://${s}/embed/${a}?${r}`, e.thumb = e.thumb || `https://i.ytimg.com/vi/${a}/mqdefault.jpg`, l = "youtube";
			}
		}
		if (!l || "vimeo" === l) {
			const t = n.match(/^.+vimeo.com\/(?:\/)?(video\/)?([\d]+)((\/|\?h=)([a-z0-9]+))?(.*)?/);
			if (t) {
				const s = i$1(n, Object.assign(Object.assign({}, c().vimeo), e.vimeo || {})), r = encodeURIComponent(t[2]), a = t[5] || "";
				e.videoId = r, e.src = `https://player.vimeo.com/video/${r}?${a ? `h=${a}${s ? "&" : ""}` : ""}${s}`, l = "vimeo";
			}
		}
		e.type = l;
	}
	function u(e, i) {
		"html5video" === i.type && function(e) {
			const i = e.el, l = e.src;
			if (!s || !i || !l) return;
			const r = e.html5videoTpl || c().html5videoTpl, a = e.html5videoFormat || c().html5videoFormat;
			if (!r) return;
			const d = e.poster || (e.thumb && t$7(e.thumb) ? e.thumb : ""), m = e$7(r.replace(/\{\{src\}\}/gi, l + "").replace(/\{\{format\}\}/gi, a || "").replace(/\{\{poster\}\}/gi, d + ""));
			if (!m) return;
			const u = document.createElement("div");
			s$7(u, "f-html"), u.append(m), e.contentEl = m, e.htmlEl = u, s$7(i, `has-${e.type}`), i.prepend(u), v(e), s.emit("contentReady", e);
		}(i), "youtube" !== i.type && "vimeo" !== i.type || function(e) {
			const o = e.el, n = e.src;
			if (!s || !o || !n) return;
			const i = document.createElement("iframe");
			s$7(i, "f-iframe"), i.setAttribute("id", `f-iframe_${e.videoId}`);
			for (const [t, e] of Object.entries(c().iframeAttr || {})) i.setAttribute(t, e);
			"youtube" === e.type && (i.onload = () => {
				var t;
				1 === (null == s ? void 0 : s.getState()) && (null === (t = i.contentWindow) || void 0 === t || t.postMessage(JSON.stringify({
					event: "listening",
					id: i.getAttribute("id")
				}), "*"));
			}), i.onerror = () => {
				s?.showError(e, "{{IFRAME_ERROR}}");
			};
			const l = document.createElement("div");
			s$7(l, "f-html"), l.append(i), e.contentEl = i, e.htmlEl = l, s$7(o, `has-html has-iframe has-${e.type}`), i.src = `${e.src}`, o.prepend(l), v(e), s.emit("contentReady", e);
		}(i);
	}
	function f(t, e) {
		var o, n;
		"html5video" !== e.type && "youtube" !== e.type && "vimeo" !== e.type || (null === (o = e.contentEl) || void 0 === o || o.remove(), e.contentEl = void 0, null === (n = e.htmlEl) || void 0 === n || n.remove(), e.htmlEl = void 0), e.poller && clearTimeout(e.poller);
	}
	function p() {
		r = !1;
	}
	function h() {
		if (r) return;
		r = !0;
		const t = a();
		(t && void 0 !== t.autoplay ? t.autoplay : c().autoplay) && (function() {
			var t;
			const e = a(), o = null == e ? void 0 : e.el;
			if (o && "html5video" === (null == e ? void 0 : e.type)) try {
				const t = o.querySelector("video");
				if (t) {
					const e = t.play();
					void 0 !== e && e.then(() => {}).catch((e) => {
						t.muted = !0, t.play();
					});
				}
			} catch (t) {}
			const n = null == e ? void 0 : e.htmlEl;
			n instanceof HTMLIFrameElement && (null === (t = n.contentWindow) || void 0 === t || t.postMessage("{\"event\":\"command\",\"func\":\"stopVideo\",\"args\":\"\"}", "*"));
		}(), function() {
			const t = a(), e = null == t ? void 0 : t.type;
			if (!(null == t ? void 0 : t.el) || "youtube" !== e && "vimeo" !== e) return;
			const o = () => {
				if (t.contentEl && t.contentEl instanceof HTMLIFrameElement && t.contentEl.contentWindow) {
					let e;
					if ("true" === t.contentEl.dataset.ready) return e = "youtube" === t.type ? {
						event: "command",
						func: "playVideo"
					} : {
						method: "play",
						value: "true"
					}, e && t.contentEl.contentWindow.postMessage(JSON.stringify(e), "*"), void (t.poller = void 0);
					"youtube" === t.type && (e = {
						event: "listening",
						id: t.contentEl.getAttribute("id")
					}, t.contentEl.contentWindow.postMessage(JSON.stringify(e), "*"));
				}
				t.poller = setTimeout(o, 250);
			};
			o();
		}());
	}
	function v(t) {
		const e = null == t ? void 0 : t.htmlEl;
		if (t && e && ("html5video" === t.type || "youtube" === t.type || "vimeo" === t.type)) {
			if (e.style.aspectRatio = "", e.style.width = "", e.style.height = "", e.style.maxWidth = "", e.style.maxHeight = "", t.width) {
				let o = `${t.width}`;
				o.match(/^\d+$/) && (o += "px"), e.style.maxWidth = `${o}`;
			}
			if (t.height) {
				let o = `${t.height}`;
				o.match(/^\d+$/) && (o += "px"), e.style.maxHeight = `${o}`;
			}
			if (t.aspectRatio) {
				const o = t.aspectRatio.split("/"), n = parseFloat(o[0].trim()), i = o[1] ? parseFloat(o[1].trim()) : 0, l = n && i ? n / i : n;
				e.offsetHeight;
				const s = e.getBoundingClientRect(), r = l < (s.width || 1) / (s.height || 1);
				e.style.aspectRatio = `${t.aspectRatio}`, e.style.width = r ? "auto" : "", e.style.height = r ? "" : "auto";
			}
		}
	}
	function y() {
		v(a());
	}
	return {
		init: function(t) {
			s = t, s.on("addSlide", m), s.on("attachSlideEl", u), s.on("detachSlideEl", f), s.on("ready", h), s.on("change", p), s.on("settle", h), s.on("refresh", y), window.addEventListener("message", d);
		},
		destroy: function() {
			s?.off("addSlide", m), s?.off("attachSlideEl", u), s?.off("detachSlideEl", f), s?.off("ready", h), s?.off("change", p), s?.off("settle", h), s?.off("refresh", y), window.removeEventListener("message", d), s = void 0;
		}
	};
};
//#endregion
//#region node_modules/@fancyapps/ui/dist/carousel/carousel.fullscreen.js
/*! License details at fancyapps.com/license */
var n$1 = {
	autoStart: !1,
	btnTpl: "<button data-fullscreen-action=\"toggle\" class=\"f-button\" title=\"{{TOGGLE_FULLSCREEN}}\"><svg><g><path d=\"M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3\"/></g><g><path d=\"M15 19v-2a2 2 0 0 1 2-2h2M15 5v2a2 2 0 0 0 2 2h2M5 15h2a2 2 0 0 1 2 2v2M5 9h2a2 2 0 0 0 2-2V5\"/></g></svg></button>"
};
var t = "in-fullscreen-mode";
var l$1 = () => {
	let l;
	function u(t) {
		const u = null == l ? void 0 : l.getOptions().Fullscreen;
		let o = (t$5(u) ? Object.assign(Object.assign({}, n$1), u) : n$1)[t];
		return o && "function" == typeof o && l ? o(l) : o;
	}
	function o() {
		var e;
		null === (e = null == l ? void 0 : l.getPlugins().Toolbar) || void 0 === e || e.add("fullscreen", { tpl: u("btnTpl") });
	}
	function c() {
		if (u("autoStart")) {
			const e = s();
			e && a(e);
		}
	}
	function i(e, n) {
		const t = n.target;
		t && !n.defaultPrevented && "toggle" === t.dataset.fullscreenAction && d();
	}
	function s() {
		return u("el") || (null == l ? void 0 : l.getContainer()) || void 0;
	}
	function r() {
		const e = document;
		return e.fullscreenEnabled ? !!e.fullscreenElement : !!e.webkitFullscreenEnabled && !!e.webkitFullscreenElement;
	}
	function a(e) {
		const n = document;
		let l;
		return e || (e = n.documentElement), n.fullscreenEnabled ? l = e.requestFullscreen() : n.webkitFullscreenEnabled && (l = e.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)), l && l.then(() => {
			e.classList.add(t);
		}), l;
	}
	function f() {
		const e = document;
		let n;
		return e.fullscreenEnabled ? n = e.fullscreenElement && e.exitFullscreen() : e.webkitFullscreenEnabled && (n = e.webkitFullscreenElement && e.webkitExitFullscreen()), n && n.then(() => {
			var e;
			null === (e = s()) || void 0 === e || e.classList.remove(t);
		}), n;
	}
	function d() {
		if (r()) f();
		else {
			const e = s();
			e && a(e);
		}
	}
	return {
		init: function(e) {
			l = e, l.on("initPlugins", o), l.on("ready", c), l.on("click", i);
		},
		destroy: function() {
			l?.off("initPlugins", o), l?.off("ready", c), l?.off("click", i);
		},
		exit: f,
		inFullscreen: r,
		request: a,
		toggle: d
	};
};
//#endregion
//#region node_modules/@fancyapps/ui/dist/fancybox/fancybox.hash.js
/*! License details at fancyapps.com/license */
var n;
var o$1;
var r = !1;
var i = !1;
var l = !1;
var s = !1;
var a = () => {
	const t = new URL(document.URL).hash, e = t.slice(1).split("-"), n = e[e.length - 1], o = n && /^\+?\d+$/.test(n) && parseInt(e.pop() || "1", 10) || 1;
	return {
		urlHash: t,
		urlSlug: e.join("-"),
		urlIndex: o
	};
};
var u = () => {
	const t = null == n ? void 0 : n.getInstance(), e = null == t ? void 0 : t.getState();
	return !(!t || 0 !== e && 1 !== e);
};
var c = () => {
	if (!n) return;
	if (u()) return;
	const { urlSlug: t, urlIndex: e } = a();
	if (!t) return;
	let o = document.querySelector(`[data-slug="${t}"]`);
	o && n.fromTriggerEl(o), u() || (o = document.querySelectorAll(`[data-fancybox="${t}"]`)[e - 1], o && n.fromTriggerEl(o, { startIndex: e - 1 })), u() && o && !o.closest("[inert]") && o.scrollIntoView({
		behavior: "instant",
		block: "center",
		inline: "center"
	});
};
var d = (t) => {
	const n = t.getOptions().Hash, o = t.getSlide();
	return o && (o.slug || o.fancybox || (t$5(n) ? n.slug : "")) || "";
};
var g = (t) => {
	var e, n;
	const o = d(t), r = t.getSlide();
	if (!r || !o) return "";
	let i = parseInt(r.index + "", 10) + 1, l = r.slug ? `#${r.slug}` : `#${o}-${i}`;
	return ((null === (n = null === (e = t.getCarousel()) || void 0 === e ? void 0 : e.getPages()) || void 0 === n ? void 0 : n.length) || 0) < 2 && (l = `#${o}`), l;
};
var f = () => {
	if (!n) return;
	if (l) return;
	const t = null == n ? void 0 : n.getInstance(), o = null == t ? void 0 : t.getCarousel(), { urlSlug: r, urlIndex: u } = a(), d = null == t ? void 0 : t.getOptions().Hash;
	if (!1 !== d) {
		if (t && 1 === t.getState() && o) {
			const n = o.getSlides();
			for (const t of n || []) if (t.slug === r || (t.fancybox === r || t$5(d) && d.slug === r) && t.index === u - 1) return i = !1, void o.goTo(t.index);
			s = !0, t.close(), s = !1;
		}
		c();
	}
};
var h = () => {
	n && (o$1 = setTimeout(() => {
		r = !0, c(), r = !1;
	}, 300), window.addEventListener("hashchange", f, !1));
};
var w;
function v() {
	history.scrollRestoration && w && (history.scrollRestoration = w, w = void 0);
}
var m = () => {
	let t, e = "";
	function u() {
		var n;
		if (!t || !t.isTopMost() || !1 === t.getOptions().Hash) return;
		if (r) {
			const e = t.getOptions().sync;
			e && e.goTo((null === (n = null == t ? void 0 : t.getCarousel()) || void 0 === n ? void 0 : n.getPageIndex()) || 0, {
				transition: !1,
				tween: !1
			});
		}
		const o = t.getCarousel();
		if (!o) return;
		if (!t.getSlide()) return;
		const l = d(t);
		if (!l) return;
		const { urlHash: s, urlSlug: u } = a(), f = g(t);
		s !== f && (e = s), history.scrollRestoration && !w && (w = history.scrollRestoration, history.scrollRestoration = "manual", window.addEventListener("beforeunload", v)), o.on("change", c);
		const h = l !== u;
		try {
			window.history[h ? "pushState" : "replaceState"]({}, document.title, window.location.pathname + window.location.search + f), h && (i = !0);
		} catch (t) {}
	}
	function c() {
		if (!t || !t.isTopMost() || !1 === t.getOptions().Hash) return;
		if (!t.getSlide()) return;
		if (!d(t)) return;
		const e = g(t);
		l = !0;
		try {
			window.history.replaceState({}, document.title, window.location.pathname + window.location.search + e);
		} catch (t) {}
		l = !1;
	}
	function f() {
		var n;
		if (!t || !t.isTopMost() || !1 === t.getOptions().Hash || s) return;
		if (d(t)) {
			l = !0;
			try {
				i && !function() {
					if (window.parent === window) return !1;
					try {
						var t = window.frameElement;
					} catch (e) {
						t = null;
					}
					return null === t ? "data:" === location.protocol : t.hasAttribute("sandbox");
				}() && "IFRAME" !== (null === (n = document.activeElement) || void 0 === n ? void 0 : n.nodeName) ? window.history.back() : window.history.replaceState({}, document.title, window.location.pathname + window.location.search + e);
			} catch (t) {}
			l = !1;
		}
	}
	return {
		init: function(e) {
			clearTimeout(o$1), t = e, t.on("ready", u), t.on("close", f);
		},
		destroy: function() {
			t?.off("ready", u), t?.off("close", f);
			const e = null == t ? void 0 : t.getCarousel();
			e && e.off("change", c), t = void 0, null != n && n.getInstance() || (v(), window.removeEventListener("beforeunload", v));
		}
	};
};
m.getInfoFromURL = a, m.startFromUrl = c, m.setup = function(e) {
	n || (n = e, e$1() && (/complete|interactive|loaded/.test(document.readyState) ? h() : document.addEventListener("DOMContentLoaded", h)));
};
//#endregion
//#region node_modules/@fancyapps/ui/dist/fancybox/l10n/en_EN.js
/*! License details at fancyapps.com/license */
var o = Object.assign(Object.assign({}, o$5), {
	CLOSE: "Close",
	NEXT: "Next",
	PREV: "Previous",
	MODAL: "You can close this modal content with the ESC key",
	ELEMENT_NOT_FOUND: "HTML Element Not Found",
	IFRAME_ERROR: "Error Loading Page",
	NO_CAPTION: "No Caption",
	TOGGLE_SIDEBAR: "Toggle sidebar"
});
//#endregion
//#region node_modules/@fancyapps/ui/dist/fancybox/fancybox.js
/*! License details at fancyapps.com/license */
var M = "<button class=\"f-button\" title=\"{{CLOSE}}\" data-fancybox-close><svg tabindex=\"-1\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M19.286 4.714 4.714 19.286M4.714 4.714l14.572 14.572\" /></svg></button>";
c$2().add("close", { tpl: M });
var k = (e) => {
	e.cancelable && e.preventDefault();
};
var R = (e = null, t = "", n) => {
	if (!e || !e.parentElement || !t) return void (n && n());
	O(e);
	const o = (i) => {
		i.target === e && e.dataset.animationName && (e.removeEventListener("animationend", o), delete e.dataset.animationName, n && n(), e.classList.remove(t));
	};
	e.dataset.animationName = t, e.addEventListener("animationend", o), s$7(e, t);
};
var O = (e) => {
	e && e.dispatchEvent(new CustomEvent("animationend", {
		bubbles: !1,
		cancelable: !0,
		currentTarget: e
	}));
};
var _;
(function(e) {
	e[e.Init = 0] = "Init", e[e.Ready = 1] = "Ready", e[e.Closing = 2] = "Closing", e[e.Destroyed = 3] = "Destroyed";
})(_ || (_ = {}));
var I = {
	ajax: null,
	backdropClick: "close",
	Carousel: {},
	closeButton: "auto",
	closeButtonTpl: M,
	closeExisting: !1,
	delegateEl: void 0,
	dragToClose: !0,
	fadeEffect: !0,
	groupAll: !1,
	groupAttr: "data-fancybox",
	hideClass: "f-fadeOut",
	hideScrollbar: !0,
	id: void 0,
	idle: !1,
	keyboard: {
		Escape: "close",
		Delete: "close",
		Backspace: "close",
		PageUp: "next",
		PageDown: "prev",
		ArrowUp: "prev",
		ArrowDown: "next",
		ArrowRight: "next",
		ArrowLeft: "prev"
	},
	l10n: o,
	mainClass: "",
	mainStyle: {},
	mainTpl: "<dialog class=\"fancybox__dialog\">\n    <div class=\"fancybox__container\" tabindex=\"0\" aria-label=\"{{MODAL}}\">\n      <div class=\"fancybox__backdrop\"></div>\n      <div class=\"fancybox__carousel\"></div>\n    </div>\n  </dialog>",
	modal: !0,
	on: {},
	parentEl: void 0,
	placeFocusBack: !0,
	showClass: "f-zoomInUp",
	startIndex: 0,
	sync: void 0,
	theme: "dark",
	triggerEl: void 0,
	triggerEvent: void 0,
	zoomEffect: !0
};
var z = /* @__PURE__ */ new Map();
var H = 0;
var B = "with-fancybox";
var D = () => {
	let r, T, A, M, D, q, N, V = _.Init, W = Object.assign({}, I), $ = -1, K = {}, U = [], X = !1, G = !0, Y = 0;
	function Z(e, ...t) {
		let n = W[e];
		return n && "function" == typeof n ? n(Re, ...t) : n;
	}
	function J(e, t = []) {
		const n = Z("l10n") || {};
		e = String(e).replace(/\{\{(\w+)\}\}/g, (e, t) => n[t] || e);
		for (let n = 0; n < t.length; n++) e = e.split(t[n][0]).join(t[n][1]);
		return e = e.replace(/\{\{(.*?)\}\}/g, (e, t) => t);
	}
	const Q = /* @__PURE__ */ new Map();
	function ee(e, ...t) {
		const n = [...Q.get(e) || []];
		for (const [t, o] of Object.entries(W.on || {})) (t === e || t.split(" ").indexOf(e) > -1) && n.push(o);
		for (const e of n) e && "function" == typeof e && e(Re, ...t);
		"*" !== e && ee("*", e, ...t);
	}
	function te() {
		s$6(T, "is-revealing");
		try {
			if (document.activeElement === r) ((null == T ? void 0 : T.querySelector("[autofocus]")) || T).focus();
		} catch (e) {}
	}
	function ne(e, n) {
		var o;
		ve(n), de(), null === (o = n.el) || void 0 === o || o.addEventListener("click", ie), "inline" !== n.type && "clone" !== n.type || function(e) {
			if (!M || !e || !e.el) return;
			let n = null;
			if (t$7(e.src)) {
				const t = e.src.split("#", 2).pop();
				n = t ? document.getElementById(t) : null;
			}
			if (n) {
				if (s$7(n, "f-html"), "clone" === e.type || n.closest(".fancybox__carousel")) {
					n = n.cloneNode(!0);
					const t = n.dataset.animationName;
					t && (n.classList.remove(t), delete n.dataset.animationName);
					let o = n.getAttribute("id");
					o = o ? `${o}--clone` : `clone-${$}-${e.index}`, n.setAttribute("id", o);
				} else if (n.parentNode) {
					const t = document.createElement("div");
					t.inert = !0, n.parentNode.insertBefore(t, n), e.placeholderEl = t;
				}
				e.htmlEl = n, s$7(e.el, "has-html"), e.el.prepend(n), n.classList.remove("hidden"), "none" === n.style.display && (n.style.display = ""), "none" === getComputedStyle(n).getPropertyValue("display") && (n.style.display = n.dataset.display || "flex"), M?.emit("contentReady", e);
			} else M?.showError(e, "{{ELEMENT_NOT_FOUND}}");
		}(n), "ajax" === n.type && function(e) {
			const t = e.el;
			if (!t) return;
			if (e.htmlEl || e.xhr) return;
			M?.showLoading(e), e.state = 0;
			const n = new XMLHttpRequest();
			n.onreadystatechange = function() {
				if (n.readyState === XMLHttpRequest.DONE && V === _.Ready) if (M?.hideLoading(e), e.state = 1, 200 === n.status) {
					let o = n.responseText + "", i = null, s = null;
					if (e.filter) {
						const t = document.createElement("div");
						t.innerHTML = o, s = t.querySelector(e.filter + "");
					}
					s && s instanceof HTMLElement ? i = s : (i = document.createElement("div"), i.innerHTML = o), i.classList.add("f-html"), e.htmlEl = i, t.classList.add("has-html"), t.classList.add("has-ajax"), t.prepend(i), M?.emit("contentReady", e);
				} else M?.showError(e);
			};
			const o = Z("ajax") || null;
			n.open(o ? "POST" : "GET", e.src + ""), n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), n.setRequestHeader("X-Requested-With", "XMLHttpRequest"), n.send(o), e.xhr = n;
		}(n);
	}
	function oe(e, t) {
		var n;
		ye(t), null === (n = t.el) || void 0 === n || n.removeEventListener("click", ie), "inline" !== t.type && "clone" !== t.type || function(e) {
			const t = e.htmlEl, n = e.placeholderEl;
			t && ("none" !== getComputedStyle(t).getPropertyValue("display") && (t.style.display = "none"), t.offsetHeight);
			n && (t && n.parentNode && n.parentNode.insertBefore(t, n), n.remove());
			e.htmlEl = void 0, e.placeholderEl = void 0;
		}(t), t.xhr && (t.xhr.abort(), t.xhr = void 0);
	}
	function ie(e) {
		if (!he()) return;
		if (V !== _.Ready) return k(e), void e.stopPropagation();
		if (e.defaultPrevented) return;
		if (!f$1.isClickAllowed()) return;
		const t = e.composedPath()[0];
		t.closest(".fancybox__carousel") && t.classList.contains("fancybox__slide") && fe(e);
	}
	function se() {
		G = !1, T && M && T.classList.remove("is-revealing"), de();
		const e = Z("sync");
		if (M && e) {
			const t = e.getPageIndex(M.getPageIndex()) || 0;
			e.goTo(t, {
				transition: !1,
				tween: !1
			});
		}
	}
	function le() {
		var e;
		(function() {
			const e = null == M ? void 0 : M.getViewport();
			if (!Z("dragToClose") || !M || !e) return;
			if (D = f$1(e).init(), !D) return;
			let t = !1, n = 0, o = 0, s = {}, l = 1;
			function r() {
				var e, t;
				q?.spring({
					clamp: !0,
					mass: 1,
					tension: 0 === o ? 140 : 960,
					friction: 17,
					restDelta: .1,
					restSpeed: .1,
					maxSpeed: 1 / 0
				}).from({ y: n }).to({ y: o }).start();
				const i = (null === (e = null == M ? void 0 : M.getViewport()) || void 0 === e ? void 0 : e.getBoundingClientRect().height) || 0, s = null === (t = Ee()) || void 0 === t ? void 0 : t.panzoomRef;
				if (i && s) if (0 === o) s.execute(v$2.Reset);
				else {
					const e = t$3(Math.abs(n), 0, .33 * i, l, .77 * l, !1);
					s.execute(v$2.ZoomTo, { scale: e });
				}
			}
			const c = (e) => {
				var t;
				const n = e.srcEvent, o = n.target;
				return M && !(e$4(n) && (null === (t = n.touches) || void 0 === t ? void 0 : t.length) > 1) && o && !n$8(o);
			};
			q = c$4().on("step", (t) => {
				if (T && e && V === _.Ready) {
					const o = e.getBoundingClientRect().height;
					n = Math.min(o, Math.max(-1 * o, t.y));
					const i = t$3(Math.abs(n), 0, .65 * o, 1, .2, !0);
					T.style.setProperty("--f-drag-opacity", i + ""), T.style.setProperty("--f-drag-offset", n + "px");
				}
			}), D.on("start", function() {
				t || (q?.pause(), o = n);
			}).on("panstart", (e) => {
				var n, o;
				if (!t && c(e) && "y" === e.axis) {
					k(e.srcEvent), t = !0, Te(), null === (n = null == M ? void 0 : M.getViewport()) || void 0 === n || n.classList.add("is-dragging");
					const i = null === (o = Ee()) || void 0 === o ? void 0 : o.panzoomRef;
					if (i) {
						l = i.getTransform().scale || 1;
						const e = i.getOptions();
						s = Object.assign({}, e), e.bounds = !1, e.gestures = !1;
					}
				} else t = !1;
			}).on("pan", function(e) {
				t && c(e) && (k(e.srcEvent), e.srcEvent.stopPropagation(), "y" === e.axis && (o += e.deltaY, r()));
			}).on("end", (e) => {
				var i, l, a;
				if (null === (i = null == M ? void 0 : M.getViewport()) || void 0 === i || i.classList.remove("is-dragging"), t) {
					const t = null === (l = Ee()) || void 0 === l ? void 0 : l.panzoomRef;
					if (t) {
						null === (a = t.getTween()) || void 0 === a || a.end();
						const e = t.getOptions();
						e.bounds = s.bounds || !1, e.gestures = s.gestures || !1;
					}
					c(e) && "y" === e.axis && (Math.abs(e.velocityY) > 5 || Math.abs(n) > 50) && Ae(e.srcEvent, "f-throwOut" + (e.velocityY > 0 ? "Down" : "Up"));
				}
				t = !1, V === _.Ready && 0 !== n && (o = 0, r());
			});
		})(), document.body.addEventListener("click", pe), document.body.addEventListener("keydown", ge, {
			passive: !1,
			capture: !0
		}), de(), Le();
		const t = Z("sync");
		M && t && (null === (e = t.getTween()) || void 0 === e || e.start()), be(Ee());
	}
	function re() {
		(null == M ? void 0 : M.canGoNext()) ? Le() : Pe();
	}
	function ae(e, t) {
		ve(t);
	}
	function ce(e, t) {
		ve(t), be(t);
	}
	function ue() {
		var e;
		const t = null == M ? void 0 : M.getPlugins().Thumbs;
		s$5(T, "has-thumbs", (null == t ? void 0 : t.isEnabled()) || !1), s$5(T, "has-vertical-thumbs", !!t && ("scrollable" === t.getType() || !0 === (null === (e = t.getCarousel()) || void 0 === e ? void 0 : e.isVertical())));
	}
	function de() {
		if (!T) return;
		const e = (null == M ? void 0 : M.getPages().length) || 0, t = (null == M ? void 0 : M.getPageIndex()) || 0, n = T.querySelectorAll("[data-fancybox-index],[data-fancybox-page],[data-fancybox-pages]");
		for (const o of n) o.hasAttribute("data-fancybox-index") ? o.textContent = String(t) : o.hasAttribute("data-fancybox-page") ? o.textContent = String(t + 1) : o.textContent = String(e);
	}
	function fe(e) {
		if (!!e.composedPath()[0].closest("[data-fancybox-close]")) return void Ae(e);
		if (ee("backdropClick", e), e.defaultPrevented) return;
		Z("backdropClick") && Ae(e);
	}
	function me() {
		Ce();
	}
	function ge(e) {
		if (!he()) return;
		if (V !== _.Ready) return;
		const t = e.key, o = Z("keyboard");
		if (!o) return;
		if (e.ctrlKey || e.altKey || e.shiftKey) return;
		const i = e.composedPath()[0];
		if (!n$9(i)) return;
		if ("Escape" !== t && ((e) => {
			const t = [
				"input",
				"textarea",
				"select",
				"option",
				"video",
				"iframe",
				"[contenteditable]",
				"[data-selectable]",
				"[data-draggable]"
			].join(",");
			return e.matches(t) || e.closest(t);
		})(i)) return;
		if (ee("keydown", e), e.defaultPrevented) return;
		const s = o[t];
		if (s) switch (s) {
			case "close":
				Ae(e);
				break;
			case "next":
				k(e), M?.next();
				break;
			case "prev": k(e), M?.prev();
		}
	}
	function pe(e) {
		if (!he()) return;
		if (V !== _.Ready) return;
		if (Ce(), e.defaultPrevented) return;
		const t = e.composedPath()[0], n = !!t.closest("[data-fancybox-close]"), o = t.classList.contains("fancybox__backdrop");
		(n || o) && fe(e);
	}
	function ve(e) {
		var t;
		const { el: n, htmlEl: i, panzoomRef: s, closeButtonEl: l } = e, r = s ? s.getWrapper() : i;
		if (!n || !n.parentElement || !r) return;
		let a = Z("closeButton");
		if ("auto" === a && (a = !0 !== (null === (t = null == M ? void 0 : M.getPlugins().Toolbar) || void 0 === t ? void 0 : t.isEnabled())), a) {
			if (!l) {
				const t = e$7(J(Z("closeButtonTpl")));
				t && (s$7(t, "is-close-button"), e.closeButtonEl = r.insertAdjacentElement("afterbegin", t), s$7(n, "has-close-btn"));
			}
		} else ye(e);
	}
	function ye(e) {
		e.closeButtonEl && (e.closeButtonEl.remove(), e.closeButtonEl = void 0), s$6(e.el, "has-close-btn");
	}
	function be(e) {
		if (!(G && M && 1 === M.getState() && e && e.index === M.getOptions().initialPage && e.el && e.el.parentElement)) return;
		if (void 0 !== e.state && 1 !== e.state) return;
		G = !1;
		const t = e.panzoomRef, n = null == t ? void 0 : t.getTween(), o = Z("zoomEffect") && n ? we(e) : void 0;
		if (t && n && o) {
			const { x: e, y: i, scale: s } = t.getStartPosition();
			n.spring({
				tension: 215,
				friction: 25,
				restDelta: .001,
				restSpeed: .001,
				maxSpeed: 1 / 0
			}).from(o).to({
				x: e,
				y: i,
				scale: s
			}).start();
			return;
		}
		const i = (null == t ? void 0 : t.getContent()) || e.htmlEl;
		i && R(i, Z("showClass", e));
	}
	function he() {
		var e;
		return (null === (e = F.getInstance()) || void 0 === e ? void 0 : e.getId()) === $;
	}
	function Ee() {
		var e;
		return null === (e = null == M ? void 0 : M.getPage()) || void 0 === e ? void 0 : e.slides[0];
	}
	function xe() {
		const e = Ee();
		return e ? e.triggerEl || Z("triggerEl") : void 0;
	}
	function we(e) {
		var t, n;
		const o = e.thumbEl;
		if (!o || !((e) => {
			const t = e.getBoundingClientRect(), n = e.closest("[style]"), o = null == n ? void 0 : n.parentElement;
			if (n && n.style.transform && o) {
				const e = o.getBoundingClientRect();
				if (t.left < e.left || t.left > e.left + e.width - t.width) return !1;
				if (t.top < e.top || t.top > e.top + e.height - t.height) return !1;
			}
			const i = Math.max(document.documentElement.clientHeight, window.innerHeight), s = Math.max(document.documentElement.clientWidth, window.innerWidth);
			return !(t.bottom < 0 || t.top - i >= 0 || t.right < 0 || t.left - s >= 0);
		})(o)) return;
		const i = null === (n = null === (t = e.panzoomRef) || void 0 === t ? void 0 : t.getWrapper()) || void 0 === n ? void 0 : n.getBoundingClientRect(), s = null == i ? void 0 : i.width, l = null == i ? void 0 : i.height;
		if (!s || !l) return;
		const r = o.getBoundingClientRect();
		let a = r.width, c = r.height, u = r.left, d = r.top;
		if (!r || !a || !c) return;
		if (o instanceof HTMLImageElement) {
			const e = window.getComputedStyle(o).getPropertyValue("object-fit");
			if ("contain" === e || "scale-down" === e) {
				const { width: t, height: n } = ((e, t, n, o, i = "contain") => {
					if ("contain" === i || e > n || t > o) {
						const i = n / e, s = o / t, l = Math.min(i, s);
						e *= l, t *= l;
					}
					return {
						width: e,
						height: t
					};
				})(o.naturalWidth, o.naturalHeight, a, c, e);
				u += .5 * (a - t), d += .5 * (c - n), a = t, c = n;
			}
		}
		if (Math.abs(s / l - a / c) > .1) return;
		return {
			x: u + .5 * a - (i.left + .5 * s),
			y: d + .5 * c - (i.top + .5 * l),
			scale: a / s
		};
	}
	function je() {
		N && clearTimeout(N), N = void 0, document.removeEventListener("mousemove", me);
	}
	function Le() {
		if (X) return;
		if (N) return;
		const e = Z("idle");
		e && (N = setTimeout(Se, e));
	}
	function Se() {
		T && (je(), s$7(T, "is-idle"), document.addEventListener("mousemove", me), X = !0);
	}
	function Ce() {
		X && (Pe(), Le());
	}
	function Pe() {
		je(), T?.classList.remove("is-idle"), X = !1;
	}
	function Te() {
		const e = xe();
		var t;
		!e || (t = e.getBoundingClientRect()).bottom > 0 && t.right > 0 && t.left < (window.innerWidth || document.documentElement.clientWidth) && t.top < (window.innerHeight || document.documentElement.clientHeight) || e.closest("[inert]") || e.scrollIntoView({
			behavior: "instant",
			block: "center",
			inline: "center"
		});
	}
	function Ae(e, t) {
		var n, o, i, s, r;
		if (V === _.Closing || V === _.Destroyed) return;
		const a = new Event("shouldClose", {
			bubbles: !0,
			cancelable: !0
		});
		if (ee("shouldClose", a, e), a.defaultPrevented) return;
		if (je(), e) {
			if (e.defaultPrevented) return;
			k(e), e.stopPropagation(), e.stopImmediatePropagation();
		}
		if (V = _.Closing, q?.pause(), D?.destroy(), M) {
			null === (n = M.getGestures()) || void 0 === n || n.destroy(), null === (o = M.getTween()) || void 0 === o || o.pause();
			for (const e of M.getSlides()) {
				const t = e.panzoomRef;
				t && (r$2(t.getOptions(), {
					clickAction: !1,
					dblClickAction: !1,
					wheelAction: !1,
					bounds: !1,
					minScale: 0,
					maxScale: 1 / 0
				}), null === (i = t.getGestures()) || void 0 === i || i.destroy(), null === (s = t.getTween()) || void 0 === s || s.pause());
			}
		}
		const c = null == M ? void 0 : M.getPlugins();
		null === (r = null == c ? void 0 : c.Autoplay) || void 0 === r || r.stop();
		const u = null == c ? void 0 : c.Fullscreen;
		u && u.inFullscreen() ? Promise.resolve(u.exit()).then(() => {
			setTimeout(() => {
				Me(e, t);
			}, 150);
		}) : Me(e, t);
	}
	function Me(e, t) {
		var n, o;
		if (V !== _.Closing) return;
		ee("close", e), G = !1, document.body.removeEventListener("click", pe), document.body.removeEventListener("keydown", ge, {
			passive: !1,
			capture: !0
		}), Z("placeFocusBack") && Te();
		const i = document.activeElement;
		i && null != r && r.contains(i) && i.blur(), Z("fadeEffect") && (T?.classList.remove("is-ready"), T?.classList.add("is-hiding")), T?.classList.add("is-closing");
		const s = Ee(), l = null == s ? void 0 : s.el, a = null == s ? void 0 : s.panzoomRef, c = null === (n = null == s ? void 0 : s.panzoomRef) || void 0 === n ? void 0 : n.getTween(), u = t || Z("hideClass");
		let d = !1, m = !1;
		if (M && s && l && a && c) {
			let e;
			if (Z("zoomEffect") && 1 === s.state && (e = we(s)), e) {
				d = !0;
				const t = () => {
					e = we(s), e ? c.to(Object.assign(Object.assign({}, y$1), e)) : ke();
				};
				a.on("refresh", () => {
					t();
				}), c.easing(c$4.Easings.EaseOut).duration(350).from(Object.assign({}, a.getTransform())).to(Object.assign(Object.assign({}, y$1), e)).start(), null != l && l.getAnimations() && (l.style.animationPlayState = "paused", requestAnimationFrame(() => {
					t();
				}));
			}
		}
		const g = (null == s ? void 0 : s.htmlEl) || (null === (o = null == s ? void 0 : s.panzoomRef) || void 0 === o ? void 0 : o.getWrapper());
		g && O(g), !d && u && g && (m = !0, R(g, u, () => {
			ke();
		})), d || m ? setTimeout(() => {
			ke();
		}, 350) : ke();
	}
	function ke() {
		var e, t, n, o, i;
		if (V === _.Destroyed) return;
		V = _.Destroyed;
		const l = xe();
		ee("destroy"), null === (t = null === (e = Z("sync")) || void 0 === e ? void 0 : e.getPlugins().Autoplay) || void 0 === t || t.resume(), null === (o = null === (n = Z("sync")) || void 0 === n ? void 0 : n.getPlugins().Autoscroll) || void 0 === o || o.resume(), r instanceof HTMLDialogElement && r.close(), null === (i = null == M ? void 0 : M.getContainer()) || void 0 === i || i.classList.remove("is-idle"), M?.destroy();
		for (const e of Object.values(K)) e?.destroy();
		if (K = {}, r?.remove(), r = void 0, T = void 0, M = void 0, z.delete($), !z.size && (t$2(!1), document.documentElement.classList.remove(B), Z("placeFocusBack") && l && !l.closest("[inert]"))) try {
			l?.focus({ preventScroll: !0 });
		} catch (e) {}
	}
	const Re = {
		close: Ae,
		destroy: ke,
		getCarousel: function() {
			return M;
		},
		getContainer: function() {
			return T;
		},
		getId: function() {
			return $;
		},
		getOptions: function() {
			return W;
		},
		getPlugins: function() {
			return K;
		},
		getSlide: function() {
			return Ee();
		},
		getState: function() {
			return V;
		},
		init: function(t = [], n = {}) {
			V !== _.Init && (Re.destroy(), V = _.Init), W = r$2({}, I, n), $ = Z("id") || "fancybox-" + ++H;
			const a = z.get($);
			if (a && a.destroy(), z.set($, Re), ee("init"), function() {
				for (const [e, t] of Object.entries(Object.assign(Object.assign({}, F.Plugins), W.plugins || {}))) if (e && !K[e] && t instanceof Function) {
					const n = t();
					n.init(Re), K[e] = n;
				}
				ee("initPlugins");
			}(), function(e = []) {
				ee("initSlides", e), U = [...e];
			}(t), function() {
				const t = Z("parentEl") || document.body;
				if (!(t && t instanceof HTMLElement)) return;
				if (r = e$7(J(Z("mainTpl") || "")) || void 0, !r) return;
				if (T = r.querySelector(".fancybox__container"), !(T && T instanceof HTMLElement)) return;
				const l = Z("mainClass");
				l && s$7(T, l);
				const a = Z("mainStyle");
				if (a && t$5(a)) for (const [e, t] of Object.entries(a)) T.style.setProperty(e, t);
				const u = Z("theme"), d = "auto" === u ? window.matchMedia("(prefers-color-scheme:light)").matches : "light" === u;
				T.setAttribute("theme", d ? "light" : "dark"), r.setAttribute("id", `${$}`), r.addEventListener("keydown", (e) => {
					"Escape" === e.key && k(e);
				}), r.addEventListener("wheel", (e) => {
					const t = e.target;
					let n = Z("wheel", e);
					t.closest(".f-thumbs") && (n = "slide");
					const o = "slide" === n, s = [
						-e.deltaX || 0,
						-e.deltaY || 0,
						-e.detail || 0
					].reduce(function(e, t) {
						return Math.abs(t) > Math.abs(e) ? t : e;
					}), l = Math.max(-1, Math.min(1, s)), r = Date.now();
					Y && r - Y < 300 ? o && k(e) : (Y = r, ee("wheel", e, l), e.defaultPrevented || ("close" === n ? Ae(e) : "slide" === n && M && !n$8(t) && (k(e), M[l > 0 ? "prev" : "next"]())));
				}, {
					capture: !0,
					passive: !1
				}), r.addEventListener("cancel", (e) => {
					Ae(e);
				}), t.append(r), 1 === z.size && (Z("hideScrollbar") && t$2(!0), document.documentElement.classList.add(B));
				ee("initLayout"), r instanceof HTMLDialogElement && (Z("modal") ? r.showModal() : r.show());
			}(), function() {
				if (A = (null == r ? void 0 : r.querySelector(".fancybox__carousel")) || void 0, !A) return;
				A.fancybox = Re;
				const e = r$2({}, {
					Autoplay: {
						autoStart: !1,
						pauseOnHover: !1,
						progressbarParentEl: (e) => {
							const t = e.getContainer();
							return (null == t ? void 0 : t.querySelector(".f-carousel__toolbar [data-autoplay-action]")) || t;
						}
					},
					Fullscreen: { el: T },
					Toolbar: {
						absolute: !0,
						items: { counter: { tpl: "<div class=\"f-counter\"><span data-fancybox-page></span>/<span data-fancybox-pages></span></div>" } },
						display: {
							left: ["counter"],
							right: [
								"toggleFull",
								"autoplay",
								"fullscreen",
								"thumbs",
								"close"
							]
						}
					},
					Video: { autoplay: !0 },
					Thumbs: {
						minCount: 2,
						Carousel: { classes: { container: "fancybox__thumbs" } }
					},
					classes: {
						container: "fancybox__carousel",
						viewport: "fancybox__viewport",
						slide: "fancybox__slide"
					},
					spinnerTpl: "<div class=\"f-spinner\" data-fancybox-close></div>",
					dragFree: !1,
					slidesPerPage: 1,
					plugins: {
						Sync: i$3,
						Arrows: l$4,
						Lazyload: i$2,
						Zoomable: s$4,
						Html: l$3,
						Video: s$1,
						Autoplay: o$2,
						Fullscreen: l$1,
						Thumbs: c$1,
						Toolbar: c$2
					}
				}, Z("Carousel") || {}, {
					slides: U,
					enabled: !0,
					initialPage: Z("startIndex") || 0,
					l10n: Z("l10n")
				});
				M = x(A, e), ee("initCarousel", M), M.on("*", (e, t, ...n) => {
					ee(`Carousel.${t}`, e, ...n);
				}), M.on("attachSlideEl", ne), M.on("detachSlideEl", oe), M.on("contentLoading", ae), M.on("contentReady", ce), M.on("ready", le), M.on("change", se), M.on("settle", re), M.on("thumbs:ready", ue), M.on("thumbs:destroy", ue), M.init();
			}(), r && T) {
				if (Z("closeExisting")) for (const [e, t] of z.entries()) e !== $ && t.close();
				Z("fadeEffect") ? (setTimeout(() => {
					te();
				}, 500), s$7(T, "is-revealing")) : te(), T.classList.add("is-ready"), V = _.Ready, ee("ready");
			}
		},
		isCurrentSlide: function(e) {
			const t = Ee();
			return !(!e || !t) && t.index === e.index;
		},
		isTopMost: function() {
			return he();
		},
		localize: J,
		off: function(e, t) {
			return Q.has(e) && Q.set(e, Q.get(e).filter((e) => e !== t)), Re;
		},
		on: function(e, t) {
			return Q.set(e, [...Q.get(e) || [], t]), Re;
		},
		toggleIdle(e) {
			(X || !0 === e) && Se(), X && !1 !== e || Pe();
		}
	};
	return Re;
};
function q() {
	for (const e of Object.values(F.Plugins)) {
		const t = e.setup;
		"function" == typeof t && t(F);
	}
}
function N(e, t = {}) {
	var n, o, i;
	if (!(e && e instanceof Element)) return;
	let s, r, a, c, u = {};
	for (const [t, n] of F.openers) if (t.contains(e)) for (const [o, i] of n) {
		let n;
		if (o) {
			for (const i of t.querySelectorAll(o)) if (i.contains(e)) {
				n = i;
				break;
			}
			if (!n) continue;
		}
		for (const [o, d] of i) {
			let i = null;
			try {
				i = e.closest(o);
			} catch (e) {}
			i && (r = t, a = n, s = i, c = o, r$2(u, d || {}));
		}
	}
	if (!r || !c || !s) return;
	const d = r$2({}, I, t, u, { triggerEl: s });
	let f = [].slice.call((a || r).querySelectorAll(c));
	const m = s.closest(".f-carousel"), g = null == m ? void 0 : m.carousel;
	if (g && (!a || !m.contains(a))) {
		const e = [];
		for (const t of null == g ? void 0 : g.getSlides()) {
			const n = t.el;
			n && (n.matches(c) ? e.push(n) : e.push(...[].slice.call(n.querySelectorAll(c))));
		}
		e.length && (f = [...e], null === (n = g.getPlugins().Autoplay) || void 0 === n || n.pause(), null === (o = g.getPlugins().Autoscroll) || void 0 === o || o.pause(), d.sync = g);
	}
	if (!1 === d.groupAll) {
		const e = d.groupAttr, t = e && s ? s.getAttribute(`${e}`) : "";
		f = e && t && "true" !== t ? f.filter((n) => n.getAttribute(`${e}`) === t) : [s];
	}
	if (!f.length) return;
	null === (i = d.triggerEvent) || void 0 === i || i.preventDefault();
	const p = F.getInstance(), v = null == p ? void 0 : p.getState();
	if (p && (v === _.Init || v === _.Ready)) {
		const e = p.getOptions().triggerEl;
		if (e && f.indexOf(e) > -1) return;
	}
	return Object.assign({}, d.Carousel || {}).rtl && (f = f.reverse()), s && void 0 === t.startIndex && (d.startIndex = f.indexOf(s)), F.fromNodes(f, d);
}
var F = {
	Plugins: { Hash: m },
	version: "6.1.14",
	openers: /* @__PURE__ */ new Map(),
	bind: function(e, n, o, i) {
		if (!e$1()) return;
		let s = document.body, l = null, a = "[data-fancybox]", c = {};
		e instanceof Element && (s = e), t$7(e) && t$7(n) ? (l = e, a = n) : t$7(n) && t$7(o) ? (l = n, a = o) : t$7(n) ? a = n : t$7(e) && (a = e), "object" == typeof n && (c = n || {}), "object" == typeof o && (c = o || {}), "object" == typeof i && (c = i || {}), function(e, t, n, o = {}) {
			if (!(e && e instanceof Element && n)) return;
			const i = F.openers.get(e) || /* @__PURE__ */ new Map(), s = i.get(t) || /* @__PURE__ */ new Map();
			s.set(n, o), i.set(t, s), F.openers.set(e, i), 1 === i.size && e.addEventListener("click", F.fromEvent), q();
		}(s, l, a, c);
	},
	close: function(e = !0, ...t) {
		if (e) for (const e of z.values()) e.close(...t);
		else {
			const e = F.getInstance();
			e && e.close(...t);
		}
	},
	destroy: function() {
		let e;
		for (; e = F.getInstance();) e.destroy();
		for (const e of F.openers.keys()) e.removeEventListener("click", F.fromEvent);
		F.openers.clear();
	},
	fromEvent: function(e) {
		if (e.defaultPrevented) return;
		if (e.button && 0 !== e.button) return;
		if (e.ctrlKey || e.metaKey || e.shiftKey) return;
		let t = e.composedPath()[0];
		const n = { triggerEvent: e };
		if (t.closest(".fancybox__container.is-hiding")) return k(e), void e.stopPropagation();
		const o = t.closest("[data-fancybox-delegate]") || void 0;
		if (o) {
			const e = o.dataset.fancyboxDelegate || "", i = document.querySelectorAll(`[data-fancybox="${e}"]`), s = parseInt(o.dataset.fancyboxIndex || "", 10) || 0;
			t = i[s] || i[0], r$2(n, {
				delegateEl: o,
				startIndex: s
			});
		}
		return N(t, n);
	},
	fromNodes: function(e, t) {
		t = r$2({}, I, t || {});
		const n = [], o = (e) => e instanceof HTMLImageElement ? e : e instanceof HTMLElement ? e.querySelector("img:not([aria-hidden])") : void 0;
		for (const i of e) {
			const s = i.dataset || {}, l = t.delegateEl && e.indexOf(i) === t.startIndex ? t.delegateEl : void 0, r = o(l) || o(i) || void 0, a = s.src || i.getAttribute("href") || i.getAttribute("currentSrc") || i.getAttribute("src") || void 0, c = s.thumb || s.thumbSrc || (null == r ? void 0 : r.getAttribute("currentSrc")) || (null == r ? void 0 : r.getAttribute("src")) || (null == r ? void 0 : r.dataset.lazySrc) || void 0, u = {
				src: a,
				alt: s.alt || (null == r ? void 0 : r.getAttribute("alt")) || void 0,
				thumbSrc: c,
				thumbEl: r,
				triggerEl: i,
				delegateEl: l
			};
			for (const e in s) {
				let t = s[e] + "";
				u[e] = "true" === t ? "fancybox" !== e || "" : "false" !== t && t;
			}
			n.push(u);
		}
		return F.show(n, t);
	},
	fromSelector: function(e, n, o, i) {
		if (!e$1()) return;
		let s = document.body, l = null, a = "[data-fancybox]", c = {};
		e instanceof Element && (s = e), t$7(e) && t$7(n) ? (l = e, a = n) : t$7(n) && t$7(o) ? (l = n, a = o) : t$7(n) ? a = n : t$7(e) && (a = e), "object" == typeof n && (c = n || {}), "object" == typeof o && (c = o || {}), "object" == typeof i && (c = i || {});
		for (const [e, t] of F.openers) for (const [n, o] of t) for (const [t, i] of o) if (e === s && n === l) {
			const e = s.querySelector((n ? `${n} ` : "") + a);
			if (e && e.matches(t)) return F.fromTriggerEl(e, c);
		}
	},
	fromTriggerEl: N,
	getCarousel: function() {
		var e;
		return (null === (e = F.getInstance()) || void 0 === e ? void 0 : e.getCarousel()) || void 0;
	},
	getDefaults: function() {
		return I;
	},
	getInstance: function(e) {
		if (e) {
			const t = z.get(e);
			return t && t.getState() !== _.Destroyed ? t : void 0;
		}
		return Array.from(z.values()).reverse().find((e) => {
			if (e.getState() !== _.Destroyed) return e;
		}) || void 0;
	},
	getSlide: function() {
		var e;
		return (null === (e = F.getInstance()) || void 0 === e ? void 0 : e.getSlide()) || void 0;
	},
	show: function(e = [], t = {}) {
		return q(), D().init(e, t);
	},
	unbind: function(e, n, o) {
		if (!e$1()) return;
		let i = document.body, s = null, l = "[data-fancybox]";
		e instanceof Element && (i = e), t$7(e) && t$7(n) ? (s = e, l = n) : t$7(n) && t$7(o) ? (s = n, l = o) : t$7(n) ? l = n : t$7(e) && (l = e), function(e, t, n) {
			if (!(e && e instanceof Element && n)) return;
			const o = F.openers.get(e) || /* @__PURE__ */ new Map(), i = o.get(t) || /* @__PURE__ */ new Map();
			i && n && i.delete(n), i.size && n || o.delete(t), o.size || (F.openers.delete(e), e.removeEventListener("click", F.fromEvent));
		}(i, s, l);
	}
};
/*! License details at fancyapps.com/license */
var package_default = {
	name: "2sxc-docs",
	version: "21.00.00",
	description: "",
	templateName: "2sxc",
	enableDebug: false,
	scripts: {
		"theme-build": "vite build --mode production --config ./templates/shared-global/vite.config.mjs",
		"theme-dev": "vite build --watch --mode development --config ./templates/shared-global/vite.config.mjs",
		"// import": "Note: This is not yet working",
		"import": "npm run import-js && npm run import-jsng",
		"// import-js": "This is the import that already works. It will get the docs from the sxc-typings project and generate YAML for DocFx",
		"import-js": "npm run import-js1-pre-clean && npm run import-js2-typedoc && npm run import-js3-docfx",
		"import-js1-pre-clean": "cd import && delete.cmd \".\\api.js.sxcjs\"",
		"import-js2-typedoc": "cd \"../../2sxc-ui/projects/sxc-typings/\" && typedoc --tsconfig ./tsconfig.typedoc.json --json \"../../../2sxc-docs/2sxc Docs Generator/import/api.js.sxcjs/typedoc.json\"",
		"import-js3-docfx": "type2docfx ./import/api.js.sxcjs/typedoc.json ./import/api.js.sxcjs/docFx",
		"import-jsng": "npm run import-jsng1-pre-clean && npm run import-jsng2-typedoc && npm run import-jsng3-docfx",
		"import-jsng1-pre-clean": "cd import && delete.cmd \".\\api.js.sxc-angular\"",
		"import-jsng2-typedoc": "cd \"../../2sxc-ui/projects/dnn-sxc-angular\" && typedoc --tsconfig ./tsconfig.typedoc.json --json \"../../../2sxc-docs/2sxc Docs Generator/import/api.js.sxc-angular/typedoc.json\"",
		"import-jsng3-docfx": "type2docfx ./import/api.js.sxc-angular/typedoc.json ./import/api.js.sxc-angular/docFx"
	},
	author: "",
	license: "ISC",
	devDependencies: {
		"@2sic.com/2sxc-typings": "^14.7.3",
		"@mostlylucid/mermaid-enhancements": "^1.0.0",
		"@types/jquery": "^4.0.1",
		"@types/node": "^26.2.0",
		"sass": "^1.102.0",
		"type2docfx": "^1.3.5",
		"typedoc": "^0.28.20",
		"typescript": "^6.0.3",
		"vite": "^8.2.1"
	},
	dependencies: {
		"@fancyapps/ui": "^6.1.14",
		"highlightjs-cshtml-razor": "^2.2.0",
		"js-yaml": "^5.2.3"
	}
};
//#endregion
//#region templates/shared-global/src/scripts/images.ts
var { enableDebug: enableDebug$2 } = package_default;
function configureLightboxes() {
	const imgSelector = "img:not(#logo):not(.for-link):not(.feature)";
	document.querySelectorAll(imgSelector).forEach((img) => {
		if (enableDebug$2) console.log("2dm img", img);
		const filename = img.src;
		img.style.cursor = "zoom-in";
		img.style.cursor = "-moz-zoom-in";
		img.style.cursor = "-webkit-zoom-in";
		const parentDiv = img.parentElement?.tagName === "DIV" ? img.parentElement : img.parentElement?.parentElement?.tagName === "DIV" ? img.parentElement?.parentElement : null;
		if (parentDiv) {
			if (enableDebug$2) console.log("found div around img", parentDiv);
			const named = parentDiv.attributes.getNamedItem("gallery");
			if (named !== null) {
				const name = named.value;
				img.dataset.fancybox = name || "gallery";
			} else if (parentDiv?.classList.contains("gallery")) img.dataset.fancybox = "gallery";
		}
		if (!img.alt) img.setAttribute("alt", filename);
	});
	F.bind(imgSelector);
}
//#endregion
//#region templates/shared-global/src/scripts/versions.ts
function setVersionButtonLink() {
	const versionSelector = document.getElementsByClassName("version-button")[0];
	if (!versionSelector) {
		console.log("Version button not found");
		return;
	}
	var newLink = versionSelector.href + "?version=" + package_default.version + "&path=" + window.location.pathname;
	versionSelector.setAttribute("href", newLink);
}
//#endregion
//#region templates/shared-global/src/scripts/context-illustrations.ts
var { enableDebug: enableDebug$1 } = package_default;
function lightboxForContextIllustration() {
	const containersLive = document.getElementsByClassName("fancybox-auto");
	const containers = Array.from(containersLive);
	if (enableDebug$1) console.log(`context containers ${containers.length}`, containers);
	for (var i = 0; i < containers.length; i++) {
		const e = containers[i];
		if (!e.id) e.id = "rndId-" + Math.floor(Math.random() * Math.floor(9999999));
		var pcls = e.parentElement?.className;
		if (pcls) {
			var contextCls = pcls.split(" ").find((c) => c.startsWith("context"));
			if (contextCls) e.classList.add(contextCls);
		}
		if (enableDebug$1) console.log("context containers", e.id, pcls);
		const popup = createPopupDiv(e, `${e.id}-clone`);
		e.setAttribute("data-src", `#${e.id}-clone`);
		popup.style.display = "none";
		e.attributes.setNamedItem(document.createAttribute("data-fancybox"));
	}
	F.bind("[data-fancybox]");
}
function createPopupDiv(original, newName) {
	const clone = original.cloneNode(true);
	clone.id = newName;
	clone.style.width = "95%";
	document.body.appendChild(clone);
	return clone;
}
//#endregion
//#region templates/shared-global/src/scripts/svgs/svg-importer.ts
var { enableDebug } = package_default;
if (enableDebug) console.log("svg-importer loaded");
function inlineSvgs() {
	const svgs = document.querySelectorAll("img.svg");
	if (enableDebug) console.log(`inlineSvgs ${svgs.length}`, svgs);
	svgs.forEach((svg) => {
		if (!svg.src.endsWith(".svg")) return;
		const img = svg;
		const imgURL = img.src;
		const imgID = img.id;
		const imgClass = img.className;
		const imgWidth = img.getAttribute("width");
		const imgHeight = img.getAttribute("height");
		fetch(imgURL).then((response) => {
			return response.text();
		}).then((data) => {
			const $svg = new DOMParser().parseFromString(data, "text/xml").getElementsByTagName("svg")[0];
			if (!$svg) return;
			if (imgID != null) $svg.id = imgID;
			if (imgClass != null) $svg.setAttribute("class", imgClass + " replaced-svg");
			if (imgWidth != null) $svg.setAttribute("width", imgWidth);
			if (imgHeight != null) $svg.setAttribute("height", imgHeight);
			$svg.removeAttribute("xmlns:a");
			img.parentNode?.replaceChild($svg, img);
		});
	});
}
//#endregion
//#region templates/shared-global/src/scripts/docs-links.ts
function convertDocsLinks() {
	const links = document.querySelectorAll("ul li a[title^=\"icon:\"]");
	if (!links.length) return;
	links.forEach((link) => {
		const listItem = link.closest("li");
		const list = link.closest("ul");
		if (!listItem || !list) return;
		list.classList.add("row", "row-cols-1", "row-cols-sm-2", "row-cols-md-3", "g-3", "docs-tiles", "list-unstyled");
		const title = link.textContent?.trim() || "";
		const description = (listItem.textContent || "").replace(title, "").trim();
		const href = link.getAttribute("href") || "#";
		const target = link.getAttribute("target") || (href.startsWith("http") ? "_blank" : "");
		const rel = link.getAttribute("rel") || (target === "_blank" ? "noopener noreferrer" : "");
		const iconTitle = link.getAttribute("title") || "";
		const icon = iconTitle.startsWith("icon:") ? iconTitle.substring(5) : "";
		const iconIsEmoji = /\p{Extended_Pictographic}/u.test(icon);
		const emoji = iconIsEmoji ? icon : "";
		const iconCss = !iconIsEmoji ? `bi bi-${icon || "link"}` : "";
		const targetAttr = target ? ` target="${target}"` : "";
		const relAttr = rel ? ` rel="${rel}"` : "";
		listItem.classList.add("col");
		listItem.innerHTML = `
      <div class="card h-100 text-center position-relative">
        <div class="card-body d-flex flex-column justify-content-center align-items-center py-4">
          <icon class="${iconCss} fs-1 text-primary mb-2">${emoji}</icon>
          <div class="fw-semibold">${title}</div>
          ${description ? `<div class="small text-muted mt-1">${description}</div>` : ""}
        </div>
        <a href="${href}"${targetAttr}${relAttr} class="stretched-link"></a>
      </div>
    `;
	});
}
//#endregion
//#region templates/2sxc/src/main.ts
var main_default = { configureHljs: (hljs) => {
	hljs.registerLanguage("cshtml-razor", import_cshtml_razor);
	hljs.registerAliases("razor", { languageName: "cshtml-razor" });
} };
docReady(function() {
	configureLightboxes();
	setVersionButtonLink();
	inlineSvgs();
	Xref.runXrefPage();
	lightboxForContextIllustration();
	convertDocsLinks();
});
//#endregion
export { main_default as default };

//# sourceMappingURL=main.js.map