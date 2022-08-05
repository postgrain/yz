import { NgModule, Injector, ApplicationRef, DoBootstrap } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { App } from './app';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({}),
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
