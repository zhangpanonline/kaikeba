<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    provide() {
      return {
        form: this
      }
    },
    props: {
      model: {
        type: Object,
        required: true
      },
      rules: Object
    },
    methods: {
      async validate(cb) {
        try {
          const tasks = this.$children.map(v => v.validator())
          await Promise.all(tasks)
          cb(true)      
        } catch (err) {
          console.log(err)
          cb(false)
        }
      }
    },
  }
</script>