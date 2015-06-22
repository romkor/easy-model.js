const fields = Symbol(fields);

class Record {

  constructor({attrs, model}) {
    this[fields] = attrs || {};
    this.model = model;
  }

  get fields() {
    return this[fields];
  }

  set fields(attrs) {
    var _attrs = Object.assign({}, attrs);
    delete _attrs[this.model.primaryKey];
    Object.assign(this[fields], _attrs);
  }

  destroy() {
    return this.model.destroy(this.fields[this.model.primaryKey]);
  }

}

module.exports = Record;
