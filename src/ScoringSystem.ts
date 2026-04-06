export class ScoringSystem {
  score: number
  level: number
  totalLinesCleared: number

  constructor() {
    this.score = 0
    this.level = 0
    this.totalLinesCleared = 0
  }

  onLinesCleared(lineCount: number) {
    const pointsPerLines: Record<number, number> = {
      1: 40,
      2: 100,
      3: 300,
      4: 1200
    }
    const points = pointsPerLines[lineCount] || 0
    this.score += points * (this.level + 1)
    this.totalLinesCleared += lineCount
    this.level = Math.floor(this.totalLinesCleared / 10)
  }
}
