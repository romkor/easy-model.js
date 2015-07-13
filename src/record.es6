const fieldsKey = Symbol("fields");
const relationKey = Symbol("relation");
const modelKey = Symbol("relation");

export default class Record {

  constructor(options = {}) {
    this[fieldsKey] = options.fields || {};
    this[relationKey] = options.relation;
    this[modelKey] = options.relation.model;
  }

  get fields() {
    return this[fieldsKey];
  }

  set fields(attrs) {
    Object.assign(this[fieldsKey], attrs);
    return this[fieldsKey];
  }

  destroy() {
    const model = this[modelKey];
    return model.destroy(this.fields[model.primaryKey]);
  }

}
