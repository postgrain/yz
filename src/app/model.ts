import { DieModel } from './die-model';

export class YzModel {
  private rollTimes = 0;

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
    this.rollTimes--;

    this.dice.forEach((die) => {
      die.pips = this.getRandomInt(6) + 1;
    });
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
}
