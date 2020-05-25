var Vue;

class Store {
  constructor(options) {
    this._getters = options.getters
    
    this._mutations = options.mutations
    
    this._actions = options.actions

    const computed = {}
    this.getters = {}

    
    // 绑定commit、dispatch方法中的this到Store
    const store = this
    const { commit, dispatch } = this
    this.commit = function boundCommit(type, payload) {
      commit.call(store, type, payload)
    }
    this.dispatch = function boundDispatch(type, payload) {
      dispatch.call(store, type, payload)
    }
                      Object.keys(this._getters).forEach(key => {
                        computed[key] = function() {
                          return store._getters[key](store.state)
                        }
                        Object.defineProperty(store.getters, key, {
                          get: () => store._vm[key]
                        })
                      })
                      this._vm = new Vue({
                        data: {
                          $$state: options.state
                        },
                        computed
                      })
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