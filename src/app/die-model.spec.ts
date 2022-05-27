import { DieModel } from './die-model';

describe('Die Model', () => {
  let model: DieModel;

  beforeEach(() => {
    model = new DieModel();
  });

  it('pips starts with unknown', () => {
    expect(model.pips).toBe(DieModel.UNKNOWN);
    expect(model.image.src.endsWith('question.png')).toBe(true);
  });

  it('legal values changes on set', () => {
    model.pips = 5;

    expect(model.pips).toBe(5);
    expect(model.image.src.endsWith('five.png')).toBe(true);
  });

  it('illegal values is UNKNOWN', () => {
    model.pips = 7;

    expect(model.pips).toBe(DieModel.UNKNOWN);
    expect(model.image.src.endsWith('question.png')).toBe(true);
  });
});
