import { Tetromino } from "./Tetromino.ts";

export class Board {
  width;
  height;
  state: number;
  entity: "T_SHAPE"|"I_SHAPE"|"O_SHAPE"|"X"|"Y"
  entityPosition: number;
  tickState: number;
  emptyRowArray: Array<string>;
  currentField: Array<Array<string>>;
  dropStatus: number;
  hasFallingStatus: boolean;
  shapes: Array<string>;
  currentEntityMemory: Array<Array<number>>
  heightOffset: number
  widthOffset: number

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.state = 0;
    this.entity = "T_SHAPE";
    this.entityPosition = 0;
    this.tickState = 0;
    this.currentField = Array();
    this.shapes = Array();
    this.dropStatus = 0;
    this.hasFallingStatus = true;
    this.currentEntityMemory = Array()
    this.heightOffset = 0
    this.widthOffset = 0

    // console.log("init")
    this.emptyRowArray = new Array(this.width).fill(".");
    this.emptyRowArray.push("\n");
    let initial = this.emptyRowArray;
    for (let i = 0; i < this.height; i++) {
      this.currentField.push([...this.emptyRowArray]);
    }
    this.state = 1;
    // console.log(`Init currentField: \n${this.currentField}`)
  }

  toString() {
    if (this.state == 1 && this.dropStatus == 1) {
      if (["T_SHAPE","I_SHAPE","O_SHAPE","X","Y"].includes(this.entity)){
        // console.log(`Call dropOnBoard met entity: ${this.entity}`)
        this.dropOnBoard(this.entity)
        this.hasFallingStatus = true;
        this.dropStatus = 0;
        this.state = 2;
      } 
      else {
        console.log(`${this.entity} Niet in "T_SHAPE","I_SHAPE","O_SHAPE","X","Y"`)
        // this.hasFallingStatus = true;
        // this.dropStatus = 0;
        // this.state = 2;
        // let entityRowArray = [...this.emptyRowArray];
        // entityRowArray[Math.floor(this.width / 2)] = this.entity;
        // this.currentField[0] = entityRowArray;
        // this.shapes.push(this.entity);
      }
    }
    if (this.state == 2 && this.tickState == 1) {
      this.tickState = 0;
      let result = this.moveOnBoard()

      if (result == 0){
        // console.log("Er zit een element onder je")
        this.hasFallingStatus = false;
        this.state = 1;
        this.entityPosition = 0;
      } 
      else if (result == 1){
        // console.log(`moveOnBoard succes!`)
      } 
      else if (result == 2){
        console.log("Het element heeft de grens bereikt")
        this.hasFallingStatus = false;
        this.state = 1;
        this.entityPosition = 0;
      }
    }
    return this.currentField.map((rij) => rij.join("")).join("");
  }

  drop(entity: any) {
    if (this.state != 1) {
      throw new Error("already falling");
    } else {
      if (entity == "T"){
      this.dropStatus = 1;
      this.entity = "T_SHAPE";
      this.heightOffset = 0
      this.widthOffset = -1
      console.log(`Entity: ${this.entity}`)
      this.toString();
      } else if (entity == "I"){
        this.heightOffset = -1
        this.widthOffset = 0
        this.dropStatus = 1
        this.entity = "I_SHAPE"
        this.toString()
      } else if (entity == "O"){
        this.heightOffset = 0
        this.widthOffset = -1
        this.dropStatus = 1
        this.entity = "O_SHAPE"
        this.toString()
      } else if (entity == "X"){
        this.entity = "X"
        this.dropStatus = 1
        this.widthOffset = 0
        this.heightOffset = 0
        this.toString
      } else if (entity == "Y"){
        this.entity = "Y"
        this.dropStatus = 1
        this.widthOffset = 0
        this.heightOffset = 0
        this.toString
      } else if (entity === Tetromino.T_SHAPE) {
        this.dropStatus = 1;
        this.entity = "T_SHAPE";
        this.heightOffset = 0
        this.widthOffset = -1
        console.log(`Entity: ${this.entity}`)
        this.toString();
      }
      else {
        throw new Error("Ik ken dat element niet")
      }
    }
  }

  // Voor het droppen van een nieuw element op het bord
  dropOnBoard(shape:"T_SHAPE"|"I_SHAPE"|"O_SHAPE"|"X"|"Y"){
    // console.log(`dropOnBoard currentField: \n${this.currentField}`)
    // console.log(`dropOnBoard currentEntityMemory: \n${this.currentEntityMemory}`)
    const t = Tetromino[shape]
    // console.log(`dropOnBoard shape = ${shape}`)
    this.currentEntityMemory.length = 0
    let shapeString = t.toString()
    let shapeArray = shapeString.trim().split("\n").map(line => line.split(""));
    let startX = Math.floor(this.width / 2) - (Math.floor(shapeArray[0].length / 2)) + this.widthOffset
    this.entityPosition = this.entityPosition + this.heightOffset
    for(let i=0; i < shapeArray.length; i++){
      for(let j=0; j < shapeArray[0].length; j++){
        if (shapeArray[i][j] != '.'){
          if ((this.currentField[this.entityPosition + i][startX + j]) == '.'){
            this.currentField[this.entityPosition + i][startX + j] = shapeArray[i][j]
            this.currentEntityMemory.push(Array((this.entityPosition + i), (startX + j)))
          } else {
            console.log(`Error currentEntityMemory: ${this.currentEntityMemory}`)
            this.currentEntityMemory.length = 0
            throw new Error(`Kan niet droppen: X = ${startX + j}, Y = ${this.entityPosition + i}`)
          }
        }
      }
    }
    // console.log(`Element gedropped, currentField: \n${this.currentField}`)
    // console.log(`dropOnBoard currentEntityMemory: \n${this.currentEntityMemory}`)
  }

  // Voor het tekenen van een element op het bord
  drawOnBoard(shape:"T_SHAPE"|"I_SHAPE"|"O_SHAPE"|"X"|"Y"){
    const t = Tetromino[shape]
    let newCurrentEntityMemory = Array()
    let shapeString = t.toString()
    let shapeArray = shapeString.trim().split("\n").map(line => line.split(""));
    let startX = Math.floor(this.width / 2) - (Math.floor(shapeArray[0].length / 2)) + this.widthOffset
    for(let i=0; i < shapeArray.length; i++){
      for(let j=0; j < shapeArray[0].length; j++){
        if (shapeArray[i][j] != '.'){
          if ((this.currentField[this.entityPosition + i][startX + j]) == '.'){
            this.currentField[this.entityPosition + i][startX + j] = shapeArray[i][j]
            newCurrentEntityMemory.push(Array((this.entityPosition + i), (startX + j)))
          } else {
            newCurrentEntityMemory.length = 0
            // console.log(`drawOnBoard: Geen plek!`)
            return "Geen plek"
          }
        }
      }
    }
    // console.log(`drawOnBoard this.currentField= \n${this.currentField}`)
    // console.log(`drawOnBoard newCurrentEntityMemory= \n${newCurrentEntityMemory}`)
    return [...newCurrentEntityMemory]
  }
  // Voor het verplaatsen van een element
  moveOnBoard(){
    // Plekken op currentField die in de currentEntityMemory staan leeg halen
    // console.log(`moveOnBoard currentEntityMemory: \n${this.currentEntityMemory}`)
    let copyCurrentField = this.currentField.map(row => [...row])
    this.entityPosition++
    if (["T_SHAPE"].includes(this.entity)){
      if (this.entityPosition + 1 >= this.height){
        return 2
      }
    } else if (["I_SHAPE"].includes(this.entity)) {
      if (this.entityPosition + 2 >= this.height){
        return 2
      }
    } else {
      if (this.entityPosition >= this.height){
        return 2
      }
    }
    this.currentEntityMemory.forEach(coord => {this.currentField[coord[0]][coord[1]] = '.'})
    // console.log(`moveOnBoard currentField zonder element: \n${this.currentField}`)
    // entityPosition + 1 -> if entityPosition > height => Niet drawOnBoard return 2
    // dropOnBoard aanroepen
    let newCurrentEntityMemory = this.drawOnBoard(this.entity) 
    // met de return currentEntityMemory bijwerken.
    this.currentEntityMemory.length = 0
    if (newCurrentEntityMemory == "Geen plek"){
      this.currentField.length = 0
      this.currentField = [...copyCurrentField]
      return 0
    } else {
    this.currentEntityMemory = [...newCurrentEntityMemory]
    return 1
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


let board = new Board(10,6);
// console.log(board.toString());
console.log(`Board.drop1: \n`)
board.drop("T")
console.log(board.toString());
console.log(`board.tick1: \n`)
board.tick()
console.log(`board.tick1: ${board.entityPosition}`)
console.log(board.toString());
console.log(`board.tick2: \n`)
board.tick()
console.log(`board.tick2: ${board.entityPosition}`)
console.log(board.toString());
console.log(`board.tick3: \n`)
board.tick()
console.log(`board.tick3: ${board.entityPosition}`)
console.log(board.toString());
// console.log(`Board.drop2: \n`)
// board.drop("Y")
// console.log(board.toString());
console.log(`board.tick4: \n`)
board.tick()
console.log(`board.tick4: ${board.entityPosition}`)
console.log(board.toString());
console.log(`board.tick5: \n`)
board.tick()
console.log(`board.tick5: ${board.entityPosition}`)
console.log(board.toString());
console.log(`board.tick6: \n`)
board.tick()
console.log(`board.tick6: ${board.entityPosition}`)
console.log(board.toString());
console.log(`Board.drop2: \n`)
board.drop("T")
console.log(board.toString());
console.log(`board.tick7: \n`)
board.tick()
console.log(board.toString());
console.log(`board.tick8: \n`)
board.tick()
console.log(board.toString());
console.log(`board.tick9: \n`)
board.tick()
console.log(board.toString());
console.log(board.toString());
console.log(`board.tick10: \n`)
board.tick()
console.log(board.toString());
console.log(`board.tick11: \n`)
board.tick()
console.log(board.toString());
console.log(`board.tick12: \n`)
board.tick()
console.log(board.toString());
// board.drop("X");
// board.tick();
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


