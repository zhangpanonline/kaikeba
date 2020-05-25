/**
 *  斐波那契数列
 */

import Queue from './lib/queue'

function fibonacci (n: number) {
  const queue = new Queue()
  const init = [1, 1]
  init.forEach(v => queue.enqueue(v))

  let i = 2
  // while (i < n) {
  //   const del_num = queue.dequeue()
  //   const head_num = queue.head()
  //   const next_num = del_num + head_num
  //   queue.enqueue(next_num)
  //   ++i
  // }
  while (i < n) ++i && queue.enqueue(queue.dequeue() + queue.head())

  queue.dequeue()

  return queue.head()
}

console.log(fibonacci(10))