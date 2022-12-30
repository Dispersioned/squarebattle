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

    return (
      startCoords?.x <= cellCoords.x &&
      cellCoords.x <= endCoords?.x &&
      startCoords?.y <= cellCoords.y &&
      cellCoords.y <= endCoords?.y
    );
  }, [startCoords, endCoords, cellCoords]);

  return { isHovering };
}
