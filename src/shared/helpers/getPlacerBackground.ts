import { Player } from 'shared/types';

export function getPlacerBackground(player: Player, valid: boolean) {
  if (!valid) return 'rgba(0,0,0,0.1)';
  if (player === 'first') return 'rgba(193,43,43,0.2)';
  return 'rgba(48,47,175,0.2)';
}
