import { Tetromino } from "./Tetromino.ts";

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
  currentEntityMemory: Array<Array<number>>

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
    this.currentEntityMemory = Array()

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
      if (this.entity == `T`){
        console.log(`Call dropOnBoard met entity: ${this.entity}`)
        this.dropOnBoard()
        this.hasFallingStatus = true;
        this.dropStatus = 0;
        this.state = 2;
      }
      else if(this.entity == `.....\n.....\nIIII.\n.....\n.....\n`){
        let block = 'I'
        this.hasFallingStatus = true;
        this.dropStatus = 0;
        this.state = 2;
        let entityRowArray = [...this.emptyRowArray];

        entityRowArray[Math.floor(this.width / 2)] = this.entity;
        this.currentField[0] = entityRowArray;
        this.shapes.push(this.entity);

      }
      else if(this.entity == `.OO\n.OO\n...\n`){
        let block = 'O'
        this.hasFallingStatus = true;
        this.dropStatus = 0;
        this.state = 2;
        let entityRowArray1 = [...this.emptyRowArray];
        let entityRowArray2 = [...this.emptyRowArray];

        entityRowArray1[Math.floor(this.width / 2)] = this.entity;
        entityRowArray2[Math.floor(this.width / 2)] = this.entity;
        this.currentField[0] = entityRowArray1;
        this.currentField[1] = entityRowArray2;
        this.shapes.push(this.entity);
      } else {
        this.hasFallingStatus = true;
        this.dropStatus = 0;
        this.state = 2;
        let entityRowArray = [...this.emptyRowArray];
        entityRowArray[Math.floor(this.width / 2)] = this.entity;
        this.currentField[0] = entityRowArray;
        this.shapes.push(this.entity);
      }
    }
    if (this.state == 2 && this.tickState == 1) {
      this.tickState = 0;
      let result = this.moveOnBoard()

      if (result == 0){
        console.log("Er zit een element onder je")
        // Geen plek -> Er zit een element onder je
        this.hasFallingStatus = false;
        this.state = 1;
        this.entityPosition = 0;
      } 
      else if (result == 1){
        // console.log(`moveOnBoard succes!`)
        // Succes!
      } 
      else if (result == 2){
        console.log("Het element heeft de grens bereikt")
        // entity heeft de grens bereikt
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
      this.dropStatus = 1;
      this.entity = entity;
      // console.log(`Entity: ${this.entity}`)
      this.toString();
    }
  }

  // Voor het droppen van een nieuw element op het bord
  dropOnBoard(){
    // console.log(`dropOnBoard currentField: \n${this.currentField}`)
    // console.log(`dropOnBoard currentEntityMemory: \n${this.currentEntityMemory}`)
    const t = Tetromino.T_SHAPE 
    this.currentEntityMemory.length = 0
    let shapeString = t.toString()
    let shapeArray = shapeString.trim().split("\n").map(line => line.split(""));
    let startX = Math.floor(this.width / 2) - (Math.floor(shapeArray[0].length / 2)) - 1 // <- Deze is alleen voor T

    for(let i=0; i < shapeArray.length; i++){
      for(let j=0; j < shapeArray[0].length; j++){
        if (shapeArray[i][j] != '.'){
          if ((this.currentField[this.entityPosition + i][startX + j]) == '.'){
            this.currentField[this.entityPosition + i][startX + j] = shapeArray[i][j]
            this.currentEntityMemory.push(Array((this.entityPosition + i), (startX + j)))
          } else {
            this.currentEntityMemory.length = 0
            throw new Error(`Er is hier geen plek voor de vorm: X = ${startX + j}, Y = ${this.entityPosition + i}`)
          }
        }
      }
    }
    // console.log(`Element gedropped, currentField: \n${this.currentField}`)
  }

  // Voor het tekenen van een element op het bord
  drawOnBoard(){
    const t = Tetromino.T_SHAPE
    let newCurrentEntityMemory = Array()
    let shapeString = t.toString()
    let shapeArray = shapeString.trim().split("\n").map(line => line.split(""));
    let startX = Math.floor(this.width / 2) - (Math.floor(shapeArray[0].length / 2)) - 1 // <- Deze is alleen voor T
    for(let i=0; i < shapeArray.length; i++){
      for(let j=0; j < shapeArray[0].length; j++){
        if (shapeArray[i][j] != '.'){
          if ((this.currentField[this.entityPosition + i][startX + j]) == '.'){
            this.currentField[this.entityPosition + i][startX + j] = shapeArray[i][j]
            newCurrentEntityMemory.push(Array((this.entityPosition + i), (startX + j)))
          } else {
            newCurrentEntityMemory.length = 0
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
    this.currentEntityMemory.forEach(coord => {this.currentField[coord[0]][coord[1]] = '.'})
    // console.log(`moveOnBoard currentField zonder element: \n${this.currentField}`)
    // entityPosition + 1 -> if entityPosition > height => Niet drawOnBoard return 2
    this.entityPosition++
    if (this.entityPosition > this.height){
      return 2
    }
    // dropOnBoard aanroepen
    let newCurrentEntityMemory = this.drawOnBoard() 
    // met de return currentEntityMemory bijwerken.
    this.currentEntityMemory.length = 0
    if (newCurrentEntityMemory == "Geen plek!"){
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


let board = new Board(3,3);
// console.log(board.toString());
console.log(`Board.drop: \n`)
board.drop("T")
console.log(board.toString());
console.log(`board.tick1: \n`)
board.tick()
console.log(board.toString());
// console.log(`board.tick2: \n`)
// board.tick()
// console.log(board.toString());
// console.log(`board.tick3: \n`)
// board.tick()
// console.log(board.toString());
// console.log(`board.tick4: \n`)
// board.tick()
// console.log(board.toString());
// console.log(`board.tick5: \n`)
// board.tick()
// console.log(board.toString());
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


