<template>
  <div>
    <h1>用户登录</h1>
    <input v-model="user.username" type="text" />
    <el-button type="primary" @click="onLogin">
      登录
    </el-button>
  </div>
</template>

<script>
export default {
  layout: 'blank',
  name: '',
  components: {},
  mixins: [],
  props: {},
  data () {
    return {
      user: {}
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onLogin () {
      this.$store.dispatch('user/login', this.user).then((ok) => {
        if (ok) {
          const redirect = this.$route.query.redirect || '/'
          this.$router.push(redirect)
        } else {
          alert('登录失败')
        }
      })
    }
  }
}
</script>
