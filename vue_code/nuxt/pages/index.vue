<template>
  <div>
    <p v-for="good in goods" :key="good.id"> {{good.text}} - {{good.price}} </p>
  </div>
</template>

<script>
export default {
  async asyncData ({ $axios, params, error }) {
    // const res1 = await $axios.get('/api/goods')
    // asyncData中不能使用this获取组件实例
    // 但是可以通过上下文获取相关数据
    const { ok, goods } = await $axios.$get('/api/goods', { params })
    if (ok === 1) {
      // 这里返回的数据(对象格式)会和data里的数据合并
      return {
        goods
      }
    } else {
      // 错误处理
      error({ statusCode: 400, message: '数据查询失败~' })
    }
  },
  data () {
    return {
      goods: []
    }
  },
  head () {
    return {
      title: '课程列表',
      // vue-meta 利用hid确定要更新meta
      meta: [{ name: 'test', hid: 'test', content: 'test' }],
      link: [{ rel: 'favicon', href: 'favicon.icon' }]
    }
  }
}
</script>
