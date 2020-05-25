/**
 * 定义节点
 */
class Nodel<T> {
  constructor(public data: T) {}
  public next: Nodel<T>
}

class LinkList {

  public length: number = 0
  public head: Nodel<any>
  public tail: Nodel<any>

  /**
   * 在尾部添加节点
   */
  public append(data: any) {
    // 创建新节点
    const new_node = new Nodel<any>(data)
    if (!this.head) {
      this.head = new_node
      this.tail = new_node
    } else {
      this.tail.next = new_node
      this.tail = new_node
    }
    this.length++
    return true
  }

  /**
   * 打印
   */
  public print() {
    let current_node = this.head
    while (!!current_node) {
      console.log(current_node.data)
      current_node = current_node.next
    }
  }

  /**
   * 插入
   */
  public insert(index: number, data: any) {
    if (index < 0 || index > this.length) {
      return false
    } else if (index === this.length) {
      return this.append(data)
    } else {
      var new_node = new Nodel(data)
      // new_node 变为新的头节点
      if (index === 0) {
        new_node.next = this.head
        this.head = new_node
      } else {
        let insert_index = 1
        let current_node = this.head
        while (insert_index < index) {
          current_node = current_node.next
          insert_index++
        }
        new_node.next = current_node.next
        current_node.next = new_node
        this.length++
        return true
      }
    }
  }

  /**
   * 删除节点
   */
  public remove(index: number) {
    if (index < 0 || index >= this.length) {
      return null
    } else {
      let del_node = null
      if (index === 0) {
        del_node = this.head
        this.head = this.head.next
      } else {
        let del_index = 0
        let pre_node = null // 被删除节点之前节点
        let cur_node = this.head // cur_node 就是要删除的节点
        while (del_index++ < index) {
          pre_node = cur_node
          cur_node = cur_node.next
        }
        del_node = cur_node
        // 被删除节点的前一个节点指向被删除节点的后一个节点
        pre_node.next = cur_node.next

        // 如果被删除的节点是尾节点
        if (!cur_node.next) {
          this.tail = pre_node
        }
      }
      this.length--
      del_node.next = null
      return del_node.data
    }
  }
}

const link = new LinkList()
link.append(1)
link.append(3)
link.append(5)
link.append(7)
// link.insert(2, 4)
link.remove(1)
link.print()