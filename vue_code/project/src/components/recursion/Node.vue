<template>
  <div>
    {{data.title}}
    <Node :level="level + 1" v-for="v in data.children" :data="v" :key="v.title"></Node>
  </div>
</template>

<script>
export default {
name: "Node",
  props: {
    level: {
      type: Number,
      default: 0
    },
    data: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
