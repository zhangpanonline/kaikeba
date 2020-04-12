import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import router from './krouter'
// import store from './store'
import store from './kstore'
import create from './utils/create'

import '@/icons'

console.log('客户端不能拿到：', process.env.foo)
console.log('客户端可以拿到：', process.env.VUE_APP_DONG)

Vue.config.productionTip = false
Vue.prototype.$create = create

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
export default vm
