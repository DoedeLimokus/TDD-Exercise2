import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.ts";
import { Tetromino } from "../src/Tetromino.ts";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Line clearing", () => {

  test("a complete row is cleared when a piece hits the bottom", () => {
    let board = new Board(4, 6)
    board.drop("I")
    fallToBottom(board)

    expect(board.toString()).to.equalShape(
      `....
       ....
       ....
       ....
       ....
       ....`
    )
    expect(board.hasFalling(), "the block should have stopped").to.be.false;
  })

  test("an incomplete row is not cleared", () => {
    let board = new Board(10, 6)
    board.drop("T")
    fallToBottom(board)

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    )
  })

  test("the board continues to work after a line clear", () => {
    let board = new Board(4, 6)
    board.drop("I")
    fallToBottom(board)
    board.drop("I")
    fallToBottom(board)

    expect(board.toString()).to.equalShape(
      `....
       ....
       ....
       ....
       ....
       ....`
    )
  })

  test("a full row is cleared when a piece lands on another piece", () => {
    let board = new Board(4, 6)
    board.drop("T")
    fallToBottom(board)
    board.drop("I")
    fallToBottom(board)

    expect(board.toString()).to.equalShape(
      `....
       ....
       ....
       ....
       .T..
       TTT.`
    )
  })
})
