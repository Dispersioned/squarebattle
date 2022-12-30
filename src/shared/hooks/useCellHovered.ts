import { useMemo, useState } from 'react';
import { Coords } from 'shared/types';

import { useTypeSelector } from './redux';

export function useCellHovered(cellCoords: Coords) {
  const {
    newZone: { startCoords, endCoords },
  } = useTypeSelector((state) => state.game);

  const isHovering = useMemo(() => {
    if (!startCoords || !endCoords) {
      return false;
    }

    const [lx, rx] = [Math.min(startCoords.x, endCoords.x), Math.max(startCoords.x, endCoords.x)];
    const [ly, ry] = [Math.min(startCoords.x, endCoords.y), Math.max(startCoords.x, endCoords.y)];

    return lx <= cellCoords.x && cellCoords.x <= rx && ly <= cellCoords.y && cellCoords.y <= ry;
  }, [startCoords, endCoords, cellCoords]);

  return { isHovering };
}
