import { Typography } from '@mui/material';
import { COLORS } from 'shared/config';
import { useTypeSelector } from 'shared/hooks/redux';

import { UIInfo } from './style';

export function Info() {
  const { player } = useTypeSelector((state) => state.game);

  return (
    <UIInfo>
      <Typography>Press ESC to cancel placement</Typography>
      <Typography component="div" display="flex" alignItems="center" gap={1}>
        Turn:
        <div style={{ background: COLORS[player], width: 17, height: 17 }} />
      </Typography>
    </UIInfo>
  );
}
