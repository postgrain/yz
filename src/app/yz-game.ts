import { Dice } from './dice';
import { RandomRoller } from './random-roller';

export class YzGame {
  private rollsInRound = 3;
  private dice = new Dice(new RandomRoller());

  get canRoll() {
    return this.rollsInRound < 3;
  }

  get pips() {
    return [...this.dice.pips];
  }

  start() {
    this.rollsInRound = 0;
    this.dice.reset();
  }

  roll() {
    if (!this.canRoll) throw new Error('Illegal roll called!');
    this.dice.roll();
    this.rollsInRound += 1;
  }
}
