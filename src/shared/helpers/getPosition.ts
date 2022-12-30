import { CELL_SIZE } from 'shared/config';
import { Coords } from 'shared/types';

export function getPosition(startCoords: Coords, endCoords: Coords) {
  const [lx, rx] = [Math.min(startCoords.x, endCoords.x), Math.max(startCoords.x, endCoords.x)];
  const [ly, ry] = [Math.min(startCoords.y, endCoords.y), Math.max(startCoords.y, endCoords.y)];

  return {
    style: {
      top: ly * CELL_SIZE,
      left: lx * CELL_SIZE,
      width: (rx - lx + 1) * CELL_SIZE,
      height: (ry - ly + 1) * CELL_SIZE,
    },
    square: (rx - lx + 1) * (ry - ly + 1),
  };
}
