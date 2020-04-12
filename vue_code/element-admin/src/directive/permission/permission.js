import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding // 获取指令的值
    const roles = store.getters && store.getters.roles // 获取用户角色

    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value

      const hasPermission = roles.some(role => { // 判断是否有交集
        return permissionRoles.includes(role)
      })

      if (!hasPermission) { // 如果没有则删除当前按钮
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}
