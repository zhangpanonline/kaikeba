<template>
  <div>
    <span>{{message}}</span>
    <button @click="changeMsg">button</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: 'vue-text'
    }
  },
  created () {
    this.message = '按钮未点击'
  },
  methods: {
    changeMsg() {
      this.message = '按钮点击'
    }
  },
}
</script>