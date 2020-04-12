import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _352c184e = () => interopDefault(import('..\\pages\\admin.vue' /* webpackChunkName: "pages_admin" */))
const _0c2ed562 = () => interopDefault(import('..\\pages\\detail.vue' /* webpackChunkName: "pages_detail" */))
const _1818c748 = () => interopDefault(import('..\\pages\\detail\\_id.vue' /* webpackChunkName: "pages_detail__id" */))
const _65373130 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _803a68e2 = () => interopDefault(import('..\\pages\\other.vue' /* webpackChunkName: "pages_other" */))
const _03bcc451 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))
const _2fb52c77 = () => interopDefault(import('..\\pages\\other' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _352c184e,
    name: "admin"
  }, {
    path: "/detail",
    component: _0c2ed562,
    name: "detail",
    children: [{
      path: ":id?",
      component: _1818c748,
      name: "detail-id"
    }]
  }, {
    path: "/login",
    component: _65373130,
    name: "login"
  }, {
    path: "/other",
    component: _803a68e2,
    name: "other"
  }, {
    path: "/",
    component: _03bcc451,
    name: "index"
  }, {
    path: "/foo",
    component: _2fb52c77,
    name: "foo"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
