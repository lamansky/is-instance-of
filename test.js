'use strict'

const assert = require('assert')
const isInstanceOf = require('.')

const globalDate = Date

describe('isInstanceOf()', function () {
  it('should return true for instance of a single class', function () {
    assert(isInstanceOf(new Date(), Date))
  })

  it('should return false if not instance of a single class', function () {
    assert(!isInstanceOf(new Date(), Error))
  })

  it('should return true for instance of a single named class', function () {
    assert(isInstanceOf(new Date(), 'Date'))
  })

  it('should return false if not instance of a single named class', function () {
    assert(!isInstanceOf(new Date(), 'Error'))
  })

  it('should return true for instance of one of provided classes', function () {
    assert(isInstanceOf(new Date(), [Error, Date]))
  })

  it('should return false if not instance of any of provided classes', function () {
    assert(!isInstanceOf(new Date(), [Error, TypeError]))
  })

  it('should return true for instance of a single named user class', function () {
    class Test {}
    assert(isInstanceOf(new Test(), 'Test'))
  })

  it('should consider identically-named classes to be the same', function () {
    class Date {}
    assert(isInstanceOf(new Date(), globalDate))
  })

  it('should make comparisons case-insensitively if `ci` is true', function () {
    class date {}
    assert(!isInstanceOf(new date(), globalDate)) // eslint-disable-line new-cap
    assert(isInstanceOf(new date(), globalDate, {ci: true})) // eslint-disable-line new-cap
  })

  it('should consider array primitives to be instances of Array', function () {
    assert(isInstanceOf([], Array))
    assert(isInstanceOf([], 'Array'))
    assert(!isInstanceOf([], 'array'))
    assert(isInstanceOf([], 'array', {ci: true}))
  })

  it('should return false if no class provided', function () {
    assert(!isInstanceOf(new Date()))
  })

  it('should return false for a non-object', function () {
    assert(!isInstanceOf('not an object', String))
  })

  it('should support the bind operator', function () {
    assert(isInstanceOf.call(new Date(), Date))
  })
})
