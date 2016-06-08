(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.bynd = factory();
  }
})(this, function(){return function bynd(index) {
  var maps = {};
  var baseSet = new Set();
  var by = {};
  var move = {};

  function initIndex(k) {
    var indexMap = new Map();
    maps[k] = indexMap;
    by[k] = function(v) {
      return indexMap.get(v);
    };
    move[k] = function(u, v) {
      var o = indexMap.get(u);
      indexMap.delete(u);
      o[k] = v;
      indexMap.set(v, o);
      return o;
    };
  }

  function add(o) {
    baseSet.add(o);
    for (var i = 0; i < index.length; i++) {
      var k = index[i];
      maps[k].set(o[k], o);
    }
    return bynding; // only to match Set, I'd rather return o personally
  }

  function remove(o) {
    for (var i = 0; i < index.length; i++) {
      var k = index[i];
      maps[k].delete(o[k]);
    }
    return baseSet.delete(o);
  }

  function clear() {
    for (var i = 0; i < index.length; i++) {
      var k = index[i];
      maps[k].clear();
    }
    return baseSet.clear();
  }

  var bynding = {
    by: by,
    move: move,
    add: add,
    delete: remove,
    clear: clear,
    has: baseSet.has.bind(baseSet),
    forEach: baseSet.forEach.bind(baseSet),
    values: baseSet.values.bind(baseSet),
    entries: baseSet.entries.bind(baseSet),
  };
  bynding[Symbol.iterator] = baseSet[Symbol.iterator].bind(baseSet);

  function lateInitAdd(o) {
    index = Object.keys(o);
    for (var i = 0; i < index.length; i++) {
      initIndex(index[i]);
    }
    bynding.add = add;
    return add(o);
  }

  if (!index) {
    bynding.add = lateInitAdd;
  } else {
    if (!Array.isArray(index)) {
      index = Array.from(arguments);
    }
    for (var i = 0; i < index.length; i++) {
      initIndex(index[i]);
    }
  }
  return bynding;
}});
