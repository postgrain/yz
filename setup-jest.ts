import 'jest-preset-angular/setup-jest';
import 'reflect-metadata';

import { ActionReducer } from '@ngrx/store';
import { App, Store } from './src/app/app';
import { Subject } from 'rxjs';

const actions$ = new Subject<any>();

export class FakeStore extends Array {
  private reducer?: ActionReducer<any>;

  addReducer(_: string, reducer: ActionReducer<any>) {
    this.reducer = reducer;
  }

  dispatch(event: any) {
    this.push(event);
    this.reducer?.({}, event);
    actions$.next(event);
  }

  last() {
    return this[this.length - 1];
  }
}

beforeEach(() => {
  App.injector = { get: jest.fn().mockReturnValue(actions$) } as any;
  App.store = new FakeStore() as unknown as Store;
});
