import { YzGame, canRollChange } from './yz-game';
import { App } from './app';

describe('yz game', () => {
  let game: YzGame;

  beforeEach(() => {
    game = new YzGame();
  });

  it('sends canRoll true on start', () => {
    game.start();
    expect(App.store.last()).toEqual(canRollChange({ canRoll: true }));
  });

  it(`doesn't send canRollChange event if canRoll`, () => {
    game.start();
    game.roll();
    expect(App.store.last()).not.toEqual(canRollChange({ canRoll: false }));
  });

  it(`sends canRoll false after three rolls`, () => {
    game.start();
    game.roll();
    game.roll();
    game.roll();
    expect(App.store.last()).toEqual(canRollChange({ canRoll: false }));
  });

  it(`throws on unallowed roll`, () => {
    expect(() => game.roll()).toThrow(Error);
  });
});
