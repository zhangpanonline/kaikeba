function Queue() {
	const items = []

	this.enqueue = function(item) {
		items.push(item)
	}

	this.dequeue = function() {
		return items.shift()
	}

	this.head = function() {
		return items[0]
	}

	// this.tail = function() {
		// return items[this.items.length - 1]
	// }

	this.size = function() {
		return items.length
	}

	this.isEmpty = function() {
		return items.length === 0
	}

	this.clear = function() {
		items.length = 0
	}
}

module.exports = Queue
