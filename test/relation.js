var expect = require("expect.js");
var Model = require("../easy.js").Model;

describe('EasyRelation', function() {
  var model;

  beforeEach(function() {
    model = new Model({
      schema: [{name: 'id', type: 'integer'}, {name: 'title', type: 'string'}]
    });
    model.create({id: 1, title: 'Title 1'});
  });

  describe('#is', function() {
    it('should work', function(){
      expect(model.where('title').is('Title 1')).to.eql({});
      expect(record.title).to.eql('');
    });
  });
  describe('#isnt', function() {
    it('should work', function(){
      expect(model.where('title').isnt('Title 2')).to.eql({});
      expect(record.title).to.eql('');
    });
  });
  describe('#like', function() {
    it('should work', function(){
      expect(model.where('title').islike('Title')).to.eql({});
      expect(record.title).to.eql('');
    });
  });

});
