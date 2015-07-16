import Record from "./record.es6";

const recordsKey = Symbol("recordsKey");
const indexKey = Symbol("indexKey");

export default class Collection {

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
    return this.all.map(record => record.toJSON());
  }

  get size() {
    return this.all.length;
  }

  get any() {
    return this.size > 0;
  }

  get(index) {
    if (!this.any) throw "Can't find record in empty collection";
    if (index == undefined) throw "Attribute index can't be blank";
    if (!Number.isInteger(index)) throw `Attribute index: ${index} should be integer`;
    if (index >= this.size) throw `Attribute index: ${index} is out of records bounds`;
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

  create(fields = {}) {
    const key = this.model.primaryKey;
    const fieldId = fields[key];
    const index = this.exist(fieldId);
    if (index === false) {
      let record = new Record({
        fields,
        collection: this
      });
      this[recordsKey].push(record);
      this[indexKey].push(fieldId);
      return record;
    } else {
      throw `Record with given ${key}: ${fieldId} already exist.`
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
