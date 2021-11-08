import arrify from 'arrify'
import chain from 'class-chain'
import caseInsensitive from 'case-insensitive'
import flatten from '@lamansky/flatten'
import isObject from 'is-obj'
import qfn from 'qfn'
import sbo from 'sbo'

const {names} = chain
const isFunc = x => typeof x === 'function'

export default sbo(function isInstanceOf (x, classes, {ci = false} = {}) {
  if (!isObject(x)) return false
  ci = qfn(caseInsensitive, ci)
  const actualClassNames = ci(names(x))
  return flatten(arrify(classes)).some(cls => {
    switch (typeof cls) {
      case 'function':
        if (!isFunc(x) && cls === Array) return Array.isArray(x)
        return ((x instanceof cls) || (cls.name && actualClassNames.includes(cls.name)))
      case 'string':
        if (!isFunc(x) && ci('Array') === cls) return Array.isArray(x)
        return actualClassNames.includes(cls)
      case 'undefined': return false
      default: throw new TypeError('Class must be a function or a name string')
    }
  })
})
