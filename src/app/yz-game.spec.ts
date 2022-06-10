import { YzGame } from './yz-game';

describe('yz game', () => {
  let game: YzGame;

  beforeEach(() => {
    game = new YzGame();
  });

  it(`can't roll dice at start`, () => {
    expect(game.canRoll).toBe(false);
  });

  it(`throws on unallowed roll`, () => {
    expect(() => game.roll()).toThrow(Error);
  });

  it(`can roll after start`, () => {
    game.start();
    expect(game.canRoll).toBe(true);
  });

  it(`three rolls allowed without start`, () => {
    game.start();
    game.roll();
    game.roll();
    game.roll();
    expect(game.canRoll).toBe(false);
  });

  it(`rolls change the pips`, () => {
    game.start();
    game.roll();

    for (let pips of game.pips) {
      expect(pips).not.toBe(0);
    }
  });

  it(`start after three rolls allows roll`, () => {
    game.start();
    game.roll();
    game.roll();
    game.roll();
    game.start();
    expect(game.canRoll).toBe(true);
  });
});
