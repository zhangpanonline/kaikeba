function Linklist(){
	const Node = function(data){
		this.data = data
		this.next = null
	}

	let length = 0
	let head = null
	let tail = null
	// append 添加一个新的元素
	this.append = function(data) {
		const newNode = new Node(data)
		if (!head) {
			head = newNode
			tail = newNode
		} else {
			tail.next = newNode
			tail = newNode
		}
		++length
		return true
	}
	// insert 在指定位置插入一个元素
	this.insert = function (index, data) {
		if (index < 0 || index > length ) {
			return false
		} else if (index === length) {
			return this.append(data)
		} else {
			const newNode = new Node(data)
			let curNode = head
			let counter = 0
			if (index === 0) {
				newNode.next = head
				head = newNode
			} else {
				while(++counter < index) {
					curNode = curNode.next
				}
				const nextNode = curNode.next
				curNode.next = newNode
				newNode.next = nextNode
			}
			length++
			return true
		}
	}
	// remove 删除指定位置节点
	this.remove = function(index) {
		if (index < 0 || index >= length) {
			return null
		} else {
			let pre_node = null
			let cur_node = head
			let counter = 0
			if (index == 0) {
				head = cur_node.next
				cur_node.next = null
			} else {
				while (counter++ < index) {
					pre_node = cur_node
					cur_node = cur_node.next
				}
				if (cur_node.next) {
					pre_node.next = cur_node.next
				} else {
					tail = pre_node
					tail.next = null
				}
			}
			length--
			cur_node.next = null
			return cur_node.data
		}
	}
	// remove_head 删除首节点
	this.remove_head = function() {
		return this.remove(0)
	},
	// remove_tail 删除尾节点
	this.remove_tail = function() {
		return this.remove(length - 1)
	},
	// indexOf 返回指定元素的索引
	this.indexOf = function(data) {
		let index = 0
		let cur_node = head
		while (cur_node) {
			if (cur_node.data === data) break
			++index
			cur_node = cur_node.next
		}

		return cur_node ? index : null
	},
	// get 返回指定索引位置的元素
	this.get = function (index) {
		if (index < 0 || index >= length) {
			return null
		} else {
			let cur_node = head
			let cur_index = 0
			while (cur_index++ < index) cur_node = cur_node.next
			return cur_node.data
		}
	},
	// head 返回首节点
	this.head = function() {
		return this.get(0)
	},
	// tail 返回尾节点
	this.tail = function() {
		return this.get(length - 1)
	},
	// length 返回链表长度
	this.length = function() {
		return length
	},
	// isEmpty 判断链表是否为空
	this.isEmpty = function() {
		return length === 0
	},
	// clear 清空链表
	this.clear = function() {
		head = null
		tail = null
		length = 0
		return true
	},
	// print 打印整个链表
	this.print = function() {
		console.log('head', head.data)
		console.log('length', length)
		console.log('tail', tail.data)

		let cur_node = head
		while(cur_node) {
			console.log(cur_node.data)
			cur_node = cur_node.next
		}
	}
}
module.exports = Linklist

