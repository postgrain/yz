import { YzModel } from './model';

describe('Yz Model', () => {
  let model: YzModel;

  beforeEach(() => {
    model = new YzModel();
  });

  it(`can't roll dice at start`, () => {
    expect(model.canRoll).toBe(false);
  });

  it(`can roll after start`, () => {
    model.start();
    expect(model.canRoll).toBe(true);
  });

  it(`rolls change the dice properties`, () => {
    model.start();
    model.roll();

    for (let die of model.dice) {
      expect(die).not.toBe(0);
    }
  });

  it(`throws on unallowed roll`, () => {
    expect(() => model.roll()).toThrow(Error);
  });

  it(`three rolls allowed without start`, () => {
    model.start();
    model.roll();
    model.roll();
    model.roll();
    expect(model.canRoll).toBe(false);
  });

  it(`start after three rolls allows roll`, () => {
    model.start();
    model.roll();
    model.roll();
    model.roll();
    model.start();
    expect(model.canRoll).toBe(true);
  });
});
