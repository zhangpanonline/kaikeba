// 客户端激活:创建一个新的vue实例,并挂载
// TODO 激活的原理是什么？

import { createApp } from './main'

// 创建vue实例
const { app, router, store } = createApp()

// 恢复storer数据状态
if (window.__INITIAL_STATE__) store.replaceState(window.__INITIAL_STATE__)

// 路由就绪事件,执行挂载
router.onReady(() => {
  app.$mount('#app')
})
