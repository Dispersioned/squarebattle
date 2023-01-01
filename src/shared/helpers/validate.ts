import { Field, Indexes, Player } from 'shared/types';

function validateOverlap(field: Field, indexes: Indexes) {
  const { lx, rx, ly, ry } = indexes;
  for (let i = lx; i <= rx; i++) {
    for (let j = ly; j <= ry; j++) {
      if (field[j][i] !== 0) return false;
    }
  }
  return true;
}

function validateConnectedTerritory(field: Field, indexes: Indexes, player: Player) {
  const x = player === 'first' ? 1 : 2;

  const { lx, rx, ly, ry } = indexes;

  const freeSpace = {
    left: field[0][lx - 1] !== undefined,
    right: field[0][rx + 1] !== undefined,
    top: field[ly - 1] !== undefined,
    bottom: field[ry + 1] !== undefined,
  };

  for (let i = lx; i <= rx; i++) {
    if (freeSpace.top && field[ly - 1][i] === x) return true;
    if (freeSpace.bottom && field[ry + 1][i] === x) return true;
  }

  for (let j = ly; j <= ry; j++) {
    if (freeSpace.left && field[j][lx - 1] === x) return true;
    if (freeSpace.right && field[j][rx + 1] === x) return true;
  }
  return false;
}

export function validate(field: Field, indexes: Indexes, player: Player) {
  return validateOverlap(field, indexes) && validateConnectedTerritory(field, indexes, player);
}
