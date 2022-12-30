import { Field, Indexes } from 'shared/types';

export function validateOverlap(field: Field, indexes: Indexes) {
  const { lx, rx, ly, ry } = indexes;
  for (let i = lx; i <= rx; i++) {
    for (let j = ly; j <= ry; j++) {
      if (field[j][i] !== 0) return false;
    }
  }
  return true;
}
