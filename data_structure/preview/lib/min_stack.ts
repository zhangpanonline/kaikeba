import Stack from './stack'

export default class MinStack {
  private data_stack = new Stack()
  private min_stack = new Stack()

  /**
   * push
   */
  public push(item: any) {
    this.data_stack.push(item)

    if (this.min_stack.isEmpty() || this.min_stack.top() > item) {
      this.min_stack.push(item)
    } else {
      this.min_stack.push(this.min_stack.top())
    }
  }

  /**
   * pop
   */
  public pop() {
    this.min_stack.pop()
    return this.data_stack.pop()
  }

  /**
   * min
   */
  public min() {
    return this.min_stack.top()
  }
}