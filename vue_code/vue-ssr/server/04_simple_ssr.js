
// 最简单的一个服务端渲染

const express = require('express')
const app = express()

// 导入Vue
const Vue = require('vue')

const Router = require('vue-router')
Vue.use(Router)

// 渲染器
const { createRenderer } = require('vue-server-renderer')
const renderer = createRenderer()

app.get('*', async (req, res) => {

  const router = new Router({
    mode: 'history',
    routes: [
      { path: '/', component: { template: `<div>index</div>` } },
      { path: '/detail', component: { template: `<div>detail</div>` } }
    ]
  })
  // 跳转至url对应路由页面
  // 首屏渲染
  router.push(req.url)
  const vm = new Vue({
    data: { name: 'hello w' },
    template: `<div @click="onClick" ><router-view></router-view></div>`,
    router,
    methods: {
      onClick() {
        alert(1)
      }
    },
  })

  try {
    const html = await renderer.renderToString(vm)
    // 将渲染的html字符串返回给客户端
    res.send(html)    
  } catch (error) {
    res.status(500).send(error)
  }
})

app.listen(3000, () => {
  console.log('server start on port 3000')
})