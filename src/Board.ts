export class Board {
  width;
  height;
  state: number;
  entity: string;
  entityPosition: number;
  tickState: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.state = 0;
    this.entity = "";
    this.entityPosition = 0;
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
      this.state = 2
      let entityRowArray = [...emptyRowArray]
      entityRowArray[Math.floor(this.width / 2)] = this.entity
      currentField.push(entityRowArray);
      for (let i=1; i<= (this.height - 1); i++) {
        currentField.push(emptyRowArray);
      }
    }
    if (this.tickState == 1 && this.state == 2){
    this.tickState = 0
    let pos1 = this.entityPosition
    let row1 = currentField[this.entityPosition]
    this.entityPosition++
    let pos2 = this.entityPosition
    let row2 = currentField[this.entityPosition]
    currentField[pos1] = row2
    currentField[pos2] = row1
  }
    return (currentField.map(rij => rij.join(''))).join('')
  }

  drop(entity: string) {
    if (this.state == 1){
      throw new Error("already falling")
    } else {
    this.state = 1;
    this.entity = entity;
    }
  }

  tick(){
    this.tickState = 1;
  }
}

let board = new Board(3, 3);
board.drop("X")
board.tick()
console.log(board.toString());
