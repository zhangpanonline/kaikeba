// 中缀转后缀表达式
const Stack = require('./../index.js')

// 1、如果是数字，直接放入到suffix中；
// 2、遇到左括号入栈；
// 3、遇到右括号，把栈顶元素弹出，直到遇到左括号，最后弹出左括号；
// 4、遇到运算符，把栈顶的运算符弹出，直到栈顶的运算符优先级小于当前预算符，把弹出的运算符加入到suffix中，当前的运算符入栈；
// 5、for循环结束后，栈里可能还有元素，都弹出放入到suffix中。
 
function infix2suffix(infix) {

	const stack = new Stack()
	const suffix = []
	const priority = {
		'+': 1,
		'-': 1,
		'*': 2,
		'/': 2
	}

	infix.forEach(str => {
		if (!isNaN(str)) {
			suffix.push(str)
		} else if (str === '(') {
			stack.push(str)
		} else if (str === ')') {
			while(stack.top() !== '(') {
				suffix.push(stack.pop())
			}
			stack.pop()
		} else {
			while(!stack.isEmpty() && ['+', '-', '*', '/'].includes(stack.top()) && priority[stack.top()] >= priority[str]) {
				suffix.push(stack.pop())
			}
			stack.push(str)
		}
	})

	while(!stack.isEmpty()) {
		suffix.push(stack.pop())
	}
	return suffix
}

const test1 = ['1', '+', '2', '+', '3', '+', '4', '+', '5']
const test2 = ['(', '1', '+', '(', '4', '+', '5', '+', '3', ')', '-', '3', ')', '+', '(', '9', '+', '8', ')']
const test3 = ['(', '1', '+', '(', '4', '+', '5', '+', '3', ')', '/', '4', '-', '3', ')', '+', '(', '6', '+', '8', ')', '*', '3']

console.log(`正确结果
[ '1', '2', '+','3', '+', '4', '+', '5', '+' ]
[ '1', '4', '5', '+','3', '+', '+', '3','-', '9', '8', '+','+' ]
[ '1', '4', '5', '+', '3','+', '4', '/', '+', '3','-', '6', '8', '+', '3','*', '+']`)
console.log(infix2suffix(test1))
console.log(infix2suffix(test2))
console.log(infix2suffix(test3))
