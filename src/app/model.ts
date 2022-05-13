export class YzModel {
  private rollTimes = 0;
  constructor(public dice = [0, 0, 0, 0, 0]) {}

  get canRoll() {
    return this.rollTimes > 0;
  }

  start() {
    this.rollTimes = 3;
  }

  roll() {
    if (!this.canRoll) throw new Error('Illegal roll called!');
    this.rollTimes--;
    this.dice = this.dice.map(() => this.getRandomInt(6) + 1);
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
}
