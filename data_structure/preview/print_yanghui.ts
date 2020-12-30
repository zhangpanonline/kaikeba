/**
 * 打印杨辉三角
 */
import Queue from './lib/queue'

function print_yanghui1(n: number) {
  const queue = new Queue()
  queue.enqueue(1)

  for(let i = 1; i <= n; i++) {
    let line = ' '
    let pre = 0
    for(let j = 1; j <= i; j++) {
      let num = queue.dequeue()
      line += num + ' '
      let val = num + pre
      queue.enqueue(val)
      pre = num
      j === i && queue.enqueue(1)
    }
    console.log(line)
  }
  // console.log(queue._look())
}

print_yanghui1(5)

function print_yanghui2(n: number) {
  const flag = '@'
  const queue = new Queue()
  queue.enqueue(1).enqueue(flag)

  for (let i = 1; i <= n; i++) {
    let line = ' '
    let pre = 0

    while (true) {
      const num = queue.dequeue()
      if (num === flag) {
        queue.enqueue(1).enqueue(flag)
        break
      } else {
        line += num + ' '
        let val = num + pre
        queue.enqueue(val)
        pre = num
      }
    }
    console.log(line)
  }
}

print_yanghui2(5)