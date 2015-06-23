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
    var index = this.exist(attrs[key]);
    if (index === false) {
      this.all.push(new Record({
        attrs,
        model: this
      }));
      this.all.index.push(attrs[key]);
      return attrs;
    }
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
    var index = this.exist(id),
    record = Object.assign({}, this.find(index));

    if (index !== false) {
      this.all.splice(index, 1);
      this.all.index.splice(index, 1);
      return record;
    } else {
      return false;
    }
  }

}

Model.DefaultRelation = Relation;

module.exports = Model;
