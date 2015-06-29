const Record = require("./record.es6");

const _records = Symbol('_records');
const _index = Symbol('_index');

class Relation {

  constructor(options = {}) {
    options.records = options.records || [];
    this.model = options.model;
    this[_records] = [];
    this[_index] = [];
    options.records.forEach((attrs)=> {
      this.create(attrs);
    });
  }

  get all() {
    return this[_records];
  }

  toJSON() {
    return this.all.map(record => Object.assign(record, record.fields))
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
    return index !== false ? this.get(index) : false;
  }

  create(fields) {
    const key = this.model.primaryKey;
    const fieldId = fields[key];
    const index = this.exist(fieldId);
    if (index === false) {
      this[_records].push(new Record({
        fields,
        relation: this
      }));
      this[_index].push(fieldId);
      return fields;
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
