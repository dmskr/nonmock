/* jshint strict: true, node: true */
/* global describe, it, beforeEach */
"use strict";

var should = require('chai').should();
var nonmock = require('./nonmock');

describe("NonMock", function() {
  var monkey = null;
  var original = null, replacement = null;
  beforeEach(function() {
    monkey = {
      collectBananas: function() {
        console.log('Mm Bananas!');
      }
    };
    original = monkey.collectBananas;
    replacement = function() { console.log('Hate Bananas!'); };
  });

  describe("replace", function() {
    it("replace existing function with the new one", function() {
      nonmock.replace(monkey, 'collectBananas', replacement);

      should.exist(monkey.collectBananas);
      monkey.collectBananas.toString().should.not.eql(original.toString());
      monkey.collectBananas.toString().should.eql(replacement.toString());
    });
    it("should return existing function if any", function() {
      var result = nonmock.replace(monkey, 'collectBananas', replacement);

      should.exist(result);
      result.toString().should.eql(original.toString());
    });
    it("should return replaced function if replaced several times", function(){
      var result = nonmock.replace(monkey, 'collectBananas', replacement);
      var latest = function() { console.log('Too lazy for bananas today.'); };
      result = nonmock.replace(monkey, 'collectBananas', latest);

      should.exist(result);
      result.toString().should.eql(replacement.toString());
    });
  });
  describe("restore", function() {
    it("should restore previously replaced functions", function() {
      nonmock.replace(monkey, 'collectBananas', replacement);
      nonmock.restore();

      should.exist(monkey.collectBananas);
      monkey.collectBananas.toString().should.eql(original.toString());
    });
    it("should restore original functions replaced very first time after previous restore", function() {
      nonmock.replace(monkey, 'collectBananas', replacement);
      var latest = function() { console.log('Too lazy for bananas today.'); };
      nonmock.replace(monkey, 'collectBananas', latest);
      nonmock.restore();

      should.exist(monkey.collectBananas);
      monkey.collectBananas.toString().should.eql(original.toString());
    });
    it("should forget everything it knows about restored functions", function() {
      nonmock.replace(monkey, 'collectBananas', replacement);

      var latest = function() { console.log('Too lazy for bananas today.'); };
      nonmock.replace(monkey, 'collectBananas', latest);
      nonmock.restore();

      var newOriginal = monkey.collectBananas = function() {
        console.log('Collect! Collect! Collect!');
      };

      nonmock.replace(monkey, 'collectBananas', replacement);
      nonmock.replace(monkey, 'collectBananas', latest);
      nonmock.restore();

      should.exist(monkey.collectBananas);
      monkey.collectBananas.toString().should.eql(newOriginal.toString());
    });
  });
});

