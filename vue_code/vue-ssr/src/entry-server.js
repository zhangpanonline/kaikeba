// 服务端入口：
// 1. 导航至首屏

import { createApp } from './main'

// TODO 服务端没有挂载，所以没有mounted() 和 beforeMounted()，原因是什么?需要去源码查找答案
// 服务端只有created() 和 beforeCreated()

export default context => {

  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp(context)
  
    // 首屏
    router.push(context.url)
  
    // 导航过程可能是异步的
    router.onReady( async () => {
      // 就绪后可能有异步数据请求
      // 1. 获取匹配的组件
      const Components = router.getMatchedComponents()

      if (!Components.length) reject({ code: 404 })

      // 便利这些组件，看看有没有asyncData选项
      // Component组件配置对象
      await Promise.all(Components.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({ store, route: router.currentRoute })
        }
      }))

      // 获取所有数据结果之后，将这些数据存入store
      // 将这些状态指定给上下文，将来bundleRenderer在渲染的时候
      // 会将这些值附加到window.__INITIAL_STATE__ // TODO 服务端有window对象？
      context.state = store.state

      resolve(app)
    }, reject)

  })

}