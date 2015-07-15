import defineRecordFields from "./helpers/defineRecordFields.es6";

const fieldsKey = Symbol("fields");
const relationKey = Symbol("relation");
const modelKey = Symbol("relation");

export default class Record {

  constructor(options = {}) {
    options.fields = options.fields || {};
    this[fieldsKey] = {};
    this[relationKey] = options.relation;
    this[modelKey] = options.relation.model;
    this[modelKey].schema.forEach(({name, type}) => {
      defineRecordFields({name, type, holder: fieldsKey, context: this});
    });
    for (let key in options.fields) {
      this[key] = options.fields[key];
    }
    Object.preventExtensions(this);
    Object.freeze(this);
  }

  toJSON() {
    var recordObj = {};
    this[modelKey].schema.forEach(field => {
      recordObj[field.name] = this[field.name];
    });
    return recordObj;
  }

  destroy() {
    const model = this[modelKey];
    return model.destroy(this[model.primaryKey]);
  }

}
