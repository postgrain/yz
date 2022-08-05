import { DieModel } from './die-model';
import { YzGame, canRollChange } from './yz-game';
import { pipChange } from './dice';
import { HandleActions, Subscribe } from './subscribe';

@HandleActions()
export class YzModel {
  public canRoll = false;
  public dice = [
    new DieModel(),
    new DieModel(),
    new DieModel(),
    new DieModel(),
    new DieModel(),
  ];

  constructor(private game: YzGame = new YzGame()) {}

  @Subscribe(canRollChange)
  handleCanRollChange(payload: ReturnType<typeof canRollChange>) {
    this.canRoll = payload.canRoll;
  }

  @Subscribe(pipChange)
  handlePipChange(payload: ReturnType<typeof pipChange>) {
    this.dice[payload.die].pips = payload.pips;
  }

  start() {
    this.game.start();
  }

  roll() {
    this.game.roll();
  }
}
