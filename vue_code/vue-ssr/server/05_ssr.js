
// 最简单的一个服务端渲染

const express = require('express')
const app = express()

// 获取文件路径
const resolve = dir => require('path').resolve(__dirname, dir)

// 第一步：开放dist/client目录，关闭默认下载index页选项，不然会默认打开dist/client下的index.html，到不了后面路由
app.use(express.static(resolve('../dist/client'), { index: false }))

// 判断当前的执行环境
const isDev = process.env.NODE_ENV === 'development'

// 第二步：获得一个createBundleRenderer
const { createBundleRenderer } = require('vue-server-renderer')
let renderer

function createRenderer () {
  // 第三步：服务端打包文件地址
  const bundle = resolve('../dist/server/vue-ssr-server-bundle.json')
  
  // 第四步：创建渲染器
  const renderer = createBundleRenderer(bundle, {
    // inject: 加样式
    runInNewContext: false, // 官方建议设为false
    template: require('fs').readFileSync(resolve('../public/index.html'), 'utf-8'), // 同步加载宿主文件，并指定编码方式为utf-8
    clientManifest: require(resolve('../dist/client/vue-ssr-client-manifest.json')) // 客户端清单，因为要的是一个文件，而不是路径地址，所以用了require()
  })

  return renderer
}

// 监控src目录，自动构建
// 如果当前执行环境是开发环境，则监控src目录的变更
if (isDev) {
  // 获取一个当前js线程的子进程，因为js是单线程，不可能再获取一个新的线程，所以用当前线程的子进程，并且两者是可以通信的，能知道这个子进程的结果
  const cp = require('child_process')
  // 创建一个bs实例用于将来浏览器同步操作
  const bs = require('browser-sync').create()
  // 导入chokider监控src
  const chokider = require('chokidar')
  const filesWatcher = chokider.watch('src/**/*.*')
  filesWatcher.on('change', (path, state) => {
    console.log(path + '发生变化，正在重新编译')
    console.log(state)
    // 开启子进程
    cp.exec('npm run build', (error, standardOut) => {
      if (error) {
        console.log(error.stack)
        return
      } else {
        // 构建信息输出到当前控制台
        console.log(standardOut)
        console.log('编译完成，重新加载')

        // 浏览器同步
        bs.reload()
      }
    })
  })
  // 创建代理（新的端口可能是30001、...，所以代理到3000，并且可以通过bs控制浏览器的刷新行为)
  bs.init({ proxy: 'http://localhost:3000' })
}


app.get('*', async (req, res) => {

  try {
    // 如果是开发模式或者还未存在renderer则创建
    if (isDev || !renderer) {
      renderer = createRenderer()
    }
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