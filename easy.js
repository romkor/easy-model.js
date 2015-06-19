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
	  Relation: __webpack_require__(1),
	  Record: __webpack_require__(2),
	  Model: __webpack_require__(3)
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Relation = (function () {
	  function Relation(models) {
	    _classCallCheck(this, Relation);

	    this._models = models || [];
	    this._models.index = this._models.map(function (attrs) {
	      return attrs.id;
	    });
	  }

	  _createClass(Relation, [{
	    key: "get",
	    value: function get(index) {
	      return this.any ? this.all[index] : false;
	    }
	  }, {
	    key: "exist",
	    value: function exist(id) {
	      var index = this._models.index.indexOf(id);
	      return index != -1 ? index : false;
	    }
	  }, {
	    key: "find",
	    value: function find(id) {
	      var index = this.exist(id);
	      return index !== false ? this.get(index) : false;
	    }
	  }, {
	    key: "all",
	    get: function () {
	      return this._models;
	    }
	  }, {
	    key: "size",
	    get: function () {
	      return this.all.length;
	    }
	  }, {
	    key: "any",
	    get: function () {
	      return this.size > 0;
	    }
	  }]);

	  return Relation;
	})();

	module.exports = Relation;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Record = (function () {
	  function Record(_ref) {
	    var attrs = _ref.attrs;
	    var model = _ref.model;

	    _classCallCheck(this, Record);

	    this.attrs = attrs || {};
	    this.model = model;
	  }

	  _createClass(Record, [{
	    key: "update",
	    value: function update(_ref2) {
	      var id = _ref2.id;
	      var attrs = _ref2.attrs;

	      return this.model.update({ id: id, attrs: attrs });
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      return this.model.destroy(this.attrs.id);
	    }
	  }, {
	    key: "fields",
	    get: function () {
	      return this.attrs;
	    },
	    set: function (attrs) {
	      var _attrs = angular.copy(attrs);
	      delete _attrs.id;
	      angular.extend(this.attrs, _attrs);
	    }
	  }]);

	  return Record;
	})();

	module.exports = Record;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Relation = __webpack_require__(1);
	var Record = __webpack_require__(2);

	var Model = (function () {
	  function Model() {
	    _classCallCheck(this, Model);

	    this.ds = new Relation();
	  }

	  _createClass(Model, [{
	    key: "get",
	    value: function get(index) {
	      return this.ds.get(index);
	    }
	  }, {
	    key: "exist",
	    value: function exist(id) {
	      return this.ds.exist(id);
	    }
	  }, {
	    key: "find",
	    value: function find(id) {
	      return this.ds.find(id);
	    }
	  }, {
	    key: "create",
	    value: function create(attrs) {
	      var index = this.ds.exist(attrs.id);
	      if (index === false) {
	        this.ds._models.push(new Record({
	          attrs: {
	            id: attrs.id,
	            name: attrs.name
	          },
	          model: this
	        }));
	        this.ds._models.index.push(attrs.id);
	        return attrs;
	      }
	    }
	  }, {
	    key: "update",
	    value: function update(_ref) {
	      var id = _ref.id;
	      var attrs = _ref.attrs;

	      var index = this.ds.exist(id);
	      if (index !== false) {
	        angular.extend(this.ds.get(index).attrs, attrs);
	      }
	    }
	  }, {
	    key: "createOrUpdate",
	    value: function createOrUpdate(model) {
	      var attrs = this.ds.find(model.id),
	          id = model.id;

	      if (!attrs) {
	        return this.create(model);
	      } else {
	        return this.update({ id: id, attrs: attrs });
	      }
	    }
	  }, {
	    key: "destroy",
	    value: function destroy(id) {
	      var _this = this;

	      return new Promise(function (resolve, reject) {
	        var index = _this.ds.exist(id);
	        if (index !== false) {
	          resolve(angular.copy(_this.ds.get(index)));
	          _this.ds._models.splice(index, 1);
	          _this.ds._models.index.splice(index, 1);
	        } else {
	          reject();
	        }
	      });
	    }
	  }, {
	    key: "all",
	    get: function () {
	      return this.ds.all;
	    }
	  }, {
	    key: "any",
	    get: function () {
	      return this.ds.any;
	    }
	  }, {
	    key: "first",
	    get: function () {
	      return this.ds.first;
	    }
	  }, {
	    key: "last",
	    get: function () {
	      return this.ds.last;
	    }
	  }, {
	    key: "size",
	    get: function () {
	      return this.ds.size;
	    }
	  }]);

	  return Model;
	})();

	module.exports = Model;

/***/ }
/******/ ]);