// 请编写一个函数判断字符串中的括号是否合法，所谓合法，就是括号成对出现
// ((aa)(wew)) 合法
// ((aa)(bb) 不合法
const Stack = require('./../index.js')
const stack = new Stack()
const test1 = '((aa)(w))'
const test2 = '((aa)(b)'

function is_legal_brackets(string) {
	const stack = new Stack()
	for(let i = 0; i < string.length; i++) {
		const str = string[i]
		if (str === '(') {
			stack.push(str)
		} else if (str === ')'){
			if (stack.isEmpty()) {
				return false
			} else {
				stack.pop()
			}
		}
	}

	return stack.isEmpty()
}
console.log('正确结果：true')
console.log(is_legal_brackets(test1))
console.log('正确结果：false')
console.log(is_legal_brackets(test2))
