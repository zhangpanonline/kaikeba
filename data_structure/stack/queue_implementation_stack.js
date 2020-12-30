const Queue = require('./../queue/index.js')

function Stack() {
	let data_queue, empty_queue;
	let queue1 = new Queue()
	let queue2 = new Queue()

	function _init() {
		if (queue1.isEmpty() && queue2.isEmpty()) {
			data_queue = queue1
			empty_queue = queue2
		} else if (queue1.isEmpty()) {
			data_queue = queue2
			empty_queue = queue1
		} else {
			data_queue = queue1
			empty_queue = queue2
		}
	}

	this.push = function(item) {
		_init()
		data_queue.enqueue(item)
	}

	this.pop = function() {
		_init()
		while(data_queue.size() !== 1) {
			empty_queue.enqueue(data_queue.dequeue())
		}
		return data_queue.dequeue()
	}

	this.top = function () {
		_init()
		while(data_queue.size() > 1) {
			empty_queue.enqueue(data_queue.dequeue())
		}
		const val = data_queue.dequeue()
		empty_queue.enqueue(val)
		return val
	}

	this.size = function () {
		_init()
		return data_queue.size()
	}

	this.isEmpty = function () {
		_init()
		return data_queue.isEmpty()
	}

	this.clear = function () {
		_init()
		data_queue.clear()
	}

}

module.exports = Stack
