import Queue from './queue'

/**
 * 使用数组实现栈
 */
// export default class Stack {
//   private items: any[] = [] // 存储数据

//   // 从栈顶添加元素，也叫压栈
//   push(item: any) {
//     this.items.push(item)
//   }

//   // 弹出栈顶元素
//   pop() {
//     return this.items.pop()
//   }

//   // 返回栈顶元素
//   top() {
//     return this.items[this.items.length - 1]
//   }

//   // 判断栈是否为空
//   isEmpty() {
//     return this.items.length === 0
//   }

//   // 返回栈的大小
//   size() {
//     return this.items.length
//   }

//   // 清空栈
//   clear() {
//     this.items = []
//   }

//   // 逆序
//   reverse() {
//     this.items.reverse()
//   }

//   _look() {
//     return this.items.toString()
//   }
// }

/**
 * 使用队列实现栈
 */
export default class Stack {

  private queue_1 = new Queue()
  private queue_2 = new Queue()
  private data_queue: Queue // 存储数据的队列
  private empty_queue: Queue // 始终为空的队列

  // 指定数据队列和空队列
  init () {
    // if (this.queue_1.isEmpty() && this.queue_2.isEmpty()) {
    //   this.data_queue = this.queue_1
    //   this.empty_queue = this.queue_2
    // } else if (this.queue_1.isEmpty()) {
    //   this.data_queue = this.queue_2
    //   this.empty_queue =this.queue_1
    // } else {
    //   this.data_queue = this.queue_1
    //   this.empty_queue =this.queue_2
    // }
    this.data_queue = this.queue_1.isEmpty() ? this.queue_2 : this.queue_1
    this.empty_queue = this.queue_1.isEmpty() ? this.queue_1 : this.queue_2
  }

  push (item: any) {
    this.init()
    this.data_queue.enqueue(item)
  }

  pop () {
    this.init()
    while (this.data_queue.size() > 1) this.empty_queue.enqueue(this.data_queue.dequeue())
    return this.data_queue.dequeue()
  }

  top () {
    this.init()
    while (this.data_queue.size() > 1) this.empty_queue.enqueue(this.data_queue.dequeue())
    const last = this.data_queue.dequeue()
    this.empty_queue.enqueue(last)
    return last
  }

  isEmpty () {
    this.init()
    return this.data_queue.isEmpty()
  }

  size () {
    this.init()
    return this.data_queue.size()
  }

  clear () {
    this.init()
    this.data_queue.clear()
  }

  reverse () {
    this.init()
    this.data_queue.reverse()
  }

  _look () {
    this.init()
    this.data_queue._look()
  }

}
