// 计算逆波兰表达式
const Stack = require('./../index.js')
const exp = ['4', '13', '5', '/', '+']


function calc_exp(arr) {
	const stack = new Stack()
	for(let i = 0; i < arr.length; i++){
		if (['+','-','*','/'].includes(arr[i])) {
			if ([0, 1].includes(stack.size()) ) {
				return false
			} else {
				const first = stack.pop()
				const second = stack.pop()
				const res = eval(second + arr[i] + first)
				stack.push(res)
			}
		} else {
			stack.push(arr[i])
		}
	}

	if (stack.size() === 1) {
		return stack.pop()
	} else {
		return false
	}
	
}
console.log('正确结果：6.6')
console.log(calc_exp(exp))

