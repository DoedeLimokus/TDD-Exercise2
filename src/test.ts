export class Auto {
  bandSoort = "";

  constructor() {}

  static band(soort: string) {
    const BMW = new Auto();
    BMW.bandSoort = soort;
    return BMW;
  }

  printBand() {
    return this.bandSoort;
  }
}

const NieuweBMW = Auto.band("Winter");
console.log(NieuweBMW.printBand());
