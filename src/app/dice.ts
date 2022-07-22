import { createAction, props } from '@ngrx/store';
import { Roller } from './roller';
import { App } from './app';

export const pipChange = createAction(
  'pip change',
  props<{ die: number; pips: number }>()
);

export class Dice {
  static UNKNOWN = 0;
  pips = [Dice.UNKNOWN, Dice.UNKNOWN, Dice.UNKNOWN, Dice.UNKNOWN, Dice.UNKNOWN];

  constructor(private roller: Roller) {}

  roll() {
    for (let i of [0, 1, 2, 3, 4]) {
      this.changePips(i, this.roller.roll());
    }
  }

  reset() {
    for (let i of [0, 1, 2, 3, 4]) {
      this.changePips(i, Dice.UNKNOWN);
    }
  }

  private changePips(die: number, pips: number) {
    this.pips[die] = pips;
    App.store.dispatch(pipChange({ die, pips }));
  }
}
