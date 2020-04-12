// 参数1上下文
// 参数2注入函数
export default ({ $axios }, inject) => {
  inject('login', (user) => {
    return $axios.$post('/api/login', user)
  })
}
