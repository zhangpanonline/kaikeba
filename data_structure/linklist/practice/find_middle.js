var Node = function(data){
  this.data	=	data;
  this.next	= null;
}
var	node1	= new Node(1);
var	node2	= new Node(2);
var	node3	= new Node(3);
var	node4	= new Node(4);
var	node5	= new Node(5);
node1.next	=	node2;
node2.next	=	node3;
node3.next	=	node4;
node4.next	=	node5;

// 查找并返回链表的中间节点
function find_middle(head) {
  let fast = head
  let slow = head

  while(fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }
  return slow.data
}

console.log(find_middle(node1))