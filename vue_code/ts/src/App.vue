<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <br/>
    <!-- 使用全局状态 -->
    <button @click="cm.asyncAdd()" >{{$store.state.counter.count}}</button>
    <br/>
    <button>{{cm.doubleCount}}</button>
    <HelloWorld @add-feature="addFeature" msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import CounterModal from './vuex/counter'

@Component({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {
  addFeature(feature: {}) {
    console.log(feature)
  }
  get cm() {
    return CounterModal
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
