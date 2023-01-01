import { Typography } from '@mui/material';
import { COLORS } from 'shared/config';
import { useTypeSelector } from 'shared/hooks/redux';

import { Dice, UIDices, UIInfo } from './style';

export function Info() {
  const { player, dices, winner } = useTypeSelector((state) => state.game);

  return (
    <UIInfo>
      <Typography>Press ESC to cancel placement</Typography>
      <UIDices>
        <Dice>{dices[0]}</Dice>
        <Dice>{dices[1]}</Dice>
      </UIDices>
      <Typography component="div" display="flex" alignItems="center" gap={1}>
        Turn:
        <div style={{ background: COLORS[player], width: 17, height: 17 }} />
      </Typography>
      {winner && (
        <Typography component="div" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          Player
          <div style={{ background: COLORS[player], width: 17, height: 17 }} /> won!
        </Typography>
      )}
    </UIInfo>
  );
}
