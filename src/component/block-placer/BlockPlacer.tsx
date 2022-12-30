import { Typography } from '@mui/material';
import { COLORS } from 'shared/config';
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

  const color = COLORS[player];

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width,
        height,
        transition: 'all 0.03s',
        background: player === 'first' ? 'rgba(193,43,43,0.2)' : 'rgba(48,47,175,0.2)',
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
