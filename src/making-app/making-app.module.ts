import { CommonModule } from "@angular/common";
import { ApplicationRef, DoBootstrap,  NgModule } from "@angular/core";
import { AppModule } from "src/app/app.module";
import { MakingAppComponent } from "./making-app.component";


  @NgModule({
    declarations: [MakingAppComponent],
    imports: [
      CommonModule,
      AppModule
    ],
  })
  export class MakingAppModule implements DoBootstrap {
    constructor(public appModule: AppModule) {}

    ngDoBootstrap(app: ApplicationRef) {
      // this.appModule.ngDoBootstrap(app);
      const tag =  document.createElement('app-making')
      document.body.querySelector('app-root')?.remove()
      document.body.append(tag);
      app.bootstrap(MakingAppComponent);
    }
  }
