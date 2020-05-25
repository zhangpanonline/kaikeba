<template>
  <div>
    {{msg}}
    <button @click="$store.commit('add')" >{{$store.state.count}}</button>
  </div>
</template>

<script>
export default {
  // asyncData ({ store, route }) {
  asyncData ({ store }) {
    // 预定预取逻辑编写在预取钩子asyncData中
    // 触发 action 后，返回 Promise 以便确定请求结果
    return store.dispatch('getCount')
  },
  name: '',
  mixins: [],
  components: {},
  props: {},
  data () {
    return {
      msg: 'index page'
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
