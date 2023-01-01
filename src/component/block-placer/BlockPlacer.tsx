import { Typography } from '@mui/material';
import { COLORS } from 'shared/config';
import { getPlacerBackground } from 'shared/helpers/getPlacerBackground';
import { getPosition } from 'shared/helpers/getPosition';
import { useTypeSelector } from 'shared/hooks/redux';

import { Placer } from './style';

export function BlockPlacer() {
  const {
    player,
    isValidPlace,
    newZone: { startCoords, endCoords },
  } = useTypeSelector((state) => state.game);

  if (!startCoords || !endCoords) {
    console.error('placer not found');
    return null;
  }

  const {
    style: { left, top, width, height },
    square,
  } = getPosition(startCoords, endCoords);

  const color = COLORS[player];

  const background = getPlacerBackground(player, isValidPlace);

  return (
    <Placer
      style={{
        left,
        top,
        width,
        height,
        background,
        border: `2px ${isValidPlace ? 'solid' : 'dashed'} ${color}`,
      }}
    >
      <Typography fontWeight="bold" style={{ color }}>
        {square}
      </Typography>
    </Placer>
  );
}
