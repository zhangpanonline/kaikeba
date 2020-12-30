const Linklist = require('../linklist/index')

function Queue() {

  const linklist = new Linklist()

  this.enqueue = function(item) {
    linklist.append(item)
  }

  this.dequeue = function() {
    return linklist.remove_head()
  }

  this.head = function() {
    return linklist.head()
  }

  this.size = function() {
    return linklist.length()
  }

  this.isEmpty = function() {
    return linklist.isEmpty()
  }

  this.clear = function() {
    linklist.clear()
  }

  this._print = function() {
    linklist.print()
  }
}

module.exports = Queue