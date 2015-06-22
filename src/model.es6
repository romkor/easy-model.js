var EventEmitter = require('events').EventEmitter;
var Relation = require("./relation.es6");
var Record = require("./record.es6");

const ds = Symbol('ds');

class Model extends EventEmitter {

  constructor() {
    super();
    this[ds] = new Model.DefaultRelation();
    this.primaryKey = 'id';
  }

  get all() {
    return this[ds].all;
  }

  get any() {
    return this[ds].any;
  }

  get(index) {
    return this[ds].get(index);
  }

  get first() {
    return this[ds].first;
  }

  get last() {
    return this[ds].last;
  }

  get size() {
    return this[ds].size;
  }

  exist(id) {
    return this[ds].exist(id);
  }

  find(id) {
    return this[ds].find(id);
  }

  create(attrs) {
    var key = this.primaryKey;
    var index = this[ds].exist(attrs[key]);
    if (index === false) {
      this[ds]._models.push(new Record({
        attrs,
        model: this
      }));
      this[ds]._models.index.push(attrs[key]);
      return attrs;
    }
  }

  update({id, attrs}) {
    var index = this[ds].exist(id);
    if (index !== false) {
      Object.assign(this[ds].get(index).fields, attrs);
    }
  }

  createOrUpdate(model) {
    var id = model[this.primaryKey],
    attrs = this[ds].find(id);

    if (!attrs) {
      return this.create(model);
    } else {
      return this.update({id, attrs});
    }
  }

  destroy(id) {
    var index = this[ds].exist(id);
    if (index !== false) {
      this[ds]._models.splice(index, 1);
      this[ds]._models.index.splice(index, 1);
    } else {
      return false;
    }
  }

}

Model.DefaultRelation = Relation;

module.exports = Model;
