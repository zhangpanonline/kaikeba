function observe(obj) {
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  } else if (Array.isArray(obj)) {
    // 覆盖原型，替换7个变更操作
    obj.__proto__ = arrayProto
    // 对数组内部元素执行响应化
    const keys = Object.keys(obj)
    for (let i = 0; i < obj.length; i++) {
      observe(obj[i])
    }
  } else {
    return false
  }
}

// 数组响应式
const orginalProto = Array.prototype
const arrayProto = Object.create(orginalProto);
['push', 'pop', 'shift', 'unshift'].forEach(method => {
  arrayProto[method] = function() {
    orginalProto[method].apply(this, arguments)
    // 通知更新
    console.log('数组执行' + method + '操作')
  }
})

// 对象响应式
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
// set(obj, 'done', 'done')
// obj.done
set(obj, 'arr', [])
obj.arr.push(1)