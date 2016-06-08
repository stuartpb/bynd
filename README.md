# bynd

Featherweight N-way data bindings with ES6 Map indexes

## Usage

*(This part is a bit dry and formal: you might want to skip to the Examples section below to see how this ends up being useful.)*

The `bynd` constructor function exported by this module takes a list of property names to treat as primary index keys, and returns an object presenting the same interface as an ES6 [Set][] for manipulating members of the collection. This object is augmented with two more objects, under the names `by` and `move`.

The `by` object contains getters for the members of the collection, with a getter for each key name under that property name (ie. `by.id()` is the getter for members by their `id` property).

The `move` object is for changing one of the properties on a member object that is being handled as an index. Since `bynd` doesn't mess with creating proxies for the objects you give it

### Magic that might well get cut in the next point release

If *every* enumerable property on the first object you add (when you add it) should be treated as a primary index, you can just call `bynd()`, and the indexes will be initialized accordingly on the first add.

## What? So?

This lets you, for instance, implement data binding for a model-view framework with an invocation like:

```js
var boundData = bynd('id', 'element');

// somewhere in your view initialization
// docFromDb is the doc we're initializing from
var viewContainer = document.createElement('div') /* snip */
boundData.add({
  model: docFromDb,
  id: docFromDb.id,
  element: viewContainer
});

// Now say you have an input that wants to get the document it's modifying:
// you can find it based only on its DOM hierarchy
var editedDoc = boundData.by.element(targetInput.parent).model;

// Similarly, your code that handles updates from the network can get the
// corresponding DOM node easily:
boundData.by.id(incomingDoc.id)
```

You can extend this out further to maintain identifiers for the entire hierarchy of your view, where *each component element* is treated as an index, and any sibling element can be found by looking up that element's object in the collection.

[Set]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
