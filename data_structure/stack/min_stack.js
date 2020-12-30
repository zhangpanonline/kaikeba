const Stack = require('./stack.js')

function MinStack() {
	const dataStack = new Stack()
	const minStack = new Stack()

	this.push = function(item) {
		dataStack.push(item)
		if (minStack.isEmpty()) {
			minStack.push(item)
		} else {
			const last = minStack.top()
			minStack.push(last > item ? item : last)
		}
	}	

	this.pop = function() {
		minStack.pop()
		return dataStack.pop()
	}

	this.top = function() {
		return dataStack.top()
	}

	this.isEmpty = function() {
		return dataStack.isEmpty()
	}

	this.size = function() {
		return dataStack.size()
	}

	this.clear = function() {
		dataStack.clear()
		minStack.clear()
	}

	this.min = function() {
		return minStack.top()
	}
	
}
module.exports = MinStack
