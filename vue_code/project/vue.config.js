const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)

console.log(process.env.foo)
console.log(process.env.VUE_APP_DONG)

// 运行环境是在node
module.exports = {
  publicPath: '/best-practice',
  devServer: {
    port: 1111
  },
  // configureWebpack: {
  //   name: 'best-practice',
  //   resolve: {
  //     alias: {
  //       comps: path.resolve(__dirname, 'src/components')
  //     }
  //   }
  // }
  configureWebpack: config => {
    config.resolve.alias['@svg'] = resolve('src/icons/svg')
    if (process.env.NODE_ENV === 'development') {
      config.name = '开发模式'
    } else {
      config.name = '生产模式'
    }
  },
  chainWebpack: c => {
    // vue inspect > out.js
    // vue inspect --rules
    // vue inspect --rule svg

    c.resolve.alias
      .set('@comps', resolve('src/components'))

    // 1. 找到默认的svg-loader，让它排除icons目录
    c.module.rule('svg').exclude.add(resolve('src/icons'))
    // 2. 新增一个loader，让它去加载icons中的svg
    c.module.rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons')).end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' })
  }
}