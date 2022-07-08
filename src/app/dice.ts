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
    this.pips = this.pips.map((value, die) => {
      const pips = this.roller.roll();
      App.store.dispatch(pipChange({ die, pips }));
      return pips;
    });
  }

  reset() {
    this.pips = this.pips.map(() => Dice.UNKNOWN);
  }
}
