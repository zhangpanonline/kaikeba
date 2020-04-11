<template>
  <div>
    {{msg}}
    <p><input type="text" @keydown.enter="addFeature" ></p>
    <div v-for="feature in features" :key="feature.id">
      <span :class="feature.selected ? 'select' : ''" >{{ feature.name }}</span>
    </div>
    <div>总数：{{total}}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator"
// import { FeatureSelect } from "@/types";
type Feature = {
  name: string;
  id: number;
  version?: string
}
type Select = {
  selected: boolean
}
// 交叉类型
type FeatureSelect = Feature & Select

@Component
export default class HelloWorld extends Vue {
  @Prop({ type: String, default: '' })
  msg!: string

  // 属性直接作为data使用
  features: FeatureSelect[] = []

  @Emit() // 方法名就是事件名
  addFeature(e: KeyboardEvent) {
    // 类型断言
    const inp = (e.target as HTMLInputElement)
    const feature: FeatureSelect = {
      id: this.features.length + 1,
      name: inp.value,
      selected: false
    }
    this.features.push(feature)
    inp.value = ''
    // 通知父组件,返回值就是参数
    return feature
  }

  // 生命周期
  async created () {
    const res = await this.$http.get<FeatureSelect[]>('/api/list')
    this.features = res.data
  }

  // 存取器可以用作计算属性
  get total() {
    return this.features.length
  }

  @Watch('total')
  onMsgChange(val: string, oldVal: string) {
    console.log(val, oldVal)
  }
  
}
</script>

<style scoped>
.select {
  color: red;
}
</style>
