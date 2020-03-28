export default {
  render(h) {
    // 标记当前router-view深度
    this.$vnode.data.routerView = true
    let depth = 0
    let parent = this.$parent

    while(parent) {
      const vnodeData = parent.$vnode && parent.$vnode.data
      if (vnodeData) {
        if (vnodeData.routerView) { // 说明当前parent是一个router-view
          depth++
        }
      }
      parent = parent.$parent
    }

    // const { routeMap, current } = this.$router
    // const component = routeMap[current].component || null
    const route = this.$router.matched[depth]
    const component = route ? route.component : null
    return h(component)
  }
}