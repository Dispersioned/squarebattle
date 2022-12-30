import { memo } from 'react';
import { Coords, ICell } from 'shared/types';

import { CellContainer } from './style';

type CellProps = {
  cell: ICell;
};

function Cell({ cell }: CellProps) {
  return <CellContainer data-x={cell.coords.x} data-y={cell.coords.y} />;
}

export default memo(Cell);
