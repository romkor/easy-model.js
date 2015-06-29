const expect = require('expect.js');
const Easy = require("../easy.js");
const Record = Easy.Record;
const Relation = Easy.Relation;
const Model = Easy.Model;

var record;

describe('EasyRecord', function() {
  beforeEach(function() {
    record = new Record({
      relation: new Relation({
        model: new Model
      })
    });
  });

  describe('#constructor()', function() {
    it('should save empty hash when attrs is empty', function(){
      expect(record.fields).to.eql({});
    });
    it('should save fields', function(){
      record = new Record({
        fields: {title: 'Title'},
        relation: new Relation({
          model: new Model
        })
      });
      expect(record.fields).to.eql({title: 'Title'});
    });
  });

  describe('#set fields(attrs)', function() {
    it('should save attrs', function() {
      record.fields = {title: 'Title'};
      expect(record.fields).to.eql({title: 'Title'});
    });
    it('should update attrs', function() {
      record.fields = {title: 'Title'};
      expect(record.fields).to.eql({title: 'Title'});
      record.fields.title = 'New Title';
      expect(record.fields.title).to.eql('New Title');
    });
  });

  describe('#destroy()', function() {
    it('should remove record from collection', function(){
      var model = new Model();
      model.create({id:1, title: 'Title'});
      model.create({id:2, title: 'Title 2'});
      expect(model.find(1).destroy()).to.be.ok();
    });

  });

});
