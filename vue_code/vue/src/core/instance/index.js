import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

/**
 * 
 * @file 定义 Vue 构造函数 
 */
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // TODO 初始化做了什么？2.init哪来的？
  this._init(options)
}

initMixin(Vue)  // 混入，实现_init方法
// 以下实现众多实例方法
stateMixin(Vue) // 实现处理数据的三个实例方法 vm.$set vm.$delete vm.$watch ，以及定义两个实例属性 vm.$data vm.$props
eventsMixin(Vue) // 实现处理事件的四个个实例方法 vm.$emit vm.$on vm.$once vm.$off
lifecycleMixin(Vue) // 实现处理声明周期的两个实例方法 vm.$forceUpdate vm.$destroy，以及vdom 和真是 dom 比较的 _update() 方法
renderMixin(Vue) // 实现处理生命周期的一个实例方法 vm.$nextTick，以及生成 Vnode 的 _render() 方法

export default Vue
