import { memo } from 'react';
import { Coords } from 'shared/types';

import { CellContainer } from './style';

type CellProps = {
  coords: Coords;
};

function Cell({ coords }: CellProps) {
  return <CellContainer data-x={coords.x} data-y={coords.y} />;
}

export default memo(Cell);
