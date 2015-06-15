var BaseRelation = require("./EasyRelation.es6");
var BaseRecord = require("./EasyRecord.es6");

class BaseModel {
  constructor() {
    this.ds = new BaseRelation();
  }

  get all() {
    return this.ds.all;
  }

  get any() {
    return this.ds.any;
  }

  get(index) {
    return this.ds.get(index);
  }

  get first() {
    return this.ds.first;
  }

  get last() {
    return this.ds.last;
  }

  get size() {
    return this.ds.size;
  }

  exist(id) {
    return this.ds.exist(id);
  }

  find(id) {
    return this.ds.find(id);
  }

  create(attrs) {
    var index = this.ds.exist(attrs.id);
    var self = this;
    if (index === false) {
      this.ds._models.push(new BaseRecord({
        attrs: {
          id: attrs.id,
          name: attrs.name
        },
        model: self
      }));
      this.ds._models.index.push(attrs.id);
      return attrs;
    }
  }

  update({id, attrs}) {
    var index = this.ds.exist(id);
    if (index !== false) {
      angular.extend(this.ds.get(index).attrs, attrs);
    }
  }

  //TODO: Rename to createOrUpdate
  add(model) {
    var attrs = this.ds.find(model.id),
      id = model.id;

    if (!attrs) {
      return this.create(model);
    } else {
      return this.update({id, attrs});
    }
  }

  destroy(id) {
    return new Promise((resolve, reject) => {
      var index = this.ds.exist(id);
      if (index !== false) {
        resolve(angular.copy(this.ds.get(index)));
        this.ds._models.splice(index, 1);
        this.ds._models.index.splice(index, 1);
      } else {
        reject();
      }
    });
  }

}

module.exports = BaseModel;
