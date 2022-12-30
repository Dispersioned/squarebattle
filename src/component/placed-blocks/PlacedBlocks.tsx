import { Typography } from '@mui/material';
import { getPosition } from 'shared/helpers/getPosition';
import { useTypeSelector } from 'shared/hooks/redux';

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

        const color = data.player === 'first' ? '#de2a16' : '#364acf';

        return (
          <div
            key={`${data.player}-${i}`}
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
            <Typography style={{ color }}>{data.square}</Typography>
          </div>
        );
      })}
    </div>
  );
}
