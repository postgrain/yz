import { Dice, pipChange } from './dice';
import { Roller } from './roller';
import { App } from './app';

describe('Dice', () => {
  let dice: Dice;

  beforeEach(() => {
    dice = new Dice(new FakeRoller([5, 4, 3, 2, 1]));
  });

  it('dice start out as unknowns', () => {
    dice.pips.forEach((item) => {
      expect(item).toBe(Dice.UNKNOWN);
    });
  });
  it('dice change during a roll', () => {
    dice.roll();
    expect(dice.pips).toEqual([5, 4, 3, 2, 1]);

    App.store.assertDispatched(pipChange);
  });
  it('reset resets to unknowns', () => {
    dice.roll();
    dice.reset();
    expect(dice.pips).toEqual([
      Dice.UNKNOWN,
      Dice.UNKNOWN,
      Dice.UNKNOWN,
      Dice.UNKNOWN,
      Dice.UNKNOWN,
    ]);
  });
});

class FakeRoller implements Roller {
  constructor(private pending: number[]) {}
  roll(): number {
    return this.pending.shift()!;
  }
}
