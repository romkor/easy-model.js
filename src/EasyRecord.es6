class BaseRecord {

  constructor({attrs, model}) {
    this.attrs = attrs;
    this.model = model;
  }

  update({id, attrs}) {
    return this.model.update({id, attrs});
  }

  destroy() {
    return this.model.destroy(this.attrs.id);
  }

  get fields() {
    return this.attrs;
  }

  set fields(attrs) {
    var _attrs = angular.copy(attrs);
    delete _attrs.id;
    angular.extend(this.attrs, _attrs);
  }
}

module.exports = BaseRecord;
