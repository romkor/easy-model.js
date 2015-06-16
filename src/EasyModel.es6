var EasyRelation = require("./EasyRelation.es6");
var EasyRecord = require("./EasyRecord.es6");

class EasyModel {

  constructor() {
    this.ds = new EasyRelation();
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
    if (index === false) {
      this.ds._models.push(new EasyRecord({
        attrs: {
          id: attrs.id,
          name: attrs.name
        },
        model: this
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

  createOrUpdate(model) {
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

module.exports = EasyModel;
