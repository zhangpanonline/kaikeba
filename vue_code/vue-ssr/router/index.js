import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/Index'

Vue.use(Router)

// 导出工厂函数
export function createRouter() {
  // 为什么每次要创建一个新的路由实例？这里会在服务端运行，每个用户之间应该是独立的实例，这样才不会相互污染[1-7,47:30]
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', component: Index },
      { path: '/detail', component: { template: '<div>detail</div>' } }
    ]
  })
}