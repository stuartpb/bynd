/* global describe it */
var bynd = require('../index.js');
var assert = require('assert');
describe('members', function() {
  it('should add', function() {
    var testBynding = bynd(['foo', 'bar']);
    testBynding.add({foo: 'baz', bar: 'qux'});
  });
  it('should be retrievable', function() {
    var testBynding = bynd(['foo', 'bar']);
    var testObject = {foo: 'baz', bar: 'qux'};
    testBynding.add(testObject);
    assert(testBynding.by.foo('baz') == testObject);
    assert(testBynding.by.bar('qux') == testObject);
  });
  it('should be distinct', function() {
    var testBynding = bynd(['foo', 'bar']);
    var testObject1 = {foo: 'baz', bar: 'qux'};
    var testObject2 = {foo: 'omg', bar: 'lol'};
    testBynding.add(testObject1);
    testBynding.add(testObject2);
    assert(testBynding.by.foo('baz') == testObject1);
    assert(testBynding.by.foo('omg') == testObject2);
    assert(testBynding.by.bar('qux') == testObject1);
    assert(testBynding.by.bar('lol') == testObject2);
  });
});
describe('late initialization', function() {
  it('should add', function() {
    var testBynding = bynd();
    testBynding.add({foo: 'baz', bar: 'qux'});
  });
  it('should be retrievable', function() {
    var testBynding = bynd();
    var testObject = {foo: 'baz', bar: 'qux'};
    testBynding.add(testObject);
    assert(testBynding.by.foo('baz') == testObject);
    assert(testBynding.by.bar('qux') == testObject);
  });
  it('should be distinct', function() {
    var testBynding = bynd();
    var testObject1 = {foo: 'baz', bar: 'qux'};
    var testObject2 = {foo: 'omg', bar: 'lol'};
    testBynding.add(testObject1);
    testBynding.add(testObject2);
    assert(testBynding.by.foo('baz') == testObject1);
    assert(testBynding.by.foo('omg') == testObject2);
    assert(testBynding.by.bar('qux') == testObject1);
    assert(testBynding.by.bar('lol') == testObject2);
  });
});
