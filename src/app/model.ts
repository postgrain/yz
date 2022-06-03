import { DieModel } from './die-model';
import { YzGame } from './yz-game';


export class YzModel {
  private rollTimes = 0;
  private game = new YzGame();

  constructor(
    public dice = [
      new DieModel(),
      new DieModel(),
      new DieModel(),
      new DieModel(),
      new DieModel(),
    ]
  ) {}

  get canRoll() {
    return this.rollTimes > 0;
  }

  start() {
    this.rollTimes = 3;
  }

  roll() {
    if (!this.canRoll) throw new Error('Illegal roll called!');
    this.game.dice.roll();
    this.dice.forEach((die, i) => {
      die.pips = this.game.dice.pips[i];
    });
    this.rollTimes--;
  }
}
