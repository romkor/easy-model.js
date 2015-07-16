import defineRecordFields from "./helpers/defineRecordFields.es6";

const fieldsKey = Symbol("fields");
const collectionKey = Symbol("collection");
const modelKey = Symbol("model");

export default class Record {

  constructor(options = {}) {
    options.fields = options.fields || {};
    this[fieldsKey] = {};
    this[collectionKey] = options.collection;
    this[modelKey] = options.collection.model;
    this[modelKey].schema.forEach(({name, type}) => {
      defineRecordFields({name, type, holder: fieldsKey, context: this});
    });
    for (let key in options.fields) {
      this[key] = options.fields[key];
    }
    Object.preventExtensions(this);
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
