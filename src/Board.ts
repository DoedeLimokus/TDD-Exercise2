export class Board {
  width;
  height;
  state: number;
  entity: string;
  entityPosition: number;
  tickState: number;
  emptyRowArray: Array<string>;
  currentField: Array<Array<string>>;
  dropStatus: number;
  hasFallingStatus: boolean;
  shapes: Array<string>;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.state = 0;
    this.entity = "";
    this.entityPosition = 0;
    this.tickState = 0;
    this.currentField = Array();
    this.shapes = Array();
    this.dropStatus = 0;
    this.hasFallingStatus = true;

    // console.log("init")
    this.emptyRowArray = new Array(this.width).fill(".");
    this.emptyRowArray.push("\n");
    let initial = this.emptyRowArray;
    for (let i = 0; i < this.height; i++) {
      this.currentField.push([...this.emptyRowArray]);
    }
    this.state = 1;
  }

  toString() {
    // console.log(this.state)
    if (this.state == 1 && this.dropStatus == 1) {
      // console.log("Drop");
      // console.log("Aan het droppen")
      this.hasFallingStatus = true;
      this.dropStatus = 0;
      this.state = 2;
      let entityRowArray = [...this.emptyRowArray];
      entityRowArray[Math.floor(this.width / 2)] = this.entity;
      this.currentField[0] = entityRowArray;
      this.shapes.push(this.entity);
      // console.log(this.shapes)
    }

    if (this.state == 2 && this.tickState == 1) {
      // console.log("Tick");
      this.tickState = 0;
      let currentShape = this.shapes.at(-1) ?? "";
      let posRow = this.currentField[this.entityPosition].indexOf(currentShape);
      if (this.entityPosition + 1 > this.height - 1) {
        // Blok kan niet verder: Gamestate -> 1, FallingStatus -> false, entityposition -> 0
        this.hasFallingStatus = false;
        this.state = 1;
        this.entityPosition = 0;
        // console.log("Op de bodem, kan niet verder")
      } else {
        let checkSpot = this.currentField[this.entityPosition + 1][posRow];
        if (checkSpot === ".") {
          // console.log(". gevonden dus kan verder.")
          // Blok kan nog verder
          let pos1 = this.entityPosition;
          let row1 = this.currentField[this.entityPosition];
          this.entityPosition++;
          // console.log(this.entityPosition)
          let pos2 = this.entityPosition;
          let row2 = this.currentField[this.entityPosition];
          this.currentField[pos1] = row2;
          this.currentField[pos2] = row1;
        } else {
          // Blok kan niet verder: Gamestate -> 1, FallingStatus -> false, entityposition -> 0
          // console.log("Andere letter eronder")
          this.hasFallingStatus = false;
          this.state = 1;
          this.entityPosition = 0;
        }
      }
    }
    return this.currentField.map((rij) => rij.join("")).join("");
  }

  drop(entity: string) {
    if (this.state != 1) {
      throw new Error("already falling");
    } else {
      this.dropStatus = 1;
      this.entity = entity;
      this.toString();
    }
  }

  tick() {
    this.tickState = 1;
    this.toString();
  }

  hasFalling() {
    return this.hasFallingStatus;
  }
}

let board = new Board(3, 3);
// board.drop("X");
// console.log(board.toString());
// board.tick();
// console.log(board.toString());
// board.tick();
// console.log(board.toString());
// board.tick();
// console.log(board.hasFalling())
// console.log(board.state)
// console.log(board.toString());
// board.drop("Y");
// console.log(board.toString());
// board.tick()
// console.log(board.toString());
// console.log(board.hasFalling())

// console.log(board.toString());
// console.log(board.state);
// console.log(board.hasFalling());
