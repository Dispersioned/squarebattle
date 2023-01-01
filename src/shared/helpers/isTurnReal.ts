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
  // console.log('rows, cols', rows, cols);

  let canBePlaced = false;
  findVariant: for (const [y, x] of variants) {
    // console.warn('[x,y]', [x, y]);

    // console.log('rows - y+1, cols - x+1', rows - y + 1, cols - x + 1);
    for (let y0 = 0; y0 < rows - y + 1; y0++) {
      for (let x0 = 0; x0 < cols - x + 1; x0++) {
        canBePlaced = true;
        for (let i = y0; i < y0 + y; i++) {
          for (let j = x0; j < x0 + x; j++) {
            // console.log('v', field[i][j]);
            if (field[i][j] !== 0) canBePlaced = false;
          }
        }
        // console.log('lx, rx :>> ', x0, x0 + x - 1);
        // console.log('ly, ry :>> ', y0, y0 + y - 1);

        // console.log('canBePlaced', canBePlaced);
        if (!canBePlaced) continue;

        const indexes: Indexes = {
          lx: x0,
          rx: x0 + x - 1,
          ly: y0,
          ry: y0 + y - 1,
        };

        // console.log('lx, rx :>> ', x0, x0 + x - 1);
        // console.log('ly, ry :>> ', y0, y0 + y - 1);
        const isValid = validate({ field, indexes, player, dices });
        console.log('isValid :>> ', isValid);
        canBePlaced = isValid;
        if (isValid) {
          break findVariant;
        }
      }
    }
    // if (y > cols || x > rows) {
    //   console.warn('not enough field space with [x,y]', [x, y]);
    //   continue;
    // }
    // console.warn('[x,y]', [x, y]);
    // for (let rowi = 0; rowi <= rows - x; rowi++) {
    //   console.log('field[rowi]', field[rowi]);
    //   console.log('rows,cols,y,cols-y', rows, cols, y, cols - y);
    //   findEnoughFreeWidth: for (let coli = 0; coli <= cols - y; coli++) {
    //     console.log('coli, coli+y-1', coli, coli + y - 1);
    //     for (let k = coli; k <= coli + y - 1; k++) {
    //       console.log('field[rowi][k]', field[rowi][k]);
    //       if (field[rowi][k] !== 0) {
    //         console.log('not enough width');
    //         continue findEnoughFreeWidth;
    //       }
    //     }
    //     const left = coli;
    //     const right = coli + y - 1;
    //     console.log('rowi, rowi+x-1', rowi, rowi + x - 1);
    //     for (let k = rowi; k <= rowi + x - 1; k++) {
    //       console.log('field[k]', field[k]);
    //       for (let l = left; l <= right; l++) {
    //         if (field[k][l] !== 0) {
    //           console.log('not enough height');
    //           continue findEnoughFreeWidth;
    //         }
    //       }
    //     }
    //     const top = rowi;
    //     const bottom = rowi + x - 1;
    //     console.log('player :>> ', player);
    //     console.log('can be placed!');
    //     const isValid = validate({ field, indexes: { lx: left, rx: right, ly: top, ry: bottom }, player, dices });
    //     canBePlaced = isValid;
    //     break findVariant;
    //   }
  }
  return canBePlaced;
}
