import MinStack from './lib/min_stack'

const minStack = new MinStack()

minStack.push(3)
minStack.push(6)
minStack.push(8)
console.log(minStack.min())
minStack.push(2)
console.log(minStack.min())
minStack.pop()
console.log(minStack.min())