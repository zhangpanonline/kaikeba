const Queue = require('../index.js')

function fn(list) {
	let index = 0
	while(list.size() !== 1) {
		const item = list.dequeue()
		if (++index % 3 !== 0){
			list.enqueue(item)
		}
	}

	return list.head()
}

const queue = new Queue()
let i = -1
while(i++ <99) {
	queue.enqueue(i)
}
console.log('正确结果：90')
console.log(fn(queue)) // 90
