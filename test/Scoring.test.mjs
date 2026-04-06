import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.ts";
import { ScoringSystem } from "../src/ScoringSystem.ts";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Board observer notifications", () => {
  let board;
  let observer;

  beforeEach(() => {
    board = new Board(4, 6)
    observer = { clearedLines: [], onLinesCleared(lineCount) { this.clearedLines.push(lineCount) } }
    board.addObserver(observer)
  })

  test("notifies observers when a line is cleared", () => {
    board.drop("I")
    fallToBottom(board)

    expect(observer.clearedLines).to.deep.equal([1])
  })

  test("does not notify observers when no lines are cleared", () => {
    board.drop("T")
    fallToBottom(board)

    expect(observer.clearedLines).to.deep.equal([])
  })

  test("notifies each time lines are cleared", () => {
    board.drop("I")
    fallToBottom(board)
    board.drop("I")
    fallToBottom(board)

    expect(observer.clearedLines).to.deep.equal([1, 1])
  })

  test("multiple observers are all notified", () => {
    let observer2 = { clearedLines: [], onLinesCleared(lineCount) { this.clearedLines.push(lineCount) } }
    board.addObserver(observer2)

    board.drop("I")
    fallToBottom(board)

    expect(observer.clearedLines).to.deep.equal([1])
    expect(observer2.clearedLines).to.deep.equal([1])
  })
})

describe("Scoring system (Nintendo original)", () => {
  let scoring;

  beforeEach(() => {
    scoring = new ScoringSystem()
  })

  test("score starts at 0", () => {
    expect(scoring.score).to.equal(0)
  })

  test("level starts at 0", () => {
    expect(scoring.level).to.equal(0)
  })

  test("1 line cleared gives 40 points at level 0", () => {
    scoring.onLinesCleared(1)
    expect(scoring.score).to.equal(40)
  })

  test("2 lines cleared gives 100 points at level 0", () => {
    scoring.onLinesCleared(2)
    expect(scoring.score).to.equal(100)
  })

  test("3 lines cleared gives 300 points at level 0", () => {
    scoring.onLinesCleared(3)
    expect(scoring.score).to.equal(300)
  })

  test("4 lines cleared (Tetris) gives 1200 points at level 0", () => {
    scoring.onLinesCleared(4)
    expect(scoring.score).to.equal(1200)
  })

  test("score accumulates over multiple clears", () => {
    scoring.onLinesCleared(1)
    scoring.onLinesCleared(2)
    expect(scoring.score).to.equal(140)
  })

  test("level increases after 10 lines cleared", () => {
    for (let i = 0; i < 10; i++) {
      scoring.onLinesCleared(1)
    }
    expect(scoring.level).to.equal(1)
  })

  test("points are multiplied by level + 1", () => {
    for (let i = 0; i < 10; i++) {
      scoring.onLinesCleared(1)
    }
    let scoreAtLevel1 = scoring.score
    scoring.onLinesCleared(1)
    expect(scoring.score - scoreAtLevel1).to.equal(80)
  })

  test("score calculation at level 2", () => {
    for (let i = 0; i < 20; i++) {
      scoring.onLinesCleared(1)
    }
    let scoreAtLevel2 = scoring.score
    scoring.onLinesCleared(1)
    expect(scoring.score - scoreAtLevel2).to.equal(120)
  })
})

describe("Board with ScoringSystem integration", () => {
  let board;
  let scoring;

  beforeEach(() => {
    board = new Board(4, 6)
    scoring = new ScoringSystem()
    board.addObserver(scoring)
  })

  test("score increases when a line is cleared on the board", () => {
    board.drop("I")
    fallToBottom(board)

    expect(scoring.score).to.equal(40)
  })

  test("score increases after multiple line clears", () => {
    board.drop("I")
    fallToBottom(board)
    board.drop("I")
    fallToBottom(board)

    expect(scoring.score).to.equal(80)
  })

  test("score stays 0 when no lines are cleared", () => {
    board.drop("T")
    fallToBottom(board)

    expect(scoring.score).to.equal(0)
  })
})
