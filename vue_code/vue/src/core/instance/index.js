import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // TODO 1. 初始化做了什么？2.init哪来的？
  this._init(options)
}

initMixin(Vue)  // 混入，实现_init方法
// 以下实现众多实例方法
stateMixin(Vue) // $set $delete $watch ...
eventsMixin(Vue) // $emit $on $once $off
lifecycleMixin(Vue) // _update $forceUpdate $destroy
renderMixin(Vue) // $nextTick _render

export default Vue
