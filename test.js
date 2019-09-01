'use strict'

const assert = require('assert')
const isInstanceOf = require('.')

const globalDate = Date

describe('isInstanceOf()', function () {
  it('should return true for instance of a single class', function () {
    assert.strictEqual(isInstanceOf(new Date(), Date), true)
  })

  it('should return false if not instance of a single class', function () {
    assert.strictEqual(isInstanceOf(new Date(), Error), false)
  })

  it('should return true for instance of a single named class', function () {
    assert.strictEqual(isInstanceOf(new Date(), 'Date'), true)
  })

  it('should return false if not instance of a single named class', function () {
    assert.strictEqual(isInstanceOf(new Date(), 'Error'), false)
  })

  it('should return true for instance of one of provided classes', function () {
    assert.strictEqual(isInstanceOf(new Date(), [Error, Date]), true)
  })

  it('should return false if not instance of any of provided classes', function () {
    assert.strictEqual(isInstanceOf(new Date(), [Error, TypeError]), false)
  })

  it('should return true for instance of a single named user class', function () {
    class Test {}
    assert.strictEqual(isInstanceOf(new Test(), 'Test'), true)
  })

  it('should consider identically-named classes to be the same', function () {
    class Date {} // eslint-disable-line no-shadow
    assert.strictEqual(isInstanceOf(new Date(), globalDate), true)
  })

  it('should make comparisons case-insensitively if `ci` is true', function () {
    class date {}
    assert.strictEqual(isInstanceOf(new date(), globalDate), false) // eslint-disable-line new-cap
    assert.strictEqual(isInstanceOf(new date(), globalDate, {ci: true}), true) // eslint-disable-line new-cap
  })

  it('should consider array primitives to be instances of Array', function () {
    assert.strictEqual(isInstanceOf([], Array), true)
    assert.strictEqual(isInstanceOf([], 'Array'), true)
    assert.strictEqual(isInstanceOf([], 'array'), false)
    assert.strictEqual(isInstanceOf([], 'array', {ci: true}), true)
  })

  it('should consider a class to be an instance of itself', function () {
    assert.strictEqual(isInstanceOf(Error, Error), true)
    assert.strictEqual(isInstanceOf(Array, Array), true)
  })

  it('should consider a class to be an instance of its own name', function () {
    assert.strictEqual(isInstanceOf(Error, 'Error'), true)
    assert.strictEqual(isInstanceOf(Array, 'Array'), true)
  })

  it('should consider a child class to be an instance of its parent', function () {
    assert.strictEqual(isInstanceOf(TypeError, Error), true)
  })

  it('should consider a child class to be an instance of its parent name', function () {
    assert.strictEqual(isInstanceOf(TypeError, 'Error'), true)
  })

  it('should return false if no class provided', function () {
    assert.strictEqual(isInstanceOf(new Date()), false)
  })

  it('should return false for a non-object', function () {
    assert.strictEqual(isInstanceOf('not an object', String), false)
  })

  it('should ignore `undefined` in the classes list', function () {
    assert.strictEqual(isInstanceOf(new Date(), [undefined, Error, Date]), true) // eslint-disable-line no-undefined
    assert.strictEqual(isInstanceOf(new Date(), [undefined]), false) // eslint-disable-line no-undefined
  })

  it('should support the bind operator', function () {
    assert.strictEqual(isInstanceOf.call(new Date(), Date), true)
  })
})
