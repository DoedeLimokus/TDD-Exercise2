export class Board {
  width;
  height;
  state: number;
  entity: string;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.state = 0;
    this.entity = "";
  }

  toString() {
    let emptyRowArray = new Array(this.width).fill('.')
    let emptyRow = emptyRowArray.join('')
    if (this.state == 0) {
      let initial = (emptyRow + "\n").repeat(this.height);
      return initial;
    } else if (this.state == 1) {
      let entityRowArray = emptyRowArray
      entityRowArray[this.width / 2] = this.entity
      let entityRow = `.${this.entity}.` + "\n";
      return entityRow + emptyRow.repeat(this.height - 1);
    }
  }

  drop(entity: string) {
    this.state = 1;
    this.entity = entity;
  }
}

let board = new Board(3, 3);
console.log(board.drop("X"));
