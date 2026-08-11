//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, o) => (o = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)), l = /* @__PURE__ */ o(((e, t) => {
	t.exports = function(e) {
		let t = "built_in", r = {}, i = {
			begin: "}",
			className: t,
			endsParent: !0
		}, a = {
			begin: "{",
			end: "}",
			contains: [e.QUOTE_STRING_MODE, "self"]
		}, o = {
			begin: "{",
			end: "}",
			contains: ["self"],
			skip: !0
		}, s = {
			variants: [{
				begin: /"/,
				end: /"/,
				skip: !0
			}, {
				begin: /'/,
				end: /'/,
				skip: !0
			}],
			skip: !0
		}, c = e.COMMENT("@\\*", "\\*@", { relevance: 10 }), l = {
			begin: "@[A-Za-z0-9\\._:-]+",
			returnBegin: !0,
			end: "(\\r|\\n|<|\\s|\"|')",
			subLanguage: "csharp",
			contains: [
				{
					begin: "@",
					className: t
				},
				{
					begin: "\\[",
					end: "\\]",
					skip: !0
				},
				{
					begin: "\\(",
					end: "\\)",
					skip: !0
				}
			],
			returnEnd: !0
		}, u = {
			begin: "[@]{0,1}<text>",
			returnBegin: !0,
			end: "</text>",
			returnEnd: !0,
			subLanguage: "cshtml-razor",
			contains: [{
				begin: "[@]{0,1}<text>",
				className: t
			}, {
				begin: "</text>",
				className: t,
				endsParent: !0
			}]
		}, d = {
			variants: [{ begin: "@@" }, { begin: "[a-zA-Z]+@" }],
			skip: !0
		}, f = {
			begin: "@\\(",
			end: "\\)",
			returnBegin: !0,
			returnEnd: !0,
			subLanguage: "csharp",
			contains: [
				{
					begin: "@\\(",
					className: t
				},
				{
					begin: "\\(",
					end: "\\)",
					subLanguage: "csharp",
					contains: [
						e.QUOTE_STRING_MODE,
						"self",
						u
					]
				},
				u,
				{
					begin: "\\)",
					className: t,
					endsParent: !0
				}
			]
		}, p = n(e, [l, f]), m = {
			begin: "^\\s*@(page|model|using|inherits|inject|layout)[^\\r\\n{\\(]*$",
			end: "$",
			returnBegin: !0,
			returnEnd: !0,
			contains: [{
				begin: "^\\s*@(page|model|using|inherits|inject|layout)",
				className: t
			}, {
				variants: [
					{
						begin: "\\r|\\n",
						endsParent: !0
					},
					{
						begin: "\\s[^\\r\\n]+",
						end: "$"
					},
					{ begin: "$" }
				],
				className: "type",
				endsParent: !0
			}]
		}, h = {
			variants: [{
				begin: "@\\{",
				end: "}"
			}, {
				begin: "@code\\s*\\{",
				end: "}"
			}],
			returnBegin: !0,
			returnEnd: !0,
			subLanguage: "csharp",
			contains: [
				{
					begin: "@(code\\s*)?\\{",
					className: t
				},
				r,
				o,
				s,
				i
			]
		}, g = {
			begin: "^\\s*@helper\\s+[^{\\s]+(?:\\s+[^{\\s]+)*\\s*{",
			returnBegin: !0,
			returnEnd: !0,
			end: "}",
			subLanguage: "cshtml-razor",
			contains: [
				{
					begin: "@helper",
					className: t
				},
				{
					begin: "{",
					className: t
				},
				i
			]
		}, _ = [
			"for",
			"if",
			"switch",
			"while",
			"using",
			"lock",
			"foreach"
		].map((e) => ({
			begin: `@${e}(?![\\w\\d])[^{]*\\{`,
			end: "}"
		})), v = [{ begin: "\\}\\s*else\\s*(if[^\\{]+|)\\{" }], y = {
			variants: _,
			returnBegin: !0,
			returnEnd: !0,
			subLanguage: "csharp",
			contains: [
				{
					variants: _.map(function(e) {
						return { begin: e.begin };
					}),
					returnBegin: !0,
					contains: [
						{
							begin: "@",
							className: t
						},
						{
							variants: _.map(function(e) {
								return { begin: `${e.begin}`.substring(1, e.begin.length - 2) };
							}),
							subLanguage: "csharp"
						},
						{
							begin: "{",
							className: t
						}
					]
				},
				r,
				{
					variants: v,
					returnBegin: !0,
					contains: [
						{
							begin: "}",
							className: t
						},
						{
							begin: v[0].begin.substring(2, v[0].begin.length - 2),
							subLanguage: "csharp"
						},
						{
							begin: "{",
							className: t
						}
					]
				},
				a,
				i
			]
		}, b = {
			begin: "@try\\s*{",
			end: "}",
			returnBegin: !0,
			returnEnd: !0,
			subLanguage: "csharp",
			contains: [
				{
					begin: "@",
					className: t
				},
				{
					begin: "try\\s*{",
					subLanguage: "csharp"
				},
				{
					variants: [{ begin: "}\\s*catch\\s*\\([^\\)]+\\)\\s*{" }, { begin: "}\\s*finally\\s*{" }],
					returnBegin: !0,
					contains: [
						{
							begin: "}",
							className: t
						},
						{
							variants: [{ begin: "\\s*catch\\s*\\([^\\)]+\\)\\s*" }, { begin: "\\s*finally\\s*" }],
							subLanguage: "csharp"
						},
						{
							begin: "{",
							className: t
						}
					]
				},
				r,
				a,
				i
			]
		}, x = "@section\\s+[a-zA-Z0-9]+\\s*{", S = [
			m,
			g,
			h,
			y,
			{
				begin: x,
				returnBegin: !0,
				returnEnd: !0,
				end: "}",
				subLanguage: "cshtml-razor",
				contains: [
					{
						begin: x,
						className: t
					},
					a,
					i
				]
			},
			{
				begin: "@await ",
				returnBegin: !0,
				subLanguage: "csharp",
				end: "(\\r|\\n|<|\\s)",
				contains: [{
					begin: "@await ",
					className: t
				}, {
					begin: "[<\\r\\n]",
					endsParent: !0
				}]
			},
			b,
			d,
			u,
			c,
			f,
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
		].concat(p);
		return [
			h,
			y,
			b
		].forEach(function(e) {
			let t = S.filter(function(t) {
				return t !== e;
			}), n = e.contains.indexOf(r);
			e.contains.splice.apply(e.contains, [n, 1].concat(t));
		}), {
			aliases: [
				"cshtml",
				"razor",
				"razor-cshtml",
				"cshtml-razor"
			],
			contains: S
		};
	};
	function n(e, t) {
		let n = e.COMMENT("<!--", "-->", { relevance: 10 }), r = {
			endsWithParent: !0,
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
							contains: t
						},
						{
							begin: /'/,
							end: /'/,
							contains: t
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
			n,
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
				contains: [r],
				starts: {
					end: "</style>",
					returnEnd: !0,
					subLanguage: ["css", "xml"]
				}
			},
			{
				className: "tag",
				begin: "<script(?=\\s|>|$)",
				end: ">",
				keywords: { name: "script" },
				contains: [r],
				starts: {
					end: "<\/script>",
					returnEnd: !0,
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
				}, r]
			}
		].concat(t);
	}
})), u = /* @__PURE__ */ o(((e) => {
	Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
	var t = Symbol("NOT_RESOLVED"), n = Symbol("MERGE_KEY");
	function r(e, t) {
		return {
			tagName: e,
			nodeKind: "scalar",
			implicit: t.implicit ?? !1,
			matchByTagPrefix: t.matchByTagPrefix ?? !1,
			implicitFirstChars: t.implicitFirstChars ?? null,
			resolve: t.resolve,
			identify: t.identify ?? null,
			represent: t.represent ?? ((e) => String(e)),
			representTagName: t.representTagName ?? null
		};
	}
	function i(e, t) {
		let n = t.finalize === void 0;
		return {
			tagName: e,
			nodeKind: "sequence",
			implicit: !1,
			matchByTagPrefix: t.matchByTagPrefix ?? !1,
			create: t.create,
			addItem: t.addItem,
			finalize: t.finalize ?? ((e) => e),
			carrierIsResult: n,
			identify: t.identify ?? null,
			represent: t.represent ?? ((e) => e),
			representTagName: t.representTagName ?? null
		};
	}
	function a(e, t) {
		let n = t.finalize === void 0;
		return {
			tagName: e,
			nodeKind: "mapping",
			implicit: !1,
			matchByTagPrefix: t.matchByTagPrefix ?? !1,
			create: t.create,
			addPair: t.addPair,
			has: t.has,
			keys: t.keys,
			get: t.get,
			finalize: t.finalize ?? ((e) => e),
			carrierIsResult: n,
			identify: t.identify ?? null,
			represent: t.represent ?? ((e) => e),
			representTagName: t.representTagName ?? null
		};
	}
	var o = r("tag:yaml.org,2002:str", {
		resolve: (e) => e,
		identify: (e) => typeof e == "string"
	}), s = [
		"",
		"~",
		"null",
		"Null",
		"NULL"
	], c = r("tag:yaml.org,2002:null", {
		implicit: !0,
		implicitFirstChars: [
			"",
			"~",
			"n",
			"N"
		],
		resolve: (e) => s.indexOf(e) === -1 ? t : null,
		identify: (e) => e === null,
		represent: () => "null"
	}), l = r("tag:yaml.org,2002:null", {
		implicit: !0,
		implicitFirstChars: ["n"],
		resolve: (e, n) => e === "null" || n && e === "" ? null : t,
		identify: (e) => e === null,
		represent: () => "null"
	}), u = [
		"",
		"~",
		"null",
		"Null",
		"NULL"
	], d = r("tag:yaml.org,2002:null", {
		implicit: !0,
		implicitFirstChars: [
			"",
			"~",
			"n",
			"N"
		],
		resolve: (e) => u.indexOf(e) === -1 ? t : null,
		identify: (e) => e === null,
		represent: () => "null"
	}), f = [
		"true",
		"True",
		"TRUE"
	], p = [
		"false",
		"False",
		"FALSE"
	], m = r("tag:yaml.org,2002:bool", {
		implicit: !0,
		implicitFirstChars: [
			"t",
			"T",
			"f",
			"F"
		],
		resolve: (e) => f.indexOf(e) !== -1 || p.indexOf(e) === -1 && t,
		identify: (e) => Object.prototype.toString.call(e) === "[object Boolean]",
		represent: (e) => e ? "true" : "false"
	}), h = ["true"], g = ["false"], _ = r("tag:yaml.org,2002:bool", {
		implicit: !0,
		implicitFirstChars: ["t", "f"],
		resolve: (e) => h.indexOf(e) !== -1 || g.indexOf(e) === -1 && t,
		identify: (e) => Object.prototype.toString.call(e) === "[object Boolean]",
		represent: (e) => e ? "true" : "false"
	}), v = [
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
	], y = [
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
	], b = r("tag:yaml.org,2002:bool", {
		implicit: !0,
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
		resolve: (e) => v.indexOf(e) !== -1 || y.indexOf(e) === -1 && t,
		identify: (e) => Object.prototype.toString.call(e) === "[object Boolean]",
		represent: (e) => e ? "true" : "false"
	}), x = /* @__PURE__ */ RegExp("^(?:0o[0-7]+|0x[0-9a-fA-F]+|[-+]?[0-9]+)$"), S = /* @__PURE__ */ RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");
	function C(e) {
		let t = e, n = 1;
		return (t[0] === "-" || t[0] === "+") && (t[0] === "-" && (n = -1), t = t.slice(1)), t.startsWith("0b") ? n * parseInt(t.slice(2), 2) : t.startsWith("0o") ? n * parseInt(t.slice(2), 8) : t.startsWith("0x") ? n * parseInt(t.slice(2), 16) : n * parseInt(t, 10);
	}
	function w(e, n) {
		if (n) {
			if (!S.test(e)) return t;
		} else if (!x.test(e)) return t;
		let r = C(e);
		return Number.isFinite(r) ? r : t;
	}
	var T = r("tag:yaml.org,2002:int", {
		implicit: !0,
		implicitFirstChars: [
			"-",
			"+",
			..."0123456789"
		],
		resolve: w,
		identify: (e) => Number.isInteger(e) && !Object.is(e, -0) && e.toString(10).indexOf("e") < 0,
		represent: (e) => e.toString(10)
	}), E = /* @__PURE__ */ RegExp("^-?(?:0|[1-9][0-9]*)$"), D = /* @__PURE__ */ RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");
	function O(e) {
		let t = e, n = 1;
		return (t[0] === "-" || t[0] === "+") && (t[0] === "-" && (n = -1), t = t.slice(1)), t.startsWith("0b") ? n * parseInt(t.slice(2), 2) : t.startsWith("0o") ? n * parseInt(t.slice(2), 8) : t.startsWith("0x") ? n * parseInt(t.slice(2), 16) : n * parseInt(t, 10);
	}
	function k(e, n) {
		if (n) {
			if (!D.test(e)) return t;
		} else if (!E.test(e)) return t;
		let r = O(e);
		return Number.isFinite(r) ? r : t;
	}
	var A = r("tag:yaml.org,2002:int", {
		implicit: !0,
		implicitFirstChars: ["-", ..."0123456789"],
		resolve: k,
		identify: (e) => Number.isInteger(e) && !Object.is(e, -0) && e.toString(10).indexOf("e") < 0,
		represent: (e) => e.toString(10)
	}), j = /* @__PURE__ */ RegExp("^(?:[-+]?0b[0-1_]+|[-+]?0[0-7_]+|[-+]?0x[0-9a-fA-F_]+|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+|[-+]?(?:0|[1-9][0-9_]*))$");
	function M(e) {
		let t = e.replace(/_/g, ""), n = 1;
		if ((t[0] === "-" || t[0] === "+") && (t[0] === "-" && (n = -1), t = t.slice(1)), t.startsWith("0b")) return n * parseInt(t.slice(2), 2);
		if (t.startsWith("0x")) return n * parseInt(t.slice(2), 16);
		if (t.includes(":")) {
			let e = 0;
			for (let n of t.split(":")) e = e * 60 + Number(n);
			return n * e;
		}
		return t !== "0" && t[0] === "0" ? n * parseInt(t, 8) : n * parseInt(t, 10);
	}
	function ee(e) {
		if (!j.test(e)) return t;
		let n = M(e);
		return Number.isFinite(n) ? n : t;
	}
	var te = r("tag:yaml.org,2002:int", {
		implicit: !0,
		implicitFirstChars: [
			"-",
			"+",
			..."0123456789"
		],
		resolve: ee,
		identify: (e) => Number.isInteger(e) && !Object.is(e, -0) && e.toString(10).indexOf("e") < 0,
		represent: (e) => e.toString(10)
	}), N = /* @__PURE__ */ RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"), P = /* @__PURE__ */ RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
	function F(e) {
		if (!N.test(e)) return t;
		let n = e.toLowerCase(), r = n[0] === "-" ? -1 : 1;
		if ("+-".includes(n[0]) && (n = n.slice(1)), n === ".inf") return r === 1 ? Infinity : -Infinity;
		if (n === ".nan") return NaN;
		let i = r * parseFloat(n);
		return Number.isFinite(i) || P.test(e) ? i : t;
	}
	function ne(e) {
		if (isNaN(e)) return ".nan";
		if (e === Infinity) return ".inf";
		if (e === -Infinity) return "-.inf";
		if (Object.is(e, -0)) return "-0.0";
		let t = e.toString(10);
		return /^[-+]?[0-9]+e/.test(t) ? t.replace("e", ".e") : t;
	}
	var re = r("tag:yaml.org,2002:float", {
		implicit: !0,
		implicitFirstChars: [
			"-",
			"+",
			".",
			..."0123456789"
		],
		resolve: F,
		identify: (e) => typeof e == "number" && (!Number.isInteger(e) || Object.is(e, -0) || e.toString(10).indexOf("e") >= 0),
		represent: ne
	}), I = /* @__PURE__ */ RegExp("^-?(?:0|[1-9][0-9]*)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$"), ie = /* @__PURE__ */ RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
	function ae(e, n) {
		if (n) {
			if (!ie.test(e)) return t;
			let n = e.toLowerCase(), r = n[0] === "-" ? -1 : 1;
			if ("+-".includes(n[0]) && (n = n.slice(1)), n === ".inf") return r === 1 ? Infinity : -Infinity;
			if (n === ".nan") return NaN;
			let i = r * parseFloat(n);
			return Number.isFinite(i) ? i : t;
		}
		if (!I.test(e)) return t;
		let r = Number(e);
		return Number.isFinite(r) ? r : t;
	}
	function L(e) {
		if (isNaN(e)) return ".nan";
		if (e === Infinity) return ".inf";
		if (e === -Infinity) return "-.inf";
		if (Object.is(e, -0)) return "-0.0";
		let t = e.toString(10);
		return /^[-+]?[0-9]+e/.test(t) ? t.replace("e", ".e") : t;
	}
	var R = r("tag:yaml.org,2002:float", {
		implicit: !0,
		implicitFirstChars: ["-", ..."0123456789"],
		resolve: ae,
		identify: (e) => typeof e == "number" && (!Number.isInteger(e) || Object.is(e, -0) || e.toString(10).indexOf("e") >= 0),
		represent: L
	}), z = /* @__PURE__ */ RegExp("^(?:[-+]?(?:(?:[0-9][0-9_]*)?\\.[0-9_]*)(?:[eE][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"), oe = /* @__PURE__ */ RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
	function se(e) {
		if (!z.test(e)) return t;
		let n = e.toLowerCase().replace(/_/g, ""), r = n[0] === "-" ? -1 : 1;
		if ("+-".includes(n[0]) && (n = n.slice(1)), n === ".inf") return r === 1 ? Infinity : -Infinity;
		if (n === ".nan") return NaN;
		let i = 0;
		if (n.includes(":")) {
			for (let e of n.split(":")) i = i * 60 + Number(e);
			i *= r;
		} else i = r * parseFloat(n);
		return Number.isFinite(i) || oe.test(e) ? i : t;
	}
	function B(e) {
		if (isNaN(e)) return ".nan";
		if (e === Infinity) return ".inf";
		if (e === -Infinity) return "-.inf";
		if (Object.is(e, -0)) return "-0.0";
		let t = e.toString(10);
		return /^[-+]?[0-9]+e/.test(t) ? t.replace("e", ".e") : t;
	}
	var V = r("tag:yaml.org,2002:float", {
		implicit: !0,
		implicitFirstChars: [
			"-",
			"+",
			".",
			..."0123456789"
		],
		resolve: se,
		identify: (e) => typeof e == "number" && (!Number.isInteger(e) || Object.is(e, -0) || e.toString(10).indexOf("e") >= 0),
		represent: B
	}), ce = r("tag:yaml.org,2002:merge", {
		implicit: !0,
		implicitFirstChars: ["<"],
		resolve: (e, r) => e === "<<" || r && e === "" ? n : t
	}), H = /^[A-Za-z0-9+/]*={0,2}$/;
	function U(e) {
		let n = e.replace(/\s/g, "");
		if (n.length % 4 != 0 || !H.test(n)) return t;
		let r = atob(n), i = new Uint8Array(r.length);
		for (let e = 0; e < r.length; e++) i[e] = r.charCodeAt(e);
		return i;
	}
	function le(e) {
		let t = "";
		for (let n = 0; n < e.length; n++) t += String.fromCharCode(e[n]);
		return btoa(t);
	}
	var W = r("tag:yaml.org,2002:binary", {
		resolve: U,
		identify: (e) => Object.prototype.toString.call(e) === "[object Uint8Array]",
		represent: le
	}), ue = /* @__PURE__ */ RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"), de = /* @__PURE__ */ RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");
	function fe(e, t, n, r = 0, i = 0, a = 0, o = 0) {
		let s = new Date(Date.UTC(e, t, n, r, i, a, o));
		return s.setUTCFullYear(e, t, n), s;
	}
	function pe(e) {
		let n = ue.exec(e);
		if (n === null && (n = de.exec(e)), n === null) return t;
		let r = +n[1], i = n[2] - 1, a = +n[3];
		if (!n[4]) {
			let e = fe(r, i, a);
			return e.getUTCFullYear() !== r || e.getUTCMonth() !== i || e.getUTCDate() !== a ? t : e;
		}
		let o = +n[4], s = +n[5], c = +n[6], l = 0;
		if (o > 23 || s > 59 || c > 59) return t;
		if (n[7]) {
			let e = n[7].slice(0, 3);
			for (; e.length < 3;) e += "0";
			l = +e;
		}
		let u = fe(r, i, a, o, s, c, l);
		if (u.getUTCFullYear() !== r || u.getUTCMonth() !== i || u.getUTCDate() !== a) return t;
		if (n[9]) {
			let e = +n[10], r = +(n[11] || 0);
			if (e > 23 || r > 59) return t;
			let i = (e * 60 + r) * 6e4;
			u.setTime(u.getTime() - (n[9] === "-" ? -i : i));
		}
		return u;
	}
	var me = r("tag:yaml.org,2002:timestamp", {
		implicit: !0,
		implicitFirstChars: [..."0123456789"],
		resolve: pe,
		identify: (e) => e instanceof Date,
		represent: (e) => e.toISOString()
	}), he = i("tag:yaml.org,2002:seq", {
		create: () => [],
		addItem: (e, t) => {
			e.push(t);
		},
		identify: Array.isArray
	});
	function ge(e) {
		if (typeof e != "object" || !e || Array.isArray(e)) return !1;
		let t = Object.getPrototypeOf(e);
		return t === null || t === Object.prototype;
	}
	function G(e, t) {
		let n = {};
		for (let r of t) e[r] !== void 0 && (n[r] = e[r]);
		return n;
	}
	var K = i("tag:yaml.org,2002:omap", {
		create: () => ({
			list: [],
			seen: /* @__PURE__ */ new Set()
		}),
		addItem: (e, t) => {
			let n;
			if (t instanceof Map) {
				if (t.size !== 1) return "cannot resolve an ordered map item";
				n = t.keys().next().value;
			} else if (ge(t)) {
				let e = Object.keys(t);
				if (e.length !== 1) return "cannot resolve an ordered map item";
				n = e[0];
			} else return "cannot resolve an ordered map item";
			return e.seen.has(n) ? "duplicate key in ordered map" : (e.seen.add(n), e.list.push(t), "");
		},
		finalize: (e) => e.list
	}), _e = i("tag:yaml.org,2002:pairs", {
		create: () => [],
		addItem: (e, t) => {
			if (t instanceof Map) return t.size === 1 ? (e.push(t.entries().next().value), "") : "cannot resolve a pairs item";
			if (Object.prototype.toString.call(t) !== "[object Object]") return "cannot resolve a pairs item";
			let n = t, r = Object.keys(n);
			return r.length === 1 ? (e.push([r[0], n[r[0]]]), "") : "cannot resolve a pairs item";
		}
	}), ve = a("tag:yaml.org,2002:map", {
		create: () => ({}),
		identify: ge,
		represent: (e) => {
			let t = /* @__PURE__ */ new Map();
			for (let n of Object.keys(e)) t.set(n, e[n]);
			return t;
		},
		addPair: (e, t, n) => {
			if (typeof t == "object" && t) return "object-based map does not support complex keys";
			let r = String(t);
			return r === "__proto__" ? Object.defineProperty(e, r, {
				value: n,
				enumerable: !0,
				configurable: !0,
				writable: !0
			}) : e[r] = n, "";
		},
		has: (e, t) => typeof t == "object" && t ? !1 : Object.prototype.hasOwnProperty.call(e, String(t)),
		keys: (e) => Object.keys(e),
		get: (e, t) => {
			let n = String(t);
			return Object.prototype.hasOwnProperty.call(e, n) ? e[n] : null;
		}
	}), ye = a("tag:yaml.org,2002:set", {
		create: () => /* @__PURE__ */ new Set(),
		identify: (e) => e instanceof Set,
		represent: (e) => {
			let t = /* @__PURE__ */ new Map();
			for (let n of e) t.set(n, null);
			return t;
		},
		addPair: (e, t, n) => n === null ? (e.add(t), "") : "cannot resolve a set item",
		has: (e, t) => e.has(t),
		keys: (e) => e.keys(),
		get: () => null
	});
	function be(e) {
		"@babel/helpers - typeof";
		return be = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
			return typeof e;
		} : function(e) {
			return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
		}, be(e);
	}
	function xe(e, t) {
		if (be(e) != "object" || !e) return e;
		var n = e[Symbol.toPrimitive];
		if (n !== void 0) {
			var r = n.call(e, t || "default");
			if (be(r) != "object") return r;
			throw TypeError("@@toPrimitive must return a primitive value.");
		}
		return (t === "string" ? String : Number)(e);
	}
	function Se(e) {
		var t = xe(e, "string");
		return be(t) == "symbol" ? t : t + "";
	}
	function q(e, t, n) {
		return (t = Se(t)) in e ? Object.defineProperty(e, t, {
			value: n,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[t] = n, e;
	}
	function Ce() {
		return {
			scalar: Object.create(null),
			sequence: Object.create(null),
			mapping: Object.create(null)
		};
	}
	function we() {
		return {
			scalar: [],
			sequence: [],
			mapping: []
		};
	}
	function Te(e) {
		let t = [];
		for (let n of e) {
			let e = t.length;
			for (let r = 0; r < t.length; r++) {
				let i = t[r];
				if (i.nodeKind === n.nodeKind && i.tagName === n.tagName && i.matchByTagPrefix === n.matchByTagPrefix) {
					e = r;
					break;
				}
			}
			t[e] = n;
		}
		return t;
	}
	var Ee = class e {
		constructor(e) {
			q(this, "tags", void 0), q(this, "implicitScalarTags", void 0), q(this, "implicitScalarByFirstChar", void 0), q(this, "implicitScalarAnyFirstChar", void 0), q(this, "defaultScalarTag", void 0), q(this, "defaultSequenceTag", void 0), q(this, "defaultMappingTag", void 0), q(this, "exact", void 0), q(this, "prefix", void 0);
			let t = Te(e), n = [], r = Ce(), i = we();
			for (let e of t) {
				if (e.nodeKind === "scalar" && e.implicit) {
					if (e.matchByTagPrefix) throw Error("Implicit scalar tags cannot match by tag prefix");
					n.push(e);
				}
				switch (e.nodeKind) {
					case "scalar":
						e.matchByTagPrefix ? i.scalar.push(e) : r.scalar[e.tagName] = e;
						break;
					case "sequence":
						e.matchByTagPrefix ? i.sequence.push(e) : r.sequence[e.tagName] = e;
						break;
					case "mapping": e.matchByTagPrefix ? i.mapping.push(e) : r.mapping[e.tagName] = e;
				}
			}
			let a = n.filter((e) => e.implicitFirstChars === null), o = /* @__PURE__ */ new Set();
			for (let e of n) if (e.implicitFirstChars !== null) for (let t of e.implicitFirstChars) o.add(t);
			let s = /* @__PURE__ */ new Map();
			for (let e of o) s.set(e, n.filter((t) => t.implicitFirstChars === null || t.implicitFirstChars.indexOf(e) !== -1));
			let c = r.scalar["tag:yaml.org,2002:str"];
			if (!c) throw Error("schema does not define the default scalar tag (tag:yaml.org,2002:str)");
			this.tags = t, this.implicitScalarTags = n, this.implicitScalarByFirstChar = s, this.implicitScalarAnyFirstChar = a, this.defaultScalarTag = c, this.defaultSequenceTag = r.sequence["tag:yaml.org,2002:seq"], this.defaultMappingTag = r.mapping["tag:yaml.org,2002:map"], this.exact = r, this.prefix = i;
		}
		withTags(...t) {
			let n = [];
			for (let e of t) n = n.concat(e);
			return new e([...this.tags, ...n]);
		}
	}, De = new Ee([
		o,
		he,
		ve
	]), Oe = new Ee([
		...De.tags,
		l,
		_,
		A,
		R
	]), ke = new Ee([
		...De.tags,
		c,
		m,
		T,
		re
	]), Ae = new Ee([
		...De.tags,
		d,
		b,
		te,
		V,
		me,
		ce,
		W,
		K,
		_e,
		ye
	]), je = a("tag:yaml.org,2002:map", {
		create: () => /* @__PURE__ */ new Map(),
		addPair: (e, t, n) => (e.set(t, n), ""),
		has: (e, t) => e.has(t),
		keys: (e) => e.keys(),
		get: (e, t) => e.get(t),
		identify: (e) => e instanceof Map || ge(e),
		represent: (e) => {
			if (e instanceof Map) return e;
			let t = /* @__PURE__ */ new Map(), n = e;
			for (let e of Object.keys(n)) t.set(e, n[e]);
			return t;
		}
	});
	function Me(e) {
		if (Array.isArray(e)) {
			let t = Array.prototype.slice.call(e);
			for (let e = 0; e < t.length; e++) {
				if (Array.isArray(t[e])) return null;
				typeof t[e] == "object" && Object.prototype.toString.call(t[e]) === "[object Object]" && (t[e] = "[object Object]");
			}
			return String(t);
		}
		return typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" ? "[object Object]" : String(e);
	}
	var Ne = a("tag:yaml.org,2002:map", {
		create: () => ({}),
		identify: ge,
		represent: (e) => {
			let t = /* @__PURE__ */ new Map();
			for (let n of Object.keys(e)) t.set(n, e[n]);
			return t;
		},
		addPair: (e, t, n) => {
			let r = Me(t);
			return r === null ? "nested arrays are not supported inside keys" : (r === "__proto__" ? Object.defineProperty(e, r, {
				value: n,
				enumerable: !0,
				configurable: !0,
				writable: !0
			}) : e[r] = n, "");
		},
		has: (e, t) => {
			let n = Me(t);
			return n !== null && Object.prototype.hasOwnProperty.call(e, n);
		},
		keys: (e) => Object.keys(e),
		get: (e, t) => {
			let n = String(t);
			return Object.prototype.hasOwnProperty.call(e, n) ? e[n] : null;
		}
	});
	function Pe(e, t) {
		var n = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var r = Object.getOwnPropertySymbols(e);
			t && (r = r.filter(function(t) {
				return Object.getOwnPropertyDescriptor(e, t).enumerable;
			})), n.push.apply(n, r);
		}
		return n;
	}
	function J(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t] == null ? {} : arguments[t];
			t % 2 ? Pe(Object(n), !0).forEach(function(t) {
				q(e, t, n[t]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Pe(Object(n)).forEach(function(t) {
				Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
			});
		}
		return e;
	}
	var Fe = {
		maxLength: 79,
		indent: 1,
		linesBefore: 3,
		linesAfter: 2
	};
	function Ie(e, t, n, r, i) {
		let a = "", o = "", s = Math.floor(i / 2) - 1;
		return r - t > s && (a = " ... ", t = r - s + a.length), n - r > s && (o = " ...", n = r + s - o.length), {
			str: a + e.slice(t, n).replace(/\t/g, "→") + o,
			pos: r - t + a.length
		};
	}
	function Le(e, t) {
		return " ".repeat(Math.max(t - e.length, 0)) + e;
	}
	function Re(e, t) {
		if (!e.buffer) return null;
		let n = J(J({}, Fe), t), r = /\r?\n|\r|\0/g, i = [0], a = [], o, s = -1;
		for (; o = r.exec(e.buffer);) a.push(o.index), i.push(o.index + o[0].length), e.position <= o.index && s < 0 && (s = i.length - 2);
		s < 0 && (s = i.length - 1);
		let c = "", l = Math.min(e.line + n.linesAfter, a.length).toString().length, u = n.maxLength - (n.indent + l + 3);
		for (let t = 1; t <= n.linesBefore && !(s - t < 0); t++) {
			let r = Ie(e.buffer, i[s - t], a[s - t], e.position - (i[s] - i[s - t]), u);
			c = `${" ".repeat(n.indent)}${Le((e.line - t + 1).toString(), l)} | ${r.str}\n${c}`;
		}
		let d = Ie(e.buffer, i[s], a[s], e.position, u);
		c += `${" ".repeat(n.indent)}${Le((e.line + 1).toString(), l)} | ${d.str}\n`, c += `${"-".repeat(n.indent + l + 3 + d.pos)}^\n`;
		for (let t = 1; t <= n.linesAfter && !(s + t >= a.length); t++) {
			let r = Ie(e.buffer, i[s + t], a[s + t], e.position - (i[s] - i[s + t]), u);
			c += `${" ".repeat(n.indent)}${Le((e.line + t + 1).toString(), l)} | ${r.str}\n`;
		}
		return c.replace(/\n$/, "");
	}
	function ze(e, t) {
		let n = "";
		return e.mark ? (e.mark.name && (n += `in "${e.mark.name}" `), n += `(${e.mark.line + 1}:${e.mark.column + 1})`, !t && e.mark.snippet && (n += `\n\n${e.mark.snippet}`), `${e.reason} ${n}`) : e.reason;
	}
	var Be = class extends Error {
		constructor(e, t) {
			super(), q(this, "reason", void 0), q(this, "mark", void 0), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = ze(this, !1), Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
		}
		toString(e) {
			return `${this.name}: ${ze(this, e)}`;
		}
	};
	function Ve(e, t, n, r = "") {
		let i = 0, a = 0;
		for (let n = 0; n < t; n++) {
			let t = e.charCodeAt(n);
			t === 10 ? (i++, a = n + 1) : t === 13 && (i++, e.charCodeAt(n + 1) === 10 && n++, a = n + 1);
		}
		let o = {
			name: r,
			buffer: e,
			position: t,
			line: i,
			column: t - a
		};
		throw o.snippet = Re(o), new Be(n, o);
	}
	var He = 1, Ue = 2, We = 3, Y = 4, Ge = 5, Ke = 6, qe = 1, Je = 2, Ye = 3, Xe = 4, Ze = 5, Qe = 1, $e = 2, et = 1, tt = 2, nt = 3, rt = -1;
	function it(e) {
		switch (e) {
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
	var at = Array(256), ot = Array(256);
	for (let e = 0; e < 256; e++) at[e] = +!!it(e), ot[e] = it(e);
	function st(e) {
		return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode((e - 65536 >> 10) + 55296, (e - 65536 & 1023) + 56320);
	}
	function ct(e) {
		return e >= 48 && e <= 57 ? e - 48 : (e | 32) - 97 + 10;
	}
	function lt(e) {
		return e === 120 ? 2 : e === 117 ? 4 : 8;
	}
	function ut(e, t, n) {
		let r = 0;
		for (; t < n;) {
			let n = e.charCodeAt(t);
			if (n === 10) r++, t++;
			else if (n === 13) r++, t++, e.charCodeAt(t) === 10 && t++;
			else if (n === 32 || n === 9) t++;
			else break;
		}
		return {
			position: t,
			breaks: r
		};
	}
	function dt(e) {
		return e === 1 ? " " : "\n".repeat(e - 1);
	}
	function ft(e, t, n) {
		let r = "", i = t, a = t, o = t;
		for (; i < n;) {
			let t = e.charCodeAt(i);
			if (t === 10 || t === 13) {
				r += e.slice(a, o);
				let t = ut(e, i, n);
				r += dt(t.breaks), i = a = o = t.position;
			} else i++, t !== 32 && t !== 9 && (o = i);
		}
		return r + e.slice(a, o);
	}
	function pt(e, t, n) {
		let r = "", i = t, a = t, o = t;
		for (; i < n;) {
			let t = e.charCodeAt(i);
			if (t === 39) r += e.slice(a, i) + "'", i += 2, a = o = i;
			else if (t === 10 || t === 13) {
				r += e.slice(a, o);
				let t = ut(e, i, n);
				r += dt(t.breaks), i = a = o = t.position;
			} else i++, t !== 32 && t !== 9 && (o = i);
		}
		return r + e.slice(a, n);
	}
	function mt(e, t, n) {
		let r = "", i = t, a = t, o = t;
		for (; i < n;) {
			let t = e.charCodeAt(i);
			if (t === 92) {
				r += e.slice(a, i), i++;
				let t = e.charCodeAt(i);
				if (t === 10 || t === 13) i = ut(e, i, n).position;
				else if (t < 256 && at[t]) r += ot[t], i++;
				else {
					let n = lt(t), a = 0;
					for (; n > 0; n--) {
						i++;
						let t = ct(e.charCodeAt(i));
						a = (a << 4) + t;
					}
					r += st(a), i++;
				}
				a = o = i;
			} else if (t === 10 || t === 13) {
				r += e.slice(a, o);
				let t = ut(e, i, n);
				r += dt(t.breaks), i = a = o = t.position;
			} else i++, t !== 32 && t !== 9 && (o = i);
		}
		return r + e.slice(a, n);
	}
	function ht(e, t, n, r, i, a) {
		let o = r < 0 ? 0 : r, s = e.slice(t, n).replace(/\r\n?/g, "\n"), c = s === "" ? [] : (s.endsWith("\n") ? s.slice(0, -1) : s).split("\n"), l = "", u = !1, d = 0, f = !1;
		for (let e of c) {
			let t = 0;
			for (; t < o && e.charCodeAt(t) === 32;) t++;
			if (r < 0 || t >= e.length) {
				d++;
				continue;
			}
			let n = e.slice(o), i = n.charCodeAt(0);
			a ? i === 32 || i === 9 ? (f = !0, l += "\n".repeat(u ? 1 + d : d)) : f ? (f = !1, l += "\n".repeat(d + 1)) : d === 0 ? u && (l += " ") : l += "\n".repeat(d) : l += "\n".repeat(u ? 1 + d : d), l += n, u = !0, d = 0;
		}
		return i === 3 ? l += "\n".repeat(u ? 1 + d : d) : i !== 2 && u && (l += "\n"), l;
	}
	function gt(e, t) {
		if (t.valueStart === rt) return "";
		let { valueStart: n, valueEnd: r } = t;
		if (t.fast) return e.slice(n, r);
		switch (t.style) {
			case 2: return pt(e, n, r);
			case 3: return mt(e, n, r);
			case 4: return ht(e, n, r, t.indent, t.chomping, !1);
			case 5: return ht(e, n, r, t.indent, t.chomping, !0);
			default: return ft(e, n, r);
		}
	}
	var _t = Object.assign(Object.create(null), {
		"!": "!",
		"!!": "tag:yaml.org,2002:"
	});
	function vt(e) {
		return encodeURI(e).replace(/!/g, "%21");
	}
	function yt(e, t) {
		if (e.startsWith("!<") && e.endsWith(">")) return decodeURIComponent(e.slice(2, -1));
		let n = e.indexOf("!", 1), r = n === -1 ? "!" : e.slice(0, n + 1), i = t?.[r] ?? _t[r] ?? r;
		return decodeURIComponent(i) + decodeURIComponent(e.slice(r.length));
	}
	function bt(e) {
		let t = e;
		return t.charCodeAt(0) === 33 ? (t = t.slice(1), `!${vt(t)}`) : t.slice(0, 18) === "tag:yaml.org,2002:" ? `!!${vt(t.slice(18))}` : `!<${vt(t)}>`;
	}
	var xt = -1, St = {
		filename: "",
		schema: ke,
		json: !1,
		maxTotalMergeKeys: 1e4,
		maxAliases: -1
	};
	function Ct(e) {
		return "tagStart" in e && e.tagStart !== xt ? e.tagStart : "anchorStart" in e && e.anchorStart !== xt ? e.anchorStart : "valueStart" in e && e.valueStart !== xt ? e.valueStart : "start" in e ? e.start : 0;
	}
	function wt(e, t) {
		Ve(e.source, e.position, t, e.filename);
	}
	function X(e, t, n, r) {
		try {
			return n.finalize(r);
		} catch (n) {
			if (n instanceof Be) throw n;
			Ve(e.source, t, n instanceof Error ? n.message : String(n), e.filename);
		}
	}
	function Tt(e, t, n) {
		let r = e[n];
		if (r) return r;
		for (let e of t) if (n.startsWith(e.tagName)) return e;
	}
	function Et(e, t, n, r, i) {
		let a = Tt(t, n, r);
		if (a) return a;
		wt(e, `unknown ${i} tag !<${r}>`);
	}
	function Dt(e, n) {
		let r = gt(e.source, n), i = n.tagStart === xt ? "" : e.source.slice(n.tagStart, n.tagEnd), a = e.schema.defaultScalarTag;
		if (i !== "") {
			if (i === "!") return {
				value: r,
				tag: a
			};
			let n = yt(i, e.tagHandlers), o = Tt(e.schema.exact.scalar, e.schema.prefix.scalar, n);
			if (o) {
				let i = o.resolve(r, !0, n);
				return i === t && wt(e, `cannot resolve a node with !<${n}> explicit tag`), {
					value: i,
					tag: o
				};
			}
			let s = Tt(e.schema.exact.mapping, e.schema.prefix.mapping, n) ?? Tt(e.schema.exact.sequence, e.schema.prefix.sequence, n);
			if (s) {
				r !== "" && wt(e, `cannot resolve a node with !<${n}> explicit tag`);
				let t = s.create(n);
				return {
					value: s.carrierIsResult ? t : X(e, e.position, s, t),
					tag: s
				};
			}
			wt(e, `unknown scalar tag !<${n}>`);
		}
		if (n.style === 1) {
			let n = e.schema.implicitScalarByFirstChar.get(r.charAt(0)) ?? e.schema.implicitScalarAnyFirstChar;
			for (let e of n) {
				let n = e.resolve(r, !1, e.tagName);
				if (n !== t) return {
					value: n,
					tag: e
				};
			}
		}
		return {
			value: a.resolve(r, !1, a.tagName),
			tag: a
		};
	}
	function Ot(e, t, n, r, i, a) {
		let o = t.tagStart === xt ? "" : e.source.slice(t.tagStart, t.tagEnd), s = o === "" || o === "!" ? i : yt(o, e.tagHandlers);
		return {
			tagName: s,
			tag: Et(e, n, r, s, a)
		};
	}
	function kt(e) {
		return e.nodeKind === "mapping";
	}
	function At(e, t, n, r) {
		for (let i of r.keys(n)) {
			if (e.maxTotalMergeKeys !== -1 && ++e.totalMergeKeys > e.maxTotalMergeKeys && wt(e, `merge keys exceeded maxTotalMergeKeys (${e.maxTotalMergeKeys})`), t.tag.has(t.value, i)) continue;
			let a = t.tag.addPair(t.value, i, r.get(n, i));
			a && wt(e, a), (t.overridable ??= /* @__PURE__ */ new Set()).add(i);
		}
	}
	function jt(e, t, n, r) {
		if (e.position = t.keyPosition, kt(r)) At(e, t, n, r);
		else if (r.nodeKind === "sequence" && Array.isArray(n)) for (let r of n) At(e, t, r, t.tag);
		else wt(e, "cannot merge mappings; the provided source object is unacceptable");
	}
	function Z(e, t, r, i, a) {
		var o;
		if (e.position = t.keyPosition, r === n) {
			jt(e, t, i, a);
			return;
		}
		!e.json && t.tag.has(t.value, r) && !t.overridable?.has(r) && wt(e, "duplicated mapping key");
		let s = t.tag.addPair(t.value, r, i);
		s && wt(e, s), (o = t.overridable) == null || o.delete(r);
	}
	function Mt(e, t, n) {
		let r = e.frames[e.frames.length - 1];
		if (r.kind === "document") r.value = t, r.hasValue = !0;
		else if (r.kind === "sequence") {
			r.merge && (kt(n) || wt(e, "cannot merge mappings; the provided source object is unacceptable"));
			let i = r.tag.addItem(r.value, t, r.index++);
			i && wt(e, i);
		} else if (r.hasKey) {
			let i = r.key;
			r.key = void 0, r.hasKey = !1, Z(e, r, i, t, n);
		} else r.key = t, r.keyPosition = e.position, r.hasKey = !0;
	}
	function Nt(e, t, n, r, i) {
		if (t.anchorStart !== xt) {
			let a = {
				value: n,
				tag: r,
				isValueFinal: i
			};
			return e.anchors.set(e.source.slice(t.anchorStart, t.anchorEnd), a), a;
		}
		return null;
	}
	function Pt(e, t) {
		let r = J(J(J({}, St), t), {}, {
			events: e,
			documents: [],
			eventIndex: 0,
			position: 0,
			frames: [],
			anchors: /* @__PURE__ */ new Map(),
			tagHandlers: Object.create(null),
			totalMergeKeys: 0,
			aliasCount: 0
		});
		for (; r.eventIndex < r.events.length;) {
			let e = r.events[r.eventIndex++];
			switch (r.position = Ct(e), e.type) {
				case 1:
					r.anchors = /* @__PURE__ */ new Map(), r.aliasCount = 0, r.tagHandlers = Object.create(null);
					for (let t of e.directives) t.kind === "tag" && (r.tagHandlers[t.handle] = t.prefix);
					r.frames.push({
						kind: "document",
						position: r.position,
						value: void 0,
						hasValue: !1
					});
					break;
				case 4: {
					let { value: t, tag: n } = Dt(r, e);
					Nt(r, e, t, n, !0), Mt(r, t, n);
					break;
				}
				case 2: {
					let t = Ot(r, e, r.schema.exact.sequence, r.schema.prefix.sequence, "tag:yaml.org,2002:seq", "sequence"), i = t.tag.create(t.tagName), a = Nt(r, e, i, t.tag, t.tag.carrierIsResult), o = r.frames[r.frames.length - 1], s = o !== void 0 && o.kind === "mapping" && o.hasKey && o.key === n;
					r.frames.push({
						kind: "sequence",
						position: r.position,
						value: i,
						tag: t.tag,
						anchor: a,
						index: 0,
						merge: s
					});
					break;
				}
				case 3: {
					let t = Ot(r, e, r.schema.exact.mapping, r.schema.prefix.mapping, "tag:yaml.org,2002:map", "mapping"), n = t.tag.create(t.tagName), i = Nt(r, e, n, t.tag, t.tag.carrierIsResult);
					r.frames.push({
						kind: "mapping",
						position: r.position,
						value: n,
						tag: t.tag,
						anchor: i,
						key: void 0,
						keyPosition: r.position,
						hasKey: !1,
						overridable: null
					});
					break;
				}
				case 5: {
					r.maxAliases !== -1 && ++r.aliasCount > r.maxAliases && wt(r, `aliases exceeded maxAliases (${r.maxAliases})`);
					let t = r.source.slice(e.anchorStart, e.anchorEnd), n = r.anchors.get(t);
					n || wt(r, `unidentified alias "${t}"`), n.isValueFinal || wt(r, `recursive alias "${t}" is not supported for tag ${n.tag.tagName} because it uses finalize()`), Mt(r, n.value, n.tag);
					break;
				}
				case 6: {
					let e = r.frames.pop();
					if (e.kind === "mapping" && e.hasKey && (r.position = e.keyPosition, wt(r, "incomplete mapping pair in event stream")), e.kind === "document") r.documents.push(e.value);
					else {
						let t = e.tag.carrierIsResult ? e.value : X(r, e.position, e.tag, e.value);
						e.anchor && (e.anchor.value = t, e.anchor.isValueFinal = !0), Mt(r, t, e.tag);
					}
					break;
				}
			}
		}
		return r.documents;
	}
	var Q = -1, Ft = Object.prototype.hasOwnProperty, It = 1, Lt = 2, Rt = 3, zt = 4, Bt = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, Vt = /[,\[\]{}]/, Ht = /^(?:!|!!|![0-9A-Za-z-]+!)$/, Ut = String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$,_.!~*'()\[\]])`, Wt = String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$.~*'()_])`, Gt = RegExp(`^(?:${Ut})*$`), Kt = RegExp(`^(?:${Wt})+$`), qt = RegExp(`^(?:!(?:${Ut})*|${Wt}(?:${Ut})*)$`), Jt = {
		filename: "",
		maxDepth: 100
	};
	function Yt(e, t, n) {
		e.events.push({
			type: 1,
			explicitStart: t,
			explicitEnd: n,
			directives: e.directives
		});
	}
	function Xt(e, t, n, r, i, a, o) {
		e.events.push({
			type: 2,
			start: t,
			anchorStart: n,
			anchorEnd: r,
			tagStart: i,
			tagEnd: a,
			style: o
		});
	}
	function Zt(e, t, n, r, i, a, o) {
		e.events.push({
			type: 3,
			start: t,
			anchorStart: n,
			anchorEnd: r,
			tagStart: i,
			tagEnd: a,
			style: o
		});
	}
	function Qt(e, t) {
		e.events.splice(t.eventsLength, 0, {
			type: 3,
			start: t.position,
			anchorStart: Q,
			anchorEnd: Q,
			tagStart: Q,
			tagEnd: Q,
			style: 2
		});
	}
	function $t(e, t, n, r, i, a, o, s, c = 1, l = -1, u = !1) {
		e.events.push({
			type: 4,
			valueStart: t,
			valueEnd: n,
			anchorStart: r,
			anchorEnd: i,
			tagStart: a,
			tagEnd: o,
			style: s,
			chomping: c,
			indent: l,
			fast: u
		});
	}
	function en(e, t, n) {
		e.events.push({
			type: 5,
			anchorStart: t,
			anchorEnd: n
		});
	}
	function tn(e) {
		e.events.push({ type: 6 });
	}
	function nn(e) {
		$t(e, Q, Q, Q, Q, Q, Q, 1);
	}
	function rn() {
		return {
			anchorStart: Q,
			anchorEnd: Q,
			tagStart: Q,
			tagEnd: Q
		};
	}
	function an(e) {
		return {
			position: e.position,
			line: e.line,
			lineStart: e.lineStart,
			lineIndent: e.lineIndent,
			firstTabInLine: e.firstTabInLine,
			eventsLength: e.events.length
		};
	}
	function on(e, t) {
		e.position = t.position, e.line = t.line, e.lineStart = t.lineStart, e.lineIndent = t.lineIndent, e.firstTabInLine = t.firstTabInLine, e.events.length = t.eventsLength;
	}
	function $(e, t) {
		Ve(e.input.slice(0, e.length), e.position, t, e.filename);
	}
	function sn(e) {
		return e === 10 || e === 13;
	}
	function cn(e) {
		return e === 9 || e === 32;
	}
	function ln(e) {
		return cn(e) || sn(e);
	}
	function un(e) {
		return e === 0 || ln(e);
	}
	function dn(e) {
		return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
	}
	function fn(e) {
		return e >= 48 && e <= 57 ? e - 48 : -1;
	}
	function pn(e) {
		if (e >= 48 && e <= 57) return e - 48;
		let t = e | 32;
		return t >= 97 && t <= 102 ? t - 97 + 10 : -1;
	}
	function mn(e) {
		return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
	}
	function hn(e) {
		return e === 48 || e === 97 || e === 98 || e === 116 || e === 9 || e === 110 || e === 118 || e === 102 || e === 114 || e === 101 || e === 32 || e === 34 || e === 47 || e === 92 || e === 78 || e === 95 || e === 76 || e === 80;
	}
	function gn(e) {
		e.input.charCodeAt(e.position) === 10 ? e.position++ : (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++), e.line++, e.lineStart = e.position, e.lineIndent = 0, e.firstTabInLine = -1;
	}
	function _n(e, t) {
		let n = 0, r = e.input.charCodeAt(e.position), i = e.position === e.lineStart || ln(e.input.charCodeAt(e.position - 1));
		for (; r !== 0;) {
			for (; cn(r);) i = !0, r === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), r = e.input.charCodeAt(++e.position);
			if (t && i && r === 35) do
				r = e.input.charCodeAt(++e.position);
			while (!sn(r) && r !== 0);
			if (!sn(r)) break;
			for (gn(e), n++, i = !0, r = e.input.charCodeAt(e.position); r === 32;) e.lineIndent++, r = e.input.charCodeAt(++e.position);
		}
		return n;
	}
	function vn(e, t = e.position) {
		let n = e.input.charCodeAt(t);
		if ((n === 45 || n === 46) && n === e.input.charCodeAt(t + 1) && n === e.input.charCodeAt(t + 2)) {
			let n = e.input.charCodeAt(t + 3);
			return n === 0 || ln(n);
		}
		return !1;
	}
	function yn(e) {
		let t = e.input.charCodeAt(e.position);
		for (; t !== 0 && !sn(t);) t = e.input.charCodeAt(++e.position);
	}
	function bn(e, t, n) {
		Bt.test(e.input.slice(t, n)) && $(e, "the stream contains non-printable characters");
	}
	function xn(e, t, n) {
		if (e.input.charCodeAt(e.position) !== 33) return !1;
		t.tagStart !== Q && $(e, "duplication of a tag property");
		let r = e.position, i = !1, a = !1, o = "!", s = e.input.charCodeAt(++e.position);
		s === 60 ? (i = !0, s = e.input.charCodeAt(++e.position)) : s === 33 && (a = !0, o = "!!", s = e.input.charCodeAt(++e.position));
		let c = e.position, l;
		if (i) {
			for (; s !== 0 && s !== 62;) s = e.input.charCodeAt(++e.position);
			s !== 62 && $(e, "unexpected end of the stream within a verbatim tag"), l = e.input.slice(c, e.position), e.position++;
		} else {
			for (; s !== 0 && !ln(s) && !(n && dn(s));) s === 33 && (a ? $(e, "tag suffix cannot contain exclamation marks") : (o = e.input.slice(c - 1, e.position + 1), Ht.test(o) || $(e, "named tag handle cannot contain such characters"), a = !0, c = e.position + 1)), s = e.input.charCodeAt(++e.position);
			l = e.input.slice(c, e.position), Vt.test(l) && $(e, "tag suffix cannot contain flow indicator characters");
		}
		return l && !(i ? Gt.test(l) : Kt.test(l)) && $(e, `tag name cannot contain such characters: ${l}`), !i && o !== "!" && o !== "!!" && !Ft.call(e.tagHandlers, o) && $(e, `undeclared tag handle "${o}"`), t.tagStart = r, t.tagEnd = e.position, !0;
	}
	function Sn(e, t) {
		if (e.input.charCodeAt(e.position) !== 38) return !1;
		t.anchorStart !== Q && $(e, "duplication of an anchor property"), e.position++;
		let n = e.position;
		for (; e.input.charCodeAt(e.position) !== 0 && !ln(e.input.charCodeAt(e.position)) && !dn(e.input.charCodeAt(e.position));) e.position++;
		return e.position === n && $(e, "name of an anchor node must contain at least one character"), t.anchorStart = n, t.anchorEnd = e.position, !0;
	}
	function Cn(e, t) {
		if (e.input.charCodeAt(e.position) !== 42) return !1;
		(t.anchorStart !== Q || t.tagStart !== Q) && $(e, "alias node should not have any properties"), e.position++;
		let n = e.position;
		for (; e.input.charCodeAt(e.position) !== 0 && !ln(e.input.charCodeAt(e.position)) && !dn(e.input.charCodeAt(e.position));) e.position++;
		return e.position === n && $(e, "name of an alias node must contain at least one character"), en(e, n, e.position), !0;
	}
	function wn(e, t) {
		_n(e, !1), e.lineIndent < t && $(e, "deficient indentation");
	}
	function Tn(e, t, n) {
		if (e.input.charCodeAt(e.position) !== 39) return !1;
		e.position++;
		let r = e.position, i = !0;
		for (; e.input.charCodeAt(e.position) !== 0;) {
			let a = e.input.charCodeAt(e.position);
			if (a === 39) {
				if (e.input.charCodeAt(e.position + 1) === 39) {
					i = !1, e.position += 2;
					continue;
				}
				let t = e.position;
				return e.position++, $t(e, r, t, n.anchorStart, n.anchorEnd, n.tagStart, n.tagEnd, 2, 1, -1, i), !0;
			}
			sn(a) ? (i = !1, wn(e, t)) : e.position === e.lineStart && vn(e) ? $(e, "unexpected end of the document within a single quoted scalar") : a !== 9 && a < 32 ? $(e, "expected valid JSON character") : e.position++;
		}
		$(e, "unexpected end of the stream within a single quoted scalar");
	}
	function En(e, t, n) {
		if (e.input.charCodeAt(e.position) !== 34) return !1;
		e.position++;
		let r = e.position, i = !0;
		for (; e.input.charCodeAt(e.position) !== 0;) {
			let a = e.input.charCodeAt(e.position);
			if (a === 34) {
				let t = e.position;
				return e.position++, $t(e, r, t, n.anchorStart, n.anchorEnd, n.tagStart, n.tagEnd, 3, 1, -1, i), !0;
			}
			if (a === 92) {
				i = !1;
				let n = e.input.charCodeAt(++e.position);
				if (sn(n)) wn(e, t);
				else if (hn(n)) e.position++;
				else {
					let t = mn(n);
					for (t === 0 && $(e, "unknown escape sequence"); t-- > 0;) e.position++, pn(e.input.charCodeAt(e.position)) < 0 && $(e, "expected hexadecimal character");
					e.position++;
				}
			} else sn(a) ? (i = !1, wn(e, t)) : e.position === e.lineStart && vn(e) ? $(e, "unexpected end of the document within a double quoted scalar") : a !== 9 && a < 32 ? $(e, "expected valid JSON character") : e.position++;
		}
		$(e, "unexpected end of the stream within a double quoted scalar");
	}
	function Dn(e, t, n) {
		let r = e.input.charCodeAt(e.position), i = 1, a = -1, o = !1;
		if (r !== 124 && r !== 62) return !1;
		let s = r === 124 ? 4 : 5;
		for (e.position++; e.input.charCodeAt(e.position) !== 0;) {
			let n = e.input.charCodeAt(e.position), r = fn(n);
			if (n === 43 || n === 45) i !== 1 && $(e, "repeat of a chomping mode identifier"), i = n === 43 ? 3 : 2, e.position++;
			else if (r >= 0) r === 0 && $(e, "bad explicit indentation width of a block scalar; it cannot be less than one"), o && $(e, "repeat of an indentation width identifier"), a = t + r - 1, o = !0, e.position++;
			else break;
		}
		let c = !1;
		for (; cn(e.input.charCodeAt(e.position));) c = !0, e.position++;
		c && e.input.charCodeAt(e.position) === 35 && yn(e), sn(e.input.charCodeAt(e.position)) ? gn(e) : e.input.charCodeAt(e.position) !== 0 && $(e, "a line break is expected");
		let l = o ? a : -1, u = 0, d = e.position, f = e.position;
		for (; e.input.charCodeAt(e.position) !== 0;) {
			let n = e.position, r = 0;
			for (; e.input.charCodeAt(n + r) === 32;) r++;
			let i = e.input.charCodeAt(n + r);
			if (i === 0) {
				l >= 0 ? r > l && (f = n + r) : r > 0 && (f = n + r);
				break;
			}
			if (n === e.lineStart && vn(e, n)) break;
			if (!o && l === -1 && sn(i) && (u = Math.max(u, r)), !o && l === -1 && !sn(i) && (i === 9 && r < t && (e.position = n + r, $(e, "tab characters must not be used in indentation")), r < u && (e.position = n + r, $(e, "bad indentation of a mapping entry"))), l === -1 && i !== 0 && !sn(i) && r < t) {
				e.lineIndent = r, e.position = n + r;
				break;
			}
			!o && i !== 0 && !sn(i) && l === -1 && (l = r);
			let a = l === -1 ? t + 1 : l;
			if (i !== 0 && !sn(i) && r < a) {
				e.lineIndent = r, e.position = n + r;
				break;
			}
			yn(e), f = e.position, sn(e.input.charCodeAt(e.position)) && (gn(e), f = e.position);
		}
		return bn(e, d, f), $t(e, d, f, n.anchorStart, n.anchorEnd, n.tagStart, n.tagEnd, s, i, l), !0;
	}
	function On(e, t) {
		let n = e.input.charCodeAt(e.position), r = t === It;
		if (n === 0 || ln(n) || n === 35 || n === 38 || n === 42 || n === 33 || n === 124 || n === 62 || n === 39 || n === 34 || n === 37 || n === 64 || n === 96 || r && dn(n)) return !1;
		if (n === 63 || n === 45) {
			let t = e.input.charCodeAt(e.position + 1);
			if (un(t) || r && dn(t)) return !1;
		}
		return !0;
	}
	function kn(e, t, n, r) {
		if (!On(e, n)) return !1;
		let i = e.position, a = e.position, o = e.input.charCodeAt(e.position), s = n === It, c = !1;
		for (; o !== 0 && !(e.position === e.lineStart && vn(e));) {
			if (o === 58) {
				let t = e.input.charCodeAt(e.position + 1);
				if (un(t) || s && dn(t)) break;
			} else if (o === 35) {
				if (ln(e.input.charCodeAt(e.position - 1))) break;
			} else if (s && dn(o)) break;
			else if (sn(o)) {
				let n = e.position, r = e.line, i = e.lineStart, a = e.lineIndent;
				if (_n(e, !1), e.lineIndent >= t) {
					c = !0, o = e.input.charCodeAt(e.position);
					continue;
				}
				e.position = n, e.line = r, e.lineStart = i, e.lineIndent = a;
				break;
			}
			cn(o) || (a = e.position + 1), o = e.input.charCodeAt(++e.position);
		}
		return a !== i && (bn(e, i, a), $t(e, i, a, r.anchorStart, r.anchorEnd, r.tagStart, r.tagEnd, 1, 1, -1, !c), !0);
	}
	function An(e, t) {
		let n = e.line;
		_n(e, !0), (e.line > n && e.lineIndent < t || e.firstTabInLine !== -1 && e.lineIndent < t) && $(e, "deficient indentation");
	}
	function jn(e, t, n) {
		let r = e.input.charCodeAt(e.position), i = r === 123, a = e.position, o = !0;
		if (r !== 91 && r !== 123) return !1;
		let s = i ? 125 : 93;
		for (i ? Zt(e, a, n.anchorStart, n.anchorEnd, n.tagStart, n.tagEnd, 2) : Xt(e, a, n.anchorStart, n.anchorEnd, n.tagStart, n.tagEnd, 2), e.position++; e.input.charCodeAt(e.position) !== 0;) {
			An(e, t);
			let n = e.input.charCodeAt(e.position);
			if (n === s) return e.position++, tn(e), !0;
			o ? n === 44 && $(e, "expected the node content, but found ','") : $(e, "missed comma between flow collection entries");
			let r = !1, a = !1;
			n === 63 && ln(e.input.charCodeAt(e.position + 1)) && (r = a = !0, e.position += 1, An(e, t));
			let c = e.line, l = an(e), u = Pn(e, t, It, !1, !0);
			An(e, t), n = e.input.charCodeAt(e.position), (i || a || e.line === c) && n === 58 ? (r = !0, e.position++, An(e, t), i || Qt(e, l), u || nn(e), Pn(e, t, It, !1, !0) || nn(e), An(e, t), i || tn(e)) : i && r ? (u || nn(e), nn(e)) : i ? nn(e) : r && (Qt(e, l), u || nn(e), nn(e), tn(e)), n = e.input.charCodeAt(e.position), n === 44 ? (o = !0, e.position++) : o = !1;
		}
		$(e, "unexpected end of the stream within a flow collection");
	}
	function Mn(e, t, n) {
		if (e.firstTabInLine !== -1 || e.input.charCodeAt(e.position) !== 45 || !un(e.input.charCodeAt(e.position + 1))) return !1;
		for (Xt(e, e.position, n.anchorStart, n.anchorEnd, n.tagStart, n.tagEnd, 1); e.input.charCodeAt(e.position) === 45 && un(e.input.charCodeAt(e.position + 1));) {
			e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, $(e, "tab characters must not be used in indentation"));
			let n = e.line;
			e.position++;
			let r = _n(e, !0) > 0;
			if (e.firstTabInLine !== -1 && e.input.charCodeAt(e.position) === 45 && un(e.input.charCodeAt(e.position + 1)) && $(e, "bad indentation of a sequence entry"), r && e.lineIndent <= t ? nn(e) : Pn(e, t, Rt, !1, !0), _n(e, !0), e.lineIndent < t || e.position >= e.length) break;
			e.lineIndent > t && $(e, "bad indentation of a sequence entry"), e.line === n && e.input.charCodeAt(e.position) === 45 && un(e.input.charCodeAt(e.position + 1)) && $(e, "bad indentation of a sequence entry");
		}
		return tn(e), !0;
	}
	function Nn(e, t, n, r) {
		let i = !1, a = !1, o = !1, s = !1;
		if (e.firstTabInLine !== -1) return !1;
		let c = e.input.charCodeAt(e.position);
		for (; c !== 0;) {
			!i && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, $(e, "tab characters must not be used in indentation"));
			let l = e.input.charCodeAt(e.position + 1), u = e.line;
			if ((c === 63 || c === 58) && un(l)) o ||= (Zt(e, e.position, r.anchorStart, r.anchorEnd, r.tagStart, r.tagEnd, 1), !0), c === 63 ? (i && nn(e), a = !0, i = !0) : i ? i = !1 : (nn(e), a = !0, i = !1), e.position += 1, s = !0;
			else {
				i &&= (nn(e), !1);
				let t = an(e);
				if (!Pn(e, n, Lt, !1, !0)) break;
				if (e.line === u) {
					for (c = e.input.charCodeAt(e.position); cn(c);) c = e.input.charCodeAt(++e.position);
					if (c === 58) {
						if (c = e.input.charCodeAt(++e.position), un(c) || $(e, "a whitespace character is expected after the key-value separator within a block mapping"), !o) {
							for (on(e, t), Zt(e, t.position, r.anchorStart, r.anchorEnd, r.tagStart, r.tagEnd, 1), o = !0, Pn(e, n, Lt, !1, !0), c = e.input.charCodeAt(e.position); cn(c);) c = e.input.charCodeAt(++e.position);
							e.position++;
						}
						a = !0, i = !1, s = !1;
					} else if (a) $(e, "expected ':' after a mapping key");
					else return r.anchorStart !== Q || r.tagStart !== Q ? (on(e, t), !1) : !0;
				} else if (a) $(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
				else return r.anchorStart !== Q || r.tagStart !== Q ? (on(e, t), !1) : !0;
			}
			if (Pn(e, t, zt, !0, s) && (s = !1), i || (s &&= (nn(e), !1)), _n(e, !0), c = e.input.charCodeAt(e.position), (e.line === u || e.lineIndent > t) && c !== 0) $(e, "bad indentation of a mapping entry");
			else if (e.lineIndent < t) break;
		}
		return a ? (i && nn(e), o && tn(e), !0) : !1;
	}
	function Pn(e, t, n, r, i, a = !0) {
		e.depth >= e.maxDepth && $(e, `nesting exceeded maxDepth (${e.maxDepth})`), e.depth++;
		let o = 1, s = !1, c = !1, l = null, u = rn(), d = n === zt || n === Rt, f = d, p = d;
		if (r && _n(e, !0) && (s = !0, o = e.lineIndent > t ? 1 : e.lineIndent === t ? 0 : -1), o === 1) for (;;) {
			let r = e.input.charCodeAt(e.position), i = an(e);
			if (s && o !== 1 && (r === 33 || r === 38)) break;
			if (s && p && (u.tagStart !== Q || u.anchorStart !== Q) && (r === 33 || r === 38)) {
				let n = an(e), r = t + 1;
				if (Nn(e, e.position - e.lineStart, r, u) && e.events[n.eventsLength]?.type === 3) return e.depth--, !0;
				on(e, n);
			}
			if (s && (r === 33 && u.tagStart !== Q || r === 38 && u.anchorStart !== Q) || !xn(e, u, n === It) && !Sn(e, u)) break;
			l === null && (l = i), _n(e, !0) ? (s = !0, f = p, o = e.lineIndent > t ? 1 : e.lineIndent === t ? 0 : -1) : f = !1;
		}
		if (f &&= s || i, o === 1 || n === zt) {
			let r = n === It || n === Lt ? t : t + 1, i = e.position - e.lineStart;
			if (o === 1) {
				if (f && (Mn(e, i, u) || Nn(e, i, r, u)) || jn(e, r, u)) c = !0;
				else {
					let t = e.input.charCodeAt(e.position);
					if (l !== null && a && p && !f && t !== 124 && t !== 62) {
						let t = an(e), n = l.position - l.lineStart;
						on(e, l), Nn(e, n, r, rn()) && e.events[t.eventsLength]?.type === 3 ? c = !0 : on(e, t);
					}
					!c && (d && Dn(e, r, u) || Tn(e, r, u) || En(e, r, u) || Cn(e, u) || kn(e, r, n, u)) && (c = !0);
				}
			} else o === 0 && (c = f && Mn(e, i, u));
		}
		return d &&= !c, !c && (u.anchorStart !== Q || u.tagStart !== Q || d) && ($t(e, Q, Q, u.anchorStart, u.anchorEnd, u.tagStart, u.tagEnd, 1), c = !0), e.depth--, c || u.anchorStart !== Q || u.tagStart !== Q;
	}
	function Fn(e) {
		if (e.lineIndent > 0 || e.input.charCodeAt(e.position) !== 37) return !1;
		e.position++;
		let t = e.position;
		for (; e.input.charCodeAt(e.position) !== 0 && !ln(e.input.charCodeAt(e.position));) e.position++;
		let n = e.input.slice(t, e.position), r = [];
		for (n.length === 0 && $(e, "directive name must not be less than one character in length"); e.input.charCodeAt(e.position) !== 0 && !sn(e.input.charCodeAt(e.position));) {
			for (; cn(e.input.charCodeAt(e.position));) e.position++;
			if (e.input.charCodeAt(e.position) === 35 || sn(e.input.charCodeAt(e.position)) || e.input.charCodeAt(e.position) === 0) break;
			let t = e.position;
			for (; e.input.charCodeAt(e.position) !== 0 && !ln(e.input.charCodeAt(e.position));) e.position++;
			r.push(e.input.slice(t, e.position));
		}
		if (sn(e.input.charCodeAt(e.position)) && gn(e), n === "YAML") {
			e.directives.some((e) => e.kind === "yaml") && $(e, "duplication of %YAML directive"), r.length !== 1 && $(e, "YAML directive accepts exactly one argument");
			let t = /^([0-9]+)\.([0-9]+)$/.exec(r[0]);
			t === null && $(e, "ill-formed argument of the YAML directive"), parseInt(t[1], 10) !== 1 && $(e, "unacceptable YAML version of the document"), e.directives.push({
				kind: "yaml",
				version: r[0]
			});
		} else if (n === "TAG") {
			r.length !== 2 && $(e, "TAG directive accepts exactly two arguments");
			let [t, n] = r;
			Ht.test(t) || $(e, "ill-formed tag handle (first argument) of the TAG directive"), Ft.call(e.tagHandlers, t) && $(e, `there is a previously declared suffix for "${t}" tag handle`), qt.test(n) || $(e, "ill-formed tag prefix (second argument) of the TAG directive"), e.tagHandlers[t] = n, e.directives.push({
				kind: "tag",
				handle: t,
				prefix: n
			});
		}
		return !0;
	}
	function In(e) {
		e.directives = [], e.tagHandlers = Object.create(null);
		let t = !1;
		for (_n(e, !0); Fn(e);) t = !0, _n(e, !0);
		let n = !1, r = !1, i = !0;
		if (e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 && un(e.input.charCodeAt(e.position + 3))) {
			n = !0;
			let t = e.line;
			e.position += 3, _n(e, !0), i = e.line > t;
		} else t && $(e, "directives end mark is expected");
		let a = e.events.length;
		if (!n && e.position === e.lineStart && e.input.charCodeAt(e.position) === 46 && vn(e)) {
			e.position += 3, _n(e, !0);
			return;
		}
		if (Yt(e, n, !1), Pn(e, e.lineIndent - 1, zt, !1, i, i) || nn(e), _n(e, !0), e.position === e.lineStart && vn(e) && (r = e.input.charCodeAt(e.position) === 46, r)) {
			let t = e.line;
			e.position += 3, _n(e, !0), e.line === t && e.position < e.length && $(e, "end of the stream or a document separator is expected");
		}
		let o = e.events[a];
		o?.type === 1 && (o.explicitEnd = r), tn(e), !r && e.position < e.length && !(e.position === e.lineStart && vn(e)) && $(e, "end of the stream or a document separator is expected");
	}
	function Ln(e, t) {
		let n = e.length, r = J(J(J({}, Jt), t), {}, {
			input: `${e}\0`,
			length: n,
			position: 0,
			line: 0,
			lineStart: 0,
			lineIndent: 0,
			firstTabInLine: -1,
			depth: 0,
			directives: [],
			tagHandlers: Object.create(null),
			events: []
		}), i = e.indexOf("\0");
		for (i !== -1 && Ve(e, i, "null byte is not allowed in input", r.filename), r.input.charCodeAt(r.position) === 65279 && r.position++; r.position < r.length && (_n(r, !0), !(r.position >= r.length));) {
			let e = r.position;
			In(r), r.position === e && 
			/* c8 ignore next */
			$(r, "can not read a document");
		}
		return r.events;
	}
	var Rn = J(J({}, Jt), St);
	function zn(e, t = {}) {
		let n = J(J({}, Rn), t), r = String(e), i = Object.keys(Jt), a = Object.keys(St);
		return Pt(Ln(r, G(n, i)), J(J({}, G(n, a)), {}, { source: r }));
	}
	function Bn(e, t, n) {
		let r = null;
		typeof t == "function" ? r = t : typeof t == "object" && t && (n = t);
		let i = zn(e, n);
		if (r === null) return i;
		for (let e of i) r(e);
	}
	function Vn(e, t) {
		let n = zn(e, t);
		if (n.length === 0) throw new Be("expected a document, but the input is empty");
		if (n.length === 1) return n[0];
		throw new Be("expected a single document in the stream, but found more");
	}
	var Hn = class {
		constructor() {
			q(this, "tagged", !1), q(this, "flow", !1), q(this, "singleQuoted", !1), q(this, "doubleQuoted", !1), q(this, "literal", !1), q(this, "folded", !1);
		}
	}, Un = Symbol("INVALID");
	function Wn(e) {
		let t = new Set([
			e.defaultScalarTag,
			e.defaultSequenceTag,
			e.defaultMappingTag
		].filter((e) => e !== void 0)), n = e.implicitScalarTags, r = e.tags.filter((e) => !(e.nodeKind === "scalar" && e.implicit) && !t.has(e)), i = e.tags.filter((e) => t.has(e));
		return [
			...n.map((e) => ({
				tag: e,
				implicitTag: !0
			})),
			...r.map((e) => ({
				tag: e,
				implicitTag: !1
			})),
			...i.map((e) => ({
				tag: e,
				implicitTag: !0
			}))
		];
	}
	function Gn(e, t) {
		for (let n = 0, r = e.representTypes.length; n < r; n += 1) {
			let { tag: r, implicitTag: i } = e.representTypes[n];
			if (r.identify && r.identify(t)) {
				let e;
				return e = r.matchByTagPrefix && r.representTagName ? r.representTagName(t) : r.tagName, {
					tag: r,
					tagName: e,
					implicitTag: i
				};
			}
		}
		return null;
	}
	function Kn(e, t) {
		if (!e.noRefs && typeof t == "object" && t) {
			let n = e.refs.get(t);
			if (n) return n.anchor === void 0 && (n.anchor = `ref_${e.refCounter++}`), {
				kind: "alias",
				tag: "",
				style: new Hn(),
				anchor: n.anchor
			};
		}
		let n = Gn(e, t);
		if (!n) {
			if (t === void 0 || e.skipInvalid) return Un;
			throw new Be(`unacceptable kind of an object to dump ${Object.prototype.toString.call(t)}`);
		}
		let { tag: r, tagName: i, implicitTag: a } = n, o = a ? i : bt(i);
		if (r.nodeKind === "scalar") {
			let e = new Hn();
			return e.tagged = !a, {
				kind: "scalar",
				tag: o,
				style: e,
				value: r.represent(t)
			};
		}
		if (r.nodeKind === "sequence") {
			let n = r.represent(t), i = new Hn();
			i.tagged = !a;
			let s = {
				kind: "sequence",
				tag: o,
				style: i,
				items: []
			};
			e.noRefs || e.refs.set(t, s);
			for (let t = 0, r = n.length; t < r; t += 1) {
				let r = Kn(e, n[t]);
				r === Un && n[t] === void 0 && (r = Kn(e, null)), r !== Un && s.items.push(r);
			}
			return s;
		}
		let s = r.represent(t), c = new Hn();
		c.tagged = !a;
		let l = {
			kind: "mapping",
			tag: o,
			style: c,
			items: []
		};
		e.noRefs || e.refs.set(t, l);
		for (let [t, n] of s) {
			let r = Kn(e, t);
			if (r === Un) continue;
			let i = Kn(e, n);
			i !== Un && l.items.push({
				key: r,
				value: i
			});
		}
		return l;
	}
	function qn(e, t, n = {}) {
		let r = Kn({
			representTypes: Wn(t),
			noRefs: n.noRefs ?? !1,
			skipInvalid: n.skipInvalid ?? !1,
			refs: /* @__PURE__ */ new Map(),
			refCounter: 0
		}, e);
		return [{
			contents: r === Un ? null : r,
			directives: []
		}];
	}
	var Jn = Symbol("visit:break"), Yn = Symbol("visit:skip");
	function Xn(e, t, n) {
		let r = t(e, n);
		if (r === Jn) return !0;
		if (r === Yn) return !1;
		let i = n.depth + 1;
		switch (e.kind) {
			case "sequence":
				for (let n of e.items) if (Xn(n, t, {
					depth: i,
					parent: e,
					isKey: !1
				})) return !0;
				break;
			case "mapping": for (let { key: n, value: r } of e.items) if (Xn(n, t, {
				depth: i,
				parent: e,
				isKey: !0
			}) || Xn(r, t, {
				depth: i,
				parent: e,
				isKey: !1
			})) return !0;
		}
		return !1;
	}
	function Zn(e, t) {
		for (let n of e) if (n.contents && Xn(n.contents, t, {
			depth: 0,
			parent: null,
			isKey: !1
		})) return;
	}
	var Qn = 65279, $n = 9, er = 10, tr = 13, nr = 32, rr = 33, ir = 34, ar = 35, or = 37, sr = 38, cr = 39, lr = 42, ur = 44, dr = 45, fr = 58, pr = 61, mr = 62, hr = 63, gr = 64, _r = 91, vr = 93, yr = 96, br = 123, xr = 124, Sr = 125, Cr = {};
	Cr[0] = "\\0", Cr[7] = "\\a", Cr[8] = "\\b", Cr[9] = "\\t", Cr[10] = "\\n", Cr[11] = "\\v", Cr[12] = "\\f", Cr[13] = "\\r", Cr[27] = "\\e", Cr[34] = "\\\"", Cr[92] = "\\\\", Cr[133] = "\\N", Cr[160] = "\\_", Cr[8232] = "\\L", Cr[8233] = "\\P";
	var wr = {
		indent: 2,
		seqNoIndent: !1,
		seqInlineFirst: !0,
		sortKeys: !1,
		lineWidth: 80,
		flowBracketPadding: !1,
		flowSkipCommaSpace: !1,
		flowSkipColonSpace: !1,
		quoteFlowKeys: !1,
		quoteStyle: "single",
		forceQuotes: !1,
		tagBeforeAnchor: !1
	};
	function Tr(e) {
		return e.style.tagged ? e.tag : bt(e.tag);
	}
	function Er(e) {
		let t = J(J({}, wr), e);
		return J(J({}, t), {}, {
			defaultScalarTagName: t.schema.defaultScalarTag.tagName,
			implicitResolvers: t.schema.implicitScalarTags
		});
	}
	function Dr(e) {
		let t = e.toString(16).toUpperCase(), n = e <= 255 ? "x" : "u", r = e <= 255 ? 2 : 4;
		return `\\${n}${"0".repeat(r - t.length)}${t}`;
	}
	function Or(e, t) {
		let n = " ".repeat(t), r = 0, i = "", a = e.length;
		for (; r < a;) {
			let t, o = e.indexOf("\n", r);
			o === -1 ? (t = e.slice(r), r = a) : (t = e.slice(r, o + 1), r = o + 1), t.length && t !== "\n" && (i += n), i += t;
		}
		return i;
	}
	function kr(e, t) {
		return `\n${" ".repeat(e.indent * t)}`;
	}
	function Ar(e, t) {
		let n = e.indent * Math.max(1, t);
		return {
			indent: n,
			blockIndent: t === 0 ? e.indent + 1 : e.indent,
			lineWidth: e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - n)
		};
	}
	function jr(e, n) {
		for (let r = 0, i = e.implicitResolvers.length; r < i; r += 1) {
			let i = e.implicitResolvers[r];
			if (i.resolve(n, !1, i.tagName) !== t) return i.tagName;
		}
		return e.defaultScalarTagName;
	}
	function Mr(e) {
		return e === nr || e === $n;
	}
	function Nr(e) {
		let t = e.charCodeAt(0);
		if (t !== dr && t !== 46 || e.charCodeAt(1) !== t || e.charCodeAt(2) !== t) return !1;
		if (e.length === 3) return !0;
		let n = e.charCodeAt(3);
		return Mr(n) || n === tr || n === er;
	}
	function Pr(e) {
		return e >= 32 && e <= 126 || e >= 161 && e <= 55295 && e !== 8232 && e !== 8233 || e >= 57344 && e <= 65533 && e !== Qn || e >= 65536 && e <= 1114111;
	}
	function Fr(e) {
		return Pr(e) && e !== Qn && e !== tr && e !== er;
	}
	function Ir(e, t, n) {
		let r = Fr(e), i = r && !Mr(e);
		return (n ? r : r && e !== ur && e !== _r && e !== vr && e !== br && e !== Sr) && e !== ar && !(t === fr && !i) || Fr(t) && !Mr(t) && e === ar || t === fr && i && (n || e !== ur && e !== _r && e !== vr && e !== br && e !== Sr);
	}
	function Lr(e) {
		return Pr(e) && e !== Qn && !Mr(e) && e !== dr && e !== hr && e !== fr && e !== ur && e !== _r && e !== vr && e !== br && e !== Sr && e !== ar && e !== sr && e !== lr && e !== rr && e !== xr && e !== pr && e !== mr && e !== cr && e !== ir && e !== or && e !== gr && e !== yr;
	}
	function Rr(e, t) {
		let n = Br(e, 0);
		if (Lr(n)) return !0;
		if (e.length > 1 && (n === dr || n === hr || n === fr)) {
			let r = Br(e, 1);
			return !Mr(r) && Ir(r, n, t);
		}
		return !1;
	}
	function zr(e) {
		return !Mr(e) && e !== fr;
	}
	function Br(e, t) {
		let n = e.charCodeAt(t), r;
		return n >= 55296 && n <= 56319 && t + 1 < e.length && (r = e.charCodeAt(t + 1), r >= 56320 && r <= 57343) ? (n - 55296) * 1024 + r - 56320 + 65536 : n;
	}
	function Vr(e) {
		return /^\n* /.test(e);
	}
	var Hr = 1, Ur = 2, Wr = 3, Gr = 4, Kr = 5;
	function qr(e, t, n, r, i, a) {
		let { blockIndent: o, lineWidth: s } = n, c, l = 0, u = -1, d = !1, f = !1, p = s !== -1, m = -1, h = !Nr(t) && Rr(t, a) && zr(Br(t, t.length - 1));
		if (r || i) for (c = 0; c < t.length; l >= 65536 ? c += 2 : c++) {
			if (l = Br(t, c), !Pr(l)) return Kr;
			h &&= Ir(l, u, a), u = l;
		}
		else {
			for (c = 0; c < t.length; l >= 65536 ? c += 2 : c++) {
				if (l = Br(t, c), l === er) d = !0, p && (f ||= c - m - 1 > s && !$r(t[m + 1]), m = c);
				else if (!Pr(l)) return Kr;
				h &&= Ir(l, u, a), u = l;
			}
			f ||= p && c - m - 1 > s && !$r(t[m + 1]);
		}
		return !d && !f ? h && !i ? Hr : e.quoteStyle === "double" ? Kr : Ur : o > 9 && Vr(t) ? Kr : f ? Gr : Wr;
	}
	function Jr(e, t, n) {
		let { indent: r, blockIndent: i, lineWidth: a } = n;
		switch (t) {
			case Hr: return Zr(e, r);
			case Ur: return `'${Zr(e, r).replace(/'/g, "''")}'`;
			case Wr: return "|" + Xr(e, i) + Qr(Or(e, r));
			case Gr: return ">" + Xr(e, i) + Qr(Or(ei(e, a), r));
			case Kr: return `"${ni(e)}"`;
		}
	}
	function Yr(e, t, n, r, i) {
		let a = r || !i;
		if (t.style.singleQuoted) return Ur;
		if (t.style.doubleQuoted) return Kr;
		if (!a) {
			if (t.style.literal) return Wr;
			if (t.style.folded) return Gr;
		}
		let o = t.value;
		if (o.length === 0) return t.style.tagged || jr(e, o) === t.tag ? Hr : e.quoteStyle === "double" ? Kr : Ur;
		let s = qr(e, o, n, a, e.forceQuotes && !r, i);
		return s === Hr && !t.style.tagged && jr(e, o) !== t.tag ? e.quoteStyle === "double" ? Kr : Ur : s;
	}
	function Xr(e, t) {
		let n = Vr(e) ? String(t) : "", r = e[e.length - 1] === "\n";
		return `${n}${r && (e[e.length - 2] === "\n" || e === "\n") ? "+" : r ? "" : "-"}\n`;
	}
	function Zr(e, t) {
		let n = e.indexOf("\n");
		if (n === -1) return e;
		let r = " ".repeat(t), i = e.slice(0, n), a = /(\n+)([^\n]*)/g;
		a.lastIndex = n;
		let o;
		for (; o = a.exec(e);) {
			let e = o[1].length, t = o[2];
			i += "\n".repeat(e + 1) + r + t;
		}
		return i;
	}
	function Qr(e) {
		return e[e.length - 1] === "\n" ? e.slice(0, -1) : e;
	}
	function $r(e) {
		return e === " " || e === "	";
	}
	function ei(e, t) {
		let n = /(\n+)([^\n]*)/g, r = e.indexOf("\n");
		r === -1 && (r = e.length), n.lastIndex = r;
		let i = ti(e.slice(0, r), t), a = e[0] === "\n" || $r(e[0]), o, s;
		for (; s = n.exec(e);) {
			let e = s[1], n = s[2];
			o = n !== "" && $r(n[0]), i += e + (!a && !o && n !== "" ? "\n" : "") + ti(n, t), a = o;
		}
		return i;
	}
	function ti(e, t) {
		if (e === "" || $r(e[0])) return e;
		let n = / [^ \t]/g, r, i = 0, a, o = 0, s = 0, c = "";
		for (; r = n.exec(e);) s = r.index, s - i > t && (a = o > i ? o : s, c += `\n${e.slice(i, a)}`, i = a + 1), o = s;
		return c += "\n", e.length - i > t && o > i ? c += `${e.slice(i, o)}\n${e.slice(o + 1)}` : c += e.slice(i), c.slice(1);
	}
	function ni(e) {
		let t = "", n = 0;
		for (let r = 0; r < e.length; n >= 65536 ? r += 2 : r++) {
			n = Br(e, r);
			let i = Cr[n];
			if (i) {
				t += i;
				continue;
			}
			if (Pr(n)) {
				t += e[r], n >= 65536 && (t += e[r + 1]);
				continue;
			}
			t += Dr(n);
		}
		return t;
	}
	function ri(e, t, n) {
		let r = "";
		for (let i = 0, a = n.items.length; i < a; i += 1) {
			let a = ui(e, t, n.items[i], {});
			r !== "" && (r += `,${e.flowSkipCommaSpace ? "" : " "}`), r += a;
		}
		let i = e.flowBracketPadding && r !== "" ? " " : "";
		return `[${i}${r}${i}]`;
	}
	function ii(e, t, n, r) {
		let i = "";
		for (let a = 0, o = n.items.length; a < o; a += 1) {
			let o = ui(e, t + 1, n.items[a], {
				block: !0,
				compact: e.seqInlineFirst,
				isblockseq: !0
			});
			(!r || i !== "") && (i += kr(e, t)), o === "" || er === o.charCodeAt(0) ? i += "-" : i += "- ", i += o;
		}
		return i;
	}
	function ai(e, t, n) {
		let r = "", i = si(e, n.items);
		for (let { key: n, value: a } of i) {
			let i = "";
			r !== "" && (i += `,${e.flowSkipCommaSpace ? "" : " "}`);
			let o = ui(e, t, n, { iskey: !0 }), s = o.length > 1024;
			s ? i += "? " : e.quoteFlowKeys && (i += "\"");
			let c = ui(e, t, a, {}), l = e.flowSkipColonSpace || c === "" ? "" : " ";
			i += `${o}${e.quoteFlowKeys && !s ? "\"" : ""}:${l}${c}`, r += i;
		}
		let a = e.flowBracketPadding && r !== "" ? " " : "";
		return `{${a}${r}${a}}`;
	}
	function oi(e) {
		return e.kind === "scalar" ? e.value : e;
	}
	function si(e, t) {
		if (!e.sortKeys) return t;
		let n = t.slice();
		if (e.sortKeys === !0) n.sort((e, t) => {
			let n = oi(e.key), r = oi(t.key);
			return n < r ? -1 : +(n > r);
		});
		else {
			let t = e.sortKeys;
			n.sort((e, n) => t(oi(e.key), oi(n.key)));
		}
		return n;
	}
	function ci(e, t, n, r) {
		let i = "", a = si(e, n.items);
		for (let n = 0, o = a.length; n < o; n += 1) {
			let o = "";
			(!r || i !== "") && (o += kr(e, t));
			let { key: s, value: c } = a[n], l = (s.kind === "mapping" || s.kind === "sequence") && !s.style.flow && s.items.length !== 0 || s.kind === "scalar" && (s.style.literal || s.style.folded), u = l ? ui(e, t + 1, s, {
				block: !0,
				compact: !0,
				isblockseq: !li(e, s, t + 1)
			}) : ui(e, t + 1, s, {
				block: !0,
				compact: !0,
				iskey: !0
			}), d = s.kind === "scalar" && s.value.indexOf("\n") !== -1, f = l || d || u.length > 1024;
			f && (u && er === u.charCodeAt(0) ? o += "?" : o += "? "), o += u, f && (o += kr(e, t));
			let p = ui(e, t + 1, c, {
				block: !0,
				compact: f,
				isblockseq: f && !li(e, c, t + 1)
			}), m = s.kind === "scalar" && s.value === "" && u !== "" && u.charCodeAt(u.length - 1) !== cr && u.charCodeAt(u.length - 1) !== ir, h = !f && (s.kind === "alias" || m) ? " " : "";
			p === "" || er === p.charCodeAt(0) ? o += `${h}:` : o += `${h}: `, o += p, i += o;
		}
		return i;
	}
	function li(e, t, n) {
		return t.style.tagged || t.anchor !== void 0 || e.indent < 2 && n > 0;
	}
	function ui(e, t, n, r) {
		if (n.kind === "alias") return `*${n.anchor}`;
		let { block: i = !1, iskey: a = !1, isblockseq: o = !1 } = r, s = r.compact ?? !1, c = n.anchor !== void 0;
		li(e, n, t) && (s = !1);
		let l, u = n.style.tagged, d = i && (n.kind === "mapping" || n.kind === "sequence") && !n.style.flow && n.items.length !== 0;
		if (n.kind === "mapping") l = d ? ci(e, t, n, s) : ai(e, t, n);
		else if (n.kind === "sequence") l = d ? e.seqNoIndent && !o && t > 0 ? ii(e, t - 1, n, s) : ii(e, t, n, s) : ri(e, t, n);
		else {
			let r = Ar(e, t), o = Yr(e, n, r, a, i);
			l = Jr(n.value, o, r), u = n.style.tagged || o !== Hr && n.tag !== e.defaultScalarTagName;
		}
		if (d && s && t > 0 && e.indent > 2 && (l = `${" ".repeat(e.indent - 2)}${l}`), u || c) {
			let t = [], r = u ? Tr(n) : null, i = c ? `&${n.anchor}` : null;
			e.tagBeforeAnchor ? (r !== null && t.push(r), i !== null && t.push(i)) : (i !== null && t.push(i), r !== null && t.push(r));
			let a = l === "" || l.charCodeAt(0) === er ? "" : " ";
			l = `${t.join(" ")}${a}${l}`;
		}
		return l;
	}
	function di(e) {
		return (e.kind === "sequence" || e.kind === "mapping") && !e.style.flow && e.items.length !== 0 && !e.style.tagged && e.anchor === void 0;
	}
	function fi(e) {
		let t = e;
		for (; (t.kind === "sequence" || t.kind === "mapping") && !t.style.flow && t.items.length !== 0;) t = t.kind === "sequence" ? t.items[t.items.length - 1] : t.items[t.items.length - 1].value;
		if (t.kind !== "scalar" || !(t.style.literal || t.style.folded)) return !1;
		let { value: n } = t;
		return n.endsWith("\n\n") || n === "\n";
	}
	function pi(e) {
		let t = "";
		for (let n of e.directives) {
			if (n.kind === "yaml") {
				t += `%YAML ${n.version}\n`;
				continue;
			}
			let { handle: e, prefix: r } = n;
			t += `%TAG ${e} ${r}\n`;
		}
		return t;
	}
	function mi(e, t) {
		let n = Er(t), r = "", i = !1;
		for (let t = 0; t < e.length; t += 1) {
			let a = e[t], o = pi(a), s = o !== "", c = a.explicitStart || s || t > 0 && !i;
			if (r += o, a.contents === null) c && (r += "---\n");
			else if (c) {
				let e = ui(n, 0, a.contents, {
					block: !0,
					compact: !0
				}), t = e === "" ? "" : s || di(a.contents) ? "\n" : " ";
				r += `---${t}${e}\n`;
			} else r += ui(n, 0, a.contents, {
				block: !0,
				compact: !0
			}) + "\n";
			i = a.explicitEnd || a.contents !== null && fi(a.contents), i && (r += "...\n");
		}
		return r;
	}
	var hi = Ae.withTags(J(J({}, te), {}, { resolve: (e, n, r) => {
		let i = te.resolve(e, n, r);
		return i === t ? T.resolve(e, n, r) : i;
	} }), J(J({}, V), {}, { resolve: (e, n, r) => {
		let i = V.resolve(e, n, r);
		return i === t ? re.resolve(e, n, r) : i;
	} })), gi = J(J({}, wr), {}, {
		schema: hi,
		skipInvalid: !1,
		noRefs: !1,
		flowLevel: -1,
		transform: () => {}
	});
	function _i(e, t = {}) {
		let n = J(J({}, gi), t), r = qn(e, n.schema, {
			noRefs: n.noRefs,
			skipInvalid: n.skipInvalid
		});
		return n.flowLevel >= 0 && Zn(r, (e, t) => {
			if (!(t.depth < n.flowLevel)) return e.style.flow = !0, Yn;
		}), n.transform(r), mi(r, J(J({}, G(n, Object.keys(wr))), {}, { schema: n.schema }));
	}
	var vi = -1;
	function yi(e) {
		return "tagStart" in e && e.tagStart !== vi ? e.tagStart : "anchorStart" in e && e.anchorStart !== vi ? e.anchorStart : "valueStart" in e && e.valueStart !== vi ? e.valueStart : "start" in e ? e.start : 0;
	}
	function bi(e, t) {
		return t.tagStart === vi ? "" : e.source.slice(t.tagStart, t.tagEnd);
	}
	function xi(e, t) {
		return t.anchorStart === vi ? void 0 : e.source.slice(t.anchorStart, t.anchorEnd);
	}
	function Si(e, n) {
		let { schema: r } = e, i = r.implicitScalarByFirstChar.get(n.charAt(0)) ?? r.implicitScalarAnyFirstChar;
		for (let e of i) if (e.resolve(n, !1, e.tagName) !== t) return e.tagName;
		return r.defaultScalarTag.tagName;
	}
	function Ci(e, t) {
		let n = gt(e.source, t), r = bi(e, t), i = new Hn();
		switch (t.style) {
			case 2:
				i.singleQuoted = !0;
				break;
			case 3:
				i.doubleQuoted = !0;
				break;
			case 4:
				i.literal = !0;
				break;
			case 5: i.folded = !0;
		}
		let a;
		return r === "" ? a = t.style === 1 ? Si(e, n) : e.schema.defaultScalarTag.tagName : (i.tagged = !0, a = r), {
			kind: "scalar",
			tag: a,
			style: i,
			anchor: xi(e, t),
			value: n
		};
	}
	function wi(e, t, n) {
		let r = bi(e, t), i = new Hn();
		t.style === 2 && (i.flow = !0);
		let a;
		return r === "" ? a = n : (a = r, i.tagged = !0), {
			tag: a,
			style: i,
			anchor: xi(e, t)
		};
	}
	function Ti(e, t) {
		let n = e.frames[e.frames.length - 1];
		n.kind === "document" ? n.doc.contents = t : n.kind === "sequence" ? n.node.items.push(t) : n.key ? (n.node.items.push({
			key: n.key,
			value: t
		}), n.key = null) : n.key = t;
	}
	function Ei(e, t) {
		let n = {
			source: t.source,
			schema: t.schema,
			eventIndex: 0,
			position: 0,
			frames: [],
			documents: []
		};
		for (; n.eventIndex < e.length;) {
			let t = e[n.eventIndex++];
			switch (n.position = yi(t), t.type) {
				case 1: {
					let e = {
						contents: null,
						explicitStart: t.explicitStart,
						explicitEnd: t.explicitEnd,
						directives: t.directives
					};
					n.frames.push({
						kind: "document",
						doc: e
					});
					break;
				}
				case 4:
					Ti(n, Ci(n, t));
					break;
				case 2: {
					let { tag: e, style: r, anchor: i } = wi(n, t, "tag:yaml.org,2002:seq"), a = {
						kind: "sequence",
						tag: e,
						style: r,
						anchor: i,
						items: []
					};
					n.frames.push({
						kind: "sequence",
						node: a
					});
					break;
				}
				case 3: {
					let { tag: e, style: r, anchor: i } = wi(n, t, "tag:yaml.org,2002:map"), a = {
						kind: "mapping",
						tag: e,
						style: r,
						anchor: i,
						items: []
					};
					n.frames.push({
						kind: "mapping",
						node: a,
						key: null
					});
					break;
				}
				case 5: {
					let e = n.source.slice(t.anchorStart, t.anchorEnd);
					Ti(n, {
						kind: "alias",
						tag: "",
						style: new Hn(),
						anchor: e
					});
					break;
				}
				case 6: {
					let e = n.frames.pop();
					if (e.kind === "mapping" && e.key) throw Error("incomplete mapping pair in event stream");
					e.kind === "document" ? n.documents.push(e.doc) : Ti(n, e.node);
					break;
				}
			}
		}
		return n.documents;
	}
	e.CHOMPING_CLIP = et, e.CHOMPING_KEEP = nt, e.CHOMPING_STRIP = tt, e.COLLECTION_STYLE_BLOCK = Qe, e.COLLECTION_STYLE_FLOW = $e, e.CORE_SCHEMA = ke, e.EVENT_ALIAS = Ge, e.EVENT_DOCUMENT = He, e.EVENT_MAPPING = We, e.EVENT_POP = Ke, e.EVENT_SCALAR = Y, e.EVENT_SEQUENCE = Ue, e.FAILSAFE_SCHEMA = De, e.JSON_SCHEMA = Oe, e.MERGE_KEY = n, e.NOT_RESOLVED = t, e.SCALAR_STYLE_DOUBLE_QUOTED = Ye, e.SCALAR_STYLE_FOLDED_BLOCK = Ze, e.SCALAR_STYLE_LITERAL_BLOCK = Xe, e.SCALAR_STYLE_PLAIN = qe, e.SCALAR_STYLE_SINGLE_QUOTED = Je, e.Schema = Ee, e.Style = Hn, e.VISIT_BREAK = Jn, e.VISIT_SKIP = Yn, e.YAML11_SCHEMA = Ae, e.YAMLException = Be, e.binaryTag = W, e.boolCoreTag = m, e.boolJsonTag = _, e.boolYaml11Tag = b, e.constructFromEvents = Pt, e.defineMappingTag = a, e.defineScalarTag = r, e.defineSequenceTag = i, e.dump = _i, e.eventsToAst = Ei, e.floatCoreTag = re, e.floatJsonTag = R, e.floatYaml11Tag = V, e.getScalarValue = gt, e.intCoreTag = T, e.intJsonTag = A, e.intYaml11Tag = te, e.jsToAst = qn, e.legacyMapTag = Ne, e.load = Vn, e.loadAll = Bn, e.mapTag = ve, e.mergeTag = ce, e.nullCoreTag = c, e.nullJsonTag = l, e.nullYaml11Tag = d, e.omapTag = K, e.pairsTag = _e, e.parseEvents = Ln, e.present = mi, e.realMapTag = je, e.seqTag = he, e.setTag = ye, e.strTag = o, e.timestampTag = me, e.visit = Zn;
})), d = /* @__PURE__ */ c(l()), f = u(), p = "xrefmap.yml", m = `XREF not found in ${p}`, h = class e {
	constructor() {
		console.log("xref constructor");
	}
	static async runXrefPage() {
		let t = "xref not found in url", n = document.location.pathname;
		if (n.includes("xref.html") || n.includes("find.html")) {
			console.log("Detected we're on the find/xref page.");
			var r = new URLSearchParams(window.location.search).get("xref") ?? t;
			let n = document.getElementById("xref-show"), i = document.getElementById("xref-target");
			if (!n) {
				console.error("xref-show not found");
				return;
			}
			if (n.textContent = r, r === t) return;
			let a = await e.getLink(r);
			if (i.href = a, i.textContent = a, a === m) return;
			let o = setTimeout(() => {
				document.location.href = a;
			}, 1e3);
			window.addEventListener("keydown", (e) => {
				if (e.key === "Esc" || e.keyCode === 27 || e.code === "Escape") {
					clearTimeout(o);
					let e = document.getElementById("xref-cancelled");
					if (!e) {
						console.error("xref-cancelled not found");
						return;
					}
					e.style.display = "inline";
				}
			});
		}
	}
	static async getLink(e) {
		let t = (await this.get()).references.find((t) => t.uid === e);
		return t ? "/" + t.href : m;
	}
	static async get() {
		let e = await (await fetch(`/${p}`)).text();
		return f.load(e);
	}
};
//#endregion
//#region templates/shared-global/src/scripts/utils/docready.ts
function g(e) {
	document.readyState === "complete" || document.readyState === "interactive" ? setTimeout(e, 1) : document.addEventListener("DOMContentLoaded", e);
}
//#endregion
//#region node_modules/@fancyapps/ui/dist/utils/isString.js
var _ = (e) => typeof e == "string", v = (e) => e && e !== null && e instanceof Element && "nodeType" in e, y = function(e) {
	if (!(e && e instanceof Element && e.offsetParent)) return !1;
	let t = !1, n = !1;
	if (e.scrollWidth > e.clientWidth) {
		let n = window.getComputedStyle(e).overflowX, r = n.indexOf("hidden") !== -1, i = n.indexOf("clip") !== -1, a = n.indexOf("visible") !== -1;
		t = !r && !i && !a;
	}
	if (e.scrollHeight > e.clientHeight) {
		let t = window.getComputedStyle(e).overflowY, r = t.indexOf("hidden") !== -1, i = t.indexOf("clip") !== -1, a = t.indexOf("visible") !== -1;
		n = !r && !i && !a;
	}
	return t || n;
}, b = function(e, t = void 0) {
	return !e || e === document.body || t && e === t ? null : y(e) ? e : b(e.parentElement, t);
}, x = function(e) {
	var t = new DOMParser().parseFromString(e, "text/html").body;
	if (t.childElementCount > 1) {
		for (var n = document.createElement("div"); t.firstChild;) n.appendChild(t.firstChild);
		return n;
	}
	let r = t.firstChild;
	return !r || r instanceof HTMLElement ? r : ((n = document.createElement("div")).appendChild(r), n);
}, S = function(e = 0, t = 0, n = 0) {
	return Math.max(Math.min(t, n), e);
}, C = (e) => typeof e == "object" && !!e && e.constructor === Object && Object.prototype.toString.call(e) === "[object Object]";
//#endregion
//#region node_modules/@fancyapps/ui/dist/utils/isEqual.js
function w(e) {
	return C(e) || Array.isArray(e);
}
function T(e, t) {
	let n = Object.keys(e), r = Object.keys(t);
	return n.length === r.length && n.every((n) => {
		let r = e[n], i = t[n];
		return typeof r == "function" ? `${r}` == `${i}` : w(r) && w(i) ? T(r, i) : r === i;
	});
}
//#endregion
//#region node_modules/@fancyapps/ui/dist/libs/tween.js
var E = function(e) {
	for (let t of A) t.getState() === D.Running && t.tick(M ? e - M : 0);
	M = e, j = window.requestAnimationFrame(E);
}, D, O, k;
(function(e) {
	e[e.Initializing = 0] = "Initializing", e[e.Running = 1] = "Running", e[e.Paused = 2] = "Paused", e[e.Completed = 3] = "Completed", e[e.Destroyed = 4] = "Destroyed";
})(D ||= {}), function(e) {
	e[e.Spring = 0] = "Spring", e[e.Ease = 1] = "Ease";
}(O ||= {}), function(e) {
	e[e.Loop = 0] = "Loop", e[e.Reverse = 1] = "Reverse";
}(k ||= {});
var A = /* @__PURE__ */ new Set(), j = null, M = 0;
function ee() {
	let e = D.Initializing, t = O.Ease, n = 0, r = 0, i = ee.Easings.Linear, a = 500, o = 0, s = 0, c = 0, l = 0, u = 1 / 0, d = .01, f = .01, p = !1, m = {}, h = null, g = {}, _ = {}, v = {}, y = 0, b = 0, x = k.Loop, C = ee.Easings.Linear, w = /* @__PURE__ */ new Map();
	function M(e, ...t) {
		for (let n of w.get(e) || []) n(...t);
	}
	function te(e) {
		return r = 0, e ? h = setTimeout(() => {
			N();
		}, e) : N(), F;
	}
	function N() {
		e = D.Running, M("start", g, _);
	}
	function P() {
		if (e = D.Completed, v = {}, M("end", g), e === D.Completed) {
			if (n < y) {
				if (n++, x === k.Reverse) {
					let e = Object.assign({}, m);
					m = Object.assign({}, _), _ = e;
				}
				te(b);
			} else n = 0;
		}
		return F;
	}
	let F = {
		getState: function() {
			return e;
		},
		easing: function(e) {
			return i = e, t = O.Ease, v = {}, F;
		},
		duration: function(e) {
			return a = e, F;
		},
		spring: function(e = {}) {
			t = O.Spring;
			let { velocity: n, mass: r, tension: i, friction: a, restDelta: m, restSpeed: h, maxSpeed: g, clamp: _ } = Object.assign(Object.assign({}, {
				velocity: 0,
				mass: 1,
				tension: 170,
				friction: 26,
				restDelta: .1,
				restSpeed: .1,
				maxSpeed: 1 / 0,
				clamp: !0
			}), e);
			return o = n, s = r, c = i, l = a, f = m, d = h, u = g, p = _, v = {}, F;
		},
		isRunning: function() {
			return e === D.Running;
		},
		isSpring: function() {
			return t === O.Spring;
		},
		from: function(e) {
			return g = Object.assign({}, e), F;
		},
		to: function(e) {
			return _ = e, F;
		},
		repeat: function(e, t = 0, n = k.Loop, r) {
			return y = e, b = t, x = n, C = r || i, F;
		},
		on: function(e, t) {
			var n, r;
			return n = e, r = t, w.set(n, [...w.get(n) || [], r]), F;
		},
		off: function(e, t) {
			var n, r;
			return n = e, r = t, w.has(n) && w.set(n, w.get(n).filter((e) => e !== r)), F;
		},
		start: function(t) {
			return T(g, _) || (e = D.Initializing, m = Object.assign({}, g), A.add(this), j ||= window.requestAnimationFrame(E), te(t)), F;
		},
		pause: function() {
			return h &&= (clearTimeout(h), null), e === D.Running && (e = D.Paused, M("pause", g)), F;
		},
		end: P,
		tick: function(n) {
			n > 50 && (n = 50), r += n;
			let h = 0, y = !1;
			if (e !== D.Running) return F;
			if (t === O.Ease) {
				h = S(0, r / a, 1), y = h === 1;
				let e = x === k.Reverse ? C : i;
				for (let t in g) g[t] = m[t] + (_[t] - m[t]) * e(h);
			}
			if (t === O.Spring) {
				let e = .001 * n, t = 0;
				for (let n in g) {
					let r = _[n], i = g[n];
					if (typeof r != "number" || isNaN(r) || typeof i != "number" || isNaN(i)) continue;
					if (Math.abs(r - i) <= f) {
						g[n] = r, v[n] = 0;
						continue;
					}
					v[n] || (typeof o == "object" && typeof o[n] == "number" ? v[n] = o[n] : v[n] = typeof o == "number" ? o : 0);
					let a = v[n];
					a = S(-1 * Math.abs(u), a, Math.abs(u));
					let m = a * s * l;
					a += ((i > r ? -1 : 1) * (Math.abs(r - i) * c) - m) / s * e, i += a * e;
					let h = g[n] > r ? i < r : i > r, y = Math.abs(a) < d && Math.abs(r - i) <= f;
					p && h && (y = !0), y ? (i = r, a = 0) : t++, g[n] = i, v[n] = a;
				}
				y = !t;
			}
			let b = Object.assign({}, _);
			return M("step", g, m, _, h), y && e === D.Running && T(_, b) && (e = D.Completed, P()), F;
		},
		getStartValues: function() {
			return m;
		},
		getCurrentValues: function() {
			return g;
		},
		getCurrentVelocities: function() {
			return v;
		},
		getEndValues: function() {
			return _;
		},
		destroy: function() {
			e = D.Destroyed, h &&= (clearTimeout(h), null), m = g = _ = {}, A.delete(this);
		}
	};
	return F;
}
ee.destroy = () => {
	for (let e of A) e.destroy();
	j &&= (cancelAnimationFrame(j), null);
}, ee.Easings = {
	Linear: function(e) {
		return e;
	},
	EaseIn: function(e) {
		return e === 0 ? 0 : 2 ** (10 * e - 10);
	},
	EaseOut: function(e) {
		return e === 1 ? 1 : 1 - 2 ** (-10 * e);
	},
	EaseInOut: function(e) {
		return e === 0 ? 0 : e === 1 ? 1 : e < .5 ? 2 ** (20 * e - 10) / 2 : (2 - 2 ** (-20 * e + 10)) / 2;
	}
};
//#endregion
//#region node_modules/@fancyapps/ui/dist/libs/gestures.js
function te(e) {
	return typeof TouchEvent < "u" && e instanceof TouchEvent;
}
function N(e, t) {
	let n = [], r = te(e) ? e[t] : e instanceof MouseEvent && (t === "changedTouches" || e.type !== "mouseup") ? [e] : [];
	for (let e of r) n.push({
		x: e.clientX,
		y: e.clientY,
		ts: Date.now()
	});
	return n;
}
function P(e) {
	return N(e, "touches");
}
function F(e) {
	return N(e, "targetTouches");
}
function ne(e) {
	return N(e, "changedTouches");
}
function re(e) {
	let t = e[0], n = e[1] || t;
	return {
		x: (t.x + n.x) / 2,
		y: (t.y + n.y) / 2,
		ts: n.ts
	};
}
function I(e) {
	let t = e[0], n = e[1] || e[0];
	return t && n ? -1 * Math.sqrt((n.x - t.x) * (n.x - t.x) + (n.y - t.y) * (n.y - t.y)) : 0;
}
var ie = (e) => {
	e.cancelable && e.preventDefault();
}, ae = { passive: !1 }, L = {
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
}, R = !1, z = !0, oe = (e, t) => {
	let n, r, i, a, o, s = Object.assign(Object.assign({}, L), t), c = [], l = [], u = [], d = !1, f = !1, p = !1, m = !1, h = 0, g = 0, _ = 0, v = 0, y = 0, b = 0, x = 0, S = 0, C = 0, w = [], T = /* @__PURE__ */ new Map();
	function E(e) {
		let t = I(l), a = I(u), o = t && a ? t / a : 0, s = {
			srcEvent: n,
			isPanRecognized: d,
			isSwipeRecognized: f,
			firstTouch: c,
			previousTouch: u,
			currentTouch: l,
			deltaX: _,
			deltaY: v,
			offsetX: y,
			offsetY: b,
			velocityX: x,
			velocityY: S,
			velocity: Math.abs(x) > Math.abs(S) ? x : S,
			angle: C,
			axis: i,
			scale: o,
			center: r
		};
		for (let t of T.get(e) || []) t(s);
	}
	function D(e) {
		let t = e.target, n = e.composedPath()[0], r = s.ignore.join(","), i = (e) => e && e instanceof HTMLElement && (e.matches(r) || e.closest(r));
		if (i(t) || i(n)) return !1;
	}
	function O(e) {
		let t = Date.now();
		if (w = w.filter((e) => !e.ts || e.ts > t - 100), e && w.push(e), x = 0, S = 0, w.length > 3) {
			let e = w[0], t = w[w.length - 1];
			if (e && t) {
				let n = t.x - e.x, r = t.y - e.y, i = e.ts && t.ts ? t.ts - e.ts : 0;
				i > 0 && (x = Math.abs(n) > 3 ? n / (i / 30) : 0, S = Math.abs(r) > 3 ? r / (i / 30) : 0);
			}
		}
	}
	function k(e) {
		if (!1 === D(e)) return;
		if (typeof MouseEvent < "u" && e instanceof MouseEvent) {
			if (R) return;
		} else R = !0;
		if (typeof MouseEvent < "u" && e instanceof MouseEvent) {
			if (!e.buttons || e.button !== 0) return;
			ie(e);
		}
		e instanceof MouseEvent && (window.addEventListener("mousemove", A), window.addEventListener("mouseup", j)), window.addEventListener("blur", M), n = e, l = F(e), c = [...l], u = [], g = l.length, r = re(l), g === 1 && (d = !1, f = !1, p = !1), g && O(re(l));
		let t = Date.now(), i = t - (h || t);
		m = i > 0 && i <= 250 && g === 1, h = t, clearTimeout(a), E("start");
	}
	function A(e) {
		var t;
		if (!c.length || e.defaultPrevented || !1 === D(e)) return;
		n = e, u = [...l], l = P(e);
		let a = re(u), f = re(P(e));
		if (O(f), g = l.length, r = f, u.length === l.length ? (_ = f.x - a.x, v = f.y - a.y) : (_ = 0, v = 0), c.length) {
			let e = re(c);
			y = f.x - e.x, b = f.y - e.y;
		}
		if (l.length > 1) {
			let e = I(l), t = I(u);
			Math.abs(e - t) >= .1 && (p = !0, E("pinch"));
		}
		d || (d = Math.abs(y) >= s.panThreshold || Math.abs(b) >= s.panThreshold, d && (z = !1, clearTimeout(o), o = void 0, C = Math.abs(180 * Math.atan2(b, y) / Math.PI), i = C > 45 && C < 135 ? "y" : "x", c = [...l], u = [...l], y = 0, b = 0, _ = 0, v = 0, (t = window.getSelection()) == null || t.removeAllRanges(), E("panstart"))), d && (_ || v) && E("pan"), E("move");
	}
	function j(e) {
		if (n = e, !c.length) return;
		let t = F(e), i = ne(e);
		if (g = t.length, r = re(i), i.length && O(re(i)), u = [...l], l = [...t], c = [...t], g > 0) E("end"), d = !1, f = !1, w = [];
		else {
			let e = s.swipeThreshold;
			(Math.abs(x) > e || Math.abs(S) > e) && (f = !0), d && E("panend"), f && E("swipe"), d || f || p || (E("tap"), m ? E("doubleTap") : a = setTimeout(function() {
				E("singleTap");
			}, 250)), E("end"), ee();
		}
	}
	function M() {
		clearTimeout(a), ee(), d && E("panend"), E("end");
	}
	function ee() {
		R = !1, d = !1, f = !1, m = !1, g = 0, w = [], l = [], u = [], c = [], _ = 0, v = 0, y = 0, b = 0, x = 0, S = 0, C = 0, i = void 0, window.removeEventListener("mousemove", A), window.removeEventListener("mouseup", j), window.removeEventListener("blur", M), z || o || (o = setTimeout(() => {
			z = !0, o = void 0;
		}, 100));
	}
	function te(e) {
		let t = e.target;
		R = !1, t && !e.defaultPrevented && (z || (ie(e), e.stopPropagation()));
	}
	let N = {
		init: function() {
			return e && (e.addEventListener("click", te, ae), e.addEventListener("mousedown", k, ae), e.addEventListener("touchstart", k, ae), e.addEventListener("touchmove", A, ae), e.addEventListener("touchend", j), e.addEventListener("touchcancel", j)), N;
		},
		on: function(e, t) {
			return function(e, t) {
				T.set(e, [...T.get(e) || [], t]);
			}(e, t), N;
		},
		off: function(e, t) {
			return T.has(e) && T.set(e, T.get(e).filter((e) => e !== t)), N;
		},
		isPointerDown: () => g > 0,
		destroy: function() {
			clearTimeout(a), clearTimeout(o), o = void 0, e && (e.removeEventListener("click", te, ae), e.removeEventListener("mousedown", k, ae), e.removeEventListener("touchstart", k, ae), e.removeEventListener("touchmove", A, ae), e.removeEventListener("touchend", j), e.removeEventListener("touchcancel", j)), e = null, ee();
		}
	};
	return N;
};
oe.isClickAllowed = () => z;
//#endregion
//#region node_modules/@fancyapps/ui/dist/panzoom/l10n/en_EN.js
var se = {
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
}, B = (e, t = "") => {
	e && e.classList && t.split(" ").forEach((t) => {
		t && e.classList.add(t);
	});
}, V = (e, t = "") => {
	e && e.classList && t.split(" ").forEach((t) => {
		t && e.classList.remove(t);
	});
}, ce = (e, t = "", n) => {
	e && e.classList && t.split(" ").forEach((t) => {
		t && e.classList.toggle(t, n || !1);
	});
}, H = (e) => {
	e.cancelable && e.preventDefault();
}, U = (e, t = 1e4) => (e = parseFloat(e + "") || 0, Math.round((e + 2 ** -52) * t) / t), le = (e) => e instanceof HTMLImageElement, W, ue;
(function(e) {
	e.Reset = "reset", e.Zoom = "zoom", e.ZoomIn = "zoomIn", e.ZoomOut = "zoomOut", e.ZoomTo = "zoomTo", e.ToggleCover = "toggleCover", e.ToggleFull = "toggleFull", e.ToggleMax = "toggleMax", e.IterateZoom = "iterateZoom", e.Pan = "pan", e.Swipe = "swipe", e.Move = "move", e.MoveLeft = "moveLeft", e.MoveRight = "moveRight", e.MoveUp = "moveUp", e.MoveDown = "moveDown", e.RotateCCW = "rotateCCW", e.RotateCW = "rotateCW", e.FlipX = "flipX", e.FlipY = "flipY", e.ToggleFS = "toggleFS";
})(W ||= {}), function(e) {
	e.Cover = "cover", e.Full = "full", e.Max = "max";
}(ue ||= {});
var de = {
	x: 0,
	y: 0,
	scale: 1,
	angle: 0,
	flipX: 1,
	flipY: 1
}, fe = {
	bounds: !0,
	classes: {
		container: "f-panzoom",
		wrapper: "f-panzoom__wrapper",
		content: "f-panzoom__content",
		viewport: "f-panzoom__viewport"
	},
	clickAction: W.ToggleFull,
	dblClickAction: !1,
	gestures: {},
	height: "auto",
	l10n: se,
	maxScale: 4,
	minScale: 1,
	mouseMoveFactor: 1,
	panMode: "drag",
	protected: !1,
	singleClickAction: !1,
	spinnerTpl: "<div class=\"f-spinner\"></div>",
	wheelAction: W.Zoom,
	width: "auto"
}, pe, me = 0, he = 0, ge = 0, G = (e, t = {}, n = {}) => {
	let r, i, a, o, s, c, l, u, d = 0, f = Object.assign(Object.assign({}, fe), t), p = {}, m = Object.assign({}, de), h = Object.assign({}, de), g = [];
	function y(e) {
		let t = f[e];
		return t && typeof t == "function" ? t(Ae) : t;
	}
	function C() {
		return e && e.parentElement && r && d === 3;
	}
	let w = /* @__PURE__ */ new Map();
	function E(e, ...t) {
		let n = [...w.get(e) || []];
		f.on && n.push(f.on[e]);
		for (let e of n) e && typeof e == "function" && e(Ae, ...t);
		e !== "*" && E("*", e, ...t);
	}
	function D(e) {
		if (!C()) return;
		let t = e.target;
		if (b(t)) return;
		let n = Date.now(), r = S(-1, [
			-e.deltaX || 0,
			-e.deltaY || 0,
			-e.detail || 0
		].reduce(function(e, t) {
			return Math.abs(t) > Math.abs(e) ? t : e;
		}), 1);
		E("wheel", e, r);
		let i = y("wheelAction");
		if (!i || e.defaultPrevented) return;
		let a = h.scale, o = a * (r > 0 ? 1.5 : .5);
		if (i === W.Zoom) {
			let t = Math.abs(e.deltaY) < 100 && Math.abs(e.deltaX) < 100;
			if (n - he < (t ? 200 : 45)) return void H(e);
			he = n;
			let i = ae(), s = z();
			if (U(o) < U(i) && U(a) <= U(i) ? (ge += Math.abs(r), o = i) : U(o) > U(s) && U(a) >= U(s) ? (ge += Math.abs(r), o = s) : (ge = 0, o = S(i, o, s)), ge > 7) return;
		}
		switch (H(e), i) {
			case W.Pan:
				K(i, {
					srcEvent: e,
					deltaX: 2 * -e.deltaX,
					deltaY: 2 * -e.deltaY
				});
				break;
			case W.Zoom:
				K(W.ZoomTo, {
					srcEvent: e,
					scale: o,
					center: {
						x: e.clientX,
						y: e.clientY
					}
				});
				break;
			default: K(i, { srcEvent: e });
		}
	}
	function O(t) {
		let n = t.composedPath()[0];
		if (!oe.isClickAllowed() || !v(n) || t.defaultPrevented || !e?.contains(n) || n.hasAttribute("disabled") || n.hasAttribute("aria-disabled") || n.hasAttribute("data-carousel-go-prev") || n.hasAttribute("data-carousel-go-next")) return;
		let i = n.closest("[data-panzoom-action]"), a = i?.dataset?.panzoomAction, o = i?.dataset?.panzoomValue || "";
		if (a) {
			switch (H(t), a) {
				case W.ZoomTo:
				case W.ZoomIn:
				case W.ZoomOut:
					K(a, { scale: parseFloat(o || "") || void 0 });
					break;
				case W.MoveLeft:
				case W.MoveRight:
					K(a, { deltaX: parseFloat(o || "") || void 0 });
					break;
				case W.MoveUp:
				case W.MoveDown:
					K(a, { deltaY: parseFloat(o || "") || void 0 });
					break;
				case W.ToggleFS:
					Oe();
					break;
				default: K(a);
			}
			return;
		}
		if (!r?.contains(n)) return;
		let s = { srcEvent: t };
		if (K(y("clickAction"), s), y("dblClickAction")) {
			let e = Date.now(), t = e - (me || e);
			me = e, t > 0 && t <= 250 ? (pe &&= (clearTimeout(pe), void 0), K(y("dblClickAction"), s)) : pe = setTimeout(() => {
				K(y("singleClickAction"), s);
			}, 250);
		}
	}
	function k(e) {
		if (u = e, !C() || !F() || m.scale <= 1 || h.scale <= 1 || (r?.dataset.animationName || "").indexOf("zoom") > -1) return;
		let t = I(h.scale);
		if (!t) return;
		let { x: n, y: i } = t;
		K(W.Pan, {
			deltaX: n - h.x,
			deltaY: i - h.y
		});
	}
	function A() {
		var t;
		e && (V(e, "is-loading"), (t = e.querySelector(".f-spinner")) == null || t.remove());
	}
	function j() {
		if (!e || !i) return;
		if (A(), le(i) && (!i.complete || !i.naturalWidth)) return d = 2, r?.classList.add("has-error"), void E("error");
		E("loaded");
		let { width: t, height: n } = N();
		le(i) && (i.setAttribute("width", t + ""), i.setAttribute("height", n + "")), r && (V(r, "has-error"), le(i) && (r.setAttribute("width", t + ""), r.setAttribute("height", n + ""), r.style.aspectRatio = `${t / n || ""}`)), c = ee().on("start", (e, t) => {
			t.angle !== void 0 && (t.angle = 90 * Math.round(t.angle / 90)), t.flipX !== void 0 && (t.flipX = t.flipX > 0 ? 1 : -1), t.flipY !== void 0 && (t.flipY = t.flipY > 0 ? 1 : -1), h = Object.assign(Object.assign({}, de), t), G(), E("animationStart");
		}).on("pause", (e) => {
			h = Object.assign(Object.assign({}, de), e);
		}).on("step", (e) => {
			if (!C()) return void (c == null || c.end());
			if (m = Object.assign(Object.assign({}, de), e), F() || !y("bounds") || Te() || h.scale > m.scale || h.scale < L()) return void _e();
			let t = se(h.scale), n = !1, r = !1, i = !1, a = !1;
			m.x < t.x[0] && (n = !0), m.x > t.x[1] && (r = !0), m.y < t.y[0] && (a = !0), m.y > t.y[1] && (i = !0);
			let o = !1, s = !1, l = !1, u = !1;
			h.x < t.x[0] && (o = !0), h.x > t.x[1] && (s = !0), h.y < t.y[0] && (u = !0), h.y > t.y[1] && (l = !0);
			let d = !1;
			(r && s || n && o) && (h.x = S(t.x[0], h.x, t.x[1]), d = !0), (i && l || a && u) && (h.y = S(t.y[0], h.y, t.y[1]), d = !0), d && c && c.spring({
				tension: 94,
				friction: 17,
				maxSpeed: 555 * h.scale,
				restDelta: .1,
				restSpeed: .1,
				velocity: c.getCurrentVelocities()
			}).from(m).to(h).start(), _e();
		}).on("end", () => {
			s != null && s.isPointerDown() || ue(), c != null && c.isRunning() || (G(), E("animationEnd"));
		}), function() {
			let e = y("gestures");
			if (!e || !o || !i) return;
			let t = !1;
			s = oe(o, e).on("start", (e) => {
				if (!y("gestures") || !c || !C() || F()) return;
				let n = e.srcEvent;
				(m.scale > 1 || we(m.angle) || e.currentTouch.length > 1) && (n?.stopPropagation(), c.pause(), t = !0), e.currentTouch.length === 1 && E("touchStart");
			}).on("move", (e) => {
				var n;
				t && (h.scale !== 1 || we(h.angle) || e.currentTouch.length > 1) && (H(e.srcEvent), (n = e.srcEvent) == null || n.stopPropagation());
			}).on("pan", (e) => {
				if (!t) return;
				let n = e.srcEvent;
				(h.scale !== 1 || we(h.angle) || e.currentTouch.length > 1) && (H(n), K(W.Pan, e));
			}).on("swipe", (e) => {
				t && (h.scale > 1 || we(h.angle)) && K(W.Swipe, e);
			}).on("tap", (e) => {
				E("click", e);
			}).on("singleTap", (e) => {
				E("singleClick", e);
			}).on("doubleTap", (e) => {
				E("dblClick", e);
			}).on("pinch", (e) => {
				t && (e.scale > L() ? K(W.ZoomIn, e) : e.scale < L() ? K(W.ZoomOut, e) : K(W.Pan, e));
			}).on("end", (e) => {
				t && (e.currentTouch.length ? (e.srcEvent.stopPropagation(), H(e.srcEvent), c?.end()) : (t = !1, G(), ue(), E("touchEnd")));
			}).init();
		}(), o && (o.addEventListener("wheel", D, { passive: !1 }), g.push(() => {
			o?.removeEventListener("wheel", D, { passive: !1 });
		})), e?.addEventListener("click", O), document == null || document.addEventListener("mousemove", k), g.push(() => {
			e?.removeEventListener("click", O), document == null || document.removeEventListener("mousemove", k);
		});
		let a = M();
		m = Object.assign({}, a), h = Object.assign({}, a), d = 3, _e(), G(), E("ready"), requestAnimationFrame(() => {
			d === 3 && (A(), o && (o.style.visibility = ""));
		});
	}
	function M() {
		let e = Object.assign({}, y("startPos") || {}), t = e.scale, n = 1;
		n = typeof t == "string" ? ie(t) : typeof t == "number" ? t : L();
		let r = Object.assign(Object.assign(Object.assign({}, de), e), { scale: n }), i = F() ? I(n) : void 0;
		if (i) {
			let { x: e, y: t } = i;
			r.x = e, r.y = t;
		}
		return r;
	}
	function te() {
		let e = {
			top: 0,
			left: 0,
			width: 0,
			height: 0
		};
		if (r) {
			let t = r.getBoundingClientRect();
			we(h.angle) ? (e.top = t.top + .5 * t.height - .5 * t.width, e.left = t.left + .5 * t.width - .5 * t.height, e.width = t.height, e.height = t.width) : (e.top = t.top, e.left = t.left, e.width = t.width, e.height = t.height);
		}
		return e;
	}
	function N() {
		let e = y("width"), t = y("height");
		if (i && e === "auto") {
			let t = i.getAttribute("width");
			e = t ? parseFloat(t + "") : i.dataset.width === void 0 ? le(o) ? o.naturalWidth : le(i) ? i.naturalWidth : r?.getBoundingClientRect().width || 0 : parseFloat(i.dataset.width + "");
		} else e = _(e) ? parseFloat(e) : e;
		if (i && t === "auto") {
			let e = i.getAttribute("height");
			t = e ? parseFloat(e + "") : i.dataset.height === void 0 ? le(o) ? o.naturalHeight : le(i) ? i.naturalHeight : r?.getBoundingClientRect().height || 0 : parseFloat(i.dataset.height + "");
		} else t = _(t) ? parseFloat(t) : t;
		return {
			width: e,
			height: t
		};
	}
	function P() {
		let e = te();
		return {
			width: e.width,
			height: e.height
		};
	}
	function F() {
		return y("panMode") === "mousemove" && matchMedia("(hover: hover)").matches;
	}
	function I(e) {
		let t = u || y("event"), n = r?.getBoundingClientRect();
		if (!t || !n || e <= 1) return {
			x: 0,
			y: 0
		};
		let i = (t.clientX || 0) - n.left, a = (t.clientY || 0) - n.top, { width: o, height: s } = P(), c = se(e);
		if (e > 1) {
			let t = y("mouseMoveFactor");
			t > 1 && (e *= t);
		}
		let l = o * e, d = s * e, f = .5 * (l - o) - i / o * 100 / 100 * (l - o), p = .5 * (d - s) - a / s * 100 / 100 * (d - s);
		return f = S(c.x[0], f, c.x[1]), p = S(c.y[0], p, c.y[1]), {
			x: f,
			y: p
		};
	}
	function ie(t) {
		if (!t) return h.scale;
		if (!e) return 1;
		let n = e.getBoundingClientRect(), r = te(), { width: i, height: a } = N(), o = (e) => {
			if (typeof e == "number") return e;
			switch (e) {
				case "min":
				case "base": return 1;
				case "cover": return Math.max(n.height / r.height, n.width / r.width) || 1;
				case "full":
				case "max": {
					let e = we(h.angle) ? a : i;
					return e && r.width ? e / r.width : 1;
				}
			}
		}, s = y("minScale"), c = y("maxScale"), l = Math.min(o("full"), o(s)), u = typeof c == "number" ? o("full") * c : Math.min(o("full"), o(c));
		switch (t) {
			case "min": return l;
			case "base": return S(l, 1, u);
			case "cover": return o("cover");
			case "full": return Math.min(u, o("full"));
			case "max": return u;
		}
	}
	function ae() {
		return ie("min");
	}
	function L() {
		return ie("base");
	}
	function R() {
		return ie("full");
	}
	function z() {
		return ie("max");
	}
	function se(t) {
		let n = {
			x: [0, 0],
			y: [0, 0]
		}, r = e?.getBoundingClientRect();
		if (!r) return n;
		let i = te(), a = r.width, o = r.height, s = i.width, c = i.height, l = t = t === void 0 ? h.scale : t, u = t;
		if (F() && t > 1) {
			let e = y("mouseMoveFactor");
			e > 1 && (s * t > a + .01 && (l *= e), c * t > o + .01 && (u *= e));
		}
		if (s *= l, c *= u, s > a) {
			n.x[0] = .5 * (a - s), n.x[1] = .5 * (s - a);
			let e = .5 * (i.left - r.left), t = .5 * (i.left + i.width - r.right);
			n.x[0] -= e + t, n.x[1] -= e + t;
		}
		if (c > o) {
			n.y[0] = .5 * (o - c), n.y[1] = .5 * (c - o);
			let e = .5 * (i.top - r.top), t = .5 * (i.top + i.height - r.bottom);
			n.y[0] -= e + t, n.y[1] -= e + t;
		}
		return n;
	}
	function ue() {
		if (!C() || !y("bounds") || !c) return;
		let e = ae(), t = z(), n = S(e, h.scale, t);
		if (h.scale < e - .01 || h.scale > t + .01) return void K(W.ZoomTo, { scale: n });
		if (c.isRunning() || Te()) return;
		let r = se(n);
		h.x < r.x[0] || h.x > r.x[1] || h.y < r.y[0] || h.y > r.y[1] ? (h.x = S(r.x[0], h.x, r.x[1]), h.y = S(r.y[0], h.y, r.y[1]), c.spring({
			tension: 170,
			friction: 17,
			restDelta: .001,
			restSpeed: .001,
			maxSpeed: 1 / 0,
			velocity: c.getCurrentVelocities()
		}), c.from(m).to(h).start()) : _e();
	}
	function G(t) {
		if (!C()) return;
		let n = Ce(), i = Te(), a = Ee(), o = De(), s = ye(), c = be();
		ce(r, "is-fullsize", o), ce(r, "is-expanded", a), ce(r, "is-dragging", i), ce(r, "can-drag", n), ce(r, "will-zoom-in", s), ce(r, "will-zoom-out", c);
		let l = Se(), u = q(), d = xe(), f = !C();
		for (let n of (t || e)?.querySelectorAll("[data-panzoom-action]") || []) {
			let e = n.dataset.panzoomAction, t = !1;
			if (f) t = !0;
			else switch (e) {
				case W.ZoomIn:
					l || (t = !0);
					break;
				case W.ZoomOut:
					d || (t = !0);
					break;
				case W.ToggleFull: {
					u || d || (t = !0);
					let e = n.querySelector("g");
					e && (e.style.display = o && !t ? "none" : "");
					break;
				}
				case W.IterateZoom: {
					l || d || (t = !0);
					let e = n.querySelector("g");
					e && (e.style.display = l || t ? "" : "none");
					break;
				}
				case W.ToggleCover:
				case W.ToggleMax: l || d || (t = !0);
			}
			t ? (n.setAttribute("aria-disabled", ""), n.setAttribute("tabindex", "-1")) : (n.removeAttribute("aria-disabled"), n.removeAttribute("tabindex"));
		}
	}
	function K(t, n) {
		if (!(t && e && i && c && C()) || t === W.Swipe && Math.abs(c.getCurrentVelocities().scale) > .01) return;
		let r = Object.assign({}, h), a = Object.assign({}, h), o = se(F() ? r.scale : m.scale), s = c.getCurrentVelocities(), l = te(), u = ((n ||= {}).currentTouch?.length || 0) > 1, d = n.velocityX || 0, f = n.velocityY || 0, p = n.center;
		n.srcEvent && (p = re(ne(n.srcEvent)));
		let g = n.deltaX || 0, _ = n.deltaY || 0;
		switch (t) {
			case W.MoveRight:
				g = n.deltaX || 100;
				break;
			case W.MoveLeft:
				g = n.deltaX || -100;
				break;
			case W.MoveUp:
				_ = n.deltaY || -100;
				break;
			case W.MoveDown: _ = n.deltaY || 100;
		}
		let v = [];
		if (typeof t == "number") a.scale = t;
		else switch (t) {
			case W.Reset:
				a = Object.assign({}, de), a.scale = L();
				break;
			case W.ZoomTo:
			case W.ZoomIn:
			case W.ZoomOut:
			case W.ToggleCover:
			case W.ToggleFull:
			case W.ToggleMax:
			case W.IterateZoom:
			case W.Zoom:
				a.scale = ve(t, n);
				break;
			case W.Pan:
			case W.Move:
			case W.MoveLeft:
			case W.MoveRight:
			case W.MoveUp:
			case W.MoveDown:
				if (Te()) {
					let e = 1, t = 1;
					a.x <= o.x[0] && d <= 0 && (e = Math.max(.01, 1 - Math.abs(1 / l.width * Math.abs(a.x - o.x[0]))), e *= .2), a.x >= o.x[1] && d >= 0 && (e = Math.max(.01, 1 - Math.abs(1 / l.width * Math.abs(a.x - o.x[1]))), e *= .2), a.y <= o.y[0] && f <= 0 && (t = Math.max(.01, 1 - Math.abs(1 / l.height * Math.abs(a.y - o.y[0]))), t *= .2), a.y >= o.y[1] && f >= 0 && (t = Math.max(.01, 1 - Math.abs(1 / l.height * Math.abs(a.y - o.y[1]))), t *= .2), a.x += g * e, a.y += _ * t;
				} else a.x = S(o.x[0], a.x + g, o.x[1]), a.y = S(o.y[0], a.y + _, o.y[1]);
				break;
			case W.Swipe:
				let e = (e = 0) => Math.sign(e) * Math.abs(e) ** 1.5;
				a.x += S(-1e3, e(d), 1e3), a.y += S(-1e3, e(f), 1e3), f && !d && (a.x = S(o.x[0], a.x, o.x[1])), !f && d && (a.y = S(o.y[0], a.y, o.y[1])), s.x = d, s.y = f;
				break;
			case W.RotateCW:
				a.angle += 90;
				break;
			case W.RotateCCW:
				a.angle -= 90;
				break;
			case W.FlipX:
				a.flipX *= -1;
				break;
			case W.FlipY: a.flipY *= -1;
		}
		if (m.angle !== void 0 && Math.abs(m.angle) >= 360 && (a.angle -= 360 * Math.floor(m.angle / 360), m.angle -= 360 * Math.floor(m.angle / 360)), v.length) {
			let e = v.findIndex((e) => e > a.scale + 1e-4);
			a.scale = v[e] || v[0];
		}
		if (u && (a.scale = S(ae() * (u ? .8 : 1), a.scale, z() * (u ? 1.6 : 1))), F()) {
			let e = I(a.scale);
			if (e) {
				let { x: t, y: n } = e;
				a.x = t, a.y = n;
			}
		} else if (Math.abs(a.scale - r.scale) > 1e-4) {
			let t = 0, n = 0;
			if (p) t = p.x, n = p.y;
			else {
				let r = e.getBoundingClientRect();
				t = r.x + .5 * r.width, n = r.y + .5 * r.height;
			}
			let i = t - l.left, s = n - l.top;
			i -= .5 * l.width, s -= .5 * l.height;
			let c = (i - r.x) / r.scale, d = (s - r.y) / r.scale;
			a.x = i - c * a.scale, a.y = s - d * a.scale, !u && y("bounds") && (o = se(a.scale), a.x = S(o.x[0], a.x, o.x[1]), a.y = S(o.y[0], a.y, o.y[1]));
		}
		if (t === W.Swipe) {
			let e = 500 * a.scale, t = s;
			c.spring({
				tension: 94,
				friction: 17,
				maxSpeed: e,
				restDelta: .1,
				restSpeed: .1,
				velocity: t
			});
		} else t === W.Pan || u ? c.spring({
			tension: 900,
			friction: 17,
			restDelta: .01,
			restSpeed: .01,
			maxSpeed: 1
		}) : c.spring({
			tension: 170,
			friction: 17,
			restDelta: .001,
			restSpeed: .001,
			maxSpeed: 1 / 0,
			velocity: s
		});
		if (n.velocity === 0 || T(m, a)) m = Object.assign({}, a), h = Object.assign({}, a), c.end(), _e(), G();
		else {
			if (T(h, a)) return;
			c.from(m).to(a).start();
		}
		E("action", t);
	}
	function _e() {
		if (!i || !r || !o) return;
		let { width: t, height: n } = N();
		Object.assign(r.style, {
			maxWidth: `min(${t}px, 100%)`,
			maxHeight: `min(${n}px, 100%)`
		});
		let { x: a, y: s, width: c, height: l, scale: u, angle: d, flipX: f, flipY: p } = function() {
			let { width: t, height: n } = N(), { width: r, height: i } = P();
			if (!e) return {
				x: 0,
				y: 0,
				width: 0,
				height: 0,
				scale: 0,
				flipX: 0,
				flipY: 0,
				angle: 0,
				fitWidth: r,
				fitHeight: i,
				fullWidth: t,
				fullHeight: n
			};
			let { x: a, y: o, scale: s, angle: c, flipX: l, flipY: u } = m, d = 1 / R(), f = t, p = n, g = m.scale * d, _ = h.scale * d, v = Math.max(r, i), y = Math.min(r, i);
			t > n ? (f = v, p = y) : (f = y, p = v), g = t > n ? v * s / t || 1 : v * s / n || 1;
			let b = f ? t * _ : 0, x = p ? n * _ : 0, S = f && p ? t * g / b : 0;
			return a = a + .5 * f - .5 * b, o = o + .5 * p - .5 * x, {
				x: a,
				y: o,
				width: b,
				height: x,
				scale: S,
				flipX: l,
				flipY: u,
				angle: c,
				fitWidth: r,
				fitHeight: i,
				fullWidth: t,
				fullHeight: n
			};
		}(), g = `translate(${U(a, 100)}px, ${U(s, 100)}px)`;
		g += f !== 1 || p !== 1 ? ` scaleX(${U(u * f)}) scaleY(${U(u * p)})` : ` scale(${U(u)})`, d !== 0 && (g += ` rotate(${d}deg)`), o.style.width = `${U(c)}px`, o.style.height = `${U(l)}px`, o.style.transform = `${g}`, E("render");
	}
	function ve(e = y("clickAction"), t = {}) {
		let n = h.scale, r = L(), i = [];
		if (typeof e == "number") r = e;
		else if (e) {
			switch (e) {
				case W.ZoomTo:
					r = t.scale || 1;
					break;
				case W.ZoomIn:
					r = n * (t.scale || 2);
					break;
				case W.ZoomOut:
					r = n * (t.scale || .5);
					break;
				case W.ToggleCover:
					i = [L(), ie("cover")];
					break;
				case W.ToggleFull:
					i = [L(), R()];
					break;
				case W.ToggleMax:
					i = [L(), z()];
					break;
				case W.IterateZoom:
					i = [
						L(),
						R(),
						z()
					];
					break;
				case W.Zoom: {
					let e = R();
					r = n >= e - .05 ? L() : Math.min(e, n * (t.scale || 2));
					break;
				}
			}
			i.length && (r = i.find((e) => e > n + 1e-4) ?? L());
		}
		return e !== W.ZoomTo && (r = S(ae(), r, z())), r;
	}
	function ye() {
		return !!(C() && ve() > h.scale);
	}
	function be() {
		return !!(C() && ve() < h.scale);
	}
	function xe() {
		return !!(C() && h.scale > ae());
	}
	function Se() {
		return !!(C() && h.scale < z());
	}
	function q() {
		return !!(C() && h.scale < R());
	}
	function Ce() {
		return !(!C() || !Ee() && !we(h.angle) || !s || F());
	}
	function we(e) {
		return Math.abs(e % 180) === 90;
	}
	function Te() {
		return !(!C() || !s?.isPointerDown() || F());
	}
	function Ee() {
		return !!(C() && h.scale > L());
	}
	function De() {
		return !!(C() && h.scale >= R());
	}
	function Oe() {
		let t = "in-fullscreen", n = "with-panzoom-in-fullscreen";
		e?.classList.toggle(t);
		let r = e?.classList.contains(t);
		r ? (document.documentElement.classList.add(n), document.addEventListener("keydown", ke, !0)) : (document.documentElement.classList.remove(n), document.removeEventListener("keydown", ke, !0)), _e(), E(r ? "enterFS" : "exitFS");
	}
	function ke(e) {
		e.key !== "Escape" || e.defaultPrevented || Oe();
	}
	let Ae = {
		canDrag: Ce,
		canZoomIn: Se,
		canZoomOut: xe,
		canZoomToFull: q,
		destroy: function() {
			E("destroy");
			for (let e of Object.values(p)) e?.destroy(Ae);
			for (let e of g) e();
			return r && (r.style.aspectRatio = "", r.style.maxWidth = "", r.style.maxHeight = ""), o && (o.style.width = "", o.style.height = "", o.style.transform = ""), r = void 0, i = void 0, o = void 0, m = Object.assign({}, de), h = Object.assign({}, de), c?.destroy(), c = void 0, s?.destroy(), s = void 0, d = 4, Ae;
		},
		emit: E,
		execute: K,
		getBoundaries: se,
		getContainer: function() {
			return e;
		},
		getContent: function() {
			return i;
		},
		getFullDim: N,
		getGestures: function() {
			return s;
		},
		getMousemovePos: I,
		getOptions: function() {
			return f;
		},
		getPlugins: function() {
			return p;
		},
		getScale: ie,
		getStartPosition: M,
		getState: function() {
			return d;
		},
		getTransform: function(e) {
			return !0 === e ? h : m;
		},
		getTween: function() {
			return c;
		},
		getViewport: function() {
			return o;
		},
		getWrapper: function() {
			return r;
		},
		init: function() {
			return d = 0, E("init"), function() {
				for (let [e, t] of Object.entries(Object.assign(Object.assign({}, n), f.plugins || {}))) if (e && !p[e] && t instanceof Function) {
					let n = t();
					n.init(Ae), p[e] = n;
				}
				E("initPlugins");
			}(), function() {
				let t = Object.assign(Object.assign({}, fe.classes), y("classes")), n = t.content?.split(" ").shift(), s = t.wrapper?.split(" ").shift(), c = t.viewport?.split(" ").shift();
				if (!(!n || !s || !c) && e && (B(e, t.container), i = e.querySelector(`.${n}:not(.is-clone)`), i)) {
					if (i.setAttribute("draggable", "false"), r = e.querySelector(`.${s}`), r || (r = document.createElement("div"), B(r, t.wrapper), i.insertAdjacentElement("beforebegin", r), r.insertAdjacentElement("afterbegin", i)), o = e.querySelector(`.${c}`), o || (o = document.createElement("div"), B(o, t.viewport), r.insertAdjacentElement("beforeend", o)), o.contains(i) || o.insertAdjacentElement("afterbegin", i), a = e.querySelector(`.${n}.is-clone`), a || (a = i.cloneNode(!0), a.removeAttribute("id"), B(a, "is-clone"), r.insertAdjacentElement("afterbegin", a)), i instanceof HTMLPictureElement && (i = i.querySelector("img")), a instanceof HTMLPictureElement && (a = a.querySelector("img")), o instanceof HTMLPictureElement && (o = o.querySelector("img")), o && (o.style.visibility = "hidden", y("protected"))) {
						o.addEventListener("contextmenu", (e) => {
							H(e);
						});
						let e = document.createElement("div");
						B(e, "f-panzoom__protected"), o.appendChild(e);
					}
					E("initLayout");
				}
			}(), function() {
				if (e && r && !l) {
					let e = null;
					l = new ResizeObserver(() => {
						C() && (e ||= requestAnimationFrame(() => {
							C() && (G(), ue(), E("refresh")), e = null;
						}));
					}), l.observe(r), g.push(() => {
						l?.disconnect(), l = void 0, e &&= (cancelAnimationFrame(e), null);
					});
				}
			}(), function() {
				if (!e || !i) return;
				if (!le(i) || !le(a)) return void j();
				let t = () => {
					i && le(i) && i.decode().then(() => {
						j();
					}).catch(() => {
						j();
					});
				};
				if (d = 1, e.classList.add("is-loading"), E("loading"), a.src && a.complete) return void t();
				(function() {
					if (!e || e?.querySelector(".f-spinner")) return;
					let t = x(y("spinnerTpl"));
					t && (t.classList.add("f-spinner"), e.classList.add("is-loading"), r?.insertAdjacentElement("afterbegin", t));
				})(), a.addEventListener("load", t, !1), a.addEventListener("error", t, !1), g.push(() => {
					a?.removeEventListener("load", t, !1), a?.removeEventListener("error", t, !1);
				});
			}(), Ae;
		},
		isDragging: Te,
		isExpanded: Ee,
		isFullsize: De,
		isMousemoveMode: F,
		localize: function(e, t = []) {
			let n = y("l10n") || {};
			e = String(e).replace(/\{\{(\w+)\}\}/g, (e, t) => n[t] || e);
			for (let n = 0; n < t.length; n++) e = e.split(t[n][0]).join(t[n][1]);
			return e = e.replace(/\{\{(.*?)\}\}/g, (e, t) => t);
		},
		off: function(e, t) {
			for (let n of e instanceof Array ? e : [e]) w.has(n) && w.set(n, w.get(n).filter((e) => e !== t));
			return Ae;
		},
		on: function(e, t) {
			for (let n of e instanceof Array ? e : [e]) w.set(n, [...w.get(n) || [], t]);
			return Ae;
		},
		toggleFS: Oe,
		updateControls: G,
		version: "6.1.14",
		willZoomIn: ye,
		willZoomOut: be
	};
	return Ae;
};
G.l10n = { en_EN: se }, G.getDefaults = () => fe;
//#endregion
//#region node_modules/@fancyapps/ui/dist/utils/getDirectChildren.js
var K = (e, t) => {
	let n = [];
	return e.childNodes.forEach((e) => {
		e.nodeType !== Node.ELEMENT_NODE || t && !e.matches(t) || n.push(e);
	}), n;
}, _e = (e, ...t) => {
	let n = t.length;
	for (let r = 0; r < n; r++) {
		let n = t[r] || {};
		Object.entries(n).forEach(([t, n]) => {
			let r = Array.isArray(n) ? [] : {};
			e[t] || Object.assign(e, { [t]: r }), C(n) ? Object.assign(e[t], _e(e[t], n)) : Array.isArray(n) ? Object.assign(e, { [t]: [...n] }) : Object.assign(e, { [t]: n });
		});
	}
	return e;
}, ve = function(e = 0, t = 0, n = 0, r = 0, i = 0, a = !1) {
	let o = (e - t) / (n - t) * (i - r) + r;
	return a ? r < i ? S(r, o, i) : S(i, o, r) : o;
}, ye = Object.assign(Object.assign({}, se), {
	ERROR: "Something went wrong. <br /> Please try again later.",
	NEXT: "Next page",
	PREV: "Previous page",
	GOTO: "Go to page #%d",
	DOWNLOAD: "Download",
	TOGGLE_FULLSCREEN: "Toggle full-screen mode",
	TOGGLE_EXPAND: "Toggle full-size mode",
	TOGGLE_THUMBS: "Toggle thumbnails",
	TOGGLE_AUTOPLAY: "Toggle slideshow"
}), be = (e) => {
	e.cancelable && e.preventDefault();
}, xe = {
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
	l10n: ye,
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
}, Se, q, Ce = 0, we = (e, t = {}, n = {}) => {
	Ce++;
	let r, i, a, o, s, c = 0, l = Object.assign({}, xe), u = Object.assign({}, xe), d = {}, f = null, p = null, m = 0, h = 0, g = 0, y = !1, w = !1, T = !1, E = "height", D = 0, O = !0, k = 0, A = 0, j = 0, M = 0, N = "*", P = [], F = [], ne = /* @__PURE__ */ new Set(), re = [], I = [], ie = 0, ae = 0, L = 0;
	function R(e, ...t) {
		let n = u[e];
		return n && n instanceof Function ? n(Y, ...t) : n;
	}
	function z(e, t = []) {
		let n = R("l10n") || {};
		e = String(e).replace(/\{\{(\w+)\}\}/g, (e, t) => n[t] || e);
		for (let n = 0; n < t.length; n++) e = e.split(t[n][0]).join(t[n][1]);
		return e = e.replace(/\{\{(.*?)\}\}/g, (e, t) => t);
	}
	let se = /* @__PURE__ */ new Map();
	function H(e, ...t) {
		let n = [...se.get(e) || []];
		u.on && n.push(u.on[e]);
		for (let e of n) e && e instanceof Function && e(Y, ...t);
		e === "click" && Fe(t[0]), e !== "*" && H("*", e, ...t);
	}
	function U() {
		let e = _e({}, xe, l), t = "", o = l.breakpoints || {};
		for (let [n, r] of Object.entries(o)) window.matchMedia(n).matches && (t += n, _e(e, r));
		if (s === void 0 || t !== s) {
			if (s = t, c !== 0) {
				let t = I[k]?.slides[0]?.index;
				t === void 0 && (t = u.initialSlide), e.initialSlide = t, e.slides = [];
				for (let t of P) t.isVirtual && e.slides.push(t);
			}
			He(), u = e, !1 !== R("enabled") && (c = 0, H("init"), function() {
				for (let [e, t] of Object.entries(Object.assign(Object.assign({}, n), u.plugins || {}))) if (e && !d[e] && t instanceof Function) {
					let n = t();
					n.init(Y, we), d[e] = n;
				}
				H("initPlugins");
			}(), function() {
				if (!f) return;
				let e = R("classes") || {};
				B(f, e.container);
				let t = R("style");
				if (t && C(t)) for (let [e, n] of Object.entries(t)) f.style.setProperty(e, n);
				p = Array.from(f.querySelectorAll(`.${e.viewport}`)).filter((t) => t.closest(`.${e.container}`) === f).pop() || null, p || (p = document.createElement("div"), B(p, e.viewport), p.append(...K(f, `.${e.slide}`)), f.insertAdjacentElement("afterbegin", p)), f.carousel = Y, H("initLayout");
			}(), function() {
				if (!p) return;
				let e = R("classes") || {};
				P = [], [...K(p, `.${e.slide}`)].forEach((e) => {
					if (e.parentElement) {
						let t = Ee(Object.assign({
							el: e,
							isVirtual: !1
						}, e.dataset || {}));
						H("createSlide", t), P.push(t);
					}
				}), Ae();
				for (let e of P) H("addSlide", e);
				Te(R("slides"));
				for (let e of P) {
					let t = e.el;
					t?.parentElement === p && (B(t, u.classes.slide), B(t, e.class), Re(e), H("attachSlideEl", e));
				}
				H("initSlides");
			}(), je(), c = 1, B(f, (R("classes") || {}).isEnabled || ""), Ve(), fe(), i = ee().on("start", () => {
				r && r.isPointerDown() || (de(), Ve());
			}).on("step", (e) => {
				let t = D;
				D = e.pos, D !== t && (O = !1, Ve());
			}).on("end", (e) => {
				r != null && r.isPointerDown() || (D = e.pos, i && !y && (D < j || D > M) ? i.spring({
					clamp: !0,
					mass: 1,
					tension: 200,
					friction: 25,
					velocity: 0,
					restDelta: 1,
					restSpeed: 1
				}).from({ pos: D }).to({ pos: S(j, D, M) }).start() : O || (O = !0, H("settle")));
			}), W(), function() {
				if (!f || !p) return;
				f.addEventListener("click", J), document.addEventListener("mousemove", le), q || (q = function(e) {
					let t = e.target?.dataset?.carouselTarget;
					t && (document.getElementById(`${t.split("#").pop()}`)?.carousel)?.emit("click", e);
				}, document.addEventListener("click", q));
				let e = p.getBoundingClientRect();
				if (ie = e.height, ae = e.width, !a) {
					let e = null;
					a = new ResizeObserver(() => {
						e ||= requestAnimationFrame(() => {
							(function() {
								if (c !== 1 || !p) return;
								let e = I.length, t = p.getBoundingClientRect(), n = t.height, i = t.width;
								e > 1 && (T && Math.abs(n - ie) < .5 || !T && Math.abs(i - ae) < .5) || (je(), W(), ie = n, ae = i, T && !ie || !T && !ae || f && p && (e === I.length && r != null && r.isPointerDown() || (R("dragFree") && (y || D > j && D < M) ? (de(), Ve()) : ze(k, { transition: !1 }))));
							})(), e = null;
						});
					}), a.observe(p);
				}
			}(), H("ready"));
		}
	}
	function le(e) {
		Se = e;
	}
	function W() {
		!1 === R("gestures") ? r &&= (r.destroy(), void 0) : r || function() {
			let e = R("gestures");
			!r && !1 !== e && p && (r = oe(p, e).on("start", (e) => {
				if (!i || !1 === R("gestures", e)) return;
				let { srcEvent: t } = e;
				T && te(t) && !b(t.target) && be(t), i.pause(), i.getCurrentVelocities().pos = 0;
				let n = I[k]?.slides[0], r = n?.el;
				n && ne.has(n.index) && r && (D = n.offset || 0, D += (function(e) {
					let t = window.getComputedStyle(e), n = new DOMMatrixReadOnly(t.transform);
					return {
						width: n.m41 || 0,
						height: n.m42 || 0
					};
				}(r)[E] || 0) * (w && !T ? 1 : -1)), Ne(), y || (D < j || D > M) && i.spring({
					clamp: !0,
					mass: 1,
					tension: 500,
					friction: 25,
					velocity: i.getCurrentVelocities()?.pos || 0,
					restDelta: 1,
					restSpeed: 1
				}).from({ pos: D }).to({ pos: S(j, D, M) }).start();
			}).on("move", (e) => {
				if (!1 === R("gestures", e)) return;
				let { srcEvent: t, axis: n, deltaX: r, deltaY: a } = e;
				if (te(t) && t.touches?.length > 1) return;
				let o = t.target, s = b(o), c = s ? s.scrollHeight > s.clientHeight ? "y" : "x" : void 0;
				if (s && s !== p && (!n || n === c)) return;
				if (!n) return be(t), t.stopPropagation(), void t.stopImmediatePropagation();
				if (n === "y" && !T || n === "x" && T || (be(t), t.stopPropagation(), !i)) return;
				let l = w && !T ? 1 : -1, u = T ? a : r, d = i?.isRunning() ? i.getEndValues().pos : D, f = 1;
				y || (d <= j && u * l < 0 ? (f = Math.max(.01, 1 - (Math.abs(1 / ge() * Math.abs(d - j)) || 0)), f *= .2) : d >= M && u * l > 0 && (f = Math.max(.01, 1 - (Math.abs(1 / ge() * Math.abs(d - M)) || 0)), f *= .2)), d += u * f * l, i.spring({
					clamp: !0,
					mass: 1,
					tension: 700,
					friction: 25,
					velocity: i.getCurrentVelocities()?.pos || 0,
					restDelta: 1,
					restSpeed: 1
				}).from({ pos: D }).to({ pos: d }).start();
			}).on("panstart", (e) => {
				!1 !== R("gestures", e) && e?.axis === (T ? "y" : "x") && B(p, "is-dragging");
			}).on("panend", (e) => {
				!1 !== R("gestures", e) && V(p, "is-dragging");
			}).on("end", (e) => {
				if (!1 === R("gestures", e)) return;
				let { srcEvent: t, axis: n, velocityX: r, velocityY: a, currentTouch: o } = e;
				if (o.length > 0 || !i) return;
				let s = t.target, c = b(s), l = c ? c.scrollHeight > c.clientHeight ? "y" : "x" : void 0, u = c && (!n || n === l);
				T && te(t) && !n && J(t);
				let f = I.length, p = R("dragFree");
				if (!f) return;
				let m = u ? 0 : R("vertical") ? a : r;
				n !== (T ? "y" : "x") && (m = 0);
				let h = i?.isRunning() ? i.getEndValues().pos : D, g = w && !T ? 1 : -1;
				if (u || (h += m * (p ? 5 : 1) * g), !y && (m * g <= 0 && h < j || m * g >= 0 && h > M)) {
					let e = 0;
					Math.abs(m) > 0 && (e = 2 * Math.abs(m), e = Math.min(.3 * ge(), e)), h = S(j + -1 * e, h, M + e), i.spring({
						clamp: !0,
						mass: 1,
						tension: 380,
						friction: 25,
						velocity: -1 * m,
						restDelta: 1,
						restSpeed: 1
					}).from({ pos: D }).to({ pos: h }).start();
					return;
				}
				if (p || d.Autoscroll?.isEnabled()) return void (Math.abs(m) > 10 ? i.spring({
					clamp: !0,
					mass: 1,
					tension: 150,
					friction: 25,
					velocity: -1 * m,
					restDelta: 1,
					restSpeed: 1
				}).from({ pos: D }).to({ pos: h }).start() : i.isRunning() || O || (O = !0, H("settle")));
				if (!p && !d.Autoscroll?.isEnabled() && (!e.offsetX && !e.offsetY || n === "y" && !T || n === "x" && T)) return void ze(k, { transition: "tween" });
				let _ = me(h);
				Math.abs(m) > 10 && _ === k && (_ += m > 0 ? w && !T ? 1 : -1 : w && !T ? -1 : 1), ze(_, {
					transition: "tween",
					tween: { velocity: -1 * m }
				});
			}).init());
		}(), ce(p, "is-draggable", !!r && I.length > 0);
	}
	function ue(e = "*") {
		var t;
		let n = [];
		for (let r of P) (e === "*" || r.class && r.class.includes(e) || r.el && (t = r.el) != null && t.classList.contains(e)) && n.push(r);
		o = void 0, N = e, F = [...n];
	}
	function de() {
		if (!i) return;
		let e = me(i?.isRunning() ? i.getEndValues().pos : D);
		e !== k && (o = k, k = e, Re(), fe(), pe(), H("change", k, o));
	}
	function fe() {
		if (!f) return;
		for (let e of f.querySelectorAll("[data-carousel-index]")) e.innerHTML = k + "";
		for (let e of f.querySelectorAll("[data-carousel-page]")) e.innerHTML = k + 1 + "";
		for (let e of f.querySelectorAll("[data-carousel-pages]")) e.innerHTML = I.length + "";
		let e = R("classes") || {}, t = Array.from(f.querySelectorAll("[data-carousel-go-to]")).filter((t) => t.closest(`.${e.container}`) === f);
		for (let e of t) parseInt(e.dataset?.carouselGoTo || "-1", 10) === k ? e.setAttribute("aria-current", "true") : e.removeAttribute("aria-current");
		for (let e of f.querySelectorAll("[data-carousel-go-prev]")) e.toggleAttribute("aria-disabled", !Ue()), Ue() ? e.removeAttribute("tabindex") : e.setAttribute("tabindex", "-1");
		for (let e of f.querySelectorAll("[data-carousel-go-next]")) e.toggleAttribute("aria-disabled", !We()), We() ? e.removeAttribute("tabindex") : e.setAttribute("tabindex", "-1");
		let n = !1, r = I[k]?.slides[0];
		r && (r.downloadSrc || r.type === "image" && r.src) && (n = !0);
		for (let e of f.querySelectorAll("[data-carousel-download]")) e.toggleAttribute("aria-disabled", !n);
	}
	function pe(e) {
		e ||= I[k]?.slides[0];
		let t = e?.el;
		if (t) for (let n of t.querySelectorAll("[data-slide-index]")) n.innerHTML = e.index + 1 + "";
	}
	function me(e) {
		if (!I.length) return 0;
		let t = G(), n = e;
		y ? n -= Math.floor((e - I[0]?.pos) / t) * t || 0 : n = S(I[0]?.pos, e, I[I.length - 1]?.pos);
		let r = /* @__PURE__ */ new Map(), i = 0;
		for (let e of I) {
			let a = Math.abs(e.pos - n), o = Math.abs(e.pos - n - t), s = Math.abs(e.pos - n + t), c = Math.min(a, o, s);
			r.set(i, c), i++;
		}
		let a = r.size > 0 ? [...r.entries()].reduce((e, t) => t[1] < e[1] ? t : e) : [k, 0];
		return parseInt(a[0]);
	}
	function he() {
		return L;
	}
	function ge() {
		return m;
	}
	function G(e = !0) {
		return F.length ? F.reduce((e, t) => e + t.dim, 0) + (F.length - (y && e ? 0 : 1)) * L : 0;
	}
	function ye(e) {
		let t = G(), n = ge();
		if (!t || !p || !n) return [];
		let r = [];
		e = e === void 0 ? D : e, y && (e -= Math.floor(e / t) * t || 0);
		let i = 0;
		for (let a of F) {
			let o = (t = 0) => {
				r.indexOf(a) > -1 || (a.pos = i - e + t || 0, a.offset + t > e - a.dim - h + .51 && a.offset + t < e + n + g - .51 && r.push(a));
			};
			a.offset = i, y && (o(t), o(-1 * t)), o(), i += a.dim + L;
		}
		return r;
	}
	function Te(e, t) {
		let n = [];
		for (let t of Array.isArray(e) ? e : [e]) {
			let e = Ee(Object.assign(Object.assign({}, t), { isVirtual: !0 }));
			e.el ||= document.createElement("div"), H("createSlide", e), n.push(e);
		}
		P.splice(t === void 0 ? P.length : t, 0, ...n), Ae();
		for (let e of n) H("addSlide", e), De(e);
		return ue(N), n;
	}
	function Ee(e) {
		return (_(e) || e instanceof HTMLElement) && (e = { html: e }), Object.assign({
			index: -1,
			el: void 0,
			class: "",
			isVirtual: !0,
			dim: 0,
			pos: 0,
			offset: 0,
			html: "",
			src: ""
		}, e);
	}
	function De(e) {
		let t = e.el;
		if (!e || !t) return;
		let n = e.html ? e.html instanceof HTMLElement ? e.html : x(e.html) : void 0;
		n && (B(n, "f-html"), e.htmlEl = n, B(t, "has-html"), t.append(n), H("contentReady", e));
	}
	function Oe(e) {
		if (!p || !e) return;
		let t = e.el;
		if (t) {
			if (t.setAttribute("index", e.index + ""), t.parentElement !== p) {
				let n;
				B(t, u.classes.slide), B(t, e.class), Re(e);
				for (let t of P) if (t.index > e.index) {
					n = t.el;
					break;
				}
				p.insertBefore(t, n && p.contains(n) ? n : null), H("attachSlideEl", e);
			}
			return pe(e), t;
		}
	}
	function ke(e) {
		let t = e?.el;
		t && (t.remove(), Me(t), H("detachSlideEl", e));
	}
	function Ae() {
		for (let e = 0; e < P.length; e++) {
			let t = P[e], n = t.el;
			n && (t.index !== e && Me(n), n.setAttribute("index", `${e}`)), t.index = e;
		}
	}
	function je() {
		var e;
		if (!f || !p) return;
		w = R("rtl"), T = R("vertical"), E = T ? "height" : "width";
		let t = R("classes");
		if (ce(f, t.isLTR, !w), ce(f, t.isRTL, w), ce(f, t.isHorizontal, !T), ce(f, t.isVertical, T), ce(f, t.hasAdaptiveHeight, R("adaptiveHeight")), m = 0, h = 0, g = 0, L = 0, p) {
			p.childElementCount || (p.style.display = "grid");
			let e = p.getBoundingClientRect();
			m = p.getBoundingClientRect()[E] || 0;
			let t = window.getComputedStyle(p);
			L = parseFloat(t.getPropertyValue("--f-carousel-gap")) || 0, t.getPropertyValue("overflow-" + (T ? "y" : "x")) === "visible" && (h = Math.abs(e[T ? "top" : "left"]), g = Math.abs(window[T ? "innerHeight" : "innerWidth"] - e[T ? "bottom" : "right"])), p.style.display = "";
		}
		if (!m) return;
		let n = function() {
			let e = 0;
			if (p) {
				let t = document.createElement("div");
				t.style.display = "block", B(t, u.classes.slide), p.appendChild(t), e = t.getBoundingClientRect()[E], t.remove(), t = void 0;
			}
			return e;
		}();
		for (let t of F) {
			let r = t.el, i = 0;
			if (!t.isVirtual && r && v(r)) {
				let t = !1;
				r.parentElement && r.parentElement === p || (p.appendChild(r), t = !0), i = r.getBoundingClientRect()[E], t && ((e = r.parentElement) == null || e.removeChild(r));
			} else i = n;
			t.dim = i;
		}
		if (y = !1, R("infinite")) {
			y = !0;
			let e = G(), t = m + h + g;
			for (let n = 0; n < F.length; n++) {
				let r = F[n]?.dim + L;
				if (e - r < t && e - r - t < r) {
					y = !1;
					break;
				}
			}
		}
		(function() {
			var e;
			if (!f) return;
			let t = ge(), n = G(!1), r = R("slidesPerPage");
			r = r === "auto" ? 1 / 0 : parseFloat(r + ""), I = [];
			let i = 0, a = 0;
			for (let n of F) (!I.length || i + n.dim - t > .05 || a >= r) && (I.push({
				index: I.length,
				slides: [],
				dim: 0,
				offset: 0,
				pos: 0
			}), i = 0, a = 0), (e = I[I.length - 1]) == null || e.slides.push(n), i += n.dim + L, a++;
			let o = R("center"), s = R("fill"), c = 0;
			for (let e of I) {
				e.dim = (e.slides.length - 1) * L;
				for (let t of e.slides) e.dim += t.dim;
				e.offset = c, e.pos = c, !1 !== o && (e.pos -= .5 * (t - e.dim)), s && !y && n > t && (e.pos = S(0, e.pos, n - t)), c += e.dim + L;
			}
			let l = [], u;
			for (let e of I) {
				let t = Object.assign({}, e);
				u && Math.abs(t.pos - u.pos) < .1 ? (u.dim += t.dim, u.slides = [...u.slides, ...t.slides]) : (u = t, t.index = l.length, l.push(t));
			}
			I = l, k = S(0, k, I.length - 1);
		})(), j = I[0]?.pos || 0, M = I[I.length - 1]?.pos || 0, c === 0 ? function() {
			o = void 0, k = R("initialPage");
			let e = R("initialSlide") || void 0;
			e !== void 0 && (k = Y.getPageIndex(e) || 0), k = S(0, k, I.length - 1), D = I[k]?.pos || 0, A = D;
		}() : A = I[k || 0]?.pos || 0, H("refresh"), fe();
	}
	function Me(e) {
		if (!e || !v(e)) return;
		let t = parseInt(e.getAttribute("index") || "-1"), n = "";
		for (let t of Array.from(e.classList)) {
			let e = t.match(/^f-(\w+)(Out|In)$/);
			e && e[1] && (n = e[1] + "");
		}
		if (!e || !n) return;
		let r = [
			`f-${n}Out`,
			`f-${n}In`,
			"to-prev",
			"to-next",
			"from-prev",
			"from-next"
		];
		e.removeEventListener("animationend", Pe), V(e, r.join(" ")), ne.delete(t);
	}
	function Ne() {
		if (!p) return;
		let e = ne.size > 0;
		for (let e of F) Me(e.el);
		ne.clear(), e && Ve();
	}
	function Pe(e) {
		e.animationName?.substring(0, 2) === "f-" && (Me(e.target), ne.size || (V(f, "in-transition"), !O && Math.abs(Y.getPosition(!0) - A) < .5 && (O = !0, H("settle"))), Ve());
	}
	function J(e) {
		Fe(e), H("click", e);
	}
	function Fe(e) {
		if (e.defaultPrevented) return;
		let t = e.composedPath()[0];
		if (t.closest("[data-carousel-go-prev]")) return be(e), void Y.prev();
		if (t.closest("[data-carousel-go-next]")) return be(e), void Y.next();
		let n = t.closest("[data-carousel-go-to]");
		if (n) return be(e), void Y.goTo(parseFloat(n.dataset.carouselGoTo || "") || 0);
		if (t.closest("[data-carousel-download]")) {
			be(e);
			let t = I[k]?.slides[0];
			if (t && (t.downloadSrc || t.type === "image" && t.src)) {
				let e = t.downloadFilename, n = document.createElement("a"), r = t.downloadSrc || t.src || "";
				n.href = r, n.target = "_blank", n.download = e || r, n.click();
			}
			return;
		}
	}
	function Ie(e) {
		var t;
		let n = e.el;
		n && ((t = n.querySelector(".f-spinner")) == null || t.remove());
	}
	function Le(e) {
		var t;
		let n = e.el;
		n && ((t = n.querySelector(".f-html.is-error")) == null || t.remove(), V(n, "has-error"));
	}
	function Re(e) {
		e ||= I[k]?.slides[0];
		let t = e?.el;
		if (!t) return;
		let n = R("formatCaption", e);
		n === void 0 && (n = e.caption), n ||= "";
		let r = R("captionEl");
		if (r && r instanceof HTMLElement) {
			if (e.index !== k) return;
			if (_(n) && (r.innerHTML = z(n + "")), n instanceof HTMLElement) {
				if (n.parentElement === r) return;
				r.innerHTML = "", n.parentElement && (n = n.cloneNode(!0)), r.append(n);
			}
			return;
		}
		if (!n) return;
		let i = e.captionEl || t.querySelector(".f-caption");
		!i && n instanceof HTMLElement && n.classList.contains("f-caption") && (i = n), i || (i = document.createElement("div"), B(i, "f-caption"), _(n) ? i.innerHTML = z(n + "") : n instanceof HTMLElement && (n.parentElement && (n = n.cloneNode(!0)), i.append(n)));
		let a = `f-caption-${Ce}_${e.index}`;
		i.setAttribute("id", a), i.dataset.selectable = "true", B(t, "has-caption"), t.setAttribute("aria-labelledby", a), e.captionEl = i, t.insertAdjacentElement("beforeend", i);
	}
	function ze(e, t = {}) {
		let { transition: n, tween: r } = Object.assign({
			transition: u.transition,
			tween: u.tween
		}, t || {});
		if (!f || !i) return;
		let a = I.length;
		if (!a || function(e, t) {
			if (!(f && m && i && t && _(t) && t !== "tween")) return !1;
			for (let e of re) if (m - e.dim > .5) return !1;
			if (h > .5 || g > .5) return;
			let n = I.length, r = e > k ? 1 : -1;
			e = y ? (e % n + n) % n : S(0, e, n - 1), w && (r *= -1);
			let a = I[k]?.slides[0], o = a?.index, s = I[e]?.slides[0], c = s?.index, l = I[e]?.pos;
			if (c === void 0 || o === void 0 || o === c || D === l || Math.abs(m - (s?.dim || 0)) > 1) return !1;
			O = !1, i.pause(), Ne(), B(f, "in-transition"), D = A = l;
			let d = Oe(a), p = Oe(s);
			return de(), d && (ne.add(o), d.style.transform = "", d.addEventListener("animationend", Pe), V(d, u.classes.isSelected), d.inert = !1, B(d, `f-${t}Out to-${r > 0 ? "next" : "prev"}`)), p && (ne.add(c), p.style.transform = "", p.addEventListener("animationend", Pe), B(p, u.classes.isSelected), p.inert = !1, B(p, `f-${t}In from-${r > 0 ? "prev" : "next"}`)), Ve(), !0;
		}(e, n)) return;
		e = y ? (e % a + a) % a : S(0, e, a - 1), A = I[e || 0]?.pos || 0;
		let s = i.isRunning() ? i.getEndValues().pos : D;
		if (Math.abs(A - s) < 1) return D = A, k !== e && (Re(), o = k, k = e, fe(), pe(), H("change", k, o)), Ve(), void (O || (O = !0, H("settle")));
		if (i.pause(), Ne(), y) {
			let e = G(), t = Math.floor((s - I[0]?.pos) / e) || 0, n = A + t * e;
			A = [
				n + e,
				n,
				n - e
			].reduce(function(e, t) {
				return Math.abs(t - s) < Math.abs(e - s) ? t : e;
			});
		}
		!1 !== n && C(r) ? i.spring(_e({}, u.tween, r)).from({ pos: D }).to({ pos: A }).start() : (D = A, de(), Ve(), O || (O = !0, H("settle")));
	}
	function Be(e) {
		let t = D;
		if (y && !0 !== e) {
			let e = G();
			t -= (Math.floor((D - I[0]?.pos || 0) / e) || 0) * e;
		}
		return t;
	}
	function Ve() {
		if (!f || !p) return;
		re = ye();
		let e = /* @__PURE__ */ new Set(), t = [], n = I[k], r = u.setTransform, i;
		for (let r of F) {
			let a = ne.has(r.index), o = re.indexOf(r) > -1, s = (n?.slides)?.indexOf(r) > -1;
			if (r.isVirtual && !a && !o) continue;
			let c = Oe(r);
			if (c && (t.push(r), s && e.add(c), R("adaptiveHeight") && s)) {
				let e = (c.lastElementChild || c).getBoundingClientRect().height;
				i = i == null ? e : Math.max(i, e);
			}
		}
		p && i && (p.style.height = `${i}px`), [...K(p, `.${u.classes.slide}`)].forEach((t) => {
			ce(t, u.classes.isSelected, e.has(t));
			let n = P[parseInt(t.getAttribute("index") || "-1")];
			if (!n) return t.remove(), void Me(t);
			let i = ne.has(n.index), a = re.indexOf(n) > -1;
			if (n.isVirtual && !i && !a) return void ke(n);
			if (t.inert = !a, !1 === r) return;
			let o = n.pos ? Math.round(1e4 * n.pos) / 1e4 : 0, s = 0, c = 0, l = 0, d = 0;
			i || (s = T ? 0 : w ? -1 * o : o, c = T ? o : 0, l = ve(s, 0, n.dim, 0, 100), d = ve(c, 0, n.dim, 0, 100)), r instanceof Function && !i ? r(Y, n, {
				x: s,
				y: c,
				xPercent: l,
				yPercent: d
			}) : t.style.transform = s || c ? `translate3d(${l}%, ${d}%,0)` : "";
		}), H("render", t);
	}
	function He() {
		f?.removeEventListener("click", J), document.removeEventListener("mousemove", le), ne.clear(), a?.disconnect(), a = void 0;
		for (let e of P) {
			let t = e.el;
			t && v(t) && (e.state = void 0, Ie(e), Le(e), e.isVirtual ? (ke(e), e.el = void 0) : (Me(t), t.style.transform = "", p && !p.contains(t) && p.appendChild(t)));
		}
		for (let e of Object.values(d)) e?.destroy();
		d = {}, r?.destroy(), r = void 0, i?.destroy(), i = void 0;
		for (let [e, t] of Object.entries(u.classes || {})) e !== "container" && V(f, t);
		V(p, "is-draggable");
	}
	function Ue() {
		return y || k > 0;
	}
	function We() {
		return y || k < I.length - 1;
	}
	let Y = {
		add: function(e, t) {
			let n = D, r = k, a = G(), o = i?.isRunning() ? i.getEndValues().pos : D, s = a && Math.floor((o - (I[0]?.pos || 0)) / a) || 0;
			return Te(e, t), ue(N), je(), i && a && (r === k && (n -= s * a), n === A ? D = A : i.spring({
				clamp: !0,
				mass: 1,
				tension: 300,
				friction: 25,
				restDelta: 1,
				restSpeed: 1
			}).from({ pos: n }).to({ pos: A }).start()), Ve(), Y;
		},
		canGoPrev: Ue,
		canGoNext: We,
		destroy: function() {
			return H("destroy"), window.removeEventListener("resize", U), He(), se.clear(), f = null, I = [], P = [], u = Object.assign({}, xe), d = {}, F = [], s = void 0, N = "*", c = 2, Y;
		},
		emit: H,
		filter: function(e = "*") {
			return ue(e), je(), D = S(j, D, M), Ve(), H("filter", e), Y;
		},
		getContainer: function() {
			return f;
		},
		getGapDim: he,
		getGestures: function() {
			return r;
		},
		getLastMouseMove: function() {
			return Se;
		},
		getOption: function(e) {
			return R(e);
		},
		getOptions: function() {
			return u;
		},
		getPage: function() {
			return I[k];
		},
		getPageIndex: function(e) {
			if (e !== void 0) {
				for (let t of I || []) for (let n of t.slides) if (n.index === e) return t.index;
				return -1;
			}
			return k;
		},
		getPageIndexFromPosition: me,
		getPageProgress: function(e, t) {
			e === void 0 && (e = k);
			let n = I[e];
			if (!n) return e > k ? -1 : 1;
			let r = G(), i = he(), a = n.pos, o = Be();
			if (y && !0 !== t) {
				let e = Math.floor((o - I[0]?.pos) / r) || 0;
				o -= e * r, a = [
					a + r,
					a,
					a - r
				].reduce(function(e, t) {
					return Math.abs(t - o) < Math.abs(e - o) ? t : e;
				});
			}
			return (o - a) / (n.dim + i) || 0;
		},
		getPageVisibility: function(e) {
			e === void 0 && (e = k);
			let t = I[e];
			if (!t) return e > k ? -1 : 1;
			let n = Be(), r = ge(), i = t.pos;
			if (y) {
				let e = G(), t = i + (Math.floor((n - I[0]?.pos) / e) || 0) * e;
				i = [
					t + e,
					t,
					t - e
				].reduce(function(e, t) {
					return Math.abs(t - n) < Math.abs(e - n) ? t : e;
				});
			}
			return i > n && i + t.dim < n + r ? 1 : i < n ? (i + t.dim - n) / t.dim || 0 : i + t.dim > n + r && (n + r - i) / t.dim || 0;
		},
		getPages: function() {
			return I;
		},
		getPlugins: function() {
			return d;
		},
		getPosition: Be,
		getSlides: function() {
			return P;
		},
		getState: function() {
			return c;
		},
		getTotalSlideDim: G,
		getTween: function() {
			return i;
		},
		getViewport: function() {
			return p;
		},
		getViewportDim: ge,
		getVisibleSlides: function(e) {
			return e === void 0 ? re : ye(e);
		},
		goTo: ze,
		hasNavigated: function() {
			return o !== void 0;
		},
		hideError: Le,
		hideLoading: Ie,
		init: function() {
			if (!e || !v(e)) throw Error("No Element found");
			return c !== 0 && (He(), c = 0), f = e, l = t, window.removeEventListener("resize", U), l.breakpoints && window.addEventListener("resize", U), U(), Y;
		},
		isInfinite: function() {
			return y;
		},
		isInTransition: function() {
			return ne.size > 0;
		},
		isRTL: function() {
			return w;
		},
		isSettled: function() {
			return O;
		},
		isVertical: function() {
			return T;
		},
		localize: z,
		next: function(e = {}) {
			return ze(k + 1, e), Y;
		},
		off: function(e, t) {
			for (let n of e instanceof Array ? e : [e]) se.has(n) && se.set(n, se.get(n).filter((e) => e !== t));
			return Y;
		},
		on: function(e, t) {
			for (let n of e instanceof Array ? e : [e]) se.set(n, [...se.get(n) || [], t]);
			return Y;
		},
		prev: function(e = {}) {
			return ze(k - 1, e), Y;
		},
		reInit: function(e = {}, r) {
			return He(), c = 0, s = void 0, N = "*", t = e, l = e, C(r) && (n = r), U(), Y;
		},
		remove: function(e) {
			e === void 0 && (e = P.length - 1);
			let t = P[e];
			return t && (H("removeSlide", t), t.el &&= (Me(t.el), t.el.remove(), void 0), P.splice(e, 1), ue(N), je(), D = S(j, D, M), Ve()), Y;
		},
		setPosition: function(e) {
			D = e, de(), Ve();
		},
		showError: function(e, t) {
			if (c === 1) {
				Ie(e), Le(e);
				let n = e.el;
				if (n) {
					let r = document.createElement("div");
					B(r, "f-html"), B(r, "is-error"), r.innerHTML = z(t || "<p>{{ERROR}}</p>"), e.htmlEl = r, B(n, "has-html has-error"), n.insertAdjacentElement("afterbegin", r), H("contentReady", e);
				}
			}
			return Y;
		},
		showLoading: function(e) {
			let t = e.el, n = t?.querySelector(".f-spinner");
			if (!t || n) return Y;
			let r = x(R("spinnerTpl"));
			return r && (B(r, "f-spinner"), t.insertAdjacentElement("beforeend", r)), Y;
		},
		version: "6.1.14"
	};
	return Y;
};
we.l10n = { en_EN: ye }, we.getDefaults = () => xe;
//#endregion
//#region node_modules/@fancyapps/ui/dist/utils/scrollLock.js
var Te = (e = !0, t = "--f-scrollbar-compensate", n = "--f-body-margin", r = "hide-scrollbar") => {
	let i = document, a = i.body, o = i.documentElement;
	if (e) {
		if (a.classList.contains(r)) return;
		let e = window.innerWidth - o.getBoundingClientRect().width;
		e < 0 && (e = 0), o.style.setProperty(t, `${e}px`);
		let i = parseFloat(window.getComputedStyle(a).marginRight);
		i && a.style.setProperty(n, `${i}px`), a.classList.add(r);
	} else a.classList.remove(r), a.style.setProperty(n, ""), i.documentElement.style.setProperty(t, "");
};
//#endregion
//#region node_modules/@fancyapps/ui/dist/utils/canUseDOM.js
function Ee() {
	return !(typeof window > "u" || !window.document || !window.document.createElement);
}
//#endregion
//#region node_modules/@fancyapps/ui/dist/utils/replaceAll.js
var De = function(e = "", t = "", n = "") {
	return e.split(t).join(n);
}, Oe = { tpl: (e) => `<img class="f-panzoom__content" \n    ${e.srcset ? "data-lazy-srcset=\"{{srcset}}\"" : ""} \n    ${e.sizes ? "data-lazy-sizes=\"{{sizes}}\"" : ""} \n    data-lazy-src="{{src}}" alt="{{alt}}" />` }, ke = () => {
	let e;
	function t(t, n) {
		let r = e?.getOptions().Zoomable, i = (C(r) ? Object.assign(Object.assign({}, Oe), r) : Oe)[t];
		return i && typeof i == "function" && n ? i(n) : i;
	}
	function n() {
		e && !1 !== e.getOptions().Zoomable && (e.on("addSlide", a), e.on("removeSlide", o), e.on("attachSlideEl", s), e.on("click", i), e.on("change", r), e.on("ready", r));
	}
	function r() {
		c();
		let t = e?.getVisibleSlides() || [];
		if (t.length > 1 || e?.getOption("transition") === "slide") for (let n of t) {
			let t = n.panzoomRef;
			t && (e?.getPage().slides || []).indexOf(n) < 0 && t.execute(W.ZoomTo, Object.assign({}, t.getStartPosition()));
		}
	}
	function i(e, t) {
		let n = t.target;
		n && !t.defaultPrevented && n.dataset.panzoomAction && l(n.dataset.panzoomAction);
	}
	function a(n, r) {
		let i = r.el;
		if (!e || !i || r.panzoomRef) return;
		let a = r.src || r.lazySrc || "", o = r.alt || r.caption || `Image #${r.index}`, s = r.srcset || r.lazySrcset || "", l = r.sizes || r.lazySizes || "";
		if (a && _(a) && !r.html && (!r.type || r.type === "image")) {
			r.type = "image", r.thumbSrc = r.thumbSrc || a;
			let e = t("tpl", r);
			e = De(e, "{{src}}", a + ""), e = De(e, "{{srcset}}", s + ""), e = De(e, "{{sizes}}", l + ""), i.insertAdjacentHTML("afterbegin", e);
		}
		let u = i.querySelector(".f-panzoom__content");
		if (!u) return;
		u.setAttribute("alt", o + "");
		let d = r.width && r.width !== "auto" ? parseFloat(r.width + "") : "auto", f = r.height && r.height !== "auto" ? parseFloat(r.height + "") : "auto", p = G(i, Object.assign({
			width: d,
			height: f,
			classes: { container: "f-zoomable" },
			event: () => e?.getLastMouseMove(),
			spinnerTpl: () => e?.getOption("spinnerTpl") || ""
		}, t("Panzoom")));
		p.on("*", (t, n, ...i) => {
			e && (n === "loading" && (r.state = 0), n === "loaded" && (r.state = 1), n === "error" && (r.state = 2, e?.showError(r, "{{IMAGE_ERROR}}")), e.emit(`panzoom:${n}`, r, ...i), n === "loading" && e.emit("contentLoading", r), n === "ready" && e.emit("contentReady", r), r.index === e?.getPageIndex() && c());
		}), r.panzoomRef = p;
	}
	function o(e, t) {
		t.panzoomRef &&= (t.panzoomRef.destroy(), void 0);
	}
	function s(e, t) {
		let n = t.panzoomRef;
		if (n) switch (n.getState()) {
			case 0:
				n.init();
				break;
			case 3: n.execute(W.ZoomTo, Object.assign(Object.assign({}, n.getStartPosition()), { velocity: 0 }));
		}
	}
	function c() {
		let t = e?.getContainer() || void 0, n = (e?.getPage())?.slides[0]?.panzoomRef;
		if (t) {
			if (n) n.updateControls(t);
			else for (let e of t.querySelectorAll("[data-panzoom-action]") || []) e.setAttribute("aria-disabled", ""), e.setAttribute("tabindex", "-1");
		}
	}
	function l(t, ...n) {
		var r;
		(r = e?.getPage().slides[0].panzoomRef) == null || r.execute(t, ...n);
	}
	return {
		init: function(t) {
			e = t, e.on("initPlugins", n);
		},
		destroy: function() {
			if (e) {
				e.off("initPlugins", n), e.off("addSlide", a), e.off("removeSlide", o), e.off("attachSlideEl", s), e.off("click", i), e.off("change", r), e.off("ready", r);
				for (let t of e.getSlides()) o(0, t);
			}
			e = void 0;
		},
		execute: l
	};
}, Ae = {
	syncOnChange: !1,
	syncOnClick: !0,
	syncOnHover: !1
}, je = () => {
	let e, t;
	function n() {
		let t = e?.getOptions().Sync;
		return C(t) ? Object.assign(Object.assign({}, Ae), t) : Ae;
	}
	function r(r) {
		var i;
		e && r && (t = r, e.getOptions().classes = Object.assign(Object.assign({}, e.getOptions().classes), { isSelected: "" }), e.getOptions().initialSlide = t.getPage()?.slides[0]?.index || 0, n().syncOnChange && e.on("change", o), n().syncOnClick && e.on("click", c), n().syncOnHover && ((i = e.getViewport()) == null || i.addEventListener("mouseover", l)), function() {
			!e || !t || (e.on("ready", a), e.on("refresh", u), t.on("change", s), t.on("filter", d));
		}());
	}
	function i() {
		let t = n().target;
		e && t && r(t);
	}
	function a() {
		f();
	}
	function o() {
		if (e && t) {
			let n = e.getPage()?.slides || [], r = t.getPageIndex(n[0].index || 0);
			r > -1 && t.goTo(r, e.hasNavigated() ? void 0 : {
				tween: !1,
				transition: !1
			}), f();
		}
	}
	function s() {
		if (e && t) {
			let n = e.getPageIndex(t.getPage()?.slides[0].index || 0);
			n > -1 && e.goTo(n, t.hasNavigated() ? void 0 : {
				tween: !1,
				transition: !1
			}), f();
		}
	}
	function c(n, r) {
		if (!e || !t || e.getTween()?.isRunning()) return;
		let i = e?.getOptions().classes.slide;
		if (!i) return;
		let a = r.target.closest(`.${i}`);
		if (a) {
			let e = parseInt(a.getAttribute("index") || "") || 0, n = t.getPageIndex(e);
			t.goTo(n);
		}
	}
	function l(t) {
		e && c(0, t);
	}
	function u() {
		if (e && t) {
			let n = e.getPageIndex(t.getPage()?.slides[0].index || 0);
			n > -1 && e.goTo(n, {
				tween: !1,
				transition: !1
			}), f();
		}
	}
	function d(n, r) {
		e && t && (e.filter(r), s());
	}
	function f() {
		var n;
		if (!t) return;
		let r = t.getPage()?.slides[0]?.index || 0;
		for (let t of e?.getSlides() || []) (n = t.el) == null || n.classList.toggle("is-selected", t.index === r);
	}
	return {
		init: function(t) {
			e = t, e.on("initSlides", i);
		},
		destroy: function() {
			var n;
			e?.off("ready", a), e?.off("refresh", u), e?.off("change", o), e?.off("click", c), (n = e?.getViewport()) == null || n.removeEventListener("mouseover", l), t?.off("change", s), t?.off("filter", d), t = void 0, e?.off("initSlides", i), e = void 0;
		},
		getTarget: function() {
			return t;
		}
	};
}, Me = {
	showLoading: !0,
	preload: 1
}, Ne = "is-lazyloading", Pe = "is-lazyloaded", J = "has-lazyerror", Fe = () => {
	let e;
	function t() {
		let t = e?.getOptions().Lazyload;
		return C(t) ? Object.assign(Object.assign({}, Me), t) : Me;
	}
	function n(n) {
		let r = n.el;
		if (!r) return;
		let i = t(), a = "[data-lazy-src],[data-lazy-srcset],[data-lazy-bg]", o = Array.from(r.querySelectorAll(a));
		r.matches(a) && o.push(r);
		for (let t of o) {
			let r = t.dataset.lazySrc, a = t.dataset.lazySrcset, o = t.dataset.lazySizes, s = t.dataset.lazyBg, c = (t instanceof HTMLImageElement || t instanceof HTMLSourceElement) && (r || a), l = !!s;
			if (!c && !l) continue;
			let u = r || a || s;
			if (u) {
				if (c) {
					let s = t.parentElement?.classList.contains("f-panzoom__wrapper");
					i.showLoading && e?.showLoading(n), t.addEventListener("load", () => {
						e?.hideLoading(n), V(t, J), t instanceof HTMLImageElement ? t.decode().finally(() => {
							V(t, Ne), B(t, Pe);
						}).catch(() => {}) : (V(t, Ne), B(t, Pe)), s || e == null || e.emit("lazyLoad:loaded", n, t, u);
					}), t.addEventListener("error", () => {
						e?.hideLoading(n), V(t, Ne), B(t, J), s || e == null || e.emit("lazyLoad:error", n, t, u);
					}), t.classList.add("f-lazyload"), t.classList.add(Ne), s || e == null || e.emit("lazyLoad:load", n, t, u), r && (t.src = r), a && (t.srcset = a), o && (t.sizes = o);
				} else l && (t.style.backgroundImage = `url('${s}')`);
				delete t.dataset.lazySrc, delete t.dataset.lazySrcset, delete t.dataset.lazySizes, delete t.dataset.lazyBg;
			}
		}
	}
	function r() {
		if (!e) return;
		let r = [...e.getVisibleSlides()], i = t().preload;
		if (i > 0) {
			let t = e.getPosition(), n = e.getViewportDim();
			r.push(...e.getVisibleSlides(t + n * i), ...e.getVisibleSlides(t - n * i));
		}
		for (let e of r) n(e);
	}
	return {
		init: function(t) {
			e = t, e.on("render", r);
		},
		destroy: function() {
			e?.off("render", r), e = void 0;
		}
	};
}, Ie = {
	prevTpl: "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" tabindex=\"-1\"><path d=\"M15 3l-9 9 9 9\"></path></svg>",
	nextTpl: "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" tabindex=\"-1\"><path d=\"M9 3l9 9-9 9\"></path></svg>"
}, Le = () => {
	let e, t, n;
	function r(t) {
		let n = function() {
			let t = e?.getOptions().Arrows;
			return C(t) ? Object.assign(Object.assign({}, Ie), t) : Ie;
		}(), r = `<button data-carousel-go-${t} tabindex="0" class="f-button is-arrow is-${t}" title="{{${t.toUpperCase()}}}">` + n[`${t}Tpl`] + "</button>", i = x(e.localize(r)) || void 0;
		return i && B(i, n[`${t}Class`]), i;
	}
	function i() {
		var r;
		t?.remove(), t = void 0, n?.remove(), n = void 0, (r = e?.getContainer()) == null || r.classList.remove("has-arrows");
	}
	function a() {
		e && !1 !== e.getOptions().Arrows && e.getPages().length > 1 ? (function() {
			if (!e) return;
			let i = e.getViewport();
			i && (t || (t = r("prev"), t && i.insertAdjacentElement("beforebegin", t)), n || (n = r("next"), n && i.insertAdjacentElement("afterend", n)), ce(e.getContainer(), "has-arrows", !0));
		}(), e && (t?.toggleAttribute("aria-disabled", !e.canGoPrev()), n?.toggleAttribute("aria-disabled", !e.canGoNext()))) : i();
	}
	return {
		init: function(t) {
			e = t.on(["change", "refresh"], a);
		},
		destroy: function() {
			i(), e?.off(["change", "refresh"], a), e = void 0;
		}
	};
}, Re = "<circle cx=\"11\" cy=\"11\" r=\"7.5\"/><path d=\"m21 21-4.35-4.35M8 11h6\"/>", ze = "<g><line x1=\"11\" y1=\"8\" x2=\"11\" y2=\"14\"></line></g><circle cx=\"11\" cy=\"11\" r=\"7.5\"/><path d=\"m21 21-4.35-4.35M8 11h6\"/>", Be = {
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
		Re
	],
	zoomIn: [
		"zoomIn",
		"ZOOM_IN",
		ze
	],
	toggleFull: [
		"toggleFull",
		"TOGGLE_FULL",
		ze
	],
	iterateZoom: [
		"iterateZoom",
		"ITERATE_ZOOM",
		ze
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
}, Ve = {};
for (let e of Object.keys(Be)) {
	let t = Be[e];
	Ve[e] = { tpl: `<button data-panzoom-action="${t[0]}" class="f-button" title="{{${t[1]}}}"><svg>${t[2]}</svg></button>` };
}
//#endregion
//#region node_modules/@fancyapps/ui/dist/carousel/carousel.toolbar.js
var He;
(function(e) {
	e.Left = "left", e.middle = "middle", e.right = "right";
})(He ||= {});
var Ue = Object.assign({
	counter: { tpl: "<div class=\"f-counter\"><span data-carousel-page></span>/<span data-carousel-pages></span></div>" },
	download: { tpl: "<button data-carousel-download class=\"f-button\" title=\"{{DOWNLOAD}}\"><svg><path d=\"M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5 5-5M12 4v12\"/></svg></button>" },
	autoplay: { tpl: "<button data-autoplay-action=\"toggle\" class=\"f-button\" title=\"{{TOGGLE_AUTOPLAY}}\"><svg><g><path d=\"M5 3.5 19 12 5 20.5Z\"/></g><g><path d=\"M8 4v15M17 4v15\"/></g></svg></button>" },
	thumbs: { tpl: "<button data-thumbs-action=\"toggle\" class=\"f-button\" title=\"{{TOGGLE_THUMBS}}\"><svg><rect width=\"18\" height=\"14\" x=\"3\" y=\"3\" rx=\"2\"/><path d=\"M4 21h1M9 21h1M14 21h1M19 21h1\"/></svg></button>" }
}, Ve), We = {
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
}, Y = () => {
	let e, t;
	function n(t) {
		let n = e?.getOptions().Toolbar, r = (C(n) ? Object.assign(Object.assign({}, We), n) : We)[t];
		return r && typeof r == "function" && e ? r(e) : r;
	}
	function r() {
		if (!e || t || !1 === e?.getOptions().Toolbar) return;
		let r = e.getContainer();
		if (!r) return;
		let i = n("enabled");
		if (!i) return;
		let a = n("absolute"), o = e.getSlides().length > 1, s = !1, c = !1;
		for (let t of e.getSlides()) t.panzoomRef && (s = !0), (t.downloadSrc || t.type === "image" && t.src) && (c = !0);
		let l = e.getPlugins().Thumbs?.isEnabled() || !1, u = o && e.getPlugins().Autoplay || !1, d = e.getPlugins().Fullscreen && (document.fullscreenEnabled || document.webkitFullscreenEnabled);
		if (i === "auto" && (i = s), !i) return;
		t = r.querySelector(".f-carousel__toolbar") || void 0, t || (t = document.createElement("div"), B(t, "f-carousel__toolbar"));
		let f = n("display"), p = _e({}, Ue, n("items"));
		for (let n of [
			"left",
			"middle",
			"right"
		]) {
			let r = f[n] || [], i = document.createElement("div");
			B(i, `f-carousel__toolbar__column is-${n}`);
			for (let t of r) {
				let n;
				if (_(t)) {
					if (t === "counter" && !o || t === "autoplay" && !u || Ve[t] && !s || t === "fullscreen" && !d || t === "thumbs" && !l || t === "download" && !c) continue;
					n = p[t];
				}
				if (C(t) && (n = t), n && n.tpl) {
					let t = e.localize(n.tpl);
					t = t.split("<svg>").join("<svg tabindex=\"-1\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">");
					let r = x(t);
					r && (typeof n.click == "function" && e && r.addEventListener("click", (t) => {
						t.preventDefault(), t.stopPropagation(), typeof n.click == "function" && e && n.click(e, t);
					}), i.append(r));
				}
			}
			t.append(i);
		}
		if (t.childElementCount) {
			if (a && B(t, "is-absolute"), !t.parentElement) {
				let e = n("parentEl");
				e ? e.insertAdjacentElement("afterbegin", t) : r.insertAdjacentElement("afterbegin", t);
			}
			r.contains(t) && (B(r, "has-toolbar"), a && B(r, "has-absolute-toolbar"));
		}
	}
	return {
		init: function(t) {
			e = t, e?.on("initSlides", r);
		},
		destroy: function() {
			e?.off("initSlides", r), V(e?.getContainer(), "has-toolbar has-absolute-toolbar"), t?.remove(), t = void 0;
		},
		add: function(e, t) {
			Ue[e] = t;
		},
		isEnabled: function() {
			return !!t;
		}
	};
}, Ge = {
	autoStart: !0,
	pauseOnHover: !0,
	showProgressbar: !0,
	timeout: 2e3
}, Ke = () => {
	let e, t, n = !1, r = !1, i = !1, a = null;
	function o(t) {
		let n = e?.getOptions().Autoplay, r = (C(n) ? Object.assign(Object.assign({}, Ge), n) : Ge)[t];
		return r && typeof r == "function" && e ? r(e) : r;
	}
	function s() {
		clearTimeout(t), t = void 0;
	}
	function c() {
		if (!e || !n || i || r || t || !e.isSettled() || function() {
			let t = e?.getPage()?.slides || [];
			for (let e of t) if (e.state === 0) return !0;
			return !1;
		}()) return;
		(function() {
			var t;
			if (!e || (d(), !o("showProgressbar"))) return;
			let n = o("progressbarParentEl");
			if (!n && (t = e.getPlugins().Toolbar) != null && t.isEnabled() && (n = e.getContainer()), !n && !0 !== e.getPlugins().Toolbar?.isEnabled()) {
				let t = e.getPages()[0]?.slides || [], r = e.getPage()?.slides || [];
				t.length === 1 && r.length === 1 && (n = r[0].el);
			}
			if (n ||= e.getViewport(), !n) return;
			a = document.createElement("div"), B(a, "f-progressbar"), n.prepend(a);
			let r = o("timeout") || 1e3;
			a.style.animationDuration = `${r}ms`;
		})();
		let s = o("timeout");
		t = setTimeout(() => {
			e && n && !r && (e.isInfinite() || e.getPageIndex() !== e.getPages().length - 1 ? e.next() : e.goTo(0));
		}, s);
	}
	function l() {
		var t;
		if (!e || e.getPages().length < 2 || !1 === e.getOptions().Autoplay || n) return;
		n = !0, e.emit("autoplay:start", o("timeout")), B(e.getContainer(), "has-autoplay"), (t = e.getTween()) == null || t.on("start", _);
		let r = e?.getContainer();
		r && o("pauseOnHover") && matchMedia("(hover: hover)").matches && (r.addEventListener("mouseenter", v, !1), r.addEventListener("mouseleave", y, !1)), e.on("change", h), e.on("settle", g), e.on("contentReady", p), e.on("panzoom:touchStart", u), e.on("panzoom:wheel", u), e.isSettled() && c();
	}
	function u() {
		var t;
		if (s(), d(), e) {
			if (n) {
				e.emit("autoplay:end"), (t = e.getTween()) == null || t.off("start", _);
				let n = e.getContainer();
				n && (n.classList.remove("has-autoplay"), n.removeEventListener("mouseenter", v, !1), n.removeEventListener("mouseleave", y, !1));
			}
			e.off("change", h), e.off("settle", g), e.off("contentReady", p), e.off("panzoom:touchStart", u), e.off("panzoom:wheel", u);
		}
		n = !1, r = !1;
	}
	function d() {
		a &&= (a.remove(), null);
	}
	function f() {
		e && e.getPages().length > 1 && o("autoStart") && l();
	}
	function p() {
		c();
	}
	function m(e, t) {
		let n = t.target;
		n && !t.defaultPrevented && n.dataset.autoplayAction === "toggle" && b.toggle();
	}
	function h() {
		!e || !e?.isInfinite() && e.getPageIndex() === e.getPages().length - 1 ? u() : (s(), d());
	}
	function g() {
		c();
	}
	function _() {
		s(), d();
	}
	function v() {
		i = !0, n && (s(), d());
	}
	function y() {
		i = !1, n && !r && e != null && e.isSettled() && c();
	}
	let b = {
		init: function(t) {
			e = t, e.on("ready", f), e.on("click", m);
		},
		destroy: function() {
			u(), e?.off("ready", f), e?.off("click", m), e = void 0;
		},
		isEnabled: () => n,
		pause: function() {
			r = !0, s(), d();
		},
		resume: function() {
			r = !1, n && !i && c();
		},
		start() {
			l();
		},
		stop() {
			u();
		},
		toggle() {
			n ? u() : l();
		}
	};
	return b;
}, qe = {
	Carousel: { Lazyload: { showLoading: !1 } },
	minCount: 2,
	showOnStart: !0,
	thumbTpl: "<button aria-label=\"Slide to #{{page}}\"><img draggable=\"false\" alt=\"{{alt}}\" data-lazy-src=\"{{src}}\" /></button>",
	type: "modern"
}, Je, Ye = () => {
	let e, t, n, r, i, a = 0, o = 0, s = !0;
	function c(t) {
		let n = e?.getOptions().Thumbs, r = (C(n) ? Object.assign(Object.assign({}, qe), n) : qe)[t];
		return r && typeof r == "function" && e ? r(e) : r;
	}
	function l() {
		if (!e || !1 === e?.getOptions().Thumbs) return !1;
		let t = 0;
		for (let n of e.getSlides()) n.thumbSrc && t++;
		return t >= c("minCount");
	}
	function u() {
		return c("type") === "modern";
	}
	function d() {
		return c("type") === "scrollable";
	}
	function f() {
		let t = [], n = e?.getSlides() || [];
		for (let e of n) t.push({
			index: e.index,
			class: e.thumbClass,
			html: p(e)
		});
		return t;
	}
	function p(e) {
		let t = e.thumb ? e.thumb instanceof HTMLImageElement ? e.thumb.src : e.thumb : e.thumbSrc || void 0, n = e.thumbAlt === void 0 ? `Thumbnail #${(e.index || 0) + 1}` : e.thumbAlt + "", r = c("thumbTpl");
		return r = De(r, "{{alt}}", n), r = De(r, "{{src}}", t + ""), r = De(r, "{{index}}", `${e.index || 0}`), r = De(r, "{{page}}", `${(e.index || 0) + 1}`), r;
	}
	function m(e) {
		return `<div index="${e.index || 0}" class="f-thumbs__slide ${e.class || ""}">${e.html || ""}</div>`;
	}
	function h(t = !1) {
		let r = e?.getContainer();
		if (!e || !r || n || !l()) return;
		let i = c("Carousel")?.classes || {};
		if (i.container = i.container || "f-thumbs", !n) {
			let e = r.nextElementSibling;
			e != null && e.classList.contains(i.container) && (n = e);
		}
		if (!n) {
			n = document.createElement("div");
			let e = c("parentEl");
			e ? e.insertAdjacentElement("beforeend", n) : r.insertAdjacentElement("afterend", n);
		}
		B(n, i.container), B(n, "f-thumbs"), B(n, `is-${c("type")}`), t && B(n, "is-hidden");
	}
	function g() {
		if (!n || !d()) return;
		r = document.createElement("div"), B(r, "f-thumbs__viewport");
		let t = "";
		for (let e of f()) typeof (e.html || "") == "string" && (t += m(e));
		r.innerHTML = t, n.append(r), n.addEventListener("click", (t) => {
			t.preventDefault();
			let n = t.target.closest("[index]"), r = parseInt(n?.getAttribute("index") || "-1");
			e && r > -1 && e.goTo(r);
		}), i = new IntersectionObserver((e) => {
			e.forEach((e) => {
				e.isIntersecting && e.target instanceof HTMLImageElement && (e.target.src = e.target.getAttribute("data-lazy-src") + "", e.target.removeAttribute("data-lazy-src"), i?.unobserve(e.target));
			});
		}, {
			root: r,
			rootMargin: "100px"
		}), n.querySelectorAll("[data-lazy-src]").forEach((e) => {
			i?.observe(e);
		}), e?.emit("thumbs:ready");
	}
	function _() {
		var r;
		if (!Je || !e || !n || d() || t) return;
		let i = f();
		if (!i.length) return;
		let l = _e({}, {
			Sync: { target: e },
			Lazyload: { preload: 1 },
			slides: i,
			classes: {
				container: "f-thumbs",
				viewport: "f-thumbs__viewport",
				slide: "f-thumbs__slide"
			},
			center: !0,
			fill: !u(),
			infinite: !1,
			dragFree: !0,
			rtl: e.getOptions().rtl || !1,
			slidesPerPage: (e) => {
				let t = 0;
				return u() && (function() {
					if (!u() || !n) return;
					let e = (e) => n && parseFloat(getComputedStyle(n).getPropertyValue("--f-thumb-" + e)) || 0;
					a = e("width"), o = e("clip-width");
				}(), t = 4 * (a - o)), e && e.getTotalSlideDim() <= e.getViewportDim() - t ? 1 / 0 : 1;
			}
		}, qe.Carousel || {}, c("Carousel") || {});
		t = Je(n, l, {
			Sync: je,
			Lazyload: Fe
		}), t.on("ready", () => {
			B(n, "is-syncing"), e?.emit("thumbs:ready"), u() && e?.on("render", w);
		}), t.on("destroy", () => {
			e?.emit("thumbs:destroy");
		}), t.init(), (r = t.getGestures()) == null || r.on("start", () => {
			s = !1;
		}), t.on("click", (e, t) => {
			let n = t.target;
			if (n) {
				let e = n.matches("button") ? n : n.firstElementChild;
				e && e.matches("button") && (t.preventDefault(), e.focus({ preventScroll: !0 }));
			}
		}), B(e.getContainer(), "has-thumbs"), j();
	}
	function v() {
		l() && c("showOnStart") && (h(), g());
	}
	function y() {
		var t;
		l() && (_(), e?.on("addSlide", E), e?.on("removeSlide", D), e?.on("click", O), e?.on("refresh", k), (t = e?.getGestures()) == null || t.on("start", b), A(!0));
	}
	function b() {
		var e, t;
		s = !0, (e = document.activeElement) != null && e.closest(".f-thumbs") && ((t = document.activeElement) == null || t.blur());
	}
	function w() {
		var r;
		n?.classList.toggle("is-syncing", !1 === e?.hasNavigated() || (e?.getTween())?.isRunning()), j(), (r = e?.getGestures()) != null && r.isPointerDown() && function() {
			if (!u() || !e || !t || !s) return;
			let n = t.getTween(), r = t.getPages(), i = e.getPageIndex() || 0, c = e.getPageProgress() || 0;
			if (!(e && r && r[i] && n)) return;
			let l = n.isRunning() ? n.getCurrentValues().pos : t.getPosition();
			if (l === void 0) return;
			let d = r[i].pos + c * (a - o);
			d = S(r[0].pos, d, r[r.length - 1].pos), n.from({ pos: l }).to({ pos: d }).start();
		}();
	}
	function T() {
		s = !0, A();
	}
	function E(e, n) {
		let a = { html: p(n) };
		if (t) t.add(a, n.index);
		else if (r) {
			let e = x(m(a));
			if (e) {
				r.append(e);
				let t = e.querySelector("img");
				t && i?.observe(t);
			}
		}
	}
	function D(e, n) {
		var i;
		t ? t.remove(n.index) : r && ((i = r.querySelector(`[index="${n.index}"]`)) == null || i.remove());
	}
	function O(e, t) {
		let r = t.target;
		t.defaultPrevented || r?.dataset?.thumbsAction !== "toggle" || (n || (h(!0), g(), _()), n && n.classList.toggle("is-hidden"));
	}
	function k() {
		A();
	}
	function A(t = !1) {
		if (!e || !r || !d()) return;
		let n = e.getPageIndex();
		r.querySelectorAll(".is-selected").forEach((e) => {
			e.classList.remove("is-selected");
		});
		let i = r.querySelector(`[index="${n}"]`);
		if (i) {
			i.classList.add("is-selected");
			let e = r.getBoundingClientRect(), n = i.getBoundingClientRect(), a = i.offsetTop - r.offsetTop - .5 * e.height + .5 * n.height, o = i.scrollLeft - r.scrollLeft - .5 * e.width + .5 * n.width;
			r.scrollTo({
				top: a,
				left: o,
				behavior: t ? "instant" : "smooth"
			});
		}
	}
	function j() {
		if (!u() || !e || !t) return;
		let n = t?.getSlides() || [], r = -.5 * a;
		for (let t of n) {
			let n = t.el;
			if (!n) continue;
			let i = e.getPageProgress(t.index) || 0;
			i = Math.max(-1, Math.min(1, i)), i > -1 && i < 1 && (r += .5 * a * (1 - Math.abs(i))), i = Math.round(1e4 * i) / 1e4, r = Math.round(1e4 * r) / 1e4, n.style.setProperty("--progress", `${Math.abs(i)}`), n.style.setProperty("--shift", `${e?.isRTL() ? -1 * r : r}px`), i > -1 && i < 1 && (r += .5 * a * (1 - Math.abs(i)));
		}
	}
	return {
		init: function(t, n) {
			Je = n, e = t, e.on("ready", y), e.on("initSlides", v), e.on("change", T);
		},
		destroy: function() {
			var r, i;
			d() && e?.emit("thumbs:destroy"), e?.off("ready", y), e?.off("initSlides", v), e?.off("change", T), e?.off("render", w), e?.off("addSlide", E), e?.off("click", O), e?.off("refresh", k), (r = e?.getGestures()) == null || r.off("start", b), (i = e?.getContainer()) == null || i.classList.remove("has-thumbs"), e = void 0, t?.destroy(), t = void 0, n?.remove(), n = void 0;
		},
		getCarousel: function() {
			return t;
		},
		getContainer: function() {
			return n;
		},
		getType: function() {
			return c("type");
		},
		isEnabled: l
	};
}, Xe = {
	autosize: !1,
	iframeAttr: {
		allow: "autoplay; fullscreen",
		scrolling: "auto"
	},
	preload: !1
}, Ze = () => {
	let e;
	function t() {
		let t = e?.getOptions().Html;
		return C(t) ? _e({}, Xe, t) : Xe;
	}
	function n() {
		return !1 !== e?.getOptions().Html;
	}
	function r(e) {
		return e.type === "iframe" || e.type === "pdf" || e.type === "gmap";
	}
	function i(e) {
		let t = `${e}`;
		return t.match(/^\d+$/) ? `${t}px` : t;
	}
	function a(e) {
		if (e === void 0 || e === "") return;
		let t = `${e}`.trim();
		if (!t.match(/^\d+(\.\d+)?(px)?$/)) return;
		let n = parseFloat(t);
		return Number.isFinite(n) ? n : void 0;
	}
	function o(e, n) {
		let r = e[n] ?? t()[n];
		return r === "true" || r !== "false" && r;
	}
	function s(e, t) {
		if (!n()) return;
		let r = t.type, i = t.src;
		if (!r && _(i)) {
			if (i.charAt(0) === "#" ? r = "inline" : i.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.((a)?png|avif|gif|jp(g|eg)|pjp(eg)?|jfif|svg|webp|bmp|ico|tif(f)?)((\?|#).*)?$)/i) ? r = "image" : i.match(/\.(pdf)((\?|#).*)?$/i) ? r = "pdf" : i.match(/\.(html|php)((\?|#).*)?$/i) && (r = "iframe"), !r) {
				let e = i.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:(?:(?:maps\/(?:place\/(?:.*)\/)?\@(.*),(\d+\.?\d+?)z))|(?:\?ll=))(.*)?/i);
				e && (i = `https://maps.google.${e[1]}/?ll=${(e[2] ? e[2] + "&z=" + Math.floor(parseFloat(e[3])) + (e[4] ? e[4].replace(/^\//, "&") : "") : e[4] + "").replace(/\?/, "&")}&output=${e[4] && e[4].indexOf("layer=c") > 0 ? "svembed" : "embed"}`, r = "gmap");
			}
			if (!r) {
				let e = i.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:maps\/search\/)(.*)/i);
				e && (i = `https://maps.google.${e[1]}/maps?q=${e[2].replace("query=", "q=").replace("api=1", "")}&output=embed`, r = "gmap");
			}
			r && (t.src = i, t.type = r);
		}
	}
	function c(i, a) {
		n() && r(a) && function(n) {
			let r = n.el, i = n.src;
			if (!e || !r || !i) return;
			let a = document.createElement("iframe");
			B(a, "f-iframe");
			for (let [e, n] of Object.entries(t().iframeAttr || {})) a.setAttribute(e, n);
			a.onerror = () => {
				n.state = 2, e?.showError(n, "{{IFRAME_ERROR}}");
			};
			let s = document.createElement("div");
			B(s, "f-html"), s.append(a), n.htmlEl = s, n.contentEl = a, B(r, `has-html has-iframe has-${n.type}`), r.prepend(s), d(n);
			let c = o(n, "preload"), l = o(n, "autosize");
			n.type === "iframe" && (c || l) ? (n.state = 0, e.showLoading(n), B(r, "is-loading"), a.onload = () => {
				if (!e || e.getState() === 2 || !a.src.length || n.contentEl !== a || !a.isConnected) return;
				n.state = 1;
				let t = a.dataset.ready !== "true";
				a.dataset.ready = "true", f(n), e.hideLoading(n), t && e.emit("contentReady", n), V(r, "is-loading");
			}, a.src = `${i}`) : (a.src = `${i}`, e.emit("contentReady", n));
		}(a);
	}
	function l(t, n) {
		var i, a;
		if (r(n)) {
			let t = n.el;
			e?.hideError(n), (i = n.contentEl) == null || i.remove(), n.contentEl = void 0, (a = n.htmlEl) == null || a.remove(), n.htmlEl = void 0, t && (V(t, "has-html has-iframe has-pdf has-gmap"), V(t, "is-loading"));
		}
	}
	function u() {
		for (let t of e?.getSlides() || []) r(t) && (d(t), t.state === 1 && f(t));
	}
	function d(e) {
		let t = e.htmlEl;
		if (t && r(e) && (t.style.aspectRatio = "", t.style.width = "", t.style.height = "", t.style.maxWidth = "", t.style.maxHeight = "", e.width && (t.style.maxWidth = i(e.width)), e.height && (t.style.maxHeight = i(e.height)), e.aspectRatio)) {
			let n = e.aspectRatio.split("/"), r = parseFloat(n[0].trim()), i = n[1] ? parseFloat(n[1].trim()) : 0, a = r && i ? r / i : r;
			t.offsetHeight;
			let o = t.getBoundingClientRect(), s = a < (o.width || 1) / (o.height || 1);
			t.style.aspectRatio = `${e.aspectRatio}`, t.style.width = s ? "auto" : "", t.style.height = s ? "" : "auto";
		}
	}
	function f(e) {
		let t = e.contentEl, n = t?.parentElement, r = n?.style, i = o(e, "autosize"), s = a(e.width) || 0, c = a(e.height) || 0;
		if (s && c && (i = !1), t && n && r && i) {
			try {
				let e = window.getComputedStyle(n), i = parseFloat(e.paddingLeft) + parseFloat(e.paddingRight), a = parseFloat(e.paddingTop) + parseFloat(e.paddingBottom), o = t.contentWindow;
				if (o) {
					let e = o.document, t = e.getElementsByTagName("html")[0], n = e.body;
					r.width = "";
					let l = window.getComputedStyle(n), u = parseFloat(l.marginLeft) + parseFloat(l.marginRight), d = n.style.overflow || "";
					n.style.overflow = "hidden", s ||= n.scrollWidth + u + i, r.flex = "0 0 auto", r.width = `${s}px`, r.height = `${n.scrollHeight}px`, n.style.overflow = d, c = Math.max(t.scrollHeight, Math.ceil(t.getBoundingClientRect().height)) + a;
				}
			} catch {}
			(s || c) && Object.assign(r, {
				flex: "0 1 auto",
				width: s ? `${s}px` : "",
				height: c ? `${c}px` : ""
			});
		}
	}
	return {
		init: function(t) {
			e = t, e.on("addSlide", s), e.on("attachSlideEl", c), e.on("detachSlideEl", l), e.on("refresh", u);
		},
		destroy: function() {
			e?.off("addSlide", s), e?.off("attachSlideEl", c), e?.off("detachSlideEl", l), e?.off("refresh", u), e = void 0;
		}
	};
}, Qe = (e, t = {}) => {
	let n = new URL(e), r = new URLSearchParams(n.search), i = new URLSearchParams();
	for (let [e, n] of [...r, ...Object.entries(t)]) {
		let t = n + "";
		if (e === "t") {
			let e = t.match(/((\d*)m)?(\d*)s?/);
			e && i.set("start", 60 * parseInt(e[2] || "0") + parseInt(e[3] || "0") + "");
		} else i.set(e, t);
	}
	let a = i + "", o = e.match(/#t=((.*)?\d+s)/);
	return o && (a += `#t=${o[1]}`), a;
}, $e = {
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
}, et = () => {
	let e, t = !1;
	function n() {
		let t = e?.getOptions().Video;
		return C(t) ? Object.assign(Object.assign({}, $e), t) : $e;
	}
	function r() {
		return (e?.getPage())?.slides[0];
	}
	let i = (t) => {
		try {
			let n = JSON.parse(t.data);
			if (t.origin === "https://player.vimeo.com") {
				if (n.event === "ready") for (let n of Array.from((e?.getContainer())?.getElementsByClassName("f-iframe") || [])) n instanceof HTMLIFrameElement && n.contentWindow === t.source && (n.dataset.ready = "true");
			} else if (t.origin.match(/^https:\/\/(www.)?youtube(-nocookie)?.com$/) && n.event === "onReady") {
				let e = document.getElementById(n.id);
				e && (e.dataset.ready = "true");
			}
		} catch {}
	};
	function a(e, t) {
		let r = t.src;
		if (!_(r)) return;
		let i = t.type;
		if (!i || i === "html5video") {
			let e = r.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i);
			e && (i = "html5video", t.html5videoFormat = t.html5videoFormat || "video/" + (e[1] === "ogv" ? "ogg" : e[1]));
		}
		if (!i || i === "youtube") {
			let e = r.match(/(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(?:watch\?(?:.*&)?v=|v\/|u\/|shorts\/|embed\/?)?(videoseries\?list=(?:.*)|[\w-]{11}|\?listType=(?:.*)&list=(?:.*))(?:.*)/i);
			if (e) {
				let a = Object.assign(Object.assign({}, n().youtube), t.youtube || {}), o = `www.youtube${a.nocookie ? "-nocookie" : ""}.com`, s = Qe(r, a), c = encodeURIComponent(e[2]);
				t.videoId = c, t.src = `https://${o}/embed/${c}?${s}`, t.thumb = t.thumb || `https://i.ytimg.com/vi/${c}/mqdefault.jpg`, i = "youtube";
			}
		}
		if (!i || i === "vimeo") {
			let e = r.match(/^.+vimeo.com\/(?:\/)?(video\/)?([\d]+)((\/|\?h=)([a-z0-9]+))?(.*)?/);
			if (e) {
				let a = Qe(r, Object.assign(Object.assign({}, n().vimeo), t.vimeo || {})), o = encodeURIComponent(e[2]), s = e[5] || "";
				t.videoId = o, t.src = `https://player.vimeo.com/video/${o}?${s ? `h=${s}${a ? "&" : ""}` : ""}${a}`, i = "vimeo";
			}
		}
		t.type = i;
	}
	function o(t, r) {
		r.type === "html5video" && function(t) {
			let r = t.el, i = t.src;
			if (!e || !r || !i) return;
			let a = t.html5videoTpl || n().html5videoTpl, o = t.html5videoFormat || n().html5videoFormat;
			if (!a) return;
			let s = t.poster || (t.thumb && _(t.thumb) ? t.thumb : ""), c = x(a.replace(/\{\{src\}\}/gi, i + "").replace(/\{\{format\}\}/gi, o || "").replace(/\{\{poster\}\}/gi, s + ""));
			if (!c) return;
			let l = document.createElement("div");
			B(l, "f-html"), l.append(c), t.contentEl = c, t.htmlEl = l, B(r, `has-${t.type}`), r.prepend(l), u(t), e.emit("contentReady", t);
		}(r), r.type !== "youtube" && r.type !== "vimeo" || function(t) {
			let r = t.el, i = t.src;
			if (!e || !r || !i) return;
			let a = document.createElement("iframe");
			B(a, "f-iframe"), a.setAttribute("id", `f-iframe_${t.videoId}`);
			for (let [e, t] of Object.entries(n().iframeAttr || {})) a.setAttribute(e, t);
			t.type === "youtube" && (a.onload = () => {
				var t;
				e?.getState() === 1 && ((t = a.contentWindow) == null || t.postMessage(JSON.stringify({
					event: "listening",
					id: a.getAttribute("id")
				}), "*"));
			}), a.onerror = () => {
				e?.showError(t, "{{IFRAME_ERROR}}");
			};
			let o = document.createElement("div");
			B(o, "f-html"), o.append(a), t.contentEl = a, t.htmlEl = o, B(r, `has-html has-iframe has-${t.type}`), a.src = `${t.src}`, r.prepend(o), u(t), e.emit("contentReady", t);
		}(r);
	}
	function s(e, t) {
		var n, r;
		t.type !== "html5video" && t.type !== "youtube" && t.type !== "vimeo" || ((n = t.contentEl) == null || n.remove(), t.contentEl = void 0, (r = t.htmlEl) == null || r.remove(), t.htmlEl = void 0), t.poller && clearTimeout(t.poller);
	}
	function c() {
		t = !1;
	}
	function l() {
		if (t) return;
		t = !0;
		let e = r();
		(e && e.autoplay !== void 0 ? e.autoplay : n().autoplay) && (function() {
			var e;
			let t = r(), n = t?.el;
			if (n && t?.type === "html5video") try {
				let e = n.querySelector("video");
				if (e) {
					let t = e.play();
					t !== void 0 && t.then(() => {}).catch((t) => {
						e.muted = !0, e.play();
					});
				}
			} catch {}
			let i = t?.htmlEl;
			i instanceof HTMLIFrameElement && ((e = i.contentWindow) == null || e.postMessage("{\"event\":\"command\",\"func\":\"stopVideo\",\"args\":\"\"}", "*"));
		}(), function() {
			let e = r(), t = e?.type;
			if (!e?.el || t !== "youtube" && t !== "vimeo") return;
			let n = () => {
				if (e.contentEl && e.contentEl instanceof HTMLIFrameElement && e.contentEl.contentWindow) {
					let t;
					if (e.contentEl.dataset.ready === "true") return t = e.type === "youtube" ? {
						event: "command",
						func: "playVideo"
					} : {
						method: "play",
						value: "true"
					}, t && e.contentEl.contentWindow.postMessage(JSON.stringify(t), "*"), void (e.poller = void 0);
					e.type === "youtube" && (t = {
						event: "listening",
						id: e.contentEl.getAttribute("id")
					}, e.contentEl.contentWindow.postMessage(JSON.stringify(t), "*"));
				}
				e.poller = setTimeout(n, 250);
			};
			n();
		}());
	}
	function u(e) {
		let t = e?.htmlEl;
		if (e && t && (e.type === "html5video" || e.type === "youtube" || e.type === "vimeo")) {
			if (t.style.aspectRatio = "", t.style.width = "", t.style.height = "", t.style.maxWidth = "", t.style.maxHeight = "", e.width) {
				let n = `${e.width}`;
				n.match(/^\d+$/) && (n += "px"), t.style.maxWidth = `${n}`;
			}
			if (e.height) {
				let n = `${e.height}`;
				n.match(/^\d+$/) && (n += "px"), t.style.maxHeight = `${n}`;
			}
			if (e.aspectRatio) {
				let n = e.aspectRatio.split("/"), r = parseFloat(n[0].trim()), i = n[1] ? parseFloat(n[1].trim()) : 0, a = r && i ? r / i : r;
				t.offsetHeight;
				let o = t.getBoundingClientRect(), s = a < (o.width || 1) / (o.height || 1);
				t.style.aspectRatio = `${e.aspectRatio}`, t.style.width = s ? "auto" : "", t.style.height = s ? "" : "auto";
			}
		}
	}
	function d() {
		u(r());
	}
	return {
		init: function(t) {
			e = t, e.on("addSlide", a), e.on("attachSlideEl", o), e.on("detachSlideEl", s), e.on("ready", l), e.on("change", c), e.on("settle", l), e.on("refresh", d), window.addEventListener("message", i);
		},
		destroy: function() {
			e?.off("addSlide", a), e?.off("attachSlideEl", o), e?.off("detachSlideEl", s), e?.off("ready", l), e?.off("change", c), e?.off("settle", l), e?.off("refresh", d), window.removeEventListener("message", i), e = void 0;
		}
	};
}, tt = {
	autoStart: !1,
	btnTpl: "<button data-fullscreen-action=\"toggle\" class=\"f-button\" title=\"{{TOGGLE_FULLSCREEN}}\"><svg><g><path d=\"M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3\"/></g><g><path d=\"M15 19v-2a2 2 0 0 1 2-2h2M15 5v2a2 2 0 0 0 2 2h2M5 15h2a2 2 0 0 1 2 2v2M5 9h2a2 2 0 0 0 2-2V5\"/></g></svg></button>"
}, nt = "in-fullscreen-mode", rt = () => {
	let e;
	function t(t) {
		let n = e?.getOptions().Fullscreen, r = (C(n) ? Object.assign(Object.assign({}, tt), n) : tt)[t];
		return r && typeof r == "function" && e ? r(e) : r;
	}
	function n() {
		var n;
		(n = e?.getPlugins().Toolbar) == null || n.add("fullscreen", { tpl: t("btnTpl") });
	}
	function r() {
		if (t("autoStart")) {
			let e = a();
			e && s(e);
		}
	}
	function i(e, t) {
		let n = t.target;
		n && !t.defaultPrevented && n.dataset.fullscreenAction === "toggle" && l();
	}
	function a() {
		return t("el") || e?.getContainer() || void 0;
	}
	function o() {
		let e = document;
		return e.fullscreenEnabled ? !!e.fullscreenElement : !!e.webkitFullscreenEnabled && !!e.webkitFullscreenElement;
	}
	function s(e) {
		let t = document, n;
		return e ||= t.documentElement, t.fullscreenEnabled ? n = e.requestFullscreen() : t.webkitFullscreenEnabled && (n = e.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)), n && n.then(() => {
			e.classList.add(nt);
		}), n;
	}
	function c() {
		let e = document, t;
		return e.fullscreenEnabled ? t = e.fullscreenElement && e.exitFullscreen() : e.webkitFullscreenEnabled && (t = e.webkitFullscreenElement && e.webkitExitFullscreen()), t && t.then(() => {
			var e;
			(e = a()) == null || e.classList.remove(nt);
		}), t;
	}
	function l() {
		if (o()) c();
		else {
			let e = a();
			e && s(e);
		}
	}
	return {
		init: function(t) {
			e = t, e.on("initPlugins", n), e.on("ready", r), e.on("click", i);
		},
		destroy: function() {
			e?.off("initPlugins", n), e?.off("ready", r), e?.off("click", i);
		},
		exit: c,
		inFullscreen: o,
		request: s,
		toggle: l
	};
}, it, at, ot = !1, st = !1, ct = !1, lt = !1, ut = () => {
	let e = new URL(document.URL).hash, t = e.slice(1).split("-"), n = t[t.length - 1], r = n && /^\+?\d+$/.test(n) && parseInt(t.pop() || "1", 10) || 1;
	return {
		urlHash: e,
		urlSlug: t.join("-"),
		urlIndex: r
	};
}, dt = () => {
	let e = it?.getInstance(), t = e?.getState();
	return !(!e || t !== 0 && t !== 1);
}, ft = () => {
	if (!it || dt()) return;
	let { urlSlug: e, urlIndex: t } = ut();
	if (!e) return;
	let n = document.querySelector(`[data-slug="${e}"]`);
	n && it.fromTriggerEl(n), dt() || (n = document.querySelectorAll(`[data-fancybox="${e}"]`)[t - 1], n && it.fromTriggerEl(n, { startIndex: t - 1 })), dt() && n && !n.closest("[inert]") && n.scrollIntoView({
		behavior: "instant",
		block: "center",
		inline: "center"
	});
}, pt = (e) => {
	let t = e.getOptions().Hash, n = e.getSlide();
	return n && (n.slug || n.fancybox || (C(t) ? t.slug : "")) || "";
}, mt = (e) => {
	let t = pt(e), n = e.getSlide();
	if (!n || !t) return "";
	let r = parseInt(n.index + "", 10) + 1, i = n.slug ? `#${n.slug}` : `#${t}-${r}`;
	return (e.getCarousel()?.getPages()?.length || 0) < 2 && (i = `#${t}`), i;
}, ht = () => {
	if (!it || ct) return;
	let e = it?.getInstance(), t = e?.getCarousel(), { urlSlug: n, urlIndex: r } = ut(), i = e?.getOptions().Hash;
	if (!1 !== i) {
		if (e && e.getState() === 1 && t) {
			let a = t.getSlides();
			for (let e of a || []) if (e.slug === n || (e.fancybox === n || C(i) && i.slug === n) && e.index === r - 1) return st = !1, void t.goTo(e.index);
			lt = !0, e.close(), lt = !1;
		}
		ft();
	}
}, gt = () => {
	it && (at = setTimeout(() => {
		ot = !0, ft(), ot = !1;
	}, 300), window.addEventListener("hashchange", ht, !1));
}, _t;
function vt() {
	history.scrollRestoration && _t && (history.scrollRestoration = _t, _t = void 0);
}
var yt = () => {
	let e, t = "";
	function n() {
		if (!e || !e.isTopMost() || !1 === e.getOptions().Hash) return;
		if (ot) {
			let t = e.getOptions().sync;
			t && t.goTo((e?.getCarousel())?.getPageIndex() || 0, {
				transition: !1,
				tween: !1
			});
		}
		let n = e.getCarousel();
		if (!n || !e.getSlide()) return;
		let i = pt(e);
		if (!i) return;
		let { urlHash: a, urlSlug: o } = ut(), s = mt(e);
		a !== s && (t = a), history.scrollRestoration && !_t && (_t = history.scrollRestoration, history.scrollRestoration = "manual", window.addEventListener("beforeunload", vt)), n.on("change", r);
		let c = i !== o;
		try {
			window.history[c ? "pushState" : "replaceState"]({}, document.title, window.location.pathname + window.location.search + s), c && (st = !0);
		} catch {}
	}
	function r() {
		if (!e || !e.isTopMost() || !1 === e.getOptions().Hash || !e.getSlide() || !pt(e)) return;
		let t = mt(e);
		ct = !0;
		try {
			window.history.replaceState({}, document.title, window.location.pathname + window.location.search + t);
		} catch {}
		ct = !1;
	}
	function i() {
		if (!(!e || !e.isTopMost() || !1 === e.getOptions().Hash || lt) && pt(e)) {
			ct = !0;
			try {
				st && !function() {
					if (window.parent === window) return !1;
					try {
						var e = window.frameElement;
					} catch {
						e = null;
					}
					return e === null ? location.protocol === "data:" : e.hasAttribute("sandbox");
				}() && document.activeElement?.nodeName !== "IFRAME" ? window.history.back() : window.history.replaceState({}, document.title, window.location.pathname + window.location.search + t);
			} catch {}
			ct = !1;
		}
	}
	return {
		init: function(t) {
			clearTimeout(at), e = t, e.on("ready", n), e.on("close", i);
		},
		destroy: function() {
			e?.off("ready", n), e?.off("close", i);
			let t = e?.getCarousel();
			t && t.off("change", r), e = void 0, it != null && it.getInstance() || (vt(), window.removeEventListener("beforeunload", vt));
		}
	};
};
yt.getInfoFromURL = ut, yt.startFromUrl = ft, yt.setup = function(e) {
	it || (it = e, Ee() && (/complete|interactive|loaded/.test(document.readyState) ? gt() : document.addEventListener("DOMContentLoaded", gt)));
};
//#endregion
//#region node_modules/@fancyapps/ui/dist/fancybox/l10n/en_EN.js
var bt = Object.assign(Object.assign({}, ye), {
	CLOSE: "Close",
	NEXT: "Next",
	PREV: "Previous",
	MODAL: "You can close this modal content with the ESC key",
	ELEMENT_NOT_FOUND: "HTML Element Not Found",
	IFRAME_ERROR: "Error Loading Page",
	NO_CAPTION: "No Caption",
	TOGGLE_SIDEBAR: "Toggle sidebar"
}), xt = "<button class=\"f-button\" title=\"{{CLOSE}}\" data-fancybox-close><svg tabindex=\"-1\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M19.286 4.714 4.714 19.286M4.714 4.714l14.572 14.572\" /></svg></button>";
Y().add("close", { tpl: xt });
var St = (e) => {
	e.cancelable && e.preventDefault();
}, Ct = (e = null, t = "", n) => {
	if (!e || !e.parentElement || !t) return void (n && n());
	wt(e);
	let r = (i) => {
		i.target === e && e.dataset.animationName && (e.removeEventListener("animationend", r), delete e.dataset.animationName, n && n(), e.classList.remove(t));
	};
	e.dataset.animationName = t, e.addEventListener("animationend", r), B(e, t);
}, wt = (e) => {
	e && e.dispatchEvent(new CustomEvent("animationend", {
		bubbles: !1,
		cancelable: !0,
		currentTarget: e
	}));
}, X;
(function(e) {
	e[e.Init = 0] = "Init", e[e.Ready = 1] = "Ready", e[e.Closing = 2] = "Closing", e[e.Destroyed = 3] = "Destroyed";
})(X ||= {});
var Tt = {
	ajax: null,
	backdropClick: "close",
	Carousel: {},
	closeButton: "auto",
	closeButtonTpl: xt,
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
	l10n: bt,
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
}, Et = /* @__PURE__ */ new Map(), Dt = 0, Ot = "with-fancybox", kt = () => {
	let e, t, n, r, i, a, o, s = X.Init, c = Object.assign({}, Tt), l = -1, u = {}, d = [], f = !1, p = !0, m = 0;
	function h(e, ...t) {
		let n = c[e];
		return n && typeof n == "function" ? n(K, ...t) : n;
	}
	function g(e, t = []) {
		let n = h("l10n") || {};
		e = String(e).replace(/\{\{(\w+)\}\}/g, (e, t) => n[t] || e);
		for (let n = 0; n < t.length; n++) e = e.split(t[n][0]).join(t[n][1]);
		return e = e.replace(/\{\{(.*?)\}\}/g, (e, t) => t);
	}
	let y = /* @__PURE__ */ new Map();
	function S(e, ...t) {
		let n = [...y.get(e) || []];
		for (let [t, r] of Object.entries(c.on || {})) (t === e || t.split(" ").indexOf(e) > -1) && n.push(r);
		for (let e of n) e && typeof e == "function" && e(K, ...t);
		e !== "*" && S("*", e, ...t);
	}
	function w() {
		V(t, "is-revealing");
		try {
			document.activeElement === e && (t?.querySelector("[autofocus]") || t).focus();
		} catch {}
	}
	function T(e, t) {
		var n;
		ie(t), P(), (n = t.el) == null || n.addEventListener("click", D), t.type !== "inline" && t.type !== "clone" || function(e) {
			if (!r || !e || !e.el) return;
			let t = null;
			if (_(e.src)) {
				let n = e.src.split("#", 2).pop();
				t = n ? document.getElementById(n) : null;
			}
			if (t) {
				if (B(t, "f-html"), e.type === "clone" || t.closest(".fancybox__carousel")) {
					t = t.cloneNode(!0);
					let n = t.dataset.animationName;
					n && (t.classList.remove(n), delete t.dataset.animationName);
					let r = t.getAttribute("id");
					r = r ? `${r}--clone` : `clone-${l}-${e.index}`, t.setAttribute("id", r);
				} else if (t.parentNode) {
					let n = document.createElement("div");
					n.inert = !0, t.parentNode.insertBefore(n, t), e.placeholderEl = n;
				}
				e.htmlEl = t, B(e.el, "has-html"), e.el.prepend(t), t.classList.remove("hidden"), t.style.display === "none" && (t.style.display = ""), getComputedStyle(t).getPropertyValue("display") === "none" && (t.style.display = t.dataset.display || "flex"), r?.emit("contentReady", e);
			} else r?.showError(e, "{{ELEMENT_NOT_FOUND}}");
		}(t), t.type === "ajax" && function(e) {
			let t = e.el;
			if (!t || e.htmlEl || e.xhr) return;
			r?.showLoading(e), e.state = 0;
			let n = new XMLHttpRequest();
			n.onreadystatechange = function() {
				if (n.readyState === XMLHttpRequest.DONE && s === X.Ready) {
					if (r?.hideLoading(e), e.state = 1, n.status === 200) {
						let i = n.responseText + "", a = null, o = null;
						if (e.filter) {
							let t = document.createElement("div");
							t.innerHTML = i, o = t.querySelector(e.filter + "");
						}
						o && o instanceof HTMLElement ? a = o : (a = document.createElement("div"), a.innerHTML = i), a.classList.add("f-html"), e.htmlEl = a, t.classList.add("has-html"), t.classList.add("has-ajax"), t.prepend(a), r?.emit("contentReady", e);
					} else r?.showError(e);
				}
			};
			let i = h("ajax") || null;
			n.open(i ? "POST" : "GET", e.src + ""), n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), n.setRequestHeader("X-Requested-With", "XMLHttpRequest"), n.send(i), e.xhr = n;
		}(t);
	}
	function E(e, t) {
		var n;
		ae(t), (n = t.el) == null || n.removeEventListener("click", D), t.type !== "inline" && t.type !== "clone" || function(e) {
			let t = e.htmlEl, n = e.placeholderEl;
			t && (getComputedStyle(t).getPropertyValue("display") !== "none" && (t.style.display = "none"), t.offsetHeight), n && (t && n.parentNode && n.parentNode.insertBefore(t, n), n.remove()), e.htmlEl = void 0, e.placeholderEl = void 0;
		}(t), t.xhr &&= (t.xhr.abort(), void 0);
	}
	function D(e) {
		if (!R()) return;
		if (s !== X.Ready) return St(e), void e.stopPropagation();
		if (e.defaultPrevented || !oe.isClickAllowed()) return;
		let t = e.composedPath()[0];
		t.closest(".fancybox__carousel") && t.classList.contains("fancybox__slide") && F(e);
	}
	function O() {
		p = !1, t && r && t.classList.remove("is-revealing"), P();
		let e = h("sync");
		if (r && e) {
			let t = e.getPageIndex(r.getPageIndex()) || 0;
			e.goTo(t, {
				transition: !1,
				tween: !1
			});
		}
	}
	function k() {
		var e;
		(function() {
			let e = r?.getViewport();
			if (!h("dragToClose") || !r || !e || (i = oe(e).init(), !i)) return;
			let n = !1, o = 0, c = 0, l = {}, u = 1;
			function d() {
				a?.spring({
					clamp: !0,
					mass: 1,
					tension: c === 0 ? 140 : 960,
					friction: 17,
					restDelta: .1,
					restSpeed: .1,
					maxSpeed: 1 / 0
				}).from({ y: o }).to({ y: c }).start();
				let e = (r?.getViewport())?.getBoundingClientRect().height || 0, t = z()?.panzoomRef;
				if (e && t) {
					if (c === 0) t.execute(W.Reset);
					else {
						let n = ve(Math.abs(o), 0, .33 * e, u, .77 * u, !1);
						t.execute(W.ZoomTo, { scale: n });
					}
				}
			}
			let f = (e) => {
				let t = e.srcEvent, n = t.target;
				return r && !(te(t) && t.touches?.length > 1) && n && !b(n);
			};
			a = ee().on("step", (n) => {
				if (t && e && s === X.Ready) {
					let r = e.getBoundingClientRect().height;
					o = Math.min(r, Math.max(-1 * r, n.y));
					let i = ve(Math.abs(o), 0, .65 * r, 1, .2, !0);
					t.style.setProperty("--f-drag-opacity", i + ""), t.style.setProperty("--f-drag-offset", o + "px");
				}
			}), i.on("start", function() {
				n || (a?.pause(), c = o);
			}).on("panstart", (e) => {
				var t;
				if (!n && f(e) && e.axis === "y") {
					St(e.srcEvent), n = !0, me(), (t = r?.getViewport()) == null || t.classList.add("is-dragging");
					let i = z()?.panzoomRef;
					if (i) {
						u = i.getTransform().scale || 1;
						let e = i.getOptions();
						l = Object.assign({}, e), e.bounds = !1, e.gestures = !1;
					}
				} else n = !1;
			}).on("pan", function(e) {
				n && f(e) && (St(e.srcEvent), e.srcEvent.stopPropagation(), e.axis === "y" && (c += e.deltaY, d()));
			}).on("end", (e) => {
				var t, i;
				if ((t = r?.getViewport()) == null || t.classList.remove("is-dragging"), n) {
					let t = z()?.panzoomRef;
					if (t) {
						(i = t.getTween()) == null || i.end();
						let e = t.getOptions();
						e.bounds = l.bounds || !1, e.gestures = l.gestures || !1;
					}
					f(e) && e.axis === "y" && (Math.abs(e.velocityY) > 5 || Math.abs(o) > 50) && he(e.srcEvent, "f-throwOut" + (e.velocityY > 0 ? "Down" : "Up"));
				}
				n = !1, s === X.Ready && o !== 0 && (c = 0, d());
			});
		})(), document.body.addEventListener("click", I), document.body.addEventListener("keydown", re, {
			passive: !1,
			capture: !0
		}), P(), le();
		let n = h("sync");
		r && n && ((e = n.getTween()) == null || e.start()), L(z());
	}
	function A() {
		r?.canGoNext() ? le() : pe();
	}
	function j(e, t) {
		ie(t);
	}
	function M(e, t) {
		ie(t), L(t);
	}
	function N() {
		let e = r?.getPlugins().Thumbs;
		ce(t, "has-thumbs", e?.isEnabled() || !1), ce(t, "has-vertical-thumbs", !!e && (e.getType() === "scrollable" || !0 === e.getCarousel()?.isVertical()));
	}
	function P() {
		if (!t) return;
		let e = r?.getPages().length || 0, n = r?.getPageIndex() || 0, i = t.querySelectorAll("[data-fancybox-index],[data-fancybox-page],[data-fancybox-pages]");
		for (let t of i) t.textContent = t.hasAttribute("data-fancybox-index") ? String(n) : t.hasAttribute("data-fancybox-page") ? String(n + 1) : String(e);
	}
	function F(e) {
		if (e.composedPath()[0].closest("[data-fancybox-close]")) return void he(e);
		S("backdropClick", e), !e.defaultPrevented && h("backdropClick") && he(e);
	}
	function ne() {
		fe();
	}
	function re(e) {
		if (!R() || s !== X.Ready) return;
		let t = e.key, n = h("keyboard");
		if (!n || e.ctrlKey || e.altKey || e.shiftKey) return;
		let i = e.composedPath()[0];
		if (!v(i) || t !== "Escape" && ((e) => {
			let t = [
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
		})(i) || (S("keydown", e), e.defaultPrevented)) return;
		let a = n[t];
		if (a) switch (a) {
			case "close":
				he(e);
				break;
			case "next":
				St(e), r?.next();
				break;
			case "prev": St(e), r?.prev();
		}
	}
	function I(e) {
		if (!R() || s !== X.Ready || (fe(), e.defaultPrevented)) return;
		let t = e.composedPath()[0], n = !!t.closest("[data-fancybox-close]"), r = t.classList.contains("fancybox__backdrop");
		(n || r) && F(e);
	}
	function ie(e) {
		let { el: t, htmlEl: n, panzoomRef: i, closeButtonEl: a } = e, o = i ? i.getWrapper() : n;
		if (!t || !t.parentElement || !o) return;
		let s = h("closeButton");
		if (s === "auto" && (s = !0 !== (r?.getPlugins().Toolbar)?.isEnabled()), s) {
			if (!a) {
				let n = x(g(h("closeButtonTpl")));
				n && (B(n, "is-close-button"), e.closeButtonEl = o.insertAdjacentElement("afterbegin", n), B(t, "has-close-btn"));
			}
		} else ae(e);
	}
	function ae(e) {
		e.closeButtonEl &&= (e.closeButtonEl.remove(), void 0), V(e.el, "has-close-btn");
	}
	function L(e) {
		if (!(p && r && r.getState() === 1 && e && e.index === r.getOptions().initialPage && e.el && e.el.parentElement) || e.state !== void 0 && e.state !== 1) return;
		p = !1;
		let t = e.panzoomRef, n = t?.getTween(), i = h("zoomEffect") && n ? H(e) : void 0;
		if (t && n && i) {
			let { x: e, y: r, scale: a } = t.getStartPosition();
			n.spring({
				tension: 215,
				friction: 25,
				restDelta: .001,
				restSpeed: .001,
				maxSpeed: 1 / 0
			}).from(i).to({
				x: e,
				y: r,
				scale: a
			}).start();
			return;
		}
		let a = t?.getContent() || e.htmlEl;
		a && Ct(a, h("showClass", e));
	}
	function R() {
		return Z.getInstance()?.getId() === l;
	}
	function z() {
		return (r?.getPage())?.slides[0];
	}
	function se() {
		let e = z();
		return e ? e.triggerEl || h("triggerEl") : void 0;
	}
	function H(e) {
		let t = e.thumbEl;
		if (!t || !((e) => {
			let t = e.getBoundingClientRect(), n = e.closest("[style]"), r = n?.parentElement;
			if (n && n.style.transform && r) {
				let e = r.getBoundingClientRect();
				if (t.left < e.left || t.left > e.left + e.width - t.width || t.top < e.top || t.top > e.top + e.height - t.height) return !1;
			}
			let i = Math.max(document.documentElement.clientHeight, window.innerHeight), a = Math.max(document.documentElement.clientWidth, window.innerWidth);
			return !(t.bottom < 0 || t.top - i >= 0 || t.right < 0 || t.left - a >= 0);
		})(t)) return;
		let n = (e.panzoomRef?.getWrapper())?.getBoundingClientRect(), r = n?.width, i = n?.height;
		if (!r || !i) return;
		let a = t.getBoundingClientRect(), o = a.width, s = a.height, c = a.left, l = a.top;
		if (!(!a || !o || !s)) {
			if (t instanceof HTMLImageElement) {
				let e = window.getComputedStyle(t).getPropertyValue("object-fit");
				if (e === "contain" || e === "scale-down") {
					let { width: n, height: r } = ((e, t, n, r, i = "contain") => {
						if (i === "contain" || e > n || t > r) {
							let i = n / e, a = r / t, o = Math.min(i, a);
							e *= o, t *= o;
						}
						return {
							width: e,
							height: t
						};
					})(t.naturalWidth, t.naturalHeight, o, s, e);
					c += .5 * (o - n), l += .5 * (s - r), o = n, s = r;
				}
			}
			if (!(Math.abs(r / i - o / s) > .1)) return {
				x: c + .5 * o - (n.left + .5 * r),
				y: l + .5 * s - (n.top + .5 * i),
				scale: o / r
			};
		}
	}
	function U() {
		o && clearTimeout(o), o = void 0, document.removeEventListener("mousemove", ne);
	}
	function le() {
		if (f || o) return;
		let e = h("idle");
		e && (o = setTimeout(ue, e));
	}
	function ue() {
		t && (U(), B(t, "is-idle"), document.addEventListener("mousemove", ne), f = !0);
	}
	function fe() {
		f && (pe(), le());
	}
	function pe() {
		U(), t?.classList.remove("is-idle"), f = !1;
	}
	function me() {
		let e = se();
		var t;
		!e || (t = e.getBoundingClientRect()).bottom > 0 && t.right > 0 && t.left < (window.innerWidth || document.documentElement.clientWidth) && t.top < (window.innerHeight || document.documentElement.clientHeight) || e.closest("[inert]") || e.scrollIntoView({
			behavior: "instant",
			block: "center",
			inline: "center"
		});
	}
	function he(e, t) {
		var n, o, c, l, u;
		if (s === X.Closing || s === X.Destroyed) return;
		let d = new Event("shouldClose", {
			bubbles: !0,
			cancelable: !0
		});
		if (S("shouldClose", d, e), d.defaultPrevented) return;
		if (U(), e) {
			if (e.defaultPrevented) return;
			St(e), e.stopPropagation(), e.stopImmediatePropagation();
		}
		if (s = X.Closing, a?.pause(), i?.destroy(), r) {
			(n = r.getGestures()) == null || n.destroy(), (o = r.getTween()) == null || o.pause();
			for (let e of r.getSlides()) {
				let t = e.panzoomRef;
				t && (_e(t.getOptions(), {
					clickAction: !1,
					dblClickAction: !1,
					wheelAction: !1,
					bounds: !1,
					minScale: 0,
					maxScale: 1 / 0
				}), (c = t.getGestures()) == null || c.destroy(), (l = t.getTween()) == null || l.pause());
			}
		}
		let f = r?.getPlugins();
		(u = f?.Autoplay) == null || u.stop();
		let p = f?.Fullscreen;
		p && p.inFullscreen() ? Promise.resolve(p.exit()).then(() => {
			setTimeout(() => {
				ge(e, t);
			}, 150);
		}) : ge(e, t);
	}
	function ge(n, i) {
		if (s !== X.Closing) return;
		S("close", n), p = !1, document.body.removeEventListener("click", I), document.body.removeEventListener("keydown", re, {
			passive: !1,
			capture: !0
		}), h("placeFocusBack") && me();
		let a = document.activeElement;
		a && e != null && e.contains(a) && a.blur(), h("fadeEffect") && (t?.classList.remove("is-ready"), t?.classList.add("is-hiding")), t?.classList.add("is-closing");
		let o = z(), c = o?.el, l = o?.panzoomRef, u = (o?.panzoomRef)?.getTween(), d = i || h("hideClass"), f = !1, m = !1;
		if (r && o && c && l && u) {
			let e;
			if (h("zoomEffect") && o.state === 1 && (e = H(o)), e) {
				f = !0;
				let t = () => {
					e = H(o), e ? u.to(Object.assign(Object.assign({}, de), e)) : G();
				};
				l.on("refresh", () => {
					t();
				}), u.easing(ee.Easings.EaseOut).duration(350).from(Object.assign({}, l.getTransform())).to(Object.assign(Object.assign({}, de), e)).start(), c != null && c.getAnimations() && (c.style.animationPlayState = "paused", requestAnimationFrame(() => {
					t();
				}));
			}
		}
		let g = o?.htmlEl || (o?.panzoomRef)?.getWrapper();
		g && wt(g), !f && d && g && (m = !0, Ct(g, d, () => {
			G();
		})), f || m ? setTimeout(() => {
			G();
		}, 350) : G();
	}
	function G() {
		var n, i, a;
		if (s === X.Destroyed) return;
		s = X.Destroyed;
		let o = se();
		S("destroy"), (n = h("sync")?.getPlugins().Autoplay) == null || n.resume(), (i = h("sync")?.getPlugins().Autoscroll) == null || i.resume(), e instanceof HTMLDialogElement && e.close(), (a = r?.getContainer()) == null || a.classList.remove("is-idle"), r?.destroy();
		for (let e of Object.values(u)) e?.destroy();
		if (u = {}, e?.remove(), e = void 0, t = void 0, r = void 0, Et.delete(l), !Et.size && (Te(!1), document.documentElement.classList.remove(Ot), h("placeFocusBack") && o && !o.closest("[inert]"))) try {
			o?.focus({ preventScroll: !0 });
		} catch {}
	}
	let K = {
		close: he,
		destroy: G,
		getCarousel: function() {
			return r;
		},
		getContainer: function() {
			return t;
		},
		getId: function() {
			return l;
		},
		getOptions: function() {
			return c;
		},
		getPlugins: function() {
			return u;
		},
		getSlide: function() {
			return z();
		},
		getState: function() {
			return s;
		},
		init: function(i = [], a = {}) {
			s !== X.Init && (K.destroy(), s = X.Init), c = _e({}, Tt, a), l = h("id") || "fancybox-" + ++Dt;
			let o = Et.get(l);
			if (o && o.destroy(), Et.set(l, K), S("init"), function() {
				for (let [e, t] of Object.entries(Object.assign(Object.assign({}, Z.Plugins), c.plugins || {}))) if (e && !u[e] && t instanceof Function) {
					let n = t();
					n.init(K), u[e] = n;
				}
				S("initPlugins");
			}(), function(e = []) {
				S("initSlides", e), d = [...e];
			}(i), function() {
				let n = h("parentEl") || document.body;
				if (!(n && n instanceof HTMLElement) || (e = x(g(h("mainTpl") || "")) || void 0, !e) || (t = e.querySelector(".fancybox__container"), !(t && t instanceof HTMLElement))) return;
				let i = h("mainClass");
				i && B(t, i);
				let a = h("mainStyle");
				if (a && C(a)) for (let [e, n] of Object.entries(a)) t.style.setProperty(e, n);
				let o = h("theme"), s = o === "auto" ? window.matchMedia("(prefers-color-scheme:light)").matches : o === "light";
				t.setAttribute("theme", s ? "light" : "dark"), e.setAttribute("id", `${l}`), e.addEventListener("keydown", (e) => {
					e.key === "Escape" && St(e);
				}), e.addEventListener("wheel", (e) => {
					let t = e.target, n = h("wheel", e);
					t.closest(".f-thumbs") && (n = "slide");
					let i = n === "slide", a = [
						-e.deltaX || 0,
						-e.deltaY || 0,
						-e.detail || 0
					].reduce(function(e, t) {
						return Math.abs(t) > Math.abs(e) ? t : e;
					}), o = Math.max(-1, Math.min(1, a)), s = Date.now();
					m && s - m < 300 ? i && St(e) : (m = s, S("wheel", e, o), e.defaultPrevented || (n === "close" ? he(e) : n === "slide" && r && !b(t) && (St(e), r[o > 0 ? "prev" : "next"]())));
				}, {
					capture: !0,
					passive: !1
				}), e.addEventListener("cancel", (e) => {
					he(e);
				}), n.append(e), Et.size === 1 && (h("hideScrollbar") && Te(!0), document.documentElement.classList.add(Ot)), S("initLayout"), e instanceof HTMLDialogElement && (h("modal") ? e.showModal() : e.show());
			}(), function() {
				if (n = e?.querySelector(".fancybox__carousel") || void 0, !n) return;
				n.fancybox = K;
				let i = _e({}, {
					Autoplay: {
						autoStart: !1,
						pauseOnHover: !1,
						progressbarParentEl: (e) => {
							let t = e.getContainer();
							return t?.querySelector(".f-carousel__toolbar [data-autoplay-action]") || t;
						}
					},
					Fullscreen: { el: t },
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
						Sync: je,
						Arrows: Le,
						Lazyload: Fe,
						Zoomable: ke,
						Html: Ze,
						Video: et,
						Autoplay: Ke,
						Fullscreen: rt,
						Thumbs: Ye,
						Toolbar: Y
					}
				}, h("Carousel") || {}, {
					slides: d,
					enabled: !0,
					initialPage: h("startIndex") || 0,
					l10n: h("l10n")
				});
				r = we(n, i), S("initCarousel", r), r.on("*", (e, t, ...n) => {
					S(`Carousel.${t}`, e, ...n);
				}), r.on("attachSlideEl", T), r.on("detachSlideEl", E), r.on("contentLoading", j), r.on("contentReady", M), r.on("ready", k), r.on("change", O), r.on("settle", A), r.on("thumbs:ready", N), r.on("thumbs:destroy", N), r.init();
			}(), e && t) {
				if (h("closeExisting")) for (let [e, t] of Et.entries()) e !== l && t.close();
				h("fadeEffect") ? (setTimeout(() => {
					w();
				}, 500), B(t, "is-revealing")) : w(), t.classList.add("is-ready"), s = X.Ready, S("ready");
			}
		},
		isCurrentSlide: function(e) {
			let t = z();
			return !(!e || !t) && t.index === e.index;
		},
		isTopMost: function() {
			return R();
		},
		localize: g,
		off: function(e, t) {
			return y.has(e) && y.set(e, y.get(e).filter((e) => e !== t)), K;
		},
		on: function(e, t) {
			return y.set(e, [...y.get(e) || [], t]), K;
		},
		toggleIdle(e) {
			(f || !0 === e) && ue(), f && !1 !== e || pe();
		}
	};
	return K;
};
function At() {
	for (let e of Object.values(Z.Plugins)) {
		let t = e.setup;
		typeof t == "function" && t(Z);
	}
}
function jt(e, t = {}) {
	var n, r, i;
	if (!(e && e instanceof Element)) return;
	let a, o, s, c, l = {};
	for (let [t, n] of Z.openers) if (t.contains(e)) for (let [r, i] of n) {
		let n;
		if (r) {
			for (let i of t.querySelectorAll(r)) if (i.contains(e)) {
				n = i;
				break;
			}
			if (!n) continue;
		}
		for (let [r, u] of i) {
			let i = null;
			try {
				i = e.closest(r);
			} catch {}
			i && (o = t, s = n, a = i, c = r, _e(l, u || {}));
		}
	}
	if (!o || !c || !a) return;
	let u = _e({}, Tt, t, l, { triggerEl: a }), d = [].slice.call((s || o).querySelectorAll(c)), f = a.closest(".f-carousel"), p = f?.carousel;
	if (p && (!s || !f.contains(s))) {
		let e = [];
		for (let t of p?.getSlides()) {
			let n = t.el;
			n && (n.matches(c) ? e.push(n) : e.push(...[].slice.call(n.querySelectorAll(c))));
		}
		e.length && (d = [...e], (n = p.getPlugins().Autoplay) == null || n.pause(), (r = p.getPlugins().Autoscroll) == null || r.pause(), u.sync = p);
	}
	if (!1 === u.groupAll) {
		let e = u.groupAttr, t = e && a ? a.getAttribute(`${e}`) : "";
		d = e && t && t !== "true" ? d.filter((n) => n.getAttribute(`${e}`) === t) : [a];
	}
	if (!d.length) return;
	(i = u.triggerEvent) == null || i.preventDefault();
	let m = Z.getInstance(), h = m?.getState();
	if (m && (h === X.Init || h === X.Ready)) {
		let e = m.getOptions().triggerEl;
		if (e && d.indexOf(e) > -1) return;
	}
	return Object.assign({}, u.Carousel || {}).rtl && (d = d.reverse()), a && t.startIndex === void 0 && (u.startIndex = d.indexOf(a)), Z.fromNodes(d, u);
}
var Z = {
	Plugins: { Hash: yt },
	version: "6.1.14",
	openers: /* @__PURE__ */ new Map(),
	bind: function(e, t, n, r) {
		if (!Ee()) return;
		let i = document.body, a = null, o = "[data-fancybox]", s = {};
		e instanceof Element && (i = e), _(e) && _(t) ? (a = e, o = t) : _(t) && _(n) ? (a = t, o = n) : _(t) ? o = t : _(e) && (o = e), typeof t == "object" && (s = t || {}), typeof n == "object" && (s = n || {}), typeof r == "object" && (s = r || {}), function(e, t, n, r = {}) {
			if (!(e && e instanceof Element && n)) return;
			let i = Z.openers.get(e) || /* @__PURE__ */ new Map(), a = i.get(t) || /* @__PURE__ */ new Map();
			a.set(n, r), i.set(t, a), Z.openers.set(e, i), i.size === 1 && e.addEventListener("click", Z.fromEvent), At();
		}(i, a, o, s);
	},
	close: function(e = !0, ...t) {
		if (e) for (let e of Et.values()) e.close(...t);
		else {
			let e = Z.getInstance();
			e && e.close(...t);
		}
	},
	destroy: function() {
		let e;
		for (; e = Z.getInstance();) e.destroy();
		for (let e of Z.openers.keys()) e.removeEventListener("click", Z.fromEvent);
		Z.openers.clear();
	},
	fromEvent: function(e) {
		if (e.defaultPrevented || e.button && e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey) return;
		let t = e.composedPath()[0], n = { triggerEvent: e };
		if (t.closest(".fancybox__container.is-hiding")) return St(e), void e.stopPropagation();
		let r = t.closest("[data-fancybox-delegate]") || void 0;
		if (r) {
			let e = r.dataset.fancyboxDelegate || "", i = document.querySelectorAll(`[data-fancybox="${e}"]`), a = parseInt(r.dataset.fancyboxIndex || "", 10) || 0;
			t = i[a] || i[0], _e(n, {
				delegateEl: r,
				startIndex: a
			});
		}
		return jt(t, n);
	},
	fromNodes: function(e, t) {
		t = _e({}, Tt, t || {});
		let n = [], r = (e) => e instanceof HTMLImageElement ? e : e instanceof HTMLElement ? e.querySelector("img:not([aria-hidden])") : void 0;
		for (let i of e) {
			let a = i.dataset || {}, o = t.delegateEl && e.indexOf(i) === t.startIndex ? t.delegateEl : void 0, s = r(o) || r(i) || void 0, c = a.src || i.getAttribute("href") || i.getAttribute("currentSrc") || i.getAttribute("src") || void 0, l = a.thumb || a.thumbSrc || s?.getAttribute("currentSrc") || s?.getAttribute("src") || s?.dataset.lazySrc || void 0, u = {
				src: c,
				alt: a.alt || s?.getAttribute("alt") || void 0,
				thumbSrc: l,
				thumbEl: s,
				triggerEl: i,
				delegateEl: o
			};
			for (let e in a) {
				let t = a[e] + "";
				u[e] = t === "true" ? e !== "fancybox" || "" : t !== "false" && t;
			}
			n.push(u);
		}
		return Z.show(n, t);
	},
	fromSelector: function(e, t, n, r) {
		if (!Ee()) return;
		let i = document.body, a = null, o = "[data-fancybox]", s = {};
		e instanceof Element && (i = e), _(e) && _(t) ? (a = e, o = t) : _(t) && _(n) ? (a = t, o = n) : _(t) ? o = t : _(e) && (o = e), typeof t == "object" && (s = t || {}), typeof n == "object" && (s = n || {}), typeof r == "object" && (s = r || {});
		for (let [e, t] of Z.openers) for (let [n, r] of t) for (let [t, c] of r) if (e === i && n === a) {
			let e = i.querySelector((n ? `${n} ` : "") + o);
			if (e && e.matches(t)) return Z.fromTriggerEl(e, s);
		}
	},
	fromTriggerEl: jt,
	getCarousel: function() {
		return Z.getInstance()?.getCarousel() || void 0;
	},
	getDefaults: function() {
		return Tt;
	},
	getInstance: function(e) {
		if (e) {
			let t = Et.get(e);
			return t && t.getState() !== X.Destroyed ? t : void 0;
		}
		return Array.from(Et.values()).reverse().find((e) => {
			if (e.getState() !== X.Destroyed) return e;
		}) || void 0;
	},
	getSlide: function() {
		return Z.getInstance()?.getSlide() || void 0;
	},
	show: function(e = [], t = {}) {
		return At(), kt().init(e, t);
	},
	unbind: function(e, t, n) {
		if (!Ee()) return;
		let r = document.body, i = null, a = "[data-fancybox]";
		e instanceof Element && (r = e), _(e) && _(t) ? (i = e, a = t) : _(t) && _(n) ? (i = t, a = n) : _(t) ? a = t : _(e) && (a = e), function(e, t, n) {
			if (!(e && e instanceof Element && n)) return;
			let r = Z.openers.get(e) || /* @__PURE__ */ new Map(), i = r.get(t) || /* @__PURE__ */ new Map();
			i && n && i.delete(n), i.size && n || r.delete(t), r.size || (Z.openers.delete(e), e.removeEventListener("click", Z.fromEvent));
		}(r, i, a);
	}
}, Mt = {
	name: "2sxc-docs",
	version: "21.00.00",
	description: "",
	templateName: "2sxc",
	enableDebug: !1,
	scripts: {
		"theme-build": "vite build --mode production --config ./templates/shared-global/vite.config.mjs",
		"theme-dev": "vite build --watch --mode development --config ./templates/shared-global/vite.config.mjs",
		"// import": "Note: This is not yet working",
		import: "npm run import-js && npm run import-jsng",
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
		sass: "^1.102.0",
		type2docfx: "^1.3.5",
		typedoc: "^0.28.20",
		typescript: "^6.0.3",
		vite: "^8.2.1"
	},
	dependencies: {
		"@fancyapps/ui": "^6.1.14",
		"highlightjs-cshtml-razor": "^2.2.0",
		"js-yaml": "^5.2.3"
	}
}, { enableDebug: Nt } = Mt;
function Pt() {
	let e = "img:not(#logo):not(.for-link):not(.feature)";
	document.querySelectorAll(e).forEach((e) => {
		Nt && console.log("2dm img", e);
		let t = e.src;
		e.style.cursor = "zoom-in", e.style.cursor = "-moz-zoom-in", e.style.cursor = "-webkit-zoom-in";
		let n = e.parentElement?.tagName === "DIV" ? e.parentElement : e.parentElement?.parentElement?.tagName === "DIV" ? e.parentElement?.parentElement : null;
		if (n) {
			Nt && console.log("found div around img", n);
			let t = n.attributes.getNamedItem("gallery");
			if (t !== null) {
				let n = t.value;
				e.dataset.fancybox = n || "gallery";
			} else n?.classList.contains("gallery") && (e.dataset.fancybox = "gallery");
		}
		e.alt || e.setAttribute("alt", t);
	}), Z.bind(e);
}
//#endregion
//#region templates/shared-global/src/scripts/versions.ts
function Q() {
	let e = document.getElementsByClassName("version-button")[0];
	if (!e) {
		console.log("Version button not found");
		return;
	}
	var t = e.href + "?version=" + Mt.version + "&path=" + window.location.pathname;
	e.setAttribute("href", t);
}
//#endregion
//#region templates/shared-global/src/scripts/context-illustrations.ts
var { enableDebug: Ft } = Mt;
function It() {
	let e = document.getElementsByClassName("fancybox-auto"), t = Array.from(e);
	Ft && console.log(`context containers ${t.length}`, t);
	for (var n = 0; n < t.length; n++) {
		let e = t[n];
		e.id ||= "rndId-" + Math.floor(Math.random() * 9999999);
		var r = e.parentElement?.className;
		if (r) {
			var i = r.split(" ").find((e) => e.startsWith("context"));
			i && e.classList.add(i);
		}
		Ft && console.log("context containers", e.id, r);
		let a = Lt(e, `${e.id}-clone`);
		e.setAttribute("data-src", `#${e.id}-clone`), a.style.display = "none", e.attributes.setNamedItem(document.createAttribute("data-fancybox"));
	}
	Z.bind("[data-fancybox]");
}
function Lt(e, t) {
	let n = e.cloneNode(!0);
	return n.id = t, n.style.width = "95%", document.body.appendChild(n), n;
}
//#endregion
//#region templates/shared-global/src/scripts/svgs/svg-importer.ts
var { enableDebug: Rt } = Mt;
Rt && console.log("svg-importer loaded");
function zt() {
	let e = document.querySelectorAll("img.svg");
	Rt && console.log(`inlineSvgs ${e.length}`, e), e.forEach((e) => {
		if (!e.src.endsWith(".svg")) return;
		let t = e, n = t.src, r = t.id, i = t.className, a = t.getAttribute("width"), o = t.getAttribute("height");
		fetch(n).then((e) => e.text()).then((e) => {
			let n = new DOMParser().parseFromString(e, "text/xml").getElementsByTagName("svg")[0];
			n && (r != null && (n.id = r), i != null && n.setAttribute("class", i + " replaced-svg"), a != null && n.setAttribute("width", a), o != null && n.setAttribute("height", o), n.removeAttribute("xmlns:a"), t.parentNode?.replaceChild(n, t));
		});
	});
}
//#endregion
//#region templates/shared-global/src/scripts/docs-links.ts
function Bt() {
	let e = document.querySelectorAll("ul li a[title^=\"icon:\"]");
	e.length && e.forEach((e) => {
		let t = e.closest("li"), n = e.closest("ul");
		if (!t || !n) return;
		n.classList.add("row", "row-cols-1", "row-cols-sm-2", "row-cols-md-3", "g-3", "docs-tiles", "list-unstyled");
		let r = e.textContent?.trim() || "", i = (t.textContent || "").replace(r, "").trim(), a = e.getAttribute("href") || "#", o = e.getAttribute("target") || (a.startsWith("http") ? "_blank" : ""), s = e.getAttribute("rel") || (o === "_blank" ? "noopener noreferrer" : ""), c = e.getAttribute("title") || "", l = c.startsWith("icon:") ? c.substring(5) : "", u = /\p{Extended_Pictographic}/u.test(l), d = u ? l : "", f = u ? "" : `bi bi-${l || "link"}`, p = o ? ` target="${o}"` : "", m = s ? ` rel="${s}"` : "";
		t.classList.add("col"), t.innerHTML = `
      <div class="card h-100 text-center position-relative">
        <div class="card-body d-flex flex-column justify-content-center align-items-center py-4">
          <icon class="${f} fs-1 text-primary mb-2">${d}</icon>
          <div class="fw-semibold">${r}</div>
          ${i ? `<div class="small text-muted mt-1">${i}</div>` : ""}
        </div>
        <a href="${a}"${p}${m} class="stretched-link"></a>
      </div>
    `;
	});
}
//#endregion
//#region templates/2sxc/src/main.ts
var Vt = { configureHljs: (e) => {
	e.registerLanguage("cshtml-razor", d), e.registerAliases("razor", { languageName: "cshtml-razor" });
} };
g(function() {
	Pt(), Q(), zt(), h.runXrefPage(), It(), Bt();
});
//#endregion
export { Vt as default };

//# sourceMappingURL=main.js.map