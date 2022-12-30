import { useTypeSelector } from 'shared/hooks/redux';
import { useAction } from 'shared/hooks/useAction';
import { Coords } from 'shared/types';

import { CellContainer } from './style';

type CellProps = {
  coords: Coords;
};

export function Cell({ coords }: CellProps) {
  const { isPlacing } = useTypeSelector((state) => state.game);
  const { onStartPlacement, onEndPlacement, onHoverWhilePlacing } = useAction();

  const onHover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isPlacing) onHoverWhilePlacing(e);
  };

  return (
    <CellContainer
      data-x={coords.x}
      data-y={coords.y}
      onMouseDown={onStartPlacement}
      onMouseUp={onEndPlacement}
      onMouseEnter={onHover}
    />
  );
}
