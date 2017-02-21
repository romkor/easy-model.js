const collectionKey = Symbol("collectionKey");
const whereRulesKey = Symbol("rulesKey");

export default class Relation {

  constructor({collection, whereRule, orderRule, state, current}) {
    this.current = current;
    this[collectionKey] = collection;
    // where, order
    this[whereRulesKey] = whereRule;

    if (state === Relation.states.DEFINE_FIELD_NAME) {
      if (current === this[whereRulesKey].id) {
        this.is = function(value){
          this[whereRulesKey].rule = "==";
          this[whereRulesKey].value = value;
          // return new Relation({
          //   current: this.current,
          //   collection: this[collectionKey],
          //   state: Relation.states.DEFINE_FIELD_RULE,
          //   whereRule: this[whereRulesKey]
          // });
          return this[whereRulesKey];
        };
        this.isnt = function(value){
          this[whereRulesKey].rule = "!=";
          this[whereRulesKey].value = value;
          // return new Relation({
          //   current: this.current,
          //   collection: this[collectionKey],
          //   state: Relation.states.DEFINE_FIELD_RULE,
          //   whereRule: this[whereRulesKey]
          // });
          return this[whereRulesKey];
        };
        this.islike = function(value){
          this[whereRulesKey].rule = "~=";
          this[whereRulesKey].value = value;
          // return new Relation({
          //   current: this.current,
          //   collection: this[collectionKey],
          //   state: Relation.states.DEFINE_FIELD_RULE,
          //   whereRule: this[whereRulesKey]
          // });
          return this[whereRulesKey];
        };

      }
    }

  }

}

Relation.states = {
  DEFINE_FIELD_NAME: 'DEFINE_FIELD_NAME',
  DEFINE_FIELD_RULE: 'DEFINE_FIELD_RULE',
  DEFINE_GROUP: 'DEFINE_GROUP',
};
