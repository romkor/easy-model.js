var assert = require("assert");
var expect = require('expect.js');
var Easy = require("../easy.js");
var records = [
  {id:1, title: 'Title 1'},
  {id:2, title: 'Title 2'},
  {id:3, title: 'Title 3'},
];

describe('EasyRelation', function() {
  describe('#constructor(records)', function() {
    it('should save empty array when records is empty', function(){
      var relation = new Easy.Relation()
      expect(relation.size).to.be(0);
    });
    it('should add records', function() {
      var relation = new Easy.Relation({
        model: new Easy.Model,
        records: records
      });
      expect(relation.size).to.be(records.length);
    });
    it('should add index', function() {
      var relation = new Easy.Relation({
        model: new Easy.Model,
        records: records
      });
      expect(relation.exist(1)).to.eql(0);
    });
  });

  describe('#get all()', function() {
    it('should return all records', function() {
      var relation = new Easy.Relation({
        model: new Easy.Model,
        records: records
      });
      expect(relation.all).to.eql(records);
    });
  });

  describe('#get size()', function() {
    it('should return records count', function() {
      var relation = new Easy.Relation({
        model: new Easy.Model,
        records: records
      });
      expect(relation.size).to.be(records.length);
    });
  });

  describe('#get any()', function() {
    it('should return true if there are some records', function() {
      var relation = new Easy.Relation({
        model: new Easy.Model,
        records: records
      });
      expect(relation.any).to.be(true);
    });
    it('should return false if there are no records', function() {
      var relation = new Easy.Relation({
        model: new Easy.Model,
        records: []
      });
      expect(relation.any).to.be(false);
    });
  });

  describe('#get(index)', function() {
    it('should return record by index', function() {
      var relation = new Easy.Relation({
        model: new Easy.Model,
        records: records
      });
      expect(relation.get(1)).to.eql(records[1]);
    });
    it('should throw error if there are no records', function() {
      var relation = new Easy.Relation({
        model: new Easy.Model,
        records: []
      });
      expect(function() {
        relation.get(1);
      }).to.throwException();
    });
    it('should throw error if function is called without arguments', function() {
      var relation = new Easy.Relation({
        model: new Easy.Model,
        records: records
      });
      expect(function() {
        relation.get();
      }).to.throwException();
    });
    it('should throw error if function is called with non-integer argument', function() {
      var relation = new Easy.Relation({
        model: new Easy.Model,
        records: records
      });
      expect(function() {
        relation.get(1.1);
      }).to.throwException();
    });
    it('should throw error if function is called with non-existing index', function() {
      var relation = new Easy.Relation({
        model: new Easy.Model,
        records: records
      });
      expect(function() {
        relation.get(records.length + 1);
      }).to.throwException();
    });
  });

});
