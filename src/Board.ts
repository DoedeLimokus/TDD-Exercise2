export class Board {
  width;
  height;
  state: number;
  shape: string;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.state = 0;
    this.shape = "";
  }

  toString() {
    if (this.state == 0) {
      let initial = (".".repeat(this.width) + "\n").repeat(this.height);
      return initial;
    } else if (this.state == 1) {
      let emptyRow = ".".repeat(this.width) + "\n";
      let entityRow = `.${this.shape}.` + "\n";
      return entityRow + emptyRow.repeat(this.height - 1);
    }
  }

  drop(entity: string) {
    this.state = 1;
    this.shape = entity;
  }
}

let board = new Board(3, 3);
console.log(board.drop("X"));
