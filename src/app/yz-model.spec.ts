import { YzModel } from './yz-model';
import { YzGame } from './yz-game';
import { Dice } from './dice';

describe('Yz Model', () => {
  let model: YzModel;
  let game: YzGame;
  beforeEach(() => {
    game = new YzGame();
    model = new YzModel(game);
  });
  it('updates pips from game', () => {
    game.start();
    game.roll();
    model.update();
    for (let die of model.dice) {
      expect(die.pips).not.toBe(Dice.UNKNOWN);
    }
  });
  it('updates canRoll from game', () => {
    game.start();
    model.update();
    expect(model.canRoll).toBe(true);
  });
});
