module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = {
	  Collection: __webpack_require__(1),
	  Record: __webpack_require__(29),
	  Model: __webpack_require__(36)
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = __webpack_require__(10)["default"];

	var _classCallCheck = __webpack_require__(13)["default"];

	var _Symbol = __webpack_require__(14)["default"];

	var _Number$isInteger = __webpack_require__(25)["default"];

	var _Object$assign = __webpack_require__(2)["default"];

	var _interopRequireDefault = __webpack_require__(28)["default"];

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _recordEs6 = __webpack_require__(29);

	var _recordEs62 = _interopRequireDefault(_recordEs6);

	var _relationEs6 = __webpack_require__(35);

	var _relationEs62 = _interopRequireDefault(_relationEs6);

	var recordsKey = _Symbol("recordsKey");
	var indexKey = _Symbol("indexKey");

	var Collection = (function () {
	  function Collection() {
	    var _this = this;

	    var options = arguments[0] === undefined ? {} : arguments[0];

	    _classCallCheck(this, Collection);

	    options.records = options.records || [];
	    this.model = options.model;
	    this[recordsKey] = [];
	    this[indexKey] = [];
	    options.records.forEach(function (attrs) {
	      _this.create(attrs);
	    });
	  }

	  _createClass(Collection, [{
	    key: "toJSON",
	    value: function toJSON() {
	      return this.all.map(function (record) {
	        return record.toJSON();
	      });
	    }
	  }, {
	    key: "get",
	    value: function get(index) {
	      if (!this.any) throw "Can't find record in empty collection";
	      if (index == undefined) throw "Attribute index can't be blank";
	      if (!_Number$isInteger(index)) throw "Attribute index: " + index + " should be integer";
	      if (index >= this.size) throw "Attribute index: " + index + " is out of records bounds";
	      return this.all[index];
	    }
	  }, {
	    key: "exist",
	    value: function exist(id) {
	      var index = this[indexKey].indexOf(id);
	      return index !== -1 ? index : false;
	    }
	  }, {
	    key: "find",
	    value: function find(id) {
	      var index = this.exist(id);
	      return index !== false ? this.get(index) : false;
	    }
	  }, {
	    key: "findBy",
	    value: function findBy(field, value) {
	      if (field == undefined) throw "Attribute field can't be blank";
	      if (value == undefined) throw "Attribute value can't be blank";
	      // if (!String.isString(field)) throw `Attribute field: ${field} should be string`;

	      var size = this.size,
	          record = false;
	      for (var index = 0; index < size; index++) {
	        record = this.get(index);
	        if (record[field] === value) {
	          break;
	        }
	      }
	      return record;
	    }
	  }, {
	    key: "create",
	    value: function create() {
	      var fields = arguments[0] === undefined ? {} : arguments[0];

	      var key = this.model.primaryKey;
	      var fieldId = fields[key];
	      var index = this.exist(fieldId);
	      if (index === false) {
	        var record = new _recordEs62["default"]({
	          fields: fields,
	          collection: this
	        });
	        this[recordsKey].push(record);
	        this[indexKey].push(fieldId);
	        return record;
	      } else {
	        throw "Record with given " + key + ": " + fieldId + " already exist.";
	      }
	    }
	  }, {
	    key: "update",
	    value: function update(id, fields) {}
	  }, {
	    key: "destroy",
	    value: function destroy(id) {
	      var index = this.exist(id),
	          record = _Object$assign({}, this.find(index));

	      if (index !== false) {
	        this.all.splice(index, 1);
	        this[indexKey].splice(index, 1);
	        return record;
	      } else {
	        return false;
	      }
	    }
	  }, {
	    key: "where",
	    value: function where(field) {
	      return new _relationEs62["default"]({
	        current: 0,
	        collection: this,
	        state: _relationEs62["default"].states.DEFINE_FIELD_NAME,
	        whereRule: {
	          id: 0,
	          type: "field",
	          rule: "",
	          name: field
	        }
	      });
	    }
	  }, {
	    key: "sort",
	    value: function sort(fn) {}
	  }, {
	    key: "all",
	    get: function get() {
	      return this[recordsKey];
	    }
	  }, {
	    key: "size",
	    get: function get() {
	      return this.all.length;
	    }
	  }, {
	    key: "any",
	    get: function get() {
	      return this.size > 0;
	    }
	  }]);

	  return Collection;
	})();

	exports["default"] = Collection;
	module.exports = exports["default"];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	module.exports = __webpack_require__(6).core.Object.assign;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $def = __webpack_require__(5);
	$def($def.S, 'Object', {assign: __webpack_require__(8)});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(6)
	  , global     = $.g
	  , core       = $.core
	  , isFunction = $.isFunction;
	function ctx(fn, that){
	  return function(){
	    return fn.apply(that, arguments);
	  };
	}
	// type bitmap
	$def.F = 1;  // forced
	$def.G = 2;  // global
	$def.S = 4;  // static
	$def.P = 8;  // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	function $def(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & $def.G
	    , isProto  = type & $def.P
	    , target   = isGlobal ? global : type & $def.S
	        ? global[name] : (global[name] || {}).prototype
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    if(isGlobal && !isFunction(target[key]))exp = source[key];
	    // bind timers to global for call from export context
	    else if(type & $def.B && own)exp = ctx(out, global);
	    // wrap global constructors for prevent change them in library
	    else if(type & $def.W && target[key] == out)!function(C){
	      exp = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      exp.prototype = C.prototype;
	    }(out);
	    else exp = isProto && isFunction(out) ? ctx(Function.call, out) : out;
	    // export
	    exports[key] = exp;
	    if(isProto)(exports.prototype || (exports.prototype = {}))[key] = out;
	  }
	}
	module.exports = $def;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global = typeof self != 'undefined' ? self : Function('return this')()
	  , core   = {}
	  , defineProperty = Object.defineProperty
	  , hasOwnProperty = {}.hasOwnProperty
	  , ceil  = Math.ceil
	  , floor = Math.floor
	  , max   = Math.max
	  , min   = Math.min;
	// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
	var DESC = !!function(){
	  try {
	    return defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
	  } catch(e){ /* empty */ }
	}();
	var hide = createDefiner(1);
	// 7.1.4 ToInteger
	function toInteger(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	}
	function desc(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	}
	function simpleSet(object, key, value){
	  object[key] = value;
	  return object;
	}
	function createDefiner(bitmap){
	  return DESC ? function(object, key, value){
	    return $.setDesc(object, key, desc(bitmap, value));
	  } : simpleSet;
	}

	function isObject(it){
	  return it !== null && (typeof it == 'object' || typeof it == 'function');
	}
	function isFunction(it){
	  return typeof it == 'function';
	}
	function assertDefined(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	}

	var $ = module.exports = __webpack_require__(7)({
	  g: global,
	  core: core,
	  html: global.document && document.documentElement,
	  // http://jsperf.com/core-js-isobject
	  isObject:   isObject,
	  isFunction: isFunction,
	  that: function(){
	    return this;
	  },
	  // 7.1.4 ToInteger
	  toInteger: toInteger,
	  // 7.1.15 ToLength
	  toLength: function(it){
	    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	  },
	  toIndex: function(index, length){
	    index = toInteger(index);
	    return index < 0 ? max(index + length, 0) : min(index, length);
	  },
	  has: function(it, key){
	    return hasOwnProperty.call(it, key);
	  },
	  create:     Object.create,
	  getProto:   Object.getPrototypeOf,
	  DESC:       DESC,
	  desc:       desc,
	  getDesc:    Object.getOwnPropertyDescriptor,
	  setDesc:    defineProperty,
	  setDescs:   Object.defineProperties,
	  getKeys:    Object.keys,
	  getNames:   Object.getOwnPropertyNames,
	  getSymbols: Object.getOwnPropertySymbols,
	  assertDefined: assertDefined,
	  // Dummy, fix for not array-like ES3 string in es5 module
	  ES5Object: Object,
	  toObject: function(it){
	    return $.ES5Object(assertDefined(it));
	  },
	  hide: hide,
	  def: createDefiner(0),
	  set: global.Symbol ? simpleSet : hide,
	  each: [].forEach
	});
	/* eslint-disable no-undef */
	if(typeof __e != 'undefined')__e = core;
	if(typeof __g != 'undefined')__g = global;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function($){
	  $.FW   = false;
	  $.path = $.core;
	  return $;
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(6)
	  , enumKeys = __webpack_require__(9);
	// 19.1.2.1 Object.assign(target, source, ...)
	/* eslint-disable no-unused-vars */
	module.exports = Object.assign || function assign(target, source){
	/* eslint-enable no-unused-vars */
	  var T = Object($.assertDefined(target))
	    , l = arguments.length
	    , i = 1;
	  while(l > i){
	    var S      = $.ES5Object(arguments[i++])
	      , keys   = enumKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)T[key = keys[j++]] = S[key];
	  }
	  return T;
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(6);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getDesc    = $.getDesc
	    , getSymbols = $.getSymbols;
	  if(getSymbols)$.each.call(getSymbols(it), function(key){
	    if(getDesc(it, key).enumerable)keys.push(key);
	  });
	  return keys;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$defineProperty = __webpack_require__(11)["default"];

	exports["default"] = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;

	      _Object$defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	})();

	exports.__esModule = true;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(12), __esModule: true };

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(6);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	exports.__esModule = true;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(15), __esModule: true };

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(16);
	module.exports = __webpack_require__(6).core.Symbol;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $        = __webpack_require__(6)
	  , setTag   = __webpack_require__(17).set
	  , uid      = __webpack_require__(20)
	  , shared   = __webpack_require__(19)
	  , $def     = __webpack_require__(5)
	  , $redef   = __webpack_require__(21)
	  , keyOf    = __webpack_require__(22)
	  , enumKeys = __webpack_require__(9)
	  , assertObject = __webpack_require__(23).obj
	  , ObjectProto = Object.prototype
	  , DESC     = $.DESC
	  , has      = $.has
	  , $create  = $.create
	  , getDesc  = $.getDesc
	  , setDesc  = $.setDesc
	  , desc     = $.desc
	  , $names   = __webpack_require__(24)
	  , getNames = $names.get
	  , toObject = $.toObject
	  , $Symbol  = $.g.Symbol
	  , setter   = false
	  , TAG      = uid('tag')
	  , HIDDEN   = uid('hidden')
	  , _propertyIsEnumerable = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols = shared('symbols')
	  , useNative = $.isFunction($Symbol);

	var setSymbolDesc = DESC ? function(){ // fallback for old Android
	  try {
	    return $create(setDesc({}, HIDDEN, {
	      get: function(){
	        return setDesc(this, HIDDEN, {value: false})[HIDDEN];
	      }
	    }))[HIDDEN] || setDesc;
	  } catch(e){
	    return function(it, key, D){
	      var protoDesc = getDesc(ObjectProto, key);
	      if(protoDesc)delete ObjectProto[key];
	      setDesc(it, key, D);
	      if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
	    };
	  }
	}() : setDesc;

	function wrap(tag){
	  var sym = AllSymbols[tag] = $.set($create($Symbol.prototype), TAG, tag);
	  DESC && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, desc(1, value));
	    }
	  });
	  return sym;
	}

	function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, desc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = $create(D, {enumerable: desc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return setDesc(it, key, D);
	}
	function defineProperties(it, P){
	  assertObject(it);
	  var keys = enumKeys(P = toObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)defineProperty(it, key = keys[i++], P[key]);
	  return it;
	}
	function create(it, P){
	  return P === undefined ? $create(it) : defineProperties($create(it), P);
	}
	function propertyIsEnumerable(key){
	  var E = _propertyIsEnumerable.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
	    ? E : true;
	}
	function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	}
	function getOwnPropertyNames(it){
	  var names  = getNames(toObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	}
	function getOwnPropertySymbols(it){
	  var names  = getNames(toObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	}

	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments[0]));
	  };
	  $redef($Symbol.prototype, 'toString', function(){
	    return this[TAG];
	  });

	  $.create     = create;
	  $.setDesc    = defineProperty;
	  $.getDesc    = getOwnPropertyDescriptor;
	  $.setDescs   = defineProperties;
	  $.getNames   = $names.get = getOwnPropertyNames;
	  $.getSymbols = getOwnPropertySymbols;

	  if($.DESC && $.FW)$redef(ObjectProto, 'propertyIsEnumerable', propertyIsEnumerable, true);
	}

	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	    'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	    'species,split,toPrimitive,toStringTag,unscopables'
	  ).split(','), function(it){
	    var sym = __webpack_require__(18)(it);
	    symbolStatics[it] = useNative ? sym : wrap(sym);
	  }
	);

	setter = true;

	$def($def.G + $def.W, {Symbol: $Symbol});

	$def($def.S, 'Symbol', symbolStatics);

	$def($def.S + $def.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: getOwnPropertySymbols
	});

	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setTag($.g.JSON, 'JSON', true);

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(6)
	  , TAG      = __webpack_require__(18)('toStringTag')
	  , toString = {}.toString;
	function cof(it){
	  return toString.call(it).slice(8, -1);
	}
	cof.classof = function(it){
	  var O, T;
	  return it == undefined ? it === undefined ? 'Undefined' : 'Null'
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T : cof(O);
	};
	cof.set = function(it, tag, stat){
	  if(it && !$.has(it = stat ? it : it.prototype, TAG))$.hide(it, TAG, tag);
	};
	module.exports = cof;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(6).g
	  , store  = __webpack_require__(19)('wks');
	module.exports = function(name){
	  return store[name] || (store[name] =
	    global.Symbol && global.Symbol[name] || __webpack_require__(20).safe('Symbol.' + name));
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var $      = __webpack_require__(6)
	  , SHARED = '__core-js_shared__'
	  , store  = $.g[SHARED] || ($.g[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var sid = 0;
	function uid(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++sid + Math.random()).toString(36));
	}
	uid.safe = __webpack_require__(6).g.Symbol || uid;
	module.exports = uid;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6).hide;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(6);
	module.exports = function(object, el){
	  var O      = $.toObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(6);
	function assert(condition, msg1, msg2){
	  if(!condition)throw TypeError(msg2 ? msg1 + msg2 : msg1);
	}
	assert.def = $.assertDefined;
	assert.fn = function(it){
	  if(!$.isFunction(it))throw TypeError(it + ' is not a function!');
	  return it;
	};
	assert.obj = function(it){
	  if(!$.isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};
	assert.inst = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};
	module.exports = assert;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var $ = __webpack_require__(6)
	  , toString = {}.toString
	  , getNames = $.getNames;

	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	function getWindowNames(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	}

	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames($.toObject(it));
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(26), __esModule: true };

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(27);
	module.exports = __webpack_require__(6).core.Number.isInteger;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var $     = __webpack_require__(6)
	  , $def  = __webpack_require__(5)
	  , abs   = Math.abs
	  , floor = Math.floor
	  , _isFinite = $.g.isFinite
	  , MAX_SAFE_INTEGER = 0x1fffffffffffff; // pow(2, 53) - 1 == 9007199254740991;
	function isInteger(it){
	  return !$.isObject(it) && _isFinite(it) && floor(it) === it;
	}
	$def($def.S, 'Number', {
	  // 20.1.2.1 Number.EPSILON
	  EPSILON: Math.pow(2, -52),
	  // 20.1.2.2 Number.isFinite(number)
	  isFinite: function isFinite(it){
	    return typeof it == 'number' && _isFinite(it);
	  },
	  // 20.1.2.3 Number.isInteger(number)
	  isInteger: isInteger,
	  // 20.1.2.4 Number.isNaN(number)
	  isNaN: function isNaN(number){
	    return number != number;
	  },
	  // 20.1.2.5 Number.isSafeInteger(number)
	  isSafeInteger: function isSafeInteger(number){
	    return isInteger(number) && abs(number) <= MAX_SAFE_INTEGER;
	  },
	  // 20.1.2.6 Number.MAX_SAFE_INTEGER
	  MAX_SAFE_INTEGER: MAX_SAFE_INTEGER,
	  // 20.1.2.10 Number.MIN_SAFE_INTEGER
	  MIN_SAFE_INTEGER: -MAX_SAFE_INTEGER,
	  // 20.1.2.12 Number.parseFloat(string)
	  parseFloat: parseFloat,
	  // 20.1.2.13 Number.parseInt(string, radix)
	  parseInt: parseInt
	});

