<template>
  <div id="app">
    <!-- <Form></Form> -->
    <!-- <tree-node></tree-node> -->
    <router-link to="/">home</router-link>|
    <router-link to="/about">about</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import vm from './main'
const _import = dirName => () => import(`@/components/${dirName}/Index`)
export default {
  components: {
    Form: _import('form'),
    TreeNode: _import('recursion')
  },
  data() {
    return {
    }
  },
  beforeCreate () {
    console.log(this.$options.parent === vm)
    // console.log(this)
  },
  created () {
    // console.log(this)
  },
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
