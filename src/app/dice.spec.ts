import { Dice, pipChange } from './dice';
import { Roller } from './roller';
import { App } from './app';

describe('Dice', () => {
  let dice: Dice;

  beforeEach(() => {
    dice = new Dice(new FakeRoller([5, 4, 3, 2, 1]));
  });

  it('dice change during a roll', () => {
    dice.roll();
    expect(dice.pips).toEqual([5, 4, 3, 2, 1]);
  });

  it('dice send pip change events on roll', () => {
    dice.roll();
    expect(App.store).toEqual([
      pipChange({ die: 0, pips: 5 }),
      pipChange({ die: 1, pips: 4 }),
      pipChange({ die: 2, pips: 3 }),
      pipChange({ die: 3, pips: 2 }),
      pipChange({ die: 4, pips: 1 }),
    ]);
  });

  it('dice start out as unknowns', () => {
    dice.pips.forEach((item) => expect(item).toEqual(Dice.UNKNOWN));
  });

  it('dice sends pip change events on reset', () => {
    dice.reset();
    expect(App.store).toEqual([
      pipChange({ die: 0, pips: Dice.UNKNOWN }),
      pipChange({ die: 1, pips: Dice.UNKNOWN }),
      pipChange({ die: 2, pips: Dice.UNKNOWN }),
      pipChange({ die: 3, pips: Dice.UNKNOWN }),
      pipChange({ die: 4, pips: Dice.UNKNOWN }),
    ]);
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
