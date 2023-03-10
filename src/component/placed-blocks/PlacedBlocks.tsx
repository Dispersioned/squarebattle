import { Typography } from '@mui/material';
import { COLORS } from 'shared/config';
import { getPosition } from 'shared/helpers/getPosition';
import { useTypeSelector } from 'shared/hooks/redux';

import { Block } from './style';

export function PlacedBlocks() {
  const { blocks } = useTypeSelector((state) => state.game);

  const blockData = blocks.map((block) => {
    const { style, square } = getPosition(block.start, block.end);
    return {
      player: block.player,
      style,
      square,
    };
  });

  return (
    <div
      style={{
        // todo: perhaps should be refactored by creating relative wrapper for field instead field being relative wrapper
        // don't take space of field
        position: 'absolute',
      }}
    >
      {blockData.map((data, i) => {
        const { left, top, width, height } = data.style;

        const color = COLORS[data.player];

        return (
          <Block
            key={`${data.player}-${i}`}
            style={{
              left,
              top,
              width,
              height,
              border: `2px solid ${color}`,
            }}
          >
            <Typography fontWeight="bold" style={{ color, transform: `scale(${1 + data.square / 100 / 2})` }}>
              {data.square}
            </Typography>
          </Block>
        );
      })}
    </div>
  );
}
