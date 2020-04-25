class Stack {
  private items: any[] = [] // 存储数据

  // 从栈顶添加元素，也叫压栈
  push(item: any) {
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

function is_legal_brackets(string: string) {
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

// 计算后缀表达式
function calc_exp(exp: string[]) {
  var stack = new Stack()

  for(let i = 0; i < exp.length; i++) {
    const v = exp[i]
    if (['+', '-', '*', '/'].includes(v)) {
      let val_1 = stack.pop()
      let val_2 = stack.pop()
      let exp_str = val_2 + v + val_1
      // 计算并取整
      let res = eval(exp_str)
      // 计算结果压入栈中
      stack.push(res)
    } else {
      stack.push(v)
    }
  }
  if (stack.size() === 1) {
    return stack.pop()
  } else {
    return new Error()
  }
}

console.log(calc_exp(['4', '13', '5', '/', '+']))

// console.log(is_legal_brackets('da(daas)daas(das(das)da)'))
// console.log(is_legal_brackets('da(daas)daasdas(das)da)'))
// console.log(is_legal_brackets('()'))
// console.log(is_legal_brackets(')('))