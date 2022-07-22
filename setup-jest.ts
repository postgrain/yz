import 'jest-preset-angular/setup-jest';
import 'reflect-metadata';

import { ActionReducer } from '@ngrx/store';
import { App, Store } from './src/app/app';

export class FakeStore extends Array {
  private reducer?: ActionReducer<any>;

  addReducer(_: string, reducer: ActionReducer<any>) {
    this.reducer = reducer;
  }

  dispatch(event: any) {
    this.push(event);
    this.reducer?.({}, event);
  }

  last() {
    return this[this.length - 1];
  }
}

beforeEach(() => {
  App.store = new FakeStore() as unknown as Store;
});
