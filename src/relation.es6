const Record = require("./record.es6");

const _models = Symbol('_models');
const _index = Symbol('_index');

class Relation {

  constructor(options = {}) {
    this.model = options.model;
    this[_models] = options.records || [];
    this[_index] = this[_models].map((attrs)=> {
      return attrs[options.model.primaryKey];
    });
  }

  get all() {
    return this[_models];
  }

  get size() {
    return this.all.length;
  }

  get any() {
    return this.size > 0;
  }

  get(index) {
    if (!this.any) throw Error("Can't return record from empty relation");
    if (index == undefined) throw Error("index can't be blank");
    if (!Number.isInteger(index)) throw Error("index should be integer");
    if (index >= this.size) throw Error('index is out of records bounds');
    return this.all[index];
  }

  exist(id) {
    var index = this[_index].indexOf(id);
    return index != -1 ? index : false;
  }

  find(id) {
    var index = this.exist(id);
    return index !== false ? this.get(index) : false
  }

  create(attrs) {
    var key = this.model.primaryKey;
    var index = this.exist(attrs[key]);
    if (index === false) {
      this.all.push(new Record({
        attrs,
        model: this.model
      }));
      this[_index].push(attrs[key]);
      return attrs;
    }
  }

  destroy(id) {
    var index = this.exist(id),
    record = Object.assign({}, this.find(index));

    if (index !== false) {
      this.all.splice(index, 1);
      this[_index].splice(index, 1);
      return record;
    } else {
      return false;
    }
  }

}

module.exports = Relation;
