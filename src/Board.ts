export class Board {
  width;
  height;
  state: number;
  entity: string;
  tickState: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.state = 0;
    this.entity = "";
    this.tickState = 1;
  }

  toString() {
    let emptyRowArray = new Array(this.width).fill('.')
    let emptyRow = emptyRowArray.join('') + "\n"
    let currentField
    if (this.state == 0) {
      let initial = emptyRow.repeat(this.height);
      currentField = initial;
    } else if (this.state == 1 && this.tickState == 0) {
      let entityRowArray = [...emptyRowArray]
      entityRowArray[Math.floor(entityRowArray.length / 2)] = this.entity
      let entityRow = entityRowArray.join('') + "\n";
      currentField = entityRow + emptyRow.repeat(this.height - 1);
    } else if (this.tickState == 1){
      this.tickState = 0
    }
    return currentField
  }

  drop(entity: string) {
    this.state = 1;
    this.entity = entity;
  }

  tick(){
    this.tickState = 1;
  }
}

let board = new Board(3, 3);
board.drop("X")
console.log(board.toString());
