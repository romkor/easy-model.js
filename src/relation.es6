import Record from "./record.es6";

const recordsKey = Symbol("recordsKey");
const indexKey = Symbol("indexKey");

export default class Relation {

  constructor(options = {}) {
    options.records = options.records || [];
    this.model = options.model;
    this[recordsKey] = [];
    this[indexKey] = [];
    options.records.forEach((attrs)=> {
      this.create(attrs);
    });
  }

  get all() {
    return this[recordsKey];
  }

  toJSON() {
    return this.all.map(record => Object.assign(record, record.fields));
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
    var index = this[indexKey].indexOf(id);
    return index !== -1 ? index : false;
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
      this[recordsKey].push(new Record({
        fields,
        relation: this
      }));
      this[indexKey].push(fieldId);
      return fields;
    }
  }

  destroy(id) {
    var index = this.exist(id),
    record = Object.assign({}, this.find(index));

    if (index !== false) {
      this.all.splice(index, 1);
      this[indexKey].splice(index, 1);
      return record;
    } else {
      return false;
    }
  }

}
