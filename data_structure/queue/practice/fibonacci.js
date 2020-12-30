const Queue = require('../queue.js')

function fibonacii(n) {
	let index = 0
	const queue = new Queue()
	queue.enqueue(1)
	queue.enqueue(1)

	while(index++ < n-2) {
		const delNum = queue.dequeue()
		const headNum = queue.head()
		const nextNum = delNum + headNum
		queue.enqueue(nextNum)
	}

	queue.dequeue()
	return queue.head()
}
console.log('正确结果：2')
console.log(fibonacii(3))
console.log('正确结果：21')
console.log(fibonacii(8))
