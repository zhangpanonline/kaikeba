var Vue
import Link from './krouter-link'
import View from './krouter-view'
class KVueRouter {
  constructor (options) {
    this.$options = options
    // 设置一个响应式的current属性
    // this._vm = new Vue({
    //   data: {
    //     $$current: '/'
    //   }
    // })
    // Vue.util.defineReactive(this, 'current', '/')
    this.current = window.location.hash.slice(1) || '/'
    Vue.util.defineReactive(this, 'matched', [])
    // match 可以递归遍历路由表,获得匹配关系数组
    this.match()

    // 事件监听hashchange
    window.addEventListener('hashchange', this.onHashChange.bind(this))
    window.addEventListener('load', this.onHashChange.bind(this))

    // this.routeMap = {}
    // this.$options.routes.forEach(route => {
    //   this.routeMap[route.path] = route
    // })


  }

  // get current() {
  //   return this._vm._data.$$current
  // }

  onHashChange() {
    this.current = window.location.hash.slice(1)
    this.matched = []
    this.match()
    // this._vm._data.$$current = window.location.hash.slice(1)
  }

  match(routes) {
    routes = routes || this.$options.routes
    // 递归遍历
    for (const route of routes) {
      if (route.path === '/' && this.current === '/') {
        this.matched.push(route)
        return  
      }
      if (route.path !== '/' && this.current.indexOf(route.path) != -1) {
        this.matched.push(route)
        if (route.children) {
          this.match(route.children)
        }
        return
      }
    }
  }

  static install(_Vue) {
    Vue = _Vue
    Vue.mixin({
      // 挂载$router
      beforeCreate() {
        // console.log(this)
        // 创建自上而下，挂载自下而上
        if (this.$options.router) {
          Vue.prototype.$router = this.$options.router
        }
      }
    })
    Vue.component('router-link', Link)
    Vue.component('router-view', View)
  }
}

export default KVueRouter