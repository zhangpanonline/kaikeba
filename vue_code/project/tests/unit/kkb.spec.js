// 需要 @vue/test-utils 来测试组件
import { mount, shallowMount } from '@vue/test-utils'
import Kaikeba from '../components/Kaikeba'

describe('kkb.vue', () => {
  // 检查组件选项
  it('要求设置created', () => {
    // created类型为函数
    expect(typeof Kaikeba.created).toBe('function')
  })

  it('message初始值是vue-test', () => {
    // 检查data函数存在性
    expect(typeof Kaikeba.data).toBe('function')

    // 检查返回值
    expect(Kaikeba.data().message).toBe('vue-text')
  })

  it('挂载之后data是按钮未点击', () => {
    // 挂载，确保组件渲染出DOM
    const wrapper = mount(Kaikeba)

    // 获取组件实例
    const vm = wrapper.vm
    expect(vm.message).toBe('按钮未点击')
  })

  it('按钮点击后message是按钮点击', () => {
    const wrapper = mount(Kaikeba)

    // 通过 wrapper 查询方法 find()
    wrapper.find('button').trigger('click')

    // 获取span，查看渲染结果
    expect(wrapper.vm.message).toBe('按钮点击')
    // expect(wrapper.find('span').html()).toBe(`<span>按钮点击</span>`)
    expect(wrapper.find('span').text()).toBe(`按钮点击`)
  })
})