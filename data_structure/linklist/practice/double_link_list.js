// 实现双向链表
function DoubleLinkList() {
  // 定义节点
  const Node = function(data) {
    this.data = data
    this.next = null
    this.pre = null
  }

  var length = 0
  var head = null
  var tail = null

  this.append = function(data) {
    const newNode = new Node(data)
    length++
    if (!head) {
      head = newNode
      tail = newNode
    } else {
      tail.next = newNode
      newNode.pre = tail
      tail = newNode
    }
    return true
  }

  this.insert = function(index, data) {
    const newNode = new Node(data)
    if (index < 0 || index > length) {
      return false
    } else if (index == 0) {
      newNode.next = head
      head = newNode
      ++length
      return true
    } else if (index == length) {
      this.append(data)
    } else {
      let num = 0
      let cur_node = head
      while(num++ < index) cur_node = cur_node.next
      newNode.pre = cur_node.pre
      newNode.next = cur_node
      cur_node.pre.next = newNode
      cur_node.pre = newNode
      ++length
      return true
    }
  }

  this.remove = function(index) {
    let removeData = null
    if (index < 0 || index > length) {
      return false
    } else if (index == 0) {
      removeData = head
      head = head.next
      head.pre = null
      removeData.next = null
      length--
      return removeData.data
    } else {
      let num = 0
      removeData = head
      while(num++ < index) removeData = removeData.next
      if (num == length - 1) {
        tail = removeData.pre
        tail.next = null
      } else {
        removeData.pre.next = removeData.next
        removeData.pre = null
        removeData.next = null
      }
      --length
      return removeData.data
    }
  }

  this.print = function() {
    let cur = head
    while(cur) {
      console.log(cur.data)
      cur = cur.next
    }
    console.log(head.data)
    console.log(tail.data)
    console.log(length)
  }
}

// const link = new DoubleLinkList()
// link.append(1)
// link.append(2)
// link.append(3)
// link.append(4)
// link.append(5)
// link.print()