import { Dices } from 'shared/types';

import { randInt } from './randInt';

export function getRandomDice(): Dices {
  return [randInt(1, 6), randInt(1, 6)];
}
