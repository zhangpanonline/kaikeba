class Stack {

  constructor() {
    this.items = [] // 存储数据
  }

  // 从栈顶添加元素，也叫压栈
  push(item) {
    this.items.push(item)
  }

  // 弹出栈顶元素
  pop() {
    return this.items.pop()
  }

  // 返回栈顶元素
  top() {
    return this.items[this.items.length - 1]
  }

  // 判断栈是否为空
  isEmpty() {
    return this.items.length === 0
  }

  // 返回栈的大小
  size() {
    return this.items.length
  }

  // 清空栈
  clear() {
    this.items = []
  }
}

function is_legal_brackets(string) {
  const stack = new Stack()
  for(let i = 0; i < string.length; i++) {
    let v = string[i]
    // 遇到左括号入栈
    if (v === '(') {
      stack.push(v)
    } else if (v === ')') {
      // 遇到右括号判断栈是否为空
      if (stack.isEmpty()) {
        return false
      } else {
        // 弹出左括号
        stack.pop()
      }
    }
  }
  // 如果栈为空，说明字符串括号合法
  return stack.isEmpty()
}

console.log(is_legal_brackets('da(daas)daas(das(das)da)'))
console.log(is_legal_brackets('da(daas)daasdas(das)da)'))
console.log(is_legal_brackets('()'))