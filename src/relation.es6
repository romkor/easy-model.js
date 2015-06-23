const _models = Symbol('_models');

class Relation {

  constructor(options = {}) {
    this[_models] = options.records || [];
    this[_models].index = this[_models].map((attrs)=> {
      return attrs[options.model.primaryKey];
    });
  }

  get all() {
    return this[_models];
  }

  get size() {
    return this.all.length;
  }

  get any() {
    return this.size > 0;
  }

  get(index) {
    return this.any ? this.all[index] : false;
  }

  exist(id) {
    var index = this.all.index.indexOf(id);
    return index != -1 ? index : false;
  }

  find(id) {
    var index = this.exist(id);
    return index !== false ? this.get(index) : false
  }

}

module.exports = Relation;
