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
    emptyRowArray.push('\n')
    let currentField = Array()
    if (this.state == 0) {
      let initial = emptyRowArray
      for (let i=1; i<= this.height; i++) {
      currentField.push(initial);
      }
    } else if (this.state == 1) {
      let entityRowArray = [...emptyRowArray]
      entityRowArray[Math.floor(this.width / 2)] = this.entity
      currentField.push(entityRowArray);
      for (let i=1; i<= (this.height - 1); i++) {
        currentField.push(emptyRowArray);
      }
    } else if (this.tickState == 1){
      this.tickState = 0
    }
    return (currentField.map(rij => rij.join(''))).join('')
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
