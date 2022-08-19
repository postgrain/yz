import { DieModel } from './die-model';
import { YzGame, canRollChange, gameStart, currentPlayer, gameOver } from './yz-game';
import { pipChange } from './dice';
import { HandleActions, Subscribe } from './subscribe';
import { PlayerModel } from './player-model';

@HandleActions()
export class GameModel {
  public canRoll = false;
  public isGameOver = false;
  public players: PlayerModel[] = [];
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

  @Subscribe(gameStart)
  handleGameStart(payload: ReturnType<typeof gameStart>) {
    this.isGameOver = false;
    this.players = payload.players;
  }

  @Subscribe(currentPlayer)
  handleCurrentPlayer(payload: ReturnType<typeof currentPlayer>) {
    this.players = this.players.map((player, idx) => ({ ...player, isCurrent: payload.idx === idx }));
  }

  @Subscribe(gameOver)
  handleGameOver(payload: ReturnType<typeof gameOver>) {
    this.isGameOver = true;
  }

  start() {
    this.game.start();
  }

  roll() {
    this.game.roll();
  }
}
