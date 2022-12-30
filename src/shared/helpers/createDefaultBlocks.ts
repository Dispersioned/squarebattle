import { Block, Field } from 'shared/types';

import { getFieldSize } from './getFieldSize';
import { getPosition } from './getPosition';

export function initDefaultBlocks(field: Field) {
  const blocks: Block[] = [];
  const { rows, cols } = getFieldSize(field);
  const initedField: Field = JSON.parse(JSON.stringify(field));

  blocks.push({
    player: 'first',
    start: {
      x: 0,
      y: 0,
    },
    end: {
      x: 1,
      y: 1,
    },
  });

  blocks.push({
    player: 'second',
    start: {
      x: cols - 2,
      y: rows - 2,
    },
    end: {
      x: cols - 1,
      y: rows - 1,
    },
  });

  blocks.forEach((block) => {
    const {
      indexes: { lx, rx, ly, ry },
    } = getPosition(block.start, block.end);

    for (let i = lx; i <= rx; i++) {
      for (let j = ly; j <= ry; j++) {
        initedField[j][i] = block.player === 'first' ? 1 : 2;
      }
    }
  });

  return { blocks, initedField };
}
