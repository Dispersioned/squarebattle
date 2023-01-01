import { randInt } from './randInt';

export function getRandomDice(): [number, number] {
  return [randInt(1, 6), randInt(1, 6)];
}
