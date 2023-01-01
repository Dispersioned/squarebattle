import { Dices, Field } from 'shared/types';

import { getFieldSize } from './getFieldSize';

function getSidesVariants(square: number) {
  const variants: [number, number][] = [];
  for (let i = 1; i <= square; i++) {
    if (square % i === 0) variants.push([i, square / i]);
  }
  return variants;
}

export function validateWinner(field: Field, dices: Dices) {
  const square = dices[0] * dices[1];
  const variants = getSidesVariants(square);

  const { rows, cols } = getFieldSize(field);

  findVariant: for (const [x, y] of variants) {
    let canBePlaced = false;
    if (x > rows || y > cols) {
      // console.warn('with [x,y]', [x, y]);
      // console.log('not enough field space');
      continue;
    }
    // console.warn('[x,y]', [x, y]);

    for (let rowi = 0; rowi <= rows - x; rowi++) {
      // console.log('field[rowi]', field[rowi]);

      // console.log('rows,cols,y,cols-y', rows, cols, y, cols - y);
      findEnoughFreeWidth: for (let coli = 0; coli <= cols - y; coli++) {
        for (let k = coli; k <= coli + y; k++) {
          if (field[rowi][k] !== 0) {
            console.log('not enough width');
            continue findEnoughFreeWidth;
          }
        }

        for (let k = rowi; k <= rowi + rows - y; k++) {
          for (let l = rowi; l <= rowi + x; l++) {
            if (field[l][k] !== 0) {
              // console.log('not enough height');
              continue findEnoughFreeWidth;
            }
          }
        }

        // console.log('can be placed!');
        canBePlaced = true;
        break findVariant;
      }
    }
  }

  return false;
}
