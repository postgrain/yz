import 'jest-preset-angular/setup-jest';
import 'reflect-metadata';

import { App, Store } from './src/app/app';

export class FakeStore extends Array {
  dispatch(event: any) {
    this.push(event);
  }

  last() {
    return this[this.length - 1];
  }
}

beforeEach(() => {
  App.store = new FakeStore() as unknown as Store;
});
