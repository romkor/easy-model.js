var EventEmitter = require('events').EventEmitter;
var Relation = require("./relation.es6");

const ds = Symbol('ds');

class Model extends EventEmitter {

  constructor() {
    super();
    this.primaryKey = 'id';
    this[ds] = new Model.DefaultRelation({
      model: this
    });
  }

  toJSON() {
    return this[ds].toJSON()
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
    return this[ds].create(attrs);
  }

  update({id, attrs}) {
    var index = this.exist(id);
    if (index !== false) {
      Object.assign(this.get(index).fields, attrs);
    }
  }

  createOrUpdate(model) {
    var id = model[this.primaryKey],
    attrs = this.find(id);

    if (!attrs) {
      return this.create(model);
    } else {
      return this.update({id, attrs});
    }
  }

  destroy(id) {
    return this[ds].destroy(id);
  }

}

Model.DefaultRelation = Relation;

module.exports = Model;
