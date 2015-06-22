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

});
