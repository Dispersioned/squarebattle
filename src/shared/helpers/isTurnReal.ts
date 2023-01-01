import { Dices, Field, Indexes, Player } from 'shared/types';

import { getFieldSize } from './getFieldSize';
import { validate } from './validate';

function getSidesVariants(square: number) {
  const variants: [number, number][] = [];
  for (let i = 1; i <= square; i++) {
    if (square % i === 0) variants.push([square / i, i]);
  }
  return variants;
}

interface ValidateProps {
  field: Field;
  player: Player;
  dices: Dices;
}

export function isTurnReal({ field, player, dices }: ValidateProps) {
  const square = dices[0] * dices[1];
  const variants = getSidesVariants(square);

  const { rows, cols } = getFieldSize(field);

  let canBePlaced = false;
  findVariant: for (const [y, x] of variants) {
    for (let y0 = 0; y0 < rows - y + 1; y0++) {
      for (let x0 = 0; x0 < cols - x + 1; x0++) {
        canBePlaced = true;
        for (let i = y0; i < y0 + y; i++) {
          for (let j = x0; j < x0 + x; j++) {
            if (field[i][j] !== 0) canBePlaced = false;
          }
        }

        if (!canBePlaced) continue;

        const indexes: Indexes = {
          lx: x0,
          rx: x0 + x - 1,
          ly: y0,
          ry: y0 + y - 1,
        };

        const isValid = validate({ field, indexes, player, dices });
        canBePlaced = isValid;
        if (isValid) {
          break findVariant;
        }
      }
    }
  }
  return canBePlaced;
}