/***/ },
/* 28 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = __webpack_require__(10)["default"];

	var _classCallCheck = __webpack_require__(13)["default"];

	var _Symbol = __webpack_require__(14)["default"];

	var _Object$preventExtensions = __webpack_require__(30)["default"];

	var _interopRequireDefault = __webpack_require__(28)["default"];

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _helpersDefineRecordFieldsEs6 = __webpack_require__(33);

	var _helpersDefineRecordFieldsEs62 = _interopRequireDefault(_helpersDefineRecordFieldsEs6);

	var fieldsKey = _Symbol("fields");
	var collectionKey = _Symbol("collection");
	var modelKey = _Symbol("model");

	var Record = (function () {
	  function Record() {
	    var _this = this;

	    var options = arguments[0] === undefined ? {} : arguments[0];

	    _classCallCheck(this, Record);

	    options.fields = options.fields || {};
	    this[fieldsKey] = {};
	    this[collectionKey] = options.collection;
	    this[modelKey] = options.collection.model;
	    this[modelKey].schema.forEach(function (_ref) {
	      var name = _ref.name;
	      var type = _ref.type;

	      (0, _helpersDefineRecordFieldsEs62["default"])({ name: name, type: type, holder: fieldsKey, context: _this });
	    });
	    for (var key in options.fields) {
	      this[key] = options.fields[key];
	    }
	    _Object$preventExtensions(this);
	  }

	  _createClass(Record, [{
	    key: "toJSON",
	    value: function toJSON() {
	      var _this2 = this;

	      var recordObj = {};
	      this[modelKey].schema.forEach(function (field) {
	        recordObj[field.name] = _this2[field.name];
	      });
	      return recordObj;
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      var model = this[modelKey];
	      return model.destroy(this[model.primaryKey]);
	    }
	  }]);

	  return Record;
	})();

	exports["default"] = Record;
	module.exports = exports["default"];

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(31), __esModule: true };

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(32);
	module.exports = __webpack_require__(6).core.Object.preventExtensions;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(6)
	  , $def     = __webpack_require__(5)
	  , isObject = $.isObject
	  , toObject = $.toObject;
	$.each.call(('freeze,seal,preventExtensions,isFrozen,isSealed,isExtensible,' +
	  'getOwnPropertyDescriptor,getPrototypeOf,keys,getOwnPropertyNames').split(',')
	, function(KEY, ID){
	  var fn     = ($.core.Object || {})[KEY] || Object[KEY]
	    , forced = 0
	    , method = {};
	  method[KEY] = ID == 0 ? function freeze(it){
	    return isObject(it) ? fn(it) : it;
	  } : ID == 1 ? function seal(it){
	    return isObject(it) ? fn(it) : it;
	  } : ID == 2 ? function preventExtensions(it){
	    return isObject(it) ? fn(it) : it;
	  } : ID == 3 ? function isFrozen(it){
	    return isObject(it) ? fn(it) : true;
	  } : ID == 4 ? function isSealed(it){
	    return isObject(it) ? fn(it) : true;
	  } : ID == 5 ? function isExtensible(it){
	    return isObject(it) ? fn(it) : false;
	  } : ID == 6 ? function getOwnPropertyDescriptor(it, key){
	    return fn(toObject(it), key);
	  } : ID == 7 ? function getPrototypeOf(it){
	    return fn(Object($.assertDefined(it)));
	  } : ID == 8 ? function keys(it){
	    return fn(toObject(it));
	  } : __webpack_require__(24).get;
	  try {
	    fn('z');
	  } catch(e){
	    forced = 1;
	  }
	  $def($def.S + $def.F * forced, 'Object', method);
	});

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$defineProperty = __webpack_require__(11)["default"];

	var _interopRequireDefault = __webpack_require__(28)["default"];

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _fieldTypesEs6 = __webpack_require__(34);

	var _fieldTypesEs62 = _interopRequireDefault(_fieldTypesEs6);

	exports["default"] = function (_ref) {
	  var name = _ref.name;
	  var type = _ref.type;
	  var holder = _ref.holder;
	  var context = _ref.context;

	  type = type || "string";
	  // Add default value
	  context[holder][name] = _fieldTypesEs62["default"][type]["default"];
	  _Object$defineProperty(context, name, {
	    get: function get() {
	      return context[holder][name];
	    },
	    set: function set(value) {
	      context[holder][name] = value;
	    }
	  });
	};

	module.exports = exports["default"];

/***/ },
/* 34 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = {
	  string: {
	    "default": ""
	  },
	  integer: {
	    "default": 0
	  },
	  boolean: {
	    "default": false
	  },
	  datetime: {
	    "default": Date.now()
	  }
	};
	module.exports = exports["default"];

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _classCallCheck = __webpack_require__(13)["default"];

	var _Symbol = __webpack_require__(14)["default"];

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var collectionKey = _Symbol("collectionKey");
	var whereRulesKey = _Symbol("rulesKey");

	var Relation = function Relation(_ref) {
	  var collection = _ref.collection;
	  var whereRule = _ref.whereRule;
	  var orderRule = _ref.orderRule;
	  var state = _ref.state;
	  var current = _ref.current;

	  _classCallCheck(this, Relation);

	  this.current = current;
	  this[collectionKey] = collection;
	  // where, order
	  this[whereRulesKey] = whereRule;

	  if (state === Relation.states.DEFINE_FIELD_NAME) {
	    if (current === this[whereRulesKey].id) {
	      this.is = function (value) {
	        this[whereRulesKey].rule = "==";
	        this[whereRulesKey].value = value;
	        // return new Relation({
	        //   current: this.current,
	        //   collection: this[collectionKey],
	        //   state: Relation.states.DEFINE_FIELD_RULE,
	        //   whereRule: this[whereRulesKey]
	        // });
	        return this[whereRulesKey];
	      };
	      this.isnt = function (value) {
	        this[whereRulesKey].rule = "!=";
	        this[whereRulesKey].value = value;
	        // return new Relation({
	        //   current: this.current,
	        //   collection: this[collectionKey],
	        //   state: Relation.states.DEFINE_FIELD_RULE,
	        //   whereRule: this[whereRulesKey]
	        // });
	        return this[whereRulesKey];
	      };
	      this.islike = function (value) {
	        this[whereRulesKey].rule = "~=";
	        this[whereRulesKey].value = value;
	        // return new Relation({
	        //   current: this.current,
	        //   collection: this[collectionKey],
	        //   state: Relation.states.DEFINE_FIELD_RULE,
	        //   whereRule: this[whereRulesKey]
	        // });
	        return this[whereRulesKey];
	      };
	    }
	  }
	};

	exports["default"] = Relation;

	Relation.states = {
	  DEFINE_FIELD_NAME: "DEFINE_FIELD_NAME",
	  DEFINE_FIELD_RULE: "DEFINE_FIELD_RULE",
	  DEFINE_GROUP: "DEFINE_GROUP"
	};
	module.exports = exports["default"];

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _inherits = __webpack_require__(37)["default"];

	var _get = __webpack_require__(40)["default"];

	var _createClass = __webpack_require__(10)["default"];

	var _classCallCheck = __webpack_require__(13)["default"];

	var _Symbol = __webpack_require__(14)["default"];

	var _interopRequireDefault = __webpack_require__(28)["default"];

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _events = __webpack_require__(43);

	var _helpersDefineMethodsEs6 = __webpack_require__(44);

	var _helpersDefineMethodsEs62 = _interopRequireDefault(_helpersDefineMethodsEs6);

	var _collectionEs6 = __webpack_require__(1);

	var _collectionEs62 = _interopRequireDefault(_collectionEs6);

	var ds = _Symbol("ds");

	var Model = (function (_EventEmitter) {
	  function Model() {
	    var options = arguments[0] === undefined ? {} : arguments[0];

	    _classCallCheck(this, Model);

	    _get(Object.getPrototypeOf(Model.prototype), "constructor", this).call(this);
	    this.primaryKey = "id";
	    this.schema = options.schema || [];
	    this[ds] = new Model.DefaultCollection({
	      model: this
	    });

	    (0, _helpersDefineMethodsEs62["default"])(Model.prototype, this[ds], ["toJSON", "exist", "find", "findBy", "where", "create", "update", "destroy", "sort"]);
	  }

	  _inherits(Model, _EventEmitter);

	  _createClass(Model, [{
	    key: "get",
	    value: function get(index) {
	      return this[ds].get(index);
	    }
	  }, {
	    key: "exist",
	    value: function exist(id) {
	      return this[ds].exist(id);
	    }

	    // find(id) {
	    //   return this[ds].find(id);
	    // }

	    // findBy(field, value) {
	    //   return this[ds].findBy(field, value);
	    // }

	    // where(field) {
	    //   return this[ds].where(field);
	    // }

	    // create(attrs) {
	    //   return this[ds].create(attrs);
	    // }
	    //
	    // update({id, attrs}) {
	    //   return this[ds].update({id, attrs});
	    // }
	    //
	    // destroy(id) {
	    //   return this[ds].destroy(id);
	    // }

	  }, {
	    key: "all",

	    // toJSON() {
	    //   return this[ds].toJSON();
	    // }

	    get: function get() {
	      return this[ds].all;
	    }
	  }, {
	    key: "any",
	    get: function get() {
	      return this[ds].any;
	    }
	  }, {
	    key: "first",
	    get: function get() {
	      return this[ds].first;
	    }
	  }, {
	    key: "last",
	    get: function get() {
	      return this[ds].last;
	    }
	  }, {
	    key: "size",
	    get: function get() {
	      return this[ds].size;
	    }
	  }]);

	  return Model;
	})(_events.EventEmitter);

	exports["default"] = Model;

	Model.DefaultCollection = _collectionEs62["default"];
	module.exports = exports["default"];

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$create = __webpack_require__(38)["default"];

	exports["default"] = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = _Object$create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) subClass.__proto__ = superClass;
	};

	exports.__esModule = true;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(39), __esModule: true };

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(6);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$getOwnPropertyDescriptor = __webpack_require__(41)["default"];

	exports["default"] = function get(_x, _x2, _x3) {
	  var _again = true;

	  _function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;
	    desc = parent = getter = undefined;
	    _again = false;
	    if (object === null) object = Function.prototype;

	    var desc = _Object$getOwnPropertyDescriptor(object, property);

	    if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);

	      if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;
	        _x2 = property;
	        _x3 = receiver;
	        _again = true;
	        continue _function;
	      }
	    } else if ("value" in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;

	      if (getter === undefined) {
	        return undefined;
	      }

	      return getter.call(receiver);
	    }
	  }
	};

	exports.__esModule = true;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(42), __esModule: true };

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(6);
	__webpack_require__(32);
	module.exports = function getOwnPropertyDescriptor(it, key){
	  return $.getDesc(it, key);
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = require("events");

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _getIterator = __webpack_require__(45)["default"];

	var _interopRequireDefault = __webpack_require__(28)["default"];

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _fieldTypesEs6 = __webpack_require__(34);

	var _fieldTypesEs62 = _interopRequireDefault(_fieldTypesEs6);

	exports["default"] = function (dst, srcProp, names) {
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = _getIterator(names), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var method = _step.value;

	      dst[method] = srcProp[method].bind(srcProp);
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator["return"]) {
	        _iterator["return"]();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	};

	module.exports = exports["default"];

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(46), __esModule: true };

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(47);
	__webpack_require__(52);
	__webpack_require__(54);
	module.exports = __webpack_require__(6).core.getIterator;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(48);
	var $           = __webpack_require__(6)
	  , Iterators   = __webpack_require__(50).Iterators
	  , ITERATOR    = __webpack_require__(18)('iterator')
	  , ArrayValues = Iterators.Array
	  , NL          = $.g.NodeList
	  , HTC         = $.g.HTMLCollection
	  , NLProto     = NL && NL.prototype
	  , HTCProto    = HTC && HTC.prototype;
	if($.FW){
	  if(NL && !(ITERATOR in NLProto))$.hide(NLProto, ITERATOR, ArrayValues);
	  if(HTC && !(ITERATOR in HTCProto))$.hide(HTCProto, ITERATOR, ArrayValues);
	}
	Iterators.NodeList = Iterators.HTMLCollection = ArrayValues;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(6)
	  , setUnscope = __webpack_require__(49)
	  , ITER       = __webpack_require__(20).safe('iter')
	  , $iter      = __webpack_require__(50)
	  , step       = $iter.step
	  , Iterators  = $iter.Iterators;

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	__webpack_require__(51)(Array, 'Array', function(iterated, kind){
	  $.set(this, ITER, {o: $.toObject(iterated), i: 0, k: kind});
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var iter  = this[ITER]
	    , O     = iter.o
	    , kind  = iter.k
	    , index = iter.i++;
	  if(!O || index >= O.length){
	    iter.o = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	setUnscope('keys');
	setUnscope('values');
	setUnscope('entries');

/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $                 = __webpack_require__(6)
	  , cof               = __webpack_require__(17)
	  , classof           = cof.classof
	  , assert            = __webpack_require__(23)
	  , assertObject      = assert.obj
	  , SYMBOL_ITERATOR   = __webpack_require__(18)('iterator')
	  , FF_ITERATOR       = '@@iterator'
	  , Iterators         = __webpack_require__(19)('iterators')
	  , IteratorPrototype = {};
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	setIterator(IteratorPrototype, $.that);
	function setIterator(O, value){
	  $.hide(O, SYMBOL_ITERATOR, value);
	  // Add iterator for FF iterator protocol
	  if(FF_ITERATOR in [])$.hide(O, FF_ITERATOR, value);
	}

	module.exports = {
	  // Safari has buggy iterators w/o `next`
	  BUGGY: 'keys' in [] && !('next' in [].keys()),
	  Iterators: Iterators,
	  step: function(done, value){
	    return {value: value, done: !!done};
	  },
	  is: function(it){
	    var O      = Object(it)
	      , Symbol = $.g.Symbol;
	    return (Symbol && Symbol.iterator || FF_ITERATOR) in O
	      || SYMBOL_ITERATOR in O
	      || $.has(Iterators, classof(O));
	  },
	  get: function(it){
	    var Symbol = $.g.Symbol
	      , getIter;
	    if(it != undefined){
	      getIter = it[Symbol && Symbol.iterator || FF_ITERATOR]
	        || it[SYMBOL_ITERATOR]
	        || Iterators[classof(it)];
	    }
	    assert($.isFunction(getIter), it, ' is not iterable!');
	    return assertObject(getIter.call(it));
	  },
	  set: setIterator,
	  create: function(Constructor, NAME, next, proto){
	    Constructor.prototype = $.create(proto || IteratorPrototype, {next: $.desc(1, next)});
	    cof.set(Constructor, NAME + ' Iterator');
	  }
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var $def            = __webpack_require__(5)
	  , $redef          = __webpack_require__(21)
	  , $               = __webpack_require__(6)
	  , cof             = __webpack_require__(17)
	  , $iter           = __webpack_require__(50)
	  , SYMBOL_ITERATOR = __webpack_require__(18)('iterator')
	  , FF_ITERATOR     = '@@iterator'
	  , KEYS            = 'keys'
	  , VALUES          = 'values'
	  , Iterators       = $iter.Iterators;
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
	  $iter.create(Constructor, NAME, next);
	  function createMethod(kind){
	    function $$(that){
	      return new Constructor(that, kind);
	    }
	    switch(kind){
	      case KEYS: return function keys(){ return $$(this); };
	      case VALUES: return function values(){ return $$(this); };
	    } return function entries(){ return $$(this); };
	  }
	  var TAG      = NAME + ' Iterator'
	    , proto    = Base.prototype
	    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , _default = _native || createMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if(_native){
	    var IteratorPrototype = $.getProto(_default.call(new Base));
	    // Set @@toStringTag to native iterators
	    cof.set(IteratorPrototype, TAG, true);
	    // FF fix
	    if($.FW && $.has(proto, FF_ITERATOR))$iter.set(IteratorPrototype, $.that);
	  }
	  // Define iterator
	  if($.FW || FORCE)$iter.set(proto, _default);
	  // Plug for library
	  Iterators[NAME] = _default;
	  Iterators[TAG]  = $.that;
	  if(DEFAULT){
	    methods = {
	      keys:    IS_SET            ? _default : createMethod(KEYS),
	      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
	      entries: DEFAULT != VALUES ? _default : createMethod('entries')
	    };
	    if(FORCE)for(key in methods){
	      if(!(key in proto))$redef(proto, key, methods[key]);
	    } else $def($def.P + $def.F * $iter.BUGGY, NAME, methods);
	  }
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var set   = __webpack_require__(6).set
	  , $at   = __webpack_require__(53)(true)
	  , ITER  = __webpack_require__(20).safe('iter')
	  , $iter = __webpack_require__(50)
	  , step  = $iter.step;

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(51)(String, 'String', function(iterated){
	  set(this, ITER, {o: String(iterated), i: 0});
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var iter  = this[ITER]
	    , O     = iter.o
	    , index = iter.i
	    , point;
	  if(index >= O.length)return step(1);
	  point = $at(O, index);
	  iter.i += point.length;
	  return step(0, point);
	});

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// true  -> String#at
	// false -> String#codePointAt
	var $ = __webpack_require__(6);
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String($.assertDefined(that))
	      , i = $.toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l
	      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	        ? TO_STRING ? s.charAt(i) : a
	        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(6).core
	  , $iter = __webpack_require__(50);
	core.isIterable  = $iter.is;
	core.getIterator = $iter.get;

/***/ }
/******/ ]);