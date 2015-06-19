var assert = require("assert");
var expect = require('expect.js');
var Easy = require("../easy.js");

describe('EasyRecord', function(){
  describe('#constructor()', function(){
    it('should save empty hash when attrs is empty', function(){
      var record = new Easy.Record({});
      expect(record.attrs).to.eql({});
    });


  })
});
