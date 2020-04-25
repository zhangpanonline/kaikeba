/**
 * // 中缀表达式转后缀表达式
 * // https://baike.baidu.com/item/%E9%80%86%E6%B3%A2%E5%85%B0%E5%BC%8F/128437?fromtitle=%E5%90%8E%E7%BC%80%E8%A1%A8%E8%BE%BE%E5%BC%8F&fromid=6160580
 */

import Stack from './lib/stack'

const priority_operator = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2
}

export default function infix_2_suffix_exp (infix_exp: string[]|string): Stack {
  let arr: string[]
  if (Array.isArray(infix_exp)) {
    arr = infix_exp
  } else if (typeof infix_exp === 'string') {
    // 如果是字符串则转为数组
    arr = infix_exp.split('').filter((v) => !!v.trim())
  }

  const S1 = new Stack() // 存储运算符
  const S2 = new Stack() // 输入逆波兰式
  // 遍历中缀表达式
  arr.forEach(v => {
    // 如果是数字，直接放入 S2
    if (!isNaN(Number(v))) {
      S2.push(v)
    // 如果是运算符
    } else if (priority_operator.hasOwnProperty(v)) {
      // S1为空，或当前运算符优先级大于栈顶运算符，则放入栈顶
      if (S1.isEmpty() || priority_operator[v] > priority_operator[S1.top()]) {
        S1.push(v)
      } else {
        // 否则将S1栈顶元素弹出压入S2，直至S1栈顶运算符低于改运算符优先级，最后将该运算符压入S1
        while (priority_operator[v] < priority_operator[S1.top()] && !S1.isEmpty()) {
          const pop = S1.pop()
          // S2.push(S1.pop())
          S2.push(pop)
        }
        S1.push(v)
      }
    } else if (v === '(') {
      S1.push(v)
    } else if (v === ')') {
      // 遇到 ) 则将 S1 中所有运算符依次弹出并压入 S2 直到遇到 ( 并抛弃 (
      while (S1.top() !== '(') {
        S2.push(S1.pop())
      }
      S1.pop()
    }
  })

  // 如果arr完成遍历，S1 中还有运算符，则依次弹出并压入S2中
  while (!S1.isEmpty()) S2.push(S1.pop())

  // 最后将S2逆序
  S2.reverse()
  return S2
}
