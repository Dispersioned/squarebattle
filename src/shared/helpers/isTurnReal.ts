import { Dices, Field } from 'shared/types';

import { getFieldSize } from './getFieldSize';

function getSidesVariants(square: number) {
  const variants: [number, number][] = [];
  for (let i = 1; i <= square; i++) {
    if (square % i === 0) variants.push([i, square / i]);
  }
  return variants;
}

export function isTurnReal(field: Field, dices: Dices) {
  const square = dices[0] * dices[1];
  const variants = getSidesVariants(square);

  const { rows, cols } = getFieldSize(field);

  let canBePlaced = false;
  findVariant: for (const [x, y] of variants) {
    if (y > cols || x > rows) {
      // console.warn('not enough field space with [x,y]', [x, y]);
      continue;
    }
    // console.warn('[x,y]', [x, y]);

    for (let rowi = 0; rowi <= rows - x; rowi++) {
      // console.log('field[rowi]', field[rowi]);

      // console.log('rows,cols,y,cols-y', rows, cols, y, cols - y);
      findEnoughFreeWidth: for (let coli = 0; coli <= cols - y; coli++) {
        // console.log('coli, coli+y-1', coli, coli + y - 1);
        for (let k = coli; k <= coli + y - 1; k++) {
          // console.log('field[rowi][k]', field[rowi][k]);
          if (field[rowi][k] !== 0) {
            // console.log('not enough width');
            continue findEnoughFreeWidth;
          }
        }

        const left = coli;
        const right = coli + y - 1;

        // console.log('rowi, rowi+x-1', rowi, rowi + x - 1);
        for (let k = rowi; k <= rowi + x - 1; k++) {
          // console.log('field[k]', field[k]);
          for (let l = left; l <= right; l++) {
            if (field[k][l] !== 0) {
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

  return canBePlaced;
}
