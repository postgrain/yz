import { BehaviorSubject } from "rxjs";
import { App } from "src/app/app";
import { pipChange } from "src/app/dice";
import { HandleActions, Subscribe } from "src/app/subscribe";
import { canRollChange } from "src/app/yz-game";

export interface GameEvents{}

@HandleActions()
export class MakingAppModel {
 events$ = new BehaviorSubject<any[]>([])
 showSidenav = false;

  @Subscribe(pipChange)
  @Subscribe(canRollChange)
  handleEvents(payload: ReturnType<typeof pipChange | typeof canRollChange>) {
    this.events$.next([...this.events$.getValue(),
      payload
    ]
   )
  }

  dispatchPipChange(){
    App.store.dispatch(pipChange({ die:2, pips:3 }))
  }

  toggleSidenav(){
    this.showSidenav = !this.showSidenav
  }
}
