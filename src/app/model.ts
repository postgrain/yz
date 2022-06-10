import { DieModel } from './die-model';
import { YzGame } from './yz-game';

export class YzModel {
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
    return this.game.canRoll;
  }

  start() {
    this.game.start();
    this.update();
  }

  roll() {
    this.game.roll();
    this.update();
  }

  private update() {
    this.dice.forEach((die, i) => {
      die.pips = this.game.pips[i];
    });
  }
}
