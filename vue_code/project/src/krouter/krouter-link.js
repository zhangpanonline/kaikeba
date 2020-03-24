export default {
  // 这里如果传参怎么办？
  props: {
    to: {
      type: String,
      required: true
    }
  },
  render(h) {
    // console.log(h)
    return h('a',{attrs: {href: '#' + this.to}},[this.$slots.default])
  }
}