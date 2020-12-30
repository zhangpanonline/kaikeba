const Linklist = require('../linklist/index')

function Stack() {
  const linklist = new Linklist()

  this.push = function(data) {
    linklist.append(data)
  }

  this.pop = function() {
    return linklist.remove_tail()
  }

  this.top = function() {
    return linklist.tail()
  }

  this.isEmpty = function() {
    return linklist.isEmpty()
  }

  this.size = function() {
    return linklist.length()
  }

  this.clear = function() {
    linklist.clear()
  }
}

module.exports = Stack