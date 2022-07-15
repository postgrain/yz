import { DieModel } from './die-model';
import { YzGame } from './yz-game';
import { pipChange } from './dice';
import { HandlesActions, Subscribe } from './subscribe';

@HandlesActions('yzModel')
export class YzModel {
  public dice = [
    new DieModel(),
    new DieModel(),
    new DieModel(),
    new DieModel(),
    new DieModel(),
  ];

  constructor(private game: YzGame = new YzGame()) {}

  get canRoll() {
    return this.game.canRoll;
  }

  start() {
    this.game.start();
  }

  roll() {
    this.game.roll();
  }

  @Subscribe(pipChange)
  syncPips(_: unknown, payload: ReturnType<typeof pipChange>) {
    this.dice[payload.die].pips = payload.pips;
  }
}
