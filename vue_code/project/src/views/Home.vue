<template>
  <div class="home">
    <p @click="$store.commit('add')">{{$store.state.count}}</p>
    <p @click="$store.dispatch('asyncAdd')">async:{{$store.state.count}}</p>
  </div>
</template>

<script>

export default {
  name: 'Home',
  mounted () {
      setTimeout(() => {
        // this.$store.state = {}
        this.$store.state.count++
      }, 1000)
  },
}
</script>
