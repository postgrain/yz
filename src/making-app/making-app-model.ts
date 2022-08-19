import { BehaviorSubject } from "rxjs";
import { App } from "src/app/app";
import { pipChange } from "src/app/dice";
import { PlayerModel } from "src/app/player-model";
import { HandleActions, Subscribe } from "src/app/subscribe";
import { canRollChange, currentPlayer, gameOver, gameStart } from "src/app/yz-game";

export interface GameEvents{}

@HandleActions()
export class MakingAppModel {
 events$ = new BehaviorSubject<any[]>([])
 showSidenav = false;

  @Subscribe(pipChange)
  @Subscribe(canRollChange)
  @Subscribe(gameStart)
  handleEvents(payload: ReturnType<typeof pipChange | typeof canRollChange>) {
    this.events$.next([...this.events$.getValue(),
      payload
    ]
   )
  }

  dispatchPipChange(){
    App.store.dispatch(pipChange({ die:2, pips:3 }))
  }

  start1() {
    App.store.dispatch(gameStart({ players: [
      new PlayerModel('Molly'),
      new PlayerModel('Wally'),
      new PlayerModel('Geepaw')
    ] }))
  }

  start2() {
    App.store.dispatch(gameStart({ players: [
      new PlayerModel('Molly'),
      new PlayerModel('Geepaw')
    ] }));
  }

  changeCurrent(playerIndex: number) {
    App.store.dispatch(currentPlayer({ idx: playerIndex }));
  }

  gameOver() {
    App.store.dispatch(gameOver({ winnerIndexes: [] }));
  }

  toggleSidenav(){
    this.showSidenav = !this.showSidenav
  }
}
