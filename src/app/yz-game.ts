import { createAction, props } from '@ngrx/store';

import { App } from './app';
import { Dice } from './dice';
import { RandomRoller } from './random-roller';

export const canRollChange = createAction(
  'can roll change',
  props<{ canRoll: boolean }>()
);

export const gameStart = createAction(
  'game start',
  props<{ players: string[] }>()
);

export class YzGame {
  private rollsInRound = 3;
  private dice = new Dice(new RandomRoller());

  private get canRoll() {
    return this.rollsInRound < 3;
  }

  get pips() {
    return [...this.dice.pips];
  }

  start() {
    this.rollsInRound = 0;
    this.dice.reset();
    App.store.dispatch(canRollChange({ canRoll: true }));
  }

  roll() {
    if (!this.canRoll) throw new Error('Illegal roll called!');
    this.dice.roll();
    this.rollsInRound += 1;
    if (!this.canRoll) App.store.dispatch(canRollChange({ canRoll: false }));
  }
}
