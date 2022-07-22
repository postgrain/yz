import { YzModel } from './yz-model';
import { YzGame, canRollChange } from './yz-game';
import { App } from './app';

describe('Yz Model', () => {
  let model: YzModel;
  let game: YzGame;

  beforeEach(() => {
    game = new YzGame();
    model = new YzModel(game);
  });

  it('handles canRoll change events', () => {
    App.store.dispatch(canRollChange({ canRoll: true }));
    expect(model.canRoll).toBe(true);
  });

  it('handles canRoll change events (false)', () => {
    App.store.dispatch(canRollChange({ canRoll: false }));
    expect(model.canRoll).toBe(false);
  });
});
