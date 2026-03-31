export class RotatingShape {
  currentField = Array();

  constructor() {}

  static fromString(shape: string) {
    const nieuwVeld = new RotatingShape();
    let lineArray = shape.split("\n");
    lineArray.map((line) => nieuwVeld.currentField.push(line.split("").filter((letter) => letter !== " ")));
    return nieuwVeld;
  }

  rotateRight() {
    const returnField = new RotatingShape();
    let newCurrentField = Array();
    for (let i = 0; i < this.currentField.length; i++) {
      let transferArray = Array();
      // Aanmaken van 1 element in de nieuwe Array (Rij)
      for (let j = this.currentField[0].length - 1; j >= 0; j--) {
        transferArray.push(this.currentField[j][i]);
      }
      newCurrentField.push(transferArray);
    }
    returnField.currentField = newCurrentField;
    return returnField;
  }

  rotateLeft() {
    const returnField = new RotatingShape();
    let newCurrentField = Array();
    for (let i = this.currentField.length - 1; i >= 0; i--) {
      let transferArray = Array();
      for (let j = 0; j < this.currentField[0].length; j++) {
        transferArray.push(this.currentField[j][i]);
      }
      newCurrentField.push(transferArray);
    }
    returnField.currentField = newCurrentField;
    return returnField;
  }

  toString() {
    let returnCurrentField = this.currentField.map((rij) => [...rij]);
    returnCurrentField.map((rij) => rij.push("\n"));
    return returnCurrentField.map((rij) => rij.join("")).join("");
  }
}

// const Speelveld = RotatingShape.fromString(
//   `ABCDE
//      FGHIJ
//      KLMNO
//      PQRST
//      UVWXY`
// );

// console.log(Speelveld.toString());

// console.log(this.currentField)
// console.log(this.currentField.map(rij => rij.join('')))
// console.log((this.currentField.map(rij => rij.join(''))).join('\n'))
