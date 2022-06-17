import { DieModel } from './die-model';
import { YzGame } from './yz-game';

export class YzModel {
  public dice = [
    new DieModel(),
    new DieModel(),
    new DieModel(),
    new DieModel(),
    new DieModel(),
  ];
  constructor(private game: YzGame = new YzGame()) {}
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
  update() {
    this.dice.forEach((die, i) => {
      die.pips = this.game.pips[i];
    });
  }
}
