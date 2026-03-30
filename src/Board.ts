export class Board {
  width;
  height;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  toString() {
    let antwoord = ('.'.repeat(this.width) + '\n').repeat(this.height);
    return antwoord;
  }

  

  drop(entity:String){
    let emptyRow = '.'.repeat(this.width) + '\n'
    let entityRow = `.${entity}.` + '\n'
    return (entityRow + emptyRow.repeat(this.height - 1))
  }
}


let board = new Board(3, 3);
console.log(board.drop('X'));
