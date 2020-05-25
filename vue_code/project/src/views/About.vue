<template>
  <div class="about">
    <h1 @click="() => $store.state.count = 2">This is an about page</h1>
    <router-view></router-view>
  </div>
</template>
