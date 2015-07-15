const expect = require('expect.js');
const Easy = require("../easy.js");
const Record = Easy.Record;
const Relation = Easy.Relation;
const Model = Easy.Model;

var record;

describe('EasyRecord', function() {
  beforeEach(function() {
    model = new Model({
      schema: [{name: 'id', type: 'integer'}, {name: 'title', type: 'string'}]
    });
    record = model.create();
  });

  describe('#constructor()', function() {
    it('should save empty hash when attrs is empty', function(){
      expect(record.id).to.eql(0);
      expect(record.title).to.eql('');
    });
    it('should save fields', function() {
      record = model.create({id: 1, title: 'Title'});
      expect(record.id).to.eql(1);
      expect(record.title).to.eql('Title');
    });
  });

  describe('#set/get (attrs)', function() {
    it('should save attrs', function() {
      record.title = 'Title';
      expect(record.title).to.eql('Title');
    });
    it('should update attrs', function() {
      record.title = 'Title';
      expect(record.title).to.eql('Title');
      record.title = 'New Title';
      expect(record.title).to.eql('New Title');
    });
  });

  describe('#destroy()', function() {
    it('should remove record from collection', function(){
      model.create({id:1, title: 'Title'});
      model.create({id:2, title: 'Title 2'});
      expect(model.find(2).destroy()).to.be.ok();
    });

  });

});
