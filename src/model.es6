import {EventEmitter} from "events";
import defineMethods from "./helpers/defineMethods.es6";
import Collection from "./collection.es6";

const ds = Symbol("ds");

export default class Model extends EventEmitter {

  constructor(options = {}) {
    super();
    this.primaryKey = "id";
    this.schema = options.schema || [];
    this[ds] = new Model.DefaultCollection({
      model: this
    });

    defineMethods(Model.prototype, this[ds], [
      "toJSON",
      "exist",
      "find",
      "findBy",
      "where",
      "create",
      "update",
      "destroy",
      "sort"
    ]);
  }

  // toJSON() {
  //   return this[ds].toJSON();
  // }

  get all() {
    return this[ds].all;
  }

  get any() {
    return this[ds].any;
  }

  get(index) {
    return this[ds].get(index);
  }

  get first() {
    return this[ds].first;
  }

  get last() {
    return this[ds].last;
  }

  get size() {
    return this[ds].size;
  }

  exist(id) {
    return this[ds].exist(id);
  }

  // find(id) {
  //   return this[ds].find(id);
  // }

  // findBy(field, value) {
  //   return this[ds].findBy(field, value);
  // }

  // where(field) {
  //   return this[ds].where(field);
  // }

  // create(attrs) {
  //   return this[ds].create(attrs);
  // }
  //
  // update({id, attrs}) {
  //   return this[ds].update({id, attrs});
  // }
  //
  // destroy(id) {
  //   return this[ds].destroy(id);
  // }

}

Model.DefaultCollection = Collection;
