<template>
  <div>
    <Node :data="folder"></Node>
  </div>
</template>

<script>
  import Node from './Node'
  import mixins from './mixins'
  export default {
    components: {
      Node,
    },
    mixins: [mixins],
    data() {
      return {
        folder: {
          title: 'root',
                    children: [
            {
              title: '1',
              children: [
                { title: '2' }
              ]
            }
          ]
        }
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>