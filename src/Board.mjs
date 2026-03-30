export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    let antwoord = ('.'.repeat(this.width) + '\n').repeat(this.height);
    return antwoord;
  }

  

  // drop(){

  // }
}

