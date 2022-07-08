import { Injector } from '@angular/core';
import { Store as NgRxStore } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

export interface Store extends NgRxStore {
  assertDispatched<T extends string>(event: TypedAction<T>): void;
}

export class App {
  static injector: Injector;

  static store: Store = new Proxy({} as Store, {
    get(target, prop, receiver) {
      return Reflect.get(App.injector.get(NgRxStore), prop, receiver);
    },
  });

  static setInjector(injector: Injector | any) {
    App.injector = injector;
  }
}
