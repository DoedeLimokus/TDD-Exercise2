export class Board {
  width;
  height;
  state:number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.state = 0;
  }

  toString() {
    let initial = ('.'.repeat(this.width) + '\n').repeat(this.height);
    if (this.state == 0){
      return initial;
    }
  }

  

  drop(entity:String){
    let emptyRow = '.'.repeat(this.width) + '\n'
    let entityRow = `.${entity}.` + '\n'
    return (entityRow + emptyRow.repeat(this.height - 1))
  }
}


let board = new Board(3, 3);
console.log(board.drop("X"));
