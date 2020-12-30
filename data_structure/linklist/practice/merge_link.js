// 已知有两个有序链表（链表元素从小到大），请实现函数merge_link，将两个链表合并成一个有序链表，并返回新链表，原有的两个链表不要修改
const Node = function(data) {
  this.data = data
  this.next = null
}

const node1 = new Node(1)
const node2 = new Node(4)
const node3 = new Node(9)

const node4 = new Node(2)
const node5 = new Node(5)
const node6 = new Node(6)
const node7 = new Node(10)

node1.next = node2
node2.next = node3

node4.next = node5
node5.next = node6
node6.next = node7

function merge_link(head1, head2) {
  if (!head1) return head2
  if (!head2) return head1

  let head = null
  let tail = null
  let cur_node1 = head1
  let cur_node2 = head2

  while(cur_node1 && cur_node2) {
    let min_node = null
    if (cur_node1.data < cur_node2.data) {
      min_node = new Node(cur_node1.data)
      cur_node1 = cur_node1.next
    } else {
      min_node = new Node(cur_node2.data)
      cur_node2 = cur_node2.next
    }

    if (!head) {
      head = min_node
      tail = head
    } else {
      tail.next = min_node
      tail = tail.next
    }
  }

  let rest_link = null

  cur_node1 && (rest_link = cur_node1)
  cur_node2 && (rest_link = cur_node2)

  while(rest_link) {
    const new_node = new Node(rest_link.data)
    tail.next = new_node
    tail = tail.next
    rest_link = rest_link.next
  }

  return head
}

(function print(node) {
  let curr_node = node
  while(curr_node) {
    console.log(curr_node.data)
    curr_node = curr_node.next
  }
})(merge_link(node1, node4))