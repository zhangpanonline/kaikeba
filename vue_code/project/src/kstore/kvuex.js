var Vue;

class Store {
  constructor(options) {
    this._vm = new Vue({
      data: {
        $$state: options.state
      },
      computed: {
        a() {
          return 1
        }
      }
    })
    this._getters = options._getters

    this._mutations = options.mutations

    this._actions = options.actions

    // 绑定commit、dispatch方法中的this到Store
    const store = this
    const { commit, dispatch } = this
    this.commit = function boundCommit(type, payload) {
      commit.call(store, type, payload)
    }
    this.dispatch = function boundDispatch(type, payload) {
      dispatch.call(store, type, payload)
    }
  }
  get state() {
    return this._vm._data.$$state
  }
  
  commit(type, payload) {
    const entry = this._mutations[type]
    if (!entry) {
      console.error('error')
      return
    }

    // 这里可以做拦截处理

    entry(this.state, payload)
  }

  dispatch(type, payload) {
    const entry = this._actions[type]
    if (!entry) {
      console.error('err')
      return
    }

    entry(this, payload)
  }
}

function install(_Vue) {
  Vue = _Vue

  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

export default { Store, install }