const IMAGES = [
  'assets/images/question.png',
  'assets/images/one.png',
  'assets/images/two.png',
  'assets/images/three.png',
  'assets/images/four.png',
  'assets/images/five.png',
  'assets/images/six.png',
];

export class DieModel {
  static UNKNOWN = 0;

  image: HTMLImageElement = new Image(100, 100);

  private _pips = DieModel.UNKNOWN;

  constructor() {
    this.image.src = IMAGES[DieModel.UNKNOWN];
  }

  get pips() {
    return this._pips;
  }

  set pips(value: number) {
    if (value >= 1 && value <= 6) {
      this._pips = value;
    } else {
      this._pips = DieModel.UNKNOWN;
    }

    this.image.src = IMAGES[this.pips];
  }
}
