import Vue from 'vue'
import SvgIcon from '@comps/SvgIcon'

// 指定一个上下文 require.context('目录名', 是否递归，加载规则)是webpack提供的方法
const req = require.context('./svg', false, /\.svg$/)
// 循环svg目录下所有文件，并加载
req.keys().map(req) // TODO 这里什么意思？

Vue.component('svg-icon', SvgIcon)