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

// 返回链表倒数第k个节点的数值
function reverse_find(head, k) {
  let fast = head
  let slow = head
  let step = k

  while(step-- > 0 && fast) fast = fast.next

  if (step != -1) {
    return null
  } else {
    while(fast && slow) {
      fast = fast.next
      slow = slow.next
    }
  }
  return slow ? slow.data : null
}

for(let i = 0; i < 7; i++) console.log(reverse_find(node1, i))