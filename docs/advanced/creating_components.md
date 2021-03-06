# Creating Components

To create a new component simply require the Bonaparte core package and use the `bp.tag.create` method to create a new component:

```javascript
var bp = require("bonaparte");

module.exports = bp.tag.create("tag-name", MyModule);

function MyModule(tag) {
    // magic
}

```
>[Full API documentation](core_api.html#bptagcreate)

## Module Structure
Bonaparte components are defined by *modules*. 

_Modules_ are simple JavaScript functions/classes:
```javascript
function MyModule(tag) {
// tag === this === current tag instance
}
```
Each Bonaparte component can be composed by one or more _modules_:

```javascript
module.exports = bp.tag.create("tag-name", [
    MyModule, 
    AnotherModule, 
    function(){...}
]);

```
**Every time the component is placed on the page, all its modules are instantiated.**

Bonaparte components are *modules* themselves. Therefore it is possible to extend an existing Bonaparte component to add functionality:

```javascript
var bonarparteSidebar = require('bonaparte-sidebar/bonaparte.js');

module.exports = bp.tag.create("tag-name", [
    bonaparteSidebar,
    MyModule
]);
```

*Modules* are instantiated in the order they were passed to `bp.tag.create`.


> Bonaparte uses the [Objct](https://github.com/greenish/js-objct) library to create this modularity.

## Events


```javascript
  "bonaparte.tag.created"
  "bonaparte.tag.attached"
  "bonaparte.tag.detached"
  "bonaparte.tag.attributeChanged" // Value changed
  "bonaparte.tag.attributeUpdated" // Value updated (might not have changed)
```

### Listen
Listen to them like you do to native events:
```javascript
function module(tag) {
    tag.addEventListener("bonaparte.tag.attached", handler);
}
```

### Trigger Custom Events
Custom events can easily be triggered by calling
```javascript
function module(tag) {
    tag.bonaparte.triggerEvent("name", data)
}
```

Or through the [API](#api) events can be triggered on any element: 
```javascript
bp.tag.triggerEvent(tag, "name", data);
```
>[Full API documentation](core_api.html#bptagtriggerevent)