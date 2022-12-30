import { Typography } from '@mui/material';
import { CELL_SIZE } from 'shared/config';
import { useTypeSelector } from 'shared/hooks/redux';

export function BlockPlacer() {
  const {
    newZone: { startCoords, endCoords },
  } = useTypeSelector((state) => state.game);

  if (!startCoords || !endCoords) {
    console.log('placer not found');
    return null;
  }

  const [lx, rx] = [Math.min(startCoords.x, endCoords.x), Math.max(startCoords.x, endCoords.x)];
  const [ly, ry] = [Math.min(startCoords.y, endCoords.y), Math.max(startCoords.y, endCoords.y)];

  const square = (rx - lx + 1) * (ry - ly + 1);

  return (
    <div
      style={{
        position: 'absolute',
        left: lx * CELL_SIZE,
        top: ly * CELL_SIZE,
        width: (rx - lx + 1) * CELL_SIZE,
        height: (ry - ly + 1) * CELL_SIZE,
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
