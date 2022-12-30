import { Typography } from '@mui/material';
import { CELL_SIZE } from 'shared/config';
import { getPosition } from 'shared/helpers/getPosition';
import { useTypeSelector } from 'shared/hooks/redux';

export function BlockPlacer() {
  const {
    newZone: { startCoords, endCoords },
  } = useTypeSelector((state) => state.game);

  if (!startCoords || !endCoords) {
    console.log('placer not found');
    return null;
  }

  const {
    style: { left, top, width, height },
    lx,
    rx,
    ly,
    ry,
    square,
  } = getPosition(startCoords, endCoords);

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width,
        height,
        transition: 'all 0.03s',
        background: 'rgba(255,255,255,.5)',
        border: '2px solid rgba(0,0,0,0.7)',
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography>{square}</Typography>
    </div>
  );
}
