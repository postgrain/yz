import { Roller } from "./roller";

export class RandomRoller implements Roller {
  roll(): number {
    return Math.floor(Math.random() * 6) + 1;
  }
}
