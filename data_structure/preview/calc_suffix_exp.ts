/**
 *  计算后缀表达式
 */

import Stack from './lib/stack'
import infix_2_suffix_exp from './infix_to_suffix_exp'

function calc_exp(exp: Stack) {
  var stack = new Stack()

  while (!exp.isEmpty()) {
    const v = exp.pop()
    if (['+', '-', '*', '/'].indexOf(v) > -1) {
      let val_1 = stack.pop()
      let val_2 = stack.pop()
      let exp_str = val_2 + v + val_1
      // 计算
      let res = eval(exp_str)
      // 计算结果压入栈中
      stack.push(res)
    } else {
      stack.push(v)
    }
  }

  return stack.size() === 1 ? stack.pop() : new Error('最终stack中应该只有一个值')
}

// 1+2*3+4*5*6+7 = 134
// 1+2*3*4+5 = 30
// (1 + 2) * (3 + 4) = 21
// 1 + 2 * 3 + 4 = 11
console.log(calc_exp(infix_2_suffix_exp('1+2*3+4*5*6+7')))
console.log(calc_exp(infix_2_suffix_exp('1+2*3*4+5')))
console.log(calc_exp(infix_2_suffix_exp('(1 + 2) * (3 + 4)')))
console.log(calc_exp(infix_2_suffix_exp('1 + 2 * 3 + 4')))
