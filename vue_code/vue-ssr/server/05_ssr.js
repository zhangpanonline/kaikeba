
// 最简单的一个服务端渲染

const express = require('express')
const app = express()

// 获取文件路径
const resolve = dir => require('path').resolve(__dirname, dir)

// 第一步：开放dist/client目录，关闭默认下载index页选项，不然会默认打开dist/client下的index.html，到不了后面路由
app.use(express.static(resolve('../dist/client'), { index: false }))

// 第二步：获得一个createBundleRenderer
const { createBundleRenderer } = require('vue-server-renderer')

// 第三步：服务端打包文件地址
const bundle = resolve('../dist/server/vue-ssr-server-bundle.json')

// 第四步：创建渲染器
const renderer = createBundleRenderer(bundle, {
  // inject: 加样式
  runInNewContext: false, // 官方建议设为false
  template: require('fs').readFileSync(resolve('../public/index.html'), 'utf-8'), // 同步加载宿主文件，并指定编码方式为utf-8
  clientManifest: require(resolve('../dist/client/vue-ssr-client-manifest.json')) // 客户端清单，因为要的是一个文件，而不是路径地址，所以用了require()
})

app.get('*', async (req, res) => {

  try {
    const context = {
      url: req.url
    }
    const html = await renderer.renderToString(context)
    // 将渲染的html字符串返回给客户端
    res.send(html)    
  } catch (error) {
    res.status(500).send(error)
  }
})

app.listen(3000, () => {
  console.log('server start on port 3000')
})