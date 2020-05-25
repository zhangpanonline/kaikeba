/**
 * @file 扩展$mount
 */

/* @flow */

import config from 'core/config'
import { warn, cached } from 'core/util/index'
import { mark, measure } from 'core/util/perf'

import Vue from './runtime/index'
import { query } from './util/index'
import { compileToFunctions } from './compiler/index'
import { shouldDecodeNewlines, shouldDecodeNewlinesForHref } from './util/compat'

const idToTemplate = cached(id => {
  const el = query(id)
  return el && el.innerHTML
})

const mount = Vue.prototype.$mount
// 扩展$mount
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean // hydrating应该和服务端渲染激活有关
): Component {
  // 宿主元素
  el = el && query(el)

  /* istanbul ignore if 覆盖率统计，显示一些警告信息，生产版本不需要 */
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
    )
    return this // TODO 2.这里为什么要 return this
  }

  const options = this.$options
  // resolve template/el and convert to render function

  /**
   * ISSUE： render template 用于渲染页面，el用于挂载，为什么要用el和他们两比较优先级呢？
   * RESOLVE：render 只输出 vdom，又可以通过 el 和 template 获得 render，所以如果只接有 render，就没必要有 el 和 template 的必要
   * render函数、template、el同时存在下的优先级：render > template > el
   */
  // ISSUE：既然有el为什么还要$mount方法，反之亦然？
  // RESOLVE: 如果指定el多半是用它做模板的，有它就不用$mount。平时用webpack开发时，宿主页的#app多半是空的，此时就需要手动提供模板和挂载。
  // render函数不存在情况下
  if (!options.render) {
    // 首先查找template
    let template = options.template
    if (template) {
      // 判断模板是不是string
      if (typeof template === 'string') {
        // 判断template 是不是 一个id选择器
        if (template.charAt(0) === '#') {
          template = idToTemplate(template)
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              `Template element not found or is empty: ${options.template}`,
              this
            )
          }
        }
        /**
         * 判断template 是不是一个 Node 节点,nodeType 属性可用来区分不同类型的节点
         * 比如 元素, 文本 和 注释
         * (https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType)
         */
      } else if (template.nodeType) {
        // 获取节点的html字符串
        template = template.innerHTML
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this)
        }
        return this
      }
      // 如果 template 不存在，则以el 的内容为模板
    } else if (el) {
      template = getOuterHTML(el)
    }
    // 获取到template后，最终目标将其转换为render函数
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile')
      }

      const { render, staticRenderFns } = compileToFunctions(template, {
        outputSourceRange: process.env.NODE_ENV !== 'production',
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      // 覆盖 $options 里的 render 函数
      options.render = render
      options.staticRenderFns = staticRenderFns

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end')
        measure(`vue ${this._name} compile`, 'compile', 'compile end')
      }
    }
  }
  return mount.call(this, el, hydrating)
}

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el: Element): string {
  if (el.outerHTML) {
    // TODO 3为什么这里是 outerHTML ？
    return el.outerHTML
  } else {
    const container = document.createElement('div')
    container.appendChild(el.cloneNode(true))
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions

export default Vue
