export default class Queue {
  private items: any[] = [] // 存储数据

  // 添加元素
  enqueue(item: any) {
    this.items.push(item)
    return this
  }

  // 移除元素
  dequeue() {
    return this.items.shift()
  }

  // 查看头部元素
  head() {
    return this.items[0]
  }

  // 返回队列大小
  size() {
    return this.items.length
  }

  // clear
  clear() {
    this.items = []
  }

  // 是否为空
  isEmpty() {
    return this.items.length === 0
  }

  reverse() {
    this.items.reverse()
  }

  _look() {
    return this.items.toString()
  }
}