/* @flow */

import { toArray } from '../util/index'

/**
 * @file 定义 Vue.use() 方法
 */

export function initUse (Vue: GlobalAPI) {
  /**
   * Use 方法接受函数或者对象
   */
  Vue.use = function (plugin: Function | Object) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    // TODO 5 arguments:是包括插件定义和它的所有参数，这里不要插件定义，换成Vue构造函数
    const args = toArray(arguments, 1)
    // TODO 6 这里放入 this 的意义？
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}
