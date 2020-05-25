// 此文件并非nuxt生成，他为演示项目提供数据服务接口
const Koa = require('koa')
const app = new Koa()
const bodyparser = require('koa-bodyparser')
const router = require('koa-router')({ prefix: '/api' })

// 设置cookie加密秘钥
app.keys = ["some secret", "another secret"]

const goods = [
  { id: 1, text: 'web', price: 1000 },
  { id: 2, text: 'python', price: 1000 }
]

// 配置路由
// 获取产品列表
router.get('/goods', ctx => {
  ctx.body = {
    ok: 1,
    goods
  }
})

// 产品详情
router.get('/detail', ctx => {
  ctx.body = {
    ok: 1,
    data: goods.find(good => good.id === ctx.query.id)
  }
})

// 登录
router.post('/login', ctx => {
  const user = ctx.request.body
  if (['admin', '123'].includes(user.username)) {
    // 将token存入cookie
    const token = 'token'
    ctx.cookies.set('token', token)
    ctx.body = { ok: 1, token }
  } else {
    ctx.body = { ok: 0 }
  }
})

// 解析post数据并注册路由
app.use(bodyparser())
// 注册路由
app.use(router.routes())

app.listen('8080')