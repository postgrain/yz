import { NgModule, Injector, ApplicationRef, DoBootstrap } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { App } from './app';
import { AppComponent } from './app.component';
import { ScoresComponent } from './scores/scores.component';
import { PlayersComponent } from './players/players.component';
import { PlayerComponent } from './player/player.component';
import { DescriptionComponent } from './description/description.component';

@NgModule({
  declarations: [AppComponent, ScoresComponent, PlayersComponent, PlayerComponent, DescriptionComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({}),
  ],
  exports: [
    ScoresComponent,
    AppComponent
  ]
})
export class AppModule implements DoBootstrap{
  constructor(injector: Injector) {
    App.setInjector(injector);
  }

  ngDoBootstrap(app: ApplicationRef) {
    app.bootstrap(AppComponent);
  }
}
