import { Dice } from "./dice";
import { RandomRoller } from "./random-roller";

export class YzGame {
  dice = new Dice(new RandomRoller());
}
