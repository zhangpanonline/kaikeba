function observe(obj) {
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
}

function defineReactive(obj, key, val) {

  observe(val)

  Object.defineProperty(obj, key, {
    get() {
      console.log('get', key, val)
      return val
    },
    set (newVal) {
      if (newVal !== val) {
        observe(newVal)
        console.log('set', key, newVal)
        val = newVal
      }
    }
  })

}

function set(obj, key, val) {
  defineReactive(obj, key, val)
}

const obj = {foo: 'foo', bar: 'bar', baz: { a: 1 } }
observe(obj)

// obj.foo
// obj.foo = 'f00000000000'
// obj.bar
// obj.bar = 'barrrrrr'
// obj.baz.a
// obj.baz = { a: 20 }
// obj.baz.a = 30
set(obj, 'done', 'done')
obj.done