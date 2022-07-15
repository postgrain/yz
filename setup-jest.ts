import 'jest-preset-angular/setup-jest';
import 'reflect-metadata';
import { TypedAction } from '@ngrx/store/src/models';

import { App, Store } from './src/app/app';

export class FakeStore {
  private fakeEvents: TypedAction<string>[] = [];

  dispatch(event: any) {
    this.fakeEvents.push(event);
  }

  assertDispatched(event: TypedAction<any>) {
    expect(this.fakeEvents.map((it) => it.type).includes(event.type)).toBe(
      true
    );
  }
}

App.store = new FakeStore() as unknown as Store;
