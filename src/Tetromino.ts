import { RotatingShape } from "./RotatingShapes.ts";

export class Tetromino {
  currentField = Array();

  static T_SHAPE = RotatingShape.fromString(`.T.
        TTT
        ...`);
}

const Tetris = Tetromino.T_SHAPE;
console.log(Tetris.toString());
console.log(Tetris.rotateRight().toString());
console.log(Tetris.rotateLeft().toString());
