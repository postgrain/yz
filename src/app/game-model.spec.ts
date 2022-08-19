import { GameModel } from './game-model';
import { YzGame, canRollChange, gameStart, currentPlayer, NO_PLAYER } from './yz-game';
import { App } from './app';
import { PlayerModel } from './player-model';

describe('Game Model', () => {
  let model: GameModel;
  let game: YzGame;

  beforeEach(() => {
    game = new YzGame();
    model = new GameModel(game);
  });

  it('handles canRoll change events', () => {
    App.store.dispatch(canRollChange({ canRoll: true }));
    expect(model.canRoll).toBe(true);
  });

  it('handles canRoll change events (false)', () => {
    App.store.dispatch(canRollChange({ canRoll: false }));
    expect(model.canRoll).toBe(false);
  });

  it('resets player list on game start', () => {
    App.store.dispatch(gameStart({ players: [
      new PlayerModel('GeePaw'),
      new PlayerModel('Molly'),
      new PlayerModel('Wally'),
    ]}))

    expect(model.players.length).toBe(3);
    expect(model.players[0].name).toBe('GeePaw');
    expect(model.players[1].name).toBe('Molly');
    expect(model.players[2].name).toBe('Wally');
  });

  it('changes currency on CurrentPlayer', () => {
    App.store.dispatch(gameStart({ players: [
      new PlayerModel('Molly'),
      new PlayerModel('Wally'),
    ]}));
    App.store.dispatch(currentPlayer({ idx: 1}))

    expect(model.players[0].isCurrent).toBe(false);
    expect(model.players[1].isCurrent).toBe(true);
  });

  it('NO_PLAYER turns currency off on CurrentPlayer', () => {
    App.store.dispatch(gameStart({ players: [
      new PlayerModel('Molly'),
      new PlayerModel('Wally'),
    ]}));
    App.store.dispatch(currentPlayer({ idx: NO_PLAYER }))

    expect(model.players[0].isCurrent).toBe(false);
    expect(model.players[1].isCurrent).toBe(false);
  });
});
