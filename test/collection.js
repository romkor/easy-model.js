var expect = require("expect.js");
var Easy = require("../easy.js");
var Model = Easy.Model;
var Collection = Easy.Collection;

var records = [
  {id:1, title: 'Title 1'},
  {id:2, title: 'Title 2'},
  {id:3, title: 'Title 3'},
];

describe('EasyCollection', function() {
  describe('#constructor(records)', function() {
    it('should save empty array when records is empty', function(){
      var collection = new Collection()
      expect(collection.size).to.be(0);
    });
    it('should add records', function() {
      var collection = new Collection({
        model: new Model({
          schema: [{name: 'id'}, {name: 'title'}]
        }),
        records: records
      });
      expect(collection.size).to.be(records.length);
    });
    it('should add index', function() {
      var collection = new Collection({
        model: new Model({
          schema: [{name: 'id'}, {name: 'title'}]
        }),
        records: records
      });
      expect(collection.exist(1)).to.eql(0);
    });
  });

  describe('#get all()', function() {
    it('should return all records', function() {
      var collection = new Collection({
        model: new Model({
          schema: [{name: 'id'}, {name: 'title'}]
        }),
        records: records
      });
      expect(collection.all.length).to.be(records.length);
    });
  });

  describe('#get size()', function() {
    it('should return records count', function() {
      var collection = new Collection({
        model: new Model({
          schema: [{name: 'id'}, {name: 'title'}]
        }),
        records: records
      });
      expect(collection.size).to.be(records.length);
    });
  });

  describe('#get any()', function() {
    it('should return true if there are some records', function() {
      var collection = new Collection({
        model: new Model({
          schema: [{name: 'id'}, {name: 'title'}]
        }),
        records: records
      });
      expect(collection.any).to.be(true);
    });
    it('should return false if there are no records', function() {
      var collection = new Collection({
        model: new Model({
          schema: [{name: 'id'}, {name: 'title'}]
        }),
        records: []
      });
      expect(collection.any).to.be(false);
    });
  });

  describe('#get(index)', function() {
    it('should return record by index', function() {
      var collection = new Collection({
        model: new Model({
          schema: [{name: 'id'}, {name: 'title'}]
        }),
        records: records
      });
      expect(collection.get(1).toJSON()).to.eql(records[1]);
    });
    it('should throw error if there are no records', function() {
      var collection = new Collection({
        model: new Model({
          schema: [{name: 'id'}, {name: 'title'}]
        }),
        records: []
      });
      expect(function() {
        collection.get(1);
      }).to.throwException();
    });
    it('should throw error if function is called without arguments', function() {
      var collection = new Collection({
        model: new Model({
          schema: [{name: 'id'}, {name: 'title'}]
        }),
        records: records
      });
      expect(function() {
        collection.get();
      }).to.throwException();
    });
    it('should throw error if function is called with non-integer argument', function() {
      var collection = new Collection({
        model: new Model({
          schema: [{name: 'id'}, {name: 'title'}]
        }),
        records: records
      });
      expect(function() {
        collection.get(1.1);
      }).to.throwException();
    });
    it('should throw error if function is called with non-existing index', function() {
      var collection = new Collection({
        model: new Model({
          schema: [{name: 'id'}, {name: 'title'}]
        }),
        records: records
      });
      expect(function() {
        collection.get(records.length + 1);
      }).to.throwException();
    });
  });

  describe('#exist(id)', function() {
    it('should return index if record with given id exist in collection', function() {
      var collection = new Collection({
        model: new Model({
          schema: [{name: 'id'}, {name: 'title'}]
        }),
        records: records
      });
      expect(collection.exist(2)).to.eql(1);
    });
    it('should return false if record with given id didn\'t exist in collection', function() {
      var collection = new Collection({
        model: new Model({
          schema: [{name: 'id'}, {name: 'title'}]
        }),
        records: records
      });
      expect(collection.exist(10)).to.be(false);
    });
  });

});
