const Queue = require('../index.js')

function fn(n) {
	const queue = new Queue()
	queue.enqueue(1)

	for(let i = 1; i <= n; i++) {
		let pre = 0;
		let line = '';
		for(let j = 0; j < i; j++) {
			const val = queue.dequeue()
			line += val+ ' '
			queue.enqueue(val + pre)
			pre = val
		}
		queue.enqueue(1)
		console.log(line)
	}
}
fn(20)
