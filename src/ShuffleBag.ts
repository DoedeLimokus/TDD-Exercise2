export class ShuffleBag<T> {
  private items: T[]
  private bag: T[]

  constructor(items: T[]) {
    this.items = [...items]
    this.bag = []
  }

  next(): T {
    if (this.bag.length === 0) {
      this.refill()
    }
    return this.bag.pop()!
  }

  private refill() {
    this.bag = [...this.items]
    this.shuffle()
  }

  private shuffle() {
    for (let i = this.bag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = this.bag[i]
      this.bag[i] = this.bag[j]
      this.bag[j] = temp
    }
  }
}
