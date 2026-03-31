import { RotatingShape } from "./RotatingShapes.ts";

export class Tetromino {
  private orientations: RotatingShape[];
  private index: number;

  constructor(orientations: RotatingShape[], index = 0) {
    this.orientations = orientations;
    this.index = index;
  }

  toString() {
    return this.orientations[this.index].toString();
  }

  rotateRight() {
    const nextIndex = (this.index + 1) % this.orientations.length;
    return new Tetromino(this.orientations, nextIndex);
  }

  rotateLeft() {
    const nextIndex = (this.index - 1 + this.orientations.length) % this.orientations.length;
    return new Tetromino(this.orientations, nextIndex);
  }

  static T_SHAPE = new Tetromino([
    RotatingShape.fromString(`.T.
    TTT
    ...`),
    RotatingShape.fromString(`.T.
    .TT
    .T.`),
    RotatingShape.fromString(`...
    TTT
    .T.`),
    RotatingShape.fromString(`.T.
    TT.
    .T.`),
  ]);

  static I_SHAPE = new Tetromino([
    RotatingShape.fromString(`.....
        .....
        IIII.
        .....
        .....`),

    RotatingShape.fromString(`..I..
    ..I..
    ..I..
    ..I..
    .....`),
  ]);

  static O_SHAPE = new Tetromino([
    RotatingShape.fromString(`.OO
    .OO
    ...`),
  ]);
}

const Tetris = Tetromino.T_SHAPE;
console.log(Tetris.toString());
console.log(Tetris.rotateRight().toString());
console.log(Tetris.rotateLeft().toString());
