// TODO: typed arrays and buffers
module.exports = Object.freeze({
  boolean(x) {
    return x !== undefined && x !== null && x.__proto__ === Boolean.prototype
  },
  number(x) {
    return x !== undefined && x !== null && x.__proto__ === Number.prototype
  },
  string(x) {
    return x !== undefined && x !== null && x.__proto__ === String.prototype
  },
  plainObject(x) {
    return x && x.__proto__ === Object.prototype
  },
  array(x) {
    return Array.isArray(x)
  },
  map(x) {
    return x && x.__proto__ === Map.prototype
  },
  set(x) {
    return x && x.__proto__ === Set.prototype
  },
  weakMap(x) {
    return x && x.__proto__ === WeakMap.prototype
  },
  weakSet(x) {
    return x && x.__proto__ === WeakSet.prototype
  }
})
