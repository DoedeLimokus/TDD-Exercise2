export class Board {
  width;
  height;
  state: number;
  entity: string;
  entityPosition: number;
  tickState: number;
  emptyRowArray: Array<string>
  currentField: Array<Array<string>>
  dropStatus: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.state = 0;
    this.entity = "";
    this.entityPosition = 0;
    this.tickState = 0;
    this.currentField = Array()
    this.dropStatus = 0

    // console.log("init")
    this.emptyRowArray = new Array(this.width).fill('.')
    this.emptyRowArray.push('\n')
    let initial = this.emptyRowArray
    for (let i=1; i<= this.height; i++) {
    this.currentField.push(initial);

    this.state = 1
    }
  }

  toString() {
    // console.log(this.state)
    if (this.state == 1 && this.dropStatus == 1) {
      // console.log("Drop")
      this.dropStatus = 0;
      this.state = 2
      let entityRowArray = [...this.emptyRowArray]
      entityRowArray[Math.floor(this.width / 2)] = this.entity
      this.currentField[0] = entityRowArray;
    }
    if (this.state == 2 && this.tickState == 1){
      // console.log("Tick")
      this.tickState = 0
      let pos1 = this.entityPosition
      let row1 = this.currentField[this.entityPosition]
      this.entityPosition++
      let pos2 = this.entityPosition
      let row2 = this.currentField[this.entityPosition]
      this.currentField[pos1] = row2
      this.currentField[pos2] = row1
  }
    return (this.currentField.map(rij => rij.join(''))).join('')
  }

  drop(entity: string) {
    if (this.state != 1){
      throw new Error("already falling")
    } else {
    this.dropStatus = 1;
    this.entity = entity;
    }
  }

  tick(){
    this.tickState = 1;
  }
}

let board = new Board(3, 3);
console.log(board.toString())
board.drop("X")
console.log(board.toString());
board.tick()
console.log(board.toString());
