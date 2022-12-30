import { Typography } from '@mui/material';
import { getPosition } from 'shared/helpers/getPosition';
import { useTypeSelector } from 'shared/hooks/redux';

export function BlockPlacer() {
  const {
    player,
    newZone: { startCoords, endCoords },
  } = useTypeSelector((state) => state.game);

  if (!startCoords || !endCoords) {
    console.log('placer not found');
    return null;
  }

  const {
    style: { left, top, width, height },
    square,
  } = getPosition(startCoords, endCoords);

  const color = player === 'first' ? '#a32c1f' : '#27369c';

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
        border: `2px solid ${color}`,
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography fontWeight="bold" style={{ color }}>
        {square}
      </Typography>
    </div>
  );
}
