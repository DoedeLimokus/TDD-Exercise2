import { describe, test } from "vitest";
import { expect } from "chai";
import { ShuffleBag } from "../src/ShuffleBag.ts";

const ALL_TETROMINOES = ["T", "I", "O", "L", "J", "S", "Z"]

describe("Shuffle bag", () => {

  test("returns every item exactly once per cycle", () => {
    const bag = new ShuffleBag(ALL_TETROMINOES)
    const drawn = []
    for (let i = 0; i < ALL_TETROMINOES.length; i++) {
      drawn.push(bag.next())
    }

    expect(drawn.sort()).to.deep.equal([...ALL_TETROMINOES].sort())
  })

  test("after one full cycle, a new cycle contains all items again", () => {
    const bag = new ShuffleBag(ALL_TETROMINOES)

    for (let i = 0; i < ALL_TETROMINOES.length; i++) {
      bag.next()
    }

    const secondCycle = []
    for (let i = 0; i < ALL_TETROMINOES.length; i++) {
      secondCycle.push(bag.next())
    }

    expect(secondCycle.sort()).to.deep.equal([...ALL_TETROMINOES].sort())
  })

  test("multiple cycles all contain every item", () => {
    const bag = new ShuffleBag(ALL_TETROMINOES)
    const cycles = 10

    for (let c = 0; c < cycles; c++) {
      const drawn = []
      for (let i = 0; i < ALL_TETROMINOES.length; i++) {
        drawn.push(bag.next())
      }
      expect(drawn.sort()).to.deep.equal([...ALL_TETROMINOES].sort())
    }
  })

  test("the order is not always the same", () => {
    const sequences = new Set()
    for (let attempt = 0; attempt < 20; attempt++) {
      const bag = new ShuffleBag(ALL_TETROMINOES)
      const drawn = []
      for (let i = 0; i < ALL_TETROMINOES.length; i++) {
        drawn.push(bag.next())
      }
      sequences.add(drawn.join(","))
    }

    expect(sequences.size).to.be.greaterThan(1)
  })

  test("works with a single item", () => {
    const bag = new ShuffleBag(["T"])

    expect(bag.next()).to.equal("T")
    expect(bag.next()).to.equal("T")
    expect(bag.next()).to.equal("T")
  })

  test("works with two items", () => {
    const bag = new ShuffleBag(["A", "B"])
    const drawn = []
    for (let i = 0; i < 2; i++) {
      drawn.push(bag.next())
    }

    expect(drawn.sort()).to.deep.equal(["A", "B"])
  })

  test("never returns a value not in the original set", () => {
    const bag = new ShuffleBag(ALL_TETROMINOES)

    for (let i = 0; i < 100; i++) {
      const value = bag.next()
      expect(ALL_TETROMINOES).to.include(value)
    }
  })

  test("distribution is uniform over many cycles", () => {
    const bag = new ShuffleBag(ALL_TETROMINOES)
    const counts = {}
    ALL_TETROMINOES.forEach(t => counts[t] = 0)

    const totalCycles = 100
    const totalDraws = totalCycles * ALL_TETROMINOES.length
    for (let i = 0; i < totalDraws; i++) {
      counts[bag.next()]++
    }

    ALL_TETROMINOES.forEach(t => {
      expect(counts[t]).to.equal(totalCycles)
    })
  })
})
