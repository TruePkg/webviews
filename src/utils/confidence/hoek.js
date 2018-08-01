/* eslint-disable complexity,max-statements,max-params,max-depth,no-magic-numbers,no-nested-ternary */

/**
 * Stripped down version of Hoek for the purpose of the Store needs
 */

export const clone = function(obj, seen) {
    if (typeof obj !== 'object' || obj === null) {
      return obj
    }
  
    seen = seen || { orig: [], copy: [] }
  
    const lookup = seen.orig.indexOf(obj)
    if (lookup !== -1) {
      return seen.copy[lookup]
    }
  
    let newObj
    let cloneDeep = false
  
    if (!Array.isArray(obj)) {
      if (obj instanceof Date) {
        newObj = new Date(obj.getTime())
      } else if (obj instanceof RegExp) {
        newObj = new RegExp(obj)
      } else {
        const proto = Object.getPrototypeOf(obj)
        if (proto && proto.isImmutable) {
          newObj = obj
        } else {
          newObj = Object.create(proto)
          cloneDeep = true
        }
      }
    } else {
      newObj = []
      cloneDeep = true
    }
  
    seen.orig.push(obj)
    seen.copy.push(newObj)
  
    if (cloneDeep) {
      const keys = Object.getOwnPropertyNames(obj)
      for (let i = 0; i < keys.length; ++i) {
        const key = keys[i]
        const descriptor = Object.getOwnPropertyDescriptor(obj, key)
        if (descriptor && (descriptor.get || descriptor.set)) {
          Object.defineProperty(newObj, key, descriptor)
        } else {
          newObj[key] = clone(obj[key], seen)
        }
      }
    }
  
    return newObj
  }
  
  // Merge all the properties of source into target, source wins in conflict, and by default null and undefined from source are applied
  
  export const merge = function(
    target,
    source,
    isNullOverride /* = true */,
    isMergeArrays /* = true */
  ) {
    assert(
      target && typeof target === 'object',
      'Invalid target value: must be an object'
    )
    assert(
      source === null || source === undefined || typeof source === 'object',
      'Invalid source value: must be null, undefined, or an object'
    )
  
    if (!source) {
      return target
    }
  
    if (Array.isArray(source)) {
      assert(Array.isArray(target), 'Cannot merge array onto an object')
      if (isMergeArrays === false) {
        // isMergeArrays defaults to true
        target.length = 0 // Must not change target assignment
      }
  
      for (let i = 0; i < source.length; ++i) {
        target.push(clone(source[i]))
      }
  
      return target
    }
  
    const keys = Object.keys(source)
    for (let i = 0; i < keys.length; ++i) {
      const key = keys[i]
      const value = source[key]
      if (value && typeof value === 'object') {
        if (
          !target[key] ||
          typeof target[key] !== 'object' ||
          Array.isArray(target[key]) !== Array.isArray(value) ||
          value instanceof Date ||
          value instanceof RegExp
        ) {
          target[key] = clone(value)
        } else {
          merge(target[key], value, isNullOverride, isMergeArrays)
        }
      } else if (value !== null && value !== undefined) {
        // Explicit to preserve empty strings
  
        target[key] = value
      } else if (isNullOverride !== false) {
        // Defaults to true
        target[key] = value
      }
    }
  
    return target
  }
  
  // Convert an object key chain string ('a.b.c') to reference (object[a][b][c])
  
  export const reach = function(obj, chain, options) {
    if (chain === false || chain === null || typeof chain === 'undefined') {
      return obj
    }
  
    options = options || {}
    if (typeof options === 'string') {
      options = { separator: options }
    }
  
    const path = chain.split(options.separator || '.')
    let ref = obj
    for (let i = 0; i < path.length; ++i) {
      let key = path[i]
      if (key[0] === '-' && Array.isArray(ref)) {
        key = key.slice(1, key.length)
        key = ref.length - key
      }
  
      if (
        !ref ||
        !((typeof ref === 'object' || typeof ref === 'function') && key in ref) ||
        (typeof ref !== 'object' && options.functions === false)
      ) {
        // Only object and function can have properties
  
        assert(
          !options.strict || i + 1 === path.length,
          'Missing segment',
          key,
          'in reach path ',
          chain
        )
        assert(
          typeof ref === 'object' ||
            options.functions === true ||
            typeof ref !== 'function',
          'Invalid segment',
          key,
          'in reach path ',
          chain
        )
        ref = options.default
        break
      }
  
      ref = ref[key]
    }
  
    return ref
  }
  
  export const assert = function(condition /*, msg1, msg2, msg3 */) {
    if (condition) {
      return
    }
  
    if (arguments.length === 2 && arguments[1] instanceof Error) {
      throw arguments[1]
    }
  
    let msgs = []
    for (let i = 1; i < arguments.length; ++i) {
      if (arguments[i] !== '') {
        msgs.push(arguments[i]) // Avoids Array.slice arguments leak, allowing for V8 optimizations
      }
    }
  
    msgs = msgs.map(msg => {
      return typeof msg === 'string'
        ? msg
        : msg instanceof Error ? msg.message : stringify(msg)
    })
  
    throw new Error(msgs.join(' ') || 'Unknown error')
  }
  
  export const stringify = function() {
    try {
      return JSON.stringify.apply(null, arguments)
    } catch (err) {
      return `[Cannot display object: ${err.message}]`
    }
  }
  