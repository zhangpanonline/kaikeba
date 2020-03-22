<template>
  <span>
    <input v-bind="$attrs" @input="onInput" />
  </span>
</template>

<script>
  import emitter from '@/mixins/emitter'
  export default {
    name: 'Input',
    inheritAttrs: false,
    mixins: [emitter],
    methods: {
      onInput(e) {
        this.$emit('input', e.target.value)
        // 作业
        // this.$parent.$emit('validate')
        this.dispatch('FormItem', 'validate')
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>