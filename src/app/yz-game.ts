import { createAction, props } from '@ngrx/store';

import { App } from './app';
import { Dice } from './dice';
import { PlayerModel } from './player-model';
import { RandomRoller } from './random-roller';

export const NO_PLAYER = -1;

export const canRollChange = createAction(
  'can roll change',
  props<{ canRoll: boolean }>()
);

export const gameStart = createAction(
  'game start',
  props<{ players: PlayerModel[] }>()
);

export const currentPlayer = createAction(
  'current player',
  props<{ idx: number }>()
);

export const gameOver = createAction(
  'game over',
  props<{ winnerIndexes: number[] }>()
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
