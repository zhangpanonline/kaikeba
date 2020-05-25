export default function (ctx) {
  // 上下文中通过store访问vuex中的全局状态
  // 通过vuex中令牌存在与否判断是否登录
  if (!ctx.store.state.user.token) {
    ctx.redirect('/login?redirect=' + ctx.route.path)
  }
}
