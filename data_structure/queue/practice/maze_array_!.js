const Queue = require('../index.js')

function fn(mase_array, start, end) {
	const arr = mase_array.map(list => {
		return list.map(v => v === 1 ? 'x' : v)
	})
	const endVal = 'END'
	arr[end[0]][end[1]] = endVal
	let counter = -1

	const queue = new Queue()
	queue.enqueue(start)
	while(true) {
		counter++
		const val = queue.dequeue()
		const up = [val[0] - 1, val[1]]
		const left = [val[0], val[1] - 1]
		const down = [val[0] + 1, val[1]]
		const right = [val[0], val[1] + 1]
		const newUp = arr[up[0]] && arr[up[0]][up[1]]
		const newLeft = arr[left[0]] && arr[left[0]][left[1]]
		const newDown = arr[down[0]] && arr[down[0]][down[1]]
		const newRight = arr[right[0]] && arr[right[0]][right[1]]
		if (newUp === counter && newUp !== 'x') {
				queue.enqueue(up)
				arr[up[0]][up[1]] = arr[val[0]][val[1]] + 1
		} else if (newUp === endVal) {
			break
		}
		if (newLeft === counter && newLeft !=='x') {
				queue.enqueue(left)
				arr[left[0]][left[1]] = arr[val[0]][val[1]] + 1
		} else if (newLeft === endVal) {
			break
		}
		if (newDown === counter && newDown !== 'x') {
				queue.enqueue(down)
				arr[down[0]][down[1]] = arr[val[0]][val[1]] + 1
		} else if (newDown === endVal) {
			break
		}
		if (newRight === counter && newRight !== 'x') {
				queue.enqueue(right)
				arr[right[0]][right[1]] = arr[val[0]][val[1]] + 1
		} else if (newRight === endVal) {
			break
		}
	}
	return arr
}

const mase_array = [
	[0, 0, 1, 0, 0, 0, 0],
	[0, 0, 1, 1, 0, 0, 0],
	[0, 0, 0, 0, 1, 0, 0],
	[0, 0, 0, 1, 1, 0, 0],
	[1, 0, 0, 0, 1, 0, 0],
	[1, 1, 1, 0, 0, 0, 0],
	[1, 1, 1, 0, 0, 0, 0]
]
console.log(fn(mase_array, [2, 1], [3, 5]))
