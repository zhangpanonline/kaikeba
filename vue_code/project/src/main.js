import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import router from './krouter'
// import store from './store'
import store from './kstore'
import create from './utils/create'

Vue.config.productionTip = false
Vue.prototype.$create = create

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// console.log(vm)
export default vm
