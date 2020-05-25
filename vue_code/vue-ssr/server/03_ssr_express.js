const express = require('express')

const server = express()


const Vue = require('vue')

const { createRenderer } = require('vue-server-renderer')

// 获取渲染器实例
const renderer = createRenderer()

server.get('/', (req, res) => {
  // res.send('<h1>hello world</h1>')
// 创建VUE实例
  const app = new Vue({
    template: `<h1 @click='onClick' >{{msg}}</h1>`,
    data() {
      return {
        msg: 'ssr'
      }
    },
    methods: {
      onClick() {
        console.log('不能实现')
      }
    },
  })

  // 用渲染器渲染vue实例
  renderer.renderToString(app).then(html => {
    res.send(html)

  }).catch(err => {
    res.status(500)
    res.send('Internal Server Error, 500!')
  })

})

// 監聽端口
server.listen(80, () => {
  console.log('服务开启成功！')
})