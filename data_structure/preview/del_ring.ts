/**
 *  0-99 的数组，每三个元素就删除一个，求最后一个元素是什么
 */

import Queue from './lib/queue'

function del_ring(arr_list: any[]) {
  const queue = new Queue()
  arr_list.forEach(v => queue.enqueue(v))

  let n = 1
  // while (queue.size() > 1) {
  //   const del = queue.dequeue()
  //   n % 3 !== 0 && queue.enqueue(del)
  //   ++n
  // }
  while (queue.size() > 1) n++ % 3 === 0 ? queue.dequeue() : queue.enqueue(queue.dequeue())

  return queue.head()
}

const arr = []
for (let index = 0; index < 100; index++) arr.push(index)

console.log(del_ring(arr))