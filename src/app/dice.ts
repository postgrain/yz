import { Roller } from './roller';
import { createAction, props, Store } from '@ngrx/store';

export const pipChange = createAction(
  'pip change',
  props<{ die: number; pips: number }>()
);

export class Dice {
  static UNKNOWN = 0;
  pips = [Dice.UNKNOWN, Dice.UNKNOWN, Dice.UNKNOWN, Dice.UNKNOWN, Dice.UNKNOWN];

  constructor(private roller: Roller, private store$: Store<any>) {}

  roll() {
    this.pips = this.pips.map((value, die) => {
      const pips = this.roller.roll();
      this.store$.dispatch(pipChange({ die, pips }));
      return pips;
    });
  }

  reset() {
    this.pips = this.pips.map(() => Dice.UNKNOWN);
  }
}
