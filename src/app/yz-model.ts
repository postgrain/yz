import { DieModel } from './die-model';
import { YzGame } from './yz-game';
import { App } from './app';
import { createReducer, on } from '@ngrx/store';
import { pipChange } from './dice';

export class YzModel {
  public dice = [
    new DieModel(),
    new DieModel(),
    new DieModel(),
    new DieModel(),
    new DieModel(),
  ];

  constructor(private game: YzGame = new YzGame()) {
    App.store.addReducer(
      'yzModel',
      createReducer(
        {},
        on(pipChange, (state, payload) => {
          this.dice[payload.die].pips = payload.pips;
          return state;
        })
      )
    );
  }

  get canRoll() {
    return this.game.canRoll;
  }

  start() {
    this.game.start();
  }

  roll() {
    this.game.roll();
  }

  // como fazer funcionar
  // @Subscribe(pipChange)
  // handlePipChange(action: pipChange) {
  //   this.dice[action.die].pips = action.pips;
  // }
}
