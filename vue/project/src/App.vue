<template>
  <div id="app">
    <Form
      ref="form"
      :model="model"
      :rules="rules">
      <FormItem
        label="姓名："
        prop="username" >
        <Input
          v-model="model.username"
          placeholder="请输入"
         />
      </FormItem>
      <FormItem
        label="密码："
        prop="password" >
        <Input
          type="password"
          v-model="model.password"
          placeholder="请输入"
         />
      <FormItem>
        <button @click="onLogin" >登陆</button>
      </FormItem>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import Form from '@/components/Form'
import FormItem from '@/components/FormItem'
import Input from '@/components/Input'
import Notice from '@/components/Notice'
export default {
  components: {
    Input,
    FormItem,
    Form
  },
  data() {
    return {
      model: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名' }],
        // password: [{ required: true, message: '请输入密码' }]
      }
    }
  },
  methods: {
    onLogin() {
      this.$refs.form.validate(res => {
        if (res) {
          alert('success')
        } else {
          this.$create(Notice, {
            title: '校验失败',
            message: '校验错误，请重试！'
          }).show()
        }
      })
    }
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
