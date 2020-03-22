<template>
  <div>
    <span v-if="label">{{label}}</span>
    <slot></slot>
    <p :style="{ color: 'red' }" v-if="error">{{error}}</p>
  </div>
</template>

<script>
  import Schema from 'async-validator'
  export default {
    name: 'FormItem',
    componentName: 'FormItem',
    inject: ['form'],
    props: {
      label: {
        type: String,
        default: ''
      },
      prop: String
    },
    data() {
      return {
        error: ''
      }
    },
    methods: {
      validator() {
        const rules = this.form.rules[this.prop]
        const value = this.form.model[this.prop]
        const key = this.prop
        return new Promise((resolve, reject) => {
          if (!rules) {
            resolve()
          } else {
            const validator = new Schema({ [key]: rules })
            validator.validate({ [key]: value }, errors => {
              if (errors) {
                this.error = errors[0].message
                reject()
              } else {
                this.error = ''
                resolve()
              }
            })
          }
        })
      }
    },
    mounted () {
      this.$on('validate', () => {
        this.validator()
      });
    },
  }
</script>

<style lang="scss" scoped>

</style>