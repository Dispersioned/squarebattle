import { useAction } from 'shared/hooks/useAction';
import { Coords } from 'shared/types';

import { CellContainer } from './style';

type CellProps = {
  coords: Coords;
};

export function Cell({ coords }: CellProps) {
  const { onStartPlacement, onEndPlacement } = useAction();

  return (
    <CellContainer data-x={coords.x} data-y={coords.y} onMouseDown={onStartPlacement} onMouseUp={onEndPlacement} />
  );
}
