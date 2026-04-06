import { beforeEach, describe, test } from "vitest";
import { expect, should } from "chai";
import { Board } from "../src/Board.ts";
import { Tetromino } from "../src/Tetromino.ts";
import { before } from "lodash";

function farToRight(board) {
  for (let i = 0; i < 10; i++) {
    board.toRight()
  }
}

function farToLeft(board) {
  for (let i = 0; i < 10; i++) {
    board.toLeft()
  }
}

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
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
        expect(board.hasFalling(), "the block should still fall").to.be.true;
    })

    test("block cannot be moved left beyond the board", () => {
        board.drop("T")
        board.tick()
        farToLeft(board)

        expect(board.toString()).to.equalShape(
            `..........
             .T........
             TTT.......
             ..........
             ..........
             ..........`
        )
        expect(board.hasFalling(), "the block should still fall").to.be.true;
    })

    test("it cannot be moved down beyond the board (will stop falling)", () => {
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
        expect(board.hasFalling(), "the block should not be able to fall").to.be.false;
    })
})

describe("When blocks touch", () => {
    let board;
    beforeEach(() => {
        board = new Board(10,6)
    })

    test("it cannot be moved right through other blocks", () => {
        board.drop("T")
        fallToBottom(board)
        board.drop("T")
        board.toLeft()
        board.toLeft()
        board.tick()
        board.tick()
        board.toRight()

        expect(board.toString()).to.equalShape(
            `..........
             ..........
             ..........
             ..T.......
             .TTTT.....
             ...TTT....`
        )
        expect(board.hasFalling(), "the block should still be falling").to.be.true
    })

    test("it cannot be moved right through other blocks", () => {
        board.drop("T")
        fallToBottom(board)
        board.drop("T")
        board.toRight()
        board.toRight()
        board.tick()
        board.tick()
        board.toLeft()

        expect(board.toString()).to.equalShape(
            `..........
             ..........
             ..........
             ......T...
             ....TTTT..
             ...TTT....`
        )
        expect(board.hasFalling(), "the block should still be falling").to.be.true
    })

    test("it cannot be moved right through other blocks", () => {
        board.drop("T")
        fallToBottom(board)
        board.drop("T")
        board.toLeft()
        board.toLeft()
        board.tick()
        board.tick()
        board.toRight()
        board.tick()

        expect(board.toString()).to.equalShape(
            `..........
             ..........
             ..........
             ..T.......
             .TTTT.....
             ...TTT....`
        )
        expect(board.hasFalling(), "the block cannot fall anymore").to.be.false
    })
    
})

describe("Rotating falling tetrominoes", () => {
    let board;
    beforeEach(() => {
        board = new Board(10, 6)
    })

    test("a falling tetromino can be rotated right", () => {
        board.drop("T")
        board.tick()
        board.rotateRight()

        expect(board.toString()).to.equalShape(
            `..........
             ....T.....
             ....TT....
             ....T.....
             ..........
             ..........`
        )
    })

    test("a falling tetromino can be rotated left", () => {
        board.drop("T")
        board.tick()
        board.rotateLeft()

        expect(board.toString()).to.equalShape(
            `..........
             ....T.....
             ...TT.....
             ....T.....
             ..........
             ..........`
        )
    })

    test("it cannot be rotated when completely blocked", () => {
        let narrowBoard = new Board(5, 6)
        narrowBoard.drop("I")
        fallToBottom(narrowBoard)
        narrowBoard.drop("I")
        fallToBottom(narrowBoard)
        narrowBoard.drop("I")
        narrowBoard.tick()
        narrowBoard.rotateRight()

        expect(narrowBoard.toString()).to.equalShape(
            `.....
             ....I
             ....I
             ....I
             IIIII
             IIII.`
        )
        expect(narrowBoard.hasFalling(), "the block should still be falling").to.be.true
    })
})

describe("Wall kick", () => {
    let board;
    beforeEach(() => {
        board = new Board(10, 6)
    })

    test("I-shape against right wall kicks left when rotated to horizontal", () => {
        board.drop("I")
        board.tick()
        board.rotateRight()
        farToRight(board)
        board.rotateRight()

        expect(board.toString()).to.equalShape(
            `..........
             ..........
             ......IIII
             ..........
             ..........
             ..........`
        )
        expect(board.hasFalling(), "the block should still be falling").to.be.true
    })

    test("I-shape against left wall kicks right when rotated to horizontal", () => {
        board.drop("I")
        board.tick()
        board.rotateRight()
        farToLeft(board)
        board.rotateRight()

        expect(board.toString()).to.equalShape(
            `..........
             ..........
             IIII......
             ..........
             ..........
             ..........`
        )
        expect(board.hasFalling(), "the block should still be falling").to.be.true
    })

    test("T-shape kicks away from other blocks when rotated", () => {
        board.drop("T")
        fallToBottom(board)
        board.drop("T")
        board.tick()
        board.rotateRight()

        expect(board.toString()).to.equalShape(
            `..........
             ..........
             .....T....
             .....TT...
             ....TT....
             ...TTT....`
        )
        expect(board.hasFalling(), "the block should still be falling").to.be.true
    })
})