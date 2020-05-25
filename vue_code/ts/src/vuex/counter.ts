import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from './index'

// 动态注册模块
@Module({ dynamic: true, store: store, name: 'counter', namespaced: true })
class CounterModule extends VuexModule {
  count = 1
  
  get doubleCount() {
    return this.count * 2
  }

  @Mutation
  add() {
    this.count++
  }

  @Action
  asyncAdd() {
    setTimeout(() => {
      this.add()
    }, 1000)
  }
}

export default getModule(CounterModule)