const Queue = require('../index.js')

function fn(n)
{
	const queue = new Queue()
	queue.enqueue(1)
	queue.enqueue('\n')
	for(let i = 1; i <= n; i++){
		let pre = 0;
		let line = ''
		while(true){
			const val = queue.dequeue()
			if (val !== '\n') {
				line += val + ' '
				queue.enqueue(val + pre)
				pre = val
			} else {
				queue.enqueue(1)
				queue.enqueue('\n')
				console.log(line)
				break
			}
		}
	}
}

fn(20)
