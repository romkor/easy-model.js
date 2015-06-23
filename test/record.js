var assert = require("assert");
var expect = require('expect.js');
var Easy = require("../easy.js");

describe('EasyRecord', function() {
  describe('#constructor()', function() {
    it('should save empty hash when attrs is empty', function(){
      var record = new Easy.Record({});
      expect(record.fields).to.eql({});
    });
  });

  describe('#set fields(attrs)', function() {
    it('should save attrs', function() {
      var record = new Easy.Record({model: new Easy.Model});
      record.fields = {title: 'Title'};
      expect(record.fields).to.eql({title: 'Title'});
    });
    it('should update attrs', function() {
      var record = new Easy.Record({model: new Easy.Model});
      record.fields = {title: 'Title'};
      expect(record.fields).to.eql({title: 'Title'});
      record.fields.title = 'New Title';
      expect(record.fields.title).to.eql('New Title');
    });
  });

  describe('#destroy()', function() {
    it('should remove record from collection', function(){
      var model = new Easy.Model();
      model.create({id:1, title: 'Title'});
      model.create({id:2, title: 'Title 2'});
      expect(model.find(1).destroy()).to.be.ok();
      expect(model.exist(1)).to.not.be.ok();
      expect(model.size).to.be(1);
    });

  });

});
