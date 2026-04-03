import { Board } from "./Board.ts";
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

  static X = new Tetromino([RotatingShape.fromString(`X`)])
  static Y = new Tetromino([RotatingShape.fromString(`Y`)])

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

  static L_SHAPE = new Tetromino([
    RotatingShape.fromString(`..L
    LLL
    ...`),
    RotatingShape.fromString(`.L.
    .L.
    .LL`),
    RotatingShape.fromString(`...
    LLL
    L..`),
    RotatingShape.fromString(`LL.
    .L.
    .L.`),
  ]);

  static J_SHAPE = new Tetromino([
    RotatingShape.fromString(`J..
    JJJ
    ...`),
    RotatingShape.fromString(`.JJ
    .J.
    .J.`),
    RotatingShape.fromString(`...
    JJJ
    ..J`),
    RotatingShape.fromString(`.J.
    .J.
    JJ.`),
  ]);

  static S_SHAPE = new Tetromino([
    RotatingShape.fromString(`.SS
    SS.
    ...`),
    RotatingShape.fromString(`S..
    SS.
    .S.`),
  ]);

  static Z_SHAPE = new Tetromino([
    RotatingShape.fromString(`ZZ.
    .ZZ
    ...`),
    RotatingShape.fromString(`..Z
    .ZZ
    .Z.`),
  ]);
}

// const Tetris = Tetromino.T_SHAPE;
// console.log(Tetris.toString());
// console.log(Tetris.rotateRight().toString());
// console.log(Tetris.rotateLeft().toString());

// const Tetris = Tetromino.T_SHAPE
// let board
// board = new Board(10, 6)
// board.drop(Tetris)
// console.log(board.toString())
// console.log(Tetris.rotateLeft().toString())
