export const actions = {
  nuxtServerInit ({ commit }, { app }) {
    // nuxt-universal-cookie用法
    // app是server实例也就是koa实例
    const token = app.$cookies.get('token')
    if (token) {
      console.log(`nuxtServerInit: token ${token}`)
      commit('user/init', token)
    }
  }
}
