import { Roller } from "./roller";

export class Dice {
  static UNKNOWN = 0;
  pips = [
    Dice.UNKNOWN,
    Dice.UNKNOWN,
    Dice.UNKNOWN,
    Dice.UNKNOWN,
    Dice.UNKNOWN,
  ];

  constructor(private roller: Roller) {}

  roll() {
    this.pips = this.pips.map(() => this.roller.roll());
  }
}
