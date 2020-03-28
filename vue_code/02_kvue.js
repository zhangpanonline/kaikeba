function observe(obj) {
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    new Observe(obj)
  }
}

function defineReactive(obj, key, val) {

  observe(val)

  // 创建Dep实例和key一一对应
  const dep = new Dep()

  Object.defineProperty(obj, key, {
    get() {
      // 读拦截
      // console.log('get', key, val)
      // 依赖收集
      Dep.target && dep.addDep(Dep.target)
      return val
    },
    set (newVal) {
      // 写拦截
      if (newVal !== val) {
        observe(newVal)
        // console.log('set', key, newVal)
        val = newVal

        // 更新
        // watchers.forEach(w => w.update())
        dep.notify()
      }
    }
  })

}

// TODO 分辨响应式数据是对象还是数组
class Observe {
  constructor(value) {
    this.value = value
    this.walk(value)
  }

  walk(obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
}

// 代理
function proxy(vm, prop) {
  Object.keys(prop).forEach(key => {
    Object.defineProperty(vm, key, {
      get() {
        return prop[key]
      },
      set(newVal) {
        prop[key] = newVal
      }
    })
  })
}

// 编译器：解析模板中插值表达式或者指令
class Compile {
  // vm是KVue实例，用于初始化和更新页面
  // el是一个选择器，用于获取模板dom
  constructor(el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)

    this.compile(this.$el)
  }

  compile(el) {
    const childNodes = el.childNodes

    // 遍历所有子节点
    Array.from(childNodes).forEach(node =>{
      // 元素类型
      if (this.isElement(node)) {
        // console.log('编译元素', node,node.nodeName, node.nodeType)
        this.compileElement(node)
      } else if (this.isInter(node)) {
        // console.log('编译插值', node, node.textContent, node.nodeType)
        this.compileText(node)
      }
      // 递归
      if (node.childNodes) this.compile(node)
    })
  }

  isElement(node) {
    return node.nodeType === 1
  }

  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }

  // 更新方法
  update(node, exp, dir) {
    // 检查是否存在实操函数
    const fn = this[dir + 'Updater'] // this.textUpdaer ...
    // 初始化
    fn && fn(node, this.$vm[exp])

    // 更新操作
    new Watcher(this.$vm, exp, function(val) {
      fn && fn(node, val)
    })
  }

  // 文本实操 函数
  textUpdater(node, val) {
    // 具体操作
    node.textContent = val
  }

  // 编译插值文本，初始化
  compileText(node) {
    // node.textContent = this.$vm[RegExp.$1]
    this.update(node, RegExp.$1, 'text')
  }

  // 编译元素节点，判断他的属性是否为k-xx, @xx
  compileElement(node) {
    Array.from(node.attributes).forEach(attr => {
      const attrName = attr.name // k-text
      const attrValue = attr.value // counter
      // 如果是指令
      if (this.isDir(attrName)) {
        let dir = attrName.substring(2)
        this[dir] && this[dir](node, attrValue)
      } else if (this.isClick(attrName)) {
        let dir = attrName.substring(1)
        this[dir] && this[dir](node, attrValue)
      }
    })
  }

  isDir(name) {
    return /^k-.*/.test(name)
    // return attr.indexOf('k-') === 0
  }

  text(node, exp) {
    // node.textContent = this.$vm[exp]
    this.update(node, exp, 'text')
  }

  html(node, exp) {
    // node.innerHTML = this.$vm[value]
    this.update(node, exp, 'html')
  }

  htmlUpdaer(node, val) {
    node.innerHTML = val
  }

  isClick(name) {
    return /^@.*/.test(name)
  }

  click(node, fn) {
    const that = this
    node.onclick = function () {
      that.$vm[fn]()
    }
  }
}

// Dep： 管理watcher
class Dep {
  constructor() {
    this.watchers = []
  }

  addDep(watcher) {
    this.watchers.push(watcher)
  }

  notify() {
    this.watchers.forEach(w => w.update())
  }
}

const watchers = []
// Watcher：和模板中的依赖1对1对应，如果某个key发生变化，则执行更新函数
class Watcher {
  constructor(vm, key, updater) {
    this.vm = vm
    this.key = key
    this.updater = updater

    // watchers.push(this)
    // 和Dep建立关系
    Dep.target = this
    this.vm[this.key] // 触发get，可以做依赖收集
    Dep.target = null
  }

  // 更新方法是用Dep调用
  update() {
    this.updater.call(this.vm, this.vm[this.key])
  }
  
}

class KVue {
  constructor(options) {
    this.$options = options
    this.$data = options.data
    this.$methods = options.methods

    // 1. 数据响应式处理
    observe(this.$data)

    // 1.1 数据代理
    proxy(this, this.$data)
    proxy(this, this.$methods)

    // 2. 编译
    new Compile(options.el, this)
  }

}