import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.ts";
import { Tetromino } from "../src/Tetromino.ts";
import { before } from "lodash";

function farToRight(board) {
  for (let i = 0; i < 10; i++) {
    board.toRight()
  }
}

describe("Blocks can move", () => {
    let board;
    beforeEach(() => {
        board = new Board(10,6)
    })

    test("a falling tetromino can be moved left", () => {
        board.drop("T")
        board.tick()
        board.toLeft()

        expect(board.toString()).to.equalShape(
            `..........
             ...T......
             ..TTT.....
             ..........
             ..........
             ..........`
        )
    })

    test("a falling tetromino can be moved right", () => {
        board.drop("T")
        board.tick()
        board.toRight()

        expect(board.toString()).to.equalShape(
            `..........
             .....T....
             ....TTT...
             ..........
             ..........
             ..........`
        )
    })

    test("block cannot be moved right beyond the board", () => {
        board.drop("T")
        board.tick()
        farToRight(board)

        expect(board.toString()).to.equalShape(
            `..........
             ........T.
             .......TTT
             ..........
             ..........
             ..........`
        )
    })
})