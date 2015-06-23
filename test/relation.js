var assert = require("assert");
var expect = require('expect.js');
var Easy = require("../easy.js");
var records = [
  {id:1, title: 'Title 1'},
  {id:2, title: 'Title 2'}
];

describe('EasyRelation', function() {
  describe('#constructor(records)', function() {
    it('should save empty array when records is empty', function(){
      var relation = new Easy.Relation();
      expect(relation.all.length).to.be(0);
    });
    it('should add records', function() {
      var relation = new Easy.Relation({
        model: new Easy.Model,
        records: records
      });
      expect(relation.all.length).to.be(2);
    });
    it('should add index', function() {
      var relation = new Easy.Relation({
        model: new Easy.Model,
        records: records
      });
      expect(relation.all.index).to.eql([1,2]);
    });
  });

});
