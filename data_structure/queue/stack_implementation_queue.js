const Stack = require('../stack/index.js')

function Queue() {
	const data_stack = new Stack()
	const empty_stack = new Stack()
	this.enqueue = function(item) {
		data_stack.push(item)
	}

	this.dequeue = function() {
		while(data_stack.size() > 1) {
			empty_stack.push(data_stack.pop())	
		}
		const val = data_stack.pop()
		while(!empty_stack.isEmpty()) {
			data_stack.push(empty_stack.pop())
		}
		return val
	}

	this.size = function() {
		return data_stack.size()
	}

	this.isEmpty = function() {
		return data_stack.isEmpty()
	}

	this.head = function() {

		while(data_stack.size() > 1) {
			empty_stack.push(data_stack.pop())	
		}
		const val = data_stack.top()
		while(!empty_stack.isEmpty()) {
			data_stack.push(empty_stack.pop())
		}
		return val
	}

	this.clear = function() {
		data_stack.clear()
	}
}


module.exports = Queue
