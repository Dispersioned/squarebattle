import { memo } from 'react';
import { useTypeSelector } from 'shared/hooks/redux';
import { useAction } from 'shared/hooks/useAction';
import { useCellHovered } from 'shared/hooks/useCellHovered';
import { Coords } from 'shared/types';

import { CellContainer } from './style';

type CellProps = {
  coords: Coords;
};

export function Cell({ coords }: CellProps) {
  const { isPlacing } = useTypeSelector((state) => state.game);

  const { isHovering } = useCellHovered(coords);

  return (
    <CellContainer
      data-x={coords.x}
      data-y={coords.y}
      style={{
        background: isHovering ? 'rgba(0,0,0,0.3)' : 'transparent',
      }}
    />
  );
}
