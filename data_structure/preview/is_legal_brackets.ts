/**
 * 判断是否为合法的()
 */
import Stack from './lib/stack'

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

console.log(is_legal_brackets('da(daas)daas(das(das)da)'))
// console.log(is_legal_brackets('da(daas)daasdas(das)da)'))
// console.log(is_legal_brackets('()'))
// console.log(is_legal_brackets(')('))